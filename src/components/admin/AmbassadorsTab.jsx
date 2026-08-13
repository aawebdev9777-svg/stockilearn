import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Megaphone, RefreshCw, CheckCircle2, XCircle, Clock, Loader2, Sparkles, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ADMIN_PASSWORD = "AA9777";

const STATUS_META = {
  pending:     { label: "Pending",     icon: Clock,       color: "text-amber-500",   bg: "bg-amber-500/10" },
  reviewing:   { label: "Reviewing",   icon: Loader2,     color: "text-blue-500",    bg: "bg-blue-500/10" },
  accepted:    { label: "Accepted",    icon: CheckCircle2,color: "text-primary",     bg: "bg-primary/10" },
  rejected:    { label: "Rejected",    icon: XCircle,      color: "text-destructive", bg: "bg-destructive/10" },
  implemented: { label: "Implemented", icon: CheckCircle2,color: "text-purple-500",  bg: "bg-purple-500/10" },
};

export default function AmbassadorsTab() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | applications | reports | pending
  const [noteInput, setNoteInput] = useState({});

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("manageAmbassadors", {
        action: "list_all",
        password: ADMIN_PASSWORD,
      });
      if (res.data?.ok) setReports(res.data.reports || []);
    } catch (e) { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const setStatus = async (id, status) => {
    await base44.functions.invoke("manageAmbassadors", {
      action: "set_status",
      password: ADMIN_PASSWORD,
      report_id: id,
      status,
      admin_note: noteInput[id] || "",
    });
    setNoteInput(prev => ({ ...prev, [id]: "" }));
    fetchAll();
  };

  const filtered = reports.filter(r => {
    if (filter === "applications") return r.type === "ambassador_application";
    if (filter === "reports") return r.type === "change_report";
    if (filter === "pending") return r.status === "pending";
    return true;
  });

  const counts = {
    applications: reports.filter(r => r.type === "ambassador_application").length,
    reports: reports.filter(r => r.type === "change_report").length,
    pending: reports.filter(r => r.status === "pending").length,
    approved: reports.filter(r => r.type === "ambassador_application" && r.status === "accepted").length,
  };

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="p-3 bg-card border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Sparkles className="w-3 h-3" /> Applications</div>
          <p className="text-xl font-black text-primary">{counts.applications}</p>
        </Card>
        <Card className="p-3 bg-card border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MessageSquare className="w-3 h-3" /> Change Reports</div>
          <p className="text-xl font-black text-blue-400">{counts.reports}</p>
        </Card>
        <Card className="p-3 bg-card border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> Pending</div>
          <p className="text-xl font-black text-amber-500">{counts.pending}</p>
        </Card>
        <Card className="p-3 bg-card border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3" /> Approved Ambassadors</div>
          <p className="text-xl font-black text-purple-400">{counts.approved}</p>
        </Card>
      </div>

      {/* Filter + refresh */}
      <div className="flex gap-1 items-center">
        {[["all","All"],["applications","Applications"],["reports","Reports"],["pending","Pending"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${filter === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {l}
          </button>
        ))}
        <button onClick={fetchAll} className="ml-auto text-muted-foreground hover:text-foreground">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-8"><div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-8">No submissions yet.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(r => {
            const meta = STATUS_META[r.status] || STATUS_META.pending;
            const Icon = meta.icon;
            const isApp = r.type === "ambassador_application";
            return (
              <Card key={r.id} className="p-3 bg-card border-border/50">
                <div className="flex items-start gap-2 mb-1">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${isApp ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"}`}>
                    {isApp ? "APPLICATION" : "REPORT"}
                  </span>
                  <p className="text-sm font-bold text-foreground flex-1">{r.title}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} flex items-center gap-1 shrink-0`}>
                    <Icon className="w-3 h-3" /> {meta.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{r.description}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                  <span className="font-bold">@{r.username || "unknown"}</span>
                  {!isApp && <span className="bg-muted px-1.5 py-0.5 rounded-full uppercase font-bold">{r.category}</span>}
                  <span>{r.created_date ? new Date(r.created_date).toLocaleDateString() : ""}</span>
                </div>
                {r.admin_note && (
                  <p className="text-[11px] text-foreground bg-muted/40 rounded-lg px-2 py-1 mb-2">
                    <span className="font-bold">Admin note:</span> {r.admin_note}
                  </p>
                )}
                <input
                  value={noteInput[r.id] || ""}
                  onChange={(e) => setNoteInput(prev => ({ ...prev, [r.id]: e.target.value }))}
                  placeholder="Admin note (optional)..."
                  className="w-full text-xs bg-background border border-border rounded-lg px-2 py-1.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary mb-2"
                />
                <div className="flex gap-1.5 flex-wrap">
                  <Button size="sm" onClick={() => setStatus(r.id, "accepted")}
                    className="h-7 text-[10px] px-2 gap-1 bg-primary">
                    <CheckCircle2 className="w-3 h-3" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "rejected")}
                    className="h-7 text-[10px] px-2 gap-1 text-destructive border-destructive/30">
                    <XCircle className="w-3 h-3" /> Reject
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "reviewing")}
                    className="h-7 text-[10px] px-2 gap-1 text-blue-500 border-blue-500/30">
                    <Loader2 className="w-3 h-3" /> Reviewing
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "implemented")}
                    className="h-7 text-[10px] px-2 gap-1 text-purple-500 border-purple-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Implemented
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}