import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Lightbulb } from "lucide-react";

export default function QuizQuestion({ question, onAnswer, index, total }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showContinue, setShowContinue] = useState(false);

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
    setShowContinue(true);
  };

  const options = question.type === "true_false" ? ["True ✅", "False ❌"] : question.options || [];

  const getOptionStyle = (i) => {
    if (!submitted) {
      if (selected === i) return {
        border: "2px solid hsl(155 100% 50%)",
        background: "hsl(155 100% 50% / 0.1)",
      };
      return {
        border: "2px solid hsl(var(--border))",
        background: "hsl(var(--card))",
      };
    }
    let isCorrectOption = question.type === "true_false" ? (i === 0) === question.answer : i === question.answer;
    let isWrongOption = selected === i && !isCorrectOption;
    if (isCorrectOption) return { border: "2px solid #22c55e", background: "#22c55e15" };
    if (isWrongOption) return { border: "2px solid #ef4444", background: "#ef444415" };
    return { border: "2px solid hsl(var(--border))", background: "hsl(var(--card))", opacity: 0.4 };
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex-1 flex flex-col py-6 gap-5"
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">
            Question {index + 1} / {total}
          </span>
          {question.type === "true_false" && (
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
              style={{ background: "hsl(42 100% 50% / 0.15)", color: "hsl(42 100% 45%)" }}>
              TRUE / FALSE
            </span>
          )}
          {question.type === "fill_blank" && (
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
              style={{ background: "hsl(263 70% 52% / 0.15)", color: "hsl(263 70% 52%)" }}>
              FILL IN
            </span>
          )}
        </div>

        {/* Question text */}
        <div className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
            style={{ background: "hsl(155 100% 50%)", transform: "translate(30%, -30%)" }} />
          <p className="text-[10px] font-black tracking-widest uppercase text-primary mb-2">❓ QUESTION</p>
          <h2 className="text-lg font-black text-foreground leading-snug">{question.q}</h2>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2.5 flex-1">
        {options.map((option, i) => {
          let isCorrectOption = question.type === "true_false" ? (i === 0) === question.answer : i === question.answer;
          let isWrongOption = submitted && selected === i && !isCorrectOption;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: submitted ? 1 : 0.97 }}
              onClick={() => handleSelect(i)}
              className="w-full text-left rounded-2xl transition-all duration-200"
              style={getOptionStyle(i)}
            >
              <div className="flex items-center gap-3 p-4">
                {/* Letter badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                  submitted && isCorrectOption ? "bg-green-500 text-white" :
                  submitted && isWrongOption ? "bg-red-500 text-white" :
                  selected === i && !submitted ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {submitted && isCorrectOption ? <Check className="w-4 h-4" /> :
                   submitted && isWrongOption ? <X className="w-4 h-4" /> :
                   String.fromCharCode(65 + i)}
                </div>
                <span className={`font-semibold text-sm flex-1 ${
                  submitted && isCorrectOption ? "text-green-400" :
                  submitted && isWrongOption ? "text-red-400" :
                  "text-foreground"
                }`}>
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation after submit */}
      <AnimatePresence>
        {submitted && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 flex gap-3"
            style={{
              background: isCorrect ? "#22c55e10" : "#ef444410",
              border: `1px solid ${isCorrect ? "#22c55e30" : "#ef444430"}`
            }}
          >
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: isCorrect ? "#22c55e" : "#f97316" }} />
            <div>
              <p className="text-[10px] font-black uppercase mb-1" style={{ color: isCorrect ? "#22c55e" : "#f97316" }}>
                {isCorrect ? "✅ Correct!" : "💡 Here's why"}
              </p>
              <p className="text-xs text-foreground leading-relaxed">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button after submit */}
      <AnimatePresence>
        {showContinue && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAnswer(isCorrect)}
            className="w-full h-12 rounded-2xl font-bold text-base transition-all"
            style={{ background: "hsl(155 100% 50%)", color: "hsl(var(--primary-foreground))" }}
          >
            CONTINUE
          </motion.button>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <AnimatePresence>
        {!submitted && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full h-12 rounded-2xl font-bold text-base transition-all"
            style={selected !== null
              ? { background: "hsl(155 100% 50%)", color: "hsl(var(--primary-foreground))" }
              : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", cursor: "not-allowed" }
            }
          >
            CHECK ANSWER
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}