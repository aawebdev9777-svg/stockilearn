import React from "react";
import { Card } from "@/components/ui/card";

const NEWS_ITEMS = [
  { text: "Tech stocks rallied today as AI companies reported record revenue growth. NVDA led gains.", tag: "BULLISH", tagColor: "text-green-400" },
  { text: "Federal Reserve signals possible rate cut in September, boosting market optimism.", tag: "BULLISH", tagColor: "text-green-400" },
  { text: "Oil prices fell 3% on weaker global demand outlook, dragging energy stocks lower.", tag: "BEARISH", tagColor: "text-red-400" },
  { text: "Consumer spending data came in flat, mixed signals for retail sector stocks.", tag: "NEUTRAL", tagColor: "text-yellow-400" },
  { text: "Major bank earnings beat expectations, financial sector sees broad lift across the board.", tag: "BULLISH", tagColor: "text-green-400" },
];

export default function NewsFeed() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-foreground">Market News</h3>
      <div className="space-y-2">
        {NEWS_ITEMS.map((item, i) => (
          <Card key={i} className="p-3 bg-card/80 border border-border/50">
            <p className="text-xs text-foreground/90 leading-relaxed">{item.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-[10px] font-bold ${item.tagColor}`}>
                {item.tag === "BULLISH" ? "🟢" : item.tag === "BEARISH" ? "🔴" : "🟡"} {item.tag}
              </span>
              <span className="text-[10px] text-muted-foreground">Summarised by StockMark AI</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}