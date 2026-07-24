import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import Logo from "@/components/common/Logo";
import { base44 } from "@/api/base44Client";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError("");
    try {
      const res = await base44.functions.invoke('sendContactMessage', {
        name: form.name,
        email: form.email,
        message: form.message,
      });
      if (res.data?.ok) {
        setSent(true);
      } else {
        setError(res.data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter">

      {/* Nav */}
      <nav className="border-b-2 border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo to="/" size={32} textClass="text-xl" />
          <Link to="/login"
            className="text-sm font-black px-5 py-2.5 rounded-xl bg-[#58CC02] text-white border-b-4 border-[#46A302] hover:brightness-105 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-7xl mb-4">✉️</div>
          <p className="text-xs font-black tracking-widest uppercase text-[#58CC02] mb-2">Get In Touch</p>
          <h1 className="text-5xl font-black text-gray-900 leading-tight">Contact Us</h1>
          <p className="text-gray-500 mt-3 text-lg">Questions, feedback, bugs — we read everything.</p>
        </motion.div>

        {/* Contact form */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-green-50 border-b-4 border-green-200 rounded-2xl p-10"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Message sent!</h2>
            <p className="text-gray-500">We'll get back to you at <span className="font-bold">{form.email}</span> soon.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Bruno the Bull"
                className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-bold focus:outline-none focus:border-[#58CC02] transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Your Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-bold focus:outline-none focus:border-[#58CC02] transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-bold focus:outline-none focus:border-[#58CC02] transition-colors resize-none"
                required
              />
            </div>
            {error && (
              <p className="text-sm font-bold text-[#FF4B4B] bg-[#FF4B4B]/10 border-2 border-[#FF4B4B]/30 px-4 py-3 rounded-2xl">{error}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-base text-white bg-[#58CC02] border-b-4 border-[#46A302] hover:brightness-105 transition-all disabled:opacity-60"
            >
              {sending ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </motion.form>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-100 py-8 px-6 bg-white mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo to="/" size={28} textClass="text-base" />
          <p className="text-xs text-gray-400">© 2026 StockiLearn · Educational purposes only</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/about" className="hover:text-gray-700 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-gray-700 transition-colors font-bold text-[#58CC02]">Contact</Link>
            <Link to="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}