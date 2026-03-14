import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const SizeGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-[32px] p-8 max-w-2xl w-full shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif text-brand-maroon">Size & Fit Guide</h3>
            <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors"><X size={24} /></button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-beige/30">
                  <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Size</th>
                  <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Bust (in)</th>
                  <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Waist (in)</th>
                  <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">Hip (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/10">
                {[
                  { s: 'XS', b: '32', w: '26', h: '35' },
                  { s: 'S', b: '34', w: '28', h: '37' },
                  { s: 'M', b: '36', w: '30', h: '39' },
                  { s: 'L', b: '38', w: '32', h: '41' },
                  { s: 'XL', b: '40', w: '34', h: '43' },
                  { s: 'XXL', b: '42', w: '36', h: '45' },
                ].map(row => (
                  <tr key={row.s} className="hover:bg-brand-beige/10 transition-colors">
                    <td className="p-4 font-bold text-brand-maroon">{row.s}</td>
                    <td className="p-4 text-brand-dark/60">{row.b}</td>
                    <td className="p-4 text-brand-dark/60">{row.w}</td>
                    <td className="p-4 text-brand-dark/60">{row.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-6 bg-brand-beige/20 rounded-2xl border border-brand-gold/10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">How to measure?</h4>
            <p className="text-sm text-brand-dark/60 leading-relaxed">
              Measure around the fullest part of your bust, the narrowest part of your waist, and the fullest part of your hips. Keep the tape comfortably loose.
            </p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
