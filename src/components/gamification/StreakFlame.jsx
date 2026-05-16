import React from "react";
import { motion } from "framer-motion";

export default function StreakFlame({ streak = 0, size = "md" }) {
  const sizes = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" };
  const numSizes = { sm: "text-xs", md: "text-sm", lg: "text-lg" };
  
  const isLit = streak > 0;
  const isGolden = streak > 30;

  return (
    <div className="flex items-center gap-1">
      <motion.div
        animate={isLit ? {
          scale: [1, 1.05, 0.97, 1.03, 1],
          rotate: [0, -2, 2, -1, 0],
        } : {}}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
        className={`${sizes[size]} ${isLit ? "" : "grayscale opacity-40"}`}
      >
        {isGolden ? "🌟" : "🔥"}
      </motion.div>
      <span className={`font-black ${numSizes[size]} ${
        isGolden ? "text-amber-400" : isLit ? "text-orange-500" : "text-muted-foreground"
      }`}>
        {streak}
      </span>
    </div>
  );
}