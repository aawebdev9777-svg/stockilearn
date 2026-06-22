import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  ChartUp, Trophy, Bull, Flame, Bolt, Book, Bars, Lock,
  Books, Money, Robot, Gem, Heart, Medal, Chick, Rocket, Gear,
} from "@/components/landing/AnimatedIcons";
import CountUp from "@/components/landing/CountUp";
import FloatingBackground from "@/components/landing/FloatingBackground";
import ScrollProgress from "@/components/landing/ScrollProgress";

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

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function SectionLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <div className="w-8 h-0.5 bg-[#58CC02]/30 rounded-full" />
      <p className="text-xs font-black tracking-widest uppercase text-[#58CC02]">{children}</p>
      <div className="w-8 h-0.5 bg-[#58CC02]/30 rounded-full" />
    </div>
  );
}

function LessonNode({ icon, label, status, delay }) {
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
      <div className={`w-14 h-14 rounded-full border-b-4 flex items-center justify-center ${styles[status]}`}>
        {status === "locked" ? <Lock size={22} /> : icon}
      </div>
      <p className={`text-[10px] font-bold ${status === "locked" ? "text-white/40" : "text-white/80"}`}>{label}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6 }}
      style={glass}
      className="rounded-3xl p-6 border border-white/50 relative overflow-hidden group transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: color.bg }}>
        {icon}
      </div>
      <h3 className="font-black text-gray-800 text-base mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `linear-gradient(135deg, ${color.bg}, transparent 60%)` }} />
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
      className="min-h-screen text-gray-800 overflow-x-hidden font-inter relative"
      style={{
        background: "linear-gradient(135deg, #dce8ee 0%, #e8ddd8 30%, #d8e4dc 60%, #e0dbe8 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <ScrollProgress />
      <FloatingBackground />

      <div className="relative" style={{ zIndex: 1 }}>

      {/* ── Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/40 shadow-sm" : ""}`}
        style={scrolled ? glassStrong : { background: "transparent" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChartUp size={28} />
            <span className="text-xl font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-white/40 hidden sm:block">About</Link>
            <Link to="/founders" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-white/40 hidden sm:block">Founders</Link>
            <Link to="/contact" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-white/40 hidden sm:block">Contact</Link>
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-white/40">Sign In</Link>
            <Link
              to="/login?tab=signup"
              className="text-sm font-black px-5 py-2.5 rounded-2xl text-white border-b-4 border-[#46A302] hover:border-b-2 hover:translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg, #58CC02, #46A302)" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Left copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 border border-[#58CC02]/40 text-[#46A302] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6 relative"
              style={{ background: "rgba(88,204,2,0.1)", backdropFilter: "blur(8px)" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 20px rgba(88,204,2,0.3)" }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Trophy size={16} className="relative z-10" />
              <span className="relative z-10">#1 investing app for teens</span>
            </motion.div>

            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="font-black leading-tight text-gray-900 mb-5"
              style={{ fontSize: "clamp(36px, 7vw, 68px)" }}
            >
              <motion.span variants={lineVariants} className="block">Learn investing.</motion.span>
              <motion.span variants={lineVariants} className="block" style={{ background: "linear-gradient(135deg, #58CC02 0%, #4A90D9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Level up your life.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-500 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Bite-sized lessons, paper trading, and an AI tutor —
              all with streaks, XP, and leagues to keep you coming back.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white border-b-4 border-[#46A302] hover:border-b-2 hover:translate-y-0.5 transition-all shadow-lg"
                style={{ background: "linear-gradient(135deg, #58CC02, #46A302)" }}
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
              transition={{ delay: 0.7 }}
              className="text-xs text-gray-400 mt-4"
            >
              Free forever · No credit card · Takes 60 seconds
            </motion.p>
          </div>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
            className="flex-shrink-0 flex flex-col items-center gap-4 relative"
          >
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                  background: ["#58CC02", "#4A90D9", "#FFD700"][i % 3],
                  left: `${15 + (i * 11) % 70}%`,
                  top: `${5 + (i * 23) % 80}%`,
                }}
                animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}

            {/* Mascot bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="relative rounded-2xl px-4 py-3 border border-white/50 max-w-[200px] flex items-center gap-2"
              style={glassStrong}
            >
              <p className="text-sm font-bold text-gray-800">Let's learn about stocks!</p>
              <ChartUp size={18} />
              <div className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 border-b border-r border-white/40" style={{ background: "rgba(255,255,255,0.70)" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="select-none leading-none text-center"
            >
              <Bull size={90} />
            </motion.div>

            {/* Gamification badges */}
            <div className="flex gap-3">
              {[
                { icon: <Flame size={28} />, value: "14", label: "day streak", border: "border-orange-300/50", bg: "rgba(255,237,213,0.65)" },
                { icon: <Bolt size={28} />, value: "350", label: "XP today", border: "border-yellow-300/50", bg: "rgba(254,249,195,0.65)" },
              ].map(({ icon, value, label, border, bg }) => (
                <div key={label} className={`flex items-center gap-1.5 border-b-4 ${border} rounded-2xl px-4 py-2`} style={{ background: bg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                  {icon}
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
                <LessonNode icon={<Book size={22} />} label="What's a stock?" status="done" delay={0.8} />
                <LessonNode icon={<ChartUp size={22} />} label="The market" status="done" delay={0.9} />
                <LessonNode icon={<Bull size={22} />} label="Bulls & Bears" status="active" delay={1.0} />
                <LessonNode icon={<Bars size={22} />} label="P/E ratios" status="locked" delay={1.1} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-10 border-y border-white/40" style={glass}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Books size={36} />, end: 25, suffix: "+", label: "Lessons" },
            { icon: <ChartUp size={36} />, end: 50, suffix: "+", label: "Stocks to trade" },
            { icon: <Money size={36} />, end: 10, prefix: "£", suffix: "K", label: "Virtual money" },
            { icon: <Trophy size={36} />, end: 7, suffix: "", label: "League tiers" },
          ].map(({ icon, end, prefix, suffix, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center flex flex-col items-center gap-1"
            >
              {icon}
              <p className="text-3xl font-black text-gray-900 mt-1">
                <CountUp end={end} prefix={prefix} suffix={suffix} />
              </p>
              <p className="text-sm text-gray-500 font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SectionLabel>Why StockiLearn</SectionLabel>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Everything you need to<br />become a confident investor
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={<Books size={32} />} title="Structured Curriculum" desc="25+ bite-sized lessons across 5 units. Start from zero, master the fundamentals." delay={0} color={{ bg: "rgba(88,204,2,0.12)" }} />
            <FeatureCard icon={<ChartUp size={32} />} title="Paper Trading" desc="£10,000 virtual fund. 50+ real stocks. Build real intuition with zero risk." delay={0.08} color={{ bg: "rgba(74,144,217,0.12)" }} />
            <FeatureCard icon={<Robot size={32} />} title="Bruno the AI Tutor" desc="Ask anything in plain English. Bruno explains concepts and analyses your portfolio instantly." delay={0.16} color={{ bg: "rgba(155,89,182,0.12)" }} />
            <FeatureCard icon={<Flame size={32} />} title="Daily Streaks" desc="Build the habit. Miss a day and lose your streak. Use gems to freeze it." delay={0.24} color={{ bg: "rgba(255,107,53,0.12)" }} />
            <FeatureCard icon={<Trophy size={32} />} title="Leagues & Leaderboards" desc="Compete in 7 tiers. Top 5 promote each week. Bottom 5 get demoted." delay={0.32} color={{ bg: "rgba(255,215,0,0.12)" }} />
            <FeatureCard icon={<Bolt size={32} />} title="XP & 50 Levels" desc="From Market Newbie to Market Legend. Earn XP for lessons, quizzes, and smart trades." delay={0.40} color={{ bg: "rgba(243,156,18,0.12)" }} />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-4xl font-black text-gray-900">Start learning in 60 seconds</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { n: "1", icon: <Chick size={36} />, title: "Set your goal", desc: "Tell us your experience level. Your personalised curriculum is ready in 60 seconds." },
              { n: "2", icon: <Books size={36} />, title: "Complete daily lessons", desc: "Short, fun lessons with quizzes. Earn XP, protect your streak, unlock the next unit." },
              { n: "3", icon: <ChartUp size={36} />, title: "Trade with virtual money", desc: "Apply what you learned in a real-feeling paper market. No risk — all the fun." },
              { n: "4", icon: <Trophy size={36} />, title: "Climb the leagues", desc: "Compete weekly. Promote or demote. The same dopamine loop as Duolingo — but for money." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.08)" }}
                style={glass}
                className="rounded-3xl p-6 border border-white/50 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg shrink-0" style={{ background: "linear-gradient(135deg, #58CC02, #46A302)" }}>
                  {step.n}
                </div>
                <div>
                  <div className="mb-2">{step.icon}</div>
                  <h3 className="font-black text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gamification showcase ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <SectionLabel>Gamified Learning</SectionLabel>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-5">
              The same psychology<br />that built Duolingo.<br />
              <span style={{ background: "linear-gradient(135deg, #58CC02, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                For investing.
              </span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Streaks keep you coming back. Leagues create competition. XP rewards progress.
              It's the most powerful habit loop in edtech — now applied to financial literacy.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white border-b-4 border-[#46A302] hover:border-b-2 hover:translate-y-0.5 transition-all shadow-md"
              style={{ background: "linear-gradient(135deg, #58CC02, #46A302)" }}
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
              { icon: <Flame size={32} />, label: "14-day streak", sub: "Keep going!", color: "#FF6B35" },
              { icon: <Bolt size={32} />, label: "350 XP", sub: "Level 8", color: "#FFD700" },
              { icon: <Trophy size={32} />, label: "Gold League", sub: "Rank #3 this week", color: "#FFD700" },
              { icon: <Gem size={32} />, label: "120 Gems", sub: "Streak freeze ready", color: "#00CED1" },
              { icon: <Heart size={32} />, label: "5 Hearts", sub: "Full health", color: "#FF4757" },
              { icon: <Medal size={32} />, label: "3 Badges", sub: "Collected", color: "#FFD700" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                style={glass}
                className="rounded-2xl p-4 border border-white/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-5" style={{ background: `linear-gradient(135deg, ${item.color}, transparent)` }} />
                <div className="relative z-10">
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-sm font-black text-gray-800">{item.label}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 border border-white/50 relative overflow-hidden"
            style={glassStrong}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(88,204,2,0.08), transparent 70%)" }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <div className="flex justify-center mb-4"><ChartUp size={64} /></div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
                Your streak starts today.
              </h2>
              <p className="text-gray-500 mb-8 text-lg font-medium">
                Join thousands of teens learning to invest the smart way.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-xl text-white border-b-4 border-[#46A302] hover:border-b-2 hover:translate-y-0.5 transition-all shadow-lg"
                style={{ background: "linear-gradient(135deg, #58CC02, #46A302)" }}
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-gray-400 text-sm mt-5">Free forever · No credit card needed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Meet the Founders</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: <Rocket size={48} />, name: "Ahmetzhan Aldiyar", title: "CEO & Co-Founder", bio: "Leads StockiLearn's vision and product strategy — turning the mission of making investing accessible into a gamified, habit-forming experience." },
              { icon: <Gear size={48} />, name: "Sander Rosingholm", title: "COO & Co-Founder", bio: "Oversees operations and partnerships — ensuring StockiLearn runs smoothly as it scales to reach more learners across the UK." },
            ].map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.08)" }}
                style={glass}
                className="rounded-3xl p-6 border border-white/50 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, rgba(88,204,2,0.15), rgba(74,144,217,0.15))", border: "1px solid rgba(255,255,255,0.5)" }}>
                  {f.icon}
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
      <footer className="border-t border-white/40 py-10 px-6" style={glass}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChartUp size={24} />
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
          <p className="text-xs font-bold text-gray-600">Ahmetzhan Aldiyar <span className="text-gray-400 font-medium">· CEO &amp; Co-Founder</span></p>
          <p className="text-xs font-bold text-gray-600">Sander Rosingholm <span className="text-gray-400 font-medium">· COO &amp; Co-Founder</span></p>
        </div>
      </footer>

      </div>
    </div>
  );
}