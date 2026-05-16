import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  // 0 — TITLE
  {
    id: "title",
    type: "title",
    duration: 60,
    label: "Opening",
  },
  // 1 — THE PROBLEM
  {
    id: "problem",
    type: "problem",
    duration: 90,
    label: "The Problem",
  },
  // 2 — THE STAT
  {
    id: "stat",
    type: "bigstat",
    duration: 60,
    label: "Market Size",
  },
  // 3 — THE SOLUTION
  {
    id: "solution",
    type: "solution",
    duration: 90,
    label: "The Solution",
  },
  // 4 — HOW IT WORKS
  {
    id: "how",
    type: "howitworks",
    duration: 90,
    label: "How It Works",
  },
  // 5 — DEMO: HOME
  {
    id: "demo_home",
    type: "demo",
    duration: 60,
    label: "Demo: Home",
  },
  // 6 — DEMO: LEARN
  {
    id: "demo_learn",
    type: "demo2",
    duration: 60,
    label: "Demo: Learn",
  },
  // 7 — DEMO: TRADE
  {
    id: "demo_trade",
    type: "demo3",
    duration: 60,
    label: "Demo: Markets",
  },
  // 8 — AI CONVO
  {
    id: "ai",
    type: "aiconvo",
    duration: 90,
    label: "AI Tutor",
  },
  // 9 — GAMIFICATION
  {
    id: "gamification",
    type: "gamification",
    duration: 90,
    label: "Gamification",
  },
  // 10 — TRACTION
  {
    id: "traction",
    type: "traction",
    duration: 60,
    label: "Why Now",
  },
  // 11 — BUSINESS MODEL
  {
    id: "biz",
    type: "bizmodel",
    duration: 60,
    label: "Business Model",
  },
  // 12 — TEAM / VISION
  {
    id: "vision",
    type: "vision",
    duration: 60,
    label: "Vision",
  },
  // 13 — CTA
  {
    id: "cta",
    type: "cta",
    duration: 60,
    label: "The Ask",
  },
];

const TOTAL_SECONDS = SLIDES.reduce((s, sl) => s + sl.duration, 0);

// ──────────────────────────────────────────────────────────────
// Individual slide components
// ──────────────────────────────────────────────────────────────

function SlideTitle() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-12 overflow-hidden">
      {/* BG grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(hsl(155 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(155 100% 50% / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }}
        className="text-7xl mb-3">📈</motion.div>
      <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-7xl font-black text-white mb-2 tracking-tight">
        V<span className="text-[#00FF87]">stock</span>
      </motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-2xl font-medium text-white/70 mb-5">
        The Duolingo of investing. Turn confusion into confidence.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="flex items-center gap-4">
        <div className="h-px w-20 bg-[#00FF87]/40" />
        <span className="text-[#00FF87] font-bold text-sm tracking-widest uppercase">Investor Pitch · 2026</span>
        <div className="h-px w-20 bg-[#00FF87]/40" />
      </motion.div>
    </div>
  );
}

function SlideProblem() {
  const problems = [
    { emoji: "😰", stat: "67%", text: "of adults feel anxious about investing" },
    { emoji: "📚", stat: "83%", text: "say they never learned finance in school" },
    { emoji: "💸", stat: "$1.2T", text: "sits in low-interest savings accounts in the UK alone" },
    { emoji: "📉", stat: "3 in 4", text: "people who start investing quit within 90 days" },
  ];
  return (
    <div className="flex flex-col h-full px-16 py-6">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">The Problem</span>
        <h2 className="text-5xl font-black text-white mt-1 mb-4">Most people are <span className="text-red-400">scared</span> of investing.</h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {problems.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
            <span className="text-4xl">{p.emoji}</span>
            <div>
              <p className="text-4xl font-black text-red-400">{p.stat}</p>
              <p className="text-white/70 text-base mt-1">{p.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBigStat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-12">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#00FF87] font-black text-sm tracking-widest uppercase mb-3">The Opportunity</motion.p>
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100 }}>
        <p className="text-[8rem] font-black text-white leading-none">$4.8<span className="text-[#00FF87]">B</span></p>
      </motion.div>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-2xl text-white/70 mt-3 max-w-2xl">
        Global financial education market — growing at <span className="text-white font-bold">18% per year</span>
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="flex gap-8 mt-5">
        {[["40M+", "Millennials with no investing experience"], ["£850B", "UK retail investment opportunity"], ["2026", "The year investing goes mainstream"]].map(([v, l]) => (
          <div key={v} className="text-center">
            <p className="text-3xl font-black text-[#00FF87]">{v}</p>
            <p className="text-white/50 text-xs mt-1 max-w-[120px]">{l}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideSolution() {
  return (
    <div className="flex flex-col h-full px-16 py-6">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">The Solution</span>
        <h2 className="text-5xl font-black text-white mt-1 mb-2">We made investing <span className="text-[#00FF87]">feel like a game.</span></h2>
        <p className="text-white/60 text-lg mb-4">Duolingo proved people will form daily habits around learning if you make it fun. We're doing the same for finance — and we call it Vstock.</p>
      </motion.div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: "🎓", title: "Structured Lessons", desc: "20+ bite-sized lessons across 5 units. From 'What is a stock?' to advanced portfolio strategy." },
          { icon: "📈", title: "Paper Trading", desc: "£10,000 of virtual money. Real market mechanics. No risk. Build intuition through experience." },
          { icon: "🏆", title: "Gamification Engine", desc: "Streaks, XP, leagues, badges, daily missions. Retention baked in from day one." },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.2 }}
            className="bg-[#00FF87]/5 border border-[#00FF87]/20 rounded-3xl p-6">
            <span className="text-5xl">{item.icon}</span>
            <h3 className="text-white font-black text-lg mt-4 mb-2">{item.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideHowItWorks() {
  const steps = [
    { n: "01", icon: "🐣", title: "Onboard", desc: "Set your goal, knowledge level, and daily target. Personalised from minute one." },
    { n: "02", icon: "📚", title: "Learn", desc: "Interactive lessons with quizzes, scenarios, and Bruno the AI Bull as your tutor." },
    { n: "03", icon: "📈", title: "Trade", desc: "Apply knowledge in a real-feeling paper market. 50+ stocks, live simulated prices." },
    { n: "04", icon: "🏆", title: "Compete", desc: "Weekly leagues, leaderboards, and challenges with friends keep you coming back." },
  ];
  return (
    <div className="flex flex-col h-full px-16 py-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">How It Works</span>
        <h2 className="text-5xl font-black text-white mt-1 mb-4">Four steps to <span className="text-[#00FF87]">financial confidence.</span></h2>
      </motion.div>
      <div className="flex gap-4 flex-1">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.15 }}
            className="flex-1 relative bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
            <span className="text-6xl font-black text-white/5 absolute top-4 right-5 leading-none">{s.n}</span>
            <span className="text-4xl mb-4">{s.icon}</span>
            <h3 className="text-white font-black text-xl mb-2">{s.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#00FF87] text-xl">→</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideDemo() {
  return (
    <div className="flex h-full px-16 py-6 gap-10 items-center">
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">App Demo · Home</span>
          <h2 className="text-5xl font-black text-white mt-1 mb-4">Your daily dashboard.<br/>Built for engagement.</h2>
          <div className="space-y-3">
            {[
              ["🔥", "Streak Flame", "Animated daily streak — identical psychology to Duolingo"],
              ["⚡", "XP + Daily Goal Ring", "Visual progress ring resets daily, drives return visits"],
              ["📰", "Live Market Pulse", "Real-feeling index cards with sparklines and news feed"],
              ["🎯", "Daily Missions", "Randomised daily objectives. Different every day."],
            ].map(([icon, title, desc]) => (
              <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-white/50 text-xs">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Mock phone */}
      <motion.div initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.3 }}
        className="w-72 shrink-0">
        <PhoneMockup>
          <HomeMock />
        </PhoneMockup>
      </motion.div>
    </div>
  );
}

function SlideDemo2() {
  return (
    <div className="flex h-full px-16 py-6 gap-10 items-center">
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">App Demo · Learn</span>
          <h2 className="text-5xl font-black text-white mt-1 mb-4">A curriculum that<br/>actually sticks.</h2>
          <div className="space-y-3">
            {[
              ["🌱", "5 Units, 25+ Lessons", "Scaffolded from absolute basics to advanced strategy"],
              ["❓", "Interactive Quizzes", "Multiple choice, true/false, fill-the-blank — all with instant feedback"],
              ["🏁", "Checkpoint Exams", "Boss battles to test unit mastery before unlocking next unit"],
              ["💡", "Context-first Teaching", "Every concept taught with a real-world story, not textbook theory"],
            ].map(([icon, title, desc]) => (
              <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-white/50 text-xs">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.3 }}
        className="w-72 shrink-0">
        <PhoneMockup>
          <LearnMock />
        </PhoneMockup>
      </motion.div>
    </div>
  );
}

function SlideDemo3() {
  return (
    <div className="flex h-full px-16 py-6 gap-10 items-center">
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">App Demo · Markets</span>
          <h2 className="text-5xl font-black text-white mt-1 mb-4">A paper market that<br/>feels completely real.</h2>
          <div className="space-y-3">
            {[
              ["📊", "50+ Stocks", "US + UK markets, real sector data, P/E, EPS, dividends, beta"],
              ["💰", "£10K Starting Balance", "Persistent forever. No resets. Real portfolio building."],
              ["📉", "Interactive Charts", "6 time ranges, portfolio health scoring, sector allocation"],
              ["🔔", "Watchlist + Alerts", "Follow stocks and get notified when price targets hit"],
            ].map(([icon, title, desc]) => (
              <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-white/50 text-xs">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.3 }}
        className="w-72 shrink-0">
        <PhoneMockup>
          <TradeMock />
        </PhoneMockup>
      </motion.div>
    </div>
  );
}

function SlideAiConvo() {
  const messages = [
    { from: "user", text: "What even is a P/E ratio? My mate keeps mentioning it." },
    { from: "ai", text: "Great question! P/E stands for Price-to-Earnings. It's basically how much you're paying for £1 of a company's profit. If Apple has a P/E of 30, you're paying £30 for every £1 it earns. 📊" },
    { from: "user", text: "So lower is always better?" },
    { from: "ai", text: "Not always! A low P/E can mean a bargain OR a dying business. A high P/E often means investors expect big future growth. Context is everything. Want me to show you how to use it in a real example? 🚀" },
    { from: "user", text: "Yes please!" },
    { from: "ai", text: "Let's look at Nvidia (NVDA). Its P/E is 61×. Sounds expensive! But it's growing 200% per year. So investors are paying for FUTURE earnings. Compare that to a bank with a P/E of 8× — cheap, but slow growth. Both can be great buys for different reasons! 💡" },
  ];
  return (
    <div className="flex h-full px-16 py-6 gap-10 items-center">
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">Bruno the Bull · AI Tutor</span>
          <h2 className="text-5xl font-black text-white mt-1 mb-2">Finance explained the way<br/>your smartest friend would.</h2>
          <p className="text-white/60 text-lg mb-4">Powered by GPT-4. Responds in plain English. Never condescending. Always encouraging.</p>
          <div className="flex gap-6">
            {[["🧠", "Explains any concept"], ["📈", "Analyses your portfolio"], ["🎯", "Personalised tips"]].map(([e, t]) => (
              <div key={t} className="flex items-center gap-2">
                <span>{e}</span>
                <span className="text-white/70 text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="w-80 shrink-0 bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex flex-col"
        style={{ height: 400 }}>
        <div className="bg-white/10 px-4 py-3 flex items-center gap-2">
          <span className="text-xl">🐂</span>
          <div>
            <p className="text-white font-black text-xs">Bruno the Bull</p>
            <p className="text-[#00FF87] text-[10px]">● Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-3 space-y-2 flex flex-col justify-end">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.15 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                m.from === "user"
                  ? "bg-[#00FF87] text-black font-medium"
                  : "bg-white/10 text-white/90"
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SlideGamification() {
  return (
    <div className="flex flex-col h-full px-16 py-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">Retention Engine</span>
        <h2 className="text-5xl font-black text-white mt-1 mb-4">The same psychology that made<br/>Duolingo worth <span className="text-[#00FF87]">$7 billion.</span></h2>
      </motion.div>
      <div className="grid grid-cols-4 gap-4 flex-1">
        {[
          { icon: "🔥", title: "Daily Streaks", desc: "Miss a day, lose your streak. Users open the app to protect it.", colour: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
          { icon: "⚡", title: "XP & Levels", desc: "50 levels from Market Newbie to Market Legend. Clear progression arc.", colour: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
          { icon: "🏆", title: "Weekly Leagues", desc: "Compete against 20 players. Top 5 promote. Bottom 5 demote.", colour: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { icon: "💎", title: "25+ Badges", desc: "From 'First Trade' to 'Wolf Badge'. Collectible. Shareable.", colour: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
          { icon: "🎯", title: "Daily Missions", desc: "Randomised objectives drive variety and prevent boredom.", colour: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
          { icon: "❤️", title: "Hearts System", desc: "5 lives per day. Lose one on wrong answers. Urgency and stakes.", colour: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
          { icon: "💰", title: "Portfolio Milestones", desc: "XP rewards for 5%, 10%, 25%, 50%, 100% portfolio growth.", colour: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { icon: "📈", title: "Portfolio Score", desc: "Live health score 0–100 grades diversification, risk, and performance.", colour: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}
            className={`border rounded-2xl p-4 ${item.bg}`}>
            <span className="text-3xl">{item.icon}</span>
            <p className={`font-black text-sm mt-2 mb-1 ${item.colour}`}>{item.title}</p>
            <p className="text-white/50 text-[11px] leading-snug">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideTraction() {
  return (
    <div className="flex flex-col h-full px-16 py-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">Why Now</span>
        <h2 className="text-5xl font-black text-white mt-1 mb-4">The moment has arrived.</h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-6 flex-1">
        {[
          { icon: "📱", title: "Mobile-first generation", desc: "Gen Z and Millennials manage everything from their phone. Financial education needs to meet them there.", stat: "94%", statLabel: "of 18-35s own a smartphone" },
          { icon: "📰", title: "GameStop changed everything", desc: "Retail investing went mainstream. People WANT to understand markets — they just need the right tool.", stat: "10M+", statLabel: "new retail investors since 2020" },
          { icon: "🤖", title: "AI makes it possible", desc: "LLMs can now explain complex financial concepts in seconds. Bruno the Bull couldn't exist three years ago.", stat: "GPT-4", statLabel: "powering the AI tutor" },
          { icon: "📉", title: "Existing tools fail beginners", desc: "Bloomberg is for pros. YouTube is passive. Nothing gamified + interactive + comprehensive exists yet.", stat: "Zero", statLabel: "direct competitors with full stack" },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-5">
            <span className="text-4xl">{item.icon}</span>
            <div>
              <h3 className="text-white font-black text-base mb-1">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-3">{item.desc}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-[#00FF87] font-black text-2xl">{item.stat}</span>
                <span className="text-white/40 text-xs">{item.statLabel}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBizModel() {
  return (
    <div className="flex flex-col h-full px-16 py-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">Business Model</span>
        <h2 className="text-5xl font-black text-white mt-1 mb-4">Three clear revenue streams.</h2>
      </motion.div>
      <div className="grid grid-cols-3 gap-6 flex-1">
        {[
          { icon: "🆓", tier: "Free", price: "£0/mo", colour: "border-white/20", dot: "bg-white/30", desc: "Core lessons, basic paper trading, 5 hearts/day, public league", highlight: false },
          { icon: "⚡", tier: "Pro", price: "£6.99/mo", colour: "border-[#00FF87]/40", dot: "bg-[#00FF87]", desc: "Unlimited hearts, advanced lessons, portfolio analytics, AI tutor, ad-free", highlight: true },
          { icon: "👑", tier: "Premium", price: "£14.99/mo", colour: "border-amber-400/40", dot: "bg-amber-400", desc: "Everything in Pro + real broker integration, financial advisor access, team leagues", highlight: false },
        ].map((tier, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.2 }}
            className={`border-2 rounded-3xl p-7 flex flex-col relative ${tier.colour} ${tier.highlight ? "bg-[#00FF87]/5" : "bg-white/3"}`}>
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00FF87] text-black text-[10px] font-black px-3 py-1 rounded-full">MOST POPULAR</div>
            )}
            <div className={`w-3 h-3 rounded-full ${tier.dot} mb-4`} />
            <span className="text-4xl mb-2">{tier.icon}</span>
            <h3 className="text-white font-black text-2xl">{tier.tier}</h3>
            <p className={`font-black text-3xl mt-1 mb-4 ${tier.highlight ? "text-[#00FF87]" : "text-white/60"}`}>{tier.price}</p>
            <p className="text-white/50 text-sm leading-relaxed flex-1">{tier.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-6 bg-white/5 rounded-2xl px-6 py-3 flex items-center justify-between">
        <span className="text-white/60 text-sm">Target: 100K users in Year 1 · 15% Pro conversion = <span className="text-[#00FF87] font-bold">£1.05M ARR</span></span>
        <span className="text-white/40 text-xs">+B2B schools & corporate training pipeline</span>
      </motion.div>
    </div>
  );
}

function SlideVision() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        className="text-6xl mb-2">🌍</motion.div>
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">The Vision</span>
        <h2 className="text-6xl font-black text-white mt-2 mb-3 leading-tight">
          A generation of people who<br/>understand their money.
        </h2>
        <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          In 10 years, we want every 18-year-old to start their financial journey with Vstock.
          We won't just teach investing — we'll change the relationship people have with money.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex gap-10 mt-5">
        {[["Year 1", "100K users", "£1M ARR"], ["Year 2", "500K users", "£5M ARR"], ["Year 3", "2M users", "Launch US"]].map(([yr, users, rev]) => (
          <div key={yr} className="text-center">
            <p className="text-[#00FF87] font-black text-sm mb-1">{yr}</p>
            <p className="text-white font-black text-xl">{users}</p>
            <p className="text-white/50 text-xs">{rev}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, hsl(155 100% 50%), transparent 70%)"
      }} />
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <span className="text-[#00FF87] font-black text-sm tracking-widest uppercase">The Ask</span>
        <h2 className="text-6xl font-black text-white mt-2 mb-2 leading-tight">
          Join us in making the<br/>world financially literate.
        </h2>
        <p className="text-xl text-white/60 mb-5 max-w-2xl mx-auto">
          We're raising <span className="text-white font-bold">£500K seed</span> to build the team, grow user base, and launch the Pro tier.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4 mb-5 max-w-2xl">
        {[
          ["🏗️", "Product", "Full curriculum, real broker integration, team leagues"],
          ["🚀", "Growth", "Paid acquisition, influencer partnerships, school pilots"],
          ["👥", "Team", "3 senior hires: CTO, Head of Content, Growth Lead"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="text-3xl">{icon}</span>
            <p className="text-white font-black text-sm mt-2">{title}</p>
            <p className="text-white/50 text-xs mt-1">{desc}</p>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9 }}
        className="flex flex-col items-center gap-3">
        <div className="text-5xl font-black text-white">Let's talk. <span className="text-[#00FF87]">📈</span></div>
        <p className="text-white/40 text-sm">hello@vstock.app · vstock.app</p>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Phone mockup + screen content
// ──────────────────────────────────────────────────────────────

function PhoneMockup({ children }) {
  return (
    <div className="relative mx-auto" style={{ width: 260, height: 520 }}>
      <div className="absolute inset-0 bg-[#0d0d1a] rounded-[40px] border-4 border-white/20 overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
        <div className="pt-6 h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function HomeMock() {
  return (
    <div className="px-3 py-2 space-y-2 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-white/50">Good morning 👋</p>
          <p className="text-sm font-black">Alex</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm">🔥</span>
          <span className="text-xs font-black text-orange-400">14</span>
        </div>
      </div>
      {/* goal ring */}
      <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <circle cx="22" cy="22" r="18" fill="none" stroke="#00FF87" strokeWidth="4"
            strokeDasharray="113" strokeDashoffset="40" strokeLinecap="round"
            transform="rotate(-90 22 22)" />
          <text x="22" y="26" textAnchor="middle" fontSize="9" fill="white" fontWeight="900">65%</text>
        </svg>
        <div>
          <p className="text-[10px] text-white/50">Daily Goal</p>
          <p className="text-xs font-black">13 / 20 XP</p>
        </div>
      </div>
      {/* continue card */}
      <div className="bg-[#00FF87]/10 border border-[#00FF87]/20 rounded-2xl p-3">
        <p className="text-[9px] text-[#00FF87] font-bold">CONTINUE LEARNING</p>
        <p className="text-xs font-black mt-0.5">What Is a P/E Ratio?</p>
        <div className="w-full bg-white/10 rounded-full h-1 mt-2">
          <div className="bg-[#00FF87] h-1 rounded-full w-2/3" />
        </div>
      </div>
      {/* missions */}
      <div className="space-y-1.5">
        {[{ e:"⚡",t:"Complete a lesson",d:"15 XP",done:true},{e:"📈",t:"Make a trade",d:"10 XP",done:false}].map((m,i)=>(
          <div key={i} className={`flex items-center gap-2 rounded-xl p-2 ${m.done?"bg-[#00FF87]/10":"bg-white/5"}`}>
            <span className="text-base">{m.e}</span>
            <span className="text-[10px] flex-1 font-medium">{m.t}</span>
            <span className={`text-[9px] font-bold ${m.done?"text-[#00FF87]":"text-white/40"}`}>{m.d}</span>
          </div>
        ))}
      </div>
      {/* market strip */}
      <div className="flex gap-2 overflow-x-auto">
        {[["SPX","5,248","+0.56%","green"],["NDX","18,290","+1.1%","green"],["FTSE","8,312","-0.2%","red"]].map(([t,v,c,col])=>(
          <div key={t} className="shrink-0 bg-white/5 rounded-xl p-2 min-w-[72px]">
            <p className="text-[8px] text-white/40">{t}</p>
            <p className="text-[10px] font-black">{v}</p>
            <p className={`text-[8px] font-bold ${col==="green"?"text-green-400":"text-red-400"}`}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearnMock() {
  return (
    <div className="px-3 py-2 text-white">
      <p className="text-[10px] text-white/50 mb-2">UNIT 1 · THE FOUNDATION</p>
      <div className="flex flex-col items-center gap-2">
        {[{s:"complete",l:"1.1",t:"What Is a Stock?"},{s:"complete",l:"1.2",t:"The Market"},{s:"active",l:"1.3",t:"Bulls & Bears"},{s:"locked",l:"1.4",t:"Supply & Demand"},{s:"locked",l:"1.5",t:"Reading Tickers"}].map((node,i)=>{
          const offset = [0,40,-30,20,-10][i] || 0;
          return (
            <div key={i} className="relative w-full flex" style={{ justifyContent: i%2===0?"center":offset>0?"flex-end":"flex-start", paddingLeft: offset>0?offset:0, paddingRight: offset<0?Math.abs(offset):0 }}>
              <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 ${
                node.s==="complete"?"bg-[#00FF87]/20 border border-[#00FF87]/40":
                node.s==="active"?"bg-[#00FF87] text-black":"bg-white/5 border border-white/10"
              }`}>
                <span className="text-base">
                  {node.s==="complete"?"✅":node.s==="active"?"⚡":"🔒"}
                </span>
                <div>
                  <p className={`text-[10px] font-black ${node.s==="active"?"text-black":"text-white"}`}>{node.t}</p>
                  <p className={`text-[8px] ${node.s==="active"?"text-black/60":"text-white/40"}`}>{node.l}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TradeMock() {
  return (
    <div className="px-3 py-2 text-white space-y-2">
      <div className="bg-white/5 rounded-2xl p-3">
        <p className="text-[9px] text-white/40">TOTAL PORTFOLIO VALUE</p>
        <p className="text-2xl font-black">$12,847</p>
        <p className="text-[10px] font-bold text-green-400">▲ +$2,847 (+28.47%)</p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto">
        {[["AAPL","+1.2%","green"],["NVDA","+3.4%","green"],["TSLA","-1.8%","red"]].map(([t,c,col])=>(
          <div key={t} className="shrink-0 bg-white/5 rounded-xl p-2">
            <p className="text-[9px] font-black">{t}</p>
            <p className={`text-[9px] font-bold ${col==="green"?"text-green-400":"text-red-400"}`}>{c}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          {t:"Apple",s:"AAPL",sh:"10",v:"$1,894",p:"+3.8%",up:true},
          {t:"NVIDIA",s:"NVDA",sh:"4",v:"$1,981",p:"+8.2%",up:true},
          {t:"Tesla",s:"TSLA",sh:"5",v:"$1,242",p:"-1.4%",up:false},
        ].map((h)=>(
          <div key={h.s} className={`flex items-center gap-2 rounded-xl p-2.5 ${h.up?"bg-green-500/5 border border-green-500/15":"bg-red-500/5 border border-red-500/15"}`}>
            <div className={`w-1 self-stretch rounded-full ${h.up?"bg-green-400":"bg-red-400"}`} />
            <div className="flex-1">
              <p className="text-[10px] font-black">{h.t}</p>
              <p className="text-[8px] text-white/40">{h.sh} shares</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black">{h.v}</p>
              <p className={`text-[8px] font-bold ${h.up?"text-green-400":"text-red-400"}`}>{h.p}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Slide renderer
// ──────────────────────────────────────────────────────────────

function renderSlide(slide) {
  switch (slide.type) {
    case "title": return <SlideTitle />;
    case "problem": return <SlideProblem />;
    case "bigstat": return <SlideBigStat />;
    case "solution": return <SlideSolution />;
    case "howitworks": return <SlideHowItWorks />;
    case "demo": return <SlideDemo />;
    case "demo2": return <SlideDemo2 />;
    case "demo3": return <SlideDemo3 />;
    case "aiconvo": return <SlideAiConvo />;
    case "gamification": return <SlideGamification />;
    case "traction": return <SlideTraction />;
    case "bizmodel": return <SlideBizModel />;
    case "vision": return <SlideVision />;
    case "cta": return <SlideCta />;
    default: return null;
  }
}

// ──────────────────────────────────────────────────────────────
// Main Presentation component
// ──────────────────────────────────────────────────────────────

export default function Present() {
  const [current, setCurrent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let id;
    if (timerActive) {
      id = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(id);
  }, [timerActive]);

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1)), []);
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "f" || e.key === "F") {
        document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const totalElapsed = SLIDES.slice(0, current).reduce((s, sl) => s + sl.duration, 0);
  const slideTimeLimit = SLIDES[current].duration;
  const slideElapsedSec = Math.max(0, elapsed - totalElapsed);
  const overTime = slideElapsedSec > slideTimeLimit;

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const totalProgress = (elapsed / TOTAL_SECONDS) * 100;

  return (
    <div
      className="fixed inset-0 bg-[#080b14] flex flex-col select-none overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
      onClick={() => setShowNav(n => !n)}
    >
      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {renderSlide(SLIDES[current])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5">
        <motion.div
          className="h-full bg-[#00FF87]"
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Controls bar */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            className="bg-black/80 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center gap-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Slide nav */}
            <div className="flex items-center gap-2">
              <button onClick={goPrev} disabled={current === 0}
                className="w-8 h-8 rounded-full bg-white/10 disabled:opacity-30 text-white flex items-center justify-center text-sm hover:bg-white/20">
                ←
              </button>
              <span className="text-white/60 text-xs font-mono w-16 text-center">
                {current + 1} / {SLIDES.length}
              </span>
              <button onClick={goNext} disabled={current === SLIDES.length - 1}
                className="w-8 h-8 rounded-full bg-white/10 disabled:opacity-30 text-white flex items-center justify-center text-sm hover:bg-white/20">
                →
              </button>
            </div>

            {/* Slide label */}
            <div className="flex-1">
              <span className="text-[#00FF87] text-xs font-black">{SLIDES[current].label}</span>
              <span className="text-white/30 text-xs ml-3 font-mono">~{SLIDES[current].duration}s</span>
            </div>

            {/* Slide picker */}
            <div className="flex gap-1 overflow-x-auto max-w-xs">
              {SLIDES.map((sl, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`shrink-0 w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-[#00FF87] w-4" : i < current ? "bg-white/40" : "bg-white/15"}`} />
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2">
              <div className={`font-mono text-sm font-bold ${elapsed > TOTAL_SECONDS * 0.9 ? "text-red-400" : overTime ? "text-amber-400" : "text-white"}`}>
                {formatTime(elapsed)}
                <span className="text-white/30"> / {formatTime(TOTAL_SECONDS)}</span>
              </div>
              <button onClick={() => setTimerActive(t => !t)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${timerActive ? "bg-red-500/20 text-red-400" : "bg-[#00FF87]/20 text-[#00FF87]"}`}>
                {timerActive ? "⏸ Pause" : "▶ Start"}
              </button>
              <button onClick={() => { setElapsed(0); setTimerActive(false); }}
                className="text-xs font-bold px-2 py-1.5 rounded-full bg-white/5 text-white/40">
                ↺
              </button>
            </div>

            {/* Fullscreen hint */}
            <button onClick={() => document.documentElement.requestFullscreen?.()}
              className="text-[10px] text-white/30 hover:text-white/60">
              ⛶ F
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}