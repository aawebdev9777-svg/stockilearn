import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check } from "lucide-react";

const ORDER_TYPES = [
  { key: "market", label: "Market Order", desc: "Buy immediately at current price." },
  { key: "limit", label: "Limit Order", desc: "Set the price you want to pay." },
  { key: "stop", label: "Stop Order", desc: "Triggers when price reaches your level." },
];

export default function TradeModal({ action, stock, holding, onClose }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("market");
  const [inputMode, setInputMode] = useState("shares"); // shares | amount
  const [sharesInput, setSharesInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [step, setStep] = useState("input"); // input | confirm | success
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [realisedPnl, setRealisedPnl] = useState(0);

  const isBuy = action === "buy";

  const sharesNum = inputMode === "shares"
    ? parseFloat(sharesInput) || 0
    : parseFloat(amountInput) > 0 ? parseFloat(amountInput) / stock.current_price : 0;

  const totalCost = Math.round(sharesNum * stock.current_price * 100) / 100;
  const maxShares = !isBuy ? (holding?.shares || 0) : Infinity;
  const cashBalance = portfolio?.cash_balance ?? 10000;
  const notEnoughCash = isBuy && totalCost > cashBalance;
  const tooManyShares = !isBuy && sharesNum > maxShares;
  const invalid = sharesNum <= 0 || notEnoughCash || tooManyShares;

  const loadPortfolio = async () => {
    const portfolios = await base44.entities.PaperPortfolio.list();
    if (portfolios.length === 0) {
      const p = await base44.entities.PaperPortfolio.create({ cash_balance: 10000, total_value: 10000 });
      setPortfolio(p);
      return p;
    }
    setPortfolio(portfolios[0]);
    return portfolios[0];
  };

  const handleReviewOrder = async () => {
    const p = await loadPortfolio();
    setPortfolio(p);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    if (invalid) return;
    setLoading(true);

    const p = portfolio || await loadPortfolio();

    if (isBuy) {
      await base44.entities.PaperTrade.create({
        ticker: stock.ticker, action: "buy", shares: sharesNum,
        price_at_trade: stock.current_price, total_value: totalCost, order_type: orderType,
      });
      const existingHoldings = await base44.entities.PaperHolding.filter({ ticker: stock.ticker });
      if (existingHoldings.length > 0) {
        const h = existingHoldings[0];
        const newShares = h.shares + sharesNum;
        const newAvg = ((h.avg_buy_price * h.shares) + totalCost) / newShares;
        await base44.entities.PaperHolding.update(h.id, { shares: newShares, avg_buy_price: newAvg });
      } else {
        await base44.entities.PaperHolding.create({ ticker: stock.ticker, shares: sharesNum, avg_buy_price: stock.current_price });
      }
      await base44.entities.PaperPortfolio.update(p.id, { cash_balance: p.cash_balance - totalCost });
    } else {
      const costBasis = holding.avg_buy_price * sharesNum;
      const pnl = Math.round((totalCost - costBasis) * 100) / 100;
      setRealisedPnl(pnl);
      await base44.entities.PaperTrade.create({
        ticker: stock.ticker, action: "sell", shares: sharesNum,
        price_at_trade: stock.current_price, total_value: totalCost,
        realised_pnl: pnl, order_type: orderType,
      });
      const remaining = holding.shares - sharesNum;
      if (remaining <= 0) {
        await base44.entities.PaperHolding.delete(holding.id);
      } else {
        await base44.entities.PaperHolding.update(holding.id, { shares: remaining });
      }
      await base44.entities.PaperPortfolio.update(p.id, { cash_balance: p.cash_balance + totalCost });
    }

    queryClient.invalidateQueries({ queryKey: ["holdings"] });
    queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    queryClient.invalidateQueries({ queryKey: ["trades"] });
    setLoading(false);
    setStep("success");
  };

  const sellPnl = !isBuy && holding ? (stock.current_price - holding.avg_buy_price) * sharesNum : 0;
  const sellPnlPct = !isBuy && holding && holding.avg_buy_price > 0 ? ((stock.current_price - holding.avg_buy_price) / holding.avg_buy_price) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-card rounded-t-3xl border-t border-border/50 max-h-[90vh] overflow-y-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="px-5 pb-8 pt-2 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black px-2.5 py-1 rounded-full ${isBuy ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                {isBuy ? "▲ BUY" : "▼ SELL"} {stock.ticker}
              </span>
            </div>
            <button onClick={onClose} className="text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">

            {/* STEP: INPUT */}
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">

                {/* Order Type */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground">ORDER TYPE</p>
                  {ORDER_TYPES.map(ot => (
                    <button
                      key={ot.key}
                      onClick={() => setOrderType(ot.key)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all ${
                        orderType === ot.key
                          ? (isBuy ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5")
                          : "border-border/50 bg-muted/20"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full border-2 ${orderType === ot.key ? (isBuy ? "border-green-400 bg-green-400" : "border-red-400 bg-red-400") : "border-muted-foreground/40"}`} />
                        <span className="text-xs font-bold text-foreground">{ot.label}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground ml-5 mt-0.5">{ot.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Amount toggle */}
                <div>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setInputMode("shares")}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${inputMode === "shares" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                    >
                      BY SHARES
                    </button>
                    <button
                      onClick={() => setInputMode("amount")}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${inputMode === "amount" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                    >
                      BY AMOUNT $
                    </button>
                  </div>

                  {inputMode === "shares" ? (
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        max={!isBuy ? maxShares : undefined}
                        placeholder={`Enter shares${!isBuy ? ` (max ${maxShares})` : ""}`}
                        value={sharesInput}
                        onChange={e => setSharesInput(e.target.value)}
                        className={`rounded-2xl h-12 text-lg font-bold text-center ${notEnoughCash || tooManyShares ? "border-red-500/50 text-red-400" : ""}`}
                      />
                      {!isBuy && (
                        <div className="flex gap-2 mt-2">
                          {[25, 50, 75, 100].map(pct => (
                            <button
                              key={pct}
                              onClick={() => setSharesInput(String(Math.floor(maxShares * pct / 100)))}
                              className="flex-1 text-[10px] font-bold py-1.5 bg-muted rounded-xl text-muted-foreground"
                            >{pct}%</button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter amount in $"
                      value={amountInput}
                      onChange={e => setAmountInput(e.target.value)}
                      className={`rounded-2xl h-12 text-lg font-bold text-center ${notEnoughCash ? "border-red-500/50 text-red-400" : ""}`}
                    />
                  )}
                </div>

                {/* Live summary */}
                {sharesNum > 0 && (
                  <div className="bg-muted/40 rounded-2xl p-3.5 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shares</span>
                      <span className="font-bold text-foreground">{sharesNum % 1 === 0 ? sharesNum : sharesNum.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per share</span>
                      <span className="font-bold text-foreground">${stock.current_price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border/30 pt-1.5">
                      <span className="font-bold text-foreground">Total {isBuy ? "cost" : "proceeds"}</span>
                      <span className={`font-bold ${notEnoughCash ? "text-red-400" : "text-foreground"}`}>${totalCost.toFixed(2)}</span>
                    </div>
                    {isBuy && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">After purchase</span>
                        <span className="font-bold text-foreground">${(cashBalance - totalCost).toFixed(2)}</span>
                      </div>
                    )}
                    {!isBuy && sharesNum > 0 && holding && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Est. P&L</span>
                        <span className={`font-bold ${sellPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {sellPnl >= 0 ? "+" : ""}${sellPnl.toFixed(2)} ({sellPnlPct >= 0 ? "+" : ""}{sellPnlPct.toFixed(2)}%)
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brokerage fee</span>
                      <span className="font-bold text-green-400">$0.00 ✓</span>
                    </div>
                  </div>
                )}

                {notEnoughCash && <p className="text-xs text-red-400 font-bold text-center">Not enough cash!</p>}
                {tooManyShares && <p className="text-xs text-red-400 font-bold text-center">You only have {maxShares} shares!</p>}

                <Button
                  onClick={handleReviewOrder}
                  disabled={invalid}
                  className={`w-full h-12 rounded-2xl text-base font-black ${
                    isBuy ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  } text-white disabled:opacity-30`}
                >
                  Review Order
                </Button>
                <p className="text-[9px] text-center text-muted-foreground">Paper trade only. No real money involved.</p>
              </motion.div>
            )}

            {/* STEP: CONFIRM */}
            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <div className="text-center mb-2">
                  <div className="text-4xl mb-2">{stock.sectorEmoji}</div>
                  <p className="text-base font-black text-foreground">
                    You are {isBuy ? "buying" : "selling"} {sharesNum % 1 === 0 ? sharesNum : sharesNum.toFixed(2)} shares of {stock.ticker}
                  </p>
                  <p className="text-sm text-muted-foreground">for ${totalCost.toFixed(2)}</p>
                </div>

                <div className="bg-muted/40 rounded-2xl p-4 space-y-2 text-sm">
                  {[
                    ["Action", <span className={isBuy ? "text-green-400" : "text-red-400"}>{isBuy ? "▲ BUY" : "▼ SELL"}</span>],
                    ["Stock", stock.ticker],
                    ["Order type", orderType.charAt(0).toUpperCase() + orderType.slice(1)],
                    ["Shares", sharesNum % 1 === 0 ? sharesNum : sharesNum.toFixed(4)],
                    ["Price", `$${stock.current_price.toFixed(2)}`],
                    ["Total", <strong>${totalCost.toFixed(2)}</strong>],
                  ].map(([label, val], i) => (
                    <div key={i} className={`flex justify-between ${i === 5 ? "border-t border-border pt-2" : ""}`}>
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-bold text-foreground">{val}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`w-full h-12 rounded-2xl text-base font-black ${isBuy ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                >
                  {loading ? "Processing..." : "CONFIRM ORDER"}
                </Button>
                <Button variant="ghost" onClick={() => setStep("input")} className="w-full text-muted-foreground">
                  ← Go Back
                </Button>
                <p className="text-[9px] text-center text-muted-foreground">Paper trade only. No real money involved.</p>
              </motion.div>
            )}

            {/* STEP: SUCCESS */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-5 py-4">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg ${
                    isBuy ? "bg-green-500" : realisedPnl >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>

                <div>
                  <p className="text-xl font-black text-foreground">
                    {isBuy ? "Position opened! 🎉" : realisedPnl >= 0 ? `+$${realisedPnl.toFixed(2)} profit! 🎉` : "Trade complete"}
                  </p>
                  {!isBuy && realisedPnl < 0 && (
                    <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
                      Locked in a loss of ${Math.abs(realisedPnl).toFixed(2)}. Every investor takes losses — what matters is what you learn from it. 💪
                    </p>
                  )}
                  {!isBuy && realisedPnl >= 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Realised: ${realisedPnl.toFixed(2)}
                    </p>
                  )}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm font-black text-primary"
                >
                  +5 XP earned ⚡
                </motion.p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => { onClose(); navigate("/trade"); }}
                    className="flex-1 rounded-2xl font-bold"
                  >
                    View Portfolio
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 rounded-2xl font-bold"
                  >
                    Keep Browsing
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}