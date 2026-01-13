/**
 * Featuring Design System
 * A comprehensive design system based on @featuring-corp packages
 * 
 * Usage:
 * 1. Import the theme CSS in your main entry file:
 *    import '@/design-system/theme.css';
 * 
 * 2. Import components as needed:
 *    import { CoreButton, CoreAvatar } from '@/design-system';
 * 
 * 3. Use design tokens for custom styling:
 *    import { globalColors, spacing } from '@/design-system';
 */

// ============================================
// Tokens
// ============================================
export * from './tokens';
export { default as tokens } from './tokens';

// ============================================
// Components
// ============================================
export * from './components';

// ============================================
// Utilities
// ============================================
export * from './utils';
export { default as utils } from './utils';

// ============================================
// Theme CSS Path (for reference)
// ============================================
// Import this in your main.tsx or App.tsx:
// import '@/design-system/theme.css';
