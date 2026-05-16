import React from "react";
import { Zap } from "lucide-react";
import { getLevelTitle } from "@/lib/lessonData";

export default function XpBadge({ xp = 0, level = 1 }) {
  const { title, emoji } = getLevelTitle(level);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full">
        <Zap className="w-3 h-3 fill-primary" />
        <span className="text-xs font-bold">{xp.toLocaleString()} XP</span>
      </div>
      <div className="text-xs text-muted-foreground font-medium">
        {emoji} Lvl {level} · {title}
      </div>
    </div>
  );
}