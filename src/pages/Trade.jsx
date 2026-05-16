import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioTab from "@/components/trade/PortfolioTab";
import MarketTab from "@/components/trade/MarketTab";
import WatchlistTab from "@/components/trade/WatchlistTab";
import HistoryTab from "@/components/trade/HistoryTab";

export default function Trade() {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-black text-foreground">Markets</h1>
        <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-1 rounded-full">
          📋 PAPER
        </span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-muted/50 rounded-2xl h-10 mb-0">
          <TabsTrigger value="portfolio" className="text-xs font-bold rounded-xl">Portfolio</TabsTrigger>
          <TabsTrigger value="market" className="text-xs font-bold rounded-xl">Market</TabsTrigger>
          <TabsTrigger value="watchlist" className="text-xs font-bold rounded-xl">Watch</TabsTrigger>
          <TabsTrigger value="history" className="text-xs font-bold rounded-xl">History</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <PortfolioTab onNavigateToMarket={() => setActiveTab("market")} />
        </TabsContent>
        <TabsContent value="market">
          <MarketTab />
        </TabsContent>
        <TabsContent value="watchlist">
          <WatchlistTab onNavigateToMarket={() => setActiveTab("market")} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}