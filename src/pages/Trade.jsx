import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioTab from "@/components/trade/PortfolioTab";
import MarketTab from "@/components/trade/MarketTab";
import WatchlistTab from "@/components/trade/WatchlistTab";
import HistoryTab from "@/components/trade/HistoryTab";

export default function Trade() {
  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-black text-foreground mb-1">Trade</h1>
      <p className="text-[10px] text-amber-400 font-medium mb-4">
        📋 PAPER TRADING — No real money involved. For learning only.
      </p>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-muted/50 rounded-2xl h-10">
          <TabsTrigger value="portfolio" className="text-xs font-bold rounded-xl">Portfolio</TabsTrigger>
          <TabsTrigger value="market" className="text-xs font-bold rounded-xl">Market</TabsTrigger>
          <TabsTrigger value="watchlist" className="text-xs font-bold rounded-xl">Watch</TabsTrigger>
          <TabsTrigger value="history" className="text-xs font-bold rounded-xl">History</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio"><PortfolioTab /></TabsContent>
        <TabsContent value="market"><MarketTab /></TabsContent>
        <TabsContent value="watchlist"><WatchlistTab /></TabsContent>
        <TabsContent value="history"><HistoryTab /></TabsContent>
      </Tabs>
    </div>
  );
}