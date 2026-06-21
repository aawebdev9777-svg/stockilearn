import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter">

      {/* Nav */}
      <nav className="border-b-2 border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </Link>
          <Link to="/login"
            className="text-sm font-black px-5 py-2.5 rounded-xl bg-[#58CC02] text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="text-7xl mb-4">🐂</div>
          <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">Our Story</p>
          <h1 className="text-5xl font-black text-gray-900 leading-tight">About StockiLearn</h1>
        </motion.div>

        {/* Main content */}
        <div className="space-y-10 max-w-2xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-green-50 border-b-4 border-green-200 p-8"
          >
            <div className="text-3xl mb-3">📈</div>
            <h2 className="text-xl font-black text-gray-900 mb-3">What is StockiLearn?</h2>
            <p className="text-gray-600 leading-relaxed">
              StockiLearn is a gamified investing education platform inspired by Duolingo. 
              We believe that financial literacy should be fun, accessible, and habit-forming — 
              not dry, boring, or locked behind expensive courses. Through bite-sized lessons, 
              paper trading with £10,000 of virtual money, and daily XP streaks, we make it 
              genuinely enjoyable to understand how markets work, what stocks are, and how to 
              think like an investor. Our AI tutor, Bruno the Bull, is there every step of the 
              way to answer your questions in plain English.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-blue-50 border-b-4 border-blue-200 p-8"
          >
            <div className="text-3xl mb-3">🎓</div>
            <h2 className="text-xl font-black text-gray-900 mb-3">Who is it for?</h2>
            <p className="text-gray-600 leading-relaxed">
              StockiLearn is built for anyone who feels like investing is "not for them" — 
              especially teenagers, students, and young adults who want to take control of their 
              financial future but don't know where to start. Whether you think a stock is 
              "something to do with money" or you've already heard of a P/E ratio, our 
              personalised onboarding places you at exactly the right level. No jargon. 
              No pressure. No real money at risk. Just progress, one lesson at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-purple-50 border-b-4 border-purple-200 p-8"
          >
            <div className="text-3xl mb-3">🛠️</div>
            <h2 className="text-xl font-black text-gray-900 mb-3">Who builds it?</h2>
            <p className="text-gray-600 leading-relaxed">
              StockiLearn is an independent project built by a passionate developer who 
              believes financial education should be a right, not a privilege. The platform 
              is built with a modern tech stack — React, AI, real-time market data — and 
              is continuously improving based on user feedback. Have a suggestion or spotted 
              a bug? We'd love to hear from you at{" "}
              <a href="mailto:aa.web.dev@outlook.com" className="text-[#58CC02] font-bold hover:underline">
                aa.web.dev@outlook.com
              </a>.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-black text-gray-900 mb-4 text-center">What you get</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📚", text: "25+ structured lessons" },
                { icon: "🔥", text: "Daily streaks & XP" },
                { icon: "💹", text: "Paper trading simulator" },
                { icon: "🏆", text: "Weekly leagues" },
                { icon: "🤖", text: "Bruno AI tutor" },
                { icon: "🆓", text: "Free forever" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-2xl border-2 border-gray-100 p-4">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-sm font-bold text-gray-700">{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-4"
          >
            <Link to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white bg-[#58CC02] border-b-4 border-[#46A302] hover:brightness-105 transition-all shadow-md"
            >
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-100 py-8 px-6 bg-white mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-black text-gray-800">Stocki<span className="text-[#58CC02]">Learn</span></span>
          </Link>
          <p className="text-xs text-gray-400">© 2026 StockiLearn · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/about" className="hover:text-gray-700 transition-colors font-bold text-[#58CC02]">About</Link>
            <Link to="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}