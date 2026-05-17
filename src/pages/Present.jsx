import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { X, Send, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";

const G = "#00FF87";
const BG = "#f8f9fb";
const CARD = "#ffffff";
const BORDER = "#e4e7ec";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const MUTED2 = "#94a3b8";

// App screenshots
const SCREENSHOTS = {
  home: "https://media.base44.com/images/public/6a086c417a13783341515474/6eff15043_generated_image.png",
  learn: "https://media.base44.com/images/public/6a086c417a13783341515474/9622095c2_generated_image.png",
  trade: "https://media.base44.com/images/public/6a086c417a13783341515474/a3e3b542f_generated_image.png",
  lesson: "https://media.base44.com/images/public/6a086c417a13783341515474/1bcc2a0f1_generated_image.png",
};

// Phone mockup wrapper using real screenshots
function Phone({ src, label }) {
  return (
    <div className="relative shrink-0 flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 220, height: 450 }}>
        <div className="absolute inset-0 rounded-[36px] overflow-hidden shadow-2xl"
          style={{ border: "5px solid #1e293b", background: "#0d0f1e" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-2xl z-10" />
          <img src={src} alt={label} className="w-full h-full object-cover object-top" />
        </div>
        {/* Reflective sheen */}
        <div className="absolute inset-0 rounded-[36px] pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)" }} />
        {/* Side buttons */}
        <div className="absolute right-[-6px] top-16 w-1 h-8 bg-slate-400 rounded-full" />
        <div className="absolute left-[-6px] top-14 w-1 h-6 bg-slate-400 rounded-full" />
        <div className="absolute left-[-6px] top-24 w-1 h-6 bg-slate-400 rounded-full" />
      </div>
      {label && (
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: `${G}15`, color: G, border: `1px solid ${G}30` }}>{label}</span>
      )}
    </div>
  );
}

// ── Shared helpers ──────────────────────────────────────────────
const Chip = ({ children }) => (
  <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border mb-4"
    style={{ color: G, borderColor: `${G}50`, background: `${G}15` }}>{children}</span>
);
const H = ({ children, className = "" }) => (
  <h2 className={`text-5xl font-black leading-tight mb-5 ${className}`} style={{ color: TEXT }}>{children}</h2>
);
const Card = ({ children, className = "", style = {} }) => (
  <div className={`rounded-3xl border ${className}`}
    style={{ background: CARD, borderColor: BORDER, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", ...style }}>
    {children}
  </div>
);

// ── SLIDES ────────────────────────────────────────────────────
function SlideTitle() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${G}18 1px,transparent 1px),linear-gradient(90deg,${G}18 1px,transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${G}20, transparent 70%)` }} />
      <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
        className="text-8xl mb-4 relative z-10">📈</motion.div>
      <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
        className="font-black leading-none relative z-10" style={{ fontSize: 96, letterSpacing: "-4px", color: TEXT }}>
        V<span style={{ color: G }}>stock</span>
      </motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55 }}
        className="text-2xl mt-3 mb-8 relative z-10" style={{ color: MUTED }}>
        The Duolingo of investing. Turn confusion into confidence.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
        className="flex items-center gap-4 relative z-10">
        <div className="h-px w-24" style={{ background: `linear-gradient(90deg,transparent,${G}60)` }} />
        <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: G }}>Investor Pitch · 2026</span>
        <div className="h-px w-24" style={{ background: `linear-gradient(90deg,${G}60,transparent)` }} />
      </motion.div>
    </div>
  );
}

function SlideProblem() {
  const problems = [
    { emoji: "😰", stat: "67%", text: "of adults feel anxious about investing", color: "#ef4444" },
    { emoji: "📚", stat: "83%", text: "never learned finance in school", color: "#f97316" },
    { emoji: "💸", stat: "$1.2T", text: "sits idle in low-interest savings accounts", color: "#eab308" },
    { emoji: "📉", stat: "3 in 4", text: "new investors quit within 90 days", color: "#ef4444" },
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-8" style={{ background: BG }}>
      <div><Chip>The Problem</Chip><H>Most people are <span style={{ color: "#ef4444" }}>financially frozen.</span></H></div>
      <div className="grid grid-cols-2 gap-5">
        {problems.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12 }}>
            <Card className="relative overflow-hidden p-7">
              <div className="absolute top-4 right-5 text-6xl opacity-8">{p.emoji}</div>
              <p className="text-6xl font-black" style={{ color: p.color }}>{p.stat}</p>
              <p className="text-base mt-2 leading-snug" style={{ color: MUTED }}>{p.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideSolution() {
  return (
    <div className="flex h-full px-20 items-center gap-16" style={{ background: BG }}>
      <div className="flex-1">
        <Chip>The Solution</Chip>
        <H>We made investing<br /><span style={{ color: G }}>feel like a game.</span></H>
        <p className="text-lg mb-8" style={{ color: MUTED }}>Duolingo proved people form daily habits if you make learning fun. We're doing the same for finance.</p>
        <div className="space-y-4">
          {[
            ["🎓", "25+ Structured Lessons", "From 'What is a stock?' to advanced portfolio strategy"],
            ["📈", "£10K Paper Trading", "Real market mechanics. Zero risk. Real intuition."],
            ["🏆", "Gamification Engine", "Streaks, XP, leagues, badges — retention baked in"],
            ["🤖", "Bruno the Bull AI Tutor", "GPT-powered tutor explains anything in plain English"],
          ].map(([icon, title, desc], i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                style={{ background: `${G}15`, border: `1px solid ${G}30` }}>{icon}</div>
              <div>
                <p className="font-bold text-sm" style={{ color: TEXT }}>{title}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: MUTED }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Multi-phone showcase */}
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
        className="flex gap-4 items-end">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Phone src={SCREENSHOTS.home} label="Home" />
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Phone src={SCREENSHOTS.learn} label="Learn" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function SlideDemo() {
  return (
    <div className="flex h-full px-20 items-center gap-16" style={{ background: BG }}>
      <div className="flex-1">
        <Chip>App Demo · Home Dashboard</Chip>
        <H>Your daily dashboard.<br />Built for <span style={{ color: G }}>engagement.</span></H>
        <div className="space-y-4">
          {[["🔥", "Streak Flame", "Animated daily streak — identical psychology to Duolingo"],
            ["⚡", "XP + Daily Goal Ring", "Visual progress ring resets daily, drives return visits"],
            ["🎯", "Daily Missions", "Randomised daily objectives. Different every day."],
            ["📰", "Live Market Pulse", "Real-feeling index cards with live-simulated prices"]].map(([icon, t, d]) => (
            <motion.div key={t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                style={{ background: `${G}15`, border: `1px solid ${G}30` }}>{icon}</div>
              <div>
                <p className="font-bold text-sm" style={{ color: TEXT }}>{t}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: MUTED }}>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, x: 50, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.3 }}>
        <Phone src={SCREENSHOTS.home} label="Home Screen" />
      </motion.div>
    </div>
  );
}

function SlideLearn() {
  return (
    <div className="flex h-full px-20 items-center gap-16" style={{ background: BG }}>
      <div className="flex-1">
        <Chip>App Demo · Learn</Chip>
        <H>A curriculum that<br /><span style={{ color: G }}>actually sticks.</span></H>
        <div className="space-y-4">
          {[["🌱", "5 Units, 25+ Lessons", "Scaffolded from absolute basics to advanced strategy"],
            ["❓", "Interactive Quizzes", "Multiple choice, true/false, fill-the-blank — instant feedback"],
            ["🏁", "Checkpoint Exams", "Boss battles to test unit mastery before unlocking next unit"],
            ["💡", "Context-first Teaching", "Every concept taught with a real-world story, not textbook theory"]].map(([icon, t, d]) => (
            <motion.div key={t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                style={{ background: `${G}15`, border: `1px solid ${G}30` }}>{icon}</div>
              <div>
                <p className="font-bold text-sm" style={{ color: TEXT }}>{t}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: MUTED }}>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 items-end">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          animate={{ y: [0, -6, 0] }} style={{animation: "none"}}>
          <Phone src={SCREENSHOTS.learn} label="Skill Tree" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
          <Phone src={SCREENSHOTS.lesson} label="Lesson Slide" />
        </motion.div>
      </div>
    </div>
  );
}

function SlideTrade() {
  return (
    <div className="flex h-full px-20 items-center gap-16" style={{ background: BG }}>
      <div className="flex-1">
        <Chip>App Demo · Markets</Chip>
        <H>A paper market that<br /><span style={{ color: G }}>feels completely real.</span></H>
        <div className="space-y-4">
          {[["📊", "50+ Stocks", "US + UK markets, real sector data, P/E, EPS, dividends"],
            ["💰", "£10K Starting Balance", "Persistent forever. No resets. Real portfolio building."],
            ["📉", "Interactive Charts", "6 time ranges, portfolio health scoring, sector allocation"],
            ["🔔", "Watchlist + Predictions", "Follow stocks and predict up/down for bonus XP"]].map(([icon, t, d]) => (
            <motion.div key={t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                style={{ background: `${G}15`, border: `1px solid ${G}30` }}>{icon}</div>
              <div>
                <p className="font-bold text-sm" style={{ color: TEXT }}>{t}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: MUTED }}>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, x: 50, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.3 }}>
        <Phone src={SCREENSHOTS.trade} label="Portfolio" />
      </motion.div>
    </div>
  );
}

function SlideGamification() {
  const items = [
    { icon: "🔥", title: "Daily Streaks", desc: "Miss a day, lose your streak.", c: "#f97316", bg: { background: "#fff7ed", borderColor: "#fed7aa" } },
    { icon: "⚡", title: "XP & Levels", desc: "50 levels from Newbie to Legend.", c: "#eab308", bg: { background: "#fefce8", borderColor: "#fde68a" } },
    { icon: "🏆", title: "Weekly Leagues", desc: "Top 5 promote. Bottom 5 demote.", c: "#3b82f6", bg: { background: "#eff6ff", borderColor: "#bfdbfe" } },
    { icon: "💎", title: "25+ Badges", desc: "Collectible. Shareable milestones.", c: "#a855f7", bg: { background: "#faf5ff", borderColor: "#e9d5ff" } },
    { icon: "🎯", title: "Daily Missions", desc: "Randomised objectives daily.", c: G, bg: { background: `${G}10`, borderColor: `${G}40` } },
    { icon: "❤️", title: "Hearts System", desc: "5 lives per day. Creates stakes.", c: "#ef4444", bg: { background: "#fff1f2", borderColor: "#fecdd3" } },
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6" style={{ background: BG }}>
      <div>
        <Chip>Retention Engine</Chip>
        <H>The same psychology that made<br />Duolingo worth <span style={{ color: G }}>$7 billion.</span></H>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 + i * 0.07 }}
            className="border rounded-2xl p-5" style={item.bg}>
            <span className="text-3xl">{item.icon}</span>
            <p className="font-black text-sm mt-2 mb-1" style={{ color: item.c }}>{item.title}</p>
            <p className="text-[11px] leading-snug" style={{ color: MUTED }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideBizModel() {
  const tiers = [
    { icon: "🆓", tier: "Free", price: "£0/mo", style: { border: `2px solid ${BORDER}`, background: CARD }, priceColor: MUTED, desc: "Core lessons, basic trading, 5 hearts/day, public league" },
    { icon: "⚡", tier: "Pro", price: "£6.99/mo", style: { border: `2px solid ${G}`, background: `${G}08` }, priceColor: G, desc: "Unlimited hearts, advanced lessons, AI tutor, ad-free", highlight: true },
    { icon: "👑", tier: "Premium", price: "£14.99/mo", style: { border: "2px solid #f59e0b", background: "#fffbeb" }, priceColor: "#d97706", desc: "Everything in Pro + real broker integration, advisor access" },
  ];
  return (
    <div className="flex flex-col h-full px-20 justify-center gap-6" style={{ background: BG }}>
      <div><Chip>Business Model</Chip><H>Three clear revenue streams.</H></div>
      <div className="grid grid-cols-3 gap-5">
        {tiers.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.18 }}
            className="relative rounded-3xl p-8 flex flex-col" style={t.style}>
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-black px-3 py-1 rounded-full" style={{ background: G }}>MOST POPULAR</div>
            )}
            <span className="text-4xl mb-4">{t.icon}</span>
            <h3 className="font-black text-2xl" style={{ color: TEXT }}>{t.tier}</h3>
            <p className="font-black text-3xl mt-1 mb-4" style={{ color: t.priceColor }}>{t.price}</p>
            <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>{t.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="rounded-2xl px-6 py-3 flex items-center justify-between"
        style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <span className="text-sm" style={{ color: MUTED }}>Target: 100K users Year 1 · 15% Pro conversion = <strong style={{ color: G }}>£1.05M ARR</strong></span>
      </motion.div>
    </div>
  );
}

function SlideCta() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20 relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${G}15 1px,transparent 1px),linear-gradient(90deg,${G}15 1px,transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${G}20, transparent 70%)` }} />
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative z-10">
        <Chip>The Ask</Chip>
        <h2 className="text-6xl font-black leading-tight mb-3" style={{ color: TEXT }}>
          Join us in making the world<br /><span style={{ color: G }}>financially literate.</span>
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: MUTED }}>
          We're raising <strong style={{ color: TEXT }}>£500K seed</strong> to build the team, grow the user base, and launch the Pro tier.
        </p>
      </motion.div>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9 }}
        className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-5xl font-black" style={{ color: TEXT }}>Let's talk. <span style={{ color: G }}>📈</span></div>
        <p className="text-sm" style={{ color: MUTED2 }}>hello@vstock.app · vstock.co.uk</p>
      </motion.div>
    </div>
  );
}

const SLIDES = [
  { id: "title", label: "Opening", duration: 60 },
  { id: "problem", label: "The Problem", duration: 90 },
  { id: "solution", label: "The Solution", duration: 90 },
  { id: "demo_home", label: "Demo: Home", duration: 60 },
  { id: "demo_learn", label: "Demo: Learn", duration: 60 },
  { id: "demo_trade", label: "Demo: Markets", duration: 60 },
  { id: "gamification", label: "Gamification", duration: 90 },
  { id: "bizmodel", label: "Business Model", duration: 60 },
  { id: "cta", label: "The Ask", duration: 60 },
];
const TOTAL_SECONDS = SLIDES.reduce((s, sl) => s + sl.duration, 0);

function renderSlide(id) {
  switch (id) {
    case "title": return <SlideTitle />;
    case "problem": return <SlideProblem />;
    case "solution": return <SlideSolution />;
    case "demo_home": return <SlideDemo />;
    case "demo_learn": return <SlideLearn />;
    case "demo_trade": return <SlideTrade />;
    case "gamification": return <SlideGamification />;
    case "bizmodel": return <SlideBizModel />;
    case "cta": return <SlideCta />;
    default: return null;
  }
}

// ── Bruno the Bull AI Assistant ─────────────────────────────
const BRUNO_STARTERS = [
  "What makes Vstock different from YouTube investing videos?",
  "How does the paper trading work?",
  "What's the revenue model?",
  "How do you keep users engaged long-term?",
];

function BrunoPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bruno", text: "Hey! I'm Bruno the Bull 🐂 — Vstock's AI investing tutor. Ask me anything about the platform, the pitch, or how it all works!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: msg }]);
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Bruno the Bull 🐂 — Vstock's enthusiastic, friendly AI investing tutor and pitch assistant. Vstock is a gamified investment education app (like Duolingo for investing) with structured lessons, paper trading, weekly leagues, streaks, XP, badges, and an AI tutor. It's currently raising £500K seed funding. Keep answers concise, friendly, and confident. Use emojis naturally. The user asked: "${msg}"`,
      });
      setMessages(prev => [...prev, { from: "bruno", text: res }]);
    } catch (e) {
      setMessages(prev => [...prev, { from: "bruno", text: "Sorry, I hit a snag! Try asking again. 🐂" }]);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      className="fixed right-0 top-0 bottom-0 z-50 flex flex-col shadow-2xl"
      style={{ width: 340, background: CARD, borderLeft: `1px solid ${BORDER}` }}
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl" style={{ background: `${G}20` }}>🐂</div>
        <div className="flex-1">
          <p className="font-black text-sm" style={{ color: TEXT }}>Bruno the Bull</p>
          <p className="text-[10px] font-semibold" style={{ color: G }}>● AI Pitch Assistant</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100">
          <X className="w-4 h-4" style={{ color: MUTED }} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            {m.from === "bruno" && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 mr-2 mt-0.5" style={{ background: `${G}20` }}>🐂</div>
            )}
            <div className="max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-relaxed"
              style={m.from === "user"
                ? { background: G, color: "#fff", fontWeight: 500 }
                : { background: "#f1f5f9", color: TEXT }}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2" style={{ background: `${G}20` }}>🐂</div>
            <div className="rounded-2xl px-3 py-2 text-xs" style={{ background: "#f1f5f9", color: MUTED }}>
              <span className="animate-pulse">Thinking…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick starters */}
      {messages.length === 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {BRUNO_STARTERS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full transition-colors hover:opacity-80"
              style={{ background: `${G}15`, color: G, border: `1px solid ${G}30` }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="flex gap-2 items-center rounded-2xl px-3 py-2" style={{ background: "#f1f5f9" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask Bruno anything…"
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: TEXT }}
          />
          <button onClick={() => send()} disabled={!input.trim() || loading}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ background: input.trim() ? G : "#e2e8f0" }}>
            <Send className="w-3.5 h-3.5" style={{ color: input.trim() ? "#000" : MUTED2 }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Presentation ───────────────────────────────────────
export default function Present() {
  const [current, setCurrent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [showBruno, setShowBruno] = useState(false);

  useEffect(() => {
    let id;
    if (timerActive) id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1)), []);
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "f" || e.key === "F") document.documentElement.requestFullscreen?.();
      if (e.key === "b" || e.key === "B") setShowBruno(b => !b);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const totalProgress = (elapsed / TOTAL_SECONDS) * 100;

  return (
    <div className="fixed inset-0 flex flex-col select-none overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif", background: BG }}
      onClick={() => !showBruno && setShowNav(n => !n)}>

      {/* Slide */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0">
            {renderSlide(SLIDES[current].id)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="h-0.5" style={{ background: BORDER }}>
        <motion.div className="h-full" style={{ background: G }} animate={{ width: `${totalProgress}%` }} transition={{ duration: 0.5 }} />
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showNav && (
          <motion.div initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }}
            className="px-6 py-3 flex items-center gap-4"
            style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderTop: `1px solid ${BORDER}` }}
            onClick={e => e.stopPropagation()}>

            <div className="flex items-center gap-2">
              <button onClick={goPrev} disabled={current === 0}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-slate-100 transition-colors"
                style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono w-14 text-center" style={{ color: MUTED }}>{current + 1} / {SLIDES.length}</span>
              <button onClick={goNext} disabled={current === SLIDES.length - 1}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-slate-100 transition-colors"
                style={{ border: `1px solid ${BORDER}`, color: TEXT }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <span className="text-xs font-black" style={{ color: G }}>{SLIDES[current].label}</span>
              <span className="text-xs ml-2 font-mono" style={{ color: MUTED2 }}>~{SLIDES[current].duration}s</span>
            </div>

            <div className="flex gap-1 overflow-x-auto max-w-xs items-center">
              {SLIDES.map((sl, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="shrink-0 h-1.5 rounded-full transition-all"
                  style={{ width: i === current ? 20 : 6, background: i === current ? G : i < current ? "#94a3b8" : "#e2e8f0" }} />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold" style={{ color: elapsed > TOTAL_SECONDS * 0.9 ? "#ef4444" : TEXT }}>
                {formatTime(elapsed)}<span style={{ color: MUTED2 }}> / {formatTime(TOTAL_SECONDS)}</span>
              </span>
              <button onClick={() => setTimerActive(t => !t)}
                className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                style={timerActive ? { background: "#fee2e2", color: "#ef4444" } : { background: `${G}20`, color: G }}>
                {timerActive ? "⏸ Pause" : "▶ Start"}
              </button>
              <button onClick={() => { setElapsed(0); setTimerActive(false); }}
                className="text-xs font-bold px-2 py-1.5 rounded-full" style={{ background: "#f1f5f9", color: MUTED }}>↺</button>
            </div>

            {/* Bruno toggle */}
            <button onClick={() => setShowBruno(b => !b)}
              className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full transition-all"
              style={showBruno ? { background: G, color: "#000" } : { background: `${G}15`, color: G, border: `1px solid ${G}30` }}>
              🐂 Bruno
            </button>

            <button onClick={() => document.documentElement.requestFullscreen?.()}
              className="text-[10px] ml-1" style={{ color: MUTED2 }}>⛶ F</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bruno AI Panel */}
      <AnimatePresence>
        {showBruno && <BrunoPanel onClose={() => setShowBruno(false)} />}
      </AnimatePresence>
    </div>
  );
}