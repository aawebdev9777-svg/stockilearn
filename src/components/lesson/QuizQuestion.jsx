import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

export default function QuizQuestion({ question, onAnswer, index, total }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelect = (optionIndex) => {
    if (submitted) return;
    setSelected(optionIndex);
  };

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    setSubmitted(true);

    let correct = false;
    if (question.type === "multiple_choice" || question.type === "fill_blank") {
      correct = selected === question.answer;
    } else if (question.type === "true_false") {
      correct = (selected === 0) === question.answer;
    }
    setIsCorrect(correct);
    setTimeout(() => onAnswer(correct), 1200);
  };

  const options = question.type === "true_false" ? ["True", "False"] : question.options || [];

  const typeLabel = question.type === "true_false" ? "TRUE OR FALSE" :
    question.type === "fill_blank" ? "FILL IN THE BLANK" : "MULTIPLE CHOICE";

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="flex-1 flex flex-col py-6 gap-5"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}
          >
            {typeLabel}
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold ml-auto">
            {index + 1} / {total}
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-black text-foreground leading-snug"
        >
          {question.q}
        </motion.h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 flex-1">
        {options.map((option, i) => {
          let correctOption = false;
          let wrongOption = false;
          if (submitted) {
            if (question.type === "true_false") {
              correctOption = (i === 0) === question.answer;
            } else {
              correctOption = i === question.answer;
            }
            wrongOption = selected === i && !correctOption;
          }

          const isSelected = selected === i;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              whileTap={!submitted ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(i)}
              className="w-full text-left rounded-2xl border-2 transition-all relative overflow-hidden"
              style={{
                padding: "16px 18px",
                borderColor: submitted && correctOption
                  ? "hsl(142 70% 45%)"
                  : submitted && wrongOption
                  ? "hsl(0 80% 63%)"
                  : isSelected
                  ? "hsl(var(--primary))"
                  : "hsl(var(--border))",
                background: submitted && correctOption
                  ? "hsl(142 70% 45% / 0.1)"
                  : submitted && wrongOption
                  ? "hsl(0 80% 63% / 0.1)"
                  : isSelected
                  ? "hsl(var(--primary)/0.1)"
                  : "hsl(var(--card))",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Letter bubble */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-all"
                  style={{
                    background: submitted && correctOption
                      ? "hsl(142 70% 45%)"
                      : submitted && wrongOption
                      ? "hsl(0 80% 63%)"
                      : isSelected
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                    color: (submitted && (correctOption || wrongOption)) || isSelected
                      ? "white"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {submitted && correctOption ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : submitted && wrongOption ? (
                    <X className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </div>
                <span
                  className="font-semibold text-sm leading-snug"
                  style={{
                    color: submitted && correctOption
                      ? "hsl(142 70% 35%)"
                      : submitted && wrongOption
                      ? "hsl(0 80% 55%)"
                      : "hsl(var(--foreground))",
                  }}
                >
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: isCorrect ? "hsl(142 70% 45% / 0.12)" : "hsl(0 80% 63% / 0.12)",
              border: `1.5px solid ${isCorrect ? "hsl(142 70% 45% / 0.4)" : "hsl(0 80% 63% / 0.4)"}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: isCorrect ? "hsl(142 70% 45%)" : "hsl(0 80% 63%)" }}
            >
              {isCorrect
                ? <Check className="w-5 h-5 text-white" strokeWidth={3} />
                : <X className="w-5 h-5 text-white" strokeWidth={3} />}
            </div>
            <div>
              <p className="font-black text-sm" style={{ color: isCorrect ? "hsl(142 70% 35%)" : "hsl(0 80% 50%)" }}>
                {isCorrect ? "Correct! 🎉" : "Not quite!"}
              </p>
              {!isCorrect && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Correct answer: {options[question.answer]}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check button */}
      {!submitted && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full h-14 rounded-2xl font-black text-base transition-all"
          style={{
            background: selected !== null ? "hsl(var(--primary))" : "hsl(var(--muted))",
            color: selected !== null ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
            boxShadow: selected !== null ? "0 4px 20px hsl(var(--primary)/0.35)" : "none",
            cursor: selected === null ? "not-allowed" : "pointer",
          }}
        >
          CHECK ANSWER
        </motion.button>
      )}
    </motion.div>
  );
}