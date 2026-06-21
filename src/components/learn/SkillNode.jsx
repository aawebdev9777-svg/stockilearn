import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export default function SkillNode({ lesson, status = "locked", index, unitColor }) {
  const isComplete = status === "complete";
  const isLocked = status === "locked";
  const isCurrent = status === "in_progress" || status === "available";
  const isCheckpoint = lesson.type === "checkpoint";

  const xOffset = (index % 3 === 0) ? 0 : (index % 3 === 1) ? 70 : -70;

  let bgColor, borderColor, shadowColor, textColor;
  if (isComplete) {
    bgColor = "bg-[#58CC02]"; borderColor = "border-[#46A302]"; shadowColor = "shadow-[0_4px_0_#46A302]"; textColor = "text-white";
  } else if (isCurrent) {
    bgColor = "bg-[#58CC02]"; borderColor = "border-[#46A302]"; shadowColor = "shadow-[0_4px_0_#46A302]"; textColor = "text-white";
  } else if (isCheckpoint && !isLocked) {
    bgColor = "bg-amber-400"; borderColor = "border-amber-600"; shadowColor = "shadow-[0_4px_0_#d97706]"; textColor = "text-white";
  } else {
    bgColor = "bg-gray-200"; borderColor = "border-gray-300"; shadowColor = "shadow-[0_4px_0_#d1d5db]"; textColor = "text-gray-400";
  }

  const nodeContent = (
    <motion.div
      whileTap={!isLocked ? { scale: 0.9, y: 3 } : {}}
      className="flex flex-col items-center gap-2 py-3"
      style={{ marginLeft: xOffset }}
    >
      {/* XP pill above current node */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[#58CC02] rounded-xl px-3 py-1 text-[10px] font-black text-[#58CC02] shadow-sm"
        >
          +{lesson.xp} XP
        </motion.div>
      )}

      <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-b-4 transition-all ${bgColor} ${borderColor} ${shadowColor} ${isCurrent ? "ring-4 ring-[#58CC02]/25" : ""}`}>
        {isComplete ? (
          <span className="text-2xl">✓</span>
        ) : isLocked ? (
          <Lock className="w-6 h-6 text-gray-400" />
        ) : isCheckpoint ? (
          <span className="text-2xl">🏆</span>
        ) : (
          <span className="text-xl font-black text-white">{lesson.icon || "📖"}</span>
        )}
      </div>

      <span className={`text-[11px] font-black text-center max-w-[90px] leading-tight ${
        isLocked ? "text-gray-300" : isComplete ? "text-gray-500" : "text-gray-700"
      }`}>
        {isLocked && !isCheckpoint ? "???" : lesson.title}
      </span>
    </motion.div>
  );

  if (isLocked) return <div>{nodeContent}</div>;

  return (
    <Link to={`/learn/lesson/${lesson.id}`} className="block">
      {nodeContent}
    </Link>
  );
}