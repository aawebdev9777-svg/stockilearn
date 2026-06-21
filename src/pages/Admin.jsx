import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Users, BookOpen, Trophy, BarChart3, Shield, Zap, Settings, ChevronDown, ChevronUp, Ban, CheckCircle, Trash2, Play, Crown, RefreshCw } from "lucide-react";
import { useDemo } from "@/lib/DemoContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LESSONS, BADGES, LEVEL_TITLES } from "@/lib/lessonData";

const TABS = [
  { id: "overview",     label: "Overview",    icon: BarChart3 },
  { id: "users",        label: "Users",       icon: Users },
  { id: "content",      label: "Content",     icon: BookOpen },
  { id: "gamification", label: "Gamification",icon: Trophy },
  { id: "moderation",   label: "Moderation",  icon: Shield },
  { id: "pitch",        label: "Pitch Deck",  icon: Play },
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
function OverviewTab({ users }) {
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === "admin").length;
  const bannedCount = users.filter(u => u.is_banned).length;
  const activeCount = users.filter(u => !u.is_banned).length;

  const stats = [
    { label: "Total Users",     value: totalUsers,       sub: "All registered accounts",   color: "text-blue-400",   icon: Users },
    { label: "Active Users",    value: activeCount,      sub: "Not banned",                color: "text-primary",    icon: CheckCircle },
    { label: "Banned Users",    value: bannedCount,      sub: "Suspended accounts",        color: "text-destructive",icon: Ban },
    { label: "Total Lessons",   value: LESSONS.length,   sub: "Across 5 units",            color: "text-amber-400",  icon: BookOpen },
    { label: "Total Badges",    value: BADGES.length,    sub: "Collectible achievements",  color: "text-purple-400", icon: Trophy },
    { label: "Admin Accounts",  value: adminCount,       sub: "Full access users",         color: "text-rose-400",   icon: Crown },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <Link to="/admin/analytics" className="block">
        <Card className="p-4 bg-card/80 border-border/50 flex items-center gap-3 hover:bg-muted/30 transition-colors">
          <BarChart3 className="w-5 h-5 text-[#58CC02]" />
          <div className="flex-1 text-left">
            <p className="text-sm font-black text-foreground">Google Analytics & Search Console</p>
            <p className="text-xs text-muted-foreground">View traffic, search queries, and page performance</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90" />
        </Card>
      </Link>
      <Section title="Platform Architecture">
        <div className="space-y-2 text-xs text-muted-foreground">
          {[
            ["XP System", "Lesson XP × Streak Multiplier × Accuracy Multiplier. Cap at 2× for 100-day streaks."],
            ["Level Curve", "200 XP for Level 1, +80 XP per level. Level 50 requires ~280 XP (total ~9,600 XP to max)."],
            ["Mastery Score", "60% weight from lesson completion + 40% from quiz accuracy."],
            ["League System", "Weekly XP determines rank. Top 5 promote, bottom 5 demote. Resets every Monday."],
            ["Daily System", "14 rotating daily questions seeded by date. 3 daily missions rotate by day-of-week."],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start gap-2 py-1.5 border-b border-border/30">
              <span className="font-bold text-foreground min-w-[140px]">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── Users Tab ─────────────────────────────────────────────────
function UsersTab({ users, onBan, onUnban, onMakeAdmin, onRemoveAdmin, loading }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | banned | admin

  const filtered = users.filter(u => {
    const matchSearch = !search || u.username?.toLowerCase().includes(search.toLowerCase()) || u.display_name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "banned" && u.is_banned) || (filter === "admin" && u.role === "admin");
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 text-xs bg-card border border-border rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        />
        <div className="flex gap-1">
          {[["all","All"],["banned","Banned"],["admin","Admins"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${filter === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} user{filtered.length !== 1 ? "s" : ""}</p>

      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">No users found</p>
        ) : filtered.map(u => (
          <Card key={u.id} className={`p-3 bg-card/80 border-border/50 ${u.is_banned ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-primary">{(u.display_name || u.username || "?")[0].toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="text-xs font-bold text-foreground truncate">{u.display_name || u.username}</p>
                  {u.role === "admin" && (
                    <span className="text-[9px] font-black bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full">ADMIN</span>
                  )}
                  {u.is_banned && (
                    <span className="text-[9px] font-black bg-destructive/20 text-destructive px-1.5 py-0.5 rounded-full">BANNED</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground truncate">@{u.username}</p>
                <p className="text-[10px] text-muted-foreground">
                  Joined {u.created_date ? new Date(u.created_date).toLocaleDateString() : "—"}
                  {u.xp_total ? ` · ${u.xp_total} XP` : ""}
                  {u.streak_current ? ` · 🔥${u.streak_current}` : ""}
                  {u.level ? ` · Lv${u.level}` : ""}
                </p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                {u.is_banned ? (
                  <Button size="sm" variant="outline" onClick={() => onUnban(u)}
                    className="h-7 text-[10px] px-2 gap-1 text-primary border-primary/30">
                    <CheckCircle className="w-3 h-3" /> Unban
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => onBan(u)}
                    className="h-7 text-[10px] px-2 gap-1 text-destructive border-destructive/30">
                    <Ban className="w-3 h-3" /> Ban
                  </Button>
                )}
                {u.role !== "admin" ? (
                  <Button size="sm" variant="outline" onClick={() => onMakeAdmin(u)}
                    className="h-7 text-[10px] px-2 gap-1 text-rose-400 border-rose-400/30">
                    <Crown className="w-3 h-3" /> Make Admin
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => onRemoveAdmin(u)}
                    className="h-7 text-[10px] px-2 gap-1 text-muted-foreground border-border">
                    <Trash2 className="w-3 h-3" /> Remove Admin
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Content Tab ───────────────────────────────────────────────
function ContentTab() {
  const unitGroups = [1,2,3,4,5].map(uid => ({ unit: uid, lessons: LESSONS.filter(l => l.unit === uid) }));
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
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${l.type === "checkpoint" ? "bg-amber-500/20 text-amber-400" : "bg-muted text-muted-foreground"}`}>
                  {l.type || "lesson"}
                </span>
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
          <p>• All AI tutor responses avoid financial advice language.</p>
          <p>• AI tutor is framed as educational only.</p>
          <p>• League leaderboards show pseudonymous usernames, not full names.</p>
        </div>
      </Section>
      <Section title="Data & Privacy">
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• User progress data is stored per-user with RLS (row-level security).</p>
          <p>• No real financial data is stored — paper portfolios are educational records.</p>
          <p>• Analytics are aggregated, not linked to individual users.</p>
        </div>
      </Section>
    </div>
  );
}

// ── Pitch Tab ─────────────────────────────────────────────────
function PitchTab() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card/80 border-border/50 text-center space-y-4">
        <div className="text-5xl">📊</div>
        <div>
          <h2 className="text-xl font-black text-foreground">Investor Pitch Deck</h2>
          <p className="text-sm text-muted-foreground mt-1">Full interactive presentation — admin only</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-left space-y-1">
          <p className="text-xs font-bold text-primary">14 slides covering:</p>
          <p className="text-xs text-muted-foreground">Market size · Problem · Solution · Demo · AI Tutor · Gamification · Traction · Business Model · Vision · The Ask</p>
        </div>
        <Link to="/present">
          <Button className="w-full h-12 rounded-2xl text-base font-black gap-2">
            <Play className="w-5 h-5" /> Launch Pitch Deck
          </Button>
        </Link>
        <p className="text-[10px] text-muted-foreground">This page is only accessible to admin accounts. The /present URL redirects non-admins away.</p>
      </Card>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function Admin() {
  const { demoUser } = useDemo();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user?.role === "admin" && (tab === "users" || tab === "overview")) {
      fetchUsers();
    }
  }, [user, tab]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    const all = await base44.entities.AppUser.list();
    setUsers(all);
    setUsersLoading(false);
  };

  const handleBan = async (u) => {
    await base44.entities.AppUser.update(u.id, { is_banned: true });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, is_banned: true } : x));
    showToast(`${u.display_name || u.username} has been banned.`);
  };

  const handleUnban = async (u) => {
    await base44.entities.AppUser.update(u.id, { is_banned: false });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, is_banned: false } : x));
    showToast(`${u.display_name || u.username} has been unbanned.`);
  };

  const handleMakeAdmin = async (u) => {
    await base44.entities.AppUser.update(u.id, { role: "admin" });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: "admin" } : x));
    showToast(`${u.display_name || u.username} is now an admin.`);
  };

  const handleRemoveAdmin = async (u) => {
    if (u.username === demoUser?.email) { showToast("You can't remove your own admin role.", "error"); return; }
    await base44.entities.AppUser.update(u.id, { role: "user" });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: "user" } : x));
    showToast(`${u.display_name || u.username} is no longer an admin.`);
  };

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
        <Card className="p-8 text-center max-w-sm w-full space-y-4">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-3" />
          <h2 className="text-xl font-black text-foreground">Access Denied</h2>
          <p className="text-sm text-muted-foreground">This area is restricted to admin users only.</p>
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs font-bold text-foreground mb-2">How to Create First Admin:</p>
            <ol className="text-xs text-muted-foreground text-left space-y-1">
              <li>1. Go to Base44 Dashboard</li>
              <li>2. Click "Database" → "User" entity</li>
              <li>3. Find your user account</li>
              <li>4. Set <code className="bg-muted px-1 rounded">role</code> to <code className="bg-primary/10 text-primary px-1 rounded">admin</code></li>
              <li>5. Save and return here</li>
            </ol>
          </div>
        </Card>
      </div>
    );
  }

  const renderTab = () => {
    switch (tab) {
      case "overview":     return <OverviewTab users={users} />;
      case "users":        return <UsersTab users={users} onBan={handleBan} onUnban={handleUnban} onMakeAdmin={handleMakeAdmin} onRemoveAdmin={handleRemoveAdmin} loading={usersLoading} />;
      case "content":      return <ContentTab />;
      case "gamification": return <GamificationTab />;
      case "moderation":   return <ModerationTab />;
      case "pitch":        return <PitchTab />;
      default:             return <OverviewTab users={users} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl text-xs font-bold shadow-lg ${
            toast.type === "error" ? "bg-destructive text-white" : "bg-primary text-primary-foreground"
          }`}>
          {toast.msg}
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h1 className="font-black text-foreground">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={fetchUsers} className="text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3" /> {user.full_name || user.email}
            </span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {renderTab()}
        </motion.div>
      </div>
    </div>
  );
}