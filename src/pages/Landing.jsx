import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Zap, Trophy, Bot, Flame, Sparkles, Check } from "lucide-react";
import ShareButtons from "@/components/landing/ShareButtons";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white overflow-x-hidden font-inter relative">
      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#58CC02]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-400/6 rounded-full blur-[90px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0E1A]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#58CC02] to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tight">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/about" className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 hidden sm:block">About</Link>
            <Link to="/founders" className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 hidden sm:block">Founders</Link>
            <Link to="/contact" className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 hidden sm:block">Contact</Link>
            <Link to="/login" className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">Sign In</Link>
            <Link
              to="/login?tab=signup"
              className="text-sm font-bold px-5 py-2.5 rounded-xl text-[#0A0E1A] bg-[#58CC02] hover:bg-[#6BD61A] transition-all shadow-lg shadow-green-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-36 pb-20 px-6">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[#58CC02] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            #1 investing app for teens
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black leading-[1.05] mb-6 tracking-tight"
            style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
          >
            Learn investing.<br />
            <span className="bg-gradient-to-r from-[#58CC02] via-emerald-400 to-green-300 bg-clip-text text-transparent">Level up your life.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 mb-10 max-w-xl leading-relaxed"
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
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-[#0A0E1A] bg-[#58CC02] hover:bg-[#6BD61A] transition-all shadow-xl shadow-green-500/20 hover:shadow-green-500/30"
            >
              Start For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white/80 border border-white/15 hover:bg-white/5 hover:border-white/25 transition-all backdrop-blur-sm"
            >
              I have an account
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-white/30 flex items-center gap-3"
          >
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#58CC02]" /> Free forever</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#58CC02]" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#58CC02]" /> Takes 60 seconds</span>
          </motion.p>
        </motion.div>
      </section>

      {/* ── Floating preview cards ── */}
      <section className="relative z-10 px-6 mb-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Flame, value: "14", label: "day streak", color: "text-orange-400", bg: "bg-orange-400/10" },
            { icon: Zap, value: "350", label: "XP today", color: "text-yellow-400", bg: "bg-yellow-400/10" },
            { icon: Trophy, value: "Gold", label: "league rank #3", color: "text-amber-400", bg: "bg-amber-400/10" },
            { icon: Bot, value: "Bruno", label: "AI tutor ready", color: "text-[#58CC02]", bg: "bg-[#58CC02]/10" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-4.5 h-4.5 ${item.color}`} strokeWidth={2.5} />
                </div>
                <p className="text-2xl font-black tracking-tight">{item.value}</p>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wide">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="relative z-10 py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
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
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tight">{stat.value}</p>
              <p className="text-sm text-white/40 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#58CC02] mb-3">Why StockiLearn</p>
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
                className="group bg-white/[0.03] border border-white/5 rounded-3xl p-6 backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#58CC02]/20 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#58CC02]/10 transition-colors">{feat.icon}</div>
                <h3 className="font-black text-lg mb-2">{feat.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#58CC02] mb-3">How It Works</p>
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
                className="bg-white/[0.03] border border-white/5 rounded-3xl p-7 flex gap-5 items-start hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-3xl font-black bg-gradient-to-b from-[#58CC02] to-emerald-700 bg-clip-text text-transparent shrink-0">{step.n}</span>
                <div>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h3 className="font-black text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gamification showcase ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#58CC02] mb-3">Gamified Learning</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              The same psychology<br />that built Duolingo.<br />
              <span className="bg-gradient-to-r from-[#58CC02] to-emerald-400 bg-clip-text text-transparent">For investing.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8 max-w-md">
              Streaks keep you coming back. Leagues create competition. XP rewards progress. It's the most powerful habit loop in edtech — now applied to financial literacy.
            </p>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-[#0A0E1A] bg-[#58CC02] hover:bg-[#6BD61A] transition-all shadow-lg shadow-green-500/20"
            >
              Try it free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 grid grid-cols-2 gap-3 w-80"
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
                whileHover={{ y: -4 }}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.06] transition-colors"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-sm font-black">{item.label}</p>
                <p className="text-[10px] text-white/30 font-medium">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-14 backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#58CC02]/5 via-transparent to-emerald-500/5 pointer-events-none" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#58CC02] to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                <TrendingUp className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                Your streak starts today.
              </h2>
              <p className="text-white/40 mb-8 text-lg font-medium max-w-md mx-auto">
                Join thousands of teens learning to invest the smart way.
              </p>
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-xl text-[#0A0E1A] bg-[#58CC02] hover:bg-[#6BD61A] transition-all shadow-xl shadow-green-500/20"
              >
                Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-white/30 text-sm mt-5">Free forever · No credit card needed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Share ── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ShareButtons />
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-[#58CC02] mb-3">The Team</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Meet the Founders</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { emoji: "🚀", name: "Ahmetzhan Aldiyar", title: "CEO & Co-Founder", bio: "Leads StockiLearn's vision and product strategy — turning the mission of making investing accessible into a gamified, habit-forming experience." },
              { emoji: "⚙️", name: "Sander Andrieu Rosingholm", title: "COO & Co-Founder", bio: "Oversees operations and partnerships — ensuring StockiLearn runs smoothly as it scales to reach more learners across the UK." },
            ].map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/5 rounded-3xl p-7 flex flex-col items-center text-center hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-3xl mb-4">{f.emoji}</div>
                <h3 className="text-lg font-black">{f.name}</h3>
                <p className="text-sm font-bold text-[#58CC02] mb-2">{f.title}</p>
                <p className="text-sm text-white/40 leading-relaxed">{f.bio}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/founders" className="inline-flex items-center gap-2 text-sm font-bold text-[#58CC02] hover:text-[#6BD61A] transition-colors">
              Learn more about the founders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 bg-[#080B14]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#58CC02] to-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </div>
          <p className="text-xs text-white/30">© 2026 StockiLearn · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link to="/about" className="hover:text-white/60 transition-colors">About</Link>
            <Link to="/founders" className="hover:text-white/60 transition-colors">Founders</Link>
            <Link to="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
            <Link to="/login" className="hover:text-white/60 transition-colors">Sign In</Link>
          </div>
        </div>
        <div className="mt-6 text-center space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Created by</p>
          <p className="text-xs font-bold text-white/50">Ahmetzhan Aldiyar <span className="text-white/30 font-medium">· CEO &amp; Co-Founder</span></p>
          <p className="text-xs font-bold text-white/50">Sander Andrieu Rosingholm <span className="text-white/30 font-medium">· COO &amp; Co-Founder</span></p>
        </div>
      </footer>
    </div>
  );
}