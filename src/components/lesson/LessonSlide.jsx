import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const VISUALS = {
  pizza: { emoji: "🍕", bg: "from-orange-500/20 to-red-500/10", accent: "#f97316" },
  shares: { emoji: "📊", bg: "from-blue-500/20 to-cyan-500/10", accent: "#3b82f6" },
  ownership: { emoji: "🔑", bg: "from-yellow-500/20 to-amber-500/10", accent: "#eab308" },
  stock: { emoji: "📈", bg: "from-green-500/20 to-emerald-500/10", accent: "#22c55e" },
  market: { emoji: "🏪", bg: "from-purple-500/20 to-violet-500/10", accent: "#a855f7" },
  exchanges: { emoji: "🏛️", bg: "from-slate-500/20 to-gray-500/10", accent: "#64748b" },
  broker: { emoji: "🤝", bg: "from-teal-500/20 to-cyan-500/10", accent: "#14b8a6" },
  trading: { emoji: "⚡", bg: "from-yellow-500/20 to-orange-500/10", accent: "#f59e0b" },
  bull: { emoji: "🐂", bg: "from-green-500/20 to-emerald-500/10", accent: "#22c55e" },
  bear: { emoji: "🐻", bg: "from-red-500/20 to-rose-500/10", accent: "#ef4444" },
  correction: { emoji: "📉", bg: "from-red-500/20 to-orange-500/10", accent: "#f97316" },
  recovery: { emoji: "🌱", bg: "from-green-500/20 to-teal-500/10", accent: "#10b981" },
  supply_demand: { emoji: "⚖️", bg: "from-blue-500/20 to-purple-500/10", accent: "#6366f1" },
  buyers: { emoji: "🛒", bg: "from-green-500/20 to-emerald-500/10", accent: "#22c55e" },
  sellers: { emoji: "🏷️", bg: "from-red-500/20 to-rose-500/10", accent: "#ef4444" },
  agreement: { emoji: "🤝", bg: "from-blue-500/20 to-teal-500/10", accent: "#0ea5e9" },
  tickers: { emoji: "🔤", bg: "from-indigo-500/20 to-blue-500/10", accent: "#6366f1" },
  reading: { emoji: "📖", bg: "from-amber-500/20 to-yellow-500/10", accent: "#f59e0b" },
  colors: { emoji: "🎨", bg: "from-pink-500/20 to-rose-500/10", accent: "#ec4899" },
  volume: { emoji: "📊", bg: "from-blue-500/20 to-indigo-500/10", accent: "#6366f1" },
  basket: { emoji: "🧺", bg: "from-amber-500/20 to-orange-500/10", accent: "#f97316" },
  sp500: { emoji: "🏆", bg: "from-yellow-500/20 to-amber-500/10", accent: "#eab308" },
  indices: { emoji: "📋", bg: "from-blue-500/20 to-sky-500/10", accent: "#0ea5e9" },
  market_up: { emoji: "📈", bg: "from-green-500/20 to-emerald-500/10", accent: "#22c55e" },
  chart_basic: { emoji: "📉", bg: "from-blue-500/20 to-cyan-500/10", accent: "#06b6d4" },
  line_chart: { emoji: "📊", bg: "from-green-500/20 to-teal-500/10", accent: "#14b8a6" },
  candle: { emoji: "🕯️", bg: "from-orange-500/20 to-amber-500/10", accent: "#f59e0b" },
  volume_bars: { emoji: "📊", bg: "from-purple-500/20 to-violet-500/10", accent: "#8b5cf6" },
  earnings: { emoji: "💰", bg: "from-green-500/20 to-emerald-500/10", accent: "#22c55e" },
  bad_news: { emoji: "📰", bg: "from-red-500/20 to-rose-500/10", accent: "#ef4444" },
  macro: { emoji: "🌍", bg: "from-blue-500/20 to-sky-500/10", accent: "#0284c7" },
  sentiment: { emoji: "🧠", bg: "from-purple-500/20 to-violet-500/10", accent: "#7c3aed" },
  revenue: { emoji: "💵", bg: "from-green-500/20 to-emerald-500/10", accent: "#16a34a" },
  profit: { emoji: "💎", bg: "from-cyan-500/20 to-sky-500/10", accent: "#0891b2" },
  comparison: { emoji: "⚖️", bg: "from-amber-500/20 to-yellow-500/10", accent: "#d97706" },
  eps: { emoji: "📐", bg: "from-indigo-500/20 to-blue-500/10", accent: "#4f46e5" },
  calculation: { emoji: "🔢", bg: "from-teal-500/20 to-cyan-500/10", accent: "#0d9488" },
  balance: { emoji: "📋", bg: "from-blue-500/20 to-indigo-500/10", accent: "#3730a3" },
  assets: { emoji: "🏠", bg: "from-green-500/20 to-teal-500/10", accent: "#059669" },
  liabilities: { emoji: "💳", bg: "from-red-500/20 to-orange-500/10", accent: "#dc2626" },
  equity: { emoji: "✨", bg: "from-yellow-500/20 to-amber-500/10", accent: "#ca8a04" },
  market_cap: { emoji: "📏", bg: "from-purple-500/20 to-pink-500/10", accent: "#9333ea" },
  valuation: { emoji: "🎯", bg: "from-blue-500/20 to-indigo-500/10", accent: "#4f46e5" },
  large_cap: { emoji: "🏢", bg: "from-slate-500/20 to-gray-500/10", accent: "#475569" },
  mid_cap: { emoji: "🏗️", bg: "from-orange-500/20 to-amber-500/10", accent: "#ea580c" },
  small_cap: { emoji: "🌱", bg: "from-green-500/20 to-lime-500/10", accent: "#65a30d" },
  growth: { emoji: "🚀", bg: "from-indigo-500/20 to-purple-500/10", accent: "#7c3aed" },
  value: { emoji: "💎", bg: "from-cyan-500/20 to-teal-500/10", accent: "#0e7490" },
  both: { emoji: "⚖️", bg: "from-blue-500/20 to-purple-500/10", accent: "#6d28d9" },
  dividends: { emoji: "💰", bg: "from-green-500/20 to-emerald-500/10", accent: "#059669" },
  payment: { emoji: "💵", bg: "from-green-500/20 to-teal-500/10", accent: "#047857" },
  yield: { emoji: "📊", bg: "from-blue-500/20 to-cyan-500/10", accent: "#0369a1" },
  pe: { emoji: "📐", bg: "from-violet-500/20 to-purple-500/10", accent: "#7c3aed" },
  context: { emoji: "🔍", bg: "from-amber-500/20 to-orange-500/10", accent: "#b45309" },
  market_order: { emoji: "⚡", bg: "from-yellow-500/20 to-orange-500/10", accent: "#d97706" },
  limit_order: { emoji: "🎯", bg: "from-green-500/20 to-emerald-500/10", accent: "#16a34a" },
  stoploss: { emoji: "🛡️", bg: "from-blue-500/20 to-indigo-500/10", accent: "#1d4ed8" },
  trigger: { emoji: "⏰", bg: "from-orange-500/20 to-red-500/10", accent: "#c2410c" },
  safety: { emoji: "🔒", bg: "from-teal-500/20 to-cyan-500/10", accent: "#0f766e" },
};

const BRUNO_TIPS = {
  pizza: "PizzaRocket is just like Apple, Google, or Tesla — they all started as small ideas before going public!",
  shares: "Fun fact: Apple has about 15 billion shares. Each one is a tiny ownership slice of the company!",
  ownership: "Owning even 1 share of a company legally makes you a part-owner. How cool is that?",
  stock: "The first stock market in history was in Amsterdam in 1602. People have been trading shares for 400+ years!",
  market: "Over $100 billion worth of stocks are traded every single day on US markets. It never sleeps!",
  exchanges: "NASDAQ was the world's first electronic stock exchange, launched in 1971.",
  broker: "Today's brokers like Robinhood and Fidelity make it possible to buy stocks in seconds from your phone.",
  trading: "High-frequency traders use algorithms that can execute thousands of trades per second. Markets are fast!",
  bull: "The longest bull market in US history ran from 2009 to 2020 — over 11 years of mostly rising prices!",
  bear: "Bear markets are scary but brief. The average bear market lasts about 9 months vs 3 years for bull markets.",
  correction: "Corrections happen more often than you think — roughly once a year on average. They're totally normal!",
  recovery: "If you invested in the S&P 500 in 2009 during the crash and held, your money would be up 600%+ today.",
  supply_demand: "The same supply and demand that sets the price of eggs also sets the price of Apple stock. Economics everywhere!",
  buyers: "When positive news breaks, millions of buyers flood in simultaneously — that's why stocks can jump 10% in seconds.",
  sellers: "Panic selling is one of the most common investor mistakes. Selling when everyone else sells often locks in losses.",
  agreement: "Every single trade has two sides — for every buyer thinking it'll go up, there's a seller who thinks otherwise!",
  pe: "Apple's P/E is ~28, Tesla's was over 1000 at its peak! Context is everything when reading P/E ratios.",
  earnings: "Companies report earnings 4 times a year. These 'earnings seasons' are some of the most exciting weeks in finance!",
};

function BrunoChat({ visual, onClose }) {
  const tip = BRUNO_TIPS[visual];
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const askBruno = async (q) => {
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Bruno the Bull 🐂, a friendly, enthusiastic, and encouraging AI tutor for Vstock — a gamified investing education app for beginners. 

The user is currently learning about "${visual}" in a lesson. Answer their question in 2-3 short sentences maximum. Use plain English, one relevant emoji, and be encouraging. Never be condescending. Keep it fun!

User's question: "${q}"`,
      });
      setAiResponse(res);
    } catch (e) {
      setAiResponse("Hmm, I'm having trouble connecting right now. Try again in a moment! 🐂");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 left-4 right-4 z-50 rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
      style={{ background: "hsl(var(--card))" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50"
        style={{ background: "linear-gradient(135deg, hsl(155 100% 50% / 0.15), hsl(155 100% 50% / 0.05))" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-black"
            style={{ background: "hsl(155 100% 50% / 0.2)", border: "2px solid hsl(155 100% 50% / 0.4)" }}>
            🐂
          </div>
          <div>
            <p className="text-xs font-black text-foreground">Bruno the Bull</p>
            <p className="text-[10px] text-primary font-bold">● Your AI Tutor</p>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Bruno's tip */}
        {tip && !aiResponse && (
          <div className="rounded-2xl p-3 text-sm leading-relaxed text-foreground"
            style={{ background: "hsl(155 100% 50% / 0.08)", border: "1px solid hsl(155 100% 50% / 0.2)" }}>
            <p className="text-[10px] font-black text-primary mb-1">💡 DID YOU KNOW?</p>
            {tip}
          </div>
        )}

        {/* AI response */}
        {aiResponse && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-3 text-sm leading-relaxed text-foreground"
            style={{ background: "hsl(155 100% 50% / 0.08)", border: "1px solid hsl(155 100% 50% / 0.2)" }}>
            <p className="text-[10px] font-black text-primary mb-1">🐂 BRUNO SAYS</p>
            {aiResponse}
          </motion.div>
        )}

        {/* Ask Bruno */}
        <div className="flex gap-2">
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && question.trim()) { askBruno(question); setQuestion(""); } }}
            placeholder="Ask Bruno anything..."
            className="flex-1 text-sm rounded-2xl px-3 py-2 bg-muted border-0 outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => { if (question.trim()) { askBruno(question); setQuestion(""); } }}
            disabled={loading || !question.trim()}
            className="px-3 py-2 rounded-2xl text-sm font-bold disabled:opacity-40 transition-all"
            style={{ background: "hsl(155 100% 50%)", color: "hsl(var(--primary-foreground))" }}>
            {loading ? "..." : "Ask"}
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center">Powered by AI · For educational purposes only</p>
      </div>
    </motion.div>
  );
}

export default function LessonSlide({ slide, onNext, index, total }) {
  const [showBruno, setShowBruno] = useState(false);
  const visual = VISUALS[slide.visual] || { emoji: "📖", bg: "from-primary/20 to-primary/5", accent: "hsl(var(--primary))" };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        className="flex-1 flex flex-col py-6 gap-6"
      >
        {/* Visual card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className={`rounded-3xl bg-gradient-to-br ${visual.bg} flex flex-col items-center justify-center gap-3 py-10 relative overflow-hidden`}
          style={{ border: `1px solid ${visual.accent}30`, minHeight: 180 }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
            style={{ background: visual.accent }} />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
            style={{ background: visual.accent }} />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl relative z-10"
          >
            {visual.emoji}
          </motion.div>
          {/* Slide counter */}
          <div className="flex items-center gap-1.5 relative z-10">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6" : i < index ? "w-2 opacity-70" : "w-2 opacity-30"
              }`} style={{ background: visual.accent }} />
            ))}
          </div>
        </motion.div>

        {/* Lesson number badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">
            Slide {index + 1} of {total}
          </span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <p className="text-xl font-black text-foreground leading-relaxed text-center px-2">
            {slide.text}
          </p>
          {slide.detail && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground text-center mt-3 leading-relaxed px-2"
            >
              {slide.detail}
            </motion.p>
          )}
          {slide.example && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-4 rounded-2xl p-4"
              style={{ background: `${visual.accent}12`, border: `1px solid ${visual.accent}25` }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-1.5"
                style={{ color: visual.accent }}>
                💡 REAL EXAMPLE
              </p>
              <p className="text-sm text-foreground leading-relaxed">{slide.example}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <Button onClick={onNext} className="w-full h-13 text-base font-bold rounded-2xl gap-2 h-12">
            {index === total - 1 ? "START QUIZ" : "CONTINUE"} <ArrowRight className="w-5 h-5" />
          </Button>
          <button
            onClick={() => setShowBruno(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-bold transition-all"
            style={{ color: "hsl(155 100% 50%)", background: "hsl(155 100% 50% / 0.08)", border: "1px solid hsl(155 100% 50% / 0.2)" }}
          >
            <span>🐂</span> Ask Bruno the Bull
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showBruno && <BrunoChat visual={slide.visual} onClose={() => setShowBruno(false)} />}
      </AnimatePresence>
    </>
  );
}