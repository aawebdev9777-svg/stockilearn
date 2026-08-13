import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useDemo } from "@/lib/DemoContext";
import { Megaphone, Sparkles, ArrowLeft, Send, CheckCircle2, Clock, XCircle, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STATUS_META = {
  pending:     { label: "Pending",     Icon: Clock,        color: "text-amber-500",   bg: "bg-amber-500/10" },
  reviewing:   { label: "Reviewing",   Icon: Loader2,       color: "text-blue-500",    bg: "bg-blue-500/10" },
  accepted:    { label: "Accepted",    Icon: CheckCircle2,  color: "text-primary",     bg: "bg-primary/10" },
  rejected:    { label: "Rejected",    Icon: XCircle,       color: "text-destructive", bg: "bg-destructive/10" },
  implemented: { label: "Implemented", Icon: CheckCircle2,  color: "text-purple-500",  bg: "bg-purple-500/10" },
};

export default function Ambassador() {
  const { isDemoMode, demoUser } = useDemo();
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);

  // New change report form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("feature");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchStatus = async () => {
    if (!demoUser?.session_token) { setLoading(false); return; }
    try {
      const res = await base44.functions.invoke("manageAmbassadors", {
        action: "check",
        session_token: demoUser.session_token,
      });
      if (res.data?.ok) {
        setApproved(res.data.approved);
        setReports(res.data.reports || []);
        setUser(res.data.user);
      }
    } catch (e) { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchStatus(); }, [demoUser]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) { setError("Please fill in all fields."); return; }
    setSubmitting(true); setError(""); setSuccess(false);
    try {
      const res = await base44.functions.invoke("manageAmbassadors", {
        action: "submit",
        session_token: demoUser.session_token,
        type: "change_report",
        title: title.trim(),
        description: description.trim(),
        category,
      });
      if (res.data?.ok) {
        setSuccess(true);
        setTitle(""); setDescription(""); setCategory("feature");
        fetchStatus();
      } else {
        setError(res.data?.error || "Failed to submit.");
      }
    } catch (e) {
      setError("Something went wrong.");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!approved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-sm w-full p-8 text-center space-y-4 border-2 border-border">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-9 h-9 text-destructive" />
          </div>
          <h1 className="text-xl font-black text-foreground">Ambassadors Only</h1>
          <p className="text-sm text-muted-foreground">
            This portal is for approved StockiLearn ambassadors. Apply via the floating ambassador button — once an admin approves your application, you'll get full access here.
          </p>
          {reports.some(r => r.type === "ambassador_application" && r.status === "pending") && (
            <p className="text-xs text-amber-500 font-bold">Your application is under review ⏳</p>
          )}
          <Link to="/home">
            <Button variant="outline" className="w-full gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const myReports = reports.filter(r => r.type === "change_report");
  const myApp = reports.find(r => r.type === "ambassador_application");

  const StatusBadge = ({ status }) => {
    const meta = STATUS_META[status] || STATUS_META.pending;
    const Icon = meta.Icon;
    return (
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} flex items-center gap-1 shrink-0`}>
        <Icon className="w-3 h-3" /> {meta.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3 pt-safe-area-top">
          <Link to="/home" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffe600, #58CC02, #00d4ff, #7b2ff7, #ff0080)" }}>
              <Megaphone className="w-4 h-4 text-white drop-shadow" />
            </div>
            <h1 className="font-black text-foreground">Ambassador Portal</h1>
          </div>
          <span className="ml-auto text-[10px] font-black bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> APPROVED
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5 bg-card border-2 border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffe600, #58CC02, #00d4ff, #7b2ff7, #ff0080)" }}>
                <span className="text-lg font-black text-white drop-shadow">
                  {(user?.display_name || user?.username || "A")[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-black text-foreground">{user?.display_name || user?.username}</p>
                <p className="text-xs text-muted-foreground">StockiLearn Ambassador</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Thanks for helping shape StockiLearn! Submit change requests, feature ideas, or bug reports below. The admin team reviews every submission.
            </p>
          </Card>
        </motion.div>

        {/* Submit a change report */}
        <div>
          <h2 className="text-sm font-black text-foreground mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-primary" /> Submit a Change Request
          </h2>
          <Card className="p-4 bg-card border-2 border-border space-y-3">
            {success && (
              <div className="flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold rounded-xl px-3 py-2">
                <CheckCircle2 className="w-4 h-4" /> Report submitted! Admin will review it.
              </div>
            )}
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Short summary of the change"
                className="w-full mt-1 text-sm bg-background border-2 border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Details</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe what you'd like to change and why..."
                className="w-full mt-1 text-sm bg-background border-2 border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Category</label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {[["feature","Feature"],["bug","Bug"],["content","Content"],["gamification","Gamification"],["design","Design"],["other","Other"]].map(([v, l]) => (
                  <button key={v} onClick={() => setCategory(v)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-colors ${
                      category === v ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"
                    }`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-xs text-destructive font-bold">{error}</p>}
            <Button onClick={handleSubmit} disabled={submitting} className="w-full gap-1.5">
              <Send className="w-4 h-4" /> {submitting ? "Sending..." : "Submit Report"}
            </Button>
          </Card>
        </div>

        {/* My reports */}
        <div>
          <h2 className="text-sm font-black text-foreground mb-2">Your Reports</h2>
          {myReports.length === 0 ? (
            <Card className="p-6 bg-card border-2 border-border text-center">
              <p className="text-xs text-muted-foreground">No change reports yet. Submit your first one above!</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {myReports.map(r => (
                <Card key={r.id} className="p-3 bg-card border-2 border-border">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-foreground">{r.title}</p>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{r.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="bg-muted px-1.5 py-0.5 rounded-full uppercase font-bold">{r.category}</span>
                    <span>{r.created_date ? new Date(r.created_date).toLocaleDateString() : ""}</span>
                  </div>
                  {r.admin_note && (
                    <p className="text-[11px] text-foreground bg-muted/40 rounded-lg px-2 py-1.5 mt-2">
                      <span className="font-bold">Admin note:</span> {r.admin_note}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Application status */}
        {myApp && (
          <div>
            <h2 className="text-sm font-black text-foreground mb-2">Your Ambassador Application</h2>
            <Card className="p-3 bg-card border-2 border-border">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-bold text-foreground">{myApp.title}</p>
                <StatusBadge status={myApp.status} />
              </div>
              <p className="text-xs text-muted-foreground">{myApp.description}</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}