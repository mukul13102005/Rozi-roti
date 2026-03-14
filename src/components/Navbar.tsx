import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, User, Heart, ShoppingBag, X, TrendingUp, Clock, Star, Sparkles, ArrowRight, Truck, RotateCcw } from 'lucide-react';
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
  onViewWishlist: () => void;
  toggleWishlist: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  loyaltyPoints, currency, setCurrency, language, setLanguage, isDarkMode, setIsDarkMode,
  searchQuery, setSearchQuery, wishlist, cart, setIsCartOpen, setIsMenuOpen, setShowAdminLogin,
  setSelectedCategory, onViewWishlist, toggleWishlist
}: NavbarProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const trendingSearches = ['Banarasi Silk', 'Wedding Suits', 'Cotton Sarees', 'Party Wear'];
  const recentSearches = ['Red Saree', 'Anarkali Suit'];

  const megaMenuData = [
    {
      name: 'Sarees',
      subCategories: [
        { name: 'By Fabric', items: ['Banarasi Silk', 'Kanjeevaram', 'Chiffon', 'Georgette', 'Cotton', 'Organza'] },
        { name: 'By Occasion', items: ['Wedding Collection', 'Party Wear', 'Daily Wear', 'Festive Special'] },
        { name: 'Trending', items: ['Floral Prints', 'Heavy Border', 'Pastel Shades', 'Digital Print'] }
      ],
      featured: {
        title: 'Wedding Special',
        image: 'https://picsum.photos/seed/wedding-saree/400/600',
        link: '#'
      }
    },
    {
      name: 'Suits',
      subCategories: [
        { name: 'Styles', items: ['Anarkali Suits', 'Straight Cut', 'Palazzo Suits', 'Sharara Sets', 'Punjabi Suits'] },
        { name: 'Work Type', items: ['Mirror Work', 'Zari Embroidery', 'Gota Patti', 'Hand Block Print'] },
        { name: 'New Arrivals', items: ['Velvet Collection', 'Chanderi Silk', 'Cotton Linens'] }
      ],
      featured: {
        title: 'New Suits Drop',
        image: 'https://picsum.photos/seed/new-suit/400/600',
        link: '#'
      }
    },
    {
      name: 'Festive',
      subCategories: [
        { name: 'Collections', items: ['Diwali Special', 'Eid Collection', 'Karwa Chauth', 'Navratri Special'] },
        { name: 'Lehengas', items: ['Bridal Lehengas', 'Party Wear', 'Lightweight Lehengas'] }
      ],
      featured: {
        title: 'Festive Vibes',
        image: 'https://picsum.photos/seed/festive/400/600',
        link: '#'
      }
    },
    {
      name: 'Deals',
      subCategories: [
        { name: 'Budget Shop', items: ['Under ₹999', 'Under ₹1999', 'Under ₹2999'] },
        { name: 'Offers', items: ['Clearance Sale', 'Buy 1 Get 1', 'Flash Deals'] }
      ],
      featured: {
        title: 'Hot Deals',
        image: 'https://picsum.photos/seed/deals/400/600',
        link: '#'
      }
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
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
      <nav className="bg-white/90 backdrop-blur-md border-b border-brand-gold/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Menu & Search */}
          <div className="flex items-center space-x-6 flex-1">
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 hover:bg-brand-gold/10 rounded-full transition-colors group">
              <Menu size={24} className="text-brand-maroon group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="hidden lg:flex items-center space-x-8">
              {megaMenuData.map((category) => (
                <div 
                  key={category.name}
                  className="relative py-2"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button className="text-sm font-bold uppercase tracking-widest text-brand-dark hover:text-brand-maroon transition-colors flex items-center">
                    {category.name}
                  </button>
                  
                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {hoveredCategory === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 right-0 top-[100%] bg-white border-t border-brand-gold/10 shadow-2xl z-[60] overflow-hidden"
                      >
                        <div className="max-w-7xl mx-auto p-12 grid grid-cols-4 gap-12">
                          {category.subCategories.map((sub) => (
                            <div key={sub.name}>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6 border-b border-brand-gold/10 pb-2">
                                {sub.name}
                              </h4>
                              <ul className="space-y-3">
                                {sub.items.map((item) => (
                                  <li key={item}>
                                    <button className="text-sm text-brand-dark/60 hover:text-brand-maroon transition-colors flex items-center group">
                                      <span className="w-0 group-hover:w-2 h-0.5 bg-brand-gold mr-0 group-hover:mr-2 transition-all" />
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          
                          {/* Featured Section in Mega Menu */}
                          <div className="relative rounded-2xl overflow-hidden group/feat aspect-[3/4]">
                            <img 
                              src={category.featured.image} 
                              alt={category.featured.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent flex flex-col justify-end p-6">
                              <h5 className="text-white font-serif text-xl mb-2">{category.featured.title}</h5>
                              <button className="text-brand-gold text-[10px] font-bold uppercase tracking-widest flex items-center group/btn">
                                Shop Now <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Bar of Mega Menu */}
                        <div className="bg-brand-beige/20 p-4 border-t border-brand-gold/10">
                          <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">
                            <div className="flex items-center space-x-8">
                              <span className="flex items-center"><Truck size={12} className="mr-2 text-brand-gold" /> Free Shipping on ₹1999+</span>
                              <span className="flex items-center"><RotateCcw size={12} className="mr-2 text-brand-gold" /> 7 Day Easy Returns</span>
                            </div>
                            <button className="text-brand-maroon hover:underline">View All {category.name}</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center relative group/search">
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="absolute left-4 text-brand-maroon/40 hover:text-brand-maroon transition-colors z-10"
                title="Advanced Search"
              >
                <Search size={18} />
              </button>
              <input 
                type="text"
                placeholder="Search for elegance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-2 bg-brand-beige/30 rounded-full text-brand-dark text-sm w-64 focus:w-80 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 transition-all border border-transparent hover:border-brand-gold/20 outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-brand-dark/20 hover:text-brand-maroon transition-colors"
                >
                  <X size={14} />
                </button>
              )}
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
                <button 
                  onClick={onViewWishlist}
                  className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-all hover:scale-110 relative group"
                >
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
