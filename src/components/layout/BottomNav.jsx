import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, Gamepad2, Trophy, User } from "lucide-react";

const tabs = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/learn", label: "Learn", icon: BookOpen },
  { path: "/play", label: "Play", icon: Gamepad2 },
  { path: "/leagues", label: "Leagues", icon: Trophy },
  { path: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-black bg-white shadow-[0_-4px_0_rgba(0,0,0,0.05)] select-none">
      <div className="flex items-center justify-around max-w-lg mx-auto h-18 px-2 pt-1" style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}>
        {tabs.map((tab) => {
          const isActive = currentPath.startsWith(tab.path);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.78 }}
                className="flex flex-col items-center gap-1 select-none"
              >
                <div className={`px-3 py-1.5 rounded-2xl border-2 transition-all select-none ${
                  isActive
                    ? "bg-[#58CC02] border-black shadow-[0_3px_0_#000]"
                    : "border-transparent"
                }`}>
                  <Icon
                    className={`w-5 h-5 select-none ${isActive ? "text-white" : "text-gray-400"}`}
                    strokeWidth={isActive ? 3 : 2}
                  />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wide select-none ${isActive ? "text-[#58CC02]" : "text-gray-400"}`}>
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
      <p className="text-center text-[8px] text-gray-400 font-black pb-1">Created by Ahmetzhan Aldiyar</p>
      <div className="h-safe-area-bottom" />
    </nav>
  );
}