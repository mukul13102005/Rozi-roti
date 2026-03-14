import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, User, Heart, ShoppingBag, X, TrendingUp, Clock, Star, Sparkles, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  loyaltyPoints: number;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  wishlist: string[];
  cart: any[];
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAdminLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | 'All'>>;
  toggleWishlist: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  loyaltyPoints, currency, setCurrency, language, setLanguage, isDarkMode, setIsDarkMode,
  searchQuery, setSearchQuery, wishlist, cart, setIsCartOpen, setIsMenuOpen, setShowAdminLogin,
  setSelectedCategory, toggleWishlist
}: NavbarProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const trendingSearches = ['Banarasi Silk', 'Wedding Suits', 'Cotton Sarees', 'Party Wear'];
  const recentSearches = ['Red Saree', 'Anarkali Suit'];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar - Trust & Utility */}
      <div className="bg-brand-dark text-white py-2 px-4 md:px-8 flex justify-between items-center text-[10px] md:text-xs font-medium tracking-widest uppercase">
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline flex items-center"><Sparkles size={12} className="mr-1 text-brand-gold" /> Free Shipping on Orders Over ₹1999</span>
          <span className="flex items-center"><Clock size={12} className="mr-1 text-brand-gold" /> Fast Delivery in 3-5 Days</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-4 border-r border-white/10 pr-4">
            <button onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')} className="hover:text-brand-gold transition-colors">{currency}</button>
            <button onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')} className="hover:text-brand-gold transition-colors">{language}</button>
          </div>
          <button onClick={() => setShowAdminLogin(true)} className="hover:text-brand-gold transition-colors flex items-center">
            <User size={12} className="mr-1" /> Admin Login
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-brand-gold/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Menu & Search */}
          <div className="flex items-center space-x-6 flex-1">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors group">
              <Menu size={24} className="text-brand-maroon group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="hidden md:flex items-center space-x-3 px-4 py-2 bg-brand-beige/30 rounded-full text-brand-dark/40 text-sm w-64 hover:bg-brand-beige/50 transition-all border border-transparent hover:border-brand-gold/20"
            >
              <Search size={18} />
              <span>Search for elegance...</span>
            </button>
          </div>

          {/* Center: Logo - Brand Identity */}
          <div 
            className="flex-shrink-0 flex flex-col items-center cursor-pointer absolute left-1/2 -translate-x-1/2 group" 
            onClick={() => setSelectedCategory('All')}
          >
            <div className="relative">
              <h1 className="text-2xl md:text-4xl font-serif font-bold text-brand-maroon tracking-tighter leading-none transition-all group-hover:scale-105">
                RoziRoti
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="absolute -bottom-1 left-0 h-0.5 bg-brand-gold"
              />
            </div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mt-1">by Ratna</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 md:space-x-6 flex-1 justify-end">
            <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-[10px] text-brand-dark/40 uppercase font-bold tracking-widest">Loyalty Points</span>
              <span className="text-sm font-serif text-brand-maroon font-bold flex items-center">
                <Star size={14} className="mr-1 text-brand-gold fill-brand-gold" /> {loyaltyPoints}
              </span>
            </div>
            
            <div className="flex items-center space-x-1 md:space-x-2">
              <button onClick={() => setIsSearchModalOpen(true)} className="md:hidden p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors">
                <Search size={20} />
              </button>
              
              <div className="flex items-center space-x-1 md:space-x-2">
                <button className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-all hover:scale-110 relative group">
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 bg-brand-gold text-brand-dark text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">{wishlist.length}</span>
                  )}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Wishlist</span>
                </button>

                <button onClick={() => setIsCartOpen(true)} className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-all hover:scale-110 relative group">
                  <ShoppingBag size={20} />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 bg-brand-maroon text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">{cart.length}</span>
                  )}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Magical Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative bg-white rounded-[32px] overflow-hidden max-w-2xl w-full shadow-2xl"
            >
              <div className="p-8 border-b border-brand-gold/10">
                <div className="flex items-center space-x-4">
                  <Search size={24} className="text-brand-maroon" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search for Banarasi, Cotton, Silk..." 
                    className="w-full text-xl font-serif border-none focus:ring-0 placeholder:text-brand-dark/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setIsSearchModalOpen(false)} className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors">
                    <X size={24} className="text-brand-dark/40" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 grid grid-cols-2 gap-12">
                <div>
                  <h4 className="flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-6">
                    <TrendingUp size={14} className="mr-2" /> Trending Now
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map(tag => (
                      <button key={tag} className="px-4 py-2 bg-brand-beige/30 hover:bg-brand-gold/20 rounded-full text-xs text-brand-dark/70 transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-6">
                    <Clock size={14} className="mr-2" /> Recent Searches
                  </h4>
                  <ul className="space-y-3">
                    {recentSearches.map(item => (
                      <li key={item} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-sm text-brand-dark/60 group-hover:text-brand-maroon transition-colors">{item}</span>
                        <ArrowRight size={14} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-brand-beige/20 border-t border-brand-gold/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">124 people searching right now</span>
                  </div>
                  <div className="flex items-center space-x-4 text-[10px] font-bold text-brand-maroon/40 uppercase tracking-widest">
                    <span>ESC to close</span>
                    <span>ENTER to search</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
