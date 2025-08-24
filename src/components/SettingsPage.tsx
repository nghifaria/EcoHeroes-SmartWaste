import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Bell, 
  Info, 
  HelpCircle, 
  Shield, 
  LogOut,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsPageProps {
  onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Ahmad Wijaya',
    phone: '08123456789',
    rtRw: 'RT 03 / RW 05 - Kelurahan Tugu Utara'
  });

  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    newChallenges: true,
    communityUpdates: false
  });

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profil tersimpan",
      description: "Perubahan profil Anda telah berhasil disimpan.",
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Kata sandi tidak cocok",
        description: "Pastikan konfirmasi kata sandi sesuai dengan kata sandi baru.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Kata sandi terlalu pendek",
        description: "Kata sandi minimal harus 6 karakter.",
        variant: "destructive"
      });
      return;
    }

    // Mock password change
    toast({
      title: "Kata sandi berhasil diubah",
      description: "Kata sandi Anda telah berhasil diperbarui.",
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangePasswordOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('ecoheroes_authenticated');
    localStorage.removeItem('ecoheroes_onboarding_complete');
    
    toast({
      title: "Berhasil keluar",
      description: "Anda telah keluar dari EcoHeroes. Sampai jumpa!",
    });

    // Reload the page to reset app state
    window.location.reload();
  };

  const settingsLinks = [
    {
      title: 'Tentang EcoHeroes',
      description: 'Pelajari lebih lanjut tentang aplikasi ini',
      icon: Info,
      action: () => toast({ title: "Coming Soon", description: "Halaman ini akan segera tersedia." })
    },
    {
      title: 'Pusat Bantuan',
      description: 'FAQ dan cara menghubungi dukungan',
      icon: HelpCircle,
      action: () => toast({ title: "Coming Soon", description: "Pusat bantuan akan segera tersedia." })
    },
    {
      title: 'Kebijakan Privasi',
      description: 'Pelajari bagaimana kami melindungi data Anda',
      icon: Shield,
      action: () => toast({ title: "Coming Soon", description: "Kebijakan privasi akan segera tersedia." })
    }
  ];

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Settings className="w-6 h-6" />
          Pengaturan
        </h1>
      </div>

      {/* Account Settings */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Pengaturan Akun
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <Input
              id="fullName"
              value={userInfo.fullName}
              onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              value={userInfo.phone}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Nomor telepon tidak dapat diubah
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rtRw">RT/RW</Label>
            <Input
              id="rtRw"
              value={userInfo.rtRw}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Hubungi admin untuk mengubah RT/RW
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveProfile} className="btn-hero">
              Simpan Perubahan
            </Button>

            <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Ubah Kata Sandi
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ubah Kata Sandi</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Kata Sandi Lama</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleChangePassword} className="btn-hero">
                      Ubah Kata Sandi
                    </Button>
                    <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                      Batal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Pengaturan Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dailyReminder">Notifikasi Push Harian</Label>
              <p className="text-sm text-muted-foreground">
                Ingatkan saya untuk melapor setiap hari pukul 19:00
              </p>
            </div>
            <Switch
              id="dailyReminder"
              checked={notifications.dailyReminder}
              onCheckedChange={(checked) => setNotifications({...notifications, dailyReminder: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="newChallenges">Notifikasi Tantangan Baru</Label>
              <p className="text-sm text-muted-foreground">
                Beri tahu saya jika ada tantangan baru yang tersedia
              </p>
            </div>
            <Switch
              id="newChallenges"
              checked={notifications.newChallenges}
              onCheckedChange={(checked) => setNotifications({...notifications, newChallenges: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="communityUpdates">Notifikasi Komunitas</Label>
              <p className="text-sm text-muted-foreground">
                Kirim pembaruan tentang pencapaian RT saya
              </p>
            </div>
            <Switch
              id="communityUpdates"
              checked={notifications.communityUpdates}
              onCheckedChange={(checked) => setNotifications({...notifications, communityUpdates: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Other Settings */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Lainnya</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {settingsLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                onClick={link.action}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{link.title}</div>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="card-elegant border-destructive/20">
        <CardContent className="p-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar (Logout)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
