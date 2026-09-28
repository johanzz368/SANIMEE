/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'text-1': 'var(--text)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        'orb-pink': 'var(--orb-pink)',
        'orb-violet': 'var(--orb-violet)',
        'orb-cyan': 'var(--orb-cyan)',
      },
      backgroundImage: {
        'accent-grad': 'var(--accent-grad)',
      },
      borderRadius: {
        panel: '28px',
        card: '20px',
        pill: '999px',
      },
      backdropBlur: {
        glass1: '16px',
        glass2: '28px',
        glass3: '40px',
      },
      animation: {
        'orb-1': 'orb1 38s ease-in-out infinite',
        'orb-2': 'orb2 44s ease-in-out infinite',
        'orb-3': 'orb3 32s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'sakura-fall': 'sakura 15s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(.2,.8,.2,1) forwards',
      },
      keyframes: {
        orb1: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(8%, 12%) scale(1.08)' },
          '66%': { transform: 'translate(-6%, 6%) scale(0.95)' },
        },
        orb2: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '40%': { transform: 'translate(-10%, -8%) scale(1.1)' },
          '70%': { transform: 'translate(6%, -4%) scale(0.9)' },
        },
        orb3: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(5%, -10%) scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sakura: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px) blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0) blur(0)' },
        },
      },
    },
  },
  plugins: [],
};
