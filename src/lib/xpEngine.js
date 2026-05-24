/**
 * XP Engine — centralised XP calculation with multipliers and bonuses.
 * All XP awards go through here so the system stays balanced.
 */

// ── XP table ──────────────────────────────────────────────────
export const XP_VALUES = {
  LESSON_COMPLETE_BASE: 15,
  QUIZ_CORRECT: 5,
  QUIZ_PERFECT: 20,        // bonus for 100% accuracy
  STREAK_BONUS_PER_DAY: 2, // extra XP per streak day (capped at 50 days)
  DAILY_CHALLENGE: 30,
  DAILY_GOAL_HIT: 10,
  LEAGUE_PROMOTION: 50,
  PREDICTION_CORRECT: 20,
  TRADE_EXECUTED: 5,
  FIRST_TRADE: 25,
  PORTFOLIO_UP_10: 30,
  PORTFOLIO_UP_25: 75,
};

// ── Streak multiplier ─────────────────────────────────────────
export function getStreakMultiplier(streakDays) {
  if (streakDays >= 100) return 2.0;
  if (streakDays >= 30)  return 1.5;
  if (streakDays >= 14)  return 1.3;
  if (streakDays >= 7)   return 1.2;
  if (streakDays >= 3)   return 1.1;
  return 1.0;
}

// ── Accuracy multiplier ───────────────────────────────────────
export function getAccuracyMultiplier(accuracyPct) {
  if (accuracyPct === 100) return 1.5;
  if (accuracyPct >= 80)   return 1.2;
  if (accuracyPct >= 60)   return 1.0;
  return 0.8; // partial XP for low accuracy
}

// ── Calculate lesson XP ───────────────────────────────────────
export function calcLessonXp({ baseXp, streakDays, accuracyPct, isFirstTime = true }) {
  if (!isFirstTime) {
    // Repeat lessons give 50% XP
    return Math.round(baseXp * 0.5);
  }
  const streakMult = getStreakMultiplier(streakDays);
  const accMult    = getAccuracyMultiplier(accuracyPct);
  const raw        = baseXp * streakMult * accMult;
  return Math.round(raw);
}

// ── Combo bonus ───────────────────────────────────────────────
// Perfect quiz streaks (consecutive lessons all 100%) give a combo bonus
export function getComboBonus(consecutivePerfectLessons) {
  if (consecutivePerfectLessons >= 5) return 50;
  if (consecutivePerfectLessons >= 3) return 25;
  if (consecutivePerfectLessons >= 2) return 10;
  return 0;
}

// ── Level from total XP ───────────────────────────────────────
// Level curve: each level requires progressively more XP
export function getLevelFromXp(totalXp) {
  let level = 1;
  let threshold = 0;
  while (level < 50) {
    threshold += getXpForLevel(level);
    if (totalXp < threshold) break;
    level++;
  }
  return Math.min(level, 50);
}

// XP required to reach a given level
export function getXpForLevel(level) {
  return Math.round(200 + (level - 1) * 80);
}

// Progress within current level (0-1)
export function getLevelProgress(totalXp) {
  const level = getLevelFromXp(totalXp);
  let spent = 0;
  for (let l = 1; l < level; l++) spent += getXpForLevel(l);
  const needed = getXpForLevel(level);
  const inLevel = totalXp - spent;
  return { level, progress: Math.min(inLevel / needed, 1), inLevel, needed };
}

// ── Mastery calculation ───────────────────────────────────────
export function calcTopicMastery({ lessonsCompleted, totalLessons, avgAccuracy }) {
  if (totalLessons === 0) return 0;
  const completionPct = (lessonsCompleted / totalLessons) * 60; // 60% weight
  const accuracyPct   = avgAccuracy * 0.40;                    // 40% weight
  return Math.min(Math.round(completionPct + accuracyPct), 100);
}

// ── Topic → lesson mapping ────────────────────────────────────
export const TOPIC_MAP = {
  stocks:        ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8"],
  market_basics: ["1.6","1.7","1.8"],
  trading:       ["3.1","3.2","3.3","3.4","3.5"],
  portfolio:     ["4.1","4.2","4.3","4.4","4.5"],
  advanced:      ["5.1","5.2","5.3","5.4","5.5"],
};