import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useDemo, DEMO_PORTFOLIO, DEMO_HOLDINGS, DEMO_TRADES } from "@/lib/DemoContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStock, generateSparkline, getSectorBreakdown, formatPrice } from "@/lib/stockData";
import MiniSparkline from "@/components/common/MiniSparkline";
import { TrendingUp, TrendingDown, Wallet, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const DONUT_COLORS = ["#00FF87","#38BDF8","#FFB800","#7C3AED","#FF4B4B","#F97316","#EC4899","#14B8A6","#84CC16","#6366F1"];

export default function PortfolioTab({ onNavigateToMarket }) {
  const { isDemoMode } = useDemo();
  const [expandedHolding, setExpandedHolding] = useState(null);
  const [sortBy, setSortBy] = useState("value");

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (!isDemoMode) base44.auth.me().then(u => setUserId(u?.id)).catch(() => {});
  }, [isDemoMode]);

  const { data: portfolio } = useQuery({
    queryKey: ["portfolio", userId],
    queryFn: async () => {
      if (isDemoMode) return DEMO_PORTFOLIO;
      const portfolios = await base44.entities.PaperPortfolio.filter({ created_by_id: userId });
      if (portfolios.length === 0) {
        return await base44.entities.PaperPortfolio.create({ cash_balance: 10000, total_value: 10000 });
      }
      return portfolios[0];
    },
    enabled: isDemoMode || !!userId,
    initialData: isDemoMode ? DEMO_PORTFOLIO : undefined,
  });

  const { data: holdings = [] } = useQuery({
    queryKey: ["holdings", userId],
    queryFn: () => isDemoMode ? Promise.resolve(DEMO_HOLDINGS) : base44.entities.PaperHolding.filter({ created_by_id: userId }),
    enabled: isDemoMode || !!userId,
    initialData: isDemoMode ? DEMO_HOLDINGS : [],
  });

  const { data: allTrades = [] } = useQuery({
    queryKey: ["trades", userId],
    queryFn: () => isDemoMode ? Promise.resolve(DEMO_TRADES) : base44.entities.PaperTrade.filter({ created_by_id: userId }),
    enabled: isDemoMode || !!userId,
    initialData: isDemoMode ? DEMO_TRADES : [],
  });

  const cashBalance = portfolio?.cash_balance ?? 10000;

  const enrichedHoldings = useMemo(() => holdings.map(h => {
    const stock = getStock(h.ticker);
    if (!stock) return null;
    const currentValue = stock.current_price * h.shares;
    const costBasis = h.avg_buy_price * h.shares;
    const pnl = currentValue - costBasis;
    const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
    return { ...h, stock, currentValue, costBasis, pnl, pnlPercent };
  }).filter(Boolean), [holdings]);

  const sortedHoldings = useMemo(() => {
    return [...enrichedHoldings].sort((a, b) => {
      if (sortBy === "value") return b.currentValue - a.currentValue;
      if (sortBy === "gain") return b.pnlPercent - a.pnlPercent;
      if (sortBy === "loss") return a.pnlPercent - b.pnlPercent;
      if (sortBy === "az") return a.ticker.localeCompare(b.ticker);
      return 0;
    });
  }, [enrichedHoldings, sortBy]);

  const holdingsValue = enrichedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalValue = cashBalance + holdingsValue;
  const totalPnl = totalValue - 10000;
  const totalPnlPercent = (totalPnl / 10000) * 100;
  const isUp = totalPnl >= 0;
  const investedPercent = totalValue > 0 ? (holdingsValue / totalValue) * 100 : 0;

  const sectorBreakdown = useMemo(() => getSectorBreakdown(holdings), [holdings]);
  const donutData = enrichedHoldings.map(h => ({ name: h.ticker, value: h.currentValue }));

  const totalTrades = allTrades.length;
  const createdDate = portfolio?.created_date ? new Date(portfolio.created_date) : new Date();
  const holdingDays = Math.floor((Date.now() - createdDate.getTime()) / 86400000);

  // Portfolio health score
  const diversificationScore = Math.min(enrichedHoldings.length * 10, 100);
  const cashEfficiencyScore = Math.min(investedPercent, 100);
  const sectorConcentration = sectorBreakdown.length > 0 ? sectorBreakdown[0]?.percent || 100 : 100;
  const riskScore = Math.max(0, 100 - sectorConcentration * 0.5);
  const perfScore = Math.min(Math.max(totalPnlPercent * 2 + 50, 0), 100);
  const healthScore = Math.round((diversificationScore + cashEfficiencyScore + riskScore + perfScore) / 4);

  const getHealthLabel = (score) => {
    if (score >= 95) return { label: "Elite Portfolio 🏆", color: "text-amber-400" };
    if (score >= 80) return { label: "Strong Portfolio 💪", color: "text-green-400" };
    if (score >= 60) return { label: "Solid Portfolio 🟢", color: "text-green-400" };
    if (score >= 40) return { label: "Getting There 🟡", color: "text-yellow-400" };
    return { label: "Needs Work 🔴", color: "text-red-400" };
  };

  const { label: healthLabel, color: healthColor } = getHealthLabel(healthScore);

  return (
    <div className="space-y-4 mt-4 pb-4">
      {/* Hero Value Card */}
      <Card className="p-5 rounded-2xl border border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
        <p className="text-xs text-muted-foreground font-medium">Total Portfolio Value</p>
        <motion.p
          key={totalValue}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-black text-foreground mt-1"
        >
          ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </motion.p>
        <div className={`flex items-center gap-1.5 mt-1.5 ${isUp ? "text-green-400" : "text-red-400"}`}>
          {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="text-sm font-bold">
            {isUp ? "+" : ""}${Math.abs(totalPnl).toFixed(2)} ({isUp ? "+" : ""}{totalPnlPercent.toFixed(2)}%) all time
          </span>
        </div>

        {/* Performance stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center">
            <p className="text-lg font-black text-foreground">{totalTrades}</p>
            <p className="text-[9px] text-muted-foreground">TRADES</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-foreground">{enrichedHoldings.length}</p>
            <p className="text-[9px] text-muted-foreground">POSITIONS</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-foreground">{holdingDays}d</p>
            <p className="text-[9px] text-muted-foreground">HOLDING</p>
          </div>
        </div>
      </Card>

      {/* Cash Balance Card */}
      <Card className="p-4 rounded-2xl border border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-foreground">Cash Balance</span>
        </div>
        <div className="space-y-1.5 text-sm mb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Available Cash</span>
            <span className="font-bold text-foreground">${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Invested</span>
            <span className="font-bold text-foreground">${holdingsValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-1.5">
            <span className="font-bold text-foreground">Total Value</span>
            <span className="font-bold text-foreground">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <Progress value={investedPercent} className="h-2 bg-muted" />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>Cash {(100 - investedPercent).toFixed(0)}%</span>
          <span>Invested {investedPercent.toFixed(0)}%</span>
        </div>
        {cashBalance > totalValue * 0.5 && (
          <p className="text-[10px] text-amber-400 mt-2">
            💡 Over half your money is sitting in cash. Put it to work in the Market.
          </p>
        )}
      </Card>

      {/* Holdings */}
      {enrichedHoldings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🏄</p>
          <p className="text-sm font-bold text-foreground">No positions yet!</p>
          <p className="text-xs text-muted-foreground mt-1">Head to the Market tab to make your first trade.</p>
          {onNavigateToMarket && (
            <button onClick={onNavigateToMarket} className="mt-3 text-xs font-bold text-primary underline">
              Browse Market →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              MY HOLDINGS ({enrichedHoldings.length} positions)
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[10px] font-bold bg-muted text-muted-foreground rounded-xl px-2 py-1 border-0 outline-none"
            >
              <option value="value">Value ↓</option>
              <option value="gain">% Gain ↓</option>
              <option value="loss">% Loss ↓</option>
              <option value="az">A–Z</option>
            </select>
          </div>

          {sortedHoldings.map((h) => {
            const sparkData = generateSparkline(h.ticker);
            const isExpanded = expandedHolding === h.id;
            const pnlIsUp = h.pnl >= 0;

            return (
              <div key={h.id} className={`rounded-2xl border overflow-hidden ${pnlIsUp ? "border-green-500/30" : "border-red-500/30"}`} style={{ background: pnlIsUp ? "rgba(220,252,231,0.5)" : "rgba(254,226,226,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer"
                  onClick={() => setExpandedHolding(isExpanded ? null : h.id)}
                >
                  <div className={`w-1.5 self-stretch rounded-full ${pnlIsUp ? "bg-green-500" : "bg-red-500"}`} />
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-black text-foreground shrink-0">
                    {h.ticker.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{h.stock.name.split(" ")[0]}</span>
                      <span className="text-xs text-muted-foreground">{h.ticker}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {h.shares} shares · avg ${h.avg_buy_price.toFixed(2)}
                    </p>
                  </div>
                  <MiniSparkline data={sparkData} positive={pnlIsUp} />
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">${h.currentValue.toFixed(2)}</p>
                    <p className={`text-xs font-bold ${pnlIsUp ? "text-green-400" : "text-red-400"}`}>
                      {pnlIsUp ? "+" : ""}{h.pnlPercent.toFixed(2)}%
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-card border-t border-border/30 p-3 space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-muted-foreground">Unrealised P&L</span>
                          <p className={`font-bold ${pnlIsUp ? "text-green-400" : "text-red-400"}`}>
                            {pnlIsUp ? "+" : ""}${h.pnl.toFixed(2)}
                          </p>
                        </div>
                        <div><span className="text-muted-foreground">Total Invested</span>
                          <p className="font-bold text-foreground">${h.costBasis.toFixed(2)}</p>
                        </div>
                        <div><span className="text-muted-foreground">Current Price</span>
                          <p className="font-bold text-foreground">${h.stock.current_price.toFixed(2)}</p>
                        </div>
                        <div><span className="text-muted-foreground">% of Portfolio</span>
                          <p className="font-bold text-foreground">{totalValue > 0 ? ((h.currentValue / totalValue) * 100).toFixed(1) : 0}%</p>
                        </div>
                      </div>
                      <Link to={`/trade/stock/${h.ticker}`} className="block text-center text-[10px] font-bold text-primary py-1.5 bg-primary/5 rounded-xl">
                        VIEW FULL STOCK PAGE →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Allocation Donut */}
      {donutData.length > 0 && (
        <Card className="p-4 rounded-2xl border border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <h3 className="text-sm font-bold text-foreground mb-3">Portfolio Allocation</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {donutData.map((_, i) => (
                  <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`$${v.toFixed(2)}`, "Value"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {donutData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                <span className="text-[10px] text-muted-foreground font-medium">{d.name}</span>
              </div>
            ))}
          </div>

          {/* Sector bar */}
          {sectorBreakdown.length > 0 && (
            <div className="mt-4">
              <p className="text-[10px] text-muted-foreground font-bold mb-1.5">SECTOR BREAKDOWN</p>
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                {sectorBreakdown.map((s, i) => (
                  <div key={s.sector} className="h-full rounded-full" style={{ width: `${s.percent}%`, background: DONUT_COLORS[i % DONUT_COLORS.length] }} title={`${s.sector}: ${s.percent.toFixed(0)}%`} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                {sectorBreakdown.map((s, i) => (
                  <div key={s.sector} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                    <span className="text-[9px] text-muted-foreground">{s.emoji} {s.sector} {s.percent.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
              {sectorBreakdown[0]?.percent > 50 && (
                <p className="text-[10px] text-amber-400 mt-2">
                  ⚠️ Heavy concentration in {sectorBreakdown[0].sector}. Consider diversifying.
                </p>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Portfolio Health Score */}
      <Card className="p-4 rounded-2xl border border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-foreground">Portfolio Health</h3>
          <div className="text-right">
            <span className="text-2xl font-black text-foreground">{healthScore}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
        <p className={`text-xs font-bold mb-3 ${healthColor}`}>{healthLabel}</p>
        {[
          { label: "Diversification 🌍", score: diversificationScore, tip: "Own more different stocks to spread risk." },
          { label: "Risk Balance ⚖️", score: riskScore, tip: "Avoid putting too much in one sector." },
          { label: "Cash Efficiency 💰", score: cashEfficiencyScore, tip: "Uninvested cash misses out on potential gains." },
          { label: "vs Market 📈", score: perfScore, tip: "Compare your returns against the S&P 500." },
        ].map(({ label, score, tip }) => (
          <div key={label} className="mb-2.5">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground font-medium">{label}</span>
              <span className="font-bold text-foreground">{Math.round(score)}/100</span>
            </div>
            <Progress value={score} className="h-1.5" />
            <p className="text-[9px] text-muted-foreground mt-0.5">{tip}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}