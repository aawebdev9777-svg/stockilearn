import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, RotateCcw } from "lucide-react";

export default function LessonComplete({ lesson, xpEarned, correctCount, totalQuestions }) {
  const isPerfect = correctCount === totalQuestions;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-6"
    >
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        className="text-7xl"
      >
        {isPerfect ? "🏆" : scorePercent >= 70 ? "⭐" : "💪"}
      </motion.div>

      <div>
        {isPerfect ? (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-black text-foreground"
          >
            FLAWLESS! 🔥
          </motion.h2>
        ) : (
          <h2 className="text-2xl font-black text-foreground">Lesson Complete!</h2>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          {correctCount}/{totalQuestions} correct · {scorePercent}%
        </p>
      </div>

      {/* XP Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-2xl"
      >
        <Zap className="w-6 h-6 fill-primary text-primary" />
        <span className="text-2xl font-black text-primary">+{xpEarned} XP</span>
      </motion.div>

      {/* Summary */}
      {lesson.summary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-1.5"
        >
          <p className="text-xs text-muted-foreground font-bold uppercase">You learned:</p>
          {lesson.summary.map((point, i) => (
            <p key={i} className="text-sm text-foreground">✓ {point}</p>
          ))}
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-xs space-y-3"
      >
        <Link to="/learn">
          <Button className="w-full h-12 rounded-2xl text-base font-bold gap-2">
            CONTINUE <ArrowRight className="w-5 h-5" />
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