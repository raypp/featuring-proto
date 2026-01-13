/**
 * Featuring Design System - Design Tokens
 * Export all design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';

// Import defaults
import colors, { globalColors, semanticColors } from './colors';
import typography from './typography';
import spacing from './spacing';

// Combined tokens for theme
export const global = {
    colors: globalColors,
    ...typography,
    ...spacing,
};

export const semantic = {
    colors: semanticColors,
};

// Utility to get CSS variable name
export const getVarName = (path: string[]): string => {
    return `--ft-${path.join('-')}`;
};

export default {
    global,
    semantic,
    getVarName,
};
