import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import { SCENARIOS } from "@/lib/scenarioData";

export default function Scenarios() {
  const navigate = useNavigate();
  const [activeScenario, setActiveScenario] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [totalXp, setTotalXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const startScenario = (scenario) => {
    setActiveScenario(scenario);
    setStepIndex(0);
    setSelectedChoice(null);
    setShowOutcome(false);
    setTotalXp(0);
    setCorrectCount(0);
  };

  const handleChoice = (choiceIndex) => {
    if (showOutcome) return;
    setSelectedChoice(choiceIndex);
    setShowOutcome(true);
    const choice = activeScenario.steps[stepIndex].choices[choiceIndex];
    if (choice.correct) {
      setCorrectCount((c) => c + 1);
    }
    setTotalXp((xp) => xp + choice.xp);
  };

  const handleNext = () => {
    if (stepIndex < activeScenario.steps.length - 1) {
      setStepIndex((i) => i + 1);
      setSelectedChoice(null);
      setShowOutcome(false);
    } else {
      // Finished
      setActiveScenario(null);
    }
  };

  // ── Scenario List View ──
  if (!activeScenario) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 pt-safe-area-top select-none">
          <button onClick={() => navigate(-1)} className="text-foreground select-none">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-foreground">Scenarios</h2>
        </div>

        <div className="px-4 pb-4 max-w-lg mx-auto">
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Learn by Doing</p>
            <h1 className="text-2xl font-black text-foreground mt-0.5">Market Scenarios</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Step into history's biggest market events. Make decisions, see what happened, and learn the lessons.
            </p>
          </div>

          <div className="space-y-3">
            {SCENARIOS.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startScenario(s)}
                className="w-full text-left p-5 rounded-2xl border border-border/50 bg-card/80 flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${s.color}20` }}
                >
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: s.color }}>
                      {s.year}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Active Scenario View ──
  const step = activeScenario.steps[stepIndex];
  const isLastStep = stepIndex === activeScenario.steps.length - 1;
  const progress = ((stepIndex + (showOutcome ? 1 : 0)) / activeScenario.steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 pt-safe-area-top select-none">
        <button
          onClick={() => setActiveScenario(null)}
          className="text-foreground select-none"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: activeScenario.color }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-black text-muted-foreground">
          {stepIndex + 1}/{activeScenario.steps.length}
        </span>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          {!showOutcome ? (
            // ── Question ──
            <motion.div
              key={`step-${stepIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{activeScenario.emoji}</div>
                <h2 className="text-lg font-black text-foreground leading-tight">{step.prompt}</h2>
              </div>

              {step.context && (
                <div className="p-3 rounded-xl bg-muted/50 mb-5">
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.context}</p>
                </div>
              )}

              <div className="space-y-3">
                {step.choices.map((choice, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChoice(i)}
                    className="w-full text-left p-4 rounded-2xl border-2 border-border bg-card text-sm font-bold text-foreground hover:border-primary transition-colors"
                  >
                    {choice.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // ── Outcome ──
            <motion.div
              key={`outcome-${stepIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    step.choices[selectedChoice].correct
                      ? "bg-primary text-primary-foreground"
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {step.choices[selectedChoice].correct ? (
                    <Check className="w-8 h-8" strokeWidth={3} />
                  ) : (
                    <X className="w-8 h-8" strokeWidth={3} />
                  )}
                </motion.div>
                <p className="text-sm font-black text-foreground">
                  {step.choices[selectedChoice].correct ? "Great decision!" : "Not quite..."}
                </p>
                {step.choices[selectedChoice].xp > 0 && (
                  <p className="text-xs font-black text-primary mt-1">+{step.choices[selectedChoice].xp} XP</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/50 mb-4">
                <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2">
                  You chose: "{step.choices[selectedChoice].text}"
                </p>
                <p className="text-sm text-foreground leading-relaxed">{step.choices[selectedChoice].outcome}</p>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1.5">💡 Lesson</p>
                <p className="text-sm text-foreground leading-relaxed">{step.lesson}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                {isLastStep ? (
                  <>
                    <Trophy className="w-5 h-5" /> See Results
                  </>
                ) : (
                  <>
                    Next Decision <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Results overlay ── */}
      <AnimatePresence>
        {showOutcome && isLastStep && (
          <ResultsOverlay
            scenario={activeScenario}
            totalXp={totalXp}
            correctCount={correctCount}
            totalSteps={activeScenario.steps.length}
            onReplay={() => startScenario(activeScenario)}
            onBack={() => setActiveScenario(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultsOverlay({ scenario, totalXp, correctCount, totalSteps, onReplay, onBack }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const accuracy = Math.round((correctCount / totalSteps) * 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="max-w-sm w-full bg-card rounded-3xl border border-border p-8 text-center space-y-4"
          >
            <div className="text-5xl">{accuracy >= 67 ? "🏆" : accuracy >= 33 ? "📈" : "📚"}</div>
            <div>
              <h2 className="text-xl font-black text-foreground">Scenario Complete!</h2>
              <p className="text-xs text-muted-foreground mt-1">{scenario.title}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 py-2">
              <div>
                <p className="text-2xl font-black text-primary">{totalXp}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">XP Earned</p>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{correctCount}/{totalSteps}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{accuracy}%</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Accuracy</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onReplay}
                className="flex-1 h-12 rounded-2xl border-2 border-border text-sm font-black text-foreground flex items-center justify-center gap-2 hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retry
              </button>
              <button
                onClick={onBack}
                className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                More Scenarios
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}