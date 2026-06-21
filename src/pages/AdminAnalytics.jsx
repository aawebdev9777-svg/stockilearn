import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { TrendingUp, Search, Users, Eye, MousePointerClick, ArrowLeft, RefreshCw, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [gaData, setGaData] = useState(null);
  const [scData, setScData] = useState(null);
  const [loadingGa, setLoadingGa] = useState(true);
  const [loadingSc, setLoadingSc] = useState(true);
  const [errorGa, setErrorGa] = useState(null);
  const [errorSc, setErrorSc] = useState(null);

  const fetchGa = async () => {
    setLoadingGa(true);
    setErrorGa(null);
    try {
      const res = await base44.functions.invoke("getAnalyticsData", {});
      setGaData(res.data);
    } catch (e) {
      setErrorGa(e.response?.data?.error || "Failed to load");
    }
    setLoadingGa(false);
  };

  const fetchSc = async () => {
    setLoadingSc(true);
    setErrorSc(null);
    try {
      const res = await base44.functions.invoke("getSearchConsoleData", {});
      setScData(res.data);
    } catch (e) {
      setErrorSc(e.response?.data?.error || "Failed to load");
    }
    setLoadingSc(false);
  };

  useEffect(() => {
    fetchGa();
    fetchSc();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 pt-safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin")} className="text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-black text-foreground">Analytics</h1>
          <button onClick={() => { fetchGa(); fetchSc(); }} className="ml-auto text-muted-foreground">
            <RefreshCw className={`w-4 h-4 ${(loadingGa || loadingSc) ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6 max-w-4xl mx-auto">
        {/* Google Analytics Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-[#58CC02]" />
            <h2 className="text-sm font-black text-foreground">Google Analytics</h2>
            <span className="text-xs text-muted-foreground ml-auto">Last 28 days</span>
          </div>

          {loadingGa ? (
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : errorGa ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              {errorGa}
            </div>
          ) : !gaData?.hasData ? (
            <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">No GA4 properties found. Make sure your Google Analytics account has a property set up.</p>
              <a href="https://analytics.google.com" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2">
                Set up GA4 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            <>
              {/* GA Summary stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <StatCard
                  icon={<Users className="w-4 h-4" />}
                  label="Total Users"
                  value={formatNumber(sumMetric(gaData.rows, 1))}
                />
                <StatCard
                  icon={<Eye className="w-4 h-4" />}
                  label="Page Views"
                  value={formatNumber(sumMetric(gaData.rows, 2))}
                />
                <StatCard
                  icon={<MousePointerClick className="w-4 h-4" />}
                  label="Sessions"
                  value={formatNumber(sumMetric(gaData.rows, 0))}
                />
                <StatCard
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="Avg Session"
                  value={formatDuration(avgMetric(gaData.rows, 3))}
                />
              </div>

              {/* GA Traffic chart */}
              {gaData.rows?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-4 mb-4">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Daily Sessions</p>
                  <SparklineChart
                    data={gaData.rows.map(r => parseInt(r.metricValues[0].value) || 0)}
                  />
                </div>
              )}

              {/* Top Pages */}
              {gaData.topPages?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Top Pages</p>
                  <div className="space-y-2">
                    {gaData.topPages.slice(0, 10).map((row, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                        <span className="flex-1 truncate text-foreground">{row.dimensionValues[0].value}</span>
                        <span className="font-bold text-foreground">{formatNumber(parseInt(row.metricValues[0].value))}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Search Console Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-black text-foreground">Google Search Console</h2>
            <span className="text-xs text-muted-foreground ml-auto">Last 28 days</span>
          </div>

          {loadingSc ? (
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 rounded-2xl bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : errorSc ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              {errorSc}
            </div>
          ) : !scData?.hasData ? (
            <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">No Search Console properties found. Add your site in Search Console first.</p>
              <a href="https://search.google.com/search-console" target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2">
                Add your site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            <>
              {/* SC Summary stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <StatCard icon={<MousePointerClick className="w-4 h-4" />} label="Clicks" value={formatNumber(sumScMetric(scData.daily, 'clicks'))} />
                <StatCard icon={<Eye className="w-4 h-4" />} label="Impressions" value={formatNumber(sumScMetric(scData.daily, 'impressions'))} />
                <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Avg CTR" value={`${(avgScMetric(scData.daily, 'ctr') * 100).toFixed(1)}%`} />
              </div>

              {/* Top Queries */}
              {scData.topQueries?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-4 mb-4">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Top Search Queries</p>
                  <div className="space-y-2">
                    {scData.topQueries.slice(0, 15).map((row, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                        <span className="flex-1 truncate text-foreground">{row.keys[0]}</span>
                        <span className="text-xs text-muted-foreground">{row.clicks} clicks</span>
                        <span className="font-bold text-foreground w-16 text-right">{formatNumber(row.impressions)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Pages from Search */}
              {scData.topPages?.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Top Pages from Search</p>
                  <div className="space-y-2">
                    {scData.topPages.slice(0, 10).map((row, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                        <span className="flex-1 truncate text-foreground">{row.keys[0]}</span>
                        <span className="font-bold text-foreground">{row.clicks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xl font-black text-foreground">{value}</p>
    </div>
  );
}

function SparklineChart({ data }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 300;
  const height = 60;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
      <polyline fill="none" stroke="#58CC02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

function sumMetric(rows, index) {
  if (!rows) return 0;
  return rows.reduce((sum, r) => sum + (parseInt(r.metricValues[index]?.value) || 0), 0);
}

function avgMetric(rows, index) {
  if (!rows?.length) return 0;
  return sumMetric(rows, index) / rows.length;
}

function sumScMetric(rows, key) {
  if (!rows) return 0;
  return rows.reduce((sum, r) => sum + (r[key] || 0), 0);
}

function avgScMetric(rows, key) {
  if (!rows?.length) return 0;
  return sumScMetric(rows, key) / rows.length;
}

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