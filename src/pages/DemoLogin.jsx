import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/DemoContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoLogin() {
  const { loginDemo, signupDemo } = useDemo();
  const navigate = useNavigate();
  const [tab, setTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") === "signup" ? "signup" : "signin";
  });

  // Sign-in state
  const [siUsername, setSiUsername] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);
  const [siShaking, setSiShaking] = useState(false);

  // Sign-up state
  const [suName, setSuName] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suPassword2, setSuPassword2] = useState("");
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!siUsername.trim() || !siPassword.trim()) {
      setSiError("Please enter your username and password.");
      return;
    }
    setSiLoading(true);
    const result = await loginDemo(siUsername.trim(), siPassword);
    setSiLoading(false);
    if (result.ok) {
      navigate(result.needsOnboarding ? "/onboarding" : "/home");
    } else {
      setSiError("Wrong username or password.");
      setSiShaking(true);
      setTimeout(() => setSiShaking(false), 500);
    }
  };

  const handleSignUp = async (e) => {
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
    setSuLoading(true);
    const result = await signupDemo(suName.trim(), suPassword);
    setSuLoading(false);
    if (result.ok) {
      navigate("/onboarding");
    } else {
      setSuError(result.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col gap-8"
      >
        {/* Logo */}
        <div className="text-center flex flex-col items-center gap-3">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl"
          >
            📈
          </motion.div>
          <div>
            <h1 className="text-3xl font-black text-foreground">
              Stocki<span className="text-primary">Learn</span>
            </h1>
            <p className="text-sm font-bold text-primary mt-1">Turn confusion into confidence.</p>
            <p className="text-xs text-muted-foreground mt-0.5">Learn investing the fun way.</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-card border border-border rounded-2xl p-1">
          {[["signin", "Sign In"], ["signup", "Create Account"]].map(([t, l]) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSiError(""); setSuError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "signin" ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -30 }}
              animate={siShaking ? { x: [-8, 8, -8, 8, 0], opacity: 1 } : { opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignIn}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  value={siUsername}
                  onChange={e => { setSiUsername(e.target.value); setSiError(""); }}
                  placeholder="Enter your username"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                  autoComplete="username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={siPassword}
                  onChange={e => { setSiPassword(e.target.value); setSiError(""); }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                  autoComplete="current-password"
                />
              </div>

              {siError && (
                <p className="text-xs font-bold text-destructive bg-destructive/10 px-4 py-2 rounded-xl">{siError}</p>
              )}

              <Button
                type="submit"
                disabled={siLoading}
                className="w-full h-14 rounded-2xl text-base font-black gap-2 mt-2"
              >
                {siLoading ? "Signing in..." : <><span>SIGN IN</span><ArrowRight className="w-5 h-5" /></>}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignUp}
              className="flex flex-col gap-4"
            >
              <div className="text-center mb-1">
                <div className="text-4xl mb-2">🚀</div>
                <p className="text-xs text-muted-foreground">Free forever · No credit card needed</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  value={suName}
                  onChange={e => { setSuName(e.target.value); setSuError(""); }}
                  placeholder="Choose a username"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                  autoComplete="username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={suPassword}
                  onChange={e => { setSuPassword(e.target.value); setSuError(""); }}
                  placeholder="At least 4 characters"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                  autoComplete="new-password"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-wider">Confirm Password</label>
                <input
                  type="password"
                  value={suPassword2}
                  onChange={e => { setSuPassword2(e.target.value); setSuError(""); }}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                  autoComplete="new-password"
                />
              </div>

              {suError && (
                <p className="text-xs font-bold text-destructive bg-destructive/10 px-4 py-2 rounded-xl">{suError}</p>
              )}

              <Button
                type="submit"
                disabled={suLoading}
                className="w-full h-14 rounded-2xl text-base font-black gap-2 mt-2"
              >
                {suLoading ? "Creating account..." : <><span>CREATE ACCOUNT</span><ArrowRight className="w-5 h-5" /></>}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}