import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/DemoContext";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function DemoLogin() {
  const { loginDemo } = useDemo();
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin"); // "signin" | "signup"

  // Sign-in state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  // Sign-up state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupSent, setSignupSent] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const ok = loginDemo(username, password);
    if (ok) {
      navigate("/home");
    } else {
      setError("Wrong username or password. Try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Redirect to platform registration
    base44.auth.redirectToLogin("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">📈</div>
          <h1 className="text-3xl font-black text-foreground">
            V<span className="text-primary">stock</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">The Duolingo of investing</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-2xl p-1 mb-4">
          {["signin", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === t
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "signin" ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignIn}
              animate={shaking ? { x: [-8, 8, -8, 8, 0] } : { opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(""); }}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <p className="text-xs text-destructive font-semibold">{error}</p>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black text-base hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>

              <p className="text-center text-xs text-muted-foreground pt-1">
                Demo: <span className="font-bold text-foreground">Dragons</span> / <span className="font-bold text-foreground">2026</span>
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
            >
              <div className="text-center space-y-1">
                <div className="text-4xl">🚀</div>
                <h2 className="font-black text-lg text-foreground">Start your journey</h2>
                <p className="text-xs text-muted-foreground">Create a free account and start learning to invest in minutes.</p>
              </div>

              <div className="space-y-2 text-sm">
                {["📈 25+ interactive lessons","🏆 Gamified streaks & leagues","💰 £10K paper trading portfolio","🤖 AI tutor — Bruno the Bull"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-muted-foreground">
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSignUp}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black text-base hover:opacity-90 transition-opacity"
              >
                Create Free Account
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setTab("signin")} className="text-primary font-bold">Sign in</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}