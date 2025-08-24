import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface EcoBotChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestionsChips = [
  "Bagaimana cara membuang baterai bekas?",
  "Apakah styrofoam bisa didaur ulang?",
  "Buatkan ide kompos sederhana"
];

const mockResponses: Record<string, string> = {
  'baterai': '🔋 **PENTING!** Baterai bekas adalah limbah B3 (Bahan Berbahaya dan Beracun). Jangan dibuang ke tempat sampah biasa!\n\n✅ **Cara yang benar:**\n• Kumpulkan baterai bekas di wadah terpisah\n• Bawa ke toko elektronik yang menerima baterai bekas\n• Atau serahkan ke fasilitas pengelolaan limbah B3 terdekat\n\n⚠️ Baterai mengandung logam berat yang berbahaya bagi lingkungan.',
  
  'styrofoam': '❌ **Styrofoam SULIT didaur ulang** di Indonesia karena:\n• Komposisinya 95% udara\n• Membutuhkan teknologi khusus\n• Tidak ekonomis untuk didaur ulang\n\n✅ **Alternatif yang lebih baik:**\n• Gunakan wadah makanan yang bisa dicuci ulang\n• Pilih kemasan ramah lingkungan\n• Jika terpaksa pakai, gunakan berulang kali untuk penyimpanan',
  
  'kompos': '🌱 **Cara Mudah Membuat Kompos:**\n\n**Bahan yang bisa:**\n• Sisa sayuran dan buah\n• Kulit telur\n• Ampas kopi dan teh\n• Daun kering\n\n**Langkah mudah:**\n1. Siapkan wadah berlubang\n2. Campurkan bahan hijau (sisa makanan) dan coklat (daun kering)\n3. Siram sedikit, aduk seminggu sekali\n4. Kompos siap dalam 2-3 bulan!\n\n💡 Tips: Potong kecil-kecil agar cepat terurai.',
  
  'cat': '🚫 **TIDAK BOLEH!** Cat mengandung bahan kimia berbahaya yang dapat mencemari air.\n\n✅ **Cara yang benar:**\n• Keringkan sisa cat di wadah terbuka\n• Setelah mengeras, buang ke tempat sampah B3\n• Atau bawa ke fasilitas pengelolaan limbat B3 terdekat\n\n💡 **Tips mencegah:**\n• Beli cat sesuai kebutuhan\n• Simpan sisa cat untuk perbaikan kecil'
};

export const EcoBotChat: React.FC<EcoBotChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: '1',
        text: 'Halo! Saya EcoBot, asisten pintarmu. Apa yang ingin kamu ketahui tentang pengelolaan sampah hari ini?',
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in mock responses
    for (const [keyword, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = [
      "Terima kasih atas pertanyaannya! Saya masih belajar tentang topik itu. Mungkin Anda bisa mencoba mencari di situs dinas lingkungan hidup setempat untuk informasi lebih detail.",
      "Pertanyaan yang bagus! Untuk informasi yang lebih spesifik, saya sarankan menghubungi petugas kebersihan RT Anda atau dinas lingkungan hidup setempat.",
      "Maaf, saya belum memiliki informasi lengkap tentang itu. Coba tanyakan hal lain tentang pemilahan sampah atau daur ulang yang bisa saya bantu!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto h-[600px] flex flex-col p-0">
        <DialogHeader className="px-4 py-3 border-b border-border bg-primary/5">
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span>EcoBot</span>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.isBot
                      ? 'bg-primary/10 text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line leading-relaxed">
                    {message.text}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.isBot ? 'text-muted-foreground' : 'text-primary-foreground/70'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {!message.isBot && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-primary/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestion chips - only show if it's the first message */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  Atau coba pertanyaan ini:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestionsChips.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs h-auto py-2 px-3 rounded-full"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanyakan sesuatu tentang sampah..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping}
              className="px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};