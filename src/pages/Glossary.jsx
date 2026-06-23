import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "@/lib/glossaryData";

export default function Glossary() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        !query ||
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 pt-safe-area-top select-none">
        <button onClick={() => navigate(-1)} className="text-foreground select-none">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-foreground">Glossary</h2>
      </div>

      <div className="px-4 pb-4 max-w-lg mx-auto">
        <div className="mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#58CC02]">Reference</p>
          <h1 className="text-2xl font-black text-foreground mt-0.5">Investing Glossary</h1>
          <p className="text-xs text-muted-foreground mt-1">Look up any investing term — anytime, anywhere.</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-medium focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {GLOSSARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-black transition-all ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-3">
          {filtered.length} {filtered.length === 1 ? "term" : "terms"}
        </p>

        {/* Terms */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((t, i) => (
              <motion.div
                key={t.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="p-4 rounded-2xl border border-border/50 bg-card/80"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0">{t.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-black text-foreground">{t.term}</h3>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.definition}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm font-bold text-muted-foreground">No terms found</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}