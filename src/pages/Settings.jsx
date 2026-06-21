import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useDemo } from "@/lib/DemoContext";
import { Trash2, AlertTriangle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, ShieldCheck, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const { isDemoMode, logoutDemo, demoUser } = useDemo();
  const [user, setUser] = useState(isDemoMode ? demoUser : null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDemoMode) return;
    base44.auth.me().then(setUser).catch(() => {});
  }, [isDemoMode]);

  const handleToggle = async (field, value) => {
    if (isDemoMode) { setUser(prev => ({ ...prev, [field]: value })); return; }
    await base44.auth.updateMe({ [field]: value });
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      if (isDemoMode) {
        localStorage.removeItem("stockilearn_users");
        localStorage.removeItem("stockilearn_demo_session");
        localStorage.removeItem("stockilearn_lesson_progress");
        logoutDemo();
      } else {
        await base44.auth.logout();
      }
      navigate("/login");
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3 pt-safe-area-top select-none">
        <button onClick={() => navigate(-1)} className="text-foreground select-none">
          <ArrowLeft className="w-5 h-5 select-none" />
        </button>
        <h2 className="text-sm font-bold text-foreground select-none">Settings</h2>
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
          onClick={() => setShowDeleteDialog(true)}
          className="w-full gap-2 text-destructive border-destructive/30 select-none"
        >
          <Trash2 className="w-4 h-4 select-none" /> Delete Account
        </Button>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5 select-none" /> Delete Account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account and all data including progress, portfolios, and achievements. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="select-none">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting} className="bg-destructive text-destructive-foreground select-none">
                {isDeleting ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Link to="/upgrade">
          <Button variant="default" className="w-full gap-2 bg-primary text-primary-foreground">
            <Crown className="w-4 h-4" /> Upgrade to Pro — £6.99/mo
          </Button>
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin">
            <Button variant="outline" className="w-full gap-2 text-primary border-primary/20">
              <ShieldCheck className="w-4 h-4" /> Admin Panel
            </Button>
          </Link>
        )}

        <Button
          variant="outline"
          onClick={() => {
            if (isDemoMode) {
              localStorage.removeItem("stockilearn_users");
              localStorage.removeItem("stockilearn_demo_session");
              localStorage.removeItem("stockilearn_lesson_progress");
              logoutDemo();
              navigate("/login");
            } else {
              base44.auth.logout();
            }
          }}
          className="w-full gap-2 text-destructive border-destructive/20 select-none"
        >
          <LogOut className="w-4 h-4 select-none" /> Sign Out
        </Button>

        <div className="text-center text-[10px] text-muted-foreground space-y-1 pt-4">
          <p>StockiLearn v1.0 · Your data is saved to the cloud ☁️</p>
          <p>For educational purposes only. Not financial advice.</p>
        </div>
      </div>
    </div>
  );
}