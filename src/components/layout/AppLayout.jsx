import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import BrunoWidget from "@/components/common/BrunoWidget";

export default function AppLayout() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      className="min-h-screen pb-24 select-none"
      style={{
        background: "linear-gradient(135deg, #dce8ee 0%, #e8ddd8 40%, #d8e4dc 70%, #e0dbe8 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-lg mx-auto">
        <Outlet />
      </div>
      <BottomNav />
      <BrunoWidget />
    </div>
  );
}