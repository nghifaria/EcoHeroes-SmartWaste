import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, Flame, BarChart3, Plus, TreePine, Droplets, Zap, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onReportClick: () => void;
  onNavigate: (page: string) => void;
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onReportClick, 
  onNavigate,
  userName = "EcoHero" 
}) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Selamat pagi';
    if (currentHour < 17) return 'Selamat siang';
    return 'Selamat malam';
  };

  const motivationalMessages = [
    "Ayo buat hari ini lebih hijau!",
    "Setiap sampah yang dipilah berarti.",
    "Kamu sudah hebat, terus semangat!",
    "Bersama kita jaga bumi.",
    "Aksi kecilmu berdampak besar!"
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  const mockChallenges = [
    {
      id: 1,
      title: "Kurangi Sampah Plastik",
      progress: 60,
      maxProgress: 100,
      reward: 100,
      description: "Hindari plastik sekali pakai selama seminggu"
    },
    {
      id: 2,
      title: "Kompos Master",
      progress: 80,
      maxProgress: 100,
      reward: 150,
      description: "Buat kompos dari sampah organik 5 hari berturut"
    }
  ];

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Hero Card - Welcome & Summary */}
      <Card className="card-elegant bg-gradient-subtle">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {getGreeting()}, {userName}!
              </h2>
              <p className="text-muted-foreground mt-1">
                {randomMessage}
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-foreground">1,250</span>
                </div>
                <span className="text-sm text-muted-foreground">Poin Saya</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-red-500" />
                  <span className="text-2xl font-bold text-foreground">5</span>
                </div>
                <span className="text-sm text-muted-foreground">Hari Beruntun</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">#3</span>
                </div>
                <span className="text-sm text-muted-foreground">Peringkat RT</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Action Card */}
      <Card className="card-elegant border-primary/20 bg-primary/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Sudah siap melapor hari ini?
          </h3>
          <p className="text-muted-foreground mb-4">
            Catat sampah harianmu dan raih poin untuk lingkungan yang lebih bersih.
          </p>
          <Button 
            onClick={onReportClick}
            className="btn-hero text-lg px-8 py-3 h-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Lapor Sampah Sekarang
          </Button>
        </CardContent>
      </Card>

      {/* Active Challenges Card */}
      <Card className="card-elegant">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-semibold">Tantangan Mingguan</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('challenges')}
            className="text-primary hover:text-primary/80"
          >
            Lihat Semua
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockChallenges.map((challenge) => (
            <div key={challenge.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-accent">+{challenge.reward} Poin</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Environmental Impact Card */}
      <Card className="card-elegant bg-success/10 border-success/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-success">Dampak Positif Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">15.2 kg</div>
                <div className="text-sm text-muted-foreground">CO₂ Tereduksi</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <TreePine className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Pohon Diselamatkan</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Droplets className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">120L</div>
                <div className="text-sm text-muted-foreground">Air Dihemat</div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Estimasi berdasarkan laporan sampah Anda bulan ini
          </p>
        </CardContent>
      </Card>
    </div>
  );
};