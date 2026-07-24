import React from "react";
import { Link } from "react-router-dom";

export const LOGO_URL = "https://media.base44.com/images/public/6a086c417a13783341515474/e651a16c1_generated_image.png";

export function LogoMark({ size = 40, className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="StockiLearn logo"
      style={{ width: size, height: size }}
      className={`rounded-xl border-2 border-gray-300 shadow-[0_3px_0_#999] object-cover ${className}`}
      draggable={false}
    />
  );
}

/**
 * StockiLearn logo: generated mark + wordmark text.
 * Props: size (px), to (route to link), className, textClass.
 */
export default function Logo({ size = 40, to, className = "", textClass = "" }) {
  const inner = (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      <span className={`font-black tracking-tight text-[#223351] ${textClass}`}>
        Stocki<span className="text-[#5CD137]">Learn</span>
      </span>
    </div>
  );
  if (to) return <Link to={to} className="inline-flex">{inner}</Link>;
  return inner;
}