import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function PullToRefresh({ onRefresh, children }) {
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      e.preventDefault();
      setPullDistance(Math.min(diff, 200));
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling.current) return;
    isPulling.current = false;
    
    if (pullDistance > 100 && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    setPullDistance(0);
  };

  const opacity = useTransform(() => Math.min(pullDistance / 100, 1));
  const scale = useTransform(() => 1 + (pullDistance / 300));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance, refreshing]);

  return (
    <div ref={containerRef} className="relative overflow-y-auto h-full">
      {/* Pull indicator */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute top-0 left-0 right-0 flex items-center justify-center h-16 pointer-events-none"
      >
        {refreshing ? (
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        ) : (
          <span className="text-2xl">{pullDistance > 50 ? "🔄" : pullDistance > 0 ? "👇" : ""}</span>
        )}
      </motion.div>
      
      {/* Content */}
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  );
}