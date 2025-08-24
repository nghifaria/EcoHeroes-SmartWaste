import React, { useState, useEffect } from 'react'; // <-- Tambahkan useEffect
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-image.jpg';

// Tipe untuk data RT yang diambil dari database
interface RtOption {
  id: string; // Ini adalah UUID
  name: string;
}

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // State untuk menyimpan daftar RT dari database
  const [rtOptions, setRtOptions] = useState<RtOption[]>([]);

  const [signInData, setSignInData] = useState({ phone: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    phone: '',
    rtRw: '', // Ini akan menyimpan UUID RT yang dipilih
    password: '',
    confirmPassword: ''
  });

  // --- Kode Baru: Ambil data RT saat komponen dimuat ---
  useEffect(() => {
    const fetchRtOptions = async () => {
      const { data, error } = await supabase.from('rts').select('id, name');
      
      if (error) {
        console.error('Gagal mengambil data RT:', error);
        toast({
          variant: 'destructive',
          title: 'Gagal Memuat Data RT/RW',
          description: 'Pastikan tabel "rts" Anda tidak kosong.',
        });
      } else {
        setRtOptions(data);
      }
    };
    fetchRtOptions();
  }, [toast]);
  // --------------------------------------------------

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: `${signInData.phone}@ecoheroes.app`,
        password: signInData.password,
      });
      if (error) throw error;
      toast({
        title: "Selamat datang kembali!",
        description: "Anda berhasil masuk ke EcoHeroes.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: error.message || "Nomor telepon atau kata sandi salah.",
      });
    } finally {
      setLoading(false);
    }
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
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `${signUpData.phone}@ecoheroes.app`,
        password: signUpData.password,
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error("Pendaftaran berhasil, tapi data pengguna tidak ditemukan.");

      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        full_name: signUpData.fullName,
        phone_number: signUpData.phone,
        rt_id: signUpData.rtRw, // Kirim UUID yang valid
      });
      if (profileError) throw profileError;

      toast({
        title: "Akun berhasil dibuat!",
        description: "Selamat bergabung dengan EcoHeroes.",
      });
    } catch (error: any) {
      console.error('Detail Error Sign Up:', error); // <-- Tambahkan ini untuk debugging
      toast({
        variant: "destructive",
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Kolom Kiri - Visual */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-hero relative overflow-hidden">
        {/* ... (Konten visual tetap sama) ... */}
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

      {/* Kolom Kanan - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md card-elegant">
          {/* ... (Header Card tetap sama) ... */}
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
              
              {/* Form Sign In */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* ... (Isi form Sign In tetap sama) ... */}
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
                </form>
              </TabsContent>
              
              {/* Form Sign Up */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {/* ... (Input Nama dan Telepon tetap sama) ... */}
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
                  
                  {/* --- Ganti Dropdown RT/RW --- */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-rt">Pilih RT/RW</Label>
                    <Select required value={signUpData.rtRw} onValueChange={(value) => setSignUpData({...signUpData, rtRw: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih RT/RW Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        {rtOptions.length > 0 ? (
                          rtOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="loading" disabled>
                            Memuat data RT...
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* --------------------------- */}
                  
                  {/* ... (Input Password dan Konfirmasi tetap sama) ... */}
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
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};