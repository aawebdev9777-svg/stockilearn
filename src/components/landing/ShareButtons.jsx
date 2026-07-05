import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";

// Official brand SVG icons (monochrome white, colored via parent bg)
const XLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const RedditLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.562.467-.457 1.116-.742 1.836-.742 1.443 0 2.613 1.17 2.613 2.613 0 1.026-.592 1.916-1.453 2.348-.045.322-.072.651-.072.983 0 3.313-3.425 6-7.65 6-4.226 0-7.65-2.687-7.65-6 0-.332-.027-.661-.072-.983-.861-.432-1.453-1.322-1.453-2.348 0-1.443 1.17-2.613 2.613-2.613.72 0 1.369.285 1.836.742 1.205-.94 2.878-1.5 4.722-1.565l.927-4.343a.366.366 0 01.435-.283l3.034.637c.197-.4.603-.678 1.079-.678zm-7.84 7.661c-.973 0-1.762.789-1.762 1.762s.789 1.762 1.762 1.762 1.762-.789 1.762-1.762-.789-1.762-1.762-1.762zm5.658 0c-.973 0-1.762.789-1.762 1.762s.789 1.762 1.762 1.762 1.762-.789 1.762-1.762-.789-1.762-1.762-1.762zm.658 5.718c-.372 0-.654.295-.654.654 0 .359.282.654.654.654.372 0 .654-.295.654-.654 0-.359-.282-.654-.654-.654zm-5.986 0c-.372 0-.654.295-.654.654 0 .359.282.654.654.654.372 0 .654-.295.654-.654 0-.359-.282-.654-.654-.654z" />
  </svg>
);

const glass = {
  background: "rgba(255,255,255,0.03)",
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
      Icon: XLogo,
      color: "border-gray-700/30 bg-gray-900 text-white hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      label: "Facebook",
      Icon: FacebookLogo,
      color: "border-blue-700/30 bg-[#1877F2] text-white hover:brightness-110",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      label: "WhatsApp",
      Icon: WhatsAppLogo,
      color: "border-green-600/30 bg-[#25D366] text-white hover:brightness-110",
      url: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`,
    },
    {
      label: "Reddit",
      Icon: RedditLogo,
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
      className="rounded-3xl p-8 border border-white/5 text-center"
      style={glass}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Share2 className="w-5 h-5 text-[#58CC02]" />
        <p className="text-xs font-bold tracking-widest uppercase text-[#58CC02]">Spread the word</p>
      </div>
      <h3 className="text-2xl font-black text-white mb-2">Share StockiLearn</h3>
      <p className="text-sm text-white/40 mb-6">Know someone who should learn investing? Share it with one tap.</p>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {shareLinks.map((link) => {
          const Icon = link.Icon;
          return (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.85 }}
              className={`w-12 h-12 rounded-2xl border-b-4 flex items-center justify-center transition-all active:border-b-0 ${link.color}`}
              aria-label={`Share on ${link.label}`}
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
      >
        {copied ? <Check className="w-4 h-4 text-[#58CC02]" /> : <Copy className="w-4 h-4" />}
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </motion.div>
  );
}