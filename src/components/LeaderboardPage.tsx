import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Crown, Trophy, Medal, Star, Users, Calendar } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
  avatar?: string;
}

const mockRtLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'RT 05 / RW 03', points: 4250, rank: 1 },
  { id: '2', name: 'RT 03 / RW 05', points: 3890, rank: 2, isCurrentUser: true },
  { id: '3', name: 'RT 01 / RW 03', points: 3650, rank: 3 },
  { id: '4', name: 'RT 02 / RW 05', points: 3420, rank: 4 },
  { id: '5', name: 'RT 04 / RW 03', points: 3100, rank: 5 },
  { id: '6', name: 'RT 06 / RW 05', points: 2950, rank: 6 },
  { id: '7', name: 'RT 01 / RW 05', points: 2780, rank: 7 },
  { id: '8', name: 'RT 02 / RW 03', points: 2650, rank: 8 },
];

const mockUserLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Siti Nurhaliza', points: 1250, rank: 1 },
  { id: '2', name: 'Budi Santoso', points: 1180, rank: 2 },
  { id: '3', name: 'Ahmad Wijaya', points: 1120, rank: 3, isCurrentUser: true },
  { id: '4', name: 'Rina Wati', points: 1050, rank: 4 },
  { id: '5', name: 'Dedy Kurniawan', points: 980, rank: 5 },
  { id: '6', name: 'Maya Sari', points: 920, rank: 6 },
  { id: '7', name: 'Agus Prasetyo', points: 850, rank: 7 },
  { id: '8', name: 'Lina Marlina', points: 780, rank: 8 },
];

export const LeaderboardPage: React.FC = () => {
  const [activeScope, setActiveScope] = useState<'rt' | 'user'>('rt');
  const [activePeriod, setActivePeriod] = useState<'week' | 'month' | 'all'>('month');

  const currentData = activeScope === 'rt' ? mockRtLeaderboard : mockUserLeaderboard;
  const currentUser = currentData.find(entry => entry.isCurrentUser);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'bg-primary/10 border-primary/20 border-2';
    }
    if (rank <= 3) {
      return 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200';
    }
    return 'bg-card border-border';
  };

  const getMotivationalMessage = () => {
    if (!currentUser) return '';
    
    const rank = currentUser.rank;
    const nextUser = currentData.find(entry => entry.rank === rank - 1);
    
    if (rank === 1) {
      return '🎉 Selamat! Kamu di peringkat teratas!';
    } else if (nextUser) {
      const pointsNeeded = nextUser.points - currentUser.points;
      return `Terus beraksi! Kamu hanya butuh ${pointsNeeded} poin lagi untuk menyusul ${nextUser.name}.`;
    }
    return 'Terus semangat berjuang untuk lingkungan!';
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-accent" />
          Papan Peringkat
        </h1>
        <p className="text-muted-foreground">
          Lihat pencapaian komunitas dan raih posisi teratas!
        </p>
      </div>

      {/* Filters */}
      <Card className="card-elegant">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Lingkup:</p>
              <div className="flex gap-2">
                <Button
                  variant={activeScope === 'rt' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveScope('rt')}
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Antar RT
                </Button>
                <Button
                  variant={activeScope === 'user' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveScope('user')}
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Warga RT Saya
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Periode:</p>
              <div className="flex gap-2">
                <Button
                  variant={activePeriod === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePeriod('week')}
                >
                  Minggu Ini
                </Button>
                <Button
                  variant={activePeriod === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePeriod('month')}
                >
                  Bulan Ini
                </Button>
                <Button
                  variant={activePeriod === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePeriod('all')}
                >
                  Selamanya
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      {currentUser && getMotivationalMessage() && (
        <Card className="card-elegant bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-primary font-medium">
              {getMotivationalMessage()}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            {activeScope === 'rt' ? 'Peringkat RT' : 'Peringkat Warga RT 03'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentData.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${getRankBg(entry.rank, entry.isCurrentUser || false)}`}
            >
              <div className="flex items-center justify-center w-12">
                {getRankIcon(entry.rank)}
              </div>

              <div className="flex items-center gap-3 flex-1">
                {activeScope === 'user' && (
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {entry.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${entry.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                      {entry.name}
                    </span>
                    {entry.isCurrentUser && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Kamu
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-foreground">
                  {entry.points.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  poin
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Data diperbarui setiap hari pukul 00:00 WIB
      </div>
    </div>
  );
};