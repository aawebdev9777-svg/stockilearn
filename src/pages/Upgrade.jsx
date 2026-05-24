import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Crown, Zap, Heart, BookOpen, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDemo } from "@/lib/DemoContext";

const FREE_FEATURES = [
  { icon: BookOpen, text: "Core lessons (Units 1–2)", included: true },
  { icon: Zap, text: "Basic paper trading", included: true },
  { icon: Heart, text: "5 hearts/day", included: true },
  { icon: BarChart3, text: "Public league", included: true },
  { icon: Shield, text: "Bruno AI (limited)", included: true, muted: true },
];

const PRO_FEATURES = [
  { icon: BookOpen, text: "All 5 units + advanced content", included: true, highlight: true },
  { icon: Heart, text: "Unlimited hearts", included: true, highlight: true },
  { icon: Shield, text: "Full Bruno AI tutor", included: true, highlight: true },
  { icon: BarChart3, text: "Advanced analytics", included: true, highlight: true },
  { icon: Zap, text: "Ad-free experience", included: true, highlight: true },
];

export default function Upgrade() {
  const navigate = useNavigate();
  const { isDemoMode, demoUser } = useDemo();

  const handleUpgrade = () => {
    // In demo mode, just show success message
    if (isDemoMode) {
      alert("🎉 In production, this would open Stripe checkout for £6.99/month");
      navigate("/home");
      return;
    }
    // Production: would integrate Stripe here
    alert("🎉 In production, this would open Stripe checkout for £6.99/month");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black">
            <Crown className="w-3.5 h-3.5" /> UPGRADE TO PRO
          </div>
          <h1 className="text-3xl font-black text-foreground">Unlock your full potential</h1>
          <p className="text-sm text-muted-foreground">Join thousands of students mastering investing</p>
        </div>

        {/* Pricing Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black text-foreground">Pro</h2>
                <p className="text-xs text-muted-foreground">Everything you need to succeed</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-primary">£6.99</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </div>

            <Button onClick={handleUpgrade} className="w-full h-12 rounded-xl text-base font-black gap-2">
              <Crown className="w-5 h-5" /> Start Pro Trial
            </Button>

            <p className="text-[10px] text-muted-foreground text-center mt-3">
              Cancel anytime · 7-day free trial · No hidden fees
            </p>
          </div>
        </Card>

        {/* Free vs Pro Comparison */}
        <div className="grid grid-cols-2 gap-3">
          {/* Free Column */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-muted-foreground text-center mb-3">Free</h3>
            {FREE_FEATURES.map((f, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${f.muted ? "opacity-50" : ""}`}>
                {f.included ? (
                  <Check className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-destructive shrink-0" />
                )}
                <span className="text-xs text-foreground">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Pro Column */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-primary text-center mb-3">Pro</h3>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${f.highlight ? "bg-primary/10" : ""}`}>
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span className={`text-xs ${f.highlight ? "font-bold text-primary" : "text-foreground"}`}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <Card className="p-4 bg-card/80 border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-black text-primary">
                  {["A", "B", "C", "D"][i - 1]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">10,000+ Pro members</p>
              <p className="text-[10px] text-muted-foreground">4.9/5 stars from 2,000+ reviews</p>
            </div>
          </div>
          <div className="space-y-2">
            {["Finally understand investing!", "Best £7 I spend every month", "Wish I had this at school"].map((t, i) => (
              <div key={i} className="bg-muted/30 rounded-xl p-2.5">
                <p className="text-xs text-foreground">"{t}"</p>
                <p className="text-[9px] text-muted-foreground mt-1">— Pro Member</p>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">Common questions</h3>
          {[
            { q: "Can I cancel anytime?", a: "Yes! Cancel in one click from your account settings." },
            { q: "Is there a free trial?", a: "Yes! 7-day free trial, then £6.99/month." },
            { q: "What payment methods?", a: "All major credit cards, Apple Pay, and Google Pay." },
          ].map((faq, i) => (
            <Card key={i} className="p-3 bg-card/80 border-border/50">
              <p className="text-xs font-bold text-foreground mb-1">{faq.q}</p>
              <p className="text-xs text-muted-foreground">{faq.a}</p>
            </Card>
          ))}
        </div>

        <button onClick={() => navigate(-1)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Maybe later
        </button>
      </div>
    </div>
  );
}