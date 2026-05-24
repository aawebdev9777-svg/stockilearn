import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

const G = "#00FF87";

// ── Ticker tape ──────────────────────────────────────────────
const TICKERS = [
  { t: "AAPL", p: "$213.40", c: "+1.2%" }, { t: "NVDA", p: "$495.50", c: "+3.4%" },
  { t: "TSLA", p: "$248.10", c: "-1.8%" }, { t: "AMZN", p: "$195.30", c: "+0.9%" },
  { t: "MSFT", p: "$415.70", c: "+0.5%" }, { t: "GOOGL", p: "$175.20", c: "+2.1%" },
  { t: "META", p: "$520.80", c: "+1.7%" }, { t: "SPX",  p: "5,248",   c: "+0.6%" },
];

function TickerTape() {
  const doubled = [...TICKERS, ...TICKERS];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-sm py-2">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-mono shrink-0">
            <span className="font-black text-white">{item.t}</span>
            <span className="text-white/60">{item.p}</span>
            <span className={item.c.startsWith("+") ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
              {item.c}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Phone mockup ─────────────────────────────────────────────
function PhoneMock() {
  return (
    <div className="relative" style={{ width: 260, height: 530 }}>
      <div className="absolute inset-0 rounded-[42px] overflow-hidden"
        style={{ border: "5px solid rgba(255,255,255,0.15)", background: "#0d0f1e", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" />
        <div className="pt-6 px-3 py-2 space-y-2 text-white h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-[9px] text-white/40">Good morning 👋</p>
              <p className="text-sm font-black">Alex</p>
            </div>
            <div className="flex items-center gap-1 bg-orange-500/20 rounded-full px-2 py-0.5">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-black text-orange-400">14</span>
            </div>
          </div>
          {/* XP ring */}
          <div className="bg-white/5 rounded-2xl p-2.5 flex items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
              <circle cx="22" cy="22" r="18" fill="none" stroke={G} strokeWidth="4"
                strokeDasharray="113" strokeDashoffset="40" strokeLinecap="round" transform="rotate(-90 22 22)"/>
              <text x="22" y="26" textAnchor="middle" fontSize="9" fill="white" fontWeight="900">65%</text>
            </svg>
            <div>
              <p className="text-[9px] text-white/40">Daily Goal</p>
              <p className="text-xs font-black">13 / 20 XP</p>
            </div>
          </div>
          {/* Continue card */}
          <div className="rounded-2xl p-2.5" style={{ background: `${G}18`, border: `1px solid ${G}30` }}>
            <p className="text-[8px] font-black" style={{ color: G }}>CONTINUE</p>
            <p className="text-[11px] font-black mt-0.5">What Is a P/E Ratio?</p>
            <div className="w-full bg-white/10 rounded-full h-1 mt-1.5">
              <div className="h-1 rounded-full w-2/3" style={{ background: G }} />
            </div>
          </div>
          {/* Missions */}
          <div className="space-y-1">
            {[{ e: "⚡", t: "Complete a lesson", d: "15 XP", done: true },
              { e: "📈", t: "Make a trade", d: "10 XP", done: false }].map((m, i) => (
              <div key={i} className={`flex items-center gap-2 rounded-xl p-2 ${m.done ? "bg-[#00FF87]/10" : "bg-white/5"}`}>
                <span className="text-sm">{m.e}</span>
                <span className="text-[9px] flex-1 font-medium">{m.t}</span>
                <span className={`text-[8px] font-bold ${m.done ? "text-green-400" : "text-white/30"}`}>{m.d}</span>
              </div>
            ))}
          </div>
          {/* Market indices */}
          <div className="flex gap-1.5">
            {[["SPX", "5,248", "+0.6%", true], ["NDX", "18,290", "+1.1%", true], ["FTSE", "8,312", "-0.2%", false]].map(([t, v, c, up]) => (
              <div key={t} className="flex-1 bg-white/5 rounded-xl p-1.5">
                <p className="text-[7px] text-white/30">{t}</p>
                <p className="text-[9px] font-black">{v}</p>
                <p className={`text-[7px] font-bold ${up ? "text-green-400" : "text-red-400"}`}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute right-[-7px] top-20 w-1.5 h-10 bg-white/20 rounded-full" />
      <div className="absolute left-[-7px] top-16 w-1.5 h-8 bg-white/20 rounded-full" />
      <div className="absolute left-[-7px] top-28 w-1.5 h-8 bg-white/20 rounded-full" />
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────
function FeatureCard({ icon, title, desc, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-colors"
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
        {icon}
      </div>
      <h3 className="font-black text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-4xl font-black" style={{ color: G }}>{value}</p>
      <p className="text-sm text-white/50 mt-1">{label}</p>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#080d1a] text-white overflow-x-hidden font-inter">

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080d1a]/90 backdrop-blur-md border-b border-white/10" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-black">V<span style={{ color: G }}>stock</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/present" target="_blank"
              className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/5">
              <Play className="w-3.5 h-3.5" /> View Pitch
            </Link>
            <Link to="/login"
              className="text-sm font-bold text-white/70 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
              Sign In
            </Link>
            <Link to="/login?tab=signup"
              className="text-sm font-black px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: G, color: "#080d1a" }}>
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${G}, transparent 70%)` }} />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${G}10 1px,transparent 1px),linear-gradient(90deg,${G}10 1px,transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full border mb-6"
              style={{ color: G, borderColor: `${G}40`, background: `${G}10` }}>
              📈 Investing Education for Everyone
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-black leading-none mb-6"
              style={{ fontSize: "clamp(48px, 8vw, 88px)", letterSpacing: "-3px" }}>
              Learn to invest.<br />
              <span style={{ color: G }}>Actually.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-lg text-white/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Bite-sized lessons, a paper trading portfolio, and an AI tutor.
              Turn financial confusion into real confidence — in minutes a day.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base transition-all hover:scale-105"
                style={{ background: G, color: "#080d1a", boxShadow: `0 0 30px ${G}50` }}>
                Start For Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/present" target="_blank"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                <Play className="w-4 h-4" style={{ color: G }} /> Watch Pitch Deck
              </Link>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-xs text-white/30 mt-4">
              Free forever · No credit card needed
            </motion.p>
          </div>

          {/* Right phone */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
            className="shrink-0 hidden lg:block"
          >
            <PhoneMock />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* ── Ticker tape ── */}
      <TickerTape />

      {/* ── Stats ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatPill value="25+" label="Interactive lessons" />
          <StatPill value="50+" label="Stocks to trade" />
          <StatPill value="£10K" label="Paper trading fund" />
          <StatPill value="5" label="Learning units" />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: G }}>Everything You Need</p>
            <h2 className="text-4xl font-black leading-tight">Built to make you<br />a better investor</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon="📚" title="Structured Curriculum" desc="25+ bite-sized lessons across 5 units. From 'What is a stock?' to advanced portfolio strategy — built for beginners." color="#3b82f6" delay={0} />
            <FeatureCard icon="📈" title="Paper Trading Simulator" desc="£10,000 virtual money. 50+ real stocks. Market, limit, and stop orders. Build real intuition with zero financial risk." color={G} delay={0.08} />
            <FeatureCard icon="🤖" title="Bruno the AI Tutor" desc="GPT-4 powered tutor on every screen. Explains any concept in plain English, analyses your portfolio, and gives personalised tips." color="#a855f7" delay={0.16} />
            <FeatureCard icon="📊" title="Real Market Data" desc="Live stock prices, charts across 6 time ranges, P/E ratios, EPS, dividends, beta — the real metrics investors use." color="#06b6d4" delay={0.24} />
            <FeatureCard icon="🎯" title="Interactive Quizzes" desc="Multiple choice, true/false, and fill-in-the-blank questions with instant feedback after every lesson." color="#f97316" delay={0.32} />
            <FeatureCard icon="🔍" title="Portfolio Analytics" desc="Track your holdings, P&L, sector allocation, and portfolio health score — just like a real brokerage dashboard." color="#ec4899" delay={0.40} />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: G }}>How It Works</p>
            <h2 className="text-4xl font-black">Four steps to financial confidence</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { n: "01", icon: "🐣", title: "Onboard in 60 seconds", desc: "Tell us your experience level and learning goal. Your personalised curriculum is ready immediately." },
              { n: "02", icon: "📚", title: "Learn through interactive lessons", desc: "Swipe through slides, answer quizzes, and get instant feedback. Like a textbook that actually works." },
              { n: "03", icon: "📈", title: "Apply in the paper market", desc: "Put your knowledge to work immediately. Buy and sell real stocks with £10,000 virtual capital — zero risk." },
              { n: "04", icon: "🤖", title: "Ask Bruno anything", desc: "Stuck on a concept? Ask Bruno the AI Bull. He'll explain it in plain English and analyse your portfolio on the spot." },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="text-5xl font-black shrink-0 w-16 text-right leading-none"
                  style={{ color: `${G}30` }}>{step.n}</div>
                <span className="text-3xl shrink-0">{step.icon}</span>
                <div>
                  <h3 className="font-black text-lg text-white">{step.title}</h3>
                  <p className="text-sm text-white/50 mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, ${G}, transparent 70%)` }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: G }}>Ready?</p>
            <h2 className="text-5xl font-black leading-tight mb-4">Your financial journey<br />starts today</h2>
            <p className="text-white/50 mb-10 text-lg">Join thousands learning to invest the smart way.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login"
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105"
                style={{ background: G, color: "#080d1a", boxShadow: `0 0 40px ${G}60` }}>
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/present" target="_blank"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                <Play className="w-4 h-4" style={{ color: G }} /> Investor Pitch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-black">V<span style={{ color: G }}>stock</span></span>
          </div>
          <p className="text-xs text-white/30">© 2026 Vstock · The Duolingo of Investing</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link to="/login" className="hover:text-white/70 transition-colors">Sign In</Link>
            <Link to="/present" target="_blank" className="hover:text-white/70 transition-colors">Pitch Deck</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}