import React from "react";
import { Heart } from "lucide-react";

export default function HeartsDisplay({ hearts = 5, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Heart
          key={i}
          className={`w-4 h-4 ${
            i < hearts
              ? "fill-red-500 text-red-500"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}