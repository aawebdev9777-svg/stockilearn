import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X, Binoculars } from "lucide-react";
import { getStock, generateSparkline } from "@/lib/stockData";
import MiniSparkline from "@/components/common/MiniSparkline";

export default function WatchlistTab() {
  const queryClient = useQueryClient();
  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => base44.entities.Watchlist.list(),
    initialData: [],
  });

  const handleRemove = async (id) => {
    await base44.entities.Watchlist.delete(id);
    queryClient.invalidateQueries({ queryKey: ["watchlist"] });
  };

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-3">🔭</p>
        <p className="text-sm font-bold text-foreground">Nothing here yet!</p>
        <p className="text-xs text-muted-foreground mt-1">Search for stocks to watch.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {watchlist.map((item) => {
        const stock = getStock(item.ticker);
        if (!stock) return null;
        const sparkData = generateSparkline(item.ticker);
        const isUp = stock.change >= 0;
        const bigMove = Math.abs(stock.change) > 3;

        return (
          <Card key={item.id} className="p-3 bg-card/80 border-border/50">
            <div className="flex items-center gap-3">
              <Link to={`/trade/stock/${item.ticker}`} className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-black text-foreground relative">
                  {item.ticker.slice(0, 2)}
                  {bigMove && (
                    <span className="absolute -top-1 -right-1 text-[10px]">⚡</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{stock.name}</p>
                  <p className="text-xs text-muted-foreground">{item.ticker}</p>
                </div>
                <MiniSparkline data={sparkData} positive={isUp} />
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">${stock.current_price.toFixed(2)}</p>
                  <p className={`text-xs font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                    {isUp ? "+" : ""}{stock.change.toFixed(2)}%
                  </p>
                </div>
              </Link>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-muted-foreground/50 hover:text-red-400 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}