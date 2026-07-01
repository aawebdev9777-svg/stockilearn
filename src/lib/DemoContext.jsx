import React, { createContext, useContext, useState } from "react";
import { base44 } from "@/api/base44Client";

const DemoContext = createContext(null);

const STORAGE_KEY = "stockilearn_session";

// ── Demo lesson progress helper ────────────────────────
export const getDemoLessonProgress = () => {
  const stored = localStorage.getItem("stockilearn_lesson_progress");
  return stored ? JSON.parse(stored) : [];
};

export const saveDemoLessonProgress = (lessonId, unitId, score, xp) => {
  const progress = getDemoLessonProgress();
  const existing = progress.find(p => p.lesson_id === lessonId);
  if (existing) {
    existing.status = "complete";
    existing.score_percent = score;
    existing.xp_earned = xp;
    existing.completed_at = new Date().toISOString();
    existing.attempts_count = (existing.attempts_count || 0) + 1;
  } else {
    progress.push({
      lesson_id: lessonId,
      unit_id: unitId,
      status: "complete",
      score_percent: score,
      xp_earned: xp,
      completed_at: new Date().toISOString(),
      attempts_count: 1,
    });
  }
  localStorage.setItem("stockilearn_lesson_progress", JSON.stringify(progress));
  // Trigger custom event for real-time UI updates
  window.dispatchEvent(new CustomEvent("lesson-progress-changed"));
};

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

  // Sign in: use backend function (avoids RLS on unauthenticated client)
  const loginDemo = async (username, password) => {
    try {
      const res = await base44.functions.invoke('appLogin', { username, password });
      if (!res.data?.ok) return { ok: false };
      const found = res.data.user;
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
        completed_lessons: found.completed_lessons || [],
        created_date: found.created_date,
        db_id: found.id,
        session_token: found.session_token,
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

  // Sign up: use backend function (avoids RLS on unauthenticated client)
  const signupDemo = async (username, password) => {
    try {
      const res = await base44.functions.invoke('appSignup', { username, password });
      if (!res.data?.ok) return { ok: false, error: res.data?.error || "Something went wrong." };
      const newUser = res.data.user;

      const profile = {
        id: newUser.id,
        full_name: username,
        email: username.toLowerCase(),
        role: newUser.role,
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
        session_token: newUser.session_token,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsDemoMode(true);
      setDemoUser(profile);
      return { ok: true };
    } catch (e) {
      console.error("Signup error:", e);
      const msg = e?.response?.data?.error || e?.data?.error || "Something went wrong. Please try again.";
      return { ok: false, error: msg };
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

  // Save completed lesson — updates local profile immediately, then tries
  // to persist to the backend (which requires platform auth via base44.auth.me()).
  const saveLessonProgress = async (lessonId, score, xpEarned) => {
    if (!demoUser?.db_id) return { ok: false };

    // Optimistically update local profile so demo UX is preserved even
    // when the backend call is unavailable (e.g. no platform auth session).
    const today = new Date().toISOString().split("T")[0];
    const isNewDay = demoUser.last_active_date !== today;
    const newDailyXp = isNewDay ? xpEarned : (demoUser.daily_xp_earned_today || 0) + xpEarned;
    const newStreak = isNewDay ? (demoUser.streak_current || 0) + 1 : (demoUser.streak_current || 0);
    const completedLessons = [...(demoUser.completed_lessons || [])];
    if (!completedLessons.includes(lessonId)) completedLessons.push(lessonId);

    const updatedProfile = {
      ...demoUser,
      completed_lessons: completedLessons,
      xp_total: (demoUser.xp_total || 0) + xpEarned,
      daily_xp_earned_today: newDailyXp,
      streak_current: newStreak,
      streak_longest: Math.max(newStreak, demoUser.streak_longest || 0),
      last_active_date: today,
      league_xp: (demoUser.league_xp || 0) + xpEarned,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    setDemoUser(updatedProfile);

    // Persist to backend — the function identifies the user via base44.auth.me()
    try {
      const res = await base44.functions.invoke('saveLessonProgress', {
        lessonId,
        score,
        xpEarned,
      });
      if (res.data?.ok && res.data.user) {
        const u = res.data.user;
        const backendProfile = {
          ...updatedProfile,
          completed_lessons: u.completed_lessons || [],
          xp_total: u.xp_total || 0,
          streak_current: u.streak_current || 0,
          streak_longest: u.streak_longest || 0,
          daily_xp_earned_today: u.daily_xp_earned_today || 0,
          league_xp: u.league_xp || 0,
          last_active_date: u.last_active_date,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(backendProfile));
        setDemoUser(backendProfile);
      }
    } catch (e) {
      console.error("Save lesson progress error:", e);
    }
    return { ok: true };
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsDemoMode(false);
    setDemoUser(null);
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, demoUser, loginDemo, signupDemo, logoutDemo, resetAllDemoData, updateDemoUser, saveLessonProgress, getDemoLessonProgress, saveDemoLessonProgress }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}