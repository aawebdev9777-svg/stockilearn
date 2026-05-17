import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDemo } from "@/lib/DemoContext";
import { useNavigate } from "react-router-dom";

export default function DemoLogin() {
  const { loginDemo } = useDemo();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
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
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={shaking ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
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
        </motion.form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Demo account available — ask your instructor for credentials.
        </p>
      </motion.div>
    </div>
  );
}