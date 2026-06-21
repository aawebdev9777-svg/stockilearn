import React, { createContext, useContext, useState } from "react";
import { base44 } from "@/api/base44Client";

const DemoContext = createContext(null);

const STORAGE_KEY = "stockilearn_session";

// ── Demo lesson progress for new users ────────────────────────
export const DEMO_LESSON_PROGRESS = [];

// ── Demo portfolio/holdings/trades/watchlist/badges (empty for real users) ──
export const DEMO_PORTFOLIO = null;
export const DEMO_HOLDINGS = [];
export const DEMO_TRADES = [];
export const DEMO_WATCHLIST = [];
export const DEMO_BADGES = [];


export function DemoProvider({ children }) {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });
  const [demoUser, setDemoUser] = useState(() => {
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return null;
    try { return JSON.parse(session); } catch { return null; }
  });

  // Sign in: check username+password against DB entity
  const loginDemo = async (username, password) => {
    try {
      const users = await base44.entities.AppUser.filter({ username: username.toLowerCase() });
      if (!users || users.length === 0) return { ok: false };
      const found = users[0];
      if (found.password_hash !== password) return { ok: false };
      // Load profile from DB record
      const profile = {
        id: found.id,
        full_name: found.display_name || found.username,
        email: found.username,
        role: found.role || "user",
        xp_total: found.xp_total || 0,
        level: found.level || 1,
        streak_current: found.streak_current || 0,
        streak_longest: found.streak_longest || 0,
        hearts_current: found.hearts_current || 5,
        gems: found.gems || 0,
        daily_xp_earned_today: found.daily_xp_earned_today || 0,
        daily_goal_xp: found.daily_goal_xp || 50,
        league_tier: found.league_tier || 1,
        league_xp: found.league_xp || 0,
        onboarding_complete: found.onboarding_complete || false,
        preferred_currency: found.preferred_currency || "GBP",
        created_date: found.created_date,
        db_id: found.id,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsDemoMode(true);
      setDemoUser(profile);
      return { ok: true, needsOnboarding: !profile.onboarding_complete };
    } catch (e) {
      console.error("Login error:", e);
      return { ok: false };
    }
  };

  // Sign up: save new user to DB
  const signupDemo = async (username, password) => {
    try {
      // Check if username already taken
      const existing = await base44.entities.AppUser.filter({ username: username.toLowerCase() });
      if (existing && existing.length > 0) {
        return { ok: false, error: "Username already taken. Try another." };
      }
      // Count users to determine if first (admin)
      const allUsers = await base44.entities.AppUser.list();
      const isFirst = !allUsers || allUsers.length === 0;

      const newUser = await base44.entities.AppUser.create({
        username: username.toLowerCase(),
        display_name: username,
        password_hash: password,
        role: isFirst ? "admin" : "user",
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
        onboarding_complete: false,
        preferred_currency: "GBP",
      });

      const profile = {
        id: newUser.id,
        full_name: username,
        email: username.toLowerCase(),
        role: isFirst ? "admin" : "user",
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
        onboarding_complete: false,
        preferred_currency: "GBP",
        created_date: newUser.created_date,
        db_id: newUser.id,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsDemoMode(true);
      setDemoUser(profile);
      return { ok: true };
    } catch (e) {
      console.error("Signup error:", e);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  };

  // Update the current user's profile in DB and session
  const updateDemoUser = async (updates) => {
    if (!demoUser?.db_id) return;
    try {
      await base44.entities.AppUser.update(demoUser.db_id, updates);
      const updated = { ...demoUser, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setDemoUser(updated);
    } catch (e) {
      console.error("Update user error:", e);
    }
  };

  const logoutDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsDemoMode(false);
    setDemoUser(null);
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsDemoMode(false);
    setDemoUser(null);
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, demoUser, loginDemo, signupDemo, logoutDemo, resetAllDemoData, updateDemoUser }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}