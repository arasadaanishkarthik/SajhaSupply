/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#174C38',
          50: '#E8F2EA',
          100: '#C5DFC9',
          200: '#9FCBA6',
          300: '#78B683',
          400: '#53A263',
          500: '#2F7655',
          600: '#174C38',
          700: '#123D2D',
          800: '#0D2E22',
          900: '#071F17',
        },
        amber: {
          brand: '#F4B860',
        },
        green: {
          light: '#E8F2EA',
          soft: '#2F7655',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.65)',
          green: 'rgba(232, 242, 234, 0.55)',
          border: 'rgba(255, 255, 255, 0.65)',
        },
        text: {
          primary: '#17251F',
          secondary: '#64746B',
        },
        page: '#F8FAF8',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          200: 'hsl(var(--primary-200))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        logo: ['Tempting', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(23, 76, 56, 0.06)',
        'card-hover': '0 12px 40px rgba(23, 76, 56, 0.12)',
        glass: '0 8px 32px rgba(23, 76, 56, 0.08)',
        nav: '0 4px 20px rgba(23, 76, 56, 0.04)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
