import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import MiniSparkline from "@/components/common/MiniSparkline";
import { getIndices, generateSparkline } from "@/lib/stockData";

export default function MarketPulse() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const indices = useMemo(() => getIndices(), [refreshKey]);

  return (
    <div className="rounded-3xl border border-white/50 p-4 space-y-3" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">Market Pulse</h3>
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
            <motion.div key={idx.ticker} whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(0,0,0,0.07)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className={`p-3 rounded-2xl border ${isPositive ? "border-green-200/60" : "border-red-200/60"}`} style={{ background: isPositive ? "rgba(240,255,240,0.6)" : "rgba(255,240,240,0.6)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-700">{idx.name}</span>
                <MiniSparkline
                  data={sparkData}
                  width={40}
                  height={16}
                  positive={isPositive}
                />
              </div>
              <div className="text-sm font-black text-gray-900">
                {idx.current_price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={`text-xs font-bold ${isPositive ? "text-green-600" : "text-red-500"}`}>
                {isPositive ? "+" : ""}{idx.change.toFixed(2)}%
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-400 text-center">
        PAPER DATA — for learning purposes only.
      </p>
    </div>
  );
}