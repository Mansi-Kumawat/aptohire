import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        'nav-glass': 'var(--nav-glass)',
        mist: 'var(--mist)',
        hairline: 'var(--hairline)',
        ink: 'var(--ink)',
        moss: 'var(--moss)',
        verdant: {
          50: 'var(--verdant-50)',
          100: 'var(--verdant-100)',
          300: 'var(--verdant-300)',
          600: 'var(--verdant-600)',
          700: 'var(--verdant-700)',
          800: 'var(--verdant-800)',
        },
        ember: {
          50: 'var(--ember-50)',
          100: 'var(--ember-100)',
          300: 'var(--ember-300)',
          500: 'var(--ember-500)',
          700: 'var(--ember-700)',
        },
        danger: {
          50: 'var(--danger-50)',
          600: 'var(--danger-600)',
        },
      },
      borderRadius: {
        control: 'var(--r-control)',
        panel: 'var(--r-panel)',
        feature: 'var(--r-feature)',
      },
      boxShadow: {
        float: 'var(--shadow-1)',
        modal: 'var(--shadow-2)',
        'card-hover': '0 8px 20px -6px rgba(23, 38, 30, 0.12), 0 2px 6px -2px rgba(23, 38, 30, 0.06)',
        'elevation': '0 20px 40px -15px rgba(23, 38, 30, 0.18)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      backgroundImage: {
        'grad-dawn': 'var(--grad-dawn)',
        'grad-mesh': 'var(--grad-mesh)',
        'grad-hero-sleek': 'var(--grad-hero-sleek)',
        'grad-verified': 'var(--grad-verified)',
        'grad-section-subtle': 'var(--grad-section-subtle)',
        'grad-section-warm': 'var(--grad-section-warm)',
        'grad-cta': 'var(--grad-cta)',
      },
      fontSize: {
        'display-xl': ['clamp(36px, 6vw, 64px)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-l': ['clamp(28px, 4.2vw, 44px)', { lineHeight: '1.14', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(28px, 4vw, 40px)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'heading-2': ['clamp(24px, 3vw, 32px)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-3': ['clamp(20px, 2.4vw, 24px)', { lineHeight: '1.35', letterSpacing: '0' }],
        'body-l': ['clamp(17px, 1.6vw, 19px)', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-base': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'small': ['14px', { lineHeight: '1.5', letterSpacing: '0' }],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '220ms',
        reveal: '900ms',
      },
    },
  },
  plugins: [],
};

export default config;
