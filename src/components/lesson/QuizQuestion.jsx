import React, { useState } from "react";
import { motion } from "framer-motion";

export default function QuizQuestion({ question, onAnswer, index, total }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (optionIndex) => {
    if (submitted) return;
    setSelected(optionIndex);
  };

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    setSubmitted(true);

    let isCorrect = false;
    if (question.type === "multiple_choice" || question.type === "fill_blank") {
      isCorrect = selected === question.answer;
    } else if (question.type === "true_false") {
      isCorrect = (selected === 0) === question.answer;
    }

    setTimeout(() => onAnswer(isCorrect), 600);
  };

  const options = question.type === "true_false"
    ? ["True", "False"]
    : question.options || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex-1 flex flex-col py-8 gap-6"
    >
      <div>
        <p className="text-xs text-muted-foreground font-bold uppercase mb-2">
          Question {index + 1} of {total}
        </p>
        <h2 className="text-lg font-black text-foreground leading-snug">
          {question.q}
        </h2>
      </div>

      <div className="space-y-3 flex-1">
        {options.map((option, i) => {
          const isSelected = selected === i;
          let isCorrectOption = false;
          let isWrongOption = false;

          if (submitted) {
            if (question.type === "true_false") {
              isCorrectOption = (i === 0) === question.answer;
            } else {
              isCorrectOption = i === question.answer;
            }
            isWrongOption = isSelected && !isCorrectOption;
          }

          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-semibold text-sm ${
                submitted && isCorrectOption
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : submitted && isWrongOption
                  ? "border-red-500 bg-red-500/10 text-red-400 animate-[shake_0.3s_ease-in-out]"
                  : isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
              {option}
            </motion.button>
          );
        })}
      </div>

      {!submitted && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full h-12 rounded-2xl font-bold text-base transition-all ${
            selected !== null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          CHECK
        </motion.button>
      )}
    </motion.div>
  );
}