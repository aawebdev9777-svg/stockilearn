/**
 * Daily challenge data — mirrored from src/lib/dailyChallenges.js so the backend
 * selects the exact same challenge the app shows on a given day.
 * Only the fields the workflow needs (topic + xp) are included.
 */
export const DAILY_QUESTIONS = [
  { id: "dq_1",  topic: "compound",     xp: 30 },
  { id: "dq_2",  topic: "portfolio",    xp: 25 },
  { id: "dq_3",  topic: "psychology",   xp: 25 },
  { id: "dq_4",  topic: "market_basics", xp: 30 },
  { id: "dq_5",  topic: "economics",    xp: 20 },
  { id: "dq_6",  topic: "etfs",         xp: 25 },
  { id: "dq_7",  topic: "basics",       xp: 20 },
  { id: "dq_8",  topic: "valuation",    xp: 30 },
  { id: "dq_9",  topic: "risk",         xp: 25 },
  { id: "dq_10", topic: "strategy",     xp: 30 },
  { id: "dq_11", topic: "stocks",       xp: 25 },
  { id: "dq_12", topic: "compound",     xp: 20 },
  { id: "dq_13", topic: "economics",    xp: 25 },
  { id: "dq_14", topic: "advanced",     xp: 35 },
];

// Selects today's challenge using the same date-seeded logic as the frontend.
export function getTodaysChallenge() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  const seed = parseInt(dateStr) % DAILY_QUESTIONS.length;
  return DAILY_QUESTIONS[seed];
}