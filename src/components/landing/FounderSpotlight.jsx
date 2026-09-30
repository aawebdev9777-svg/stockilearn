import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Settings, TrendingUp, Sparkles, Landmark } from "lucide-react";

const founders = [
  {
    emoji: "🚀",
    icon: Rocket,
    name: "Ahmetzhan Aldiyar",
    title: "CEO & Co-Founder",
    tagline: "The Visionary",
    bio: "Leads StockiLearn's vision and product strategy — turning the mission of making investing accessible into a gamified, habit-forming experience for the next generation.",
    highlights: ["Product & Strategy", "Curriculum Design", "Vision & Mission"],
    accent: "bg-[#58CC02]",
    accentSoft: "bg-[#D7FFB8]",
    iconColor: "text-[#58CC02]",
  },
  {
    emoji: "⚙️",
    icon: Settings,
    name: "Sander Andrieu Rosingholm",
    title: "COO & Co-Founder",
    tagline: "The Operator",
    bio: "Oversees operations and partnerships — ensuring StockiLearn runs smoothly as it scales to reach more learners across the UK and beyond.",
    highlights: ["Operations & Growth", "Partnerships", "Scaling & Logistics"],
    accent: "bg-blue-500",
    accentSoft: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    emoji: "📊",
    icon: Landmark,
    name: "Inaan Advani",
    title: "CFO",
    tagline: "The Financier",
    bio: "Leads StockiLearn's finances — managing budgets, forecasts, and fundraising to keep the platform sustainable as it grows.",
    highlights: ["Finance & Budgeting", "Fundraising", "Forecasting"],
    accent: "bg-purple-500",
    accentSoft: "bg-purple-100",
    iconColor: "text-purple-500",
  },
];

export default function FounderSpotlight() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white via-[#F0FDF4] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 bg-[#D7FFB8] border-2 border-gray-300 text-[#1B1B1B] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4 shadow-[0_3px_0_#999]">
            <Sparkles className="w-3.5 h-3.5" />
            The Minds Behind It
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
            Meet the <span className="text-[#58CC02]">Founders</span>
          </h2>
          <p className="text-lg text-[#1B1B1B]/60 max-w-2xl mx-auto leading-relaxed font-bold">
            Three passionate entrepreneurs on a mission to make financial literacy fun, accessible, and habit-forming for teens everywhere.
          </p>
        </motion.div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {founders.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white border-2 border-gray-300 rounded-3xl overflow-hidden shadow-[0_6px_0_#999] hover:shadow-[0_10px_0_#999] transition-all"
              >
                {/* Top accent bar */}
                <div className={`h-3 ${f.accent}`} />

                <div className="p-8">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`w-20 h-20 rounded-3xl ${f.accentSoft} border-2 border-gray-300 flex items-center justify-center text-4xl shadow-[0_4px_0_#999] group-hover:scale-105 transition-transform`}>
                      {f.emoji}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight leading-tight">{f.name}</h3>
                      <p className={`text-sm font-black ${f.iconColor} mt-0.5`}>{f.title}</p>
                      <p className="text-xs font-black text-[#1B1B1B]/40 uppercase tracking-wider mt-0.5">{f.tagline}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-[#1B1B1B]/60 leading-relaxed mb-6">{f.bio}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {f.highlights.map((h) => (
                      <span key={h} className={`inline-flex items-center gap-1 text-xs font-bold ${f.accentSoft} border-2 border-gray-300 px-3 py-1.5 rounded-xl`}>
                        <Icon className={`w-3 h-3 ${f.iconColor}`} strokeWidth={3} />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Decorative icon */}
                  <div className="flex justify-end">
                    <div className={`w-12 h-12 rounded-2xl ${f.accent} border-2 border-gray-300 flex items-center justify-center shadow-[0_3px_0_#999]`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#D7FFB8] border-2 border-gray-300 rounded-3xl p-8 md:p-12 shadow-[0_6px_0_#999] text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#58CC02] border-2 border-gray-300 flex items-center justify-center shadow-[0_4px_0_#999]">
              <TrendingUp className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">Our Mission</h3>
          <p className="text-base md:text-lg text-[#1B1B1B]/70 leading-relaxed max-w-2xl mx-auto font-bold mb-6">
            "We believe every teen deserves the tools to understand money. Not through boring textbooks — but through the same addictive, gamified experience that made us love learning languages, playing games, and showing up every day."
          </p>
          <Link
            to="/founders"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all"
          >
            Learn more about us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}