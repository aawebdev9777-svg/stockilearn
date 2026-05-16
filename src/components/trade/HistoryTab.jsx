import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export default function HistoryTab() {
  const [filter, setFilter] = useState("all");

  const { data: trades = [] } = useQuery({
    queryKey: ["trades"],
    queryFn: () => base44.entities.PaperTrade.list("-created_date"),
    initialData: [],
  });

  const filtered = trades.filter(t => {
    if (filter === "buys") return t.action === "buy";
    if (filter === "sells") return t.action === "sell";
    return true;
  });

  const filters = ["all", "buys", "sells"];

  return (
    <div className="space-y-4 mt-4">
      {/* Filters */}
      <div className="flex gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize transition-all ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-3">📜</p>
          <p className="text-sm font-bold text-foreground">No trades yet</p>
          <p className="text-xs text-muted-foreground mt-1">Execute your first trade in the Market tab.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((trade) => (
            <Card key={trade.id} className="p-3 bg-card/80 border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                    trade.action === "buy" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    {trade.action === "buy" ? "B" : "S"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{trade.ticker}</p>
                    <p className="text-xs text-muted-foreground">
                      {trade.shares} shares @ ${trade.price_at_trade?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    ${trade.total_value?.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {trade.created_date ? format(new Date(trade.created_date), "MMM d, HH:mm") : ""}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}