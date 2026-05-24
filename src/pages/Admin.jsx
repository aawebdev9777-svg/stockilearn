import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Users, BookOpen, Trophy, BarChart3, Shield, Zap, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LESSONS, BADGES, LEVEL_TITLES } from "@/lib/lessonData";

const TABS = [
  { id: "overview",     label: "Overview",    icon: BarChart3 },
  { id: "users",        label: "Users",       icon: Users },
  { id: "content",      label: "Content",     icon: BookOpen },
  { id: "gamification", label: "Gamification",icon: Trophy },
  { id: "moderation",   label: "Moderation",  icon: Shield },
];

function StatCard({ label, value, sub, color = "text-primary", icon: Icon }) {
  return (
    <Card className="p-4 bg-card/80 border-border/50">
      <div className="flex items-center gap-3 mb-1">
        {Icon && <Icon className={`w-4 h-4 ${color}`} aria-hidden />}
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
      </div>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </Card>
  );
}

function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <Card className="bg-card/80 border-border/50 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
        <h3 className="text-sm font-black text-foreground">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </Card>
  );
}

// ── Overview Tab ─────────────────────────────────────────────
function OverviewTab() {
  const stats = [
    { label: "Total Lessons",    value: LESSONS.length,       sub: "Across 5 units",          color: "text-blue-400",   icon: BookOpen },
    { label: "Total Badges",     value: BADGES.length,        sub: "Collectible achievements", color: "text-amber-400",  icon: Trophy },
    { label: "Level Cap",        value: "50",                 sub: "Market Legend",           color: "text-primary",    icon: Zap },
    { label: "League Tiers",     value: "7",                  sub: "Pebble → Obsidian",       color: "text-purple-400", icon: Shield },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <Section title="Platform Architecture">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 py-1.5 border-b border-border/30">
            <span className="font-bold text-foreground min-w-[140px]">XP System</span>
            <span>Lesson XP × Streak Multiplier × Accuracy Multiplier. Cap at 2× for 100-day streaks.</span>
          </div>
          <div className="flex items-start gap-2 py-1.5 border-b border-border/30">
            <span className="font-bold text-foreground min-w-[140px]">Level Curve</span>
            <span>200 XP for Level 1, +80 XP per level. Level 50 requires ~280 XP (total ~9,600 XP to max).</span>
          </div>
          <div className="flex items-start gap-2 py-1.5 border-b border-border/30">
            <span className="font-bold text-foreground min-w-[140px]">Mastery Score</span>
            <span>60% weight from lesson completion + 40% from quiz accuracy. Drops if quizzes are failed repeatedly.</span>
          </div>
          <div className="flex items-start gap-2 py-1.5 border-b border-border/30">
            <span className="font-bold text-foreground min-w-[140px]">League System</span>
            <span>Weekly XP determines rank. Top 5 promote, bottom 5 demote. Resets every Monday.</span>
          </div>
          <div className="flex items-start gap-2 py-1.5">
            <span className="font-bold text-foreground min-w-[140px]">Daily System</span>
            <span>14 rotating daily questions seeded by date. 3 daily missions rotate by day-of-week.</span>
          </div>
        </div>
      </Section>
      <Section title="XP Balance Sheet">
        <table className="w-full text-xs">
          <thead><tr className="text-left text-muted-foreground border-b border-border/30">
            <th className="pb-2">Action</th><th className="pb-2 text-right">Base XP</th>
          </tr></thead>
          <tbody className="divide-y divide-border/20">
            {[
              ["Lesson complete",       "15–50"],
              ["Quiz 100% accuracy",    "+20 bonus"],
              ["Daily challenge",       "20–35"],
              ["Streak day (7-day+)",   "+1.2× multiplier"],
              ["Streak day (30-day+)",  "+1.5× multiplier"],
              ["Streak day (100-day+)", "+2.0× multiplier"],
              ["First trade",           "25"],
              ["Portfolio +10%",        "30"],
              ["Portfolio +25%",        "75"],
              ["League promotion",      "50"],
              ["Daily goal hit",        "10"],
            ].map(([action, xp]) => (
              <tr key={action}><td className="py-1.5 text-foreground">{action}</td><td className="py-1.5 text-right text-primary font-bold">{xp}</td></tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

// ── Content Tab ───────────────────────────────────────────────
function ContentTab() {
  const unitGroups = [1,2,3,4,5].map(uid => ({
    unit: uid,
    lessons: LESSONS.filter(l => l.unit === uid),
  }));
  return (
    <div className="space-y-3">
      {unitGroups.map(({ unit, lessons }) => (
        <Section key={unit} title={`Unit ${unit} · ${lessons.length} lessons`}>
          <div className="space-y-1">
            {lessons.map(l => (
              <div key={l.id} className="flex items-center gap-2 py-1.5 border-b border-border/20 text-xs">
                <span className="text-muted-foreground w-8">{l.id}</span>
                <span className="flex-1 text-foreground font-medium">{l.title}</span>
                <span className="text-primary font-bold">{l.xp} XP</span>
                <span className="text-muted-foreground">{l.time}m</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  l.type === "checkpoint" ? "bg-amber-500/20 text-amber-400" : "bg-muted text-muted-foreground"
                }`}>{l.type || "lesson"}</span>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

// ── Gamification Tab ──────────────────────────────────────────
function GamificationTab() {
  return (
    <div className="space-y-3">
      <Section title="Badge Catalogue">
        <div className="grid grid-cols-2 gap-2 mt-1">
          {BADGES.map(b => (
            <div key={b.slug} className="flex items-center gap-2 bg-muted/30 rounded-xl p-2">
              <span className="text-xl">{b.emoji}</span>
              <div>
                <p className="text-xs font-bold text-foreground">{b.name}</p>
                <p className="text-[10px] text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Level Titles">
        <div className="space-y-1 mt-1">
          {LEVEL_TITLES.map(lt => (
            <div key={lt.title} className="flex items-center gap-3 py-1 border-b border-border/20">
              <span className="text-lg">{lt.emoji}</span>
              <span className="text-xs font-bold text-foreground flex-1">{lt.title}</span>
              <span className="text-[10px] text-muted-foreground">Lv {lt.min}–{lt.max}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Anti-Cheat Notes">
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• Repeat lessons award only 50% XP to prevent farming.</p>
          <p>• XP is server-validated via backend functions before writing.</p>
          <p>• League XP is calculated from lesson completions, not self-reported.</p>
          <p>• Daily challenges are date-seeded — cannot be replayed for bonus XP.</p>
          <p>• Streak logic checks created_date of lesson progress records.</p>
        </div>
      </Section>
    </div>
  );
}

// ── Moderation Tab ────────────────────────────────────────────
function ModerationTab() {
  return (
    <div className="space-y-3">
      <Section title="Safety Guidelines">
        <div className="space-y-2 text-xs text-muted-foreground">
          <p className="font-bold text-foreground text-sm">Platform Rules</p>
          <p>• No real money involved at any point — all trading is simulated.</p>
          <p>• All AI tutor responses avoid financial advice language ("You should buy X").</p>
          <p>• AI tutor is framed as educational only, with disclaimer on every session.</p>
          <p>• Usernames are moderated for inappropriate content on creation.</p>
          <p>• League leaderboards show pseudonymous usernames, not full names.</p>
        </div>
      </Section>
      <Section title="Data & Privacy">
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• User progress data is stored per-user with RLS (row-level security).</p>
          <p>• No financial data is stored — paper portfolios are educational records.</p>
          <p>• Lesson progress, badges, and XP are all owned by the user account.</p>
          <p>• Analytics are aggregated, not linked to individual users.</p>
        </div>
      </Section>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function Admin() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="p-8 text-center max-w-sm w-full">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-3" />
          <h2 className="text-xl font-black text-foreground mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground">This area is restricted to admin users only.</p>
        </Card>
      </div>
    );
  }

  const renderTab = () => {
    switch (tab) {
      case "overview":     return <OverviewTab />;
      case "content":      return <ContentTab />;
      case "gamification": return <GamificationTab />;
      case "moderation":   return <ModerationTab />;
      default:             return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h1 className="font-black text-foreground">Admin Panel</h1>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold ml-auto">
            {user.full_name}
          </span>
        </div>
        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTab()}
        </motion.div>
      </div>
    </div>
  );
}