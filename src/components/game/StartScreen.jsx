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
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-border bg-card shadow-sm"
        >
          <Gamepad2 className="w-10 h-10 text-[#58CC02]" strokeWidth={2.5} />
        </motion.div>
        <h1 className="text-3xl font-black text-foreground">Market Timing</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">Can you beat buy-and-hold? Tap to buy, hold, release to sell.</p>
      </div>

      <div className="space-y-3 w-full max-w-xs">
        <div className="flex items-center gap-3 text-foreground/80">
          <div className="w-8 h-8 rounded-xl bg-[#58CC02]/15 flex items-center justify-center flex-shrink-0">
            <MousePointerClick className="w-4 h-4 text-[#58CC02]" />
          </div>
          <p className="text-sm">Tap & hold to buy a share</p>
        </div>
        <div className="flex items-center gap-3 text-foreground/80">
          <div className="w-8 h-8 rounded-xl bg-destructive/15 flex items-center justify-center flex-shrink-0">
            <MousePointerClick className="w-4 h-4 text-destructive rotate-180" />
          </div>
          <p className="text-sm">Release to sell at the current price</p>
        </div>
        <div className="flex items-center gap-3 text-foreground/80">
          <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-accent-foreground" />
          </div>
          <p className="text-sm">Beat buy-and-hold to earn bonus XP</p>
        </div>
      </div>

      {bestScore !== null && (
        <p className="text-sm text-muted-foreground">Best return: {bestScore >= 0 ? "+" : ""}{bestScore.toFixed(1)}%</p>
      )}

      <Button
        onClick={onStart}
        className="w-full max-w-xs h-14 text-lg font-black rounded-2xl bg-[#58CC02] hover:bg-[#58CC02]/90 text-white border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 transition-all"
      >
        PLAY
      </Button>
    </motion.div>
  );
}