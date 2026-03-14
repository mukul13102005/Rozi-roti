import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  total: number;
  onComplete: (details: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, total, onComplete }) => {
  const [step, setStep] = React.useState(1);
  const [details, setDetails] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'UPI'
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(details);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[32px] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Side: Summary */}
            <div className="md:w-1/3 bg-brand-beige/30 p-8 border-r border-brand-gold/10 overflow-y-auto">
              <h3 className="text-xl font-serif text-brand-maroon mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-brand-dark line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-brand-dark/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-brand-maroon mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-gold/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-brand-dark/60">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-brand-dark/60">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-brand-maroon pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <div className="flex space-x-2">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`h-1 w-8 rounded-full transition-colors ${step >= s ? 'bg-brand-gold' : 'bg-brand-beige'}`} />
                  ))}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h4 className="text-2xl font-serif text-brand-maroon mb-8">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Full Name</label>
                        <input required type="text" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} className="w-full border-b border-brand-gold/20 py-2 focus:outline-none focus:border-brand-maroon transition-colors" placeholder="Ratna Devi" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Email Address</label>
                        <input required type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} className="w-full border-b border-brand-gold/20 py-2 focus:outline-none focus:border-brand-maroon transition-colors" placeholder="ratna@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Phone Number</label>
                        <input required type="tel" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} className="w-full border-b border-brand-gold/20 py-2 focus:outline-none focus:border-brand-maroon transition-colors" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <button type="button" onClick={handleNext} className="mt-12 w-full maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center group">
                      Continue to Shipping <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h4 className="text-2xl font-serif text-brand-maroon mb-8">Shipping Details</h4>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Address</label>
                        <textarea required value={details.address} onChange={e => setDetails({...details, address: e.target.value})} className="w-full border border-brand-gold/20 rounded-xl p-4 focus:outline-none focus:border-brand-maroon transition-colors" placeholder="House No, Street, Area" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">City</label>
                          <input required type="text" value={details.city} onChange={e => setDetails({...details, city: e.target.value})} className="w-full border-b border-brand-gold/20 py-2 focus:outline-none focus:border-brand-maroon transition-colors" placeholder="Surat" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Pincode</label>
                          <input required type="text" value={details.pincode} onChange={e => setDetails({...details, pincode: e.target.value})} className="w-full border-b border-brand-gold/20 py-2 focus:outline-none focus:border-brand-maroon transition-colors" placeholder="395001" />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-12">
                      <button type="button" onClick={handlePrev} className="flex-1 border border-brand-gold/20 py-4 rounded-xl font-bold uppercase tracking-widest text-brand-dark/40 flex items-center justify-center group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                      </button>
                      <button type="button" onClick={handleNext} className="flex-[2] maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center group">
                        Continue to Payment <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h4 className="text-2xl font-serif text-brand-maroon mb-8">Payment Method</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'UPI', label: 'UPI / Google Pay', icon: '📱' },
                        { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
                        { id: 'COD', label: 'Cash on Delivery', icon: '💵' }
                      ].map(method => (
                        <button 
                          key={method.id}
                          type="button"
                          onClick={() => setDetails({...details, paymentMethod: method.id})}
                          className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${details.paymentMethod === method.id ? 'border-brand-maroon bg-brand-maroon/5' : 'border-brand-beige hover:border-brand-gold/20'}`}
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{method.icon}</span>
                            <span className="font-bold text-brand-dark">{method.label}</span>
                          </div>
                          {details.paymentMethod === method.id && <CheckCircle className="text-brand-maroon" size={20} />}
                        </button>
                      ))}
                    </div>
                    <div className="flex space-x-4 mt-12">
                      <button type="button" onClick={handlePrev} className="flex-1 border border-brand-gold/20 py-4 rounded-xl font-bold uppercase tracking-widest text-brand-dark/40 flex items-center justify-center group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                      </button>
                      <button type="submit" className="flex-[2] gold-shimmer text-brand-dark py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center shadow-lg">
                        Complete Purchase <CheckCircle size={18} className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
