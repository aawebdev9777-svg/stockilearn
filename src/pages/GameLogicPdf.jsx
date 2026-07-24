import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { FileText, Lock, Download, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ADMIN_PASSWORD = "AA9777";
const STORAGE_KEY = "stockilearn_pdf_unlocked";

export default function GameLogicPdf() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(STORAGE_KEY) === ADMIN_PASSWORD);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePwSubmit = () => {
    if (pwInput.trim() === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, ADMIN_PASSWORD);
      setUnlocked(true);
      setPwInput("");
    } else {
      setPwError("Incorrect password.");
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await base44.functions.invoke("generateGameLogicPdf", { password: ADMIN_PASSWORD });
      if (res.data?.ok && res.data.pdf) {
        const a = document.createElement("a");
        a.href = res.data.pdf;
        a.download = "StockiLearn_Game_Logic.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        setError(res.data?.error || "Failed to generate PDF.");
      }
    } catch (e) {
      setError("Something went wrong generating the PDF.");
    }
    setLoading(false);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background">
        <Card className="p-8 text-center max-w-sm w-full space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-black text-foreground">Game Logic PDF</h1>
          <p className="text-sm text-muted-foreground">Enter the password to access the full systems reference.</p>
          <input
            type="password"
            value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(""); }}
            onKeyDown={e => e.key === "Enter" && handlePwSubmit()}
            placeholder="Password"
            className="w-full text-sm bg-card border border-border rounded-xl px-3 py-2.5 text-center text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
          />
          <Button onClick={handlePwSubmit} className="w-full">Unlock</Button>
          {pwError && <p className="text-xs text-destructive font-bold">{pwError}</p>}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <Card className="p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">StockiLearn — Game Logic PDF</h1>
            <p className="text-sm text-muted-foreground mt-1">
              A massive, downloadable reference covering every aspect of the game: XP, levels, streaks, leagues, daily challenges, mastery, spaced repetition, paper trading, badges, curriculum, auth, and the admin panel.
            </p>
          </div>
          <Button onClick={handleDownload} disabled={loading} className="w-full h-12 text-base gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download PDF
              </>
            )}
          </Button>
          {error && <p className="text-xs text-destructive font-bold">{error}</p>}
          <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>Protected · access remembered on this device</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}