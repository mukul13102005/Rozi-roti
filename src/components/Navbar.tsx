import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, User, Heart, ShoppingBag, Eye } from 'lucide-react';
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
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-brand-maroon">
            <Menu size={24} />
          </button>

          <div className="flex-shrink-0 flex flex-col items-center cursor-pointer" onClick={() => setSelectedCategory('All')}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon tracking-tighter">RoziRoti</h1>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold -mt-1">By Ratna</span>
          </div>

          <div className="hidden lg:flex space-x-8 items-center h-full">
            {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'Wedding'].map((item) => (
              <div key={item} className="group h-full flex items-center">
                <button 
                  onClick={() => setSelectedCategory(item as any)}
                  className="text-sm font-medium text-brand-dark hover:text-brand-maroon transition-colors uppercase tracking-wider h-full flex items-center"
                >
                  {item}
                </button>
                <div className="absolute top-20 left-0 w-full bg-white border-b border-brand-gold/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-12">
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
                    <div>
                      <h4 className="font-bold text-brand-maroon uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Fabric</h4>
                      <ul className="space-y-3 text-sm text-brand-dark/60">
                        <li className="hover:text-brand-maroon cursor-pointer">Pure Cotton</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Silk Blend</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Chanderi</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Organza</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-maroon uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Style</h4>
                      <ul className="space-y-3 text-sm text-brand-dark/60">
                        <li className="hover:text-brand-maroon cursor-pointer">Traditional</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Contemporary</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Minimalist</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Heavy Work</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-maroon uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Occasion</h4>
                      <ul className="space-y-3 text-sm text-brand-dark/60">
                        <li className="hover:text-brand-maroon cursor-pointer">Office Wear</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Festive</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Wedding</li>
                        <li className="hover:text-brand-maroon cursor-pointer">Daily Wear</li>
                      </ul>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden h-48">
                      <img src="https://picsum.photos/seed/mega-menu/400/300" alt="Featured" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-brand-maroon/40 flex items-center justify-center">
                        <p className="text-white font-serif text-xl">New Collection</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden xl:flex items-center space-x-2 mr-4 border-r border-brand-gold/20 pr-4">
              <div className="flex flex-col items-end mr-4">
                <span className="text-[8px] uppercase tracking-widest text-brand-dark/40 font-bold">Loyalty Points</span>
                <span className="text-xs font-bold text-brand-maroon">{loyaltyPoints} pts</span>
              </div>
              <button onClick={() => setCurrency(c => c === 'INR' ? 'USD' : 'INR')} className="text-[10px] font-bold text-brand-maroon hover:text-brand-gold transition-colors">{currency}</button>
              <button onClick={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')} className="text-[10px] font-bold text-brand-maroon hover:text-brand-gold transition-colors">{language}</button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-brand-maroon hover:text-brand-gold transition-colors">
                {isDarkMode ? <Eye size={16} /> : <Eye size={16} className="opacity-50" />}
              </button>
            </div>
            <div className="hidden md:flex items-center bg-brand-beige/50 rounded-full px-4 py-1.5 border border-brand-gold/20 focus-within:border-brand-maroon focus-within:ring-2 focus-within:ring-brand-maroon/20 transition-all duration-300">
              <Search size={16} className="text-brand-maroon/50" />
              <input 
                type="text" 
                placeholder="Search elegance..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-40 ml-2 placeholder:text-brand-maroon/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => setShowAdminLogin(true)} className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors">
              <User size={20} />
            </button>
            <button onClick={() => toggleWishlist('')} className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
              )}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-maroon text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
