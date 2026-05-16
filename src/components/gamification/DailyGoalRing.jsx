import React from "react";
import { motion } from "framer-motion";

export default function DailyGoalRing({ current = 0, goal = 20 }) {
  const progress = Math.min(current / goal, 1);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference * (1 - progress);
  const isComplete = current >= goal;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70" cy="70" r="54"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="10"
        />
        <motion.circle
          cx="70" cy="70" r="54"
          fill="none"
          stroke={isComplete ? "hsl(155, 100%, 50%)" : "hsl(155, 100%, 50%)"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={isComplete ? "drop-shadow-[0_0_8px_hsl(155,100%,50%)]" : ""}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-foreground">{current}</span>
        <span className="text-xs text-muted-foreground font-medium">/ {goal} XP</span>
        {isComplete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold text-primary mt-1"
          >
            🎉 DONE!
          </motion.span>
        )}
      </div>
    </div>
  );
}