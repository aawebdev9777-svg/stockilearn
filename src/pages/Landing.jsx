import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";
import { ArrowRight, Check, Flame, Zap, Trophy, Bot, TrendingUp, Sparkles } from "lucide-react";
import ShareButtons from "@/components/landing/ShareButtons";
import FounderSpotlight from "@/components/landing/FounderSpotlight";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1B1B1B] overflow-x-hidden font-nunito">
      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b-2 border-gray-300" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo to="/" size={36} textClass="text-xl" />
          <div className="flex items-center gap-2">
            <Link to="/about" className="text-sm font-bold text-[#1B1B1B]/70 hover:text-[#1B1B1B] transition-colors px-3 py-2 rounded-xl hover:bg-gray-100 hidden sm:block">About</Link>
            <Link to="/founders" className="text-sm font-bold text-[#1B1B1B]/70 hover:text-[#1B1B1B] transition-colors px-3 py-2 rounded-xl hover:bg-gray-100 hidden sm:block">Founders</Link>
            <Link to="/contact" className="text-sm font-bold text-[#1B1B1B]/70 hover:text-[#1B1B1B] transition-colors px-3 py-2 rounded-xl hover:bg-gray-100 hidden sm:block">Contact</Link>
            <Link to="/login" className="text-sm font-bold text-[#1B1B1B]/80 hover:text-[#1B1B1B] transition-colors px-4 py-2 rounded-xl hover:bg-gray-100">Sign In</Link>
            <Link
              to="/login?tab=signup"
              className="text-sm font-black px-5 py-2.5 rounded-2xl text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_4px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[2px] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 bg-[#D7FFB8] border-2 border-gray-300 text-[#1B1B1B] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6 shadow-[0_3px_0_#999]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            #1 Investing App for Teens
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black leading-[1.05] mb-5 tracking-tight"
            style={{ fontSize: "clamp(40px, 8vw, 76px)" }}
          >
            Learn investing.<br />
            <span className="text-[#58CC02]">Level up</span> your life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#1B1B1B]/60 mb-8 max-w-xl leading-relaxed"
          >
            Bite-sized lessons, paper trading, and an AI tutor — all with streaks, XP, and leagues to keep you coming back.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-4"
          >
            <Link
              to="/login"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all"
            >
              Start For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base text-[#1B1B1B] bg-[#D7FFB8] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all"
            >
              I have an account
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {["Free forever", "No credit card", "Takes 60 seconds"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs font-bold text-[#1B1B1B]/70 bg-gray-100 px-3 py-1.5 rounded-full">
                <Check className="w-3 h-3 text-[#58CC02]" strokeWidth={3} /> {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Gamified Stats Grid ── */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Flame, value: "14", label: "Day Streak", bg: "bg-orange-100", iconColor: "text-orange-500", border: "border-orange-400" },
            { icon: Zap, value: "350", label: "XP Today", bg: "bg-yellow-100", iconColor: "text-yellow-500", border: "border-yellow-400" },
            { icon: Trophy, value: "Gold", label: "League Rank #3", bg: "bg-amber-100", iconColor: "text-amber-500", border: "border-amber-400" },
            { icon: Bot, value: "Bruno", label: "AI Tutor Ready", bg: "bg-green-100", iconColor: "text-[#58CC02]", border: "border-[#58CC02]" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white border-2 border-gray-300 rounded-3xl p-5 shadow-[0_5px_0_#999] hover:translate-y-[2px] hover:shadow-[0_3px_0_#999] transition-all`}
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} border-2 ${item.border} flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2.5} />
                </div>
                <p className="text-2xl font-black tracking-tight">{item.value}</p>
                <p className="text-xs font-bold text-[#1B1B1B]/50 uppercase tracking-wide">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "25+", label: "Lessons" },
            { value: "50+", label: "Stocks to trade" },
            { value: "£10K", label: "Virtual money" },
            { value: "7", label: "League tiers" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-black text-[#58CC02] tracking-tight">{stat.value}</p>
              <p className="text-sm text-[#1B1B1B]/50 font-bold mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">Why StockiLearn</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Everything you need to<br />become a confident investor
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "📚", title: "Structured Curriculum", desc: "25+ bite-sized lessons across 5 units. Start from zero, master the fundamentals." },
              { icon: "📈", title: "Paper Trading", desc: "£10,000 virtual fund. 50+ real stocks. Build real intuition with zero risk." },
              { icon: "🤖", title: "Bruno the AI Tutor", desc: "Ask anything in plain English. Bruno explains concepts and analyses your portfolio instantly." },
              { icon: "🔥", title: "Daily Streaks", desc: "Build the habit. Miss a day and lose your streak. Use gems to freeze it." },
              { icon: "🏆", title: "Leagues & Leaderboards", desc: "Compete in 7 tiers. Top 5 promote each week. Bottom 5 get demoted." },
              { icon: "⚡", title: "XP & 50 Levels", desc: "From Market Newbie to Market Legend. Earn XP for lessons, quizzes, and smart trades." },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group bg-white border-2 border-gray-300 rounded-3xl p-6 shadow-[0_5px_0_#999] hover:shadow-[0_7px_0_#999] transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-2xl mb-4">{feat.icon}</div>
                <h3 className="font-black text-lg mb-2">{feat.title}</h3>
                <p className="text-sm text-[#1B1B1B]/60 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Start learning in 60 seconds</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { n: "01", icon: "🐣", title: "Set your goal", desc: "Tell us your experience level. Your personalised curriculum is ready in 60 seconds." },
              { n: "02", icon: "📚", title: "Complete daily lessons", desc: "Short, fun lessons with quizzes. Earn XP, protect your streak, unlock the next unit." },
              { n: "03", icon: "📈", title: "Trade with virtual money", desc: "Apply what you learned in a real-feeling paper market. No risk — all the fun." },
              { n: "04", icon: "🏆", title: "Climb the leagues", desc: "Compete weekly. Promote or demote. The same dopamine loop as Duolingo — but for money." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-2 border-gray-300 rounded-3xl p-6 flex gap-5 items-start shadow-[0_5px_0_#999] hover:shadow-[0_7px_0_#999] transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#58CC02] border-2 border-gray-300 flex items-center justify-center font-black text-white text-lg shrink-0 shadow-[0_3px_0_#999]">
                  {step.n}
                </div>
                <div>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h3 className="font-black text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-[#1B1B1B]/60 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders Spotlight ── */}
      <FounderSpotlight />

      {/* ── Gamification showcase ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-3">Gamified Learning</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              The same psychology<br />that built Duolingo.<br />
              <span className="text-[#58CC02]">For investing.</span>
            </h2>
            <p className="text-[#1B1B1B]/60 text-lg leading-relaxed mb-8 max-w-md">
              Streaks keep you coming back. Leagues create competition. XP rewards progress. It's the most powerful habit loop in edtech — now applied to financial literacy.
            </p>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all"
            >
              Try it free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 grid grid-cols-2 gap-3 w-80"
          >
            {[
              { icon: "🔥", label: "14-day streak", sub: "Keep going!", bg: "bg-orange-100" },
              { icon: "⚡", label: "350 XP", sub: "Level 8", bg: "bg-yellow-100" },
              { icon: "🏆", label: "Gold League", sub: "Rank #3 this week", bg: "bg-amber-100" },
              { icon: "💎", label: "120 Gems", sub: "Streak freeze ready", bg: "bg-cyan-100" },
              { icon: "❤️", label: "5 Hearts", sub: "Full health", bg: "bg-red-100" },
              { icon: "🥇", label: "3 Badges", sub: "Collected", bg: "bg-green-100" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className={`bg-white border-2 border-gray-300 rounded-2xl p-4 shadow-[0_4px_0_#999]`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-sm font-black">{item.label}</p>
                <p className="text-[10px] text-[#1B1B1B]/40 font-bold">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#D7FFB8] border-2 border-gray-300 rounded-3xl p-10 md:p-14 shadow-[0_7px_0_#999]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#58CC02] border-2 border-gray-300 flex items-center justify-center mx-auto mb-6 shadow-[0_4px_0_#999]">
              <TrendingUp className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Your streak starts today.
            </h2>
            <p className="text-[#1B1B1B]/60 mb-8 text-lg font-bold max-w-md mx-auto">
              Join thousands of teens learning to invest the smart way.
            </p>
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-xl text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all"
            >
              Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
            <p className="text-[#1B1B1B]/40 text-sm font-bold mt-5">Free forever · No credit card needed</p>
          </motion.div>
        </div>
      </section>

      {/* ── Share ── */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <ShareButtons />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-gray-300 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo to="/" size={28} textClass="text-base" />
          <p className="text-xs text-[#1B1B1B]/40">© 2026 StockiLearn · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-[#1B1B1B]/40 font-bold">
            <Link to="/about" className="hover:text-[#1B1B1B] transition-colors">About</Link>
            <Link to="/founders" className="hover:text-[#1B1B1B] transition-colors">Founders</Link>
            <Link to="/contact" className="hover:text-[#1B1B1B] transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-[#1B1B1B] transition-colors">Privacy</Link>
            <Link to="/login" className="hover:text-[#1B1B1B] transition-colors">Sign In</Link>
          </div>
        </div>
        <div className="mt-6 text-center space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1B1B1B]/40">Created by</p>
          <p className="text-xs font-bold text-[#1B1B1B]/60">Ahmetzhan Aldiyar <span className="text-[#1B1B1B]/40 font-medium">· CEO &amp; Co-Founder</span></p>
          <p className="text-xs font-bold text-[#1B1B1B]/60">Sander Andrieu Rosingholm <span className="text-[#1B1B1B]/40 font-medium">· COO &amp; Co-Founder</span></p>
          <p className="text-xs font-bold text-[#1B1B1B]/60">Inaan Advani <span className="text-[#1B1B1B]/40 font-medium">· CFO</span></p>
        </div>
      </footer>
    </div>
  );
}