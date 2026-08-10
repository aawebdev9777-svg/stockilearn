import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Users, Eye, MousePointerClick, TrendingUp, RefreshCw, Activity } from "lucide-react";

function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m ${secs}s`;
}

function Sparkline({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 300;
  const height = 48;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12" preserveAspectRatio="none">
      <polyline fill="none" stroke="#58CC02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

export default function LiveTraffic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await base44.functions.invoke("getAnalyticsData", {});
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to load");
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetch(); }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 animate-pulse">
        <div className="h-3 w-24 bg-muted/40 rounded mb-3" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-muted/30 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error || !data?.hasData) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/80 p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Activity className="w-3.5 h-3.5 text-primary" />
          <p className="text-xs font-black text-foreground">Live Traffic</p>
          <button onClick={fetch} className="ml-auto text-muted-foreground hover:text-foreground">
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {error ? "Couldn't load live data." : "No GA4 property connected yet."}
        </p>
      </div>
    );
  }

  const sessions = data.rows?.reduce((s, r) => s + (parseInt(r.metricValues[0]?.value) || 0), 0) || 0;
  const users = data.rows?.reduce((s, r) => s + (parseInt(r.metricValues[1]?.value) || 0), 0) || 0;
  const views = data.rows?.reduce((s, r) => s + (parseInt(r.metricValues[2]?.value) || 0), 0) || 0;
  const avgSec = data.rows?.length ? (data.rows.reduce((s, r) => s + (parseFloat(r.metricValues[3]?.value) || 0), 0) / data.rows.length) : 0;
  const daily = data.rows?.map(r => parseInt(r.metricValues[0]?.value) || 0) || [];

  const stats = [
    { label: "Users", value: formatNumber(users), icon: Users, color: "text-[#58CC02]" },
    { label: "Pageviews", value: formatNumber(views), icon: Eye, color: "text-blue-400" },
    { label: "Sessions", value: formatNumber(sessions), icon: MousePointerClick, color: "text-amber-400" },
  ];

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 space-y-3">
      <div className="flex items-center gap-1.5">
        <Activity className="w-3.5 h-3.5 text-primary" />
        <p className="text-xs font-black text-foreground">Live Traffic</p>
        <span className="text-[10px] text-muted-foreground ml-1">· last 28 days</span>
        <button onClick={fetch} className="ml-auto text-muted-foreground hover:text-foreground">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl bg-muted/30 p-2.5">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <s.icon className={`w-3 h-3 ${s.color}`} />
              <span className="text-[9px] font-black uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-lg font-black text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {daily.length > 0 && (
        <div className="rounded-xl bg-muted/20 p-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Daily Sessions
          </p>
          <Sparkline data={daily} />
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/30">
        <span>Avg session</span>
        <span className="font-bold text-foreground">{formatDuration(avgSec)}</span>
      </div>
    </div>
  );
}