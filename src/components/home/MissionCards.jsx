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
      <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Daily Missions</p>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {displayMissions.map((mission, i) => {
          const s = CARD_STYLES[i % 3];
          return (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95, y: 2 }}
              className={`min-w-[140px] rounded-2xl ${s.bg} border-b-4 ${s.border} p-4 flex flex-col gap-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{mission.emoji}</span>
                {mission.complete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-[#58CC02] border-b-2 border-[#46A302] flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                )}
              </div>
              <p className="text-xs font-black text-gray-800 leading-tight">{mission.title}</p>
              <span className={`text-[10px] font-black ${s.xp}`}>+{mission.xp} XP</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}