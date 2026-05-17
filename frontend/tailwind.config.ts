import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stone:   { DEFAULT: '#8B7355', light: '#C4A882', dark: '#5C4A2A' },
        roman:   { DEFAULT: '#8B1A1A', light: '#C0392B', dark: '#5C0F0F' },
        gold:    { DEFAULT: '#C9A84C', light: '#E8CC7A', dark: '#9B7A2A' },
        forest:  { DEFAULT: '#2D5016', light: '#4A7A25', dark: '#1A2E0C' },
        parchment: { DEFAULT: '#F5ECD7', light: '#FBF5E8', dark: '#E8D5B0' },
      },
      fontFamily: {
        serif:   ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        display: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};

export default config;
