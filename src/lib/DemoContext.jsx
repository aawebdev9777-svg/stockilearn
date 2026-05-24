import React, { createContext, useContext, useState, useEffect } from "react";

// ── Demo credentials ──────────────────────────────────────────
export const DEMO_CREDENTIALS = { email: "krishansoni100@icloud.com", password: "krishan123" };

// ── Demo user profile ─────────────────────────────────────────
export const DEMO_USER = {
  id: "demo-krishan-001",
  full_name: "Krishan Soni",
  email: "krishansoni100@icloud.com",
  role: "admin",
  xp_total: 380,
  level: 8,
  streak_current: 14,
  streak_longest: 14,
  hearts_current: 4,
  gems: 120,
  daily_xp_earned_today: 35,
  daily_goal_xp: 50,
  league_tier: 3,
  league_xp: 240,
  goals: ["grow_wealth"],
  knowledge_level: "some_basics",
  daily_time: "10_mins",
  preferred_currency: "GBP",
  onboarding_complete: true,
};

// ── Demo lesson progress ──────────────────────────────────────
export const DEMO_LESSON_PROGRESS = [
  { lesson_id: "1.1", unit_id: 1, status: "complete", score_percent: 100, xp_earned: 15, attempts_count: 1, completed_at: "2026-05-01T10:00:00Z" },
  { lesson_id: "1.2", unit_id: 1, status: "complete", score_percent: 100, xp_earned: 15, attempts_count: 1, completed_at: "2026-05-02T10:00:00Z" },
  { lesson_id: "1.3", unit_id: 1, status: "complete", score_percent: 66,  xp_earned: 15, attempts_count: 2, completed_at: "2026-05-03T10:00:00Z" },
  { lesson_id: "1.4", unit_id: 1, status: "complete", score_percent: 100, xp_earned: 20, attempts_count: 1, completed_at: "2026-05-05T10:00:00Z" },
  { lesson_id: "1.5", unit_id: 1, status: "complete", score_percent: 100, xp_earned: 20, attempts_count: 1, completed_at: "2026-05-06T10:00:00Z" },
  { lesson_id: "1.6", unit_id: 1, status: "complete", score_percent: 100, xp_earned: 15, attempts_count: 1, completed_at: "2026-05-07T10:00:00Z" },
  { lesson_id: "1.7", unit_id: 1, status: "complete", score_percent: 100, xp_earned: 20, attempts_count: 1, completed_at: "2026-05-08T10:00:00Z" },
  { lesson_id: "1.8", unit_id: 1, status: "complete", score_percent: 66,  xp_earned: 20, attempts_count: 2, completed_at: "2026-05-09T10:00:00Z" },
  { lesson_id: "1.C", unit_id: 1, status: "complete", score_percent: 80,  xp_earned: 50, attempts_count: 1, completed_at: "2026-05-10T10:00:00Z" },
  { lesson_id: "2.1", unit_id: 2, status: "complete", score_percent: 100, xp_earned: 15, attempts_count: 1, completed_at: "2026-05-11T10:00:00Z" },
  { lesson_id: "2.2", unit_id: 2, status: "complete", score_percent: 100, xp_earned: 15, attempts_count: 1, completed_at: "2026-05-12T10:00:00Z" },
  { lesson_id: "2.3", unit_id: 2, status: "complete", score_percent: 100, xp_earned: 20, attempts_count: 1, completed_at: "2026-05-13T10:00:00Z" },
  { lesson_id: "2.4", unit_id: 2, status: "complete", score_percent: 100, xp_earned: 15, attempts_count: 1, completed_at: "2026-05-14T10:00:00Z" },
  { lesson_id: "2.5", unit_id: 2, status: "in_progress", score_percent: 0, xp_earned: 0, attempts_count: 0 },
  { lesson_id: "2.6", unit_id: 2, status: "locked", score_percent: 0, xp_earned: 0, attempts_count: 0 },
  { lesson_id: "2.7", unit_id: 2, status: "locked", score_percent: 0, xp_earned: 0, attempts_count: 0 },
  { lesson_id: "2.8", unit_id: 2, status: "locked", score_percent: 0, xp_earned: 0, attempts_count: 0 },
];

// ── Demo portfolio ─────────────────────────────────────────────
export const DEMO_PORTFOLIO = {
  id: "demo-portfolio-001",
  cash_balance: 6284.50,
  total_value: 13921.30,
  deposits_used: 0,
  created_by: "dragons@vstock.demo",
};

export const DEMO_HOLDINGS = [
  { id: "h1", ticker: "AAPL", shares: 8,  avg_buy_price: 178.50, created_by: "dragons@vstock.demo" },
  { id: "h2", ticker: "NVDA", shares: 3,  avg_buy_price: 842.00, created_by: "dragons@vstock.demo" },
  { id: "h3", ticker: "TSLA", shares: 5,  avg_buy_price: 210.00, created_by: "dragons@vstock.demo" },
  { id: "h4", ticker: "MSFT", shares: 4,  avg_buy_price: 388.00, created_by: "dragons@vstock.demo" },
  { id: "h5", ticker: "AMZN", shares: 6,  avg_buy_price: 182.00, created_by: "dragons@vstock.demo" },
];

export const DEMO_TRADES = [
  { id: "t1", ticker: "AAPL", action: "buy",  shares: 8, price_at_trade: 178.50, total_value: 1428.00, realised_pnl: 0,     order_type: "market", created_by: "dragons@vstock.demo", created_date: "2026-04-10T09:30:00Z" },
  { id: "t2", ticker: "NVDA", action: "buy",  shares: 5, price_at_trade: 820.00, total_value: 4100.00, realised_pnl: 0,     order_type: "market", created_by: "dragons@vstock.demo", created_date: "2026-04-12T10:00:00Z" },
  { id: "t3", ticker: "NVDA", action: "sell", shares: 2, price_at_trade: 895.00, total_value: 1790.00, realised_pnl: 150.00, order_type: "limit",  created_by: "dragons@vstock.demo", created_date: "2026-04-20T14:00:00Z" },
  { id: "t4", ticker: "TSLA", action: "buy",  shares: 5, price_at_trade: 210.00, total_value: 1050.00, realised_pnl: 0,     order_type: "market", created_by: "dragons@vstock.demo", created_date: "2026-04-25T11:00:00Z" },
  { id: "t5", ticker: "MSFT", action: "buy",  shares: 4, price_at_trade: 388.00, total_value: 1552.00, realised_pnl: 0,     order_type: "market", created_by: "dragons@vstock.demo", created_date: "2026-05-01T09:30:00Z" },
  { id: "t6", ticker: "AMZN", action: "buy",  shares: 6, price_at_trade: 182.00, total_value: 1092.00, realised_pnl: 0,     order_type: "limit",  created_by: "dragons@vstock.demo", created_date: "2026-05-05T10:30:00Z" },
];

export const DEMO_WATCHLIST = [
  { id: "w1", ticker: "GOOGL", created_by: "dragons@vstock.demo" },
  { id: "w2", ticker: "META",  created_by: "dragons@vstock.demo" },
  { id: "w3", ticker: "SPY",   created_by: "dragons@vstock.demo" },
];

export const DEMO_BADGES = [
  { id: "b1", badge_slug: "market_seedling", badge_name: "Market Seedling", badge_emoji: "🌱", created_by: "dragons@vstock.demo" },
  { id: "b2", badge_slug: "week_warrior",    badge_name: "Week Warrior",    badge_emoji: "🔥", created_by: "dragons@vstock.demo" },
  { id: "b3", badge_slug: "first_trade",     badge_name: "First Trade",     badge_emoji: "💰", created_by: "dragons@vstock.demo" },
];

// ── Context ───────────────────────────────────────────────────
const DemoContext = createContext(null);

const STORAGE_KEY = "vstock_demo_session";
const USERS_KEY = "vstock_users";

function getStoredUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}

function buildUserProfile(email) {
  return {
    id: `user-${email.toLowerCase()}-${Date.now()}`,
    full_name: email.split('@')[0],
    email: email.toLowerCase(),
    role: "user",
    xp_total: 0,
    level: 1,
    streak_current: 0,
    streak_longest: 0,
    hearts_current: 5,
    gems: 0,
    daily_xp_earned_today: 0,
    daily_goal_xp: 50,
    league_tier: 1,
    league_xp: 0,
    goals: [],
    knowledge_level: "beginner",
    daily_time: "10_mins",
    preferred_currency: "GBP",
    onboarding_complete: false,
  };
}

export function DemoProvider({ children }) {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });
  const [demoUser, setDemoUser] = useState(() => {
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return null;
    if (session === "dragons") return DEMO_USER;
    try { return JSON.parse(session); } catch { return null; }
  });

  const loginDemo = (email, password) => {
    // Built-in demo account
    if (email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem(STORAGE_KEY, "krishan");
      setIsDemoMode(true);
      setDemoUser(DEMO_USER);
      return { ok: true };
    }
    // Custom registered accounts
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      const profile = found.profile;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsDemoMode(true);
      setDemoUser(profile);
      return { ok: true, needsOnboarding: !profile.onboarding_complete };
    }
    return { ok: false };
  };

  const signupDemo = (email, password) => {
    const users = getStoredUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: "Email already registered. Try another." };
    // Also block the demo email
    if (email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase()) {
      return { ok: false, error: "Email already registered. Try another." };
    }
    const profile = buildUserProfile(email);
    // First user becomes admin
    if (users.length === 0) {
      profile.role = "admin";
    }
    users.push({ email, password, profile });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setIsDemoMode(true);
    setDemoUser(profile);
    return { ok: true };
  };

  const logoutDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsDemoMode(false);
    setDemoUser(null);
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setIsDemoMode(false);
    setDemoUser(null);
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, demoUser, loginDemo, signupDemo, logoutDemo, resetAllDemoData }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}