import React, { useMemo } from "react";

const VISIBLE_COUNT = 80;
const WIDTH = 400;
const HEIGHT = 200;
const PAD_X = 4;
const PAD_Y = 12;

export default function GameChart({ prices, currentIndex, position, startPrice }) {
  const data = useMemo(() => {
    const start = Math.max(0, currentIndex - VISIBLE_COUNT + 1);
    const count = currentIndex - start + 1;
    const visible = prices.slice(start, currentIndex + 1);
    if (visible.length === 0) return null;

    const allValues = [...visible];
    if (position?.buyPrice) allValues.push(position.buyPrice);

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const range = (max - min) || 1;
    const paddedMin = min - range * 0.1;
    const paddedMax = max + range * 0.1;
    const paddedRange = paddedMax - paddedMin || 1;

    const pts = visible.map((price, i) => {
      const x = PAD_X + ((i + (VISIBLE_COUNT - count)) / (VISIBLE_COUNT - 1)) * (WIDTH - 2 * PAD_X);
      const y = PAD_Y + (1 - (price - paddedMin) / paddedRange) * (HEIGHT - 2 * PAD_Y);
      return { x, y, price };
    });

    const currentPrice = visible[visible.length - 1];
    const isUp = currentPrice >= startPrice;

    return { pts, currentPrice, isUp, visibleStart: start, count };
  }, [prices, currentIndex, position, startPrice]);

  if (!data) return null;

  const { pts, currentPrice, isUp, visibleStart, count } = data;
  const lineColor = isUp ? "#22c55e" : "#ef4444";

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const lastPt = pts[pts.length - 1];
  const firstPt = pts[0];
  const areaD = `${pathD} L ${lastPt.x.toFixed(1)} ${HEIGHT} L ${firstPt.x.toFixed(1)} ${HEIGHT} Z`;

  let positionElements = null;
  if (position?.isHolding && position.buyIndex >= visibleStart) {
    const buyPtIdx = position.buyIndex - visibleStart;
    const buyPt = pts[buyPtIdx];
    if (buyPt) {
      const profit = currentPrice >= position.buyPrice;
      const fillPath = `M ${buyPt.x.toFixed(1)} ${buyPt.y.toFixed(1)} L ${lastPt.x.toFixed(1)} ${lastPt.y.toFixed(1)} L ${lastPt.x.toFixed(1)} ${buyPt.y.toFixed(1)} Z`;
      positionElements = (
        <>
          <path d={fillPath} fill={profit ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"} />
          <line
            x1={buyPt.x} y1={buyPt.y}
            x2={lastPt.x} y2={buyPt.y}
            stroke="white" strokeDasharray="4 4" strokeWidth="1" opacity="0.4"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={buyPt.x} cy={buyPt.y} r="3" fill="white" />
        </>
      );
    }
  }

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.2, 0.4, 0.6, 0.8].map((f) => (
        <line key={f} x1={0} y1={f * HEIGHT} x2={WIDTH} y2={f * HEIGHT} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {pts.length > 1 && <path d={areaD} fill="url(#areaGrad)" />}
      {positionElements}
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

      <circle cx={lastPt.x} cy={lastPt.y} r="3" fill={lineColor} />
      <circle cx={lastPt.x} cy={lastPt.y} r="6" fill={lineColor} opacity="0.3" className="animate-pulse" />
    </svg>
  );
}