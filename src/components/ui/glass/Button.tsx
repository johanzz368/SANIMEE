import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'glass',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-jakarta font-600 rounded-pill btn-press focus-ring transition-all select-none';

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-7 py-3.5 text-base min-h-[52px]',
  };

  const variants = {
    primary: 'glass-3 glass-base bg-gradient-to-r from-[#FF4D8D] to-[#8B5CF6] text-white border-0 shadow-lg text-shadow',
    glass: 'glass-1 glass-base text-[var(--text)]',
    ghost: 'bg-transparent text-[var(--text-2)] hover:text-[var(--text)] hover:bg-white/5',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
