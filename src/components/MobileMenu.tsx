import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, User, Star, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onViewWishlist: () => void;
  onViewCart: () => void;
  onAdminLogin: () => void;
  setSelectedCategory: (cat: Category | 'All') => void;
  loyaltyPoints: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen, onClose, onViewWishlist, onViewCart, onAdminLogin, setSelectedCategory, loyaltyPoints
}) => {
  const menuItems = [
    { name: 'Sarees', category: 'Sarees' as Category },
    { name: 'Suits', category: 'Suits' as Category },
    { name: 'Festive Collection', category: 'All' as const },
    { name: 'New Arrivals', category: 'All' as const },
    { name: 'Budget Shop', category: 'All' as const },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[200]"
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[201] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-gold/10 flex justify-between items-center bg-brand-beige/10">
              <div className="flex flex-col">
                <h2 className="text-2xl font-serif font-bold text-brand-maroon">RoziRoti</h2>
                <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold font-bold">by Ratna</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-brand-maroon/10 rounded-full transition-colors">
                <X size={24} className="text-brand-maroon" />
              </button>
            </div>

            {/* Loyalty Bar */}
            <div className="p-4 bg-brand-maroon text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-brand-gold fill-brand-gold" />
                <span className="text-xs font-bold uppercase tracking-widest">Loyalty Points</span>
              </div>
              <span className="text-sm font-bold">{loyaltyPoints}</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="px-6 mb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">Shop Categories</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button 
                      key={item.name}
                      onClick={() => { setSelectedCategory(item.category); onClose(); }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-brand-beige/30 transition-colors group"
                    >
                      <span className="text-lg font-serif text-brand-dark group-hover:text-brand-maroon transition-colors">{item.name}</span>
                      <ArrowRight size={18} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 mb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { onViewWishlist(); onClose(); }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-brand-beige/20 border border-brand-gold/5 hover:border-brand-maroon transition-all"
                  >
                    <Heart size={24} className="text-brand-maroon mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Wishlist</span>
                  </button>
                  <button 
                    onClick={() => { onViewCart(); onClose(); }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-brand-beige/20 border border-brand-gold/5 hover:border-brand-maroon transition-all"
                  >
                    <ShoppingBag size={24} className="text-brand-maroon mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Bag</span>
                  </button>
                </div>
              </div>

              <div className="px-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">Contact & Support</h3>
                <div className="space-y-4 text-sm text-brand-dark/60">
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-brand-gold" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-brand-gold" />
                    <span>hello@roziroti.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-brand-gold/10 bg-brand-beige/5">
              <button 
                onClick={() => { onAdminLogin(); onClose(); }}
                className="w-full flex items-center justify-center space-x-2 p-4 rounded-xl border border-brand-gold/20 text-brand-dark/60 hover:text-brand-maroon transition-colors mb-6"
              >
                <User size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Admin Login</span>
              </button>
              <div className="flex justify-center space-x-6">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="text-brand-dark/40 hover:text-brand-maroon transition-colors">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
