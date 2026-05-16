import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, StarOff } from "lucide-react";
import { getStock, getStockHistory } from "@/lib/stockData";
import StockChart from "@/components/trade/StockChart";
import TradeModal from "@/components/trade/TradeModal";

export default function StockDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ticker = window.location.pathname.split("/stock/")[1];
  const stock = useMemo(() => getStock(ticker), [ticker]);
  const [timeRange, setTimeRange] = useState("1M");
  const [tradeAction, setTradeAction] = useState(null); // 'buy' | 'sell' | null

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => base44.entities.Watchlist.list(),
    initialData: [],
  });

  const { data: holdings = [] } = useQuery({
    queryKey: ["holdings"],
    queryFn: () => base44.entities.PaperHolding.list(),
    initialData: [],
  });

  const isWatchlisted = watchlist.some(w => w.ticker === ticker);
  const holding = holdings.find(h => h.ticker === ticker);

  const daysMap = { "1D": 1, "1W": 7, "1M": 30, "3M": 90, "1Y": 365, "ALL": 1825 };
  const history = useMemo(() => getStockHistory(ticker, daysMap[timeRange] || 30), [ticker, timeRange]);

  if (!stock) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Stock not found</p>
      </div>
    );
  }

  const isUp = stock.change >= 0;

  const toggleWatchlist = async () => {
    if (isWatchlisted) {
      const item = watchlist.find(w => w.ticker === ticker);
      if (item) await base44.entities.Watchlist.delete(item.id);
    } else {
      await base44.entities.Watchlist.create({ ticker });
    }
    queryClient.invalidateQueries({ queryKey: ["watchlist"] });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-foreground">{ticker}</h2>
        <button onClick={toggleWatchlist}>
          {isWatchlisted ? (
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          ) : (
            <StarOff className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      <div className="px-4 pb-32 space-y-5">
        {/* Price */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs text-muted-foreground">{stock.name}</p>
          <p className="text-3xl font-black text-foreground">${stock.current_price.toFixed(2)}</p>
          <p className={`text-sm font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
            {isUp ? "+" : ""}{stock.change.toFixed(2)}% today
          </p>
        </motion.div>

        {/* Chart */}
        <div>
          <StockChart data={history} isUp={isUp} />
          <div className="flex gap-2 mt-3 justify-center">
            {["1D", "1W", "1M", "3M", "1Y", "ALL"].map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  timeRange === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Holding info */}
        {holding && (
          <Card className="p-3 bg-primary/5 border-primary/20">
            <p className="text-xs text-muted-foreground font-medium">Your Position</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-foreground">{holding.shares} shares</span>
              <span className="text-sm font-bold text-foreground">
                Avg ${holding.avg_buy_price.toFixed(2)}
              </span>
            </div>
          </Card>
        )}

        {/* Key Stats */}
        <Card className="p-4 bg-card/80 border-border/50">
          <h3 className="text-sm font-bold text-foreground mb-3">Key Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Sector", value: stock.sector },
              { label: "Price", value: `$${stock.current_price.toFixed(2)}` },
              { label: "Change", value: `${isUp ? "+" : ""}${stock.change.toFixed(2)}%` },
              { label: "Ticker", value: stock.ticker },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Summary */}
        <Card className="p-4 bg-card/80 border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📊</span>
            <h3 className="text-sm font-bold text-foreground">StockMark AI says:</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {stock.name} is a {stock.sector.toLowerCase()} company currently trading at ${stock.current_price.toFixed(2)}.
            The stock is {isUp ? "up" : "down"} {Math.abs(stock.change).toFixed(2)}% today.
            {isUp ? " The positive momentum suggests continued investor interest." : " Consider monitoring for potential entry points."}
          </p>
          <p className="text-[10px] text-amber-400 mt-2">⚠️ Not financial advice. Educational only.</p>
        </Card>
      </div>

      {/* Buy/Sell Buttons */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/90 backdrop-blur-md border-t border-border">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            onClick={() => setTradeAction("buy")}
            className="flex-1 h-12 rounded-2xl text-base font-bold bg-green-500 hover:bg-green-600 text-white"
          >
            BUY
          </Button>
          <Button
            onClick={() => setTradeAction("sell")}
            disabled={!holding}
            className="flex-1 h-12 rounded-2xl text-base font-bold bg-red-500 hover:bg-red-600 text-white disabled:opacity-30"
          >
            SELL
          </Button>
        </div>
      </div>

      {/* Trade Modal */}
      {tradeAction && (
        <TradeModal
          action={tradeAction}
          stock={stock}
          holding={holding}
          onClose={() => setTradeAction(null)}
        />
      )}
    </div>
  );
}