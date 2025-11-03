/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // slate-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-600
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // slate-800
        surface: "var(--color-surface)", // slate-100
        primary: {
          DEFAULT: "var(--color-primary)", // blue-600
          foreground: "var(--color-primary-foreground)", // white
          start: "var(--color-primary-start)", // blue-800
          end: "var(--color-primary-end)", // blue-500
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // emerald-600
          foreground: "var(--color-secondary-foreground)", // white
          start: "var(--color-secondary-start)", // emerald-600
          end: "var(--color-secondary-end)", // emerald-500
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-100
          foreground: "var(--color-muted-foreground)", // slate-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // amber-500
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // slate-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // slate-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand Specific Colors
        'trust-blue': "var(--color-trust-blue)", // blue-800
        'empowerment-green': "var(--color-empowerment-green)", // emerald-600
        'illumination-gold': "var(--color-illumination-gold)", // amber-500
        'authority-purple': "var(--color-authority-purple)", // indigo-500
        'action-red': "var(--color-action-red)", // red-600
        'text-primary': "var(--color-text-primary)", // gray-800
        'text-secondary': "var(--color-text-secondary)", // gray-500
        'earth-tone': "var(--color-earth-tone)", // saddle-brown
        'sunrise-orange': "var(--color-sunrise-orange)", // orange-red
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['32px', { lineHeight: '1.1', fontWeight: '700' }],
      },
      spacing: {
        'xs': 'var(--spacing-xs)', // 8px
        'sm': 'var(--spacing-sm)', // 13px
        'md': 'var(--spacing-md)', // 21px
        'lg': 'var(--spacing-lg)', // 34px
        'xl': 'var(--spacing-xl)', // 55px
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'soft': 'var(--shadow-soft)',
        'interactive': 'var(--shadow-interactive)',
        'elevated': 'var(--shadow-elevated)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)', // 300ms
        'normal': 'var(--duration-normal)', // 400ms
        'slow': 'var(--duration-slow)', // 600ms
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1.0)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.5)',
            transform: 'scale(1.02)',
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary-start) 0%, var(--color-primary-end) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, var(--color-secondary-start) 0%, var(--color-secondary-end) 100%)',
        'gradient-illumination': 'linear-gradient(135deg, var(--color-primary-start) 0%, var(--color-secondary-end) 100%)',
        'cultural-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Cpolygon points='30,0 60,30 30,60 0,30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}