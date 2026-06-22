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
import { Gem, RefreshCw } from "lucide-react";
import PullToRefresh from "@/components/common/PullToRefresh";

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

  const handleRefresh = async () => {
    // Simulate refresh - in real app would refetch data
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!isDemoMode) {
      const user = await base44.auth.me().catch(() => null);
      if (user) setUser(user);
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="px-4 pt-5 pb-4 space-y-5 min-h-screen" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        {/* Top stats bar */}
        <div
          className="rounded-3xl border border-white/50 px-4 py-3 flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center gap-3">
            <XpBadge xp={xp} level={level} />
            {/* Streak */}
            <div className="flex items-center gap-1">
              <StreakFlame streak={streak} size="sm" />
            </div>
            {/* Hearts */}
            <HeartsDisplay hearts={hearts} />
          </div>
          {/* Gems */}
          <div className="flex items-center gap-1 text-purple-500">
            <Gem className="w-3.5 h-3.5" />
            <span className="text-xs font-black text-purple-600">{gems}</span>
          </div>
        </div>

        {/* Greeting */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5 text-center">Welcome back!</p>
          <h1 className="text-2xl font-black text-gray-900 text-center">{getGreeting(name)}</h1>
        </div>
      </motion.div>

      {/* Continue */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ContinueCard />
      </motion.div>

      {/* Missions + Daily Challenge side by side */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3 items-start">
        <MissionCards />
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
          className="rounded-3xl border border-orange-200/60 p-4 flex items-center gap-3 select-none"
        style={{ background: "rgba(255,237,213,0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        >
          <span className="text-2xl select-none">⚠️</span>
          <div>
            <p className="text-xs font-black text-orange-600">Your {streak}-day streak is at risk!</p>
            <p className="text-[10px] text-orange-400 font-bold">Quick — do one lesson before midnight.</p>
          </div>
        </motion.div>
      )}
        <p className="text-center text-[10px] text-gray-400 font-bold pt-2">Created by Ahmetzhan Aldiyar</p>
      </div>
    </PullToRefresh>
  );
}