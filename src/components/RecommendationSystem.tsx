import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface RecommendationSystemProps {
  products: Product[];
  currentProductId?: string;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onView: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}

export const RecommendationSystem: React.FC<RecommendationSystemProps> = ({
  products,
  currentProductId,
  onAddToCart,
  onBuyNow,
  onView,
  onToggleWishlist,
  wishlist
}) => {
  // Simple logic: Get 3 random products excluding the current one
  const recommendations = React.useMemo(() => {
    return products
      .filter(p => p.id !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [products, currentProductId]);

  return (
    <section className="py-20 bg-brand-beige/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-brand-maroon mb-2">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Personalized For You</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">Handpicked Recommendations</h2>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-brand-gold">
            <Star size={20} fill="currentColor" />
            <span className="text-sm font-bold">Top Rated</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onView={onView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
