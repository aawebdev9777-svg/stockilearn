import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, MousePointerClick, TrendingUp } from "lucide-react";

export default function StartScreen({ onStart, bestScore }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10"
          style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(56,189,248,0.15))" }}
        >
          <Gamepad2 className="w-10 h-10 text-green-400" strokeWidth={2.5} />
        </motion.div>
        <h1 className="text-3xl font-black text-white">Market Timing</h1>
        <p className="text-sm text-white/50 mt-2 max-w-xs">Can you beat buy-and-hold? Tap to buy, hold, release to sell.</p>
      </div>

      <div className="space-y-3 w-full max-w-xs">
        <div className="flex items-center gap-3 text-white/70">
          <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <MousePointerClick className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-sm">Tap & hold to buy a share</p>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <MousePointerClick className="w-4 h-4 text-red-400 rotate-180" />
          </div>
          <p className="text-sm">Release to sell at the current price</p>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-sm">Beat buy-and-hold to earn bonus XP</p>
        </div>
      </div>

      {bestScore !== null && (
        <p className="text-sm text-white/40">Best return: {bestScore >= 0 ? "+" : ""}{bestScore.toFixed(1)}%</p>
      )}

      <Button onClick={onStart} className="w-full max-w-xs h-14 text-lg font-black rounded-2xl bg-green-500 hover:bg-green-600 text-white border-0">
        PLAY
      </Button>
    </motion.div>
  );
}