import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { getAllStocks, getTopMovers, searchStocks, generateSparkline } from "@/lib/stockData";
import MiniSparkline from "@/components/common/MiniSparkline";

export default function MarketTab() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");

  const { gainers, losers } = useMemo(() => getTopMovers(), []);

  const stocks = useMemo(() => {
    if (query) return searchStocks(query);
    const all = getAllStocks();
    switch (category) {
      case "gainers": return all.filter(s => s.change > 0).sort((a, b) => b.change - a.change);
      case "losers": return all.filter(s => s.change < 0).sort((a, b) => a.change - b.change);
      case "tech": return all.filter(s => s.sector === "Technology");
      case "finance": return all.filter(s => s.sector === "Finance");
      case "energy": return all.filter(s => s.sector === "Energy");
      default: return all;
    }
  }, [query, category]);

  const isMarketOpen = () => {
    const now = new Date();
    const hour = now.getUTCHours() - 5; // EST
    const day = now.getDay();
    return day >= 1 && day <= 5 && hour >= 9.5 && hour < 16;
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Market Status */}
      <div className={`text-center text-xs font-bold px-3 py-1.5 rounded-full ${
        isMarketOpen() ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
      }`}>
        {isMarketOpen() ? "🟢 MARKET OPEN" : "🔴 MARKET CLOSED"}
      </div>

      {/* Top Movers */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {gainers.map(s => (
          <Link key={s.ticker} to={`/trade/stock/${s.ticker}`}
            className="shrink-0 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">
            {s.ticker} +{s.change.toFixed(1)}%
          </Link>
        ))}
        {losers.map(s => (
          <Link key={s.ticker} to={`/trade/stock/${s.ticker}`}
            className="shrink-0 bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full">
            {s.ticker} {s.change.toFixed(1)}%
          </Link>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 rounded-2xl bg-muted/50 border-border/50 h-10"
        />
      </div>

      {/* Category Tabs */}
      {!query && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { key: "popular", label: "Popular" },
            { key: "gainers", label: "Gainers" },
            { key: "losers", label: "Losers" },
            { key: "tech", label: "Tech" },
            { key: "finance", label: "Finance" },
            { key: "energy", label: "Energy" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setCategory(tab.key)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                category === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Stock List */}
      <div className="space-y-1.5">
        {stocks.map((stock) => {
          const sparkData = generateSparkline(stock.ticker);
          const isUp = stock.change >= 0;
          return (
            <Link key={stock.ticker} to={`/trade/stock/${stock.ticker}`}>
              <Card className="p-3 bg-card/80 border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-black text-foreground">
                    {stock.ticker.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{stock.name}</p>
                    <p className="text-xs text-muted-foreground">{stock.ticker}</p>
                  </div>
                  <MiniSparkline data={sparkData} positive={isUp} />
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">${stock.current_price.toFixed(2)}</p>
                    <p className={`text-xs font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                      {isUp ? "+" : ""}{stock.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}