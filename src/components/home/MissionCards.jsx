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
  { emoji: "⚡", title: "Complete a Speed Round", xp: 15 },
];

const GRADIENTS = [
  "from-blue-600/20 to-purple-600/20",
  "from-green-600/20 to-emerald-600/20",
  "from-amber-600/20 to-orange-600/20",
];

export default function MissionCards({ missions = [] }) {
  const displayMissions = missions.length > 0
    ? missions
    : MISSION_POOL.sort(() => Math.random() - 0.5).slice(0, 3).map((m, i) => ({ ...m, complete: false }));

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-foreground">Today's Missions</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {displayMissions.map((mission, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            className={`min-w-[140px] rounded-2xl bg-gradient-to-br ${GRADIENTS[i % 3]} border border-border/30 p-3 flex flex-col gap-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{mission.emoji}</span>
              {mission.complete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
              )}
            </div>
            <p className="text-xs font-bold text-foreground leading-tight">{mission.title}</p>
            <span className="text-[10px] font-bold text-primary">+{mission.xp} XP</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}