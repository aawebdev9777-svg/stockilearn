import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronDown, Zap, TrendingUp, BookOpen, Trophy, Star } from "lucide-react";

const G = "#00FF87";

// Screenshots
const SCREENSHOTS = {
  home: "https://media.base44.com/images/public/6a086c417a13783341515474/6eff15043_generated_image.png",
  learn: "https://media.base44.com/images/public/6a086c417a13783341515474/9622095c2_generated_image.png",
  trade: "https://media.base44.com/images/public/6a086c417a13783341515474/a3e3b542f_generated_image.png",
  lesson: "https://media.base44.com/images/public/6a086c417a13783341515474/1bcc2a0f1_generated_image.png",
};

// Ticker
const TICKERS = [
  { t: "AAPL", p: "$213.40", c: "+1.2%" }, { t: "NVDA", p: "$495.50", c: "+3.4%" },
  { t: "TSLA", p: "$248.10", c: "-1.8%" }, { t: "AMZN", p: "$195.30", c: "+0.9%" },
  { t: "MSFT", p: "$415.70", c: "+0.5%" }, { t: "GOOGL", p: "$175.20", c: "+2.1%" },
  { t: "META", p: "$520.80", c: "+1.7%" }, { t: "SPX", p: "5,248", c: "+0.6%" },
];

function TickerTape() {
  const doubled = [...TICKERS, ...TICKERS];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-sm py-2.5">
      <motion.div className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-mono shrink-0">
            <span className="font-black text-white">{item.t}</span>
            <span className="text-white/50">{item.p}</span>
            <span className={item.c.startsWith("+") ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{item.c}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function PhoneFrame({ src, className = "", style = {} }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: 230, height: 470, ...style }}>
      <div className="absolute inset-0 rounded-[38px] overflow-hidden"
        style={{ border: "5px solid rgba(255,255,255,0.12)", background: "#0d0f1e", boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-10" />
        <img src={src} alt="app screenshot" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
      </div>
      <div className="absolute right-[-6px] top-16 w-1 h-8 bg-white/20 rounded-full" />
      <div className="absolute left-[-6px] top-14 w-1 h-6 bg-white/20 rounded-full" />
      <div className="absolute left-[-6px] top-24 w-1 h-6 bg-white/20 rounded-full" />
    </div>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const features = [
    { icon: "📚", title: "Structured Lessons", desc: "25+ bite-sized lessons across 5 units. From 'What is a stock?' to advanced portfolio strategy. Each lesson takes 3–5 minutes.", screen: SCREENSHOTS.lesson, color: "#3b82f6" },
    { icon: "🌱", title: "Skill Tree Curriculum", desc: "A Duolingo-style learning path. Complete each lesson to unlock the next. Boss battle checkpoint exams guard every unit.", screen: SCREENSHOTS.learn, color: G },
    { icon: "📈", title: "Paper Trading", desc: "£10,000 virtual portfolio. 50+ real stocks. Buy, sell, track performance, and build real investing instincts — completely risk-free.", screen: SCREENSHOTS.trade, color: "#a855f7" },
    { icon: "🏠", title: "Daily Dashboard", desc: "Streak tracking, XP progress rings, daily missions, and live market data — all in one beautiful home screen that keeps you coming back.", screen: SCREENSHOTS.home, color: "#f97316" },
  ];

  return (
    <div className="min-h-screen bg-[#080d1a] text-white overflow-x-hidden font-inter">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080d1a]/90 backdrop-blur-md border-b border-white/10" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-black">V<span style={{ color: G }}>stock</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <Link to="/present" target="_blank" className="hover:text-white transition-colors">Pitch Deck</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-bold text-white/70 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
              Sign In
            </Link>
            <Link to="/login?tab=signup"
              className="text-sm font-black px-4 py-2 rounded-xl transition-all hover:opacity-90 hover:scale-105"
              style={{ background: G, color: "#080d1a" }}>
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* BG effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, ${G}, transparent 70%)` }} />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${G}0a 1px,transparent 1px),linear-gradient(90deg,${G}0a 1px,transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 w-full">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full border mb-6"
              style={{ color: G, borderColor: `${G}40`, background: `${G}10` }}>
              🏆 The Duolingo of Investing
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-black leading-none mb-6"
              style={{ fontSize: "clamp(44px, 7vw, 84px)", letterSpacing: "-3px" }}>
              Learn to invest.<br />
              <span style={{ color: G }}>Actually.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-lg text-white/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Bite-sized lessons, paper trading, AI tutor, streaks & leagues.
              Turn financial confusion into real confidence — in minutes a day.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base transition-all hover:scale-105"
                style={{ background: G, color: "#080d1a", boxShadow: `0 0 40px ${G}50` }}>
                Start For Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/present" target="_blank"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                <Play className="w-4 h-4" style={{ color: G }} /> View Pitch Deck
              </Link>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-xs text-white/30 mt-4">
              Free forever · No credit card needed
            </motion.p>

            {/* Mini stats */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="flex gap-6 mt-8 justify-center lg:justify-start">
              {[["25+", "Lessons"], ["50+", "Stocks"], ["£10K", "Paper funds"], ["5", "Units"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black" style={{ color: G }}>{v}</p>
                  <p className="text-xs text-white/40">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — phone cluster */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 70 }}
            className="relative shrink-0 hidden lg:block"
            style={{ width: 520, height: 530 }}
          >
            {/* Main center phone */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{ left: "50%", top: 20, transform: "translateX(-50%)" }}
            >
              <PhoneFrame src={SCREENSHOTS.home} style={{ width: 240, height: 490, filter: "drop-shadow(0 30px 60px rgba(0,255,135,0.2))" }} />
            </motion.div>
            {/* Left phone */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute"
              style={{ left: 0, top: 60 }}
            >
              <PhoneFrame src={SCREENSHOTS.learn} style={{ width: 200, height: 410, opacity: 0.85, transform: "rotate(-6deg)" }} />
            </motion.div>
            {/* Right phone */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute"
              style={{ right: 0, top: 80 }}
            >
              <PhoneFrame src={SCREENSHOTS.trade} style={{ width: 200, height: 410, opacity: 0.85, transform: "rotate(6deg)" }} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* Ticker */}
      <TickerTape />

      {/* ── FEATURES (interactive) ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: G }}>Everything You Need</p>
            <h2 className="text-4xl font-black leading-tight">Built to make you<br />a better investor</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Feature list */}
            <div className="flex-1 space-y-3">
              {features.map((f, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveFeature(i)}
                  className="w-full text-left rounded-2xl p-5 border transition-all"
                  style={{
                    background: activeFeature === i ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                    borderColor: activeFeature === i ? `${f.color}50` : "rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${f.color}20`, border: `1px solid ${f.color}30` }}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-base text-white mb-1">{f.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Phone preview */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="shrink-0 hidden lg:block"
            >
              <PhoneFrame
                src={features[activeFeature].screen}
                style={{ width: 260, height: 530, filter: `drop-shadow(0 30px 60px ${features[activeFeature].color}30)` }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: G }}>How It Works</p>
            <h2 className="text-4xl font-black">Four steps to financial confidence</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { n: "01", icon: "🐣", title: "Onboard in 60 seconds", desc: "Set your goal, experience level, and daily XP target. Personalised from minute one." },
              { n: "02", icon: "📚", title: "Learn through interactive lessons", desc: "Swipe through slides, answer quizzes, earn XP. Like a textbook that actually works." },
              { n: "03", icon: "📈", title: "Apply in the paper market", desc: "Put your knowledge to work with real stocks and zero real money. Build instincts safely." },
              { n: "04", icon: "🏆", title: "Compete and level up", desc: "Weekly leagues, daily missions, and badges keep you motivated and accountable." },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="text-5xl font-black shrink-0 w-16 text-right leading-none" style={{ color: `${G}30` }}>{step.n}</div>
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

      {/* ── Social proof ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { quote: "Finally understand what my dad's been talking about for years. P/E ratios, dividends — I actually get it now.", name: "Sophie M.", role: "University Student", stars: 5 },
            { quote: "Did my first paper trade after lesson 5. Terrifying and exciting. The gamification keeps me coming back every day.", name: "James K.", role: "Graphic Designer", stars: 5 },
            { quote: "Bruno the Bull explained dollar-cost averaging better than any YouTube video I've watched. Brilliant app.", name: "Priya S.", role: "Marketing Manager", stars: 5 },
          ].map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="rounded-3xl p-6 border border-white/10 bg-white/5">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">"{r.quote}"</p>
              <div>
                <p className="font-bold text-sm text-white">{r.name}</p>
                <p className="text-xs text-white/40">{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
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
                style={{ background: G, color: "#080d1a", boxShadow: `0 0 50px ${G}60` }}>
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

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-black">V<span style={{ color: G }}>stock</span></span>
          </div>
          <p className="text-xs text-white/30">© 2026 Vstock · The Duolingo of Investing · vstock.co.uk</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link to="/login" className="hover:text-white/70 transition-colors">Sign In</Link>
            <Link to="/present" target="_blank" className="hover:text-white/70 transition-colors">Pitch Deck</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}