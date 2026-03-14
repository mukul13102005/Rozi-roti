import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Sparkles, Zap } from 'lucide-react';

export const NotificationManager: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if notifications are supported and what the current permission is
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      const isDismissed = localStorage.getItem('rr_notification_dismissed');
      
      // If permission is default and not dismissed, show prompt after 5 seconds
      if (Notification.permission === 'default' && !isDismissed) {
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('rr_notification_dismissed', 'true');
  };

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowPrompt(false);

      if (result === 'granted') {
        localStorage.removeItem('rr_notification_dismissed');
        sendFlashSaleNotification();
      } else {
        localStorage.setItem('rr_notification_dismissed', 'true');
      }
    }
  };

  const sendFlashSaleNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification("⚡ FLASH SALE LIVE: 40% OFF! ⚡", {
        body: "Surat's finest Silks and Banarasis are now at unbelievable prices. Only for the next 2 hours!",
        icon: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100&h=100",
        badge: "https://picsum.photos/seed/logo/100/100",
        tag: "flash-sale",
        requireInteraction: true
      });
    }
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-24 right-8 z-[150] max-w-sm w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-brand-gold/20 overflow-hidden">
          <div className="bg-brand-maroon p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Bell size={18} className="animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-widest">Stay Updated</span>
            </div>
            <button onClick={handleDismiss} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-brand-beige rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-brand-maroon" size={24} />
              </div>
              <div>
                <h4 className="text-brand-dark font-serif text-lg leading-tight mb-1">Unlock VIP Flash Sales!</h4>
                <p className="text-brand-dark/60 text-xs">Be the first to know when our legendary 2-hour flash sales go live. ⚡</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={requestPermission}
                className="w-full maroon-gradient text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:shadow-brand-maroon/20 transition-all active:scale-95"
              >
                Allow Notifications
              </button>
              <button 
                onClick={handleDismiss}
                className="w-full text-brand-dark/30 text-[10px] uppercase font-bold tracking-widest hover:text-brand-maroon transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 10 }}
            className="h-1 bg-brand-gold/30"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
