import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { Badge } from './Badge';
import { cn } from '../utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onView: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onView, onToggleWishlist, isWishlisted }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-gold/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isBestSeller && <Badge variant="gold">Bestseller</Badge>}
          {product.isTrending && <Badge variant="maroon">Trending</Badge>}
          {discount > 0 && <Badge variant="outline" className="bg-white/90">-{discount}% Off</Badge>}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => onToggleWishlist(product.id)}
          className={cn(
            "absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300",
            isWishlisted ? "bg-brand-maroon text-white" : "bg-white/80 text-brand-maroon hover:bg-brand-maroon hover:text-white"
          )}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={() => onView(product)}
            className="p-4 bg-white text-brand-maroon rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-4 bg-brand-maroon text-white rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
          >
            <ShoppingBag size={20} />
          </button>
        </div>

        {/* Scarcity Indicator */}
        {product.stock < 5 && (
          <div className="absolute bottom-0 left-0 right-0 bg-brand-maroon/90 text-white text-[10px] py-1 text-center font-bold uppercase tracking-widest">
            Only {product.stock} left in stock!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">{product.subCategory}</span>
          <div className="flex items-center text-brand-gold">
            <Star size={12} className="fill-brand-gold mr-1" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-serif text-brand-dark mb-3 line-clamp-1 group-hover:text-brand-maroon transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-brand-maroon">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-brand-dark/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full mt-6 py-3 rounded-xl border border-brand-maroon text-brand-maroon font-bold uppercase text-xs tracking-widest hover:bg-brand-maroon hover:text-white transition-all duration-300"
        >
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
};
