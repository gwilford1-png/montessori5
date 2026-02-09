import React, { useMemo } from 'react';
import { Brain, Heart, Activity, Sparkles, MessageCircle, Wrench, Shapes } from 'lucide-react';

interface GeminiIllustrationProps {
  title: string;
  category?: string;
  className?: string;
}

const GeminiIllustration: React.FC<GeminiIllustrationProps> = ({ category, className }) => {
  const Icon = useMemo(() => {
    switch (category) {
      case 'Physical': return Activity;
      case 'Cognitive': return Brain;
      case 'Social': return Heart;
      case 'Sensory': return Sparkles;
      case 'Language': return MessageCircle;
      case 'Practical Life': return Wrench;
      default: return Shapes;
    }
  }, [category]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Icon size={32} strokeWidth={1.5} className="text-[#007AFF]" />
    </div>
  );
};

export default GeminiIllustration;