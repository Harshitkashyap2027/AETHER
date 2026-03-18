// Theme constants for AETHER mobile app
// iOS-style dark glassmorphism design system

export const colors = {
  // Backgrounds
  bg: '#000000',
  bgCard: 'rgba(255, 255, 255, 0.06)',
  bgCardHover: 'rgba(255, 255, 255, 0.10)',
  bgInput: 'rgba(255, 255, 255, 0.08)',

  // Glass
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassHighlight: 'rgba(255, 255, 255, 0.04)',

  // Accent
  accent: '#7C6DF8',
  accentGlow: 'rgba(124, 109, 248, 0.3)',
  accentLight: '#A89CF9',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  textMuted: 'rgba(255, 255, 255, 0.35)',

  // Messages
  userBubble: '#7C6DF8',
  aiBubble: 'rgba(255, 255, 255, 0.08)',

  // Status
  success: '#34C759',
  warning: '#FF9F0A',
  error: '#FF3B30',

  // Separator
  separator: 'rgba(255, 255, 255, 0.08)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 100,
};

export const typography = {
  h1: { fontSize: 34, fontWeight: '700', letterSpacing: 0.37 },
  h2: { fontSize: 28, fontWeight: '700', letterSpacing: 0.36 },
  h3: { fontSize: 22, fontWeight: '700', letterSpacing: 0.35 },
  title: { fontSize: 17, fontWeight: '600', letterSpacing: -0.41 },
  body: { fontSize: 15, fontWeight: '400', letterSpacing: -0.24 },
  caption: { fontSize: 13, fontWeight: '400', letterSpacing: -0.08 },
  micro: { fontSize: 11, fontWeight: '500', letterSpacing: 0.07 },
};
