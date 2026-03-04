import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, Star, Trash2, Plus, Minus, 
  ChevronRight, ArrowRight, LayoutDashboard, User, LogOut, 
  TrendingUp, Package, Users, DollarSign, Bell, Filter, 
  Eye, Edit, CheckCircle, Phone, Mail, MapPin, 
  Instagram, Facebook, Twitter, ShieldCheck, Truck, RotateCcw, CreditCard,
  ChevronLeft, ChevronDown, Sparkles, Award, Gift, Clock,
  Share2, Download, Printer, ThumbsUp, MessageCircle,
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Grid3X3, Grid2X2, SlidersHorizontal, XCircle, Check,
  Sun, Moon, Palette, Globe, SortAsc, SortDesc,
  TrendingUp as Trending, Clock3, Percent, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView, MotionConfig } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CATEGORIES, INITIAL_PRODUCTS, type Product, type CartItem, type Order, type Category } from './types';

// Utility function for className merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation Variants - Professional Grade
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] // Cubic bezier for smooth easing
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] // Elastic bounce effect
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.08, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const shimmerAnimation = {
  background: [
    "linear-gradient(45deg, #D4AF37 0%, #FCF6BA 50%, #D4AF37 100%)",
    "linear-gradient(45deg, #FCF6BA 0%, #D4AF37 50%, #FCF6BA 100%)",
    "linear-gradient(45deg, #D4AF37 0%, #FCF6BA 50%, #D4AF37 100%)"
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear"
  }
};

const slideInFromBottom = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 20, 
      stiffness: 100 
    }
  }
};

// Typing Animation Component
const TypingAnimation = ({ texts, className, speed = 100, delay = 2000 }: { texts: string[], className?: string, speed?: number, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];
    
    let timer: NodeJS.Timeout;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, speed / 2);
    } else {
      if (currentIndex < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev + currentFullText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      }
    }
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, displayText, textIndex, texts, speed, delay]);
  
  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-brand-gold ml-1 align-middle"
      />
    </span>
  );
};

// Image Slider Component
const ImageSlider = ({ images, interval = 3000 }: { images: string[], interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Slide ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-brand-gold w-4" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Parallax Image Component
const ParallaxImage = ({ src, alt, speed = 0.5 }: { src: string, alt: string, speed?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
  
  return (
    <motion.div ref={ref} style={{ y }} className="overflow-hidden h-full w-full">
      <img src={src} alt={alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </motion.div>
  );
};

// Badge Component
const Badge = ({ children, variant = 'default', animate = false, className }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'maroon' | 'outline', animate?: boolean, className?: string }) => {
  const variants = {
    default: 'bg-brand-dark text-white',
    gold: 'bg-brand-gold text-brand-dark font-bold',
    maroon: 'bg-brand-maroon text-white',
    outline: 'border border-brand-maroon text-brand-maroon'
  };
  
  return (
    <motion.span 
      whileHover={animate ? { scale: 1.1, rotate: 2 } : {}}
      whileTap={animate ? { scale: 0.95 } : {}}
      className={cn("px-3 py-1 text-xs uppercase tracking-wider rounded-full inline-block", variants[variant], className)}
    >
      {children}
    </motion.span>
  );
};

// Section Heading Component
const SectionHeading = ({ title, subtitle, align = 'center', highlight = false }: { title: string, subtitle?: string, align?: 'left' | 'center' | 'right', highlight?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={cn("mb-12", align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left')}
    >
      <motion.h2 
        variants={fadeInUp}
        className={cn(
          "text-3xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight",
          highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-maroon to-brand-gold" : "text-brand-maroon"
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-brand-dark/60 max-w-2xl mx-auto text-base md:text-lg font-light"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        variants={scaleIn}
        transition={{ delay: 0.3 }}
        className="w-24 h-1 bg-gradient-to-r from-brand-maroon to-brand-gold mx-auto mt-6 rounded-full"
      />
    </motion.div>
  );
};

// Enhanced Product Card with Mobile Optimization
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist, onQuickView, viewMode = 'grid' }: { 
  product: Product; 
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist: boolean;
  onQuickView: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // Multiple images for product
  const productImages = [
    product.image,
    product.image.replace('600/800', '601/801'),
    product.image.replace('600/800', '602/802'),
    product.image.replace('600/800', '603/803')
  ];
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && viewMode === 'grid') {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isHovered, productImages.length, viewMode]);
  
  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        variants={fadeInLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ y: -4, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
      >
        <div className="sm:w-48 h-48 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {product.badge && (
            <div className="absolute top-2 left-2">
              <Badge variant={product.badge === 'Sale' ? 'maroon' : 'gold'}>{product.badge}</Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs text-brand-gold font-bold mb-1">{product.category}</p>
            <h3 className="font-serif text-lg text-brand-dark mb-2">{product.name}</h3>
            <p className="text-sm text-brand-dark/60 line-clamp-2 mb-3">{product.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-brand-maroon">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="ml-2 text-sm text-brand-dark/40 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggleWishlist(product.id)}
                className="p-2 rounded-full hover:bg-brand-gold/10 transition-colors"
              >
                <Heart size={18} fill={isInWishlist ? "#800000" : "none"} className={isInWishlist ? "text-brand-maroon" : "text-brand-dark/40"} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onAddToCart(product)}
                className="bg-brand-maroon text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-maroon/90 transition-colors"
              >
                Add
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      ref={cardRef}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={productImages[currentImageIndex]}
            alt={product.name}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant={product.badge === 'Sale' ? 'maroon' : 'gold'}>{product.badge}</Badge>
            </motion.div>
          )}
          {product.isBestseller && (
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="gold">Best Seller</Badge>
            </motion.div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleWishlist(product.id)}
            className={cn(
              "p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-colors",
              isInWishlist ? "text-brand-maroon" : "text-brand-dark/60 hover:text-brand-maroon"
            )}
          >
            <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(product)}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-brand-dark/60 hover:text-brand-maroon transition-colors"
          >
            <Eye size={16} />
          </motion.button>
        </div>
        
        {/* Quick Add Overlay */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: isHovered ? 0 : 100 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-3 bottom-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(product)}
            className="w-full bg-brand-dark text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-brand-maroon transition-colors shadow-lg"
          >
            <ShoppingBag size={14} className="mr-1.5" /> Add to Bag
          </motion.button>
        </motion.div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {productImages.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentImageIndex === index ? 16 : 6,
                backgroundColor: currentImageIndex === index ? '#800000' : '#D4AF37'
              }}
              className="h-1 rounded-full"
            />
          ))}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">
          {product.category}
        </p>
        
        <h3 className="font-serif text-base text-brand-dark group-hover:text-brand-maroon transition-colors line-clamp-1 mb-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "text-brand-gold fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-[10px] text-brand-dark/40">({product.reviews})</span>
          </div>
          
          {/* Customer Avatars */}
          <div className="flex -space-x-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-white bg-brand-beige overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/seed/customer-${product.id}-${i}/50/50`}
                  alt="Customer"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-brand-maroon">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="ml-1.5 text-xs text-brand-dark/40 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          {product.stock < 10 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[8px] text-red-500 font-bold uppercase tracking-tighter bg-red-50 px-1.5 py-0.5 rounded-full"
            >
              Only {product.stock} Left!
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component
export default function App() {
  // --- State ---
  const [isAdmin, setIsAdmin] = useState(false);
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
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('rr_recent');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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

  const addToRecent = useCallback((id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i !== id);
      return [id, ...filtered].slice(0, 4);
    });
  }, []);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Logic ---
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.filter(p => p.badge === 'New').concat(filtered.filter(p => p.badge !== 'New'));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.5 }
    });
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

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Absolutely stunning collection! The fabric quality is exceptional and the fit is perfect. RoziRoti has become my go-to for ethnic wear.",
      image: "https://picsum.photos/seed/testimonial-1/100/100"
    },
    {
      name: "Anjali Mehta",
      location: "Delhi",
      rating: 5,
      text: "The attention to detail in every piece is remarkable. I've received countless compliments on my wedding saree. Thank you Ratna!",
      image: "https://picsum.photos/seed/testimonial-2/100/100"
    },
    {
      name: "Ritu Patel",
      location: "Surat",
      rating: 5,
      text: "As a local Surat girl, I'm proud to see such amazing craftsmanship. The customer service is top-notch and delivery is always on time.",
      image: "https://picsum.photos/seed/testimonial-3/100/100"
    }
  ];

  // --- Views ---
  const renderCustomerSite = () => (
    <MotionConfig reducedMotion="user">
      <div className={`min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-brand-beige/30'}`}>
        {/* Announcement Bar with Animation */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-brand-maroon via-brand-maroon/90 to-brand-maroon text-white text-center py-2 text-xs font-medium tracking-widest uppercase relative overflow-hidden"
        >
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="whitespace-nowrap"
          >
            ✨ Free Shipping on orders above ₹2999 | Use Code: RATNA10 for 10% Off | New Bridal Collection is Live! | Express Delivery Available ✨
          </motion.div>
        </motion.div>

        {/* Enhanced Navbar with Glass Morphism */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-brand-gold/20 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Mobile Menu Toggle */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)} 
                className="lg:hidden p-2 text-brand-maroon dark:text-brand-gold"
              >
                <Menu size={24} />
              </motion.button>

              {/* Enhanced Logo with Animation */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 flex flex-col items-center cursor-pointer group" 
                onClick={() => setSelectedCategory('All')}
              >
                <motion.div
                  animate={{ 
                    textShadow: [
                      "0 0 0 rgba(212,175,55,0)",
                      "0 0 10px rgba(212,175,55,0.5)",
                      "0 0 0 rgba(212,175,55,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-brand-maroon to-brand-gold bg-clip-text text-transparent tracking-tighter">
                    RoziRoti
                  </h1>
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-maroon/20 rounded-full blur-xl -z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold -mt-1">
                  By Ratna
                </span>
              </motion.div>

              {/* Desktop Nav with Mega Menu */}
              <div className="hidden lg:flex space-x-8 items-center h-full">
                {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'Wedding'].map((item, index) => (
                  <motion.div 
                    key={item} 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group h-full flex items-center relative"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(item as any)}
                      className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-maroon dark:hover:text-brand-gold transition-colors uppercase tracking-wider h-full flex items-center"
                    >
                      {item}
                    </motion.button>
                    
                    {/* Mega Menu with Enhanced Animation */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileHover={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 w-screen max-w-4xl bg-white dark:bg-gray-900 border border-brand-gold/20 shadow-2xl invisible group-hover:visible z-50 p-8 rounded-2xl mt-2"
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                    >
                      <div className="grid grid-cols-4 gap-8">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <h4 className="font-bold text-brand-maroon dark:text-brand-gold uppercase tracking-widest mb-4 border-b border-brand-gold/10 pb-2">By Fabric</h4>
                          <ul className="space-y-2 text-sm text-brand-dark/60 dark:text-white/60">
                            {['Pure Cotton', 'Silk Blend', 'Chanderi', 'Organza'].map((fabric, i) => (
                              <motion.li 
                                key={fabric}
                                whileHover={{ x: 5 }}
                                className="hover:text-brand-maroon dark:hover:text-brand-gold cursor-pointer"
                              >
                                {fabric}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="font-bold text-brand-maroon dark:text-brand-gold uppercase tracking-widest mb-4 border-b border-brand-gold/10 pb-2">By Style</h4>
                          <ul className="space-y-2 text-sm text-brand-dark/60 dark:text-white/60">
                            {['Traditional', 'Contemporary', 'Minimalist', 'Heavy Work'].map((style, i) => (
                              <motion.li 
                                key={style}
                                whileHover={{ x: 5 }}
                                className="hover:text-brand-maroon dark:hover:text-brand-gold cursor-pointer"
                              >
                                {style}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h4 className="font-bold text-brand-maroon dark:text-brand-gold uppercase tracking-widest mb-4 border-b border-brand-gold/10 pb-2">By Occasion</h4>
                          <ul className="space-y-2 text-sm text-brand-dark/60 dark:text-white/60">
                            {['Office Wear', 'Festive', 'Wedding', 'Daily Wear'].map((occasion, i) => (
                              <motion.li 
                                key={occasion}
                                whileHover={{ x: 5 }}
                                className="hover:text-brand-maroon dark:hover:text-brand-gold cursor-pointer"
                              >
                                {occasion}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="relative rounded-xl overflow-hidden h-40 group cursor-pointer"
                        >
                          <ImageSlider images={[
                            'https://picsum.photos/seed/mega-menu-1/400/300',
                            'https://picsum.photos/seed/mega-menu-2/400/300',
                            'https://picsum.photos/seed/mega-menu-3/400/300'
                          ]} interval={2000} />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/80 to-transparent flex items-end justify-center p-4">
                            <p className="text-white font-serif text-sm">New Collection</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Actions with Enhanced UI */}
              <div className="flex items-center space-x-1 md:space-x-4">
                <div className="hidden xl:flex items-center space-x-2 mr-4 border-r border-brand-gold/20 pr-4">
                  <div className="flex flex-col items-end mr-2">
                    <span className="text-[8px] uppercase tracking-widest text-brand-dark/40 dark:text-white/40 font-bold">Points</span>
                    <span className="text-xs font-bold text-brand-maroon dark:text-brand-gold">{loyaltyPoints}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrency(c => c === 'INR' ? 'USD' : 'INR')} 
                    className="text-[10px] font-bold text-brand-maroon dark:text-brand-gold hover:text-brand-gold dark:hover:text-white transition-colors"
                  >
                    {currency}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')} 
                    className="text-[10px] font-bold text-brand-maroon dark:text-brand-gold hover:text-brand-gold dark:hover:text-white transition-colors"
                  >
                    {language}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    className="text-brand-maroon dark:text-brand-gold hover:text-brand-gold dark:hover:text-white transition-colors"
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.button>
                </div>
                
                {/* Mobile Search Toggle */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilters(!showFilters)} 
                  className="md:hidden p-2 text-brand-maroon dark:text-brand-gold"
                >
                  <Search size={20} />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAdminLogin(true)} 
                  className="p-2 text-brand-maroon dark:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-colors"
                >
                  <User size={20} />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist('')} 
                  className="p-2 text-brand-maroon dark:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-colors relative"
                >
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-brand-gold text-brand-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(true)} 
                  className="p-2 text-brand-maroon dark:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-colors relative"
                >
                  <ShoppingBag size={20} />
                  {cart.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-brand-maroon text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden py-4 border-t border-brand-gold/20"
                >
                  <div className="flex items-center bg-brand-beige/50 dark:bg-gray-800 rounded-full px-4 py-2 border border-brand-gold/20">
                    <Search size={16} className="text-brand-maroon/50 dark:text-brand-gold/50" />
                    <input 
                      type="text" 
                      placeholder="Search elegance..." 
                      className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 dark:text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          {isLoading ? (
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-brand-maroon/5 animate-pulse flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-serif text-brand-maroon/50 dark:text-brand-gold/50">Loading Elegance...</h1>
              </div>
            </div>
          ) : (
            <>
              <motion.div 
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0"
              >
                <ParallaxImage 
                  src="https://picsum.photos/seed/roziroti-hero/1920/1080" 
                  alt="Hero" 
                  speed={0.3}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />
              </motion.div>
              
              <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-xl text-white"
                >
                  <motion.div
                    animate={floatAnimation}
                  >
                    <Badge variant="gold" animate>Surat's Finest Craftsmanship</Badge>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl md:text-7xl lg:text-8xl font-serif mt-4 md:mt-6 leading-tight"
                  >
                    Elegance{' '}
                    <motion.span 
                      animate={{ 
                        color: ['#D4AF37', '#FFFFFF', '#D4AF37'],
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 0 0 rgba(212,175,55,0)",
                          "0 0 20px rgba(212,175,55,0.5)",
                          "0 0 0 rgba(212,175,55,0)"
                        ]
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
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm md:text-lg mt-4 md:mt-6 text-brand-beige/90 font-light leading-relaxed"
                  >
                    <TypingAnimation 
                      texts={[
                        "Discover our exclusive collection of handpicked Cotton Sarees.",
                        "Crafted for the modern woman who cherishes tradition.",
                        "Experience Surat's finest craftsmanship.",
                        "Where tradition meets contemporary elegance."
                      ]} 
                    />
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-6 md:mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(212,175,55,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      animate={pulseAnimation}
                      onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-gradient-to-r from-brand-maroon to-brand-gold text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center group text-xs md:text-base shadow-xl"
                    >
                      Shop Collection <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-md border border-white/30 px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-colors text-xs md:text-base"
                    >
                      Our Story
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Scroll Indicator with Animation */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
              >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <motion.div 
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-2 bg-white rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </>
          )}
        </section>

        {/* Enhanced Trust Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white dark:bg-gray-900 py-8 md:py-12 border-y border-brand-gold/10"
        >
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: ShieldCheck, title: 'Authentic Quality', desc: '100% Genuine Fabrics' },
              { icon: Truck, title: 'Express Delivery', desc: 'Worldwide Shipping' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '7-Day Hassle Free' },
              { icon: CreditCard, title: 'Secure Payment', desc: 'Safe & Encrypted' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <motion.div
                  animate={floatAnimation}
                  transition={{ delay: i * 0.1 }}
                >
                  <item.icon className="text-brand-maroon dark:text-brand-gold mb-2 md:mb-3 group-hover:text-brand-gold dark:group-hover:text-white transition-colors" size={isMobile ? 24 : 32} />
                </motion.div>
                <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider dark:text-white">{item.title}</h4>
                <p className="text-[10px] md:text-xs text-brand-dark/50 dark:text-white/50 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Categories Grid - Mobile Optimized */}
        <section className="py-12 md:py-20 bg-brand-beige/30 dark:bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading 
              title="Curated Collections" 
              subtitle="Explore our handpicked selections for every mood and occasion." 
              highlight={true}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { name: 'Cotton Sarees', img: 'https://picsum.photos/seed/cat-cotton/400/500', count: '48 items' },
                { name: 'Silk Sarees', img: 'https://picsum.photos/seed/cat-silk/400/500', count: '36 items' },
                { name: 'Stitched Suits', img: 'https://picsum.photos/seed/cat-suits/400/500', count: '42 items' },
                { name: 'Wedding Collection', img: 'https://picsum.photos/seed/cat-wedding/400/500', count: '24 items' }
              ].map((cat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedCategory(cat.name as any)}
                >
                  <div className="aspect-[4/5] md:aspect-[3/4]">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 text-white">
                    <h3 className="text-sm md:text-xl font-serif mb-0.5 md:mb-1">{cat.name}</h3>
                    <p className="text-[10px] md:text-xs opacity-80 mb-1 md:mb-2">{cat.count}</p>
                    <motion.p 
                      whileHover={{ x: 5 }}
                      className="text-[8px] md:text-xs font-light flex items-center"
                    >
                      Explore <ChevronRight size={isMobile ? 10 : 14} className="ml-0.5" />
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid with Filters */}
        <section ref={productsRef} className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div className="w-full md:w-auto">
                <SectionHeading 
                  title="Our Masterpieces" 
                  subtitle="Each piece is a story of tradition and timeless beauty." 
                  align="left"
                />
              </div>
              
              {/* Filter and Sort Controls */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                {/* Category Filter - Horizontal Scroll on Mobile */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['All', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'New Arrivals'].map((cat, i) => (
                    <motion.button
                      key={cat}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={cn(
                        "px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all",
                        selectedCategory === cat 
                          ? "bg-gradient-to-r from-brand-maroon to-brand-gold text-white shadow-lg" 
                          : "bg-white dark:bg-gray-800 text-brand-maroon dark:text-brand-gold border border-brand-gold/20 hover:border-brand-gold"
                      )}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white dark:bg-gray-800 border border-brand-gold/20 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    <option value="popular">Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>

                  <div className="flex bg-white dark:bg-gray-800 rounded-full border border-brand-gold/20 overflow-hidden">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        "p-1.5 md:p-2",
                        viewMode === 'grid' ? 'bg-brand-gold text-brand-dark' : 'text-brand-dark/40 dark:text-white/40'
                      )}
                    >
                      <Grid2X2 size={isMobile ? 16 : 18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('list')}
                      className={cn(
                        "p-1.5 md:p-2",
                        viewMode === 'list' ? 'bg-brand-gold text-brand-dark' : 'text-brand-dark/40 dark:text-white/40'
                      )}
                    >
                      <Grid3X3 size={isMobile ? 16 : 18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid - Mobile Optimized with Double Column */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={cn(
                "grid gap-3 md:gap-6",
                viewMode === 'grid' 
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "grid-cols-1"
              )}
            >
              {isLoading ? (
                [...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gradient-to-r from-brand-gold/10 to-brand-maroon/10 rounded-2xl mb-3" />
                    <div className="h-3 bg-brand-gold/10 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-brand-gold/10 rounded w-1/2" />
                  </div>
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProducts.slice(0, isMobile ? 8 : 12).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                      isInWishlist={wishlist.includes(product.id)}
                      onQuickView={setQuickViewProduct}
                      viewMode={viewMode}
                    />
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
            
            {filteredAndSortedProducts.length > (isMobile ? 8 : 12) && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 md:mt-16 text-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(128,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-brand-maroon text-brand-maroon dark:border-brand-gold dark:text-brand-gold px-6 md:px-10 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-maroon hover:text-white dark:hover:bg-brand-gold dark:hover:text-brand-dark transition-all shadow-lg text-xs md:text-base"
                >
                  Load More Masterpieces
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
              <SectionHeading title="Recently Viewed" subtitle="Your style journey continues..." align="left" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {recentlyViewed.map((id, index) => {
                  const product = products.find(p => p.id === id);
                  if (!product) return null;
                  
                  return (
                    <motion.div 
                      key={id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 md:space-x-4 p-2 md:p-4 border border-brand-gold/10 rounded-xl md:rounded-2xl hover:border-brand-gold transition-colors cursor-pointer group"
                      onClick={() => {
                        setQuickViewProduct(product);
                        addToRecent(product.id);
                      }}
                    >
                      <div className="w-12 h-16 md:w-16 md:h-20 rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs md:text-sm font-serif truncate group-hover:text-brand-maroon dark:group-hover:text-brand-gold transition-colors">{product.name}</h4>
                        <p className="text-[10px] md:text-xs font-bold text-brand-maroon dark:text-brand-gold mt-1">₹{product.price}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Testimonials */}
        <section className="py-12 md:py-20 bg-brand-beige/30 dark:bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading title="Voices of Elegance" subtitle="What our beautiful customers say about us" highlight={true} />
            
            <div className="relative max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl"
                >
                  <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-3 border-brand-gold">
                      <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base md:text-xl text-brand-maroon dark:text-brand-gold">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-xs md:text-sm text-brand-dark/40 dark:text-white/40">{testimonials[currentTestimonial].location}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={isMobile ? 12 : 14} className={i < testimonials[currentTestimonial].rating ? "text-brand-gold fill-current" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-lg text-brand-dark/70 dark:text-white/70 italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Dots */}
              <div className="flex justify-center space-x-2 mt-4 md:mt-6">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setCurrentTestimonial(index)}
                    className={cn(
                      "h-1.5 md:h-2 rounded-full transition-all",
                      currentTestimonial === index ? "w-4 md:w-8 bg-brand-maroon dark:bg-brand-gold" : "w-1.5 md:w-2 bg-brand-gold/30"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Newsletter */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-brand-maroon to-brand-dark text-white overflow-hidden relative">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-brand-gold/10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32 blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-brand-gold/10 rounded-full -ml-24 md:-ml-32 -mb-24 md:-mb-32 blur-3xl"
          />
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <SectionHeading title="Join the Elite Circle" />
            <p className="text-brand-beige/80 mb-6 md:mb-10 -mt-4 md:-mt-8 italic text-sm md:text-lg px-4">
              Subscribe to receive exclusive early access to our limited edition collections and styling tips.
            </p>
            
            {!hasSubscribed ? (
              <motion.form 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={(e) => { e.preventDefault(); setHasSubscribed(true); confetti(); }}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto px-4"
              >
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 md:px-6 py-3 md:py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-gold text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-xl text-xs md:text-sm"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="bg-white/10 border border-white/20 p-6 md:p-8 rounded-2xl md:rounded-3xl mx-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <CheckCircle className="mx-auto text-brand-gold mb-4" size={isMobile ? 36 : 48} />
                </motion.div>
                <h4 className="text-xl md:text-2xl font-serif mb-2">Welcome to the Family!</h4>
                <p className="text-brand-beige/60 text-sm md:text-base">Check your inbox for a special welcome gift.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-b from-brand-dark to-[#2C1810] text-white pt-12 md:pt-20 pb-6 md:pb-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-2 lg:col-span-1"
            >
              <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-brand-gold to-white bg-clip-text text-transparent tracking-tighter mb-2"
              >
                RoziRoti
              </motion.h1>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold block mb-4 md:mb-6">By Ratna</span>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                Surat's premier destination for luxury ethnic wear. We blend traditional craftsmanship with contemporary designs to create masterpieces for the modern woman.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all"
                  >
                    <Icon size={isMobile ? 14 : 18} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-8 text-brand-gold">Collections</h4>
              <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-white/50">
                {['Cotton Sarees', 'Silk Sarees', 'Banarasi', 'Stitched Suits', 'Wedding'].map(item => (
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-8 text-brand-gold">Customer Care</h4>
              <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-white/50">
                {['Track Order', 'Shipping Policy', 'Return & Exchange', 'Size Guide', 'FAQs'].map(item => (
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-2 md:col-span-2 lg:col-span-1"
            >
              <h4 className="font-bold text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-8 text-brand-gold">Visit Us</h4>
              <ul className="space-y-3 md:space-y-6 text-xs md:text-sm text-white/50">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <MapPin className="mr-2 md:mr-3 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" size={isMobile ? 14 : 18} />
                  <span>123 Fashion Street, Textile Market, Surat, Gujarat 395003</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center group"
                >
                  <Phone className="mr-2 md:mr-3 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" size={isMobile ? 14 : 18} />
                  <span>+91 98765 43210</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center group"
                >
                  <Mail className="mr-2 md:mr-3 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" size={isMobile ? 14 : 18} />
                  <span>hello@roziroti.com</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 pt-6 md:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[8px] md:text-xs text-white/30 text-center md:text-left"
            >
              © {new Date().getFullYear()} RoziRoti by Ratna. All Rights Reserved. | Crafted with ❤️ in Surat
            </motion.p>
            <div className="flex space-x-4 md:space-x-6">
              {['Privacy', 'Terms', 'Sitemap'].map(item => (
                <motion.button 
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </footer>

        {/* Floating Elements */}
        <motion.div 
          animate={floatAnimation}
          className="fixed bottom-4 md:bottom-8 left-4 md:left-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg border border-brand-gold/20 z-40 flex items-center space-x-1.5 md:space-x-2"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full"
          />
          <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 dark:text-white/60">{visitorCount} Online</span>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          animate={pulseAnimation}
          className="fixed bottom-4 md:bottom-8 right-4 md:right-8 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-3 md:p-4 rounded-full shadow-2xl z-40"
        >
          <MessageCircle size={isMobile ? 20 : 24} />
        </motion.button>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl z-[70] p-5"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif text-brand-maroon dark:text-brand-gold">Menu</h2>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-brand-gold/10 rounded-full"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                <nav className="space-y-3">
                  {['New Arrivals', 'Cotton Sarees', 'Silk Sarees', 'Suits', 'Wedding', 'Best Sellers', 'Sale'].map((item, i) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setSelectedCategory(item as any);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left py-2.5 px-3 text-sm text-brand-dark dark:text-white hover:text-brand-maroon dark:hover:text-brand-gold hover:bg-brand-gold/5 rounded-xl transition-colors font-medium"
                    >
                      {item}
                    </motion.button>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-brand-gold/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-brand-dark/60 dark:text-white/60">Theme</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full bg-brand-gold/10"
                      >
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-dark/60 dark:text-white/60">Currency</span>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as any)}
                        className="text-sm bg-transparent border border-brand-gold/20 rounded-lg px-2 py-1"
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Enhanced Cart Drawer */}
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
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-brand-beige to-white dark:from-gray-900 dark:to-gray-800 shadow-2xl z-[70] flex flex-col"
              >
                <div className="p-4 md:p-6 border-b border-brand-gold/20 flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-serif text-brand-maroon dark:text-brand-gold">Your Bag</h3>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)} 
                    className="p-2 hover:bg-brand-gold/10 rounded-full"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <motion.div
                        animate={floatAnimation}
                      >
                        <ShoppingBag size={48} className="text-brand-dark/10 dark:text-white/10 mb-4" />
                      </motion.div>
                      <p className="text-brand-dark/60 dark:text-white/60 italic text-sm">Your bag is empty</p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 text-brand-maroon dark:text-brand-gold font-bold uppercase tracking-widest border-b-2 border-brand-maroon dark:border-brand-gold text-xs"
                      >
                        Start Shopping
                      </motion.button>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm"
                      >
                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm dark:text-white truncate">{item.name}</h4>
                          <p className="text-[10px] text-brand-dark/40 dark:text-white/40 mt-1">{item.category}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-brand-gold/20 rounded-lg overflow-hidden">
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)} 
                                className="p-1 hover:bg-brand-gold/10"
                              >
                                <Minus size={12} />
                              </motion.button>
                              <span className="px-2 text-xs font-bold dark:text-white">{item.quantity}</span>
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)} 
                                className="p-1 hover:bg-brand-gold/10"
                              >
                                <Plus size={12} />
                              </motion.button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-brand-maroon dark:text-brand-gold text-sm">₹{item.price * item.quantity}</p>
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)} 
                                className="text-[8px] text-red-500 uppercase font-bold mt-1"
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
                  <div className="p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-brand-gold/20 space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-brand-dark/60 dark:text-white/60">Subtotal</span>
                        <span className="font-bold dark:text-white">₹{cartOriginalTotal}</span>
                      </div>
                      <div className="flex justify-between text-xs text-green-600">
                        <span>Discount</span>
                        <span>-₹{cartSavings}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-brand-dark/60 dark:text-white/60">Shipping</span>
                        <span className="text-green-600 font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-serif pt-2 border-t border-brand-gold/10">
                        <span className="text-brand-maroon dark:text-brand-gold">Total</span>
                        <span className="text-brand-maroon dark:text-brand-gold">₹{cartTotal}</span>
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-brand-maroon to-brand-gold text-white py-3 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all text-xs"
                    >
                      Checkout
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Quick View Modal */}
        <AnimatePresence>
          {quickViewProduct && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setQuickViewProduct(null)}
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              >
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <ImageSlider images={[
                    quickViewProduct.image,
                    quickViewProduct.image.replace('600/800', '601/801'),
                    quickViewProduct.image.replace('600/800', '602/802')
                  ]} interval={2000} />
                </div>
                
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Badge variant="gold">{quickViewProduct.category}</Badge>
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-serif text-brand-maroon dark:text-brand-gold mt-3 mb-2"
                  >
                    {quickViewProduct.name}
                  </motion.h3>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-3 mb-4"
                  >
                    <span className="text-xl md:text-2xl font-bold text-brand-maroon dark:text-brand-gold">₹{quickViewProduct.price}</span>
                    <span className="text-brand-dark/40 dark:text-white/40 line-through text-sm">₹{quickViewProduct.originalPrice}</span>
                    <Badge variant="outline">Save ₹{quickViewProduct.originalPrice - quickViewProduct.price}</Badge>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-brand-dark/60 dark:text-white/60 text-sm mb-6 leading-relaxed"
                  >
                    {quickViewProduct.description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 gap-3 mb-6"
                  >
                    <div className="bg-brand-beige/50 dark:bg-gray-800 p-3 rounded-xl">
                      <p className="text-[8px] uppercase font-bold text-brand-dark/40 dark:text-white/40">Fabric</p>
                      <p className="text-xs font-bold dark:text-white">{quickViewProduct.fabric}</p>
                    </div>
                    <div className="bg-brand-beige/50 dark:bg-gray-800 p-3 rounded-xl">
                      <p className="text-[8px] uppercase font-bold text-brand-dark/40 dark:text-white/40">Care</p>
                      <p className="text-xs font-bold dark:text-white">Dry Clean Only</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex space-x-3"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                      className="flex-1 bg-gradient-to-r from-brand-maroon to-brand-gold text-white py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg text-xs"
                    >
                      Add to Bag
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className="p-3 rounded-xl border border-brand-gold/20 text-brand-maroon dark:text-brand-gold hover:bg-brand-gold/10 transition-colors"
                    >
                      <Heart size={20} fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"} />
                    </motion.button>
                  </motion.div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuickViewProduct(null)} 
                  className="absolute top-4 right-4 text-brand-dark/40 hover:text-brand-maroon dark:hover:text-brand-gold"
                >
                  <X size={20} />
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Admin Login Modal */}
        <AnimatePresence>
          {showAdminLogin && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAdminLogin(false)}
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-brand-beige dark:bg-gray-900 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full border border-brand-gold/30"
              >
                <h3 className="text-2xl md:text-3xl font-serif text-brand-maroon dark:text-brand-gold text-center mb-2">Admin Access</h3>
                <p className="text-center text-brand-dark/60 dark:text-white/60 text-xs md:text-sm mb-6 md:mb-8 italic">Restricted area for authorized personnel only.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-brand-dark/60 dark:text-white/60 mb-2">Access Key</label>
                    <input 
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white dark:bg-gray-800 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-maroon dark:focus:ring-brand-gold text-sm dark:text-white"
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdminLogin}
                    className="w-full bg-gradient-to-r from-brand-maroon to-brand-gold text-white py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest text-sm"
                  >
                    Authenticate
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAdminLogin(false)}
                    className="w-full text-brand-dark/40 dark:text-white/40 text-[10px] md:text-xs uppercase font-bold tracking-widest"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSpinWheel(false)}
                className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl text-center border-4 border-brand-gold mx-4"
              >
                <div className="mb-6">
                  <Badge variant="gold" animate>Feeling Lucky?</Badge>
                  <h3 className="text-2xl md:text-3xl font-serif text-brand-maroon dark:text-brand-gold mt-3">Spin to Win!</h3>
                  <p className="text-brand-dark/60 dark:text-white/60 text-sm mt-2">Win exclusive discounts up to 50% OFF</p>
                </div>
                
                <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8">
                  <motion.div 
                    animate={{ rotate: 360 * 5 }}
                    transition={{ duration: 4, ease: "circOut" }}
                    className="w-full h-full rounded-full border-8 border-brand-gold relative overflow-hidden"
                    style={{ background: 'conic-gradient(#800000 0deg 60deg, #D4AF37 60deg 120deg, #800000 120deg 180deg, #D4AF37 180deg 240deg, #800000 240deg 300deg, #D4AF37 300deg 360deg)' }}
                  >
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                      <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${deg + 30}deg) translateY(-60px)` }}>
                        <span className="text-white font-bold text-[10px] md:text-xs">{(i + 1) * 10}%</span>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div 
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-3 h-6 bg-brand-dark rounded-full z-10"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { 
                    confetti(); 
                    alert('Congratulations! You won 20% OFF. Use Code: LUCKY20');
                    setShowSpinWheel(false);
                  }}
                  className="w-full bg-gradient-to-r from-brand-maroon to-brand-gold text-white py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg text-sm"
                >
                  Spin Now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSpinWheel(false)} 
                  className="mt-3 text-brand-dark/40 dark:text-white/40 text-[10px] md:text-xs uppercase font-bold tracking-widest"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExitIntent(false)}
                className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col md:flex-row mx-4"
              >
                <div className="md:w-1/2 h-48 md:h-auto bg-brand-maroon relative overflow-hidden">
                  <motion.img 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    src="https://picsum.photos/seed/exit-intent/600/800" 
                    alt="Special Offer" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
                    <Badge variant="gold" animate>Wait! Don't Go</Badge>
                    <motion.h3 
                      animate={pulseAnimation}
                      className="text-3xl md:text-4xl font-serif mt-3"
                    >
                      15% OFF
                    </motion.h3>
                    <p className="mt-1 text-xs md:text-sm font-light italic">Your first purchase</p>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h4 className="text-xl md:text-2xl font-serif text-brand-maroon dark:text-brand-gold mb-3">Unlock Your Discount</h4>
                  <p className="text-brand-dark/60 dark:text-white/60 text-xs md:text-sm mb-6">Join our inner circle and get instant access to Surat's most coveted ethnic designs.</p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-maroon dark:focus:ring-brand-gold text-sm dark:bg-gray-800 dark:text-white"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setShowExitIntent(false); confetti(); }}
                      className="w-full bg-gradient-to-r from-brand-maroon to-brand-gold text-white py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg text-sm"
                    >
                      Claim My Discount
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowExitIntent(false)}
                      className="w-full text-brand-dark/30 dark:text-white/30 text-[8px] md:text-[10px] uppercase font-bold tracking-widest"
                    >
                      No thanks, I prefer paying full price
                    </motion.button>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowExitIntent(false)} 
                  className="absolute top-3 right-3 text-brand-dark/40 hover:text-brand-maroon dark:hover:text-brand-gold"
                >
                  <X size={20} />
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );

  const renderAdminPanel = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        className="w-64 bg-gradient-to-b from-brand-dark to-[#2C1810] text-white flex flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-serif font-bold text-brand-gold tracking-tighter">RoziRoti</h1>
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: Package, label: 'Products' },
            { icon: ShoppingBag, label: 'Orders' },
            { icon: Users, label: 'Customers' },
            { icon: TrendingUp, label: 'Analytics' },
            { icon: Bell, label: 'Notifications' }
          ].map((item, i) => (
            <motion.button 
              key={i}
              whileHover={{ x: 5 }}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                i === 0 ? "bg-brand-gold text-brand-dark" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <motion.button 
            whileHover={{ x: 5 }}
            onClick={() => setIsAdmin(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Exit Admin</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-10"
        >
          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={18} className="text-slate-400 dark:text-white/60" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 dark:border-gray-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800 dark:text-white">Ratna Devi</p>
                <p className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold">Super Admin</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-bold text-sm">RD</div>
            </div>
          </div>
        </motion.header>

        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { label: 'Total Revenue', value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Active Products', value: products.length, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              { label: 'Total Customers', value: '1,284', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={cn("p-2 md:p-3 rounded-xl", stat.bg)}>
                    <stat.icon className={stat.color} size={isMobile ? 18 : 20} />
                  </div>
                  <span className="text-[8px] md:text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg">+12.5%</span>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">{stat.label}</p>
                <h3 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm"
            >
              <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-4">Revenue Performance</h3>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { name: 'Mon', rev: 4000 }, { name: 'Tue', rev: 3000 }, { name: 'Wed', rev: 5000 },
                    { name: 'Thu', rev: 2780 }, { name: 'Fri', rev: 1890 }, { name: 'Sat', rev: 2390 }, { name: 'Sun', rev: 3490 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="rev" stroke="#800000" strokeWidth={2} dot={{ r: 3, fill: '#800000' }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm"
            >
              <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-4">Category Distribution</h3>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Cotton Sarees', value: 400 },
                        { name: 'Silk Sarees', value: 300 },
                        { name: 'Suits', value: 300 },
                        { name: 'Wedding', value: 200 }
                      ]}
                      innerRadius={isMobile ? 40 : 60}
                      outerRadius={isMobile ? 70 : 100}
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="p-4 md:p-6 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white">Recent Transactions</h3>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-brand-maroon dark:text-brand-gold text-xs md:text-sm font-bold hover:underline"
              >
                View All
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-[8px] md:text-[10px] uppercase font-bold text-slate-400">Order ID</th>
                    <th className="px-4 md:px-6 py-3 text-[8px] md:text-[10px] uppercase font-bold text-slate-400">Customer</th>
                    <th className="px-4 md:px-6 py-3 text-[8px] md:text-[10px] uppercase font-bold text-slate-400">Date</th>
                    <th className="px-4 md:px-6 py-3 text-[8px] md:text-[10px] uppercase font-bold text-slate-400">Total</th>
                    <th className="px-4 md:px-6 py-3 text-[8px] md:text-[10px] uppercase font-bold text-slate-400">Status</th>
                    <th className="px-4 md:px-6 py-3 text-[8px] md:text-[10px] uppercase font-bold text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
                  {orders.slice(0, 5).map((order) => (
                    <motion.tr 
                      key={order.id} 
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="transition-colors dark:hover:bg-gray-700"
                    >
                      <td className="px-4 md:px-6 py-3 font-bold text-slate-800 dark:text-white text-xs md:text-sm">{order.id}</td>
                      <td className="px-4 md:px-6 py-3">
                        <p className="font-medium text-slate-800 dark:text-white text-xs md:text-sm">{order.customer.name}</p>
                        <p className="text-[8px] md:text-xs text-slate-400">{order.customer.email}</p>
                      </td>
                      <td className="px-4 md:px-6 py-3 text-slate-500 dark:text-white/60 text-xs md:text-sm">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 md:px-6 py-3 font-bold text-slate-800 dark:text-white text-xs md:text-sm">₹{order.total}</td>
                      <td className="px-4 md:px-6 py-3">
                        <span className="px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3">
                        <div className="flex space-x-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-slate-400 hover:text-brand-maroon dark:hover:text-brand-gold transition-colors"
                          >
                            <Eye size={isMobile ? 14 : 16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit size={isMobile ? 14 : 16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 md:px-6 py-8 text-center text-slate-400 dark:text-white/40 italic text-sm">No transactions found yet.</td>
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
