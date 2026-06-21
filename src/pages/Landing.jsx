import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Zap, Star, Trophy, BookOpen, TrendingUp } from "lucide-react";

// ── Duolingo-style mascot card ────────────────────────────────
function MascotBubble({ text, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="relative bg-white rounded-2xl px-4 py-3 shadow-lg border-b-4 border-gray-200 max-w-[200px]"
    >
      <p className="text-sm font-bold text-gray-800">{text}</p>
      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b-4 border-r-4 border-gray-200 rotate-45" />
    </motion.div>
  );
}

// ── Streak badge ─────────────────────────────────────────────
function StreakBadge({ count }) {
  return (
    <div className="flex items-center gap-1.5 bg-orange-100 border-b-4 border-orange-300 rounded-2xl px-4 py-2">
      <span className="text-2xl">🔥</span>
      <div>
        <p className="text-2xl font-black text-orange-500 leading-none">{count}</p>
        <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wide">day streak</p>
      </div>
    </div>
  );
}

// ── XP badge ─────────────────────────────────────────────────
function XpBadge({ xp }) {
  return (
    <div className="flex items-center gap-1.5 bg-yellow-100 border-b-4 border-yellow-300 rounded-2xl px-4 py-2">
      <span className="text-2xl">⚡</span>
      <div>
        <p className="text-2xl font-black text-yellow-600 leading-none">{xp}</p>
        <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-wide">XP today</p>
      </div>
    </div>
  );
}

// ── Lesson node (Duolingo path style) ────────────────────────
function LessonNode({ emoji, label, status, delay }) {
  const styles = {
    done:   { bg: "bg-green-400 border-green-600", text: "text-white", shadow: "shadow-[0_4px_0_#16a34a]" },
    active: { bg: "bg-[#58CC02] border-[#46A302]", text: "text-white", shadow: "shadow-[0_4px_0_#46A302]" },
    locked: { bg: "bg-gray-200 border-gray-300", text: "text-gray-400", shadow: "shadow-[0_4px_0_#d1d5db]" },
  };
  const s = styles[status];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-1"
    >
      <div className={`w-16 h-16 rounded-full border-b-4 flex items-center justify-center text-2xl ${s.bg} ${s.shadow} ${status === "active" ? "ring-4 ring-[#58CC02]/30" : ""}`}>
        {status === "locked" ? "🔒" : emoji}
      </div>
      <p className={`text-[10px] font-bold ${status === "locked" ? "text-gray-400" : "text-gray-700"}`}>{label}</p>
    </motion.div>
  );
}

// ── Feature card (Duolingo card style) ───────────────────────
function FeatureCard({ icon, title, desc, color, bg, border, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-2xl p-6 border-b-4 ${bg} ${border}`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-black text-gray-800 text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden font-inter">

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? "border-b-2 border-gray-100 shadow-sm" : ""}`}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-black text-gray-800">V<span className="text-[#58CC02]">stock</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login"
              className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2 rounded-xl hover:bg-gray-100">
              Sign In
            </Link>
            <Link to="/login?tab=signup"
              className="text-sm font-black px-5 py-2.5 rounded-xl bg-[#58CC02] text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all active:border-b-0 active:mt-1">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#58CC02]/10 text-[#46A302] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6"
            >
              🏆 #1 investing app for teens
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-black leading-tight text-gray-900 mb-5"
              style={{ fontSize: "clamp(40px, 7vw, 72px)" }}
            >
              Learn investing.<br />
              <span className="text-[#58CC02]">Level up your life.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Bite-sized lessons, paper trading, and an AI tutor — 
              all with streaks, XP, and leagues to keep you coming back.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white bg-[#58CC02] border-b-4 border-[#46A302] hover:brightness-105 transition-all active:border-b-0 shadow-lg"
              >
                Start For Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base text-gray-600 border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                I have an account
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-gray-400 mt-4"
            >
              Free forever · No credit card · Takes 60 seconds
            </motion.p>
          </div>

          {/* Right — Duolingo-style character panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            {/* Mascot */}
            <div className="relative">
              <MascotBubble text="Let's learn about stocks! 📈" delay={0.6} />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-[100px] mt-2 select-none leading-none text-center"
              >
                🐂
              </motion.div>
            </div>

            {/* Gamification badges */}
            <div className="flex gap-3">
              <StreakBadge count={14} />
              <XpBadge xp={350} />
            </div>

            {/* Mini lesson path */}
            <div className="bg-gray-50 rounded-3xl p-5 border-2 border-gray-100 w-72">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Unit 1 · The Basics</p>
              <div className="flex justify-around items-end">
                <LessonNode emoji="📖" label="What's a stock?" status="done" delay={0.7} />
                <LessonNode emoji="💹" label="The market" status="done" delay={0.8} />
                <LessonNode emoji="🐂" label="Bulls & Bears" status="active" delay={0.9} />
                <LessonNode emoji="📊" label="P/E ratios" status="locked" delay={1.0} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <section className="py-8 bg-gray-50 border-y-2 border-gray-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "25+", label: "Lessons", icon: "📚" },
            { value: "50+", label: "Stocks to trade", icon: "📈" },
            { value: "£10K", label: "Virtual money", icon: "💰" },
            { value: "7", label: "League tiers", icon: "🏆" },
          ].map(({ value, label, icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-3xl font-black text-gray-900">{value}</p>
              <p className="text-sm text-gray-400 font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">Why Vstock</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Everything you need to<br />become a confident investor
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon="📚" title="Structured Curriculum" desc="25+ bite-sized lessons across 5 units. Start from zero, master the fundamentals." color="#3b82f6" bg="bg-blue-50" border="border-blue-200" delay={0} />
            <FeatureCard icon="📈" title="Paper Trading" desc="£10,000 virtual fund. 50+ real stocks. Build real intuition with zero risk." color="#58CC02" bg="bg-green-50" border="border-green-200" delay={0.08} />
            <FeatureCard icon="🤖" title="Bruno the AI Tutor" desc="Ask anything in plain English. Bruno explains concepts and analyses your portfolio instantly." color="#a855f7" bg="bg-purple-50" border="border-purple-200" delay={0.16} />
            <FeatureCard icon="🔥" title="Daily Streaks" desc="Build the habit. Miss a day and lose your streak — just like Duolingo. Use gems to freeze it." color="#f97316" bg="bg-orange-50" border="border-orange-200" delay={0.24} />
            <FeatureCard icon="🏆" title="Leagues & Leaderboards" desc="Compete in 7 tiers. Top 5 promote each week. Bottom 5 get demoted. Stakes are real." color="#eab308" bg="bg-yellow-50" border="border-yellow-200" delay={0.32} />
            <FeatureCard icon="⚡" title="XP & 50 Levels" desc="From Market Newbie to Market Legend. Earn XP for lessons, quizzes, and smart trades." color="#06b6d4" bg="bg-cyan-50" border="border-cyan-200" delay={0.40} />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">How It Works</p>
            <h2 className="text-4xl font-black text-gray-900">Start learning in 60 seconds</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { n: "1", icon: "🐣", title: "Set your goal", desc: "Tell us your experience level. Your personalised curriculum is ready in 60 seconds.", bg: "bg-green-50", border: "border-green-200" },
              { n: "2", icon: "📚", title: "Complete daily lessons", desc: "Short, fun lessons with quizzes. Earn XP, protect your streak, unlock the next unit.", bg: "bg-blue-50", border: "border-blue-200" },
              { n: "3", icon: "📈", title: "Trade with virtual money", desc: "Apply what you learned in a real-feeling paper market. No risk — all the fun.", bg: "bg-yellow-50", border: "border-yellow-200" },
              { n: "4", icon: "🏆", title: "Climb the leagues", desc: "Compete weekly. Promote or demote. The same dopamine loop as Duolingo — but for money.", bg: "bg-purple-50", border: "border-purple-200" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border-b-4 ${step.bg} ${step.border} flex gap-4 items-start`}
              >
                <div className="w-10 h-10 rounded-full bg-white border-b-4 border-gray-200 flex items-center justify-center font-black text-gray-700 shrink-0 text-lg shadow-sm">
                  {step.n}
                </div>
                <div>
                  <div className="text-2xl mb-1">{step.icon}</div>
                  <h3 className="font-black text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gamification showcase ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-3">Gamified Learning</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-5">
              The same psychology<br />that built Duolingo.<br />
              <span className="text-[#58CC02]">For investing.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Streaks keep you coming back. Leagues create competition. XP rewards progress. 
              It's the most powerful habit loop in edtech — now applied to financial literacy.
            </p>
            <Link to="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white bg-[#58CC02] border-b-4 border-[#46A302] hover:brightness-105 transition-all shadow-md"
            >
              Try it free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Gamification cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 grid grid-cols-2 gap-3 w-72"
          >
            {[
              { icon: "🔥", label: "14-day streak", sub: "Keep going!", bg: "bg-orange-50 border-orange-200" },
              { icon: "⚡", label: "350 XP", sub: "Level 8", bg: "bg-yellow-50 border-yellow-200" },
              { icon: "🏆", label: "Gold League", sub: "Rank #3 this week", bg: "bg-amber-50 border-amber-200" },
              { icon: "💎", label: "120 Gems", sub: "Streak freeze ready", bg: "bg-cyan-50 border-cyan-200" },
              { icon: "❤️", label: "5 Hearts", sub: "Full health", bg: "bg-red-50 border-red-200" },
              { icon: "🥇", label: "3 Badges", sub: "Collected", bg: "bg-green-50 border-green-200" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl p-3 border-b-4 ${item.bg}`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-sm font-black text-gray-800">{item.label}</p>
                <p className="text-[10px] text-gray-400 font-medium">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-[#58CC02]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-5xl font-black text-white leading-tight mb-4">
              Your streak starts today.
            </h2>
            <p className="text-white/80 mb-10 text-lg font-medium">
              Join thousands of teens learning to invest the smart way.
            </p>
            <Link to="/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-xl text-[#58CC02] bg-white border-b-4 border-gray-200 hover:brightness-95 transition-all shadow-lg"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 text-sm mt-5">Free forever · No credit card needed</p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-gray-100 py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-black text-gray-800">V<span className="text-[#58CC02]">stock</span></span>
          </div>
          <p className="text-xs text-gray-400">© 2026 Vstock · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/login" className="hover:text-gray-700 transition-colors">Sign In</Link>
            <Link to="/present" target="_blank" className="hover:text-gray-700 transition-colors">Pitch Deck</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}