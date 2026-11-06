import type { Config } from 'tailwindcss';

/**
 * RBK TradeXchange design tokens.
 * Palette is anchored to the logo: navy #022350 (globe + wordmark) and sky #44A0DC (swoosh).
 * The legacy `brand.*` names are kept so every existing component re-themes automatically;
 * their values were re-tuned into one cohesive navy / royal-blue / sky / teal / amber system.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1280px' } },
    extend: {
      screens: { xs: '420px' },
      opacity: { '12': '0.12', '15': '0.15', '35': '0.35', '45': '0.45', '55': '0.55', '65': '0.65', '85': '0.85' },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        heading: ['"Sora Variable"', 'Sora', '"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
        display: ['clamp(2.25rem, 3.4vw + 0.7rem, 3.65rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        'display-sm': ['clamp(2rem, 3vw + 0.75rem, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.7rem, 1.6vw + 0.95rem, 2.4rem)', { lineHeight: '1.12', letterSpacing: '-0.028em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue-violet': 'linear-gradient(135deg, #1d5fd6 0%, #44a0dc 100%)',
        'gradient-blue-turquoise': 'linear-gradient(135deg, #1d5fd6 0%, #0f9a8a 100%)',
        'gradient-violet-pink': 'linear-gradient(135deg, #4c5fd5 0%, #44a0dc 100%)',
        'gradient-brand': 'linear-gradient(120deg, #1d5fd6 0%, #2f7fe0 45%, #44a0dc 100%)',
        'gradient-mesh':
          'radial-gradient(at 20% 10%, rgba(68,160,220,0.10), transparent 50%), radial-gradient(at 80% 0%, rgba(29,95,214,0.08), transparent 50%)',
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        success: { DEFAULT: 'hsl(var(--success))', foreground: 'hsl(var(--success-foreground))' },
        warning: { DEFAULT: 'hsl(var(--warning))', foreground: 'hsl(var(--warning-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        brand: {
          white: '#ffffff',
          paper: '#f6f8fc',
          line: '#e3e9f3',
          paleblue: '#e2ecfa',
          sky: '#44a0dc',
          blue: '#1d5fd6',
          lavender: '#eceffb',
          violet: '#4c5fd5',
          mint: '#ddf4ee',
          turquoise: '#0f9a8a',
          peach: '#fff1e0',
          yellow: '#fdf3da',
          pink: '#e3f1fb',
          ink: '#0a1630',
          slate: '#4b5a74',
          navy: '#022350',
          night: '#050f24',
          deep: '#081a3a',
        },
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.96)' },
        },
        'float-y': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shine: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        'grid-pan': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '48px 48px' } },
        'ping-soft': { '0%': { transform: 'scale(1)', opacity: '0.7' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
        'draw-x': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 60s linear infinite',
        aurora: 'aurora 22s ease-in-out infinite',
        'aurora-slow': 'aurora 32s ease-in-out infinite reverse',
        'float-y': 'float-y 6s ease-in-out infinite',
        shine: 'shine 2.2s linear infinite',
        'grid-pan': 'grid-pan 8s linear infinite',
        'ping-soft': 'ping-soft 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      transitionTimingFunction: { 'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)' },
      boxShadow: {
        'glow-blue': '0 0 0 1px rgba(29,95,214,0.25), 0 8px 30px -6px rgba(29,95,214,0.45)',
        'glow-violet': '0 0 0 1px rgba(68,160,220,0.25), 0 8px 30px -6px rgba(68,160,220,0.45)',
        doc: '0 1px 2px rgba(10,22,48,0.04), 0 12px 32px -12px rgba(10,22,48,0.18)',
        soft: '0 1px 2px rgba(10,22,48,0.04), 0 2px 8px -2px rgba(10,22,48,0.06)',
        lift: '0 1px 2px rgba(10,22,48,0.05), 0 24px 48px -20px rgba(10,22,48,0.28)',
        ring: '0 0 0 1px rgba(10,22,48,0.06)',
        'inner-line': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
