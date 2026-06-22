import React from "react";
import { Navigate } from "react-router-dom";
import { useDemo } from "@/lib/DemoContext";
import { useAuth } from "@/lib/AuthContext";

export default function AuthGuard({ children }) {
  const { isDemoMode } = useDemo();
  const { isAuthenticated, isLoadingAuth, isLoadingPublicSettings } = useAuth();

  // Demo session = always allowed
  if (isDemoMode) return children;

  // Still checking platform auth — wait
  if (isLoadingAuth || isLoadingPublicSettings) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Not demo, not authenticated → send to landing
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}