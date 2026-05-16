import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleToggle = async (field, value) => {
    await base44.auth.updateMe({ [field]: value });
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-foreground">Settings</h2>
      </div>

      <div className="px-4 pb-4 space-y-4 max-w-lg mx-auto">
        <Card className="p-4 bg-card/80 border-border/50 space-y-4">
          <h3 className="text-sm font-bold text-foreground">Preferences</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Currency</p>
              <p className="text-xs text-muted-foreground">USD or GBP</p>
            </div>
            <div className="flex gap-2">
              {["USD", "GBP"].map(c => (
                <button key={c} onClick={() => handleToggle("currency_preference", c)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    (user?.currency_preference || "USD") === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Daily Goal</p>
              <p className="text-xs text-muted-foreground">XP target per day</p>
            </div>
            <div className="flex gap-1">
              {[10, 20, 50, 100].map(xp => (
                <button key={xp} onClick={() => handleToggle("daily_goal_xp", xp)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    (user?.daily_goal_xp || 20) === xp
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>{xp}</button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/80 border-border/50">
          <h3 className="text-sm font-bold text-foreground mb-3">Account</h3>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Joined {user?.created_date ? new Date(user.created_date).toLocaleDateString() : "recently"}
          </p>
        </Card>

        <Button
          variant="outline"
          onClick={() => base44.auth.logout()}
          className="w-full gap-2 text-destructive border-destructive/20"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>

        <div className="text-center text-[10px] text-muted-foreground space-y-1 pt-4">
          <p>StockMark v1.0</p>
          <p>For educational purposes only. Not financial advice.</p>
        </div>
      </div>
    </div>
  );
}