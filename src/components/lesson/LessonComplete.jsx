import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Star, Trophy, Dumbbell } from "lucide-react";

export default function LessonComplete({ lesson, xpEarned, correctCount, totalQuestions }) {
  const isPerfect = correctCount === totalQuestions;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
  const [count, setCount] = useState(0);

  // Animated XP count-up
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(xpEarned / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= xpEarned) { setCount(xpEarned); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [xpEarned]);

  const grade = isPerfect ? { emoji: "🏆", label: "FLAWLESS!", color: "hsl(42 100% 50%)", bg: "hsl(42 100% 50% / 0.12)" }
    : scorePercent >= 80 ? { emoji: "⭐", label: "GREAT JOB!", color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.12)" }
    : scorePercent >= 60 ? { emoji: "✅", label: "NICE WORK!", color: "hsl(200 90% 61%)", bg: "hsl(200 90% 61% / 0.12)" }
    : { emoji: "💪", label: "KEEP GOING!", color: "hsl(0 80% 63%)", bg: "hsl(0 80% 63% / 0.12)" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center text-center py-8 gap-6"
    >
      {/* Trophy animation */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.1 }}
        className="text-8xl"
      >
        {grade.emoji}
      </motion.div>

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: grade.color }}>
          Lesson Complete
        </p>
        <h2 className="text-3xl font-black text-foreground">{grade.label}</h2>
        <p className="text-sm text-muted-foreground mt-1">{lesson.title}</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="w-full grid grid-cols-3 gap-3"
      >
        {[
          { icon: <Zap className="w-5 h-5" />, value: `+${count}`, label: "XP Earned", color: "hsl(var(--primary))", bg: "hsl(var(--primary)/0.1)" },
          { icon: <Star className="w-5 h-5" />, value: `${scorePercent}%`, label: "Accuracy", color: grade.color, bg: grade.bg },
          { icon: <Trophy className="w-5 h-5" />, value: `${correctCount}/${totalQuestions}`, label: "Correct", color: "hsl(200 90% 61%)", bg: "hsl(200 90% 61% / 0.1)" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            className="rounded-2xl p-4 flex flex-col items-center gap-1"
            style={{ background: s.bg, border: `1.5px solid ${s.color}30` }}
          >
            <div style={{ color: s.color }}>{s.icon}</div>
            <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground font-semibold">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* What you learned */}
      {lesson.summary && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="w-full rounded-2xl p-4 text-left"
          style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border))" }}
        >
          <p className="text-[10px] font-black tracking-widest uppercase text-muted-foreground mb-3">What you learned</p>
          <div className="space-y-2">
            {lesson.summary.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.1 }}
                className="flex items-start gap-2.5"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "hsl(var(--primary)/0.2)" }}
                >
                  <span className="text-[9px] font-black" style={{ color: "hsl(var(--primary))" }}>✓</span>
                </div>
                <p className="text-sm text-foreground leading-snug">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full space-y-3 mt-auto"
      >
        <Link to="/learn">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full h-14 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 4px 24px hsl(var(--primary)/0.4)",
            }}
          >
            CONTINUE <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
        <Link to="/home">
          <button className="w-full h-10 text-sm text-muted-foreground font-semibold hover:text-foreground transition-colors">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}