import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-dark">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/hero-ethnic/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover opacity-60 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-gold/20 backdrop-blur-md rounded-full border border-brand-gold/30 mb-8">
              <Sparkles size={16} className="text-brand-gold" />
              <span className="text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-[0.3em]">New Festive Collection 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[0.9] tracking-tighter">
              Affordable <br />
              <span className="text-brand-gold italic">Elegance</span> for <br />
              Every Woman.
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-xl leading-relaxed font-light">
              Discover Surat's finest handcrafted sarees and suits. Premium quality meets honest pricing. Experience the RoziRoti promise.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="gold-shimmer text-brand-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all flex items-center justify-center group">
                Shop Collection <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 rounded-2xl border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all backdrop-blur-md">
                View Lookbook
              </button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-12"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Truck className="text-brand-gold" size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Fast Delivery</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">3-5 Business Days</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <ShieldCheck className="text-brand-gold" size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Secure Payment</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">100% Protected</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Sparkles className="text-brand-gold" size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Premium Quality</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Handpicked Fabrics</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[600px] h-[600px] bg-brand-maroon/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
