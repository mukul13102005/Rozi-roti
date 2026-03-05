import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
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
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-brand-gold/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-brand-maroon text-white rounded-2xl">
                <Ruler size={24} />
              </div>
              <h2 className="text-2xl font-serif text-brand-maroon">Size & Fit Guide</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors">
              <X size={24} className="text-brand-dark/40" />
            </button>
          </div>

          <div className="p-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-maroon/5">
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-brand-maroon border-b border-brand-maroon/10">Size (Standard)</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-brand-maroon border-b border-brand-maroon/10">Bust (Inches)</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-brand-maroon border-b border-brand-maroon/10">Waist (Inches)</th>
                  <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-brand-maroon border-b border-brand-maroon/10">Hip (Inches)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'XS', bust: '32', waist: '26', hip: '35' },
                  { size: 'S', bust: '34', waist: '28', hip: '37' },
                  { size: 'M', bust: '36', waist: '30', hip: '39' },
                  { size: 'L', bust: '38', waist: '32', hip: '41' },
                  { size: 'XL', bust: '40', waist: '34', hip: '43' },
                  { size: 'XXL', bust: '42', waist: '36', hip: '45' },
                ].map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-gold/5'}>
                    <td className="p-4 text-sm font-bold border-b border-brand-gold/10">{row.size}</td>
                    <td className="p-4 text-sm text-brand-dark/60 border-b border-brand-gold/10">{row.bust}"</td>
                    <td className="p-4 text-sm text-brand-dark/60 border-b border-brand-gold/10">{row.waist}"</td>
                    <td className="p-4 text-sm text-brand-dark/60 border-b border-brand-gold/10">{row.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 p-6 bg-brand-beige rounded-2xl border border-brand-gold/20">
              <h4 className="font-bold text-brand-maroon mb-2 flex items-center">
                <Info size={16} className="mr-2" /> How to Measure?
              </h4>
              <ul className="text-sm text-brand-dark/60 space-y-2 list-disc pl-5">
                <li><strong>Bust:</strong> Measure around the fullest part of your chest.</li>
                <li><strong>Waist:</strong> Measure around your natural waistline.</li>
                <li><strong>Hips:</strong> Measure around the fullest part of your hips.</li>
                <li><strong>Saree Length:</strong> Standard length is 5.5 meters plus 0.8 meters blouse piece.</li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-brand-gold/5 border-t border-brand-gold/10 text-center">
            <p className="text-xs text-brand-dark/40 italic">
              *Sizes may vary slightly by fabric type and design. For custom stitching, please contact our support.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Info = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
