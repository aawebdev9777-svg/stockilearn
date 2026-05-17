import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import BrunoWidget from "@/components/common/BrunoWidget";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto">
        <Outlet />
      </div>
      <BottomNav />
      <BrunoWidget />
    </div>
  );
}