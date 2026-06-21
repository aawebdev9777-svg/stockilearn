import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ContinueCard({ lesson, progress = 30 }) {
  if (!lesson) {
    return (
      <Link to="/learn">
        <motion.div
          whileTap={{ scale: 0.97, y: 3 }}
          className="rounded-2xl bg-[#58CC02] border-b-4 border-[#46A302] p-5 flex items-center justify-between shadow-sm"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-0.5">Ready?</p>
            <p className="text-lg font-black text-white">Start Today's Lesson</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/learn/lesson/${lesson.id}`}>
      <motion.div
        whileTap={{ scale: 0.97, y: 3 }}
        className="rounded-2xl bg-[#58CC02] border-b-4 border-[#46A302] p-5 shadow-sm"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Continue Learning</p>
        <p className="text-base font-black text-white mb-3">{lesson.title}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2.5 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}