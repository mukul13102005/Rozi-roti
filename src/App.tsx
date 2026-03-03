import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, Star, Trash2, Plus, Minus, 
  ChevronRight, ArrowRight, LayoutDashboard, User, LogOut, 
  TrendingUp, Package, Users, DollarSign, Bell, Filter, 
  Eye, Edit, Trash, CheckCircle, Phone, Mail, MapPin, 
  Instagram, Facebook, Twitter, ShieldCheck, Truck, RotateCcw, CreditCard,
  Menu as MenuIcon, Sparkles, Zap, Award, Gift, Clock, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CATEGORIES, INITIAL_PRODUCTS, type Product, type CartItem, type Order, type Category } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
};

// --- Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'maroon' | 'outline' }) => {
  const variants = {
    default: 'bg-brand-dark text-white',
    gold: 'bg-brand-gold text-brand-dark font-bold',
    maroon: 'bg-brand-maroon text-white',
    outline: 'border border-brand-maroon text-brand-maroon'
  };
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={cn("px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full inline-block", variants[variant])}
    >
      {children}
    </motion.span>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl md:text-5xl font-serif text-brand-maroon mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-brand-dark/60 max-w-2xl mx-auto italic"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 96 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-1 bg-brand-gold mx-auto mt-6"
    />
  </div>
);

// Product Card Component
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }: { 
  product: Product; 
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-brand-beige to-white">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
          </div>
        )}
        <motion.img 
          src={product.image} 
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant={product.badge === 'Sale' ? 'maroon' : 'gold'}>
                {product.badge}
              </Badge>
            </motion.div>
          )}
          {product.isBestseller && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="gold">
                <div className="flex items-center gap-1">
                  <Award size={10} />
                  <span>Bestseller</span>
                </div>
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="absolute top-4 right-4 flex flex-col gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleWishlist}
            className={cn(
              "p-2 rounded-full glass-effect transition-all duration-300",
              isWishlisted ? "text-brand-maroon bg-white" : "text-brand-dark/60 bg-white/80 hover:bg-white"
            )}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </motion.button>
        </motion.div>

        {/* Quick View Overlay */}
        <motion.div 
          className="absolute inset-x-4 bottom-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddToCart}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-brand-maroon transition-colors"
          >
            <ShoppingBag size={16} />
            Quick Add
          </motion.button>
        </motion.div>

        {/* Stock Indicator */}
        {product.stock < 10 && (
          <div className="absolute bottom-4 left-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
            >
              <Clock size={10} />
              Only {product.stock} left
            </motion.div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-brand-gold fill-current" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-brand-dark/40">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-serif text-base md:text-lg text-brand-dark group-hover:text-brand-maroon transition-colors line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-brand-maroon">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-brand-dark/40 line-through">₹{product.originalPrice}</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                {Math.round((1 - product.price/product.originalPrice) * 100)}% OFF
              </span>
            </>
          )}
        </div>

        {/* Fabric & Care Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] bg-brand-beige/50 px-2 py-1 rounded-full text-brand-dark/60">
            {product.fabric}
          </span>
          <span className="text-[10px] bg-brand-beige/50 px-2 py-1 rounded-full text-brand-dark/60">
            {product.care.split(' ')[0]}...
          </span>
        </div>

        {/* Add to Cart Button (Mobile) */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={onAddToCart}
          className="w-full lg:hidden bg-brand-maroon text-white py-2 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <ShoppingBag size={14} />
          Add to Bag
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  // --- State ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSidebarCollapsed, setAdminSidebarCollapsed] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rr_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rr_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('rr_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rr_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('EN');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visitorCount, setVisitorCount] = useState(124);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  const [loyaltyPoints, setLoyaltyPoints] = useState(450);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('rr_recent');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Refs for animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // --- Effects ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('rr_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecent = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i !== id);
      return [id, ...filtered].slice(0, 4);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('rr_spin_shown')) {
      const timer = setTimeout(() => {
        setShowSpinWheel(true);
        localStorage.setItem('rr_spin_shown', 'true');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rr_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rr_orders', JSON.stringify(orders));
  }, [orders]);

  // Exit intent simulation
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('rr_exit_shown')) {
        setShowExitIntent(true);
        localStorage.setItem('rr_exit_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // --- Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    // Trigger confetti for special items
    if (product.badge === 'Limited' || product.isBestseller) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#800000']
      });
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const cartSavings = cartOriginalTotal - cartTotal;

  const handleCheckout = () => {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal,
      status: 'Pending',
      customer: {
        name: 'Mukul',
        email: 'mukul13102005@gmail.com',
        address: 'Surat, Gujarat, India'
      }
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#800000', '#F5F5DC']
    });
    alert('Order Placed Successfully! Thank you for shopping with RoziRoti by Ratna.');
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Invalid Password');
    }
  };

  // --- Views ---

  const renderCustomerSite = () => (
    <div className="min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-brand-maroon text-white text-center py-2 text-xs font-medium tracking-widest uppercase relative overflow-hidden"
      >
        <motion.div 
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="whitespace-nowrap"
        >
          ✨ Free Shipping on orders above ₹2999 | Use Code: RATNA10 for 10% Off | New Bridal Collection is Live! ✨
        </motion.div>
      </motion.div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className="sticky top-0 z-50 glass-effect border-b border-brand-gold/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Toggle */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(true)} 
              className="lg:hidden p-2 text-brand-maroon"
            >
              <Menu size={24} />
            </motion.button>

            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer" 
              onClick={() => setSelectedCategory('All')}
            >
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon tracking-tighter">
                RoziRoti
              </h1>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold -mt-1">
                By Ratna
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-8 items-center h-full">
              {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'Wedding'].map((item) => (
                <div key={item} className="group h-full flex items-center">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedCategory(item as any)}
                    className="text-sm font-medium text-brand-dark hover:text-brand-maroon transition-colors uppercase tracking-wider h-full flex items-center"
                  >
                    {item}
                  </motion.button>
                  {/* Mega Menu Simulation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-20 left-0 w-full bg-white border-b border-brand-gold/20 shadow-2xl z-50 p-12"
                  >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                      <div>
                        <h4 className="font-bold text-brand-maroon uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Fabric</h4>
                        <ul className="space-y-3 text-sm text-brand-dark/60">
                          {['Pure Cotton', 'Silk Blend', 'Chanderi', 'Organza'].map((fabric, i) => (
                            <motion.li 
                              key={fabric}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="hover:text-brand-maroon cursor-pointer"
                            >
                              {fabric}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-maroon uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Style</h4>
                        <ul className="space-y-3 text-sm text-brand-dark/60">
                          {['Traditional', 'Contemporary', 'Minimalist', 'Heavy Work'].map((style, i) => (
                            <motion.li 
                              key={style}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="hover:text-brand-maroon cursor-pointer"
                            >
                              {style}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-maroon uppercase tracking-widest mb-6 border-b border-brand-gold/10 pb-2">By Occasion</h4>
                        <ul className="space-y-3 text-sm text-brand-dark/60">
                          {['Office Wear', 'Festive', 'Wedding', 'Daily Wear'].map((occasion, i) => (
                            <motion.li 
                              key={occasion}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="hover:text-brand-maroon cursor-pointer"
                            >
                              {occasion}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-2xl overflow-hidden h-48"
                      >
                        <img src="https://picsum.photos/seed/mega-menu/400/300" alt="Featured" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-brand-maroon/40 flex items-center justify-center">
                          <p className="text-white font-serif text-xl">New Collection</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden xl:flex items-center space-x-2 mr-4 border-r border-brand-gold/20 pr-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-end mr-4"
                >
                  <span className="text-[8px] uppercase tracking-widest text-brand-dark/40 font-bold">Loyalty Points</span>
                  <span className="text-xs font-bold text-brand-maroon">{loyaltyPoints} pts</span>
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setCurrency(c => c === 'INR' ? 'USD' : 'INR')} 
                  className="text-[10px] font-bold text-brand-maroon hover:text-brand-gold transition-colors"
                >
                  {currency}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')} 
                  className="text-[10px] font-bold text-brand-maroon hover:text-brand-gold transition-colors"
                >
                  {language}
                </motion.button>
              </div>
              <div className="hidden md:flex items-center bg-brand-beige/50 rounded-full px-4 py-1.5 border border-brand-gold/20">
                <Search size={16} className="text-brand-maroon/50" />
                <input 
                  type="text" 
                  placeholder="Search elegance..." 
                  className="bg-transparent border-none focus:ring-0 text-sm w-40 ml-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAdminLogin(true)} 
                className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors"
              >
                <User size={20} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist('')} 
                className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors relative"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-brand-gold text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)} 
                className="p-2 text-brand-maroon hover:bg-brand-gold/10 rounded-full transition-colors relative"
              >
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-brand-maroon text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] md:h-screen overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 bg-brand-gold/5 animate-pulse flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-brand-gold border-t-brand-maroon rounded-full mx-auto mb-4"
              />
              <h1 className="text-2xl font-serif text-brand-maroon/40">Loading Elegance...</h1>
            </div>
          </div>
        ) : (
          <>
            <motion.div 
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="absolute inset-0"
            >
              <img 
                src="https://picsum.photos/seed/roziroti-hero/1920/1080" 
                alt="Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-dark/40 to-transparent" />
            </motion.div>
            
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Badge variant="gold">Surat's Finest Craftsmanship</Badge>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-5xl md:text-8xl font-serif mt-6 leading-[1.1]"
                >
                  Elegance{' '}
                  <motion.span 
                    animate={{ 
                      color: ['#D4AF37', '#FFFFFF', '#D4AF37'],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-brand-gold italic inline-block"
                  >
                    Redefined.
                  </motion.span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-base md:text-lg mt-6 text-brand-beige/90 font-light leading-relaxed max-w-xl"
                >
                  Discover our exclusive collection of handpicked Cotton Sarees and Stitched Suits. 
                  Crafted for the modern woman who cherishes tradition.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                    className="maroon-gradient px-8 py-4 rounded-full text-white font-bold uppercase tracking-widest flex items-center justify-center group text-sm md:text-base shadow-2xl"
                  >
                    Shop Collection 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                    </motion.div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 px-8 py-4 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-sm md:text-base"
                  >
                    Our Story
                  </motion.button>
                </motion.div>

                {/* Floating Stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-20 left-4 flex gap-6"
                >
                  <div className="text-white/80">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-brand-gold" />
                      <span className="text-2xl font-bold">50+</span>
                    </div>
                    <p className="text-xs uppercase tracking-wider">Designs</p>
                  </div>
                  <div className="text-white/80">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-brand-gold" />
                      <span className="text-2xl font-bold">10k+</span>
                    </div>
                    <p className="text-xs uppercase tracking-wider">Happy Clients</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white py-12 border-y border-brand-gold/10"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Authentic Quality', desc: '100% Genuine Fabrics' },
            { icon: Truck, title: 'Express Delivery', desc: 'Worldwide Shipping' },
            { icon: RotateCcw, title: 'Easy Returns', desc: '7-Day Hassle Free' },
            { icon: CreditCard, title: 'Secure Payment', desc: 'Safe & Encrypted' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon className="text-brand-maroon mb-3" size={32} />
              </motion.div>
              <h4 className="font-bold text-sm uppercase tracking-wider">{item.title}</h4>
              <p className="text-xs text-brand-dark/50 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categories Grid */}
      <section className="py-20 bg-brand-beige/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Curated Collections" subtitle="Explore our handpicked selections for every mood and occasion." />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { name: 'Cotton Sarees', img: 'https://picsum.photos/seed/cat-cotton/800/1000', span: 'md:col-span-2', description: 'Breathable elegance for everyday luxury' },
              { name: 'Silk Sarees', img: 'https://picsum.photos/seed/cat-silk/800/1000', span: '', description: 'Timeless grace for special occasions' },
              { name: 'Stitched Suits', img: 'https://picsum.photos/seed/cat-suits/800/1000', span: '', description: 'Contemporary fits with traditional charm' },
              { name: 'Wedding Collection', img: 'https://picsum.photos/seed/cat-wedding/800/1000', span: 'md:col-span-2', description: 'Make your special day unforgettable' }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className={cn("relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group", cat.span)}
                onClick={() => setSelectedCategory(cat.name as any)}
              >
                <motion.img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/90 via-brand-maroon/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl md:text-3xl font-serif mb-2"
                  >
                    {cat.name}
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="text-sm text-white/80 mb-3 line-clamp-2"
                  >
                    {cat.description}
                  </motion.p>
                  <motion.p 
                    whileHover={{ x: 5 }}
                    className="text-sm font-light flex items-center group-hover:translate-x-2 transition-transform"
                  >
                    Explore Now <ChevronRight size={16} className="ml-1" />
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <SectionHeading title="Our Masterpieces" subtitle="Each piece is a story of tradition and timeless beauty." />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide"
            >
              {['All', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'New Arrivals'].map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shadow-lg",
                    selectedCategory === cat 
                      ? "maroon-gradient text-white shadow-xl" 
                      : "bg-white text-brand-maroon border-2 border-brand-maroon/20 hover:border-brand-maroon hover:bg-brand-beige/50"
                  )}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gradient-to-br from-brand-gold/10 to-brand-beige rounded-2xl mb-4" />
                  <div className="h-4 bg-brand-gold/10 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-brand-gold/10 rounded w-1/2" />
                </div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.slice(0, 12).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </AnimatePresence>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-brand-maroon text-brand-maroon px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-maroon hover:text-white transition-all shadow-lg hover:shadow-xl"
            >
              View All Masterpieces
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-serif text-brand-maroon mb-8"
            >
              Recently Viewed
            </motion.h3>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {recentlyViewed.map((id, index) => {
                const product = products.find(p => p.id === id);
                if (!product) return null;
                return (
                  <motion.div 
                    key={id}
                    variants={scaleIn}
                    whileHover={{ y: -5 }}
                    className="flex items-center space-x-4 p-4 border border-brand-gold/10 rounded-2xl hover:border-brand-gold hover:shadow-xl transition-all cursor-pointer bg-white"
                  >
                    <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-sm font-serif line-clamp-1">{product.name}</h4>
                      <p className="text-xs font-bold text-brand-maroon">₹{product.price}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 maroon-gradient text-white overflow-hidden relative">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full -ml-32 -mb-32 blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <SectionHeading title="Join the Elite Circle" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-beige/80 mb-10 -mt-8 italic"
          >
            Subscribe to receive exclusive early access to our limited edition collections and styling tips.
          </motion.p>
          {!hasSubscribed ? (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={(e) => { e.preventDefault(); setHasSubscribed(true); confetti(); }}
              className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 bg-white/10 border-2 border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-brand-gold/50 transition-all"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-gold text-brand-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-maroon transition-all shadow-xl"
              >
                Subscribe
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 border-2 border-white/20 p-8 rounded-3xl backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2 }}
              >
                <CheckCircle className="mx-auto text-brand-gold mb-4" size={48} />
              </motion.div>
              <h4 className="text-2xl font-serif mb-2">Welcome to the Family!</h4>
              <p className="text-brand-beige/60">Check your inbox for a special welcome gift.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-serif font-bold text-brand-gold tracking-tighter mb-2">RoziRoti</h1>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold block mb-6">By Ratna</span>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Surat's premier destination for luxury ethnic wear. We blend traditional craftsmanship with contemporary designs to create masterpieces for the modern woman.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all"
                >
                  <Icon size={18} />
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-brand-gold">Collections</h4>
            <ul className="space-y-4 text-sm text-white/50">
              {['Cotton Sarees', 'Silk Sarees', 'Banarasi Collection', 'Stitched Suits', 'Wedding Store'].map((item, i) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  className="hover:text-brand-gold cursor-pointer transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-brand-gold">Customer Care</h4>
            <ul className="space-y-4 text-sm text-white/50">
              {['Track Order', 'Shipping Policy', 'Return & Exchange', 'Size Guide', 'FAQs'].map((item, i) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  className="hover:text-brand-gold cursor-pointer transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-brand-gold">Visit Us</h4>
            <ul className="space-y-6 text-sm text-white/50">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <MapPin className="mr-3 text-brand-gold shrink-0" size={18} />
                <span>123 Fashion Street, Textile Market, Surat, Gujarat 395003</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <Phone className="mr-3 text-brand-gold shrink-0" size={18} />
                <span>+91 98765 43210</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <Mail className="mr-3 text-brand-gold shrink-0" size={18} />
                <span>hello@roziroti.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} RoziRoti by Ratna. All Rights Reserved.</p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item, i) => (
              <motion.button 
                key={item}
                whileHover={{ scale: 1.1 }}
                className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-brand-gold/20 z-40 flex items-center space-x-2"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 bg-green-500 rounded-full"
        />
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60">{visitorCount} Elegance Seekers Online</span>
      </motion.div>

      <motion.button 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all z-40"
      >
        <Phone size={24} />
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-brand-beige to-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-brand-gold/20 flex justify-between items-center">
                <motion.h3 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-serif text-brand-maroon"
                >
                  Your Shopping Bag
                </motion.h3>
                <motion.button 
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)} 
                  className="p-2 hover:bg-brand-gold/10 rounded-full"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <ShoppingBag size={64} className="text-brand-dark/10 mb-4" />
                    </motion.div>
                    <p className="text-brand-dark/60 italic">Your bag is as empty as a loom without thread.</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 text-brand-maroon font-bold uppercase tracking-widest border-b-2 border-brand-maroon"
                    >
                      Start Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h4 className="font-serif text-brand-dark leading-tight">{item.name}</h4>
                        <p className="text-xs text-brand-dark/40 mt-1">{item.category}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border-2 border-brand-gold/20 rounded-lg overflow-hidden">
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)} 
                              className="p-1 hover:bg-brand-gold/10"
                            >
                              <Minus size={14} />
                            </motion.button>
                            <span className="px-3 text-sm font-bold">{item.quantity}</span>
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)} 
                              className="p-1 hover:bg-brand-gold/10"
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-brand-maroon">₹{item.price * item.quantity}</p>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromCart(item.id)} 
                              className="text-[10px] text-red-500 uppercase font-bold mt-1"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="p-6 bg-white border-t border-brand-gold/20 space-y-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-brand-beige to-white p-4 rounded-xl border-2 border-brand-gold/10 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mr-3">
                        <Gift className="text-brand-gold" size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-brand-maroon">Bundle & Save</p>
                        <p className="text-xs text-brand-dark/60">Add 1 more for extra 5% off</p>
                      </div>
                    </div>
                    <Plus size={16} className="text-brand-maroon" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-dark/60">Subtotal</span>
                      <span className="font-bold">₹{cartOriginalTotal}</span>
                    </div>
                    <motion.div 
                      animate={{ color: ['#16a34a', '#22c55e', '#16a34a'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex justify-between text-sm"
                    >
                      <span>Bag Discount</span>
                      <span>-₹{cartSavings}</span>
                    </motion.div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-dark/60">Shipping</span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif pt-2 border-t border-brand-gold/10">
                      <span className="text-brand-maroon">Total</span>
                      <span className="text-brand-maroon">₹{cartTotal}</span>
                    </div>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full maroon-gradient text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all"
                  >
                    Proceed to Checkout
                  </motion.button>
                  
                  <p className="text-[10px] text-center text-brand-dark/40 uppercase tracking-widest">
                    Secure Checkout Powered by Ratna Payments
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAdminLogin(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gradient-to-b from-brand-beige to-white p-8 rounded-3xl shadow-2xl max-w-md w-full border-2 border-brand-gold/30"
            >
              <h3 className="text-3xl font-serif text-brand-maroon text-center mb-2">Admin Access</h3>
              <p className="text-center text-brand-dark/60 text-sm mb-8 italic">Restricted area for authorized personnel only.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-dark/60 mb-2">Access Key</label>
                  <input 
                    type="password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border-2 border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-maroon/20 transition-all"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdminLogin}
                  className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg"
                >
                  Authenticate
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowAdminLogin(false)}
                  className="w-full text-brand-dark/40 text-xs uppercase font-bold tracking-widest"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spin Wheel Modal */}
      <AnimatePresence>
        {showSpinWheel && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSpinWheel(false)}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl text-center border-4 border-brand-gold"
            >
              <div className="mb-8">
                <Badge variant="gold">Feeling Lucky?</Badge>
                <h3 className="text-4xl font-serif text-brand-maroon mt-4">Spin to Win!</h3>
                <p className="text-brand-dark/60 mt-2">Win exclusive discounts up to 50% OFF</p>
              </div>
              
              <div className="relative w-64 h-64 mx-auto mb-10">
                <motion.div 
                  animate={{ rotate: 360 * 5 }}
                  transition={{ duration: 4, ease: "circOut" }}
                  className="w-full h-full rounded-full border-8 border-brand-gold relative overflow-hidden shadow-2xl"
                  style={{ background: 'conic-gradient(#800000 0deg 60deg, #D4AF37 60deg 120deg, #800000 120deg 180deg, #D4AF37 180deg 240deg, #800000 240deg 300deg, #D4AF37 300deg 360deg)' }}
                >
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${deg + 30}deg) translateY(-80px)` }}>
                      <span className="text-white font-bold text-xs">{(i + 1) * 10}%</span>
                    </div>
                  ))}
                </motion.div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-4 h-8 bg-brand-dark rounded-full z-10" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { 
                  confetti(); 
                  alert('Congratulations! You won 20% OFF. Use Code: LUCKY20');
                  setShowSpinWheel(false);
                }}
                className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg"
              >
                Spin Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowSpinWheel(false)} 
                className="mt-4 text-brand-dark/40 text-xs uppercase font-bold tracking-widest"
              >
                Maybe Later
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowExitIntent(false)}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative bg-white rounded-[40px] overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 bg-brand-maroon relative overflow-hidden">
                <img src="https://picsum.photos/seed/exit-intent/600/800" alt="Special Offer" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white">
                  <Badge variant="gold">Wait! Don't Go</Badge>
                  <h3 className="text-5xl font-serif mt-4">15% OFF</h3>
                  <p className="mt-2 font-light italic">Your first purchase</p>
                </div>
              </div>
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <h4 className="text-2xl font-serif text-brand-maroon mb-4">Unlock Your Exclusive Discount</h4>
                <p className="text-brand-dark/60 text-sm mb-8">Join our inner circle and get instant access to Surat's most coveted ethnic designs.</p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full border-2 border-brand-gold/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-4 focus:ring-brand-maroon/20 transition-all"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setShowExitIntent(false); confetti(); }}
                    className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg"
                  >
                    Claim My Discount
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowExitIntent(false)}
                    className="w-full text-brand-dark/30 text-[10px] uppercase font-bold tracking-widest"
                  >
                    No thanks, I prefer paying full price
                  </motion.button>
                </div>
              </div>
              <button onClick={() => setShowExitIntent(false)} className="absolute top-6 right-6 text-brand-dark/40 hover:text-brand-maroon">
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="min-h-screen bg-slate-50 flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "bg-gradient-to-b from-brand-dark to-slate-900 text-white flex flex-col transition-all duration-300",
          adminSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className={cn("p-6 border-b border-white/10", adminSidebarCollapsed ? "text-center" : "")}>
          {adminSidebarCollapsed ? (
            <h1 className="text-2xl font-serif font-bold text-brand-gold">RR</h1>
          ) : (
            <>
              <h1 className="text-xl font-serif font-bold text-brand-gold tracking-tighter">RoziRoti</h1>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Admin Console</span>
            </>
          )}
        </div>

        <button 
          onClick={() => setAdminSidebarCollapsed(!adminSidebarCollapsed)}
          className="absolute left-64 top-20 bg-brand-maroon text-white p-1 rounded-r-lg shadow-lg"
        >
          {adminSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
            { icon: Package, label: 'Products', id: 'products' },
            { icon: ShoppingBag, label: 'Orders', id: 'orders' },
            { icon: Users, label: 'Customers', id: 'customers' },
            { icon: TrendingUp, label: 'Analytics', id: 'analytics' },
            { icon: Bell, label: 'Notifications', id: 'notifications' }
          ].map((item) => (
            <motion.button 
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveAdminTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeAdminTab === item.id 
                  ? "bg-brand-gold text-brand-dark shadow-lg" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {!adminSidebarCollapsed && <span>{item.label}</span>}
            </motion.button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <motion.button 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdmin(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            {!adminSidebarCollapsed && <span>Exit Admin</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            {activeAdminTab.charAt(0).toUpperCase() + activeAdminTab.slice(1)} Overview
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-slate-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">Ratna Devi</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-maroon flex items-center justify-center text-white font-bold shadow-lg">
                RD
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+12.5%' },
              { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', change: '+8.2%' },
              { label: 'Active Products', value: products.length, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', change: '+3.1%' },
              { label: 'Total Customers', value: '1,284', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', change: '+15.3%' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className={cn("p-3 rounded-xl", stat.bg)}
                  >
                    <stat.icon className={stat.color} size={24} />
                  </motion.div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { name: 'Mon', rev: 4000 }, { name: 'Tue', rev: 3000 }, { name: 'Wed', rev: 5000 },
                    { name: 'Thu', rev: 2780 }, { name: 'Fri', rev: 1890 }, { name: 'Sat', rev: 2390 }, { name: 'Sun', rev: 3490 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="rev" stroke="#800000" strokeWidth={3} dot={{ r: 4, fill: '#800000' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6">Category Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Cotton Sarees', value: 400 },
                        { name: 'Silk Sarees', value: 300 },
                        { name: 'Suits', value: 300 },
                        { name: 'Wedding', value: 200 }
                      ]}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {['#800000', '#D4AF37', '#1A1A1A', '#F5F5DC'].map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Recent Orders Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-brand-maroon text-sm font-bold hover:underline"
              >
                View All Orders
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Order ID</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Customer</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Date</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Total</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Status</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="hover:shadow-sm transition-all"
                    >
                      <td className="px-8 py-4 font-bold text-slate-800">{order.id}</td>
                      <td className="px-8 py-4">
                        <p className="font-medium text-slate-800">{order.customer.name}</p>
                        <p className="text-xs text-slate-400">{order.customer.email}</p>
                      </td>
                      <td className="px-8 py-4 text-slate-500 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-8 py-4 font-bold text-slate-800">₹{order.total}</td>
                      <td className="px-8 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                          order.status === 'Pending' && "bg-amber-50 text-amber-600 border border-amber-200",
                          order.status === 'Processing' && "bg-blue-50 text-blue-600 border border-blue-200",
                          order.status === 'Shipped' && "bg-purple-50 text-purple-600 border border-purple-200",
                          order.status === 'Delivered' && "bg-green-50 text-green-600 border border-green-200"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex space-x-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-slate-400 hover:text-brand-maroon transition-colors"
                          >
                            <Eye size={16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-8 py-12 text-center text-slate-400 italic">
                        No transactions found yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="font-sans selection:bg-brand-gold selection:text-brand-dark">
      {isAdmin ? renderAdminPanel() : renderCustomerSite()}
    </div>
  );
}
