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

export const Navbar = ({
  loyaltyPoints, currency, setCurrency, language, setLanguage, isDarkMode, setIsDarkMode,
  searchQuery, setSearchQuery, wishlist, cart, setIsCartOpen, setIsMenuOpen, setShowAdminLogin,
  setSelectedCategory, toggleWishlist
}: NavbarProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const trendingSearches = ['Banarasi Silk', 'Bridal Lehengas', 'Cotton Office Wear', 'Designer Blouses'];
  const recentSearches = ['Red Saree', 'Silk Kurta'];

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar - High Urgency & MBA Strategy */}
      <div className="bg-brand-maroon text-white py-2 px-4 overflow-hidden relative border-b border-brand-gold/10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] flex items-center space-x-16"
        >
          <span className="flex items-center"><Star size={10} className="mr-2 text-brand-gold" /> Free Worldwide Shipping on orders above ₹5000</span>
          <span className="flex items-center"><Sparkles size={10} className="mr-2 text-brand-gold" /> Join our Elite Circle for exclusive early access</span>
          <span className="flex items-center"><TrendingUp size={10} className="mr-2 text-brand-gold" /> Limited Edition Festive Collection - 20% Off for first 100 orders</span>
          <span className="flex items-center"><Star size={10} className="mr-2 text-brand-gold" /> Free Worldwide Shipping on orders above ₹5000</span>
        </motion.div>
      </div>

      <nav className="glass-effect border-b border-brand-gold/20 backdrop-blur-2xl bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Section: Mobile Menu & Desktop Nav */}
            <div className="flex items-center space-x-6">
              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors">
                <Menu size={24} />
              </button>

              <div className="hidden lg:flex space-x-8 items-center h-full">
                {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'Wedding'].map((item) => (
                  <div key={item} className="group h-full flex items-center">
                    <button 
                      onClick={() => setSelectedCategory(item as any)}
                      className="text-[10px] font-bold text-brand-dark/70 hover:text-brand-maroon transition-all uppercase tracking-[0.2em] h-full flex items-center relative group-hover:text-brand-maroon"
                    >
                      {item}
                      <motion.div 
                        className="absolute bottom-6 left-0 w-0 h-0.5 bg-brand-maroon"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                    
                    {/* Mega Menu - Conversion Optimized */}
                    <div className="absolute top-20 left-0 w-full bg-white/98 backdrop-blur-xl border-b border-brand-gold/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 p-12 translate-y-4 group-hover:translate-y-0">
                      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-12">
                        <div className="col-span-1">
                          <h4 className="font-bold text-brand-maroon text-[10px] uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Fabric</h4>
                          <ul className="space-y-4 text-xs text-brand-dark/60">
                            {['Pure Cotton', 'Silk Blend', 'Chanderi', 'Organza', 'Linen'].map(sub => (
                              <li key={sub} className="hover:text-brand-maroon cursor-pointer transition-colors flex items-center group/item">
                                <span className="w-0 h-px bg-brand-maroon mr-0 group-hover/item:w-3 group-hover/item:mr-2 transition-all"></span>
                                {sub}
                                {sub === 'Silk Blend' && <span className="ml-2 text-[8px] bg-brand-gold/20 text-brand-maroon px-1.5 py-0.5 rounded-full font-bold">HOT</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-1">
                          <h4 className="font-bold text-brand-maroon text-[10px] uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Style</h4>
                          <ul className="space-y-4 text-xs text-brand-dark/60">
                            {['Traditional', 'Contemporary', 'Minimalist', 'Heavy Work', 'Indo-Western'].map(sub => (
                              <li key={sub} className="hover:text-brand-maroon cursor-pointer transition-colors flex items-center group/item">
                                <span className="w-0 h-px bg-brand-maroon mr-0 group-hover/item:w-3 group-hover/item:mr-2 transition-all"></span>
                                {sub}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-1">
                          <h4 className="font-bold text-brand-maroon text-[10px] uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Occasion</h4>
                          <ul className="space-y-4 text-xs text-brand-dark/60">
                            {['Office Wear', 'Festive', 'Wedding', 'Daily Wear', 'Parties'].map(sub => (
                              <li key={sub} className="hover:text-brand-maroon cursor-pointer transition-colors flex items-center group/item">
                                <span className="w-0 h-px bg-brand-maroon mr-0 group-hover/item:w-3 group-hover/item:mr-2 transition-all"></span>
                                {sub}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                          <div className="relative rounded-2xl overflow-hidden h-64 group/img shadow-lg">
                            <img src="https://picsum.photos/seed/mega-1/400/600" alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/80 via-transparent to-transparent flex flex-col justify-end p-6">
                              <span className="text-[8px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-1">New Drop</span>
                              <p className="text-white font-serif text-lg mb-3">The Royal Silk Collection</p>
                              <button className="text-white text-[9px] font-bold uppercase tracking-widest flex items-center group/btn">
                                Explore <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                          <div className="relative rounded-2xl overflow-hidden h-64 group/img shadow-lg">
                            <img src="https://picsum.photos/seed/mega-2/400/600" alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent flex flex-col justify-end p-6">
                              <span className="text-[8px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-1">Bestseller</span>
                              <p className="text-white font-serif text-lg mb-3">Wedding Essentials</p>
                              <button className="text-white text-[9px] font-bold uppercase tracking-widest flex items-center group/btn">
                                Shop Now <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                  className="absolute -top-2 -right-4 text-brand-gold opacity-0 group-hover:opacity-100"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={16} />
                </motion.div>
              </div>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.45em] text-brand-gold font-bold mt-1 group-hover:tracking-[0.55em] transition-all duration-500">
                By Ratna
              </span>
            </div>

            {/* Right Section: Search & Actions */}
            <div className="flex items-center space-x-1 md:space-x-6">
              {/* Mobile Search Icon */}
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="md:hidden p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-all"
              >
                <Search size={20} />
              </button>

              {/* Desktop Search Trigger */}
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden md:flex items-center space-x-3 bg-brand-beige/40 hover:bg-brand-beige/60 border border-brand-gold/10 rounded-full px-4 py-2 transition-all group"
              >
                <Search size={16} className="text-brand-maroon/60 group-hover:text-brand-maroon transition-colors" />
                <span className="text-[10px] font-bold text-brand-maroon/40 uppercase tracking-widest">Search Elegance...</span>
                <span className="text-[8px] bg-brand-gold/20 text-brand-maroon px-1.5 py-0.5 rounded border border-brand-gold/20">⌘K</span>
              </button>

              <div className="flex items-center space-x-1">
                <div className="hidden xl:flex items-center space-x-4 mr-4 border-r border-brand-gold/10 pr-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] uppercase tracking-widest text-brand-dark/40 font-bold">Elite Points</span>
                    <div className="flex items-center space-x-1">
                      <Star size={8} className="text-brand-gold fill-brand-gold" />
                      <span className="text-[10px] font-bold text-brand-maroon">{loyaltyPoints}</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => setShowAdminLogin(true)} className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-all hover:scale-110 relative group">
                  <User size={20} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Account</span>
                </button>
                
                <button onClick={() => toggleWishlist('')} className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-all hover:scale-110 relative group">
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
