import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Info } from "lucide-react";
import { getStock, getStockHistory, formatPrice } from "@/lib/stockData";
import StockChart from "@/components/trade/StockChart";
import TradeModal from "@/components/trade/TradeModal";

const KEY_STATS = [
  { key: "mcap", label: "Market Cap", tip: "Total value of all shares. Bigger = more established company." },
  { key: "pe", label: "P/E Ratio", tip: "Price ÷ Earnings. Shows how expensive the stock is vs profits. Lower can mean cheaper." },
  { key: "eps", label: "EPS", tip: "Earnings Per Share. How much profit per share. Higher is generally better." },
  { key: "div", label: "Dividend Yield", tip: "Annual cash paid to you as a % of share price. 0 means no dividend." },
  { key: "high52", label: "52W High", tip: "Highest price in the last 52 weeks. Useful context for current price." },
  { key: "low52", label: "52W Low", tip: "Lowest price in the last 52 weeks." },
  { key: "beta", label: "Beta", tip: "Volatility vs the market. >1 = more volatile, <1 = calmer. 1.5 means 50% more movement than the market." },
  { key: "sector", label: "Sector", tip: "The industry this company operates in. Useful for diversification." },
];

const AI_INSIGHTS = {
  AAPL: "Apple is the world's most valuable company, making iPhones, Macs, and services like the App Store. It has been on a strong multi-year run driven by its services revenue growth. Risk: heavy dependence on iPhone sales (over 50% of revenue). Opportunity: AI integration into devices could unlock a new upgrade cycle.",
  MSFT: "Microsoft is a cloud and software giant powering everything from Windows to Azure cloud services. Its recent AI partnerships and Copilot integration have been a major catalyst. Risk: cloud growth is slowing as the market matures. Opportunity: AI-enhanced productivity suite adoption is accelerating.",
  NVDA: "NVIDIA makes the GPUs powering the AI revolution. Demand has been explosive from data centres. Risk: extremely high valuation and potential cyclicality if AI investment slows. Opportunity: the GPU compute market is structurally growing for years ahead.",
  TSLA: "Tesla is the dominant electric vehicle maker but faces growing competition from Chinese rivals. Risk: margin pressure from price cuts and competition. Opportunity: energy storage and Full Self-Driving could become major new revenue streams.",
  AMZN: "Amazon dominates e-commerce and cloud computing via AWS, its most profitable division. Risk: regulatory scrutiny and high capex requirements. Opportunity: AWS AI services and advertising are growing fast.",
  GOOGL: "Alphabet owns Google Search, YouTube, and Google Cloud. Risk: AI chatbots could threaten core search ad revenue. Opportunity: its own AI models (Gemini) and cloud growth offer strong upside.",
};

function getAiInsight(ticker, stock) {
  if (AI_INSIGHTS[ticker]) return AI_INSIGHTS[ticker];
  return `${stock.name} operates in the ${stock.sector} sector. It is currently trading ${stock.change >= 0 ? "up" : "down"} ${Math.abs(stock.change).toFixed(2)}% today. ${stock.beta >= 1.5 ? "This is a higher-volatility stock — expect larger price swings." : "This is a relatively stable stock."} ${stock.div > 0 ? `It pays a ${stock.div}% dividend yield.` : "It does not currently pay a dividend."}`;
}

export default function StockDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ticker = window.location.pathname.split("/stock/")[1];
  const stock = useMemo(() => getStock(ticker), [ticker]);
  const [timeRange, setTimeRange] = useState("1M");
  const [tradeAction, setTradeAction] = useState(null);
  const [tipVisible, setTipVisible] = useState(null);

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

  const holdingValue = holding ? holding.shares * stock.current_price : 0;
  const holdingCost = holding ? holding.avg_buy_price * holding.shares : 0;
  const holdingPnl = holdingValue - holdingCost;
  const holdingPnlPct = holdingCost > 0 ? (holdingPnl / holdingCost) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border/50">
        <button onClick={() => navigate(-1)} className="text-foreground p-1 -ml-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <p className="text-sm font-black text-foreground">{ticker}</p>
          <p className="text-[9px] text-muted-foreground">{stock.sector}</p>
        </div>
        <button onClick={toggleWatchlist} className="p-1 -mr-1">
          <Star className={`w-5 h-5 ${isWatchlisted ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
        </button>
      </div>

      <div className="px-4 pb-32 space-y-4 pt-3">
        {/* Price section */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-muted-foreground">{stock.name}</p>
          <div className="flex items-end gap-3 mt-0.5">
            <p className="text-4xl font-black text-foreground">
              {formatPrice(stock.current_price, stock.currency)}
            </p>
            {holding && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-400 mb-1">
                YOU OWN {holding.shares} SHARES
              </span>
            )}
          </div>
          <p className={`text-sm font-bold mt-0.5 ${isUp ? "text-green-400" : "text-red-400"}`}>
            {isUp ? "▲ +" : "▼ "}{Math.abs(stock.change).toFixed(2)}% today
          </p>
        </motion.div>

        {/* Chart */}
        <div>
          <StockChart data={history} isUp={isUp} />
          <div className="flex gap-1.5 mt-3 justify-center">
            {["1D", "1W", "1M", "3M", "1Y", "ALL"].map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                  timeRange === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Your Position */}
        {holding && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-xs font-bold text-muted-foreground mb-2">YOUR POSITION</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-[10px] text-muted-foreground">Shares owned</p>
                <p className="font-bold text-foreground">{holding.shares}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Avg buy price</p>
                <p className="font-bold text-foreground">${holding.avg_buy_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Current value</p>
                <p className="font-bold text-foreground">${holdingValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Unrealised P&L</p>
                <p className={`font-bold ${holdingPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {holdingPnl >= 0 ? "+" : ""}${holdingPnl.toFixed(2)} ({holdingPnlPct >= 0 ? "+" : ""}{holdingPnlPct.toFixed(2)}%)
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Key Stats */}
        <Card className="p-4 bg-card/80 border-border/50">
          <h3 className="text-sm font-bold text-foreground mb-3">Key Stats</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {KEY_STATS.map(stat => {
              const val = stat.key === "sector" ? stock.sector
                : stat.key === "div" ? (stock.div ? `${stock.div}%` : "—")
                : stat.key === "pe" ? (stock.pe ? `${stock.pe}×` : "N/A")
                : stat.key === "high52" || stat.key === "low52" ? formatPrice(stock[stat.key] || 0, stock.currency)
                : stock[stat.key] || "—";
              return (
                <div key={stat.key}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
                    <button
                      onClick={() => setTipVisible(tipVisible === stat.key ? null : stat.key)}
                      className="text-muted-foreground/40"
                    >
                      <Info className="w-3 h-3" />
                    </button>
                  </div>
                  {tipVisible === stat.key && (
                    <p className="text-[9px] text-amber-400 bg-amber-400/5 rounded-lg p-1.5 mb-1 leading-relaxed">
                      🐂 {stat.tip}
                    </p>
                  )}
                  <p className="text-sm font-bold text-foreground">{val}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* AI Insight */}
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-card border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🐂</span>
            <div>
              <p className="text-xs font-black text-foreground">Bruno's Market Insight</p>
              <p className="text-[9px] text-muted-foreground">AI-generated · educational only</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {getAiInsight(ticker, stock)}
          </p>
          <p className="text-[9px] text-amber-400 mt-2 font-medium">
            📋 Not financial advice. For learning only.
          </p>
        </Card>
      </div>

      {/* Sticky Buy/Sell */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/90 backdrop-blur-md border-t border-border/50">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            onClick={() => setTradeAction("buy")}
            className="flex-1 h-12 rounded-2xl text-base font-black bg-green-500 hover:bg-green-600 text-white gap-2"
          >
            ▲ BUY
          </Button>
          <Button
            onClick={() => setTradeAction("sell")}
            disabled={!holding}
            className="flex-1 h-12 rounded-2xl text-base font-black bg-red-500 hover:bg-red-600 text-white disabled:opacity-30 gap-2"
          >
            ▼ SELL
          </Button>
        </div>
      </div>

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