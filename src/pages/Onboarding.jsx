import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useDemo } from "@/lib/DemoContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LESSONS } from "@/lib/lessonData";

const GOALS = [
  { emoji: "📈", label: "Understand the stock market" },
  { emoji: "💰", label: "Learn to invest wisely" },
  { emoji: "🚀", label: "Get better returns" },
  { emoji: "🧠", label: "Understand financial news" },
  { emoji: "🎓", label: "Prepare for a finance career" },
  { emoji: "🤷", label: "I'm just curious!" },
];

const LEVELS = [
  { id: "newbie", emoji: "🐣", label: "NEWBIE", desc: "A stock is... something to do with money?" },
  { id: "some_knowledge", emoji: "📊", label: "SOME KNOWLEDGE", desc: "I know what a P/E ratio is, roughly." },
  { id: "experienced", emoji: "🎓", label: "EXPERIENCED", desc: "I've invested before but want to sharpen up." },
];

const DAILY_GOALS = [
  { emoji: "⚡", label: "CASUAL", desc: "5 min/day · ~1 lesson", xp: 10 },
  { emoji: "📚", label: "REGULAR", desc: "10 min/day · ~2 lessons", xp: 20 },
  { emoji: "💪", label: "SERIOUS", desc: "15 min/day · ~3 lessons", xp: 50 },
  { emoji: "🚀", label: "INTENSE", desc: "30 min/day · ~5 lessons", xp: 100 },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { isDemoMode } = useDemo();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [level, setLevel] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(null);

  const handleComplete = async () => {
    if (isDemoMode) { navigate("/home"); return; }
    try {
      await base44.auth.updateMe({
        goal_type: goal,
        knowledge_level: level,
        daily_goal_xp: dailyGoal,
        onboarding_complete: true,
        dark_mode: true,
      });

      // Pre-unlock lessons based on knowledge level
      const unitsToSkip = level === "experienced" ? [1, 2] : level === "some_knowledge" ? [1] : [];
      if (unitsToSkip.length > 0) {
        const lessonsToComplete = LESSONS.filter(l => unitsToSkip.includes(l.unit));
        await Promise.all(lessonsToComplete.map(l =>
          base44.entities.LessonProgress.create({
            lesson_id: l.id,
            unit_id: l.unit,
            status: "complete",
            score_percent: 100,
            xp_earned: 0,
            completed_at: new Date().toISOString(),
            attempts_count: 1,
          })
        ));
      }
    } catch (e) {
      console.error(e);
    }
    navigate("/home");
  };

  const screens = [
    // Screen 0 - Splash
    <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-8">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-7xl"
      >
        📈
      </motion.div>
      <div>
        <h1 className="text-3xl font-black text-foreground">V<span className="text-primary">stock</span></h1>
        <p className="text-lg font-bold text-primary mt-2">Turn confusion into confidence.</p>
        <p className="text-sm text-muted-foreground mt-1">Learn investing the fun way.</p>
      </div>
      <Button onClick={() => setStep(1)} className="w-full max-w-xs h-14 rounded-2xl text-lg font-black gap-2">
        LET'S GO <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>,

    // Screen 1 - Goal
    <motion.div key="goal" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col px-6 pt-12 gap-6">
      <div>
        <p className="text-xs text-primary font-bold uppercase tracking-wider">Step 1 of 4</p>
        <h2 className="text-2xl font-black text-foreground mt-2">What's your goal?</h2>
      </div>
      <div className="space-y-3">
        {GOALS.map((g) => (
          <motion.button key={g.label} whileTap={{ scale: 0.97 }}
            onClick={() => setGoal(g.label)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 text-left transition-all ${
              goal === g.label ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}>
            <span className="text-2xl">{g.emoji}</span>
            <span className="text-sm font-bold text-foreground">{g.label}</span>
          </motion.button>
        ))}
      </div>
      <Button onClick={() => setStep(2)} disabled={!goal} className="w-full h-12 rounded-2xl text-base font-bold mt-auto mb-8">
        Next <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>,

    // Screen 2 - Knowledge Level
    <motion.div key="level" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col px-6 pt-12 gap-6">
      <div>
        <p className="text-xs text-primary font-bold uppercase tracking-wider">Step 2 of 4</p>
        <h2 className="text-2xl font-black text-foreground mt-2">How much do you know?</h2>
      </div>
      <div className="space-y-3">
        {LEVELS.map((l) => (
          <motion.button key={l.id} whileTap={{ scale: 0.97 }}
            onClick={() => setLevel(l.id)}
            className={`w-full p-5 rounded-2xl border-2 flex flex-col items-center gap-2 text-center transition-all ${
              level === l.id ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}>
            <span className="text-4xl">{l.emoji}</span>
            <span className="text-sm font-black text-foreground">{l.label}</span>
            <span className="text-xs text-muted-foreground">{l.desc}</span>
          </motion.button>
        ))}
      </div>
      <Button onClick={() => setStep(3)} disabled={!level} className="w-full h-12 rounded-2xl text-base font-bold mt-auto mb-8">
        Next <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>,

    // Screen 3 - Daily Goal
    <motion.div key="daily" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col px-6 pt-12 gap-6">
      <div>
        <p className="text-xs text-primary font-bold uppercase tracking-wider">Step 3 of 4</p>
        <h2 className="text-2xl font-black text-foreground mt-2">Set your daily goal</h2>
      </div>
      <div className="space-y-3">
        {DAILY_GOALS.map((d) => (
          <motion.button key={d.label} whileTap={{ scale: 0.97 }}
            onClick={() => setDailyGoal(d.xp)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
              dailyGoal === d.xp ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}>
            <span className="text-2xl">{d.emoji}</span>
            <div className="text-left">
              <span className="text-sm font-black text-foreground">{d.label}</span>
              <p className="text-xs text-muted-foreground">{d.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <Button onClick={() => setStep(4)} disabled={!dailyGoal} className="w-full h-12 rounded-2xl text-base font-bold mt-auto mb-8">
        Next <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>,

    // Screen 4 - Meet Bruno
    <motion.div key="bruno" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6">
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-8xl"
      >
        🐂
      </motion.div>
      <div>
        <h2 className="text-2xl font-black text-foreground">Meet Bruno!</h2>
        <div className="mt-4 bg-card border border-border rounded-2xl p-4 max-w-sm relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
          <p className="text-sm text-foreground leading-relaxed">
            "I'll be your guide. I'm a bull — but I'll teach you to survive the bears too. Let's get started! 🚀"
          </p>
        </div>
      </div>
      <Button onClick={handleComplete} className="w-full max-w-xs h-14 rounded-2xl text-lg font-black gap-2">
        START LEARNING <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnimatePresence mode="wait">
        {screens[step]}
      </AnimatePresence>
    </div>
  );
}