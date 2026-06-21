import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bell, Plus } from "lucide-react";
import { getStock, generateSparkline, formatPrice } from "@/lib/stockData";
import MiniSparkline from "@/components/common/MiniSparkline";
import { motion, AnimatePresence } from "framer-motion";

export default function WatchlistTab({ onNavigateToMarket }) {
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("added");
  const [removedIds, setRemovedIds] = useState([]);

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    base44.auth.me().then(u => setUserId(u?.id)).catch(() => {});
  }, []);

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => base44.entities.Watchlist.filter({ created_by_id: userId }),
    enabled: !!userId,
    initialData: [],
  });

  const { data: holdings = [] } = useQuery({
    queryKey: ["holdings", userId],
    queryFn: () => base44.entities.PaperHolding.filter({ created_by_id: userId }),
    enabled: !!userId,
    initialData: [],
  });

  const handleRemove = async (id) => {
    setRemovedIds(prev => [...prev, id]);
    await base44.entities.Watchlist.delete(id);
    queryClient.invalidateQueries({ queryKey: ["watchlist"] });
  };

  const ownedTickers = new Set(holdings.map(h => h.ticker));

  const enriched = watchlist.map(item => {
    const stock = getStock(item.ticker);
    if (!stock) return null;
    return { ...item, stock, sparkData: generateSparkline(item.ticker) };
  }).filter(Boolean);

  const sorted = [...enriched].sort((a, b) => {
    if (sortBy === "change") return b.stock.change - a.stock.change;
    if (sortBy === "price") return b.stock.current_price - a.stock.current_price;
    if (sortBy === "az") return a.ticker.localeCompare(b.ticker);
    return 0;
  });

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-6xl">🔭</div>
        <div>
          <p className="text-sm font-bold text-foreground">Nothing here yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Find stocks worth watching in the Market tab and tap ☆ to add them here.
          </p>
        </div>
        {onNavigateToMarket && (
          <Button onClick={onNavigateToMarket} className="rounded-2xl h-10 px-6 font-bold">
            Browse Market
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium">
          {watchlist.length}/30 stocks
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-[10px] font-bold bg-muted text-muted-foreground rounded-xl px-2 py-1 border-0 outline-none"
        >
          <option value="added">Added Order</option>
          <option value="change">% Change</option>
          <option value="price">Price</option>
          <option value="az">A–Z</option>
        </select>
      </div>

      <AnimatePresence>
        {sorted.map((item) => {
          const isUp = item.stock.change >= 0;
          const isOwned = ownedTickers.has(item.ticker);
          const bigMove = Math.abs(item.stock.change) > 3;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60, height: 0 }}
            >
              <Card className="p-3 bg-card/80 border-border/50">
                <div className="flex items-center gap-3">
                  <Link to={`/trade/stock/${item.ticker}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-base shrink-0 relative">
                      {item.stock.sectorEmoji}
                      {bigMove && (
                        <span className="absolute -top-1 -right-1 text-[9px]">⚡</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-foreground truncate">{item.stock.name.split(" ")[0]}</p>
                        <span className="text-[9px] text-muted-foreground">{item.ticker}</span>
                        {isOwned && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400">OWNED</span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{item.stock.sector}</p>
                    </div>
                    <MiniSparkline data={item.sparkData} positive={isUp} />
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">{formatPrice(item.stock.current_price, item.stock.currency)}</p>
                      <p className={`text-[10px] font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? "+" : ""}{item.stock.change.toFixed(2)}%
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button onClick={() => handleRemove(item.id)} className="text-muted-foreground/40 hover:text-red-400 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <Bell className="w-3.5 h-3.5 text-muted-foreground/30" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {watchlist.length < 30 && onNavigateToMarket && (
        <button
          onClick={onNavigateToMarket}
          className="w-full py-3 border border-dashed border-border rounded-2xl text-xs font-bold text-muted-foreground flex items-center justify-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> Add more stocks
        </button>
      )}
    </div>
  );
}