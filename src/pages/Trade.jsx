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
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Paper Trading</p>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">Markets</h1>
        </div>
        <span className="text-xs text-amber-600 font-black border border-amber-200/60 px-3 py-1.5 rounded-2xl" style={{ background: "rgba(255,237,170,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
          📋 PAPER
        </span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 rounded-2xl h-11 mb-0 border border-white/50" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <TabsTrigger value="portfolio" className="text-[10px] font-black rounded-xl uppercase">Portfolio</TabsTrigger>
          <TabsTrigger value="market" className="text-[10px] font-black rounded-xl uppercase">Market</TabsTrigger>
          <TabsTrigger value="watchlist" className="text-[10px] font-black rounded-xl uppercase">Watch</TabsTrigger>
          <TabsTrigger value="history" className="text-[10px] font-black rounded-xl uppercase">History</TabsTrigger>
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