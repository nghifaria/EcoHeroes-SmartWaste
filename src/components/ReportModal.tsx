import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  Leaf, 
  Trash, 
  FileText, 
  Battery, 
  GlassWater, 
  Trash2, 
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface WasteCategory {
  id: string;
  name: string;
  icon: typeof Leaf;
  color: string;
  bgColor: string;
  estimateText: string;
}

interface SelectedCategory extends WasteCategory {
  weight: number;
}

const wasteCategories: WasteCategory[] = [
  {
    id: 'organik',
    name: 'Organik',
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-100 border-green-200',
    estimateText: '1 kg ≈ 2 mangkuk sisa makanan'
  },
  {
    id: 'plastik',
    name: 'Plastik',
    icon: Trash,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 border-blue-200',
    estimateText: '1 kg ≈ 5 botol besar'
  },
  {
    id: 'kertas',
    name: 'Kertas',
    icon: FileText,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 border-yellow-200',
    estimateText: '1 kg ≈ 50 lembar koran'
  },
  {
    id: 'elektronik',
    name: 'Elektronik',
    icon: Battery,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 border-gray-200',
    estimateText: '1 kg ≈ 10 baterai AA'
  },
  {
    id: 'kaca_logam',
    name: 'Kaca & Logam',
    icon: GlassWater,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100 border-teal-200',
    estimateText: '1 kg ≈ 3 kaleng minuman'
  },
  {
    id: 'lainnya',
    name: 'Lainnya',
    icon: Trash2,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50 border-gray-200',
    estimateText: '1 kg ≈ bervariasi'
  }
];

const quickReportPresets = [
  {
    name: "Hanya Sisa Makanan",
    categories: [{ id: 'organik', weight: 1.0 }]
  },
  {
    name: "Botol Plastik & Kardus",
    categories: [
      { id: 'plastik', weight: 0.5 },
      { id: 'kertas', weight: 1.2 }
    ]
  }
];

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryWeights, setCategoryWeights] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedCategories([]);
    setCategoryWeights({});
    setNotes('');
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      const newWeights = { ...categoryWeights };
      delete newWeights[categoryId];
      setCategoryWeights(newWeights);
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      setCategoryWeights({ ...categoryWeights, [categoryId]: 0.5 });
    }
  };

  const updateWeight = (categoryId: string, weight: number) => {
    setCategoryWeights({ ...categoryWeights, [categoryId]: Math.max(0, Math.min(5, weight)) });
  };

  const applyQuickPreset = (preset: typeof quickReportPresets[0]) => {
    const categories = preset.categories.map(c => c.id);
    const weights: Record<string, number> = {};
    preset.categories.forEach(c => {
      weights[c.id] = c.weight;
    });
    
    setSelectedCategories(categories);
    setCategoryWeights(weights);
  };

  const calculateTotalPoints = () => {
    const pointsPerKg = { organik: 15, plastik: 20, kertas: 10, elektronik: 30, kaca_logam: 18, lainnya: 8 };
    return selectedCategories.reduce((total, categoryId) => {
      const weight = categoryWeights[categoryId] || 0;
      return total + (weight * (pointsPerKg[categoryId as keyof typeof pointsPerKg] || 10));
    }, 0);
  };

  const handleSubmitReport = async () => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      const points = Math.round(calculateTotalPoints());
      
      toast({
        title: "Laporan Terkirim! ✨",
        description: `Selamat! Kamu mendapat ${points} poin dan 1 hari laporan beruntun.`,
      });
      
      onSuccess();
      handleClose();
    }, 1500);
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedCategories.length > 0;
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Laporan Sampah Baru</span>
            <span className="text-sm font-normal text-muted-foreground">
              {currentStep}/{totalSteps}
            </span>
          </DialogTitle>
          <Progress value={progressPercentage} className="h-2 mt-2" />
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold mb-2">Pilih Kategori Sampah</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pilih satu atau lebih kategori sampah yang ingin dilaporkan
                </p>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-primary">Laporan Cepat</Label>
                <div className="flex gap-2">
                  {quickReportPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => applyQuickPreset(preset)}
                      className="text-xs"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 gap-3">
                {wasteCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategories.includes(category.id);
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                        isSelected 
                          ? 'border-primary bg-primary/10 shadow-md' 
                          : `${category.bgColor} hover:shadow-md`
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : category.color}`} />
                        <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {category.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-primary ml-auto" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Weight Input */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold mb-2">Input Jumlah & Detail</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Masukkan perkiraan berat untuk setiap kategori
                </p>
              </div>

              <div className="space-y-6">
                {selectedCategories.map((categoryId) => {
                  const category = wasteCategories.find(c => c.id === categoryId)!;
                  const Icon = category.icon;
                  const weight = categoryWeights[categoryId] || 0;

                  return (
                    <div key={categoryId} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateWeight(categoryId, weight - 0.1)}
                            disabled={weight <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <div className="flex-1">
                            <Slider
                              value={[weight]}
                              onValueChange={([value]) => updateWeight(categoryId, value)}
                              max={5}
                              step={0.1}
                              className="w-full"
                            />
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateWeight(categoryId, weight + 0.1)}
                            disabled={weight >= 5}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          
                          <Input
                            type="number"
                            value={weight.toFixed(1)}
                            onChange={(e) => updateWeight(categoryId, parseFloat(e.target.value) || 0)}
                            className="w-20 text-center"
                            min="0"
                            max="5"
                            step="0.1"
                          />
                          
                          <span className="text-sm text-muted-foreground">kg</span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">{category.estimateText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Contoh: Kardus bekas pindahan, baterai bekas dari remote TV"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold mb-2">Periksa Kembali Laporan Anda</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pastikan semua informasi sudah benar sebelum mengirim
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Tanggal:</span>
                  <span>{new Date().toLocaleDateString('id-ID')}</span>
                </div>
                
                <div>
                  <span className="font-medium">Daftar Sampah:</span>
                  <div className="mt-2 space-y-1">
                    {selectedCategories.map((categoryId) => {
                      const category = wasteCategories.find(c => c.id === categoryId)!;
                      const weight = categoryWeights[categoryId] || 0;
                      return (
                        <div key={categoryId} className="flex justify-between text-sm">
                          <span>{category.name}:</span>
                          <span className="font-medium">{weight.toFixed(1)} kg</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {notes && (
                  <div>
                    <span className="font-medium">Catatan:</span>
                    <p className="text-sm mt-1">{notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold text-primary">
                    +{Math.round(calculateTotalPoints())} Poin
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kamu akan mendapatkan poin dan 1 hari laporan beruntun!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1) {
                handleClose();
              } else {
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {currentStep === 1 ? 'Batal' : 'Kembali'}
          </Button>

          <Button
            onClick={() => {
              if (currentStep === totalSteps) {
                handleSubmitReport();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={!canProceed() || loading}
            className="btn-hero"
          >
            {loading ? (
              'Mengirim...'
            ) : currentStep === totalSteps ? (
              'Kirim Laporan'
            ) : (
              <>
                Lanjut
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};