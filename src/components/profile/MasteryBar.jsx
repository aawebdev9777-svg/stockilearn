import React from "react";
import { motion } from "framer-motion";
import { TOPIC_META } from "@/lib/masteryEngine";

export default function MasteryBar({ topic, mastery }) {
  const meta = TOPIC_META[topic] || { label: topic, emoji: "📊", color: "#00FF87" };
  const color = meta.color;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{meta.emoji}</span>
          <span className="text-xs font-bold text-foreground">{meta.label}</span>
        </div>
        <span className="text-xs font-black" style={{ color: mastery >= 80 ? "#00FF87" : mastery >= 50 ? "#f59e0b" : "#ef4444" }}>
          {mastery}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${mastery}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}