import React from 'react';
import { cn } from '../utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'maroon' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-brand-dark text-white',
    gold: 'bg-brand-gold text-brand-dark font-bold',
    maroon: 'bg-brand-maroon text-white',
    outline: 'border border-brand-maroon text-brand-maroon'
  };
  return (
    <span className={cn("px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full", variants[variant], className)}>
      {children}
    </span>
  );
};
