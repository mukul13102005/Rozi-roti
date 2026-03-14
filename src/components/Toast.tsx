import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-emerald-500" size={20} />,
    error: <AlertCircle className="text-rose-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-100',
    error: 'bg-rose-50 border-rose-100',
    info: 'bg-blue-50 border-blue-100'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className={`flex items-center space-x-4 p-4 rounded-2xl border shadow-xl ${bgColors[type]} min-w-[300px] pointer-events-auto`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium text-brand-dark/80">{message}</p>
      <button onClick={onClose} className="text-brand-dark/20 hover:text-brand-dark/40 transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }: { toasts: any[], removeToast: (id: string) => void }) => (
  <div className="fixed bottom-8 right-8 z-[200] flex flex-col space-y-4 pointer-events-none">
    <AnimatePresence>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </AnimatePresence>
  </div>
);
