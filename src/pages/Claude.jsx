import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function Claude() {
  const [checking, setChecking] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke("verifyClaudeAccess", {});
        if (cancelled) return;
        if (res.data?.ok) setUnlocked(true);
      } catch {
        /* denied */
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="max-w-sm w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Admin Access Required</h1>
            <p className="text-sm text-muted-foreground mt-2">
              You need to be signed in as an admin to view this page.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-lg w-full p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Admin Console</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Source-code export has been disabled for security.
          </p>
        </div>
        <div className="pt-4 border-t border-border space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Created by</p>
          <p className="text-sm font-bold text-foreground">Ahmetzhan Aldiyar</p>
          <p className="text-xs text-muted-foreground">CEO &amp; Co-Founder</p>
          <p className="text-sm font-bold text-foreground mt-2">Sander Rosingholm</p>
          <p className="text-xs text-muted-foreground">COO &amp; Co-Founder</p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to="/home">Back to app</Link>
        </Button>
      </Card>
    </div>
  );
}