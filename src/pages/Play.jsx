import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GameChart from "@/components/game/GameChart";
import GameResults from "@/components/game/GameResults";
import StartScreen from "@/components/game/StartScreen";
import { generateGameRound, calculateResults, calculateGameXp, STARTING_CASH, TICK_MS } from "@/lib/gameEngine";

const BEST_SCORE_KEY = "stockilearn_game_best";

const fmt = (n) => n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Play() {
  const [gameState, setGameState] = useState("ready");
  const [round, setRound] = useState(null);
  const [priceIndex, setPriceIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [buyPrice, setBuyPrice] = useState(null);
  const [buyIndex, setBuyIndex] = useState(null);
  const [trades, setTrades] = useState([]);
  const [cash, setCash] = useState(STARTING_CASH);
  const [shares, setShares] = useState(0);
  const [results, setResults] = useState(null);
  const [xp, setXp] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseFloat(stored) : null;
  });

  const isHoldingRef = useRef(false);
  const sharesRef = useRef(0);
  const priceIndexRef = useRef(0);
  const roundRef = useRef(null);
  const tradesRef = useRef([]);
  const cashRef = useRef(STARTING_CASH);

  const startGame = () => {
    const newRound = generateGameRound();
    roundRef.current = newRound;
    setRound(newRound);
    setPriceIndex(0);
    priceIndexRef.current = 0;
    setIsHolding(false);
    isHoldingRef.current = false;
    setBuyPrice(null);
    setBuyIndex(null);
    setTrades([]);
    tradesRef.current = [];
    setCash(STARTING_CASH);
    cashRef.current = STARTING_CASH;
    setShares(0);
    sharesRef.current = 0;
    setResults(null);
    setXp(0);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing" || !round) return;

    const interval = setInterval(() => {
      const idx = priceIndexRef.current;
      if (idx >= round.points.length - 1) {
        clearInterval(interval);
        let finalTrades = tradesRef.current;
        if (isHoldingRef.current) {
          const endPrice = round.points[round.points.length - 1];
          finalTrades = [...finalTrades, { type: "sell", price: endPrice, index: round.points.length - 1 }];
          setCash(sharesRef.current * endPrice);
          setShares(0);
          setIsHolding(false);
          isHoldingRef.current = false;
        }
        const res = calculateResults(round, finalTrades);
        setResults(res);
        setXp(calculateGameXp(res));
        if (bestScore === null || res.playerReturn > bestScore) {
          setBestScore(res.playerReturn);
          localStorage.setItem(BEST_SCORE_KEY, res.playerReturn.toString());
        }
        setGameState("revealed");
        return;
      }
      priceIndexRef.current = idx + 1;
      setPriceIndex(idx + 1);
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [gameState, round]);

  const handlePointerDown = (e) => {
    if (gameState !== "playing" || isHoldingRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const idx = priceIndexRef.current;
    const price = roundRef.current.points[idx];
    isHoldingRef.current = true;
    setIsHolding(true);
    setBuyPrice(price);
    setBuyIndex(idx);
    const newShares = cashRef.current / price;
    sharesRef.current = newShares;
    setShares(newShares);
    setCash(0);
    cashRef.current = 0;
    tradesRef.current = [...tradesRef.current, { type: "buy", price, index: idx }];
    setTrades(tradesRef.current);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handlePointerUp = () => {
    if (!isHoldingRef.current) return;
    const idx = priceIndexRef.current;
    const price = roundRef.current.points[idx];
    isHoldingRef.current = false;
    setIsHolding(false);
    const newCash = sharesRef.current * price;
    cashRef.current = newCash;
    setCash(newCash);
    setShares(0);
    sharesRef.current = 0;
    setBuyPrice(null);
    setBuyIndex(null);
    tradesRef.current = [...tradesRef.current, { type: "sell", price, index: idx }];
    setTrades(tradesRef.current);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const currentPrice = round ? round.points[priceIndex] : 0;
  const unrealizedPnl = isHolding && buyPrice ? ((currentPrice - buyPrice) / buyPrice) * 100 : 0;
  const unrealizedValue = isHolding ? shares * currentPrice : cash;
  const progress = round ? (priceIndex / (round.points.length - 1)) * 100 : 0;
  const currencySymbol = round?.currency === "GBP" ? "£" : "$";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col select-none">
      {gameState === "ready" && <StartScreen onStart={startGame} bestScore={bestScore} />}

      {gameState === "playing" && round && (
        <div className="flex-1 flex flex-col px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mystery Stock</p>
              <p className="text-sm font-bold text-muted-foreground/70">??? · ???</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{isHolding ? "Position" : "Cash"}</p>
              <p className="text-lg font-black text-foreground tabular-nums">
                {currencySymbol}{fmt(isHolding ? unrealizedValue : cash)}
              </p>
            </div>
          </div>

          <div className="h-6 mb-2 flex items-center">
            {isHolding && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm font-bold tabular-nums ${unrealizedPnl >= 0 ? "text-[#58CC02]" : "text-destructive"}`}
              >
                {unrealizedPnl >= 0 ? "+" : ""}{unrealizedPnl.toFixed(2)}% {unrealizedPnl >= 0 ? "▲" : "▼"}
              </motion.span>
            )}
          </div>

          <div
            className="flex-1 relative rounded-2xl overflow-hidden border border-border bg-card min-h-[200px]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: "none" }}
          >
            <GameChart
              prices={round.points}
              currentIndex={priceIndex}
              position={{ isHolding, buyPrice, buyIndex }}
              startPrice={round.startPrice}
            />

            <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
              {isHolding ? (
                <motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-sm font-bold text-foreground/80">
                  HOLDING · Release to sell
                </motion.p>
              ) : (
                <p className="text-sm font-bold text-muted-foreground/50">Tap &amp; hold to buy</p>
              )}
            </div>
          </div>

          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-3 text-center">
            <p className="text-2xl font-black tabular-nums text-foreground">
              {currencySymbol}{fmt(currentPrice)}
            </p>
          </div>
        </div>
      )}

      {gameState === "revealed" && round && results && (
        <GameResults round={round} results={results} xp={xp} onPlayAgain={startGame} />
      )}
    </div>
  );
}