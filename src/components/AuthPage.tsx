import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-image.jpg';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    phone: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    phone: '',
    rtRw: '',
    password: '',
    confirmPassword: ''
  });

  const mockRtOptions = [
    { value: 'rt01-rw05', label: 'RT 01 / RW 05 - Kelurahan Tugu Utara' },
    { value: 'rt02-rw05', label: 'RT 02 / RW 05 - Kelurahan Tugu Utara' },
    { value: 'rt03-rw05', label: 'RT 03 / RW 05 - Kelurahan Tugu Utara' },
    { value: 'rt01-rw06', label: 'RT 01 / RW 06 - Kelurahan Tugu Utara' },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock sign in - in real app, this would call Supabase auth
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Selamat datang!",
        description: "Anda berhasil masuk ke EcoHeroes.",
      });
      onAuthSuccess();
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Kata sandi tidak cocok",
        description: "Pastikan konfirmasi kata sandi sesuai.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Mock sign up - in real app, this would call Supabase auth
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Akun berhasil dibuat!",
        description: "Selamat bergabung dengan EcoHeroes.",
      });
      onAuthSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Visual (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="EcoHeroes Hero" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">EcoHeroes</h1>
          </div>
          <p className="text-xl text-center leading-relaxed opacity-90">
            "Aksi Kecil, Dampak Besar"
          </p>
          <p className="text-center mt-4 opacity-80">
            Bergabunglah dengan komunitas peduli lingkungan dan jadilah pahlawan untuk masa depan yang lebih hijau.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md card-elegant">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4 md:hidden">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary">EcoHeroes</h1>
            </div>
            <CardTitle className="text-2xl">
              {activeTab === 'signin' ? 'Selamat Datang Kembali' : 'Bergabung dengan EcoHeroes'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Masuk</TabsTrigger>
                <TabsTrigger value="signup">Daftar</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-phone">Nomor Telepon</Label>
                    <Input
                      id="signin-phone"
                      type="tel"
                      placeholder="08123456789"
                      value={signInData.phone}
                      onChange={(e) => setSignInData({...signInData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Kata Sandi</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={signInData.password}
                        onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Button variant="link" className="px-0 text-primary">
                      Lupa Kata Sandi?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full btn-hero" disabled={loading}>
                    {loading ? 'Memproses...' : 'Masuk'}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">atau</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" type="button">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Masuk dengan Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Belum punya akun?{' '}
                    <Button variant="link" className="px-0 text-primary" onClick={() => setActiveTab('signup')}>
                      Daftar gratis
                    </Button>
                  </p>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nama Lengkap</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Nomor Telepon</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="08123456789"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({...signUpData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-rt">Pilih RT/RW</Label>
                    <Select value={signUpData.rtRw} onValueChange={(value) => setSignUpData({...signUpData, rtRw: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih RT/RW Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRtOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Kata Sandi</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Konfirmasi Kata Sandi</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-hero" disabled={loading}>
                    {loading ? 'Membuat Akun...' : 'Buat Akun'}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{' '}
                    <Button variant="link" className="px-0 text-primary" onClick={() => setActiveTab('signin')}>
                      Masuk di sini
                    </Button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};