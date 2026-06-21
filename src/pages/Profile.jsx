import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useDemo, DEMO_BADGES, DEMO_LESSON_PROGRESS } from "@/lib/DemoContext";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Settings, Zap, Gem, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { getLevelTitle, LEAGUE_TIERS, BADGES, getXpForLevel } from "@/lib/lessonData";
import StreakFlame from "@/components/gamification/StreakFlame";
import HeartsDisplay from "@/components/gamification/HeartsDisplay";
import { Progress } from "@/components/ui/progress";
import MasteryBar from "@/components/profile/MasteryBar";
import { calculateAllMastery, TOPIC_META } from "@/lib/masteryEngine";

export default function Profile() {
  const { isDemoMode, demoUser } = useDemo();
  const [user, setUser] = useState(isDemoMode ? demoUser : null);
  const [loading, setLoading] = useState(!isDemoMode);

  useEffect(() => {
    if (isDemoMode) return;
    base44.auth.me().then(u => { setUser(u); setLoading(false); }).catch(() => setLoading(false));
  }, [isDemoMode]);

  const userId = user?.id || null;

  const { data: userBadges = [] } = useQuery({
    queryKey: ["user-badges", userId],
    queryFn: () => isDemoMode ? Promise.resolve(DEMO_BADGES) : base44.entities.UserBadge.filter({ created_by_id: userId }),
    enabled: isDemoMode || !!userId,
    initialData: isDemoMode ? DEMO_BADGES : [],
  });

  const { data: lessonProgress = [] } = useQuery({
    queryKey: ["lesson-progress-profile", userId],
    queryFn: () => isDemoMode ? Promise.resolve(DEMO_LESSON_PROGRESS) : base44.entities.LessonProgress.filter({ created_by_id: userId }),
    enabled: isDemoMode || !!userId,
    initialData: isDemoMode ? DEMO_LESSON_PROGRESS : [],
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const level = user?.level || 1;
  const xpTotal = user?.xp_total || 0;
  const { title, emoji } = getLevelTitle(level);
  const currentLevelXp = getXpForLevel(level);
  const nextLevelXp = getXpForLevel(level + 1);
  const xpProgress = nextLevelXp > 0 ? ((xpTotal % (level * 200)) / (level * 200)) * 100 : 100;
  const streak = user?.streak_current || 0;
  const longestStreak = user?.streak_longest || 0;
  const hearts = user?.hearts_current ?? 5;
  const gems = user?.gems || 0;
  const leagueTier = user?.league_tier || 1;
  const leagueInfo = LEAGUE_TIERS.find(l => l.tier === leagueTier) || LEAGUE_TIERS[0];
  const completedLessons = lessonProgress.filter(p => p.status === "complete").length;
  const earnedBadgeSlugs = userBadges.map(b => b.badge_slug);

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-foreground">Profile</h1>
        <Link to="/settings" className="text-muted-foreground">
          <Settings className="w-5 h-5" />
        </Link>
      </div>

      {/* User Card */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-5 bg-gradient-to-br from-card to-card/80 border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl">
              {emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-black text-foreground">
                {user?.username || user?.full_name || "Investor"}
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Level {level} · {title}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <StreakFlame streak={streak} size="sm" />
                <HeartsDisplay hearts={hearts} />
                <div className="flex items-center gap-1">
                  <Gem className="w-3 h-3 text-purple-400" />
                  <span className="text-xs font-bold text-purple-400">{gems}</span>
                </div>
              </div>
              <Link to="/upgrade" className="mt-3 block">
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl px-3 py-2 hover:opacity-80 transition-opacity">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black text-primary">Upgrade to Pro</span>
                </div>
              </Link>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Level {level}</span>
              <span>Level {Math.min(level + 1, 50)}</span>
            </div>
            <Progress value={xpProgress} className="h-2.5" />
            <p className="text-[10px] text-muted-foreground mt-1 text-center">
              {xpTotal.toLocaleString()} XP total
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Total XP" value={xpTotal.toLocaleString()} icon="⚡" />
        <StatCard label="Level" value={level} icon={emoji} />
        <StatCard label="League" value={leagueInfo.emoji} icon="" />
        <StatCard label="Lessons" value={completedLessons} icon="📚" />
        <StatCard label="Streak" value={streak} icon="🔥" />
        <StatCard label="Best Streak" value={longestStreak} icon="💪" />
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3">
          Badges ({earnedBadgeSlugs.length}/{BADGES.length})
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((badge) => {
            const earned = earnedBadgeSlugs.includes(badge.slug);
            return (
              <motion.div
                key={badge.slug}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                  earned ? "bg-primary/5" : "opacity-30"
                }`}
              >
                <span className={`text-2xl ${earned ? "" : "grayscale"}`}>
                  {earned ? badge.emoji : "❓"}
                </span>
                <span className="text-[9px] font-bold text-center text-foreground leading-tight">
                  {earned ? badge.name : "???"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Topic Mastery */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3">Topic Mastery</h3>
        <Card className="p-4 bg-card/80 border-border/50 space-y-3">
          {Object.keys(TOPIC_META).map(topic => {
            const mastery = calculateAllMastery(lessonProgress)[topic] || 0;
            return <MasteryBar key={topic} topic={topic} mastery={mastery} />;
          })}
        </Card>
      </div>

      {/* Streak Protection */}
      <Card className="p-4 bg-card/80 border-border/50">
        <h3 className="text-sm font-bold text-foreground mb-2">Streak Protection</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">❄️</span>
            <div>
              <p className="text-xs font-bold text-foreground">Streak Freezes</p>
              <p className="text-[10px] text-muted-foreground">Protects your streak for 1 missed day</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className={`text-lg ${i < (user?.streak_freezes_remaining || 0) ? "" : "grayscale opacity-30"}`}>
                ❄️
              </span>
            ))}
          </div>
        </div>
        {(user?.streak_freezes_remaining || 0) < 2 && (
          <p className="text-[10px] text-muted-foreground mt-2">
            Get a freeze for 10 💎
          </p>
        )}
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <Card className="p-3 bg-card/80 border-border/50 text-center">
      <span className="text-lg">{icon}</span>
      <p className="text-lg font-black text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
    </Card>
  );
}