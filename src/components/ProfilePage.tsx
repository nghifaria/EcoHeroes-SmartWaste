import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  FileCheck, 
  Trophy, 
  CalendarDays, 
  Settings,
  ChevronRight,
  Crown,
  Leaf,
  Target,
  Flame,
  Award,
  Eye
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  userName?: string;
}

interface Badge {
  id: string;
  name: string;
  icon: typeof Award;
  description: string;
  earned: boolean;
  color: string;
}

const mockBadges: Badge[] = [
  {
    id: 'first-reporter',
    name: 'Pelapor Pertama',
    icon: FileCheck,
    description: 'Mengirim laporan pertama',
    earned: true,
    color: 'text-blue-500'
  },
  {
    id: 'compost-hero',
    name: 'Pahlawan Kompos',
    icon: Leaf,
    description: 'Melaporkan 10kg sampah organik',
    earned: true,
    color: 'text-green-500'
  },
  {
    id: 'recycling-warrior',
    name: 'Pejuang Daur Ulang',
    icon: Target,
    description: 'Melaporkan 10kg sampah plastik/kertas',
    earned: true,
    color: 'text-blue-600'
  },
  {
    id: 'streak-7',
    name: 'Streak 7 Hari',
    icon: Flame,
    description: 'Melapor 7 hari berturut-turut',
    earned: true,
    color: 'text-orange-500'
  },
  {
    id: 'visionary',
    name: 'Visioner Lingkungan',
    icon: Crown,
    description: 'Menyelesaikan 10 tantangan',
    earned: false,
    color: 'text-purple-500'
  },
  {
    id: 'community-leader',
    name: 'Pemimpin Komunitas',
    icon: Trophy,
    description: 'Masuk 3 besar leaderboard RT',
    earned: true,
    color: 'text-amber-500'
  }
];

const mockRecentReports = [
  {
    id: '1',
    date: '2025-08-24',
    points: 45,
    status: 'approved',
    categories: ['Organik', 'Plastik']
  },
  {
    id: '2',
    date: '2025-08-23',
    points: 30,
    status: 'approved',
    categories: ['Kertas']
  },
  {
    id: '3',
    date: '2025-08-22',
    points: 25,
    status: 'approved',
    categories: ['Organik']
  },
  {
    id: '4',
    date: '2025-08-21',
    points: 60,
    status: 'approved',
    categories: ['Plastik', 'Kaca & Logam']
  }
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ 
  onNavigate, 
  userName = "Ahmad Wijaya" 
}) => {
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
  const joinDate = "Agustus 2025";
  const rtName = "RT 03 / RW 05";
  
  const earnedBadges = mockBadges.filter(badge => badge.earned);
  const totalBadges = mockBadges.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'approved' ? (
      <Badge className="bg-success/10 text-success border-success/20">
        Disetujui
      </Badge>
    ) : (
      <Badge variant="outline">
        Pending
      </Badge>
    );
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto pb-20">
      {/* Profile Header */}
      <Card className="card-elegant bg-gradient-subtle">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{userName}</h2>
              <p className="text-muted-foreground">Warga {rtName}</p>
              <p className="text-sm text-muted-foreground">
                Bergabung sejak {joinDate}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('settings')}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Pengaturan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lifetime Statistics */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Statistik Aksi Hijau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1,250</div>
                <div className="text-sm text-muted-foreground">Total Poin</div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24</div>
                <div className="text-sm text-muted-foreground">Laporan Terkirim</div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">8</div>
                <div className="text-sm text-muted-foreground">Tantangan Selesai</div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-info/20 rounded-full flex items-center justify-center mx-auto">
                <CalendarDays className="w-6 h-6 text-info" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">Senin</div>
                <div className="text-sm text-muted-foreground">Hari Teraktif</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      <Card className="card-elegant">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Lencana Kebanggaan
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {earnedBadges.length}/{totalBadges}
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {mockBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`text-center space-y-2 cursor-pointer transition-all hover:scale-105 ${
                    !badge.earned ? 'opacity-50 grayscale' : ''
                  }`}
                  title={badge.description}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    badge.earned 
                      ? 'bg-amber-100 border-2 border-amber-200' 
                      : 'bg-gray-100 border-2 border-gray-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${badge.earned ? badge.color : 'text-gray-400'}`} />
                  </div>
                  <div className="text-xs font-medium text-foreground">
                    {badge.name}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Ketuk lencana untuk melihat cara mendapatkannya
          </p>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="card-elegant">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            Aktivitas Terbaru
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('history')}
            className="text-primary hover:text-primary/80"
          >
            Lihat Semua Riwayat
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {formatDate(report.date)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {report.categories.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-accent">
                    +{report.points} poin
                  </span>
                  {getStatusBadge(report.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};