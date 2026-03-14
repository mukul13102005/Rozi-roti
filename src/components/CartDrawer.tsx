import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-gold/10 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-brand-maroon" />
                <h2 className="text-xl font-serif text-brand-maroon">Your Bag ({items.length})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-beige/30 rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-brand-gold/40" />
                  </div>
                  <p className="text-brand-dark/40 font-medium italic">Your bag is as light as air...</p>
                  <button 
                    onClick={onClose}
                    className="text-brand-maroon font-bold uppercase text-xs tracking-widest hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex space-x-4 group">
                    <div className="w-24 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-brand-dark line-clamp-1">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-brand-dark/20 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mt-1">{item.subCategory}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-brand-gold/20 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-brand-beige transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-brand-beige transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-brand-maroon">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-brand-beige/20 border-t border-brand-gold/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-brand-dark/60">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-brand-dark/60">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold uppercase text-[10px]">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-brand-maroon pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={onCheckout}
                    className="w-full maroon-gradient text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group"
                  >
                    Checkout Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center justify-center space-x-2 text-[10px] text-brand-dark/40 uppercase font-bold tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Secure Checkout Guaranteed</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
