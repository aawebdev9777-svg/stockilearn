import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/lib/DemoContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

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

  const inputClass = "w-full px-4 py-4 rounded-2xl border-2 border-gray-300 bg-white text-[#1B1B1B] text-sm font-bold focus:outline-none focus:border-[#58CC02] transition-colors";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 font-nunito">
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
            className="w-20 h-20 rounded-3xl bg-[#58CC02] border-2 border-gray-300 flex items-center justify-center shadow-[0_5px_0_#999]"
          >
            <TrendingUp className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>
          <div>
            <h1 className="text-3xl font-black text-[#1B1B1B]">
              Stocki<span className="text-[#58CC02]">Learn</span>
            </h1>
            <p className="text-sm font-black text-[#58CC02] mt-1">Turn confusion into confidence.</p>
            <p className="text-xs text-[#1B1B1B]/50 mt-0.5 font-bold">Learn investing the fun way.</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 border-2 border-gray-300 rounded-2xl p-1">
          {[["signin", "Sign In"], ["signup", "Create Account"]].map(([t, l]) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSiError(""); setSuError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${
                tab === t
                  ? "bg-[#58CC02] text-white border-2 border-gray-300 shadow-[0_3px_0_#999]"
                  : "text-[#1B1B1B]/50 hover:text-[#1B1B1B] border-2 border-transparent"
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
                <label className="text-xs font-black text-[#1B1B1B]/50 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  value={siUsername}
                  onChange={e => { setSiUsername(e.target.value); setSiError(""); }}
                  placeholder="Enter your username"
                  className={inputClass}
                  autoComplete="username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-[#1B1B1B]/50 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={siPassword}
                  onChange={e => { setSiPassword(e.target.value); setSiError(""); }}
                  placeholder="Enter your password"
                  className={inputClass}
                  autoComplete="current-password"
                />
              </div>

              {siError && (
                <p className="text-xs font-black text-[#FF4B4B] bg-[#FF4B4B]/10 border-2 border-[#FF4B4B]/30 px-4 py-2 rounded-xl">{siError}</p>
              )}

              <button
                type="submit"
                disabled={siLoading}
                className="w-full h-14 rounded-2xl text-base font-black text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {siLoading ? "Signing in..." : <><span>SIGN IN</span><ArrowRight className="w-5 h-5" strokeWidth={3} /></>}
              </button>
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
                <p className="text-xs text-[#1B1B1B]/50 font-bold">Free forever · No credit card needed</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-[#1B1B1B]/50 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  value={suName}
                  onChange={e => { setSuName(e.target.value); setSuError(""); }}
                  placeholder="Choose a username"
                  className={inputClass}
                  autoComplete="username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-[#1B1B1B]/50 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={suPassword}
                  onChange={e => { setSuPassword(e.target.value); setSuError(""); }}
                  placeholder="At least 4 characters"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-[#1B1B1B]/50 uppercase tracking-wider">Confirm Password</label>
                <input
                  type="password"
                  value={suPassword2}
                  onChange={e => { setSuPassword2(e.target.value); setSuError(""); }}
                  placeholder="Repeat your password"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>

              {suError && (
                <p className="text-xs font-black text-[#FF4B4B] bg-[#FF4B4B]/10 border-2 border-[#FF4B4B]/30 px-4 py-2 rounded-xl">{suError}</p>
              )}

              <button
                type="submit"
                disabled={suLoading}
                className="w-full h-14 rounded-2xl text-base font-black text-white bg-[#58CC02] border-2 border-gray-300 shadow-[0_5px_0_#999] hover:shadow-[0_2px_0_#999] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {suLoading ? "Creating account..." : <><span>CREATE ACCOUNT</span><ArrowRight className="w-5 h-5" strokeWidth={3} /></>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}