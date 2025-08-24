import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import onboarding1 from '@/assets/onboarding-1.jpg';
import onboarding2 from '@/assets/onboarding-2.jpg';
import onboarding3 from '@/assets/onboarding-3.jpg';

interface OnboardingStep {
  image: string;
  title: string;
  description: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    image: onboarding1,
    title: "Lacak & Pahami Sampah Anda",
    description: "Catat sampah harian Anda dengan mudah dan lihat dampaknya terhadap lingkungan secara langsung."
  },
  {
    image: onboarding2,
    title: "Ubah Kebiasaan, Menangkan Tantangan",
    description: "Ikuti tantangan mingguan, bersaing secara sehat dengan tetangga Anda, dan dapatkan poin untuk setiap aksi hijau."
  },
  {
    image: onboarding3,
    title: "Jadilah Pahlawan untuk Komunitas Anda",
    description: "Bergabunglah dengan ribuan EcoHeroes lainnya dan wujudkan lingkungan RT yang lebih bersih dan berkelanjutan."
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Image */}
          <div className="mb-8">
            <img 
              src={step.image} 
              alt={step.title}
              className="w-full h-64 object-cover rounded-2xl shadow-elegant"
            />
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {step.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-primary' 
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali
        </Button>

        <Button 
          onClick={nextStep}
          className="btn-hero flex items-center gap-2"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Mulai Sekarang' : 'Lanjut'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};