import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FestivalConfig {
  name: string;
  title: string;
  subtitle: string;
  discount: string;
  color: string;
  bgImage: string;
  isActive: boolean;
}

// This can be easily updated or fetched from an API
const ACTIVE_FESTIVAL: FestivalConfig = {
  name: 'Holi',
  title: 'Holi Hungama Sale',
  subtitle: 'Splash into savings with our vibrant ethnic collection!',
  discount: 'UP TO 50% OFF',
  color: '#E91E63', // Pinkish for Holi
  bgImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000',
  isActive: true
};

export const FestivalBanner: React.FC = () => {
  if (!ACTIVE_FESTIVAL.isActive) return null;

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden flex items-center">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: `url(${ACTIVE_FESTIVAL.bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="flex items-center space-x-2 text-brand-gold mb-4">
            <Sparkles size={20} className="animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">{ACTIVE_FESTIVAL.name} Special</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            {ACTIVE_FESTIVAL.title}
          </h2>
          
          <p className="text-white/80 text-lg mb-8 max-w-md">
            {ACTIVE_FESTIVAL.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-brand-gold text-brand-dark px-6 py-3 rounded-full font-bold text-2xl shadow-xl animate-bounce">
              {ACTIVE_FESTIVAL.discount}
            </div>
            
            <button className="group bg-white text-brand-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-maroon hover:text-white transition-all flex items-center shadow-2xl">
              Explore Collection
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-brand-gold/30 rounded-full border-dashed"
        />
      </div>
    </section>
  );
};
