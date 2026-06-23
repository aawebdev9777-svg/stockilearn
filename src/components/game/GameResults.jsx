import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { getResultMessage } from "@/lib/gameEngine";

export default function GameResults({ round, results, xp, onPlayAgain }) {
  const { playerReturn, buyHoldReturn, beatMarket, finalCash } = results;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="text-center"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">You were trading</p>
        <h2 className="text-3xl font-black text-white">{round.stockName}</h2>
        <p className="text-sm text-white/50 mt-1">{round.ticker} · {round.sector}</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm space-y-3"
      >
        <div className={`rounded-2xl p-4 border ${beatMarket ? "bg-green-500/10 border-green-500/30" : "bg-white/5 border-white/10"}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60 font-medium">Your Return</span>
            <span className={`text-2xl font-black tabular-nums ${playerReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
              {playerReturn >= 0 ? "+" : ""}{playerReturn.toFixed(2)}%
            </span>
          </div>
          <p className="text-xs text-white/40 mt-1">£{finalCash.toFixed(2)} final balance</p>
        </div>

        <div className="rounded-2xl p-4 border border-white/10 bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60 font-medium">Buy &amp; Hold</span>
            <span className="text-2xl font-black text-white/80 tabular-nums">
              {buyHoldReturn >= 0 ? "+" : ""}{buyHoldReturn.toFixed(2)}%
            </span>
          </div>
          <p className="text-xs text-white/40 mt-1">If you just held the whole time</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className={`px-6 py-3 rounded-2xl ${beatMarket ? "bg-green-500/20" : "bg-white/5"}`}
      >
        <p className="text-sm font-bold text-white text-center">{getResultMessage(results)}</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="flex items-center gap-2"
      >
        <span className="text-2xl">⚡</span>
        <span className="text-xl font-black text-yellow-400">+{xp} XP</span>
      </motion.div>

      <div className="flex gap-3 w-full max-w-sm">
        <Button onClick={onPlayAgain} className="flex-1 h-12 rounded-2xl font-bold bg-green-500 hover:bg-green-600 text-white border-0">
          <RefreshCw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Link to="/home" className="flex-1">
          <Button variant="outline" className="w-full h-12 rounded-2xl font-bold border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}