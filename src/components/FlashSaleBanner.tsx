import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, X } from 'lucide-react';

export const FlashSaleBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-brand-maroon text-white relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent scale-150 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 md:py-2 flex flex-col md:flex-row items-center justify-between relative z-10 gap-4">
          {/* Left: Sale Info */}
          <div className="flex items-center space-x-3">
            <div className="bg-brand-gold p-1.5 rounded-full text-brand-maroon animate-bounce">
              <Zap size={14} fill="currentColor" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Flash Sale Live</span>
              <span className="text-[10px] md:text-xs text-brand-gold font-medium uppercase tracking-[0.2em] opacity-80">Extra 15% OFF on all Sarees</span>
            </div>
          </div>

          {/* Center: Countdown */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center">
                <span className="text-lg md:text-xl font-serif font-bold leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-tighter opacity-60">Hrs</span>
              </div>
              <span className="text-brand-gold font-bold mb-2">:</span>
              <div className="flex flex-col items-center">
                <span className="text-lg md:text-xl font-serif font-bold leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-tighter opacity-60">Min</span>
              </div>
              <span className="text-brand-gold font-bold mb-2">:</span>
              <div className="flex flex-col items-center">
                <span className="text-lg md:text-xl font-serif font-bold leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[8px] uppercase tracking-tighter opacity-60">Sec</span>
              </div>
            </div>
            
            <div className="hidden lg:block h-8 w-px bg-white/20 mx-4" />
            
            <div className="hidden lg:flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest opacity-60">Use Code:</span>
              <span className="px-2 py-1 bg-white/10 rounded border border-white/20 text-xs font-bold tracking-widest text-brand-gold">FLASH15</span>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center space-x-4">
            <button className="bg-white text-brand-maroon px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center group shadow-lg">
              Shop the Sale <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors opacity-40 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
