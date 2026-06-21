import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useDemo } from "@/lib/DemoContext";
import { motion } from "framer-motion";
import StreakFlame from "@/components/gamification/StreakFlame";
import HeartsDisplay from "@/components/gamification/HeartsDisplay";
import XpBadge from "@/components/gamification/XpBadge";
import DailyGoalRing from "@/components/gamification/DailyGoalRing";
import MissionCards from "@/components/home/MissionCards";
import DailyChallenge from "@/components/home/DailyChallenge";
import MarketPulse from "@/components/home/MarketPulse";
import ContinueCard from "@/components/home/ContinueCard";
import NewsFeed from "@/components/home/NewsFeed";
import { Gem } from "lucide-react";

function getGreeting(name) {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name} ☀️`;
  if (hour < 17) return `Good afternoon, ${name} 🔥`;
  return `Good evening, ${name} 📚`;
}

export default function Home() {
  const { isDemoMode } = useDemo();
  const { demoUser } = useDemo();
  const [user, setUser] = useState(isDemoMode ? demoUser : null);
  const [loading, setLoading] = useState(!isDemoMode);

  useEffect(() => {
    if (isDemoMode) return;
    base44.auth.me().then(u => {
      setUser(u);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [isDemoMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const name = user?.full_name?.split(" ")[0] || user?.username || user?.email?.split("@")[0] || "Investor";
  const xp = user?.xp_total || 0;
  const level = user?.level || 1;
  const streak = user?.streak_current || 0;
  const hearts = user?.hearts_current ?? 5;
  const gems = user?.gems || 0;
  const dailyXp = user?.daily_xp_earned_today || 0;
  const dailyGoal = user?.daily_goal_xp || 20;

  return (
    <div className="px-4 pt-5 pb-4 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        {/* Top stats bar — Duolingo style */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StreakFlame streak={streak} size="md" />
            <HeartsDisplay hearts={hearts} />
          </div>
          <div className="flex items-center gap-1.5 bg-purple-100 border-b-2 border-purple-200 px-3 py-1.5 rounded-2xl">
            <Gem className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs font-black text-purple-600">{gems}</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02] mb-0.5">Welcome back!</p>
          <h1 className="text-2xl font-black text-gray-900">{getGreeting(name)}</h1>
          <XpBadge xp={xp} level={level} />
        </div>
      </motion.div>

      {/* Daily Goal Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <DailyGoalRing current={dailyXp} goal={dailyGoal} />
      </motion.div>

      {/* Missions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <MissionCards />
      </motion.div>

      {/* Continue */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <ContinueCard />
      </motion.div>

      {/* Daily Challenge */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <DailyChallenge />
      </motion.div>

      {/* Market Pulse */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <MarketPulse />
      </motion.div>

      {/* News */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <NewsFeed />
      </motion.div>

      {/* Streak Warning */}
      {new Date().getHours() >= 20 && dailyXp === 0 && streak > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl bg-orange-50 border-b-4 border-orange-200 p-4 flex items-center gap-3"
        >
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-xs font-black text-orange-600">Your {streak}-day streak is at risk!</p>
            <p className="text-[10px] text-orange-400 font-bold">Quick — do one lesson before midnight.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}