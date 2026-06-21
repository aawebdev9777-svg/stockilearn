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
    <div className="rounded-3xl border border-white/50 p-4 space-y-3" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <h3 className="text-sm font-bold text-gray-800">Market News</h3>
      <div className="space-y-2">
        {NEWS_ITEMS.map((item, i) => (
          <div key={i} className="p-3 rounded-2xl border border-white/50 bg-white/40">
            <p className="text-xs text-gray-800 leading-relaxed">{item.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                item.tag === "BULLISH" ? "bg-green-100 text-green-700" :
                item.tag === "BEARISH" ? "bg-red-100 text-red-600" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {item.tag === "BULLISH" ? "🟢" : item.tag === "BEARISH" ? "🔴" : "🟡"} {item.tag}
              </span>
              <span className="text-[10px] text-gray-400">Summarised by StockMark AI</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}