import React, { ReactNode } from 'react';
import { Home, PlusCircle, Trophy, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onReportClick: () => void;
  onChatClick: () => void;
  userName?: string;
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate, 
  onReportClick,
  onChatClick,
  userName = "EcoHero"
}) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'report', label: 'Lapor', icon: PlusCircle, isAction: true },
    { id: 'challenges', label: 'Tantangan', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  const getPageTitle = (page: string) => {
    switch (page) {
      case 'dashboard': return 'Dasbor';
      case 'challenges': return 'Tantangan';
      case 'leaderboard': return 'Papan Peringkat';
      case 'profile': return 'Profil Saya';
      case 'settings': return 'Pengaturan';
      default: return 'EcoHeroes';
    }
  };

  const handleNavClick = (itemId: string) => {
    if (itemId === 'report') {
      onReportClick();
    } else {
      onNavigate(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">
          {getPageTitle(currentPage)}
        </h1>
        
        <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isActionButton = item.isAction;
            
            return (
              <Button
                key={item.id}
                variant={isActionButton ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 h-auto transition-all ${
                  isActionButton 
                    ? 'btn-hero scale-110 shadow-lg' 
                    : isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActionButton ? 'w-6 h-6' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button for EcoBot */}
      <Button
        onClick={onChatClick}
        className="fab animate-bounce-gentle hover:animate-none"
        title="Tanya EcoBot"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};