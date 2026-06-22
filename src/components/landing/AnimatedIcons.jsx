import { motion } from "framer-motion";
import React from "react";

const svg = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

// 📈 Chart going up
export function ChartUp({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M6 38 L18 26 L26 32 L42 14"
        stroke="#58CC02" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
      <motion.circle cx="42" cy="14" r="3.5" fill="#58CC02"
        animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  );
}

// 🏆 Trophy
export function Trophy({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M16 10 L32 10 L32 20 C32 26 28 30 24 30 C20 30 16 26 16 20 Z"
        fill="#FFD700" stroke="#D4A500" strokeWidth="2"
        animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M12 14 C8 14 8 22 16 22" stroke="#D4A500" strokeWidth="2.5" fill="none" />
      <motion.path d="M36 14 C40 14 40 22 32 22" stroke="#D4A500" strokeWidth="2.5" fill="none" />
      <rect x="20" y="30" width="8" height="5" fill="#D4A500" />
      <rect x="15" y="35" width="18" height="4" rx="1" fill="#B8860B" />
      <motion.path d="M18 12 L30 12" stroke="#FFF" strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0, x: -8 }} animate={{ opacity: [0, 1, 0], x: [-8, 12, 20] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}

// 🐂 Bull
export function Bull({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M14 16 C10 12 8 8 10 6 C14 8 16 12 16 14"
        stroke="#3B7A57" strokeWidth="2.5" strokeLinecap="round" fill="none"
        animate={{ scaleY: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M34 16 C38 12 40 8 38 6 C34 8 32 12 32 14"
        stroke="#3B7A57" strokeWidth="2.5" strokeLinecap="round" fill="none"
        animate={{ scaleY: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.ellipse cx="24" cy="24" rx="12" ry="11" fill="#58CC02"
        animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <circle cx="20" cy="22" r="2" fill="#fff" />
      <circle cx="28" cy="22" r="2" fill="#fff" />
      <circle cx="20" cy="22" r="1" fill="#1a1a1a" />
      <circle cx="28" cy="22" r="1" fill="#1a1a1a" />
      <motion.path d="M20 28 Q24 31 28 28" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"
        animate={{ d: ["M20 28 Q24 31 28 28", "M20 28 Q24 29 28 28", "M20 28 Q24 31 28 28"] }}
        transition={{ duration: 1.5, repeat: Infinity }} />
    </svg>
  );
}

// 🔥 Flame
export function Flame({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M24 6 C28 14 34 16 34 26 C34 34 29 40 24 40 C19 40 14 34 14 26 C14 20 18 18 20 14 C21 18 23 19 24 16 C24 12 23 9 24 6 Z"
        fill="#FF6B35" stroke="#E85D2F" strokeWidth="1.5"
        animate={{ scaleY: [1, 1.08, 0.95, 1.05, 1], scaleX: [1, 0.96, 1.03, 0.98, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }} />
      <motion.path d="M24 16 C26 20 29 22 29 28 C29 33 27 36 24 36 C21 36 19 33 19 28 C19 24 22 22 24 16 Z"
        fill="#FFD700"
        animate={{ opacity: [0.7, 1, 0.7], scaleY: [1, 1.1, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }} />
    </svg>
  );
}

// ⚡ Bolt
export function Bolt({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M26 4 L14 26 L22 26 L20 44 L34 20 L26 20 Z"
        fill="#FFD700" stroke="#F5A623" strokeWidth="1.5" strokeLinejoin="round"
        animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }} />
    </svg>
  );
}

// 📖 Book
export function Book({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M8 10 L22 12 L22 38 L8 36 Z" fill="#4A90D9" stroke="#357ABD" strokeWidth="1.5"
        animate={{ rotateY: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.path d="M40 10 L26 12 L26 38 L40 36 Z" fill="#58CC02" stroke="#46A302" strokeWidth="1.5"
        animate={{ rotateY: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.line x1="24" y1="12" x2="24" y2="38" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

// 📊 Bars
export function Bars({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.rect x="8" y="28" width="7" height="14" rx="1" fill="#58CC02"
        animate={{ height: [14, 18, 14], y: [28, 24, 28] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.rect x="20" y="20" width="7" height="22" rx="1" fill="#4A90D9"
        animate={{ height: [22, 28, 22], y: [20, 14, 20] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
      <motion.rect x="32" y="14" width="7" height="28" rx="1" fill="#FFD700"
        animate={{ height: [28, 34, 28], y: [14, 8, 14] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
    </svg>
  );
}

// 🔒 Lock
export function Lock({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.rect x="10" y="22" width="28" height="20" rx="3" fill="#B0B8C4" stroke="#8A93A0" strokeWidth="1.5"
        animate={{ x: [0, -1, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} />
      <path d="M15 22 L15 16 C15 11 19 8 24 8 C29 8 33 11 33 16 L33 22" stroke="#8A93A0" strokeWidth="3" fill="none" />
      <circle cx="24" cy="30" r="3" fill="#fff" />
      <rect x="23" y="31" width="2" height="6" fill="#fff" />
    </svg>
  );
}

// 📚 Books
export function Books({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.rect x="6" y="14" width="10" height="28" rx="1" fill="#58CC02" stroke="#46A302" strokeWidth="1.5"
        animate={{ y: [14, 12, 14] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="18" y="10" width="10" height="32" rx="1" fill="#4A90D9" stroke="#357ABD" strokeWidth="1.5"
        animate={{ y: [10, 8, 10] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <motion.rect x="30" y="16" width="10" height="26" rx="1" fill="#FFD700" stroke="#D4A500" strokeWidth="1.5"
        animate={{ y: [16, 14, 16] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
    </svg>
  );
}

// 💰 Money
export function Money({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.ellipse cx="24" cy="26" rx="16" ry="14" fill="#58CC02" stroke="#46A302" strokeWidth="2"
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="24" cy="26" r="8" fill="#fff"
        animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      <text x="24" y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#58CC02">$</text>
    </svg>
  );
}

// 🤖 Robot
export function Robot({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.line x1="24" y1="4" x2="24" y2="10" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round"
        animate={{ scaleY: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="24" cy="4" r="2.5" fill="#4A90D9"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <rect x="10" y="10" width="28" height="24" rx="4" fill="#4A90D9" stroke="#357ABD" strokeWidth="1.5" />
      <motion.circle cx="18" cy="20" r="3" fill="#fff"
        animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }} />
      <motion.circle cx="30" cy="20" r="3" fill="#fff"
        animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }} />
      <circle cx="18" cy="20" r="1.5" fill="#1a1a1a" />
      <circle cx="30" cy="20" r="1.5" fill="#1a1a1a" />
      <motion.path d="M18 28 Q24 32 30 28" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={{ d: ["M18 28 Q24 32 30 28", "M18 28 Q24 30 30 28", "M18 28 Q24 32 30 28"] }}
        transition={{ duration: 1.5, repeat: Infinity }} />
      <rect x="14" y="34" width="4" height="6" rx="1" fill="#357ABD" />
      <rect x="30" y="34" width="4" height="6" rx="1" fill="#357ABD" />
    </svg>
  );
}

// 💎 Gem
export function Gem({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M14 16 L24 6 L34 16 L24 42 Z" fill="#00CED1" stroke="#00A3A6" strokeWidth="1.5"
        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} />
      <path d="M14 16 L34 16 L24 42 Z" fill="#48D1CC" opacity="0.6" />
      <path d="M24 6 L24 16" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      <motion.circle cx="20" cy="14" r="1.5" fill="#fff"
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  );
}

// ❤️ Heart
export function Heart({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M24 40 C24 40 8 30 8 20 C8 14 12 10 17 10 C20 10 23 12 24 15 C25 12 28 10 31 10 C36 10 40 14 40 20 C40 30 24 40 24 40 Z"
        fill="#FF4757" stroke="#E84142" strokeWidth="1.5"
        animate={{ scale: [1, 1.15, 1, 1.15, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
    </svg>
  );
}

// 🥇 Medal
export function Medal({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.path d="M16 6 L20 18" stroke="#357ABD" strokeWidth="3" strokeLinecap="round" />
      <motion.path d="M32 6 L28 18" stroke="#357ABD" strokeWidth="3" strokeLinecap="round" />
      <motion.circle cx="24" cy="28" r="12" fill="#FFD700" stroke="#D4A500" strokeWidth="2"
        animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      <motion.circle cx="24" cy="28" r="7" fill="#FFC107" stroke="#D4A500" strokeWidth="1" />
      <text x="24" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#D4A500">1</text>
    </svg>
  );
}

// 🐣 Chick
export function Chick({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.ellipse cx="24" cy="28" rx="14" ry="16" fill="#FFD700" stroke="#F5A623" strokeWidth="1.5"
        animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <circle cx="19" cy="24" r="2" fill="#1a1a1a" />
      <circle cx="29" cy="24" r="2" fill="#1a1a1a" />
      <motion.path d="M22 30 L24 33 L26 30 Z" fill="#FF9F00"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <motion.path d="M10 18 L14 14 M38 18 L34 14" stroke="#FF9F00" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
    </svg>
  );
}

// 🚀 Rocket
export function Rocket({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <path d="M24 4 C30 10 32 18 32 26 L16 26 C16 18 18 10 24 4 Z" fill="#E84142" stroke="#C73E3F" strokeWidth="1.5" />
        <circle cx="24" cy="16" r="4" fill="#4A90D9" stroke="#fff" strokeWidth="1.5" />
        <path d="M16 26 L12 34 L18 30 Z" fill="#FF6B35" />
        <path d="M32 26 L36 34 L30 30 Z" fill="#FF6B35" />
      </motion.g>
      <motion.path d="M20 28 L24 40 L28 28" fill="#FFD700"
        animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1], opacity: [1, 0.7, 1, 0.8, 1] }}
        transition={{ duration: 0.4, repeat: Infinity }} />
    </svg>
  );
}

// ⚙️ Gear
export function Gear({ size = 24, className = "" }) {
  return (
    <svg {...svg(size)} className={className}>
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}>
        <path d="M24 4 L26 10 L30 8 L30 14 L36 14 L34 20 L40 22 L34 26 L36 32 L30 32 L30 38 L26 36 L24 42 L22 36 L18 38 L18 32 L12 32 L14 26 L8 24 L14 22 L12 16 L18 16 L18 10 L22 12 Z"
          fill="#8A93A0" stroke="#6B7280" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="7" fill="#fff" stroke="#6B7280" strokeWidth="2" />
        <circle cx="24" cy="24" r="3" fill="#6B7280" />
      </motion.g>
    </svg>
  );
}