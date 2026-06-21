import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDemo, getDemoLessonProgress } from "@/lib/DemoContext";
import { motion } from "framer-motion";
import { UNITS, LESSONS, getLessonsForUnit } from "@/lib/lessonData";
import { FLASHCARD_TERMS } from "@/lib/flashcardData";
import { getStats } from "@/lib/spacedRepetition";
import SkillNode from "@/components/learn/SkillNode";

export default function Learn() {
  const { isDemoMode } = useDemo();
  const [userId, setUserId] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isDemoMode) base44.auth.me().then(u => setUserId(u?.id)).catch(() => {});
  }, [isDemoMode]);

  // Refetch progress on mount, focus, and when lesson progress changes
  useEffect(() => {
    const onFocus = () => queryClient.invalidateQueries({ queryKey: ["lesson-progress"] });
    const onProgressChange = () => queryClient.invalidateQueries({ queryKey: ["lesson-progress"] });
    window.addEventListener("focus", onFocus);
    window.addEventListener("lesson-progress-changed", onProgressChange);
    queryClient.invalidateQueries({ queryKey: ["lesson-progress"] });
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("lesson-progress-changed", onProgressChange);
    };
  }, [queryClient]);

  const { data: progressData = [] } = useQuery({
    queryKey: ["lesson-progress", userId],
    queryFn: () => isDemoMode ? Promise.resolve(getDemoLessonProgress()) : base44.entities.LessonProgress.filter({ created_by_id: userId }),
    enabled: isDemoMode || !!userId,
    initialData: isDemoMode ? getDemoLessonProgress() : [],
  });

  const completedIds = progressData.filter(p => p.status === "complete").map(p => p.lesson_id);
  const inProgressIds = progressData.filter(p => p.status === "in_progress").map(p => p.lesson_id);

  function getStatus(lessonId, index, unitLessons) {
    if (completedIds.includes(lessonId)) return "complete";
    if (inProgressIds.includes(lessonId)) return "in_progress";
    // First lesson of first unit is always available
    if (lessonId === "1.1") return "available";
    // Available if previous lesson is complete
    const prevLesson = index > 0 ? unitLessons[index - 1] : null;
    if (prevLesson && completedIds.includes(prevLesson.id)) return "available";
    // Check if last lesson of previous unit is complete
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      const unitIndex = UNITS.findIndex(u => u.id === lesson.unit);
      if (unitIndex > 0) {
        const prevUnitLessons = getLessonsForUnit(UNITS[unitIndex - 1].id);
        const lastPrevLesson = prevUnitLessons[prevUnitLessons.length - 1];
        if (lastPrevLesson && completedIds.includes(lastPrevLesson.id) && index === 0) {
          return "available";
        }
      }
    }
    return "locked";
  }

  return (
    <div className="px-4 pt-6 pb-4 min-h-screen">
      <div className="mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Your Journey</p>
        <h1 className="text-2xl font-black text-gray-900 mt-0.5">Learn</h1>
      </div>

      {/* Flashcard Practice */}
      <Link to="/flashcards" className="block mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-4 p-4 rounded-2xl border border-white/50"
          style={{ background: "linear-gradient(135deg, rgba(88,204,2,0.08), rgba(56,189,248,0.08))", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#58CC02]/10 flex items-center justify-center text-2xl shrink-0">
            🃏
          </div>
          <div className="flex-1">
            <p className="text-base font-black text-foreground">Flashcard Practice</p>
            <p className="text-xs text-muted-foreground">
              {getStats(FLASHCARD_TERMS).due > 0
                ? `${getStats(FLASHCARD_TERMS).due} cards due for review`
                : `${FLASHCARD_TERMS.length} terms to learn — start your first session`}
            </p>
          </div>
          <div className="text-[#58CC02] font-black text-lg">→</div>
        </motion.div>
      </Link>

      <div className="space-y-8">
        {UNITS.map((unit) => {
          const unitLessons = getLessonsForUnit(unit.id);
          if (unitLessons.length === 0) return null;

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: unit.id * 0.1 }}
            >
              {/* Unit Header */}
              <div className="flex items-center gap-3 mb-4 px-2 py-3 rounded-2xl border border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${unit.color}20` }}
                >
                  {unit.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">
                    Unit {unit.id}
                  </p>
                  <p className="text-base font-black text-gray-900">{unit.title}</p>
                </div>
              </div>

              {/* Skill Path */}
              <div className="flex flex-col items-center relative">
                {/* Path line */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-border/50 z-0" />

                {unitLessons.map((lesson, idx) => (
                  <div key={lesson.id} className="relative z-10">
                    <SkillNode
                      lesson={lesson}
                      status={getStatus(lesson.id, idx, unitLessons)}
                      index={idx}
                      unitColor={unit.color}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}