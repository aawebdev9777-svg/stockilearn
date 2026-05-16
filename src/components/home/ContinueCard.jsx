import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ContinueCard({ lesson, progress = 30 }) {
  if (!lesson) {
    return (
      <Link to="/learn">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Ready to learn?</p>
              <p className="text-base font-bold text-foreground mt-1">Start Today's Lesson</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/learn/lesson/${lesson.id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-4"
      >
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Continue where you left off</p>
        <p className="text-base font-bold text-foreground mt-1">{lesson.title}</p>
        <div className="mt-3 flex items-center gap-3">
          <Progress value={progress} className="flex-1 h-2" />
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}