import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { Badge } from './Badge';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, onClose, onAddToCart, onBuyNow, onToggleWishlist, isWishlisted 
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[40px] overflow-hidden max-w-5xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-dark hover:bg-brand-maroon hover:text-white transition-all"
            >
              <X size={24} />
            </button>

            {/* Image Gallery */}
            <div className="md:w-1/2 relative bg-brand-beige/20">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {product.isBestSeller && <Badge variant="gold">Bestseller</Badge>}
                {product.isTrending && <Badge variant="maroon">Trending Now</Badge>}
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest">{product.reviews} Reviews</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif text-brand-maroon mb-4">{product.name}</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-6">{product.subCategory} • {product.fabric}</p>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-bold text-brand-dark">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-brand-dark/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                </div>

                <p className="text-brand-dark/60 leading-relaxed mb-8 italic">
                  "{product.description}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <div className="p-4 bg-brand-beige/20 rounded-2xl border border-brand-gold/10">
                    <p className="text-[10px] uppercase font-bold text-brand-gold mb-1">Fabric</p>
                    <p className="text-sm font-medium">{product.fabric}</p>
                  </div>
                  <div className="p-4 bg-brand-beige/20 rounded-2xl border border-brand-gold/10">
                    <p className="text-[10px] uppercase font-bold text-brand-gold mb-1">Availability</p>
                    <p className="text-sm font-medium text-emerald-600">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="w-full gold-shimmer text-brand-dark py-4 rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group active:scale-95"
                  >
                    Buy Now
                  </button>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="flex-1 maroon-gradient text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group active:scale-95"
                    >
                      <ShoppingBag size={20} className="mr-2 group-hover:scale-110 transition-transform" /> Add to Bag
                    </button>
                    <button 
                      onClick={() => onToggleWishlist(product.id)}
                      className={`p-4 rounded-2xl border-2 transition-all active:scale-95 ${isWishlisted ? 'bg-brand-maroon border-brand-maroon text-white' : 'border-brand-beige text-brand-maroon hover:border-brand-maroon'}`}
                    >
                      <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-gold/10">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Truck size={20} className="text-brand-gold" />
                  <span className="text-[8px] uppercase font-bold tracking-widest text-brand-dark/40">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <RotateCcw size={20} className="text-brand-gold" />
                  <span className="text-[8px] uppercase font-bold tracking-widest text-brand-dark/40">7 Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <ShieldCheck size={20} className="text-brand-gold" />
                  <span className="text-[8px] uppercase font-bold tracking-widest text-brand-dark/40">Secure Payment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
