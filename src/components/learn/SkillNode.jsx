import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Lock } from "lucide-react";

export default function SkillNode({ lesson, status = "locked", index, unitColor }) {
  const isComplete = status === "complete";
  const isLocked = status === "locked";
  const isCurrent = status === "in_progress" || status === "available";
  const isCheckpoint = lesson.type === "checkpoint";

  // Zigzag horizontal offset
  const xOffset = (index % 3 === 0) ? 0 : (index % 3 === 1) ? 60 : -60;

  const nodeContent = (
    <motion.div
      whileTap={!isLocked ? { scale: 0.9 } : {}}
      className="flex flex-col items-center gap-1.5"
      style={{ marginLeft: xOffset }}
    >
      <div
        className={`relative w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all ${
          isComplete
            ? "border-primary bg-primary/20"
            : isCurrent
            ? "border-primary bg-primary/10 animate-pulse-glow"
            : isCheckpoint && !isLocked
            ? "border-amber-400 bg-amber-400/10"
            : "border-muted bg-muted/50"
        }`}
      >
        {isComplete ? (
          <Check className="w-6 h-6 text-primary" strokeWidth={3} />
        ) : isLocked ? (
          <Lock className="w-5 h-5 text-muted-foreground/50" />
        ) : isCheckpoint ? (
          <span className="text-xl">🏆</span>
        ) : (
          <span className="text-lg font-black" style={{ color: unitColor }}>
            {lesson.id}
          </span>
        )}
      </div>
      <span className={`text-[10px] font-semibold text-center max-w-[100px] leading-tight ${
        isLocked ? "text-muted-foreground/40" : "text-foreground"
      }`}>
        {isLocked && !isCheckpoint ? "???" : lesson.title}
      </span>
    </motion.div>
  );

  if (isLocked) return <div className="py-2">{nodeContent}</div>;

  return (
    <Link to={`/learn/lesson/${lesson.id}`} className="py-2 block">
      {nodeContent}
    </Link>
  );
}