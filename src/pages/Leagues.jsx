import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useDemo } from "@/lib/DemoContext";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Shield, Flame, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { LEAGUE_TIERS } from "@/lib/lessonData";

function generateLeaderboard(userXp, username) {
  const names = [
    "InvestorKing", "StockNinja", "BullRunner", "MarketWiz", "TradePro",
    "WallStreetBae", "DividendDiva", "GreenCandle", "BearSlayer", "ChartMaster",
    "MoneyMoves", "ShareHolder", "PortfolioPro", "EarningsAce", "IndexFund",
    "CandleStick", "BuyTheDip", "HodlGang", "PennyWise", "BlueChip",
    "AlphaTrader", "BetaBeater", "GammaGains", "DeltaForce", "ThetaGang",
    "VegaVibes", "RhoRunner", "OmegaWolf", "SigmaGrind",
  ];
  const board = names.map((name) => ({
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

const TIER_COLORS = {
  1: { bg: "bg-stone-100", border: "border-stone-300", text: "text-stone-600" },
  2: { bg: "bg-amber-100", border: "border-amber-300", text: "text-amber-700" },
  3: { bg: "bg-slate-100", border: "border-slate-300", text: "text-slate-600" },
  4: { bg: "bg-yellow-100", border: "border-yellow-300", text: "text-yellow-700" },
  5: { bg: "bg-cyan-100", border: "border-cyan-300", text: "text-cyan-700" },
  6: { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-700" },
  7: { bg: "bg-purple-100", border: "border-purple-300", text: "text-purple-700" },
};

function LeagueBadge({ tier }) {
  const colors = TIER_COLORS[tier] || TIER_COLORS[1];
  return (
    <div className={`w-20 h-20 rounded-3xl ${colors.bg} border-b-4 ${colors.border} flex items-center justify-center`}>
      <Trophy className={`w-10 h-10 ${colors.text}`} strokeWidth={2} />
    </div>
  );
}

function PodiumBlock({ player, position }) {
  const heights = ["h-28", "h-20", "h-16"];
  const podiumColors = [
    "bg-yellow-400 border-yellow-500",
    "bg-slate-300 border-slate-400",
    "bg-amber-600 border-amber-700",
  ];
  const labels = ["1st", "2nd", "3rd"];
  const avatarSizes = ["w-14 h-14 text-sm", "w-12 h-12 text-xs", "w-11 h-11 text-xs"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.1 }}
      className="flex flex-col items-center gap-1.5 flex-1"
    >
      <div className={`${avatarSizes[position]} rounded-full flex items-center justify-center font-black text-white ${
        player.isUser ? "bg-[#58CC02]" : "bg-gray-400"
      }`}>
        {player.name.slice(0, 2).toUpperCase()}
      </div>
      <p className={`text-[10px] font-bold truncate max-w-[68px] text-center ${player.isUser ? "text-[#58CC02]" : "text-gray-700"}`}>
        {player.name}
      </p>
      <p className="text-[10px] font-black text-gray-500">{player.xp} XP</p>
      <div className={`w-full ${heights[position]} rounded-t-2xl border-b-4 flex items-start justify-center pt-2 ${podiumColors[position]}`}>
        <span className="text-white font-black text-sm">{labels[position]}</span>
      </div>
    </motion.div>
  );
}

function ZoneBanner({ label, Icon, bgClass, textClass }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 ${bgClass}`}>
      <Icon className={`w-3 h-3 ${textClass}`} />
      <p className={`text-[10px] font-black uppercase tracking-widest ${textClass}`}>{label}</p>
    </div>
  );
}

function LeaderboardRow({ player }) {
  const rankStyle =
    player.rank === 1 ? "text-yellow-500 font-black" :
    player.rank === 2 ? "text-slate-400 font-black" :
    player.rank === 3 ? "text-amber-600 font-black" :
    "text-gray-400 font-bold";

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 ${
      player.isUser ? "bg-green-50" : "bg-white"
    }`}>
      <span className={`w-6 text-sm text-center ${rankStyle}`}>{player.rank}</span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white ${
        player.isUser ? "bg-[#58CC02]" : "bg-gray-300"
      }`}>
        {player.name.slice(0, 2).toUpperCase()}
      </div>
      <p className={`flex-1 text-sm font-bold truncate ${player.isUser ? "text-[#58CC02]" : "text-gray-800"}`}>
        {player.name}
        {player.isUser && <span className="ml-1 text-[10px] text-gray-400 font-normal">(you)</span>}
      </p>
      {player.streak > 0 && (
        <div className="flex items-center gap-0.5 text-orange-400">
          <Flame className="w-3 h-3" />
          <span className="text-xs font-bold">{player.streak}</span>
        </div>
      )}
      <div className="flex items-center gap-1 text-gray-500">
        <TrendingUp className="w-3 h-3" />
        <span className="text-xs font-black">{player.xp}</span>
      </div>
    </div>
  );
}

export default function Leagues() {
  const { isDemoMode, demoUser } = useDemo();
  const [user, setUser] = useState(isDemoMode ? demoUser : null);

  useEffect(() => {
    if (isDemoMode) return;
    base44.auth.me().then(setUser).catch(() => {});
  }, [isDemoMode]);

  const tier = user?.league_tier || 1;
  const leagueInfo = LEAGUE_TIERS.find(l => l.tier === tier) || LEAGUE_TIERS[0];
  const tierColors = TIER_COLORS[tier] || TIER_COLORS[1];
  const seasonXp = user?.league_xp || 0;

  const leaderboard = useMemo(
    () => generateLeaderboard(seasonXp, user?.username || user?.full_name?.split(" ")[0]),
    [seasonXp, user]
  );

  const userRank = leaderboard.find(p => p.isUser)?.rank || 15;
  const daysLeft = 7 - new Date().getDay();

  const stats = [
    { label: "XP Earned", value: `${seasonXp} XP`, Icon: TrendingUp, color: "text-[#58CC02]" },
    { label: "Current Rank", value: `#${userRank} / 30`, Icon: Trophy, color: "text-yellow-500" },
    { label: "League", value: leagueInfo.name.replace(" League", ""), Icon: Shield, color: tierColors.text },
    { label: "Days Left", value: `${daysLeft} days`, Icon: Flame, color: "text-orange-400" },
  ];

  return (
    <div className="px-4 pt-6 pb-8 space-y-5">

      {/* Page header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Weekly Competition</p>
        <h1 className="text-2xl font-black text-gray-900 mt-0.5">Leagues</h1>
      </div>

      {/* League card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-5 border border-white/50`}
        style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        <div className="flex items-center gap-4">
          <LeagueBadge tier={tier} />
          <div className="flex-1">
            <p className={`text-[10px] font-black uppercase tracking-widest ${tierColors.text}`}>Your League</p>
            <h2 className="text-xl font-black text-gray-900 mt-0.5">{leagueInfo.name}</h2>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1 text-gray-500">
                <Shield className="w-3 h-3" />
                <span className="text-xs font-bold">Rank #{userRank} of 30</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-bold">{seasonXp} XP</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">{daysLeft} days left this season</p>
          </div>
        </div>

        {/* Zone pills */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 rounded-xl bg-green-100 border-b-2 border-green-300 px-3 py-2 flex items-center gap-1.5">
            <ChevronUp className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <div>
              <p className="text-[10px] font-black text-green-700">Top 5</p>
              <p className="text-[9px] text-green-600 font-medium">Promoted</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-white/60 border-b-2 border-gray-200 px-3 py-2 flex items-center gap-1.5">
            <Minus className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] font-black text-gray-600">6 – 25</p>
              <p className="text-[9px] text-gray-400 font-medium">Safe</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-red-50 border-b-2 border-red-200 px-3 py-2 flex items-center gap-1.5">
            <ChevronDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <div>
              <p className="text-[10px] font-black text-red-600">Bottom 5</p>
              <p className="text-[9px] text-red-400 font-medium">Relegated</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Podium */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Top 3 This Week</p>
        <div className="flex items-end gap-3 h-48">
          {[1, 0, 2].map((idx) => {
            const player = leaderboard[idx];
            if (!player) return null;
            return <PodiumBlock key={player.name} player={player} position={idx} />;
          })}
        </div>
      </div>

      {/* Full leaderboard */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Rankings</p>
        <div className="rounded-2xl border border-white/50 overflow-hidden" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <ZoneBanner label="Promotion Zone" Icon={ChevronUp} bgClass="bg-green-50 border-b border-green-100" textClass="text-green-600" />
          {leaderboard.slice(0, 5).map(p => <LeaderboardRow key={p.name} player={p} />)}

          <ZoneBanner label="Safe Zone" Icon={Minus} bgClass="bg-gray-50 border-y border-gray-100" textClass="text-gray-400" />
          <div className="max-h-72 overflow-y-auto">
            {leaderboard.slice(5, 25).map(p => <LeaderboardRow key={p.name} player={p} />)}
          </div>

          <ZoneBanner label="Danger Zone" Icon={ChevronDown} bgClass="bg-red-50 border-t border-red-100" textClass="text-red-500" />
          {leaderboard.slice(25).map(p => <LeaderboardRow key={p.name} player={p} />)}
        </div>
      </div>

      {/* Stats grid */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02] mb-2">Your Stats</p>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, Icon, color }) => (
            <motion.div key={label} whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="rounded-2xl border border-white/50 p-3.5 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Icon className={`w-4 h-4 ${color}`} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">{label}</p>
                <p className="text-sm font-black text-gray-900">{value}</p>
              </div>
            </motion.div>
            ))}
            </div>
            </div>
            </div>
  );
}