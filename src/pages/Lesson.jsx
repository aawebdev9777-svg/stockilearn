import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { getLesson } from "@/lib/lessonData";
import { Progress } from "@/components/ui/progress";
import { X, Heart, Zap, BookOpen, Clock, Check } from "lucide-react";
import LessonSlide from "@/components/lesson/LessonSlide";
import QuizQuestion from "@/components/lesson/QuizQuestion";
import LessonComplete from "@/components/lesson/LessonComplete";

export default function Lesson() {
  const navigate = useNavigate();
  const lessonId = window.location.pathname.split("/lesson/")[1] || "1.1";
  const lesson = getLesson(lessonId);

  const [phase, setPhase] = useState("intro");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  const slides = lesson.slides || [];
  const questions = lesson.questions || [];
  const totalSteps = slides.length + questions.length;
  const currentStep = phase === "slides" ? slideIndex : phase === "quiz" ? slides.length + questionIndex : 0;
  const progressPercent = phase === "intro" ? 0 : phase === "complete" ? 100 : (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (phase === "intro") {
      setPhase("slides");
    } else if (phase === "slides") {
      if (slideIndex < slides.length - 1) {
        setSlideIndex(s => s + 1);
      } else {
        setPhase("quiz");
      }
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      setShowFeedback("correct");
    } else {
      setHearts(h => Math.max(0, h - 1));
      setShowFeedback("wrong");
    }
    setTimeout(() => {
      setShowFeedback(null);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(q => q + 1);
      } else {
        const scorePercent = Math.round((correctCount + (isCorrect ? 1 : 0)) / questions.length * 100);
        const baseXp = lesson.xp || 15;
        const bonusXp = scorePercent === 100 ? 5 : 0;
        const earned = baseXp + bonusXp;
        setXpEarned(earned);
        setPhase("complete");
        saveProgress(scorePercent, earned);
      }
    }, 1400);
  };

  const saveProgress = async (score, xp) => {
    try {
      const existing = await base44.entities.LessonProgress.filter({ lesson_id: lessonId });
      if (existing.length > 0) {
        await base44.entities.LessonProgress.update(existing[0].id, {
          status: "complete", score_percent: score, xp_earned: xp,
          completed_at: new Date().toISOString(),
          attempts_count: (existing[0].attempts_count || 0) + 1,
        });
      } else {
        await base44.entities.LessonProgress.create({
          lesson_id: lessonId, unit_id: lesson.unit, status: "complete",
          score_percent: score, xp_earned: xp,
          completed_at: new Date().toISOString(), attempts_count: 1,
        });
      }
      const user = await base44.auth.me();
      if (user) {
        const today = new Date().toISOString().split("T")[0];
        const dailyXp = user.daily_goal_date === today ? (user.daily_xp_earned_today || 0) + xp : xp;
        const newStreak = user.streak_last_activity_date === today
          ? user.streak_current || 0
          : (user.streak_current || 0) + 1;
        await base44.auth.updateMe({
          xp_total: (user.xp_total || 0) + xp,
          daily_xp_earned_today: dailyXp,
          daily_goal_date: today,
          streak_current: newStreak,
          streak_longest: Math.max(newStreak, user.streak_longest || 0),
          streak_last_activity_date: today,
          league_season_xp: (user.league_season_xp || 0) + xp,
        });
      }
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md px-4 pt-3 pb-2 flex items-center gap-3"
        style={{ borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
        <button
          onClick={() => navigate("/learn")}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-muted"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        <Progress value={progressPercent} className="flex-1 h-2" />
        {/* Hearts */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className="w-4 h-4 transition-all"
              style={{
                fill: i < hearts ? "hsl(0 80% 63%)" : "transparent",
                color: i < hearts ? "hsl(0 80% 63%)" : "hsl(var(--muted-foreground)/0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ background: showFeedback === "correct" ? "hsl(142 70% 45% / 0.06)" : "hsl(0 80% 63% / 0.06)" }}
          >
            {/* Big bottom banner */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-4 rounded-t-3xl"
              style={{
                background: showFeedback === "correct" ? "hsl(142 70% 45% / 0.95)" : "hsl(0 80% 63% / 0.95)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                {showFeedback === "correct"
                  ? <Check className="w-7 h-7 text-white" strokeWidth={3} />
                  : <X className="w-7 h-7 text-white" strokeWidth={3} />}
              </div>
              <div>
                <p className="font-black text-lg text-white">
                  {showFeedback === "correct" ? "Correct! 🎉" : "Oops!"}
                </p>
                <p className="text-sm text-white/80">
                  {showFeedback === "correct" ? "Keep it up!" : "Keep going — you've got this!"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 px-4 pb-6 flex flex-col min-h-0" style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8"
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260 }}
                className="relative"
              >
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-30"
                  style={{ background: "hsl(var(--primary))", transform: "scale(1.4)" }}
                />
                <div
                  className="relative w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-xl"
                  style={{ background: "hsl(var(--card))", border: "2px solid hsl(var(--border))" }}
                >
                  📖
                </div>
              </motion.div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
                  Unit {lesson.unit} · Lesson {lesson.id}
                </p>
                <h1 className="text-3xl font-black text-foreground leading-tight">{lesson.title}</h1>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {lesson.teaser}
                </p>
              </div>

              {/* Info pills */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" /> ~{lesson.time} min
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                  <Zap className="w-3.5 h-3.5" /> +{lesson.xp} XP
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5" /> {slides.length} slides · {questions.length} Q
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                className="w-full max-w-xs h-14 rounded-2xl font-black text-lg shadow-lg transition-all"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 6px 28px hsl(var(--primary)/0.4)",
                }}
              >
                START LESSON
              </motion.button>
            </motion.div>
          )}

          {phase === "slides" && slides[slideIndex] && (
            <LessonSlide
              key={`slide-${slideIndex}`}
              slide={slides[slideIndex]}
              onNext={handleNext}
              index={slideIndex}
              total={slides.length}
            />
          )}

          {phase === "quiz" && questions[questionIndex] && (
            <QuizQuestion
              key={`q-${questionIndex}`}
              question={questions[questionIndex]}
              onAnswer={handleAnswer}
              index={questionIndex}
              total={questions.length}
            />
          )}

          {phase === "complete" && (
            <LessonComplete
              key="complete"
              lesson={lesson}
              xpEarned={xpEarned}
              correctCount={correctCount}
              totalQuestions={questions.length}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}