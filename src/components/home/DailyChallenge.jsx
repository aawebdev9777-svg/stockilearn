import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { getTodaysChallenge } from "@/lib/dailyChallenges";
import { useDemo } from "@/lib/DemoContext";
import { Zap, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DailyChallenge() {
  const { isDemoMode } = useDemo();
  const challenge = getTodaysChallenge();
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (isDemoMode) return;
    base44.entities.DailyChallenge.filter({ challenge_date: today })
      .then(records => {
        if (records.length > 0 && records[0].completed) {
          setAlreadyDone(true);
          setSubmitted(true);
        }
      })
      .catch(() => {});
  }, [isDemoMode, today]);

  const handleSubmit = async () => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    const correct = selected === challenge.answer;

    if (!isDemoMode) {
      try {
        const existing = await base44.entities.DailyChallenge.filter({ challenge_date: today });
        if (existing.length === 0) {
          await base44.entities.DailyChallenge.create({
            challenge_date: today,
            completed: true,
            xp_earned: correct ? challenge.xp : 0,
            challenge_type: "quiz",
            score: correct ? 100 : 0,
          });
          if (correct) {
            const user = await base44.auth.me();
            if (user) {
              await base44.auth.updateMe({
                xp_total: (user.xp_total || 0) + challenge.xp,
              });
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (alreadyDone) {
    return (
      <div className="p-3 rounded-3xl border border-white/50 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
        <div>
          <p className="text-xs font-bold text-foreground">Daily Challenge — Done! ✅</p>
          <p className="text-[10px] text-muted-foreground">Come back tomorrow for a new question.</p>
        </div>
        <span className="ml-auto text-xs font-black text-primary">+{challenge.xp} XP</span>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/50 overflow-hidden" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/20 transition-colors"
      >
        <Zap className="w-4 h-4 text-amber-400" />
        <div className="text-left flex-1">
          <p className="text-xs font-black text-foreground">Daily Challenge</p>
          <p className="text-[10px] text-muted-foreground">+{challenge.xp} XP · New question every day</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-400/10 text-amber-400">
          {submitted ? "Done" : "New!"}
        </span>
      </button>

      <AnimatePresence>
        {true && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <p className="text-sm font-bold text-foreground leading-snug">{challenge.q}</p>
              <div className="space-y-2">
                {challenge.options.map((opt, i) => {
                  let cls = "bg-white/50 border-white/60 hover:bg-white/70";
                  if (submitted) {
                    if (i === challenge.answer) cls = "bg-green-100/80 border-green-300 text-green-700";
                    else if (i === selected && i !== challenge.answer) cls = "bg-red-100/80 border-red-300 text-red-600";
                    else cls = "bg-white/30 border-white/40 text-gray-400";
                  } else if (selected === i) {
                    cls = "bg-cyan-100/70 border-cyan-300";
                  }
                  return (
                    <button
                      key={i}
                      disabled={submitted}
                      onClick={() => setSelected(i)}
                      className={`w-full text-left text-sm font-medium px-4 py-3 rounded-2xl border transition-colors ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs rounded-xl p-3 ${
                    selected === challenge.answer
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  <p className="font-black mb-0.5">
                    {selected === challenge.answer ? "✅ Correct!" : "❌ Not quite!"}
                  </p>
                  <p className="text-[11px] opacity-90">{challenge.explanation}</p>
                </motion.div>
              )}
              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={selected === null}
                  className="w-full py-3 rounded-2xl text-sm font-black bg-white/70 text-gray-800 border border-white/60 disabled:opacity-40 transition-opacity hover:bg-white/90"
                >
                  Submit Answer
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}