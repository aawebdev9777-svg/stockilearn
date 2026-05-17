import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useDemo, DEMO_LESSON_PROGRESS } from "@/lib/DemoContext";
import { motion } from "framer-motion";
import { UNITS, LESSONS, getLessonsForUnit } from "@/lib/lessonData";
import SkillNode from "@/components/learn/SkillNode";

export default function Learn() {
  const { isDemoMode } = useDemo();
  const { data: progressData = [] } = useQuery({
    queryKey: ["lesson-progress"],
    queryFn: () => isDemoMode ? Promise.resolve(DEMO_LESSON_PROGRESS) : base44.entities.LessonProgress.list(),
    initialData: isDemoMode ? DEMO_LESSON_PROGRESS : [],
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
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-black text-foreground mb-6">Learn</h1>

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
              <div className="flex items-center gap-3 mb-4 px-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${unit.color}20` }}
                >
                  {unit.icon}
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    Unit {unit.id}
                  </p>
                  <p className="text-sm font-bold text-foreground">{unit.title}</p>
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