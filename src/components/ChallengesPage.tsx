import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Clock, 
  Star, 
  CheckCircle, 
  Target,
  Leaf,
  Users,
  BookOpen,
  Calendar
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  category: 'reporting' | 'education' | 'community';
  points: number;
  progress?: number;
  maxProgress?: number;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'available' | 'active' | 'completed';
  icon: typeof Trophy;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Misi Nol Plastik',
    description: 'Hindari penggunaan plastik sekali pakai selama 7 hari berturut-turut',
    type: 'weekly',
    category: 'reporting',
    points: 150,
    progress: 60,
    maxProgress: 100,
    duration: 'Berakhir dalam 3 hari',
    difficulty: 'medium',
    status: 'active',
    icon: Leaf
  },
  {
    id: '2',
    title: 'Raja Kompos',
    description: 'Buat kompos dari sampah organik minimal 5 hari dalam seminggu',
    type: 'weekly',
    category: 'reporting',
    points: 200,
    progress: 80,
    maxProgress: 100,
    duration: 'Berakhir dalam 2 hari',
    difficulty: 'hard',
    status: 'active',
    icon: Target
  },
  {
    id: '3',
    title: 'Pelapor Konsisten',
    description: 'Laporkan sampah harian selama 3 hari berturut-turut',
    type: 'daily',
    category: 'reporting',
    points: 75,
    duration: 'Tantangan Harian',
    difficulty: 'easy',
    status: 'available',
    icon: Calendar
  },
  {
    id: '4',
    title: 'Ahli Daur Ulang',
    description: 'Pelajari 5 cara kreatif mendaur ulang botol plastik',
    type: 'special',
    category: 'education',
    points: 100,
    duration: 'Tidak ada batas waktu',
    difficulty: 'easy',
    status: 'available',
    icon: BookOpen
  },
  {
    id: '5',
    title: 'EcoHero Ambassador',
    description: 'Ajak 2 teman untuk bergabung dengan EcoHeroes',
    type: 'special',
    category: 'community',
    points: 300,
    duration: 'Tantangan Spesial',
    difficulty: 'hard',
    status: 'available',
    icon: Users
  },
  {
    id: '6',
    title: 'Sampah Organik Champion',
    description: 'Berhasil mengurangi sampah organik sebanyak 10kg dalam sebulan',
    type: 'weekly',
    category: 'reporting',
    points: 250,
    duration: 'Telah selesai',
    difficulty: 'hard',
    status: 'completed',
    icon: Trophy
  }
];

export const ChallengesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const filterChallenges = (status: string) => {
    switch (status) {
      case 'active':
        return mockChallenges.filter(c => c.status === 'active');
      case 'available':
        return mockChallenges.filter(c => c.status === 'available');
      case 'completed':
        return mockChallenges.filter(c => c.status === 'completed');
      default:
        return mockChallenges;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reporting': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'community': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionButton = (challenge: Challenge) => {
    switch (challenge.status) {
      case 'available':
        return (
          <Button className="btn-hero">
            Mulai Tantangan
          </Button>
        );
      case 'active':
        return (
          <Button variant="outline">
            Lihat Progress
          </Button>
        );
      case 'completed':
        return (
          <Button variant="outline" disabled>
            <CheckCircle className="w-4 h-4 mr-2" />
            Selesai
          </Button>
        );
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-accent" />
          Tantangan EcoHeroes
        </h1>
        <p className="text-muted-foreground">
          Selesaikan tantangan dan raih poin untuk jadi EcoHero terhebat!
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Aktif ({mockChallenges.filter(c => c.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Tersedia ({mockChallenges.filter(c => c.status === 'available').length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Selesai ({mockChallenges.filter(c => c.status === 'completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filterChallenges(activeTab).length === 0 ? (
            <Card className="card-elegant text-center py-8">
              <CardContent>
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Tidak ada tantangan {activeTab === 'active' ? 'aktif' : activeTab === 'available' ? 'tersedia' : 'yang selesai'}
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === 'completed' 
                    ? 'Belum ada tantangan yang berhasil diselesaikan. Ayo mulai tantangan pertamamu!'
                    : 'Nantikan tantangan baru atau cek tab lainnya!'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filterChallenges(activeTab).map((challenge) => {
                const Icon = challenge.icon;
                
                return (
                  <Card key={challenge.id} className="card-elegant hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          challenge.status === 'completed' 
                            ? 'bg-success/20' 
                            : challenge.status === 'active'
                              ? 'bg-primary/20'
                              : 'bg-muted'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            challenge.status === 'completed' 
                              ? 'text-success' 
                              : challenge.status === 'active'
                                ? 'text-primary'
                                : 'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                                {challenge.difficulty === 'easy' ? 'Mudah' : 
                                 challenge.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                              </Badge>
                              <Badge className={getCategoryColor(challenge.category)}>
                                {challenge.category === 'reporting' ? 'Pelaporan' :
                                 challenge.category === 'education' ? 'Edukasi' : 'Komunitas'}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm">
                            {challenge.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span className="text-muted-foreground">
                                <Clock className="w-4 h-4 inline mr-1" />
                                {challenge.duration}
                              </span>
                              <span className="font-semibold text-accent">
                                +{challenge.points} Poin
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {challenge.progress !== undefined && challenge.maxProgress && (
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        {getActionButton(challenge)}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};