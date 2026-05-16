import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check } from "lucide-react";

export default function TradeModal({ action, stock, holding, onClose }) {
  const queryClient = useQueryClient();
  const [shares, setShares] = useState("");
  const [step, setStep] = useState("input"); // input | confirm | success
  const [loading, setLoading] = useState(false);

  const isBuy = action === "buy";
  const sharesNum = parseFloat(shares) || 0;
  const totalCost = sharesNum * stock.current_price;
  const maxShares = isBuy ? undefined : holding?.shares || 0;

  const handleConfirm = async () => {
    if (sharesNum <= 0) return;
    setLoading(true);
    try {
      // Get portfolio
      const portfolios = await base44.entities.PaperPortfolio.list();
      let portfolio = portfolios[0];
      if (!portfolio) {
        portfolio = await base44.entities.PaperPortfolio.create({ cash_balance: 10000, total_value: 10000 });
      }

      if (isBuy) {
        if (totalCost > portfolio.cash_balance) {
          alert("Not enough cash!");
          setLoading(false);
          return;
        }

        // Create trade record
        await base44.entities.PaperTrade.create({
          ticker: stock.ticker,
          action: "buy",
          shares: sharesNum,
          price_at_trade: stock.current_price,
          total_value: totalCost,
          order_type: "market",
        });

        // Update or create holding
        const holdings = await base44.entities.PaperHolding.filter({ ticker: stock.ticker });
        if (holdings.length > 0) {
          const h = holdings[0];
          const newShares = h.shares + sharesNum;
          const newAvg = ((h.avg_buy_price * h.shares) + totalCost) / newShares;
          await base44.entities.PaperHolding.update(h.id, {
            shares: newShares,
            avg_buy_price: newAvg,
          });
        } else {
          await base44.entities.PaperHolding.create({
            ticker: stock.ticker,
            shares: sharesNum,
            avg_buy_price: stock.current_price,
          });
        }

        // Update portfolio cash
        await base44.entities.PaperPortfolio.update(portfolio.id, {
          cash_balance: portfolio.cash_balance - totalCost,
        });
      } else {
        // Sell
        if (sharesNum > maxShares) {
          alert("Not enough shares!");
          setLoading(false);
          return;
        }

        const costBasis = holding.avg_buy_price * sharesNum;
        const pnl = totalCost - costBasis;

        await base44.entities.PaperTrade.create({
          ticker: stock.ticker,
          action: "sell",
          shares: sharesNum,
          price_at_trade: stock.current_price,
          total_value: totalCost,
          realised_pnl: pnl,
          order_type: "market",
        });

        const remainingShares = holding.shares - sharesNum;
        if (remainingShares <= 0) {
          await base44.entities.PaperHolding.delete(holding.id);
        } else {
          await base44.entities.PaperHolding.update(holding.id, {
            shares: remainingShares,
          });
        }

        await base44.entities.PaperPortfolio.update(portfolio.id, {
          cash_balance: portfolio.cash_balance + totalCost,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["holdings"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      setStep("success");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-card rounded-t-3xl p-6 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-foreground">
            {step === "success" ? "🎉 Success!" : `${isBuy ? "Buy" : "Sell"} ${stock.ticker}`}
          </h3>
          <button onClick={onClose} className="text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                <p className="text-xl font-bold text-foreground">${stock.current_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Number of Shares {!isBuy && maxShares ? `(max: ${maxShares})` : ""}
                </p>
                <Input
                  type="number"
                  min="1"
                  max={!isBuy ? maxShares : undefined}
                  placeholder="Enter shares"
                  value={shares}
                  onChange={e => setShares(e.target.value)}
                  className="rounded-2xl h-12 text-lg font-bold"
                />
              </div>
              {sharesNum > 0 && (
                <div className="bg-muted/50 rounded-2xl p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Total</span>
                    <span className="font-bold text-foreground">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Fees</span>
                    <span className="font-bold text-green-400">$0.00</span>
                  </div>
                </div>
              )}
              <Button
                onClick={() => setStep("confirm")}
                disabled={sharesNum <= 0}
                className={`w-full h-12 rounded-2xl text-base font-bold ${
                  isBuy ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                Review Order
              </Button>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Action</span>
                  <span className={`font-bold ${isBuy ? "text-green-400" : "text-red-400"}`}>
                    {isBuy ? "BUY" : "SELL"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stock</span>
                  <span className="font-bold text-foreground">{stock.ticker}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shares</span>
                  <span className="font-bold text-foreground">{sharesNum}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-bold text-foreground">${stock.current_price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-2">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-foreground">${totalCost.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className={`w-full h-12 rounded-2xl text-base font-bold ${
                  isBuy ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                {loading ? "Processing..." : "CONFIRM"}
              </Button>
              <Button variant="ghost" onClick={() => setStep("input")} className="w-full text-muted-foreground">
                Go Back
              </Button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                  isBuy ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </motion.div>
              <p className="text-lg font-black text-foreground">
                Position {isBuy ? "Opened" : "Closed"}!
              </p>
              <p className="text-sm text-muted-foreground">
                {sharesNum} shares of {stock.ticker} @ ${stock.current_price.toFixed(2)}
              </p>
              <p className="text-xs text-primary font-bold">+5 XP</p>
              <Button onClick={onClose} className="w-full h-12 rounded-2xl text-base font-bold">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}