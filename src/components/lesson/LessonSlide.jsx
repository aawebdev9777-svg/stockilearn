import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

export default function LessonSlide({ slide, onNext, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex-1 flex flex-col items-center justify-center py-10 gap-8"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-7xl"
      >
        {VISUALS[slide.visual] || "📖"}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-bold text-foreground text-center max-w-sm leading-relaxed"
      >
        {slide.text}
      </motion.p>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? "bg-primary w-6" : i < index ? "bg-primary/50" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Button
        onClick={onNext}
        className="w-full max-w-xs h-12 text-base font-bold rounded-2xl gap-2"
      >
        NEXT <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );
}