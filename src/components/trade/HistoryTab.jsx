import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip, XAxis } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "buys", label: "Buys" },
  { key: "sells", label: "Sells" },
  { key: "profit", label: "Profitable" },
  { key: "loss", label: "Losses" },
];

export default function HistoryTab() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    base44.auth.me().then(u => setUserId(u?.id)).catch(() => {});
  }, []);

  const { data: trades = [] } = useQuery({
    queryKey: ["trades", userId],
    queryFn: () => base44.entities.PaperTrade.filter({ created_by_id: userId }),
    enabled: !!userId,
    initialData: [],
  });

  const filtered = useMemo(() => trades.filter(t => {
    if (filter === "buys") return t.action === "buy";
    if (filter === "sells") return t.action === "sell";
    if (filter === "profit") return t.action === "sell" && (t.realised_pnl || 0) > 0;
    if (filter === "loss") return t.action === "sell" && (t.realised_pnl || 0) < 0;
    return true;
  }), [trades, filter]);

  const totalBuys = trades.filter(t => t.action === "buy").length;
  const totalSells = trades.filter(t => t.action === "sell").length;
  const totalPnl = trades.reduce((sum, t) => sum + (t.realised_pnl || 0), 0);

  const bestTrade = useMemo(() => [...trades]
    .filter(t => t.action === "sell" && t.realised_pnl)
    .sort((a, b) => b.realised_pnl - a.realised_pnl)[0], [trades]);
  const worstTrade = useMemo(() => [...trades]
    .filter(t => t.action === "sell" && t.realised_pnl)
    .sort((a, b) => a.realised_pnl - b.realised_pnl)[0], [trades]);

  // Monthly P&L chart data
  const monthlyPnl = useMemo(() => {
    const map = {};
    trades.filter(t => t.action === "sell" && t.realised_pnl && t.created_date).forEach(t => {
      const key = format(new Date(t.created_date), "MMM");
      map[key] = (map[key] || 0) + (t.realised_pnl || 0);
    });
    return Object.entries(map).map(([month, pnl]) => ({ month, pnl: Math.round(pnl * 100) / 100 }));
  }, [trades]);

  return (
    <div className="space-y-4 mt-4">
      {/* Overview Stats */}
      <Card className="p-4 bg-card/80 border-border/50">
        <div className="grid grid-cols-3 gap-3 text-center mb-3">
          <div>
            <p className="text-lg font-black text-foreground">{trades.length}</p>
            <p className="text-[9px] text-muted-foreground font-bold">TOTAL</p>
          </div>
          <div>
            <p className="text-lg font-black text-green-400">{totalBuys}</p>
            <p className="text-[9px] text-muted-foreground font-bold">BUYS</p>
          </div>
          <div>
            <p className="text-lg font-black text-red-400">{totalSells}</p>
            <p className="text-[9px] text-muted-foreground font-bold">SELLS</p>
          </div>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Realised P&L</span>
            <span className={`text-sm font-black ${totalPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
              {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
            </span>
          </div>
          {bestTrade && (
            <p className="text-[10px] text-green-400 mt-1">
              🏆 Best: +${bestTrade.realised_pnl?.toFixed(2)} on {bestTrade.ticker}
            </p>
          )}
          {worstTrade && (
            <p className="text-[10px] text-red-400 mt-0.5">
              💔 Worst: ${worstTrade.realised_pnl?.toFixed(2)} on {worstTrade.ticker}
            </p>
          )}
        </div>
      </Card>

      {/* Monthly Chart */}
      {monthlyPnl.length > 0 && (
        <Card className="p-4 bg-card/80 border-border/50">
          <p className="text-xs font-bold text-foreground mb-3">Monthly Realised P&L</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={monthlyPnl}>
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`$${v.toFixed(2)}`, "P&L"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 10 }} />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {monthlyPnl.map((m, i) => (
                  <Cell key={i} fill={m.pnl >= 0 ? "#22c55e" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
              filter === f.key ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📜</p>
          <p className="text-sm font-bold text-foreground">No trades yet</p>
          <p className="text-xs text-muted-foreground mt-1">Execute your first trade in the Market tab.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((trade) => {
            const isBuy = trade.action === "buy";
            const hasPnl = trade.action === "sell" && trade.realised_pnl !== undefined && trade.realised_pnl !== null;
            const pnlUp = (trade.realised_pnl || 0) >= 0;
            const isExpanded = expanded === trade.id;

            return (
              <motion.div key={trade.id} layout>
                <Card
                  className={`border-border/50 cursor-pointer transition-colors ${isBuy ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}
                  onClick={() => setExpanded(isExpanded ? null : trade.id)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isBuy ? "bg-green-500/15" : "bg-red-500/15"}`}>
                        {isBuy
                          ? <TrendingUp className="w-4 h-4 text-green-400" />
                          : <TrendingDown className="w-4 h-4 text-red-400" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${isBuy ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                            {isBuy ? "▲ BUY" : "▼ SELL"}
                          </span>
                          <span className="text-sm font-bold text-foreground">{trade.ticker}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          {trade.shares} shares @ ${trade.price_at_trade?.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-foreground">${trade.total_value?.toFixed(2)}</p>
                        {hasPnl ? (
                          <p className={`text-[10px] font-bold ${pnlUp ? "text-green-400" : "text-red-400"}`}>
                            {pnlUp ? "+" : ""}${trade.realised_pnl?.toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-[10px] text-muted-foreground">
                            {trade.created_date ? format(new Date(trade.created_date), "MMM d") : ""}
                          </p>
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 pt-3 border-t border-border/30 space-y-1"
                        >
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div><span className="text-muted-foreground">Order Type</span>
                              <p className="font-bold text-foreground capitalize">{trade.order_type || "market"}</p>
                            </div>
                            <div><span className="text-muted-foreground">Time</span>
                              <p className="font-bold text-foreground">
                                {trade.created_date ? format(new Date(trade.created_date), "MMM d, HH:mm") : "—"}
                              </p>
                            </div>
                            {hasPnl && (
                              <>
                                <div><span className="text-muted-foreground">Realised P&L</span>
                                  <p className={`font-bold ${pnlUp ? "text-green-400" : "text-red-400"}`}>
                                    {pnlUp ? "+" : ""}${trade.realised_pnl?.toFixed(2)}
                                  </p>
                                </div>
                                <div><span className="text-muted-foreground">Status</span>
                                  <p className={`font-bold ${pnlUp ? "text-green-400" : "text-red-400"}`}>
                                    {pnlUp ? "✓ Profit" : "✗ Loss"}
                                  </p>
                                </div>
                              </>
                            )}
                            {!hasPnl && (
                              <div><span className="text-muted-foreground">Status</span>
                                <p className="font-bold text-primary">OPEN POSITION</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}