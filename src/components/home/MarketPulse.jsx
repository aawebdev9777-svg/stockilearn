import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import MiniSparkline from "@/components/common/MiniSparkline";
import { getIndices, generateSparkline } from "@/lib/stockData";

export default function MarketPulse() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const indices = useMemo(() => getIndices(), [refreshKey]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Market Pulse</h3>
        <button
          onClick={() => setRefreshKey(k => k + 1)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {indices.map((idx) => {
          const sparkData = generateSparkline(Object.keys({ SPX: 1, NDX: 1, DJI: 1, FTSE: 1 })[0] || "AAPL");
          const isPositive = idx.change >= 0;
          return (
            <Card key={idx.ticker} className="p-3 bg-card/80 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-foreground">{idx.name}</span>
                <MiniSparkline
                  data={sparkData}
                  width={40}
                  height={16}
                  positive={isPositive}
                />
              </div>
              <div className="text-sm font-black text-foreground">
                {idx.current_price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={`text-xs font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                {isPositive ? "+" : ""}{idx.change.toFixed(2)}%
              </div>
            </Card>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground/60 text-center">
        PAPER DATA — for learning purposes only.
      </p>
    </div>
  );
}