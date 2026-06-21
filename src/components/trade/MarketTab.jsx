import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllStocks, getTopMovers, searchStocks, generateSparkline, getIndices, getStocksByCategory, formatPrice } from "@/lib/stockData";
import MiniSparkline from "@/components/common/MiniSparkline";
import PullToRefresh from "@/components/common/PullToRefresh";

const CATEGORIES = [
  { key: "popular", label: "🔥 All" },
  { key: "gainers", label: "📈 Gainers" },
  { key: "losers", label: "📉 Losers" },
  { key: "growth", label: "🚀 Growth" },
  { key: "tech", label: "💻 Tech" },
  { key: "finance", label: "🏦 Finance" },
  { key: "healthcare", label: "💊 Health" },
  { key: "energy", label: "⚡ Energy" },
  { key: "consumer", label: "🛍️ Consumer" },
  { key: "entertainment", label: "🎬 Media" },
  { key: "automotive", label: "🚗 Auto" },
  { key: "uk", label: "🇬🇧 UK" },
];

function MarketStatusBanner() {
  const now = new Date();
  const utcHour = now.getUTCHours();
  const utcMin = now.getUTCMinutes();
  const estHour = utcHour - 5;
  const totalEstMin = estHour * 60 + utcMin;
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  const marketOpenMin = 9 * 60 + 30;
  const marketCloseMin = 16 * 60;
  const preMarketMin = 4 * 60;

  let status, color, text;
  if (isWeekend) {
    status = "closed";
    color = "bg-red-500/10 text-red-400";
    text = "🔴 MARKET CLOSED — Opens Monday 09:30 EST";
  } else if (totalEstMin >= marketOpenMin && totalEstMin < marketCloseMin) {
    status = "open";
    color = "bg-green-500/10 text-green-400";
    const minsLeft = marketCloseMin - totalEstMin;
    text = `🟢 MARKET OPEN — Closes in ${Math.floor(minsLeft / 60)}h ${minsLeft % 60}m`;
  } else if (totalEstMin >= preMarketMin && totalEstMin < marketOpenMin) {
    status = "premarket";
    color = "bg-yellow-500/10 text-yellow-400";
    const minsLeft = marketOpenMin - totalEstMin;
    text = `🟡 PRE-MARKET — Full open in ${Math.floor(minsLeft / 60)}h ${minsLeft % 60}m`;
  } else {
    status = "closed";
    color = "bg-red-500/10 text-red-400";
    const minsUntilOpen = (24 * 60 - totalEstMin) + marketOpenMin;
    text = `🔴 MARKET CLOSED — Opens in ${Math.floor(minsUntilOpen / 60)}h ${minsUntilOpen % 60}m`;
  }

  return (
    <div className={`text-center text-xs font-bold px-4 py-2 rounded-2xl ${color}`}>
      {text} · NYSE
    </div>
  );
}

export default function MarketTab() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    // Trigger data refresh
    setRefreshKey(k => k + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const indices = useMemo(() => getIndices(), []);
  const { gainers, losers } = useMemo(() => getTopMovers(), []);

  const stocks = useMemo(() => {
    if (query) return searchStocks(query);
    return getStocksByCategory(category);
  }, [query, category]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div key={refreshKey} className="space-y-4 mt-4 min-h-screen pb-4">
      <MarketStatusBanner />

      {/* Indices Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {indices.map((idx) => (
          <motion.div key={idx.ticker} whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="shrink-0 p-2.5 rounded-2xl border border-white/50 min-w-[100px]" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
            <p className="text-[9px] text-muted-foreground font-bold">{idx.name}</p>
            <p className="text-sm font-black text-foreground">{idx.price.toLocaleString()}</p>
            <p className={`text-[10px] font-bold ${idx.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)}%
            </p>
          </motion.div>
        ))}
      </div>

      {/* Top Movers */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground mb-2">TOP MOVERS</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gainers.slice(0, 3).map(s => (
            <Link key={s.ticker} to={`/trade/stock/${s.ticker}`}
              className="shrink-0 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">
              {s.ticker} +{s.change.toFixed(1)}%
            </Link>
          ))}
          {losers.slice(0, 3).map(s => (
            <Link key={s.ticker} to={`/trade/stock/${s.ticker}`}
              className="shrink-0 bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full">
              {s.ticker} {s.change.toFixed(1)}%
            </Link>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search stocks by name or ticker..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 rounded-2xl bg-muted/50 border-border/50 h-10"
        />
      </div>

      {/* Category Tabs */}
      {!query && (
        <>
          <div className="hidden sm:flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {CATEGORIES.map(tab => (
              <button
                key={tab.key}
                onClick={() => setCategory(tab.key)}
                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all whitespace-nowrap select-none ${
                  category === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="sm:hidden">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-10 text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(tab => (
                  <SelectItem key={tab.key} value={tab.key}>{tab.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Stock List */}
      <div className="space-y-1.5">
        {stocks.map((stock, i) => {
          const sparkData = generateSparkline(stock.ticker);
          const isUp = stock.change >= 0;
          return (
            <Link key={stock.ticker} to={`/trade/stock/${stock.ticker}`}>
              <motion.div whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,0,0,0.07)" }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="p-3 rounded-2xl border border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-black text-foreground shrink-0">
                    {stock.sectorEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{stock.name}</p>
                    <p className="text-[10px] text-muted-foreground">{stock.ticker} · {stock.sector}</p>
                  </div>
                  <MiniSparkline data={sparkData} positive={isUp} />
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">{formatPrice(stock.current_price, stock.currency)}</p>
                    <p className={`text-xs font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                      {isUp ? "+" : ""}{stock.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
        {stocks.length === 0 && (
          <div className="text-center py-10 select-none">
            <p className="text-3xl mb-2 select-none">🔍</p>
            <p className="text-sm text-muted-foreground select-none">No stocks found for "{query}"</p>
          </div>
        )}
      </div>
      </div>
    </PullToRefresh>
  );
}