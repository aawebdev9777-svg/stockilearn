import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const glass = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const glassStrong = {
  background: "rgba(255,255,255,0.70)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};

function LessonNode({ emoji, label, status, delay }) {
  const styles = {
    done:   "bg-[#58CC02] border-[#46A302] shadow-[0_4px_0_#46A302]",
    active: "bg-[#58CC02] border-[#46A302] shadow-[0_4px_0_#46A302] ring-4 ring-[#58CC02]/30",
    locked: "bg-white/50 border-white/30 shadow-[0_4px_0_rgba(0,0,0,0.06)]",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-1"
    >
      <div className={`w-14 h-14 rounded-full border-b-4 flex items-center justify-center text-xl ${styles[status]}`}>
        {status === "locked" ? "🔒" : emoji}
      </div>
      <p className={`text-[10px] font-bold ${status === "locked" ? "text-white/40" : "text-white/80"}`}>{label}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
      style={glass}
      className="rounded-3xl p-6 border border-white/50 cursor-default"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-black text-gray-800 text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="min-h-screen text-gray-800 overflow-x-hidden font-inter"
      style={{
        background: "linear-gradient(135deg, #dce8ee 0%, #e8ddd8 30%, #d8e4dc 60%, #e0dbe8 100%)",
        backgroundAttachment: "fixed",
      }}
    >

      {/* ── Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/40" : ""}`}
        style={scrolled ? glassStrong : { background: "transparent" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-white/40 hidden sm:block">About</Link>
            <Link to="/founders" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-white/40 hidden sm:block">Founders</Link>
            <Link to="/contact" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-white/40 hidden sm:block">Contact</Link>
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-white/40">Sign In</Link>
            <Link
              to="/login?tab=signup"
              className="text-sm font-black px-5 py-2.5 rounded-2xl text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all active:border-b-0"
              style={{ background: "#58CC02" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 border border-[#58CC02]/40 text-[#46A302] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(88,204,2,0.1)", backdropFilter: "blur(8px)" }}
            >
              🏆 #1 investing app for teens
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-black leading-tight text-gray-900 mb-5"
              style={{ fontSize: "clamp(36px, 7vw, 68px)" }}
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
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all shadow-lg"
                style={{ background: "#58CC02" }}
              >
                Start For Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base text-gray-600 border border-white/60 hover:bg-white/60 transition-colors"
                style={glass}
              >
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

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            {/* Mascot bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="relative rounded-2xl px-4 py-3 border border-white/50 max-w-[200px]"
              style={glassStrong}
            >
              <p className="text-sm font-bold text-gray-800">Let's learn about stocks! 📈</p>
              <div className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 border-b border-r border-white/40" style={{ background: "rgba(255,255,255,0.70)" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-[90px] select-none leading-none text-center"
            >
              🐂
            </motion.div>

            {/* Gamification badges */}
            <div className="flex gap-3">
              {[
                { icon: "🔥", value: "14", label: "day streak", border: "border-orange-300/50", bg: "rgba(255,237,213,0.65)" },
                { icon: "⚡", value: "350", label: "XP today", border: "border-yellow-300/50", bg: "rgba(254,249,195,0.65)" },
              ].map(({ icon, value, label, border, bg }) => (
                <div key={label} className={`flex items-center gap-1.5 border-b-4 ${border} rounded-2xl px-4 py-2`} style={{ background: bg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-2xl font-black text-gray-800 leading-none">{value}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini lesson path */}
            <div className="rounded-3xl p-5 border border-white/50 w-72" style={glass}>
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

      {/* ── Stats bar ── */}
      <section className="py-8 border-y border-white/40" style={glass}>
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
              <p className="text-sm text-gray-500 font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">Why StockiLearn</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Everything you need to<br />become a confident investor
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon="📚" title="Structured Curriculum" desc="25+ bite-sized lessons across 5 units. Start from zero, master the fundamentals." delay={0} />
            <FeatureCard icon="📈" title="Paper Trading" desc="£10,000 virtual fund. 50+ real stocks. Build real intuition with zero risk." delay={0.08} />
            <FeatureCard icon="🤖" title="Bruno the AI Tutor" desc="Ask anything in plain English. Bruno explains concepts and analyses your portfolio instantly." delay={0.16} />
            <FeatureCard icon="🔥" title="Daily Streaks" desc="Build the habit. Miss a day and lose your streak. Use gems to freeze it." delay={0.24} />
            <FeatureCard icon="🏆" title="Leagues & Leaderboards" desc="Compete in 7 tiers. Top 5 promote each week. Bottom 5 get demoted." delay={0.32} />
            <FeatureCard icon="⚡" title="XP & 50 Levels" desc="From Market Newbie to Market Legend. Earn XP for lessons, quizzes, and smart trades." delay={0.40} />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-6">
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
              { n: "1", icon: "🐣", title: "Set your goal", desc: "Tell us your experience level. Your personalised curriculum is ready in 60 seconds." },
              { n: "2", icon: "📚", title: "Complete daily lessons", desc: "Short, fun lessons with quizzes. Earn XP, protect your streak, unlock the next unit." },
              { n: "3", icon: "📈", title: "Trade with virtual money", desc: "Apply what you learned in a real-feeling paper market. No risk — all the fun." },
              { n: "4", icon: "🏆", title: "Climb the leagues", desc: "Compete weekly. Promote or demote. The same dopamine loop as Duolingo — but for money." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 28px rgba(0,0,0,0.08)" }}
                style={glass}
                className="rounded-3xl p-6 border border-white/50 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center font-black text-gray-700 shrink-0 text-lg" style={glassStrong}>
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
      <section className="py-20 px-6">
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
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all shadow-md"
              style={{ background: "#58CC02" }}
            >
              Try it free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 grid grid-cols-2 gap-3 w-72"
          >
            {[
              { icon: "🔥", label: "14-day streak", sub: "Keep going!" },
              { icon: "⚡", label: "350 XP", sub: "Level 8" },
              { icon: "🏆", label: "Gold League", sub: "Rank #3 this week" },
              { icon: "💎", label: "120 Gems", sub: "Streak freeze ready" },
              { icon: "❤️", label: "5 Hearts", sub: "Full health" },
              { icon: "🥇", label: "3 Badges", sub: "Collected" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                style={glass}
                className="rounded-2xl p-3 border border-white/50"
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
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 border border-white/50"
            style={glassStrong}
          >
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              Your streak starts today.
            </h2>
            <p className="text-gray-500 mb-8 text-lg font-medium">
              Join thousands of teens learning to invest the smart way.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-xl text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all shadow-lg"
              style={{ background: "#58CC02" }}
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-400 text-sm mt-5">Free forever · No credit card needed</p>
          </motion.div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">The Team</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Meet the Founders</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { emoji: "🚀", name: "Ahmetzhan Ali", title: "CEO & Co-Founder", bio: "Leads StockiLearn's vision and product strategy — turning the mission of making investing accessible into a gamified, habit-forming experience." },
              { emoji: "⚙️", name: "Sander Rosingholm", title: "COO & Co-Founder", bio: "Oversees operations and partnerships — ensuring StockiLearn runs smoothly as it scales to reach more learners across the UK." },
            ].map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={glass}
                className="rounded-3xl p-6 border border-white/50 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/60 border border-white/50 flex items-center justify-center text-3xl mb-4">
                  {f.emoji}
                </div>
                <h3 className="text-lg font-black text-gray-900">{f.name}</h3>
                <p className="text-sm font-bold text-[#58CC02] mb-2">{f.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{f.bio}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/founders" className="inline-flex items-center gap-2 text-sm font-black text-[#46A302] hover:text-[#58CC02] transition-colors">
              Learn more about the founders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/40 py-8 px-6" style={glass}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </div>
          <p className="text-xs text-gray-400">© 2026 StockiLearn · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <Link to="/founders" className="hover:text-gray-700 transition-colors">Founders</Link>
            <Link to="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
            <Link to="/login" className="hover:text-gray-700 transition-colors">Sign In</Link>
          </div>
        </div>
        <div className="mt-6 text-center space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Created by</p>
          <p className="text-xs font-bold text-gray-600">Ahmetzhan Ali <span className="text-gray-400 font-medium">· CEO &amp; Co-Founder</span></p>
          <p className="text-xs font-bold text-gray-600">Sander Rosingholm <span className="text-gray-400 font-medium">· COO &amp; Co-Founder</span></p>
        </div>
      </footer>
    </div>
  );
}