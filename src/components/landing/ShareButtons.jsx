import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";

const glass = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

const SHARE_URL = "https://stockilearn.com";
const SHARE_TEXT = "Just found StockiLearn — the Duolingo of investing! Learn stocks with gamified lessons, paper trading & an AI tutor. Free forever 📈🐂";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      label: "X",
      icon: "𝕏",
      color: "border-gray-700/30 bg-gray-900 text-white hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      label: "Facebook",
      icon: "f",
      color: "border-blue-700/30 bg-[#1877F2] text-white hover:brightness-110",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      label: "WhatsApp",
      icon: "💬",
      color: "border-green-600/30 bg-[#25D366] text-white hover:brightness-110",
      url: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`,
    },
    {
      label: "Reddit",
      icon: "👽",
      color: "border-orange-600/30 bg-[#FF4500] text-white hover:brightness-110",
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent(SHARE_TEXT)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl p-8 border border-white/50 text-center"
      style={glass}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Share2 className="w-5 h-5 text-[#58CC02]" />
        <p className="text-xs font-black tracking-widest uppercase text-[#58CC02]">Spread the word</p>
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">Share StockiLearn</h3>
      <p className="text-sm text-gray-500 mb-6">Know someone who should learn investing? Share it with one tap.</p>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-2xl border-b-4 flex items-center justify-center text-xl font-black transition-all active:border-b-0 ${link.color}`}
            aria-label={`Share on ${link.label}`}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-white/40"
      >
        {copied ? <Check className="w-4 h-4 text-[#58CC02]" /> : <Copy className="w-4 h-4" />}
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </motion.div>
  );
}