import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function Trade() {
  return (
    <div className="px-4 pt-6 pb-4 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Paper Trading</p>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">Markets</h1>
        </div>
        <span className="text-xs text-amber-600 font-black border border-amber-200/60 px-3 py-1.5 rounded-2xl" style={{ background: "rgba(255,237,170,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
          📋 PAPER
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 border border-white/50"
          style={{ background: "linear-gradient(135deg, rgba(88,204,2,0.12), rgba(56,189,248,0.12))", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <TrendingUp className="w-12 h-12 text-[#58CC02]" strokeWidth={2.5} />
        </motion.div>

        <h2 className="text-2xl font-black text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-xs mb-8 leading-relaxed">
          Paper trading with £10,000 virtual money is on the way. Keep an eye out — you'll be trading real stocks risk-free very soon!
        </p>

        <Link to="/learn">
          <Button variant="outline" className="rounded-2xl h-11 px-6 font-bold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lessons
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}