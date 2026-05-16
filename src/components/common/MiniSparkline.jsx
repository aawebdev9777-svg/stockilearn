import React, { useMemo } from "react";

export default function MiniSparkline({ data = [], width = 60, height = 24, positive = true }) {
  const points = useMemo(() => {
    if (!data.length) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    return data.map((v, i) =>
      `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`
    ).join(" ");
  }, [data, width, height]);

  const color = positive ? "#00FF87" : "#FF4B4B";

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}