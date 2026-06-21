import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, TrendingUp, Trophy, User } from "lucide-react";

const tabs = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/learn", label: "Learn", icon: BookOpen },
  { path: "/trade", label: "Trade", icon: TrendingUp },
  { path: "/leagues", label: "Leagues", icon: Trophy },
  { path: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/30 shadow-2xl" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div className="flex items-center justify-around max-w-lg mx-auto h-18 px-2 pt-1 pb-2">
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
                className="flex flex-col items-center gap-1"
              >
                <div className={`px-3 py-1.5 rounded-2xl transition-all ${
                  isActive ? "bg-[#58CC02] shadow-md shadow-green-300/50" : ""
                }`}>
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wide ${isActive ? "text-[#58CC02]" : "text-gray-400"}`}>
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-area-bottom" />
    </nav>
  );
}