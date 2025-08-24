import { useState, useEffect, ReactNode } from 'react';
import { supabase } from './integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { Toaster as Sonner } from './components/ui/sonner';
import { Onboarding } from './components/Onboarding';
import { AuthPage } from './components/AuthPage';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './components/Dashboard';
import { ChallengesPage } from './components/ChallengesPage';
import { ProfilePage } from './components/ProfilePage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { SettingsPage } from './components/SettingsPage';
import { ReportModal } from './components/ReportModal';
import { EcoBotChat } from './components/EcoBotChat';

// Tipe untuk data profil pengguna dari tabel 'users'
type UserProfile = {
  full_name: string;
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(
    localStorage.getItem('onboardingComplete') !== 'true'
  );
  
  // State untuk navigasi dan modal
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengambil sesi dan profil pengguna
    const fetchSessionAndProfile = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);

      if (currentSession) {
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', currentSession.user.id)
          .single();

        if (error) {
          console.error('Gagal mengambil profil:', error);
        } else {
          setProfile(userProfile);
        }
      }
      setLoading(false);
    };

    fetchSessionAndProfile();

    // Dengar perubahan status otentikasi (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setProfile(null); // Reset profil saat auth berubah
      if (newSession) {
        fetchSessionAndProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  const handleReportSuccess = () => {
    console.log('Laporan berhasil dikirim');
    // Anda bisa menambahkan logika refresh data di sini jika perlu
  };

  // Fungsi untuk menampilkan halaman yang sesuai di dalam MainLayout
  const renderCurrentPage = (): ReactNode => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard 
                  onReportClick={() => setIsReportModalOpen(true)} 
                  onNavigate={setCurrentPage} 
                  userName={profile?.full_name} 
               />;
      case 'challenges':
        return <ChallengesPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} userName={profile?.full_name} />;
      case 'settings':
        return <SettingsPage onLogout={handleLogout} />;
      default:
        return <Dashboard 
                  onReportClick={() => setIsReportModalOpen(true)} 
                  onNavigate={setCurrentPage} 
                  userName={profile?.full_name} 
               />;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat Aplikasi...</div>;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (session && profile) {
    return (
      <>
        <MainLayout
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onReportClick={() => setIsReportModalOpen(true)}
          onChatClick={() => setIsChatOpen(true)}
          userName={profile.full_name}
          onLogout={handleLogout}
        >
          {renderCurrentPage()}
        </MainLayout>

        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSuccess={handleReportSuccess}
        />

        <EcoBotChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
        
        <Sonner />
      </>
    );
  }

  return (
    <>
      <AuthPage onAuthSuccess={() => { /* Dibiarkan kosong karena listener sudah menangani */ }} />
      <Sonner />
    </>
  );
}

export default App;