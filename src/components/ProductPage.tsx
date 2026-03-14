import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, ShoppingBag, Heart, Share2, ShieldCheck, 
  Truck, RotateCcw, ChevronRight, Minus, Plus,
  MessageCircle, Facebook, Twitter, Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { Badge } from './Badge';
import { RecommendationSystem } from './RecommendationSystem';

interface ProductPageProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onShare: () => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  onBack: () => void;
  allProducts: Product[];
  onViewProduct: (p: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ 
  product, onAddToCart, onBuyNow, onShare, onToggleWishlist, isWishlisted, onBack, allProducts, onViewProduct 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-dark/40">
        <button onClick={onBack} className="hover:text-brand-maroon transition-colors">Home</button>
        <ChevronRight size={12} />
        <span className="hover:text-brand-maroon cursor-pointer">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-brand-maroon font-bold">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[3/4] rounded-[40px] overflow-hidden bg-brand-beige/20 border border-brand-gold/10 relative group"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isBestSeller && <Badge variant="gold">Bestseller</Badge>}
                {discount > 0 && <Badge variant="maroon">-{discount}% OFF</Badge>}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-brand-beige/20 border border-brand-gold/5 cursor-pointer hover:border-brand-maroon transition-all">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-50 hover:opacity-100" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-brand-gold">{product.subCategory}</span>
                <div className="flex items-center space-x-4">
                  <button onClick={() => onToggleWishlist(product.id)} className={`p-2 rounded-full transition-all ${isWishlisted ? 'bg-brand-maroon text-white' : 'bg-brand-beige/50 text-brand-maroon hover:bg-brand-maroon hover:text-white'}`}>
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={onShare}
                    className="p-2 rounded-full bg-brand-beige/50 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-brand-dark">{product.rating}</span>
                </div>
                <span className="text-brand-dark/20">|</span>
                <span className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold">124 Reviews</span>
              </div>

              <div className="flex items-baseline space-x-4 mb-8">
                <span className="text-4xl font-bold text-brand-maroon">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-brand-dark/30 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-brand-dark/60 leading-relaxed mb-8">
                Experience the heritage of Surat with this exquisite {product.name}. Handcrafted with precision and passion, this piece embodies the timeless elegance of Indian ethnic wear. Perfect for weddings, festivals, and special celebrations.
              </p>
            </div>

            {/* Selection Controls */}
            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40 mb-4">Select Quantity</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-brand-gold/20 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-brand-beige/30 transition-colors"><Minus size={16} /></button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-brand-beige/30 transition-colors"><Plus size={16} /></button>
                  </div>
                  {product.stock < 10 && (
                    <span className="text-xs font-bold text-brand-maroon animate-pulse">Only {product.stock} left!</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => onBuyNow(product)}
                  className="w-full gold-shimmer text-brand-dark py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 hover:shadow-brand-gold/20 transition-all active:scale-95"
                >
                  <Sparkles size={20} />
                  <span>Buy It Now</span>
                </button>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="flex-[2] maroon-gradient text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 hover:shadow-brand-maroon/20 transition-all active:scale-95"
                  >
                    <ShoppingBag size={20} />
                    <span>Add to Shopping Bag</span>
                  </button>
                  <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className={`flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all active:scale-95 border-2 ${
                      isWishlisted 
                        ? 'bg-brand-maroon text-white border-brand-maroon shadow-lg' 
                        : 'bg-white text-brand-maroon border-brand-maroon hover:bg-brand-maroon/5'
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-brand-gold/10">
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck size={20} className="text-brand-gold" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/60">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <RotateCcw size={20} className="text-brand-gold" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/60">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheck size={20} className="text-brand-gold" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/60">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
          <div className="flex border-b border-brand-gold/10 mb-12">
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-brand-maroon' : 'text-brand-dark/40 hover:text-brand-dark'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-maroon" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-brand-dark/60 leading-relaxed">
                <p>This {product.name} is a masterpiece of Surat's textile industry. Woven with high-quality silk threads and adorned with intricate zari work, it represents the pinnacle of ethnic luxury.</p>
                <p>The fabric is lightweight yet durable, ensuring you stay comfortable throughout long wedding ceremonies or festive events. The vibrant colors are achieved using eco-friendly dyes that maintain their brilliance for years.</p>
              </motion.div>
            )}
            {activeTab === 'details' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40 mb-1">Fabric</h5>
                    <p className="text-sm font-serif text-brand-dark">Pure Surat Silk / Banarasi Blend</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40 mb-1">Work Type</h5>
                    <p className="text-sm font-serif text-brand-dark">Intricate Zari & Resham Embroidery</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40 mb-1">Occasion</h5>
                    <p className="text-sm font-serif text-brand-dark">Wedding, Festive, Party Wear</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40 mb-1">Care</h5>
                    <p className="text-sm font-serif text-brand-dark">Dry Clean Only</p>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-serif text-brand-dark">Customer Reviews (124)</h4>
                  <button className="text-xs font-bold uppercase tracking-widest text-brand-maroon hover:underline">Write a Review</button>
                </div>
                {/* Sample Review */}
                <div className="p-8 bg-brand-beige/10 rounded-3xl border border-brand-gold/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-brand-maroon text-white rounded-full flex items-center justify-center font-bold">P</div>
                      <div>
                        <h5 className="text-sm font-bold">Priya S.</h5>
                        <p className="text-[10px] text-brand-dark/40 uppercase tracking-widest">Verified Buyer</p>
                      </div>
                    </div>
                    <div className="flex text-brand-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-sm text-brand-dark/60 italic">"Absolutely stunning! The quality is even better than expected. The delivery was fast and the packaging was so premium. Will definitely buy more!"</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RecommendationSystem 
        products={allProducts}
        currentProductId={product.id}
        onAddToCart={onAddToCart}
        onView={onViewProduct}
        onToggleWishlist={onToggleWishlist}
        wishlist={[]}
      />
    </div>
  );
};
