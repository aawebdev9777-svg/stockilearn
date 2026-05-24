/**
 * Mastery Engine — topic mastery calculation and recommendations.
 */

import { LESSONS, UNITS } from "./lessonData";

// Map lesson IDs to topic categories
const LESSON_TOPICS = {
  "1.1": "stocks", "1.2": "stocks", "1.3": "stocks",
  "1.4": "stocks", "1.5": "stocks", "1.6": "stocks",
  "1.7": "stocks", "1.8": "stocks",
  "2.1": "financials", "2.2": "financials", "2.3": "financials",
  "2.4": "valuation", "2.5": "valuation", "2.6": "valuation",
  "2.7": "dividends", "2.8": "valuation",
  "3.1": "trading", "3.2": "trading", "3.3": "trading",
  "3.4": "trading", "3.5": "trading",
  "4.1": "portfolio", "4.2": "portfolio", "4.3": "etfs",
  "4.4": "risk", "4.5": "portfolio",
  "5.1": "advanced", "5.2": "advanced", "5.3": "advanced",
  "5.4": "psychology", "5.5": "psychology",
};

export const TOPIC_META = {
  stocks:     { label: "Stocks & Markets",   emoji: "📈", color: "#3b82f6" },
  financials: { label: "Company Financials", emoji: "📊", color: "#8b5cf6" },
  valuation:  { label: "Stock Valuation",    emoji: "💰", color: "#f59e0b" },
  dividends:  { label: "Dividends",          emoji: "💵", color: "#10b981" },
  trading:    { label: "Trading Mechanics",  emoji: "⚡", color: "#00FF87" },
  portfolio:  { label: "Portfolio Strategy", emoji: "🧩", color: "#6366f1" },
  etfs:       { label: "ETFs & Index Funds", emoji: "🗂️", color: "#ec4899" },
  risk:       { label: "Risk Management",    emoji: "🛡️", color: "#ef4444" },
  advanced:   { label: "Advanced Concepts",  emoji: "🚀", color: "#ff6b35" },
  psychology: { label: "Market Psychology",  emoji: "🧠", color: "#a855f7" },
};

// Calculate mastery for each topic given the user's lesson progress records
export function calculateAllMastery(lessonProgressRecords) {
  const completedMap = {};
  const accuracyMap  = {};

  lessonProgressRecords.forEach(lp => {
    if (lp.status === "complete") {
      completedMap[lp.lesson_id] = true;
      accuracyMap[lp.lesson_id]  = lp.score_percent || 0;
    }
  });

  const topicStats = {};
  Object.keys(TOPIC_META).forEach(topic => {
    topicStats[topic] = { total: 0, completed: 0, totalAccuracy: 0 };
  });

  Object.entries(LESSON_TOPICS).forEach(([lessonId, topic]) => {
    if (!topicStats[topic]) return;
    topicStats[topic].total++;
    if (completedMap[lessonId]) {
      topicStats[topic].completed++;
      topicStats[topic].totalAccuracy += accuracyMap[lessonId] || 0;
    }
  });

  const result = {};
  Object.entries(topicStats).forEach(([topic, stats]) => {
    if (stats.total === 0) { result[topic] = 0; return; }
    const completionPct = (stats.completed / stats.total) * 60;
    const avgAccuracy   = stats.completed > 0 ? (stats.totalAccuracy / stats.completed) : 0;
    const accuracyPct   = avgAccuracy * 0.4;
    result[topic] = Math.min(Math.round(completionPct + accuracyPct), 100);
  });

  return result;
}

// Get topics needing revision (mastery < 60%)
export function getRevisionTopics(masteryMap) {
  return Object.entries(masteryMap)
    .filter(([, pct]) => pct < 60)
    .sort(([, a], [, b]) => a - b)
    .map(([topic]) => topic);
}

// Get strongest topic
export function getStrongestTopic(masteryMap) {
  const entries = Object.entries(masteryMap).filter(([, v]) => v > 0);
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

// Get weakest topic
export function getWeakestTopic(masteryMap) {
  const entries = Object.entries(masteryMap).filter(([, v]) => v > 0);
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
}