import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function BrunoWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hey! I'm Bruno 🐂 Your AI investing tutor. Ask me anything about stocks, markets, or how the app works!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: q }]);
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Bruno the Bull 🐂, a friendly, enthusiastic AI tutor for VSTOCK — a gamified investing education app for beginners.

Answer in 2-3 short sentences max. Use plain English, one relevant emoji, be encouraging and fun. Never be condescending.

User's question: "${q}"`,
      });
      setMessages(prev => [...prev, { from: "ai", text: res }]);
    } catch {
      setMessages(prev => [...prev, { from: "ai", text: "Hmm, having a bit of trouble right now. Try again in a moment! 🐂" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
        style={{ background: "hsl(155 100% 50%)", border: "3px solid hsl(155 100% 50% / 0.3)" }}
      >
        {open ? "✕" : "🐂"}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-40 right-4 z-50 w-80 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: 420, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 shrink-0"
              style={{ background: "hsl(155 100% 50% / 0.12)", borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-black"
                style={{ background: "hsl(155 100% 50% / 0.25)", border: "2px solid hsl(155 100% 50% / 0.5)" }}>
                🐂
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-foreground">Bruno the Bull</p>
                <p className="text-[10px] font-bold" style={{ color: "hsl(155 100% 50%)" }}>● AI Tutor · Always here</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed"
                    style={m.from === "user"
                      ? { background: "hsl(155 100% 50%)", color: "hsl(var(--primary-foreground))", fontWeight: 500 }
                      : { background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2 text-xs" style={{ background: "hsl(var(--muted))" }}>
                    <span className="animate-pulse">Bruno is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 flex gap-2 shrink-0" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask Bruno anything..."
                className="flex-1 text-xs rounded-2xl px-3 py-2 bg-muted border-0 outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-40 transition-all shrink-0"
                style={{ background: "hsl(155 100% 50%)", color: "hsl(var(--primary-foreground))" }}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}