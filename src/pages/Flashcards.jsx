import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { FLASHCARD_TERMS } from "@/lib/flashcardData";
import { getDueCards, saveProgress, getStats } from "@/lib/spacedRepetition";
import { useDemo } from "@/lib/DemoContext";
import { base44 } from "@/api/base44Client";

const XP_PER_CARD = 5;
const RATINGS = [
  { quality: 0, label: "Again", color: "bg-red-500", text: "text-white" },
  { quality: 3, label: "Hard", color: "bg-orange-500", text: "text-white" },
  { quality: 4, label: "Good", color: "bg-blue-500", text: "text-white" },
  { quality: 5, label: "Easy", color: "bg-[#58CC02]", text: "text-white" },
];

export default function Flashcards() {
  const navigate = useNavigate();
  const { isDemoMode, demoUser, updateDemoUser } = useDemo();
  const [sessionCards, setSessionCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    const due = getDueCards(FLASHCARD_TERMS);
    setSessionCards(due.length > 0 ? due : FLASHCARD_TERMS.slice(0, 10));
  }, []);

  const handleRate = async (quality) => {
    const card = sessionCards[currentIndex];
    saveProgress(card.term, quality);
    const newTotal = xpEarned + XP_PER_CARD;
    setXpEarned(newTotal);

    if (currentIndex + 1 >= sessionCards.length) {
      setSessionComplete(true);
      // Award XP
      try {
        if (isDemoMode && updateDemoUser) {
          updateDemoUser({
            xp_total: (demoUser?.xp_total || 0) + newTotal,
            daily_xp_earned_today: (demoUser?.daily_xp_earned_today || 0) + newTotal,
          });
        } else {
          const user = await base44.auth.me();
          if (user) {
            await base44.auth.updateMe({
              xp_total: (user.xp_total || 0) + newTotal,
            });
          }
        }
      } catch (e) {
        console.error("XP award error:", e);
      }
    } else {
      setCurrentIndex(i => i + 1);
      setIsFlipped(false);
    }
  };

  if (sessionCards.length === 0 && !sessionComplete) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">📚</div>
          <p className="text-lg font-bold text-foreground">No cards due right now!</p>
          <p className="text-sm text-muted-foreground">Come back later for more practice.</p>
          <button onClick={() => navigate("/learn")} className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const stats = getStats(FLASHCARD_TERMS);
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[#58CC02]/10 flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-[#58CC02]" />
          </motion.div>

          <div>
            <h1 className="text-2xl font-black text-foreground">Session Complete!</h1>
            <p className="text-sm text-muted-foreground mt-1">You reviewed {sessionCards.length} cards</p>
          </div>

          <div className="bg-[#58CC02]/10 rounded-2xl p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">XP Earned</p>
            <p className="text-4xl font-black text-[#58CC02]">+{xpEarned}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground">Due</p>
              <p className="text-lg font-black text-foreground">{stats.due}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground">Learning</p>
              <p className="text-lg font-black text-foreground">{stats.learning}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground">Mastered</p>
              <p className="text-lg font-black text-foreground">{stats.mastered}</p>
            </div>
          </div>

          <button onClick={() => navigate("/learn")} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm">
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  const card = sessionCards[currentIndex];
  const progressPercent = ((currentIndex + (isFlipped ? 1 : 0)) / sessionCards.length) * 100;

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 pt-safe-area-top select-none">
        <button onClick={() => navigate("/learn")} className="text-muted-foreground select-none">
          <X className="w-5 h-5" />
        </button>
        <Progress value={progressPercent} className="flex-1 h-2.5" />
        <span className="text-xs font-bold text-muted-foreground select-none">
          {currentIndex + 1}/{sessionCards.length}
        </span>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md"
          >
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full text-left"
            >
              <div
                className="min-h-[320px] rounded-3xl border border-border p-6 flex flex-col justify-between cursor-pointer select-none"
                style={{
                  background: isFlipped
                    ? "linear-gradient(135deg, rgba(88,204,2,0.08), rgba(56,189,248,0.08))"
                    : "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                {/* Front: term */}
                {!isFlipped ? (
                  <>
                    <div>
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#58CC02] bg-[#58CC02]/10 px-3 py-1 rounded-full">
                        {card.category}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center py-8">
                      <div className="text-5xl mb-4">{card.emoji}</div>
                      <h2 className="text-3xl font-black text-foreground text-center">{card.term}</h2>
                    </div>
                    <p className="text-center text-xs text-muted-foreground font-bold">
                      Tap to reveal definition 👆
                    </p>
                  </>
                ) : (
                  /* Back: definition */
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{card.emoji}</span>
                      <h3 className="text-lg font-black text-foreground">{card.term}</h3>
                    </div>
                    <div className="flex-1 py-4">
                      <p className="text-sm text-foreground leading-relaxed">{card.definition}</p>
                      <div className="mt-4 p-3 rounded-xl bg-muted/50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Example</p>
                        <p className="text-xs text-foreground leading-relaxed">{card.example}</p>
                      </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground font-bold">
                      How well did you know this?
                    </p>
                  </>
                )}
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating buttons */}
      <div className="sticky bottom-0 z-50 bg-background/90 backdrop-blur-md px-4 py-4 pb-safe-area-bottom">
        {isFlipped ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-2 max-w-md mx-auto"
          >
            {RATINGS.map(rating => (
              <button
                key={rating.label}
                onClick={() => handleRate(rating.quality)}
                className={`${rating.color} ${rating.text} py-3 rounded-2xl font-black text-xs select-none active:scale-95 transition-transform`}
              >
                {rating.label}
              </button>
            ))}
          </motion.div>
        ) : (
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setIsFlipped(true)}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm select-none active:scale-95 transition-transform"
            >
              Show Definition
            </button>
          </div>
        )}
      </div>
    </div>
  );
}