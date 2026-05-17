import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { DemoProvider, useDemo } from '@/lib/DemoContext';
import DemoLogin from '@/pages/DemoLogin';

import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Learn from '@/pages/Learn';
import Lesson from '@/pages/Lesson';
import Trade from '@/pages/Trade';
import StockDetail from '@/pages/StockDetail';
import Leagues from '@/pages/Leagues';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Onboarding from '@/pages/Onboarding';
import Present from '@/pages/Present';
import Landing from '@/pages/Landing';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const { isDemoMode } = useDemo();

  // If demo mode is active, skip platform auth entirely
  if (isDemoMode) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Navigate to="/home" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/learn/lesson/:lessonId" element={<Lesson />} />
        <Route path="/trade/stock/:ticker" element={<StockDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/present" element={<Present />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl animate-bounce">📈</div>
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Show demo login instead of redirecting to platform auth
      return (
        <Routes>
          <Route path="*" element={<DemoLogin />} />
        </Routes>
      );
    }
  }

  return (
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<DemoLogin />} />
    <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/learn/lesson/:lessonId" element={<Lesson />} />
      <Route path="/trade/stock/:ticker" element={<StockDetail />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/present" element={<Present />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <DemoProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <div>
              <AuthenticatedApp />
            </div>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </DemoProvider>
  )
}

export default App