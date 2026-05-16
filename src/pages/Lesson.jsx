import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { getLesson } from "@/lib/lessonData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, ArrowRight, Check, Heart } from "lucide-react";
import LessonSlide from "@/components/lesson/LessonSlide";
import QuizQuestion from "@/components/lesson/QuizQuestion";
import LessonComplete from "@/components/lesson/LessonComplete";

export default function Lesson() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = window.location.pathname.split("/lesson/")[1] || "1.1";
  const lesson = getLesson(lessonId);

  const [phase, setPhase] = useState("intro"); // intro, slides, quiz, complete
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null); // 'correct' | 'wrong' | null

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
        // Calculate XP
        const scorePercent = Math.round((correctCount + (isCorrect ? 1 : 0)) / questions.length * 100);
        const baseXp = lesson.xp || 15;
        const bonusXp = scorePercent === 100 ? 5 : 0;
        const earned = baseXp + bonusXp;
        setXpEarned(earned);
        setPhase("complete");
        // Save progress
        saveProgress(scorePercent, earned);
      }
    }, 1200);
  };

  const saveProgress = async (score, xp) => {
    try {
      // Check if progress exists
      const existing = await base44.entities.LessonProgress.filter({ lesson_id: lessonId });
      if (existing.length > 0) {
        await base44.entities.LessonProgress.update(existing[0].id, {
          status: "complete",
          score_percent: score,
          xp_earned: xp,
          completed_at: new Date().toISOString(),
          attempts_count: (existing[0].attempts_count || 0) + 1,
        });
      } else {
        await base44.entities.LessonProgress.create({
          lesson_id: lessonId,
          unit_id: lesson.unit,
          status: "complete",
          score_percent: score,
          xp_earned: xp,
          completed_at: new Date().toISOString(),
          attempts_count: 1,
        });
      }
      // Update user XP
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
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/learn")} className="text-muted-foreground">
          <X className="w-5 h-5" />
        </button>
        <Progress value={progressPercent} className="flex-1 h-2.5" />
        <div className="flex items-center gap-0.5">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          <span className="text-xs font-bold text-red-400">{hearts}</span>
        </div>
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 pointer-events-none flex items-center justify-center ${
              showFeedback === "correct" ? "bg-green-500/10" : "bg-red-500/10"
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                showFeedback === "correct" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {showFeedback === "correct" ? (
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              ) : (
                <X className="w-10 h-10 text-white" strokeWidth={3} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 px-4 flex flex-col">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-10"
            >
              <div className="text-6xl mb-2">📖</div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  Unit {lesson.unit} · Lesson {lesson.id}
                </p>
                <h1 className="text-2xl font-black text-foreground mt-2">{lesson.title}</h1>
                <p className="text-sm text-muted-foreground mt-3 max-w-xs">{lesson.teaser}</p>
                <p className="text-xs text-muted-foreground/60 mt-2">~{lesson.time} min · +{lesson.xp} XP</p>
              </div>
              <Button onClick={handleNext} className="w-full max-w-xs h-12 text-base font-bold rounded-2xl">
                START
              </Button>
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