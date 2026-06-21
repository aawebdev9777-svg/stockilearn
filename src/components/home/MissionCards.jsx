import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const MISSION_POOL = [
  { emoji: "🎯", title: "Complete 1 lesson", xp: 10 },
  { emoji: "📰", title: "Read today's briefing", xp: 5 },
  { emoji: "🔮", title: "Make a prediction", xp: 15 },
  { emoji: "💼", title: "Execute a paper trade", xp: 10 },
  { emoji: "🧠", title: "Score 100% on a quiz", xp: 20 },
  { emoji: "📊", title: "Check your portfolio", xp: 5 },
];

const CARD_STYLES = [
  { bg: "bg-blue-50", border: "border-blue-200", xp: "text-blue-500" },
  { bg: "bg-purple-50", border: "border-purple-200", xp: "text-purple-500" },
  { bg: "bg-amber-50", border: "border-amber-200", xp: "text-amber-500" },
];

export default function MissionCards({ missions = [] }) {
  const displayMissions = missions.length > 0
    ? missions
    : MISSION_POOL.sort(() => Math.random() - 0.5).slice(0, 3).map(m => ({ ...m, complete: false }));

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Daily Missions</p>
      <div className="space-y-2">
        {displayMissions.map((mission, i) => {
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="rounded-2xl p-3 flex items-start gap-2 border border-white/50 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              <span className="text-lg shrink-0">{mission.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-800 leading-tight">{mission.title}</p>
                <span className="text-[10px] font-black text-purple-500">+{mission.xp} XP</span>
              </div>
              {mission.complete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-[#58CC02] flex items-center justify-center shrink-0 mt-0.5"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white/60 shrink-0 mt-0.5" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}