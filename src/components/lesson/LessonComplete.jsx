import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Star, Target } from "lucide-react";

export default function LessonComplete({ lesson, xpEarned, correctCount, totalQuestions }) {
  const isPerfect = correctCount === totalQuestions;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (isPerfect || scorePercent >= 80) {
      setTimeout(() => {
        import("canvas-confetti").then(mod => {
          mod.default({
            particleCount: isPerfect ? 150 : 80,
            spread: 70,
            origin: { y: 0.5 },
            colors: ["#00FF87", "#FFD700", "#FF6B6B", "#4ECDC4"],
          });
        });
      }, 400);
    }
  }, []);

  const getGrade = () => {
    if (isPerfect) return { emoji: "🏆", label: "PERFECT!", color: "#FFD700", bg: "#FFD70015", border: "#FFD70030" };
    if (scorePercent >= 80) return { emoji: "⭐", label: "GREAT JOB!", color: "#22c55e", bg: "#22c55e15", border: "#22c55e30" };
    if (scorePercent >= 60) return { emoji: "💪", label: "NICE WORK!", color: "hsl(155 100% 50%)", bg: "hsl(155 100% 50% / 0.1)", border: "hsl(155 100% 50% / 0.25)" };
    return { emoji: "📚", label: "KEEP GOING!", color: "#f97316", bg: "#f9731615", border: "#f9731630" };
  };

  const grade = getGrade();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center py-8 gap-5"
    >
      {/* Hero celebration */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
        className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
        style={{ background: grade.bg, border: `3px solid ${grade.border}` }}
      >
        {grade.emoji}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-3xl font-black text-foreground">{grade.label}</h2>
        <p className="text-sm text-muted-foreground mt-1">{lesson.title} · Complete</p>
      </motion.div>

      {/* Score stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="w-full grid grid-cols-3 gap-3"
      >
        {[
          { icon: <Target className="w-4 h-4" />, value: `${scorePercent}%`, label: "Accuracy", color: grade.color },
          { icon: <Zap className="w-4 h-4 fill-primary text-primary" />, value: `+${xpEarned}`, label: "XP Earned", color: "hsl(155 100% 50%)" },
          { icon: <Star className="w-4 h-4" />, value: `${correctCount}/${totalQuestions}`, label: "Correct", color: "#f59e0b" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="rounded-2xl p-3 text-center"
            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
          >
            <div className="flex justify-center mb-1" style={{ color: stat.color }}>{stat.icon}</div>
            <p className="text-lg font-black" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* XP bar animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full rounded-2xl p-4"
        style={{ background: "hsl(155 100% 50% / 0.08)", border: "1px solid hsl(155 100% 50% / 0.2)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-black text-foreground">+{xpEarned} XP Awarded</span>
          </div>
          {isPerfect && <span className="text-xs font-bold text-primary">+5 Bonus XP!</span>}
        </div>
        <div className="h-2.5 bg-primary/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(scorePercent, 100)}%` }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(155 100% 50%), hsl(155 100% 65%))" }}
          />
        </div>
      </motion.div>

      {/* What you learned */}
      {lesson.summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="w-full rounded-2xl p-4 space-y-2"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
        >
          <p className="text-[10px] font-black tracking-widest uppercase text-muted-foreground mb-2">📋 YOU LEARNED</p>
          {lesson.summary.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="flex items-start gap-2"
            >
              <span className="text-primary font-black text-sm mt-0.5">✓</span>
              <span className="text-sm text-foreground">{point}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bruno message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="w-full rounded-2xl p-3 flex items-start gap-3"
        style={{ background: "hsl(var(--muted))" }}
      >
        <span className="text-2xl">🐂</span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isPerfect
            ? "Incredible! A perfect score! You're becoming a real market expert. Keep this momentum going! 🔥"
            : scorePercent >= 70
            ? "Great work! You're building solid investing foundations. Every lesson makes you a better investor!"
            : "Nice effort! Don't worry about the score — what matters is learning. Try again to get that perfect score! 💪"}
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="w-full space-y-2"
      >
        <Link to="/learn">
          <Button className="w-full h-12 rounded-2xl text-base font-bold gap-2">
            CONTINUE LEARNING <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <Link to="/home">
          <Button variant="ghost" className="w-full text-sm text-muted-foreground">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}