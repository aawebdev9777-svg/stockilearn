import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Megaphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/DemoContext";

export default function AmbassadorWidget() {
  const { isDemoMode, demoUser } = useDemo();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null); // 'apply' | 'report'
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("feature");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setMode(null);
    setTitle("");
    setDescription("");
    setCategory("feature");
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      if (isDemoMode) {
        // Demo mode: store locally so the feature is usable without backend auth
        const key = "stockilearn_ambassador_reports";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.push({
          type: mode,
          title: title.trim(),
          description: description.trim(),
          category,
          status: "pending",
          created_date: new Date().toISOString(),
          by: demoUser?.username || "demo",
        });
        localStorage.setItem(key, JSON.stringify(existing));
      } else {
        await base44.entities.AmbassadorReport.create({
          type: mode,
          title: title.trim(),
          description: description.trim(),
          category,
        });
      }
      setSubmitted(true);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 z-40 w-14 h-14 rounded-full text-white shadow-lg active:scale-95 flex items-center justify-center"
        style={{
          background: "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffe600, #58CC02, #00d4ff, #7b2ff7, #ff0080)",
          boxShadow: "0 0 14px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.25)",
        }}
        aria-label="Become an ambassador or report a change"
      >
        <Megaphone className="w-6 h-6 drop-shadow" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-amber-500" />
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setOpen(false); reset(); }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border-2 border-border rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-primary/5">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-primary" />
                  <h2 className="text-base font-black text-foreground">
                    {submitted ? "Submitted!" : mode === "apply" ? "Become an Ambassador" : mode === "report" ? "Report a Change" : "Ambassador Hub"}
                  </h2>
                </div>
                <button onClick={() => { setOpen(false); reset(); }} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {submitted ? (
                  <div className="text-center py-6 space-y-3">
                    <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
                    <p className="text-sm font-bold text-foreground">
                      {mode === "apply" ? "Application received!" : "Report sent!"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mode === "apply"
                        ? "Our team will review your ambassador application. You'll get a notification once approved."
                        : "Thanks for helping improve StockiLearn. We'll review your change request."}
                    </p>
                    <Button onClick={() => { setOpen(false); reset(); }} className="w-full">
                      Done
                    </Button>
                  </div>
                ) : !mode ? (
                  <>
                    <p className="text-xs text-muted-foreground">
                      Want a say in how StockiLearn evolves? Ambassadors help shape new lessons, features, and community events.
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => setMode("apply")}
                        className="w-full text-left p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground">Apply as Ambassador</p>
                            <p className="text-[11px] text-muted-foreground">Get early access + voting power on new content</p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setMode("report")}
                        className="w-full text-left p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground">Report a Change</p>
                            <p className="text-[11px] text-muted-foreground">Suggest a feature or flag something broken</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={mode === "apply" ? "Why you'd be a great ambassador" : "Short summary of the change"}
                          className="w-full mt-1 text-sm bg-card border-2 border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Details</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          placeholder={mode === "apply" ? "Tell us about your goals, availability, and ideas..." : "Describe what you'd like to change and why..."}
                          className="w-full mt-1 text-sm bg-card border-2 border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none"
                        />
                      </div>
                      {mode === "report" && (
                        <div>
                          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Category</label>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {[
                              ["feature", "Feature"],
                              ["bug", "Bug"],
                              ["content", "Content"],
                              ["gamification", "Gamification"],
                              ["design", "Design"],
                              ["other", "Other"],
                            ].map(([v, l]) => (
                              <button
                                key={v}
                                onClick={() => setCategory(v)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-colors ${
                                  category === v
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-primary/50"
                                }`}
                              >
                                {l}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {error && <p className="text-xs text-destructive font-bold">{error}</p>}
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setMode(null)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handleSubmit} disabled={submitting} className="flex-1 gap-1.5">
                        <Send className="w-4 h-4" />
                        {submitting ? "Sending..." : "Submit"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}