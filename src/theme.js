export const theme = {
  colors: {
    gradient: 'bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900',
    gradientText: 'bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent',
    buttonGradient: 'bg-gradient-to-r from-teal-500 to-green-600',
    iconGradient: 'bg-gradient-to-br from-teal-500 to-green-600',
    // Updated color palette for modern UI
    primary: '#35aa8f',
    secondary: '#a287e7',
    accent: '#f59e0b',
    dark: '#0d1f1a',
    light: '#f8fafc',
    muted: '#94a3b8'
  },
  glass: {
    card: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl glass-card shadow-xl',
    cardHover: 'hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-2',
    input: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl',
    strong: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl',
    // New glass variants for modern UI
    light: 'backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl',
    medium: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl',
    heavy: 'backdrop-blur-2xl bg-white/15 border border-white/25 rounded-3xl'
  },
  text: {
    heading: 'text-white font-bold',
    subheading: 'text-white/80 font-light',
    muted: 'text-white/60 font-light',
    // Updated typography system
    display: 'text-5xl font-bold leading-tight',
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    body: 'text-base font-normal',
    caption: 'text-sm font-light'
  },
  button: {
    primary: 'px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50 animate-scaleIn',
    secondary: 'px-8 py-4 border-2 border-white/30 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-scaleIn',
    // New button variants for modern UI
    gradient: 'px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/30',
    outline: 'px-6 py-3 border-2 border-teal-500 text-teal-400 font-medium rounded-lg hover:bg-teal-500/10 transition-all duration-300',
    ghost: 'px-6 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300'
  },
  blur: {
    purple: 'absolute w-96 h-96 bg-purple/20 rounded-full blur-3xl animate-pulse',
    blue: 'absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse',
    indigo: 'absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse',
    // New blur effects for modern UI
    large: 'absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl',
    medium: 'absolute w-80 h-80 bg-green-500/15 rounded-full blur-2xl',
    small: 'absolute w-60 h-60 bg-purple/20 rounded-full blur-xl'
  },
  animation: {
    fadeInUp: 'animate-fadeInUp',
    fadeInDown: 'animate-fadeInDown',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
    fadeIn: 'animate-fadeIn',
    float: 'animate-float',
    scaleIn: 'animate-scaleIn',
    delay100: 'animate-delay-100',
    delay200: 'animate-delay-200',
    delay300: 'animate-delay-300',
    delay400: 'animate-delay-400',
    delay500: 'animate-delay-500',
    delay600: 'animate-delay-600',
    delay700: 'animate-delay-700',
    delay800: 'animate-delay-800',
    // New animations for modern UI
    slideInLeft: 'animate-slideInLeft',
    slideInRight: 'animate-slideInRight',
    slideInUp: 'animate-slideInUp',
    pulseSlow: 'animate-pulseSlow',
    bounce: 'animate-bounce'
  }
};