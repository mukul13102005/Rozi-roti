import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
}

export const ToastContainer = ({ toasts }: ToastProps) => {
  return (
    <div className="fixed bottom-24 right-8 z-[300] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="pointer-events-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-brand-gold/10 p-4 flex items-center space-x-4 min-w-[300px]">
              <div className={`p-2 rounded-full ${
                toast.type === 'success' ? 'bg-green-100 text-green-600' :
                toast.type === 'error' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {toast.type === 'success' && <CheckCircle size={20} />}
                {toast.type === 'error' && <XCircle size={20} />}
                {toast.type === 'info' && <Info size={20} />}
              </div>
              <p className="text-sm font-bold text-brand-dark flex-1">{toast.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
