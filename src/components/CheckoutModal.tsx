import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  setStep: (step: number) => void;
  shippingDetails: any;
  setShippingDetails: (details: any) => void;
  onConfirm: () => void;
  cartTotal: number;
}

export const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  step, 
  setStep, 
  shippingDetails, 
  setShippingDetails, 
  onConfirm,
  cartTotal
}: CheckoutModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-brand-beige rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-brand-gold/10 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-2xl font-serif text-brand-maroon">Secure Checkout</h2>
              <p className="text-xs text-brand-dark/40 uppercase tracking-widest mt-1">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors">
              <X size={24} className="text-brand-dark/40" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-brand-gold/10 w-full">
            <motion.div 
              className="h-full bg-brand-maroon"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-brand-maroon text-white rounded-2xl">
                    <Truck size={24} />
                  </div>
                  <h3 className="text-xl font-serif text-brand-dark">Shipping Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">Full Name</label>
                    <input 
                      type="text" 
                      value={shippingDetails.name}
                      onChange={(e) => setShippingDetails({...shippingDetails, name: e.target.value})}
                      className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-maroon transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">Email Address</label>
                    <input 
                      type="email" 
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                      className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-maroon transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">Shipping Address</label>
                    <textarea 
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                      className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-maroon transition-colors h-24 resize-none"
                      placeholder="Enter your full address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">Phone Number</label>
                    <input 
                      type="text" 
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                      className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-maroon transition-colors"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">Pincode</label>
                    <input 
                      type="text" 
                      value={shippingDetails.pincode}
                      onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value})}
                      className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-maroon transition-colors"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-brand-maroon text-white rounded-2xl">
                    <CreditCard size={24} />
                  </div>
                  <h3 className="text-xl font-serif text-brand-dark">Payment Method</h3>
                </div>

                <div className="space-y-4">
                  {['Cash on Delivery', 'UPI / QR Code', 'Credit / Debit Card'].map((method) => (
                    <label key={method} className="flex items-center p-4 bg-white border border-brand-gold/20 rounded-2xl cursor-pointer hover:border-brand-maroon transition-colors group">
                      <input type="radio" name="payment" className="w-4 h-4 text-brand-maroon focus:ring-brand-maroon" defaultChecked={method === 'Cash on Delivery'} />
                      <span className="ml-4 font-bold text-brand-dark group-hover:text-brand-maroon transition-colors">{method}</span>
                    </label>
                  ))}
                </div>

                <div className="p-6 bg-brand-maroon/5 rounded-2xl border border-brand-maroon/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-brand-dark/60">Subtotal</span>
                    <span className="font-bold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-brand-dark/60">Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
                  </div>
                  <div className="h-px bg-brand-maroon/10 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-serif text-brand-maroon">Total Payable</span>
                    <span className="text-2xl font-bold text-brand-maroon">₹{cartTotal}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-serif text-brand-dark">Review Your Order</h3>
                <p className="text-brand-dark/60 max-w-md mx-auto">
                  Please review your shipping and payment details before confirming your order.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-left mt-8">
                  <div className="p-4 bg-white rounded-2xl border border-brand-gold/10">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 mb-2">Shipping To</p>
                    <p className="text-sm font-bold">{shippingDetails.name}</p>
                    <p className="text-xs text-brand-dark/60 mt-1">{shippingDetails.address}</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-brand-gold/10">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 mb-2">Payment</p>
                    <p className="text-sm font-bold">Cash on Delivery</p>
                    <p className="text-xs text-brand-dark/60 mt-1">Pay when you receive</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 bg-white border-t border-brand-gold/10 flex items-center justify-between">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="flex items-center text-brand-dark/40 hover:text-brand-maroon font-bold uppercase tracking-widest text-xs transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" /> Back
              </button>
            ) : <div />}

            <button 
              onClick={() => step === 3 ? onConfirm() : setStep(step + 1)}
              className="maroon-gradient text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center hover:shadow-xl transition-all"
            >
              {step === 3 ? 'Confirm Order' : 'Continue'} <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
