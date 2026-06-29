import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const glass = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const FOUNDERS = [
  {
    emoji: "🚀",
    name: "Ahmetzhan Aldiyar",
    title: "CEO & Co-Founder",
    bio: "Leads StockiLearn's vision, product strategy, and growth — turning the mission of making investing accessible to young people into a gamified, habit-forming experience.",
  },
  {
    emoji: "⚙️",
    name: "Sander Rosingholm",
    title: "COO & Co-Founder",
    bio: "Oversees operations, partnerships, and execution — ensuring StockiLearn runs smoothly as it scales to reach more learners across the UK and beyond.",
  },
];

export default function Founders() {
  return (
    <div
      className="min-h-screen text-gray-800 overflow-x-hidden font-inter"
      style={{
        background: "linear-gradient(135deg, #dce8ee 0%, #e8ddd8 30%, #d8e4dc 60%, #e0dbe8 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">The Team</p>
          <h1 className="text-4xl font-black text-gray-900 leading-tight">Meet the Founders</h1>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            The duo behind StockiLearn — on a mission to make investing education free, fun, and accessible.
          </p>
        </motion.div>

        <div className="space-y-6">
          {FOUNDERS.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={glass}
              className="rounded-3xl p-8 border border-white/50 flex flex-col sm:flex-row items-center sm:items-start gap-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/60 border border-white/50 flex items-center justify-center text-4xl shrink-0">
                {f.emoji}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-black text-gray-900">{f.name}</h2>
                <p className="text-sm font-bold text-[#58CC02] mb-3">{f.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}