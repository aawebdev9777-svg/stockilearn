import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/DemoContext";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function DemoLogin() {
  const { loginDemo, signupDemo } = useDemo();
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");

  // Sign-in state
  const [siUsername, setSiUsername] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siError, setSiError] = useState("");
  const [siShaking, setSiShaking] = useState(false);

  // Sign-up state
  const [suName, setSuName] = useState(""); // username (not email)
  const [suPassword, setSuPassword] = useState("");
  const [suPassword2, setSuPassword2] = useState("");
  const [suError, setSuError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const result = loginDemo(siUsername, siPassword);
    base44.entities.LoginLog.create({ username: siUsername, action: "signin", success: result.ok, timestamp: new Date().toISOString() });
    if (result.ok) {
      navigate(result.needsOnboarding ? "/onboarding" : "/home");
    } else {
      setSiError("Wrong username or password.");
      setSiShaking(true);
      setTimeout(() => setSiShaking(false), 500);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!suName.trim() || !suPassword.trim()) {
      setSuError("Please fill in all fields.");
      return;
    }
    if (suName.trim().length < 3) {
      setSuError("Username must be at least 3 characters.");
      return;
    }
    if (suPassword.length < 4) {
      setSuError("Password must be at least 4 characters.");
      return;
    }
    if (suPassword !== suPassword2) {
      setSuError("Passwords don't match.");
      return;
    }
    const result = signupDemo(suName.trim(), suPassword);
    base44.entities.LoginLog.create({ username: suName.trim(), action: "signup", success: result.ok, timestamp: new Date().toISOString() });
    if (result.ok) {
      navigate("/onboarding");
    } else {
      setSuError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
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
              onClick={() => { setTab(t); setSiError(""); setSuError(""); }}
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
              animate={siShaking ? { x: [-8, 8, -8, 8, 0], opacity: 1 } : { opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignIn}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Username</label>
                <input
                  type="text"
                  value={siUsername}
                  onChange={e => { setSiUsername(e.target.value); setSiError(""); }}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={siPassword}
                  onChange={e => { setSiPassword(e.target.value); setSiError(""); }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="current-password"
                />
              </div>

              {siError && <p className="text-xs text-destructive font-semibold">{siError}</p>}

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black text-base hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>


            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignUp}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="text-center space-y-1 mb-2">
                <div className="text-4xl">🚀</div>
                <h2 className="font-black text-lg text-foreground">Create your account</h2>
                <p className="text-xs text-muted-foreground">Free forever. Start investing smarter today.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Username</label>
                <input
                  type="text"
                  value={suName}
                  onChange={e => { setSuName(e.target.value); setSuError(""); }}
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={suPassword}
                  onChange={e => { setSuPassword(e.target.value); setSuError(""); }}
                  placeholder="Choose a password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Confirm Password</label>
                <input
                  type="password"
                  value={suPassword2}
                  onChange={e => { setSuPassword2(e.target.value); setSuError(""); }}
                  placeholder="Repeat password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  autoComplete="new-password"
                />
              </div>

              {suError && <p className="text-xs text-destructive font-semibold">{suError}</p>}

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black text-base hover:opacity-90 transition-opacity"
              >
                Create Account 🚀
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <button type="button" onClick={() => setTab("signin")} className="text-primary font-bold">Sign in</button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}