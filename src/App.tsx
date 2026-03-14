import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Truck, RotateCcw, 
  Instagram, Facebook, Twitter, Mail, Phone, MapPin,
  X, Sparkles, Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { INITIAL_PRODUCTS, Product, Category, CartItem, Order } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionHeading } from './components/SectionHeading';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer, ToastType } from './components/Toast';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1240);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('EN');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Derived State
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Effects
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

  // Handlers
  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast(`${product.name} added to bag!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    addToast('Item removed from bag', 'info');
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const isWishlisted = prev.includes(id);
      if (isWishlisted) {
        addToast('Removed from wishlist', 'info');
        return prev.filter(i => i !== id);
      }
      addToast('Added to wishlist!');
      return [...prev, id];
    });
  };

  const handleCheckoutComplete = (details: any) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      total: cartTotal,
      status: 'Pending',
      date: new Date().toISOString(),
      customer: { name: details.name, email: details.email }
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#800000', '#D4AF37', '#ffffff']
    });
    addToast('Order Placed Successfully! Thank you for shopping with us.', 'success');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      addToast('Admin Login Successful', 'success');
    } else {
      addToast('Invalid Credentials', 'error');
    }
  };

  const [recentPurchase, setRecentPurchase] = useState<{ name: string; city: string; time: string } | null>(null);

  useEffect(() => {
    const purchases = [
      { name: 'Anjali', city: 'Mumbai', time: '2 mins ago' },
      { name: 'Priya', city: 'Delhi', time: '5 mins ago' },
      { name: 'Sneha', city: 'Bangalore', time: '1 min ago' },
      { name: 'Meera', city: 'Surat', time: '10 mins ago' }
    ];
    
    const interval = setInterval(() => {
      const random = purchases[Math.floor(Math.random() * purchases.length)];
      setRecentPurchase(random);
      setTimeout(() => setRecentPurchase(null), 5000);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <AnimatePresence>
        {recentPurchase && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-8 left-8 z-[100] bg-white p-4 rounded-2xl shadow-2xl border border-brand-gold/10 flex items-center space-x-4 max-w-xs"
          >
            <div className="w-12 h-12 bg-brand-beige rounded-full flex items-center justify-center text-brand-maroon font-bold">
              {recentPurchase.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-brand-dark">{recentPurchase.name} from {recentPurchase.city}</p>
              <p className="text-[10px] text-brand-dark/40 uppercase tracking-widest">Just purchased a Saree • {recentPurchase.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-brand-maroon text-white py-1 px-4 text-center overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-4"
        >
          <span>⚡ Flash Sale: Extra 15% OFF on all Sarees</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Ends in: 02h 45m 12s</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Use Code: FLASH15</span>
        </motion.div>
      </div>
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

      <main>
        <Hero />

        {/* Trending Section */}
        <section className="py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Trending Elegance" 
              subtitle="Discover the most coveted designs from our latest collection, handcrafted for the modern woman."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onView={setSelectedProduct}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-24 bg-brand-beige/30 border-y border-brand-gold/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-brand-gold/10">
                <Truck className="text-brand-maroon" size={32} />
              </div>
              <h3 className="text-xl font-serif text-brand-maroon">Express Delivery</h3>
              <p className="text-brand-dark/60 text-sm leading-relaxed">Direct from Surat to your doorstep in 3-5 business days. Fast, reliable, and tracked.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-brand-gold/10">
                <ShieldCheck className="text-brand-maroon" size={32} />
              </div>
              <h3 className="text-xl font-serif text-brand-maroon">Quality Guaranteed</h3>
              <p className="text-brand-dark/60 text-sm leading-relaxed">Every piece undergoes a 3-step quality check to ensure you receive nothing but perfection.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-brand-gold/10">
                <RotateCcw className="text-brand-maroon" size={32} />
              </div>
              <h3 className="text-xl font-serif text-brand-maroon">Easy Returns</h3>
              <p className="text-brand-dark/60 text-sm leading-relaxed">Not satisfied? No worries. Our 7-day hassle-free return policy has you covered.</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 px-4 md:px-8 maroon-gradient text-white overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Sparkles size={48} className="text-brand-gold mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Join the Elite Circle</h2>
            <p className="text-white/70 mb-12 text-lg max-w-2xl mx-auto">Subscribe to receive early access to new drops, exclusive styling tips, and a special welcome gift.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
              />
              <button className="gold-shimmer text-brand-dark px-8 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
          {/* Decorative Background */}
          <div className="absolute left-0 top-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[100px]" />
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-maroon/40 rounded-full blur-[120px]" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="space-y-8">
            <div className="flex flex-col">
              <h2 className="text-3xl font-serif font-bold text-brand-gold">RoziRoti</h2>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">by Ratna</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">Bringing the timeless elegance of Surat's ethnic fashion to every woman's wardrobe. Affordable, reliable, and beautiful.</p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-8">Shop Categories</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              {['Wedding Sarees', 'Party Wear Suits', 'Daily Wear Collection', 'Budget Deals', 'New Arrivals'].map(item => (
                <li key={item} className="hover:text-brand-gold cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-8">Customer Care</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              {['Track Order', 'Shipping Policy', 'Return & Exchange', 'Size Guide', 'FAQs'].map(item => (
                <li key={item} className="hover:text-brand-gold cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-8">Contact Us</h4>
            <div className="space-y-4 text-white/60 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-gold mt-1" />
                <span>123 Fashion Street, Surat, <br />Gujarat - 395001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-gold" />
                <span>hello@roziroti.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-xs">© 2026 RoziRoti by Ratna. All rights reserved. Designed with love in Surat.</p>
          <div className="flex items-center space-x-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <QuickViewModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        onComplete={handleCheckoutComplete}
      />

      <SizeGuideModal 
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <ToastContainer toasts={toasts} removeToast={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdminLogin(false)} className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-serif text-brand-maroon mb-6">Admin Access</h3>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Password</label>
                  <input 
                    type="password" 
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    className="w-full border-b border-brand-gold/20 py-2 focus:outline-none focus:border-brand-maroon transition-colors"
                    placeholder="Enter admin password"
                  />
                  <p className="text-[8px] text-brand-dark/20 mt-2 uppercase tracking-widest">Hint: admin123</p>
                </div>
                <button type="submit" className="w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg">
                  Login to Console
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Panel */}
      {isAdmin && (
        <AdminPanel 
          products={products}
          orders={orders}
          onClose={() => setIsAdmin(false)}
        />
      )}

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitIntent(false)} className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }} 
              animate={{ scale: 1, opacity: 1, rotate: 0 }} 
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }} 
              className="relative bg-white rounded-[40px] overflow-hidden max-w-3xl w-full shadow-2xl flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 bg-brand-maroon p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
                <Gift size={80} className="text-brand-gold mb-6 relative z-10" />
                <h3 className="text-4xl font-serif mb-4 relative z-10">Wait! Don't Go...</h3>
                <p className="text-white/60 text-sm relative z-10">Get an extra 10% OFF on your first order. Use code: <span className="text-brand-gold font-bold">WELCOME10</span></p>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <Sparkles size={200} className="absolute -top-20 -left-20" />
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
