import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: '#FFFFFF',
          200: '#CBCDD0',
          300: '#9393B7',
          600: '#57577B',
          900: '#21214D'
        },
        blue: {
          100: '#E0E6FA',
          200: '#C7D3F7',
          600: '#4865DB',
          700: '#2A4CD5'
        },
        red: {
          700: '#E60013'
        },
        otherColors: {
          'red-300': '#FF9B99',
          'indigo-200': '#B8B1FF',
          'blue-300': '#89CAFF',
          'green-300': '#89E780',
          'amber-300': '#FFC97C'
        },
        gradient: {
          lightGradient: 'linear-gradient(180deg, #F5F5FF 72.99%, #E0E0FF 100%)'
        }
      },
      fontFamily: {
        body: ['"Reddit Sans"', 'system-ui', 'sans-serif']
      },
      spacing: {
        'spacing-0': '0rem',           // 0px
        'spacing-025': '0.125rem',     // 2px
        'spacing-050': '0.25rem',      // 4px
        'spacing-075': '0.375rem',     // 6px
        'spacing-100': '0.5rem',       // 8px
        'spacing-125': '0.625rem',     // 10px
        'spacing-150': '0.75rem',      // 12px
        'spacing-200': '1rem',         // 16px
        'spacing-250': '1.25rem',      // 20px
        'spacing-300': '1.5rem',       // 24px
        'spacing-400': '2rem',         // 32px
        'spacing-500': '2.5rem',       // 40px
        'spacing-600': '3rem',         // 48px
        'spacing-800': '4rem',         // 64px
        'spacing-1000': '5rem',        // 80px
      },
      borderRadius: {
        'radius-0': '0',
        'radius-4': '4px',
        'radius-6': '6px',
        'radius-8': '8px',
        'radius-10': '10px',
        'radius-12': '12px',
        'radius-16': '16px',
        'radius-20': '20px',
        'radius-24': '24px',
        'radius-full': '999px'
      }
    },
  },
  plugins: [],
};

export default config;