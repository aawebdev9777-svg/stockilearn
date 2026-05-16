import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { getStock } from "@/lib/stockData";
import MiniSparkline from "@/components/common/MiniSparkline";
import { generateSparkline } from "@/lib/stockData";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function PortfolioTab() {
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const portfolios = await base44.entities.PaperPortfolio.list();
      if (portfolios.length === 0) {
        const p = await base44.entities.PaperPortfolio.create({ cash_balance: 10000, total_value: 10000 });
        return p;
      }
      return portfolios[0];
    },
  });

  const { data: holdings = [] } = useQuery({
    queryKey: ["holdings"],
    queryFn: () => base44.entities.PaperHolding.list(),
    initialData: [],
  });

  const cashBalance = portfolio?.cash_balance ?? 10000;
  const holdingsValue = holdings.reduce((sum, h) => {
    const stock = getStock(h.ticker);
    return sum + (stock ? stock.current_price * h.shares : 0);
  }, 0);
  const totalValue = cashBalance + holdingsValue;
  const totalPnl = totalValue - 10000;
  const totalPnlPercent = ((totalValue - 10000) / 10000 * 100);
  const isUp = totalPnl >= 0;

  return (
    <div className="space-y-4 mt-4">
      {/* Total Value */}
      <Card className="p-4 bg-gradient-to-br from-card to-card/80 border-border/50">
        <p className="text-xs text-muted-foreground font-medium">Portfolio Value</p>
        <p className="text-3xl font-black text-foreground mt-1">
          ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className={`flex items-center gap-1 mt-1 ${isUp ? "text-green-400" : "text-red-400"}`}>
          {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span className="text-xs font-bold">
            {isUp ? "+" : ""}${totalPnl.toFixed(2)} ({isUp ? "+" : ""}{totalPnlPercent.toFixed(2)}%)
          </span>
        </div>
      </Card>

      {/* Cash */}
      <div className="flex items-center gap-2 px-1">
        <Wallet className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Cash:</span>
        <span className="text-xs font-bold text-foreground">
          ${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Holdings */}
      {holdings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-3xl mb-2">🏄</p>
          <p className="text-sm text-muted-foreground font-medium">No holdings yet!</p>
          <p className="text-xs text-muted-foreground">Go to Market to make your first trade.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-foreground">Holdings</h3>
          {holdings.map((holding) => {
            const stock = getStock(holding.ticker);
            if (!stock) return null;
            const currentValue = stock.current_price * holding.shares;
            const costBasis = holding.avg_buy_price * holding.shares;
            const pnl = currentValue - costBasis;
            const pnlPercent = (pnl / costBasis) * 100;
            const sparkData = generateSparkline(holding.ticker);
            return (
              <Card key={holding.id} className="p-3 bg-card/80 border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{holding.ticker}</span>
                      <span className="text-xs text-muted-foreground">{holding.shares} shares</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Avg ${holding.avg_buy_price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MiniSparkline data={sparkData} positive={pnl >= 0} />
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">${currentValue.toFixed(2)}</p>
                      <p className={`text-xs font-bold ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {pnl >= 0 ? "+" : ""}{pnlPercent.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}