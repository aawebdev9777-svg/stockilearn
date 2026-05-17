import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const VISUALS = {
  pizza: "🍕", shares: "📊", ownership: "🔑", stock: "📈",
  market: "🏪", exchanges: "🏛️", broker: "🤝", trading: "⚡",
  bull: "🐂", bear: "🐻", correction: "📉", recovery: "🌱",
  supply_demand: "⚖️", buyers: "🛒", sellers: "🏷️", agreement: "🤝",
  tickers: "🔤", reading: "📖", colors: "🎨", volume: "📊",
  basket: "🧺", sp500: "🏆", indices: "📋", market_up: "📈",
  chart_basic: "📉", line_chart: "📊", candle: "🕯️", volume_bars: "📊",
  earnings: "💰", bad_news: "📰", macro: "🌍", sentiment: "🧠",
  revenue: "💵", profit: "💎", comparison: "⚖️", eps: "📐",
  calculation: "🔢", balance: "📋", assets: "🏠", liabilities: "💳",
  equity: "✨", market_cap: "📏", valuation: "🎯",
  large_cap: "🏢", mid_cap: "🏗️", small_cap: "🌱",
  growth: "🚀", value: "💎", both: "⚖️",
  dividends: "💰", payment: "💵", yield: "📊",
  pe: "📐", context: "🔍",
  market_order: "⚡", limit_order: "🎯",
  stoploss: "🛡️", trigger: "⏰", safety: "🔒",
};

// Fun contextual facts to appear as "did you know" below the main slide text
const BONUS_FACTS = {
  pizza: "Fun fact: PizzaRocket is fictional, but companies like Domino's (DPZ) are actually traded on the stock market!",
  shares: "There are over 500 billion shares of Apple outstanding — each one represents real ownership.",
  ownership: "Warren Buffett owns over 5% of Apple through his company Berkshire Hathaway.",
  stock: "The word 'stock' comes from Old English 'stocc' meaning trunk of a tree — the main source of a business.",
  market: "The NYSE opens at 9:30 AM EST and closes at 4 PM EST every weekday. That's 6.5 hours of trading!",
  exchanges: "NASDAQ was the world's first electronic stock exchange, founded in 1971.",
  bull: "The famous Wall Street Bull sculpture weighs over 7,000 pounds and was secretly installed overnight in 1989.",
  bear: "Bear markets have occurred 26 times since 1928 — and every single time, the market eventually recovered.",
  pe: "Netflix's P/E ratio once hit 500x — investors were betting big on future growth.",
  dividends: "Coca-Cola has paid a dividend every year since 1893. That's over 130 years of payments!",
};

export default function LessonSlide({ slide, onNext, index, total }) {
  const [tapped, setTapped] = useState(false);
  const emoji = VISUALS[slide.visual] || "📖";
  const fact = BONUS_FACTS[slide.visual];

  const handleNext = () => {
    setTapped(true);
    setTimeout(() => {
      setTapped(false);
      onNext();
    }, 80);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="flex-1 flex flex-col min-h-0 py-6 gap-0"
    >
      {/* Main card — hero area */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
        className="relative rounded-3xl overflow-hidden mx-1 flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--muted)/0.4) 100%)",
          border: "1.5px solid hsl(var(--border))",
          minHeight: 280,
          padding: "40px 28px",
        }}
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow behind emoji */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(var(--primary)/0.1), transparent 70%)" }}
        />

        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="relative z-10 mb-6"
          style={{ fontSize: 80, lineHeight: 1 }}
        >
          {emoji}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative z-10 text-xl font-bold text-foreground leading-relaxed max-w-sm"
        >
          {slide.text}
        </motion.p>

        {/* Slide counter in corner */}
        <div className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm rounded-full px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
          {index + 1}/{total}
        </div>
      </motion.div>

      {/* Bonus fact card */}
      {fact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-1 mt-4 rounded-2xl px-4 py-3 flex items-start gap-3"
          style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.2)" }}
        >
          <span className="text-lg shrink-0 mt-0.5">💡</span>
          <p className="text-xs text-muted-foreground leading-relaxed">{fact}</p>
        </motion.div>
      )}

      {/* Progress dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 mt-6"
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === index ? 28 : 8, opacity: i <= index ? 1 : 0.3 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`h-2 rounded-full ${i <= index ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </motion.div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleNext}
          className="w-full h-14 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-lg"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 4px 20px hsl(var(--primary)/0.35)",
          }}
        >
          {index < total - 1 ? (
            <>NEXT SLIDE <ChevronRight className="w-5 h-5" /></>
          ) : (
            <>START QUIZ <ArrowRight className="w-5 h-5" /></>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}