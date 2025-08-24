import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";
import { AuthPage } from "@/components/AuthPage";
import { MainLayout } from "@/components/MainLayout";
import { Dashboard } from "@/components/Dashboard";
import { ChallengesPage } from "@/components/ChallengesPage";
import { ProfilePage } from "@/components/ProfilePage";
import { LeaderboardPage } from "@/components/LeaderboardPage";
import { SettingsPage } from "@/components/SettingsPage";
import { ReportModal } from "@/components/ReportModal";
import { EcoBotChat } from "@/components/EcoBotChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Check if user has seen onboarding before
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('ecoheroes_onboarding_complete');
    const userAuth = localStorage.getItem('ecoheroes_authenticated');
    
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
    
    if (userAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('ecoheroes_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  const handleAuthSuccess = () => {
    localStorage.setItem('ecoheroes_authenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleReportSuccess = () => {
    // Refresh dashboard or update state as needed
    console.log('Report submitted successfully');
  };

  // Show onboarding if user hasn't seen it
  if (showOnboarding) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Onboarding onComplete={handleOnboardingComplete} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Main app content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            onReportClick={() => setIsReportModalOpen(true)}
            onNavigate={handleNavigate}
            userName="Ahmad Wijaya"
          />
        );
      case 'challenges':
        return <ChallengesPage />;
      case 'leaderboard':
        return <LeaderboardPage />;  
      case 'profile':
        return (
          <ProfilePage 
            onNavigate={handleNavigate}
            userName="Ahmad Wijaya"
          />
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <Dashboard 
            onReportClick={() => setIsReportModalOpen(true)}
            onNavigate={handleNavigate}
            userName="Ahmad Wijaya"
          />
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MainLayout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onReportClick={() => setIsReportModalOpen(true)}
          onChatClick={() => setIsChatOpen(true)}
          userName="Ahmad Wijaya"
        >
          {renderCurrentPage()}
        </MainLayout>

        {/* Report Modal */}
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSuccess={handleReportSuccess}
        />

        {/* EcoBot Chat */}
        <EcoBotChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
