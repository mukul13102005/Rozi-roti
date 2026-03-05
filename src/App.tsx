import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, Star, Trash2, Plus, Minus, 
  ChevronRight, ArrowRight, LayoutDashboard, User, LogOut, 
  TrendingUp, Package, Users, DollarSign, Bell, Filter, 
  Eye, Edit, Trash, CheckCircle, Phone, Mail, MapPin, 
  Instagram, Facebook, Twitter, ShieldCheck, Truck, RotateCcw, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cn } from './utils';
import { CATEGORIES, INITIAL_PRODUCTS, type Product, type CartItem, type Order, type Category } from './types';
import { Badge } from './components/Badge';
import { SectionHeading } from './components/SectionHeading';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/Toast';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';

// --- Main App ---

export default function App() {
  // --- State ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState<'Dashboard' | 'Products' | 'Orders'>('Dashboard');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
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

  const [loyaltyPoints, setLoyaltyPoints] = useState(450);
  const [toasts, setToasts] = useState<{id: string, message: string, type: 'success' | 'error' | 'info'}[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    name: 'Mukul',
    email: 'mukul13102005@gmail.com',
    phone: '+91 98765 43210',
    address: '123, Textile Market, Surat, Gujarat',
    pincode: '395003'
  });

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('rr_recent');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

  // --- Effects ---
  useEffect(() => {
    // Simulate loading
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
    // Show spin wheel after 10 seconds if not shown before
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
        addToast(`Increased ${product.name} quantity in bag`, 'info');
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      addToast(`${product.name} added to your bag`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
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
    setWishlist(prev => {
      const isIncluded = prev.includes(id);
      if (isIncluded) {
        addToast('Removed from wishlist', 'info');
        return prev.filter(i => i !== id);
      } else {
        addToast('Added to wishlist', 'success');
        return [...prev, id];
      }
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const cartSavings = cartOriginalTotal - cartTotal;

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast('Your bag is empty', 'error');
      return;
    }
    setIsCheckoutOpen(true);
    setCheckoutStep(1);
    setIsCartOpen(false);
  };

  const confirmOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal,
      status: 'Pending',
      customer: {
        name: shippingDetails.name,
        email: shippingDetails.email,
        address: `${shippingDetails.address}, ${shippingDetails.pincode}`
      }
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setLoyaltyPoints(prev => prev + Math.floor(cartTotal / 100));
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#800000', '#F5F5DC']
    });
    addToast('Order Placed Successfully! Thank you for shopping with us.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product deleted successfully', 'info');
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
      {/* Navbar */}
      <Navbar 
        loyaltyPoints={loyaltyPoints}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlist={wishlist}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowAdminLogin={setShowAdminLogin}
        setSelectedCategory={setSelectedCategory}
        toggleWishlist={toggleWishlist}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 bg-brand-gold/5 animate-pulse flex items-center justify-center">
            <h1 className="text-4xl font-serif text-brand-maroon/20">Loading Elegance...</h1>
          </div>
        ) : (
          <>
            <div className="absolute inset-0">
              <motion.img 
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, ease: 'linear' }}
                src="https://picsum.photos/seed/ethnic-fashion-1/1920/1080" 
                alt="Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <Badge variant="gold" className="mb-6 inline-block">Surat's Finest Craftsmanship</Badge>
                <h2 className="text-5xl md:text-9xl font-serif text-white leading-[0.9] tracking-tighter">
                  Elegance <br /> <span className="text-brand-gold italic">Redefined.</span>
                </h2>
                <p className="text-lg md:text-xl mt-8 text-brand-beige/80 font-light max-w-lg leading-relaxed">
                  Discover our exclusive collection of handpicked Cotton Sarees and Stitched Suits. 
                  Crafted for the modern woman who cherishes tradition.
                </p>
                <div className="mt-10 flex space-x-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-brand-gold text-brand-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest flex items-center shadow-2xl shadow-brand-gold/20"
                  >
                    Shop Now <ArrowRight className="ml-2" size={18} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </section>

      {/* Trust Bar */}
      <div className="bg-white py-10 border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Authentic Quality', desc: '100% Genuine Fabrics' },
            { icon: Truck, title: 'Express Delivery', desc: 'Worldwide Shipping' },
            { icon: RotateCcw, title: 'Easy Returns', desc: '7-Day Hassle Free' },
            { icon: CreditCard, title: 'Secure Payment', desc: 'Safe & Encrypted' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <item.icon className="text-brand-maroon mb-2" size={24} />
              <h4 className="font-bold text-xs uppercase tracking-wider">{item.title}</h4>
              <p className="text-[10px] text-brand-dark/50 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">Discover</h2>
            <h3 className="text-5xl font-serif text-brand-maroon">Curated Collections</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
            {[
              { name: 'Cotton Sarees', img: 'https://picsum.photos/seed/cat-cotton/600/800', span: 'md:col-span-2 md:row-span-2' },
              { name: 'Silk Sarees', img: 'https://picsum.photos/seed/cat-silk/600/400', span: 'md:col-span-2' },
              { name: 'Stitched Suits', img: 'https://picsum.photos/seed/cat-suits/600/400', span: '' },
              { name: 'Wedding', img: 'https://picsum.photos/seed/cat-wedding/600/400', span: '' }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.005 }}
                className={cn("relative rounded-xl overflow-hidden cursor-pointer group", cat.span)}
                onClick={() => setSelectedCategory(cat.name as any)}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{cat.name}</h3>
                  <div className="w-0 h-0.5 bg-brand-gold group-hover:w-16 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <SectionHeading title="Our Masterpieces" subtitle="Each piece is a story of tradition and timeless beauty." />
            </div>
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
              {['All', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'New Arrivals'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                    selectedCategory === cat 
                      ? "maroon-gradient text-white shadow-lg" 
                      : "bg-white text-brand-maroon border border-brand-maroon/20 hover:border-brand-maroon"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-brand-gold/10 rounded-2xl mb-4" />
                  <div className="h-4 bg-brand-gold/10 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-brand-gold/10 rounded w-1/2" />
                </div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.slice(0, 12).map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white mb-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <Badge variant={product.badge === 'Sale' ? 'maroon' : 'gold'}>{product.badge}</Badge>
                      </div>
                    )}
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={cn(
                        "absolute top-2 right-2 p-1 rounded-full glass-effect transition-colors",
                        wishlist.includes(product.id) ? "text-brand-maroon" : "text-brand-dark/40"
                      )}
                    >
                      <Heart size={14} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>

                    <button 
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute top-10 right-2 p-1 rounded-full glass-effect text-brand-dark/40 hover:text-brand-maroon transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    
                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-brand-dark text-white py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-brand-maroon transition-colors"
                      >
                        <ShoppingBag size={12} className="mr-1" /> Add
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">{product.category}</p>
                    <h3 className="font-serif text-base text-brand-dark group-hover:text-brand-maroon transition-colors line-clamp-1">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-brand-maroon font-bold">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-brand-dark/40 line-through text-sm">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-brand-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                        <span className="text-[10px] text-brand-dark/40 ml-1">({product.reviews})</span>
                      </div>
                      {product.stock < 10 && (
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Only {product.stock} Left!</span>
                      )}
                    </div>
                    <button 
                      onClick={() => { addToRecent(product.id); setShowSizeGuide(true); }}
                      className="text-[10px] text-brand-maroon uppercase font-bold tracking-widest hover:underline mt-2 block"
                    >
                      Size Guide
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
          
          <div className="mt-16 text-center">
            <button className="border-2 border-brand-maroon text-brand-maroon px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-maroon hover:text-white transition-all">
              View All Masterpieces
            </button>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-serif text-brand-maroon mb-8">Recently Viewed</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map(id => {
                const product = products.find(p => p.id === id);
                if (!product) return null;
                return (
                  <div key={id} className="flex items-center space-x-4 p-4 border border-brand-gold/10 rounded-2xl hover:border-brand-gold transition-colors cursor-pointer">
                    <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-sm font-serif line-clamp-1">{product.name}</h4>
                      <p className="text-xs font-bold text-brand-maroon">₹{product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 maroon-gradient text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <SectionHeading title="Join the Elite Circle" />
          <p className="text-brand-beige/80 mb-10 -mt-8 italic">
            Subscribe to receive exclusive early access to our limited edition collections and styling tips.
          </p>
          {!hasSubscribed ? (
            <form 
              onSubmit={(e) => { e.preventDefault(); setHasSubscribed(true); confetti(); }}
              className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <button className="bg-brand-gold text-brand-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Subscribe
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 border border-white/20 p-8 rounded-3xl"
            >
              <CheckCircle className="mx-auto text-brand-gold mb-4" size={48} />
              <h4 className="text-2xl font-serif mb-2">Welcome to the Family!</h4>
              <p className="text-brand-beige/60">Check your inbox for a special welcome gift.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer - MBA & Luxury Optimized */}
      <footer className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Newsletter Section - High Conversion */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-20 p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="mb-8 lg:mb-0 text-center lg:text-left">
              <h3 className="text-3xl font-serif text-brand-gold mb-2">Join the Elite Circle</h3>
              <p className="text-white/50 text-sm max-w-md">Get early access to new drops, styling tips, and exclusive rewards. No spam, just elegance.</p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm w-full sm:w-80"
                />
                <button className="maroon-gradient text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-white/20 mt-4 text-center lg:text-left">By subscribing, you agree to our Privacy Policy.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex flex-col mb-6">
                <h2 className="text-3xl font-serif font-bold text-brand-gold tracking-tighter">RoziRoti</h2>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">By Ratna</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed max-w-sm mb-8">
                Crafting timeless elegance in the heart of Surat. We bring you the finest handpicked ethnic wear that celebrates the spirit of the modern Indian woman.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8 text-brand-gold">Collections</h4>
              <ul className="space-y-4 text-xs text-white/40">
                {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Wedding Store', 'Bestsellers'].map(item => (
                  <li key={item} className="hover:text-brand-gold cursor-pointer transition-colors flex items-center group">
                    <span className="w-0 h-px bg-brand-gold mr-0 group-hover:w-3 group-hover:mr-2 transition-all"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8 text-brand-gold">Customer Care</h4>
              <ul className="space-y-4 text-xs text-white/40">
                {['Track Order', 'Shipping Policy', 'Returns', 'Size Guide', 'FAQs'].map(item => (
                  <li key={item} className="hover:text-brand-gold cursor-pointer transition-colors flex items-center group">
                    <span className="w-0 h-px bg-brand-gold mr-0 group-hover:w-3 group-hover:mr-2 transition-all"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8 text-brand-gold">Contact</h4>
              <ul className="space-y-6 text-xs text-white/40">
                <li className="flex items-start">
                  <MapPin className="mr-3 text-brand-gold shrink-0" size={14} />
                  <span>Textile Market, Surat, GJ</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 text-brand-gold shrink-0" size={14} />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 text-brand-gold shrink-0" size={14} />
                  <span>hello@roziroti.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-[10px] text-white/20 uppercase tracking-widest">© {new Date().getFullYear()} RoziRoti by Ratna. All Rights Reserved.</p>
              <p className="text-[9px] text-white/10 italic">Handcrafted with love in India</p>
            </div>

            {/* Trust Badges - MBA Strategy */}
            <div className="flex items-center space-x-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center space-x-1">
                <ShieldCheck size={14} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck size={14} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Express Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <RotateCcw size={14} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Easy Returns</span>
              </div>
            </div>

            <div className="flex space-x-6">
              {['Privacy', 'Terms', 'Sitemap'].map(item => (
                <button key={item} className="text-[9px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">{item}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-8 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-brand-gold/20 z-40 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60">{visitorCount} Elegance Seekers Online</span>
      </div>

      <button className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40">
        <Phone size={24} />
      </button>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-brand-beige shadow-2xl z-[90] flex flex-col"
            >
              <div className="p-6 border-b border-brand-gold/20 flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-serif text-brand-maroon">RoziRoti</h3>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold">By Ratna</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-brand-gold/10 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mb-4">Shop Categories</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'Wedding'].map((item) => (
                        <button 
                          key={item}
                          onClick={() => { setSelectedCategory(item as any); setIsMenuOpen(false); }}
                          className="flex items-center justify-between p-4 bg-white rounded-xl border border-brand-gold/10 hover:border-brand-maroon transition-all group"
                        >
                          <span className="font-serif text-lg text-brand-dark group-hover:text-brand-maroon">{item}</span>
                          <ChevronRight size={18} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-brand-maroon rounded-2xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">Exclusive Offer</p>
                      <h5 className="text-xl font-serif mb-2">Join the Elite Circle</h5>
                      <p className="text-xs text-white/70 mb-4">Get early access to sales and 500 bonus points on signup.</p>
                      <button className="bg-brand-gold text-brand-dark px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">Join Now</button>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-gold/20 rounded-full blur-2xl" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Quick Links</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {['Track Order', 'Size Guide', 'Shipping', 'Returns'].map(item => (
                        <button key={item} className="text-left text-sm text-brand-dark/60 hover:text-brand-maroon transition-colors">{item}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-brand-gold/20 bg-white/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                      <User size={16} className="text-brand-maroon" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-dark">Welcome, Guest</p>
                      <p className="text-[10px] text-brand-dark/40">Login to see points</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAdminLogin(true)} className="text-[10px] font-bold text-brand-maroon uppercase tracking-widest">Login</button>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => setCurrency(c => c === 'INR' ? 'USD' : 'INR')} className="flex-1 py-2 bg-white border border-brand-gold/20 rounded-lg text-[10px] font-bold text-brand-maroon uppercase tracking-widest">{currency}</button>
                  <button onClick={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')} className="flex-1 py-2 bg-white border border-brand-gold/20 rounded-lg text-[10px] font-bold text-brand-maroon uppercase tracking-widest">{language}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-beige shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-brand-gold/20 flex justify-between items-center">
                <h3 className="text-2xl font-serif text-brand-maroon">Your Shopping Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-brand-gold/10 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag size={64} className="text-brand-dark/10 mb-4" />
                    <p className="text-brand-dark/60 italic">Your bag is as empty as a loom without thread.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 text-brand-maroon font-bold uppercase tracking-widest border-b-2 border-brand-maroon"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h4 className="font-serif text-brand-dark leading-tight">{item.name}</h4>
                        <p className="text-xs text-brand-dark/40 mt-1">{item.category}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-brand-gold/20 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-brand-gold/10"><Minus size={14} /></button>
                            <span className="px-3 text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-brand-gold/10"><Plus size={14} /></button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-brand-maroon">₹{item.price * item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 uppercase font-bold mt-1">Remove</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-brand-gold/20 space-y-4">
                  <div className="bg-brand-beige/50 p-4 rounded-xl border border-brand-gold/10 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mr-3">
                        <Star className="text-brand-gold" size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-brand-maroon">Bundle & Save</p>
                        <p className="text-xs text-brand-dark/60">Add 1 more for extra 5% off</p>
                      </div>
                    </div>
                    <Plus size={16} className="text-brand-maroon" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-dark/60">Subtotal</span>
                      <span className="font-bold">₹{cartOriginalTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Bag Discount</span>
                      <span>-₹{cartSavings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-dark/60">Shipping</span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif pt-2 border-t border-brand-gold/10">
                      <span className="text-brand-maroon">Total</span>
                      <span className="text-brand-maroon">₹{cartTotal}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full maroon-gradient text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-[10px] text-center text-brand-dark/40 uppercase tracking-widest">
                    Secure Checkout Powered by Ratna Payments
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 h-[400px] md:h-auto">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <Badge variant="gold">{quickViewProduct.category}</Badge>
                <h3 className="text-4xl font-serif text-brand-maroon mt-4 mb-2">{quickViewProduct.name}</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-bold text-brand-maroon">₹{quickViewProduct.price}</span>
                  <span className="text-brand-dark/40 line-through">₹{quickViewProduct.originalPrice}</span>
                  <Badge variant="outline">Save ₹{quickViewProduct.originalPrice - quickViewProduct.price}</Badge>
                </div>
                <p className="text-brand-dark/60 text-sm mb-8 leading-relaxed">{quickViewProduct.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-brand-beige/50 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-brand-dark/40">Fabric</p>
                    <p className="text-sm font-bold">{quickViewProduct.fabric}</p>
                  </div>
                  <div className="bg-brand-beige/50 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-brand-dark/40">Care</p>
                    <p className="text-sm font-bold">Dry Clean Only</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                    className="flex-1 maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg"
                  >
                    Add to Bag
                  </button>
                  <button 
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-4 rounded-xl border border-brand-gold/20 text-brand-maroon hover:bg-brand-gold/10 transition-colors"
                  >
                    <Heart size={24} fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
              <button onClick={() => setQuickViewProduct(null)} className="absolute top-6 right-6 text-brand-dark/40 hover:text-brand-maroon">
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
              className="relative bg-brand-beige p-8 rounded-3xl shadow-2xl max-w-md w-full border border-brand-gold/30"
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
                    className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                  />
                </div>
                <button 
                  onClick={handleAdminLogin}
                  className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest"
                >
                  Authenticate
                </button>
                <button 
                  onClick={() => setShowAdminLogin(false)}
                  className="w-full text-brand-dark/40 text-xs uppercase font-bold tracking-widest"
                >
                  Cancel
                </button>
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
                  className="w-full h-full rounded-full border-8 border-brand-gold relative overflow-hidden"
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

              <button 
                onClick={() => { 
                  confetti(); 
                  alert('Congratulations! You won 20% OFF. Use Code: LUCKY20');
                  setShowSpinWheel(false);
                }}
                className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg"
              >
                Spin Now
              </button>
              <button onClick={() => setShowSpinWheel(false)} className="mt-4 text-brand-dark/40 text-xs uppercase font-bold tracking-widest">
                Maybe Later
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <SizeGuideModal 
        isOpen={showSizeGuide} 
        onClose={() => setShowSizeGuide(false)} 
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        step={checkoutStep}
        setStep={setCheckoutStep}
        shippingDetails={shippingDetails}
        setShippingDetails={setShippingDetails}
        onConfirm={confirmOrder}
        cartTotal={cartTotal}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} />
    </div>
  );

  const renderAdminPanel = () => (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-serif font-bold text-brand-gold tracking-tighter">RoziRoti</h1>
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', tab: 'Dashboard' },
            { icon: Package, label: 'Products', tab: 'Products' },
            { icon: ShoppingBag, label: 'Orders', tab: 'Orders' },
            { icon: Users, label: 'Customers', tab: 'Dashboard' },
            { icon: TrendingUp, label: 'Analytics', tab: 'Dashboard' },
            { icon: Bell, label: 'Notifications', tab: 'Dashboard' }
          ].map((item, i) => (
            <button 
              key={i}
              onClick={() => setAdminTab(item.tab as any)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                adminTab === item.tab ? "bg-brand-gold text-brand-dark" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsAdmin(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Dashboard Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-slate-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">Ratna Devi</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-bold">RD</div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {adminTab === 'Dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Revenue', value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Active Products', value: products.length, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Total Customers', value: '1,284', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-3 rounded-xl", stat.bg)}>
                        <stat.icon className={stat.color} size={24} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
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
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
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
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                  <button onClick={() => setAdminTab('Orders')} className="text-brand-maroon text-sm font-bold hover:underline">View All Orders</button>
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
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-800">{order.id}</td>
                          <td className="px-8 py-4">
                            <p className="font-medium text-slate-800">{order.customer.name}</p>
                            <p className="text-xs text-slate-400">{order.customer.email}</p>
                          </td>
                          <td className="px-8 py-4 text-slate-500 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-8 py-4 font-bold text-slate-800">₹{order.total}</td>
                          <td className="px-8 py-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-200">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <div className="flex space-x-2">
                              <button className="p-2 text-slate-400 hover:text-brand-maroon transition-colors"><Eye size={16} /></button>
                              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-8 py-12 text-center text-slate-400 italic">No transactions found yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {adminTab === 'Products' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Product Management</h3>
                <button className="maroon-gradient text-white px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest">Add New Product</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Product</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Category</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Price</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Stock</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Status</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.slice(0, 10).map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-bold text-slate-800 line-clamp-1">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-slate-500">{product.category}</td>
                        <td className="px-8 py-4 font-bold text-slate-800">₹{product.price}</td>
                        <td className="px-8 py-4 text-sm text-slate-500">{product.stock}</td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                            product.stock > 0 ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                          )}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab === 'Orders' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">All Orders</h3>
                <div className="flex space-x-4">
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Order ID</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Customer</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Items</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Total</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Status</th>
                      <th className="px-8 py-4 text-[10px] uppercase font-bold text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-800">{order.id}</td>
                        <td className="px-8 py-4">
                          <p className="font-medium text-slate-800">{order.customer.name}</p>
                          <p className="text-xs text-slate-400">{order.customer.email}</p>
                        </td>
                        <td className="px-8 py-4 text-sm text-slate-500">{order.items.length} Items</td>
                        <td className="px-8 py-4 font-bold text-slate-800">₹{order.total}</td>
                        <td className="px-8 py-4">
                          <select 
                            value={order.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as any;
                              setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                              addToast(`Order ${order.id} status updated to ${newStatus}`, 'success');
                            }}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold uppercase focus:outline-none"
                          >
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                          </select>
                        </td>
                        <td className="px-8 py-4">
                          <button className="p-2 text-slate-400 hover:text-brand-maroon transition-colors"><Eye size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-8 py-12 text-center text-slate-400 italic">No orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  return (
    <div className="font-sans selection:bg-brand-gold selection:text-brand-dark">
      {isAdmin ? renderAdminPanel() : renderCustomerSite()}
      
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
                    className="w-full border border-brand-gold/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-maroon"
                  />
                  <button 
                    onClick={() => { setShowExitIntent(false); confetti(); }}
                    className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg"
                  >
                    Claim My Discount
                  </button>
                  <button 
                    onClick={() => setShowExitIntent(false)}
                    className="w-full text-brand-dark/30 text-[10px] uppercase font-bold tracking-widest"
                  >
                    No thanks, I prefer paying full price
                  </button>
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
}
