import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useDemo, DEMO_USER } from "@/lib/DemoContext";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LEAGUE_TIERS } from "@/lib/lessonData";
import StreakFlame from "@/components/gamification/StreakFlame";

// Generate fake leaderboard
function generateLeaderboard(userXp, username) {
  const names = [
    "InvestorKing", "StockNinja", "BullRunner", "MarketWiz", "TradePro",
    "WallStreetBae", "DividendDiva", "GreenCandle", "BearSlayer", "ChartMaster",
    "MoneyMoves", "ShareHolder", "PortfolioPro", "EarningsAce", "IndexFund",
    "CandleStick", "BuyTheDip", "HodlGang", "PennyWise", "BlueChip",
    "AlphaTrader", "BetaBeater", "GammaGains", "DeltaForce", "ThetaGang",
    "VegaVibes", "RhoRunner", "OmegaWolf", "SigmaGrind",
  ];
  const board = names.map((name, i) => ({
    rank: 0,
    name,
    xp: Math.floor(Math.random() * 500) + 50,
    streak: Math.floor(Math.random() * 30),
    isUser: false,
  }));
  board.push({ rank: 0, name: username || "You", xp: userXp || 0, streak: 0, isUser: true });
  board.sort((a, b) => b.xp - a.xp);
  board.forEach((p, i) => (p.rank = i + 1));
  return board;
}

export default function Leagues() {
  const { isDemoMode } = useDemo();
  const [user, setUser] = useState(isDemoMode ? DEMO_USER : null);

  useEffect(() => {
    if (isDemoMode) return;
    base44.auth.me().then(setUser).catch(() => {});
  }, [isDemoMode]);

  const tier = user?.league_tier || 1;
  const leagueInfo = LEAGUE_TIERS.find(l => l.tier === tier) || LEAGUE_TIERS[0];
  const seasonXp = user?.league_season_xp || 0;

  const leaderboard = useMemo(
    () => generateLeaderboard(seasonXp, user?.username || user?.full_name?.split(" ")[0]),
    [seasonXp, user]
  );

  const userRank = leaderboard.find(p => p.isUser)?.rank || 15;

  // Season countdown
  const now = new Date();
  const daysLeft = 7 - now.getDay();

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* League Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl block"
        >
          {leagueInfo.emoji}
        </motion.span>
        <h1 className="text-xl font-black text-foreground">{leagueInfo.name}</h1>
        <p className="text-xs text-muted-foreground">
          {daysLeft} days remaining · You are #{userRank} of 30
        </p>
      </motion.div>

      {/* Podium - Top 3 */}
      <div className="flex items-end justify-center gap-3 h-36">
        {[1, 0, 2].map((idx) => {
          const player = leaderboard[idx];
          if (!player) return null;
          const heights = { 0: "h-28", 1: "h-24", 2: "h-20" };
          const medals = { 0: "🥇", 1: "🥈", 2: "🥉" };
          return (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`flex flex-col items-center ${heights[idx]}`}
            >
              <span className="text-lg">{medals[idx]}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black ${
                player.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>
                {player.name.slice(0, 2).toUpperCase()}
              </div>
              <p className={`text-[10px] font-bold mt-1 truncate max-w-[70px] ${
                player.isUser ? "text-primary" : "text-foreground"
              }`}>
                {player.name}
              </p>
              <p className="text-[10px] text-muted-foreground font-bold">{player.xp} XP</p>
            </motion.div>
          );
        })}
      </div>

      {/* Leaderboard */}
      <Card className="bg-card/80 border-border/50 overflow-hidden">
        {/* Promoted Zone */}
        <div className="px-3 py-1.5 bg-green-500/10">
          <p className="text-[10px] font-bold text-green-400 uppercase">⬆ Promotion Zone</p>
        </div>
        <div className="divide-y divide-border/30">
          {leaderboard.slice(0, 5).map((player) => (
            <LeaderboardRow key={player.name} player={player} />
          ))}
        </div>

        {/* Safe Zone */}
        <div className="px-3 py-1.5 bg-muted/30">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Safe Zone</p>
        </div>
        <div className="divide-y divide-border/30 max-h-60 overflow-y-auto">
          {leaderboard.slice(5, 25).map((player) => (
            <LeaderboardRow key={player.name} player={player} />
          ))}
        </div>

        {/* Danger Zone */}
        <div className="px-3 py-1.5 bg-red-500/10">
          <p className="text-[10px] font-bold text-red-400 uppercase">⬇ Danger Zone</p>
        </div>
        <div className="divide-y divide-border/30">
          {leaderboard.slice(25).map((player) => (
            <LeaderboardRow key={player.name} player={player} />
          ))}
        </div>
      </Card>

      {/* Weekly Stats */}
      <Card className="p-4 bg-card/80 border-border/50">
        <h3 className="text-sm font-bold text-foreground mb-3">Your Week</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatItem label="XP Earned" value={`${seasonXp}`} />
          <StatItem label="Current Rank" value={`#${userRank}`} />
          <StatItem label="League Tier" value={leagueInfo.name} />
          <StatItem label="Days Left" value={`${daysLeft}`} />
        </div>
      </Card>
    </div>
  );
}

function LeaderboardRow({ player }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 ${
      player.isUser ? "bg-primary/5" : ""
    }`}>
      <span className={`w-6 text-xs font-black text-center ${
        player.rank <= 3 ? "text-amber-400" : "text-muted-foreground"
      }`}>
        {player.rank}
      </span>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${
        player.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
      }`}>
        {player.name.slice(0, 2).toUpperCase()}
      </div>
      <p className={`flex-1 text-xs font-bold truncate ${
        player.isUser ? "text-primary" : "text-foreground"
      }`}>
        {player.name} {player.isUser && "(you)"}
      </p>
      <span className="text-xs font-bold text-muted-foreground">{player.xp} XP</span>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}