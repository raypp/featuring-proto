/**
 * Featuring Design System - Color Tokens
 * Based on @featuring-corp/design-tokens
 */

// Global Color Palette
export const globalColors = {
    // Gray Scale
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#030712',
    },

    // Primary Colors
    primary: {
        50: '#EEF2FF',
        100: '#E0E7FF',
        200: '#C7D2FE',
        300: '#A5B4FC',
        400: '#818CF8',
        500: '#6366F1',
        600: '#4F46E5',
        700: '#4338CA',
        800: '#3730A3',
        900: '#312E81',
        950: '#1E1B4B',
    },

    // Semantic Colors
    red: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
    },

    orange: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
    },

    yellow: {
        50: '#FEFCE8',
        100: '#FEF9C3',
        200: '#FEF08A',
        300: '#FDE047',
        400: '#FACC15',
        500: '#EAB308',
        600: '#CA8A04',
        700: '#A16207',
        800: '#854D0E',
        900: '#713F12',
    },

    lightGreen: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
    },

    green: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
    },

    cyan: {
        50: '#ECFEFF',
        100: '#CFFAFE',
        200: '#A5F3FC',
        300: '#67E8F9',
        400: '#22D3EE',
        500: '#06B6D4',
        600: '#0891B2',
        700: '#0E7490',
        800: '#155E75',
        900: '#164E63',
    },

    teal: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
        700: '#0F766E',
        800: '#115E59',
        900: '#134E4A',
    },

    lightBlue: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C4A6E',
    },

    blue: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
    },

    indigo: {
        50: '#EEF2FF',
        100: '#E0E7FF',
        200: '#C7D2FE',
        300: '#A5B4FC',
        400: '#818CF8',
        500: '#6366F1',
        600: '#4F46E5',
        700: '#4338CA',
        800: '#3730A3',
        900: '#312E81',
    },

    purple: {
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#A855F7',
        600: '#9333EA',
        700: '#7E22CE',
        800: '#6B21A8',
        900: '#581C87',
    },

    magenta: {
        50: '#FDF4FF',
        100: '#FAE8FF',
        200: '#F5D0FE',
        300: '#F0ABFC',
        400: '#E879F9',
        500: '#D946EF',
        600: '#C026D3',
        700: '#A21CAF',
        800: '#86198F',
        900: '#701A75',
    },

    burgundy: {
        50: '#FDF2F8',
        100: '#FCE7F3',
        200: '#FBCFE8',
        300: '#F9A8D4',
        400: '#F472B6',
        500: '#EC4899',
        600: '#DB2777',
        700: '#BE185D',
        800: '#9D174D',
        900: '#831843',
    },

    // Static Colors
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
};

// Semantic Colors
export const semanticColors = {
    background: {
        primary: globalColors.white,
        secondary: globalColors.gray[50],
        tertiary: globalColors.gray[100],
        inverse: globalColors.gray[900],
    },

    text: {
        primary: globalColors.gray[900],
        secondary: globalColors.gray[600],
        tertiary: globalColors.gray[500],
        disabled: globalColors.gray[400],
        inverse: globalColors.white,
        link: globalColors.primary[600],
    },

    border: {
        primary: globalColors.gray[200],
        secondary: globalColors.gray[300],
        focus: globalColors.primary[500],
        error: globalColors.red[500],
    },

    status: {
        success: {
            bg: globalColors.green[50],
            text: globalColors.green[700],
            border: globalColors.green[200],
            icon: globalColors.green[500],
        },
        warning: {
            bg: globalColors.yellow[50],
            text: globalColors.yellow[700],
            border: globalColors.yellow[200],
            icon: globalColors.yellow[500],
        },
        error: {
            bg: globalColors.red[50],
            text: globalColors.red[700],
            border: globalColors.red[200],
            icon: globalColors.red[500],
        },
        info: {
            bg: globalColors.blue[50],
            text: globalColors.blue[700],
            border: globalColors.blue[200],
            icon: globalColors.blue[500],
        },
    },

    interactive: {
        primary: {
            default: globalColors.primary[600],
            hover: globalColors.primary[700],
            active: globalColors.primary[800],
            disabled: globalColors.gray[300],
        },
        secondary: {
            default: globalColors.gray[100],
            hover: globalColors.gray[200],
            active: globalColors.gray[300],
            disabled: globalColors.gray[100],
        },
        tertiary: {
            default: 'transparent',
            hover: globalColors.gray[100],
            active: globalColors.gray[200],
            disabled: 'transparent',
        },
        danger: {
            default: globalColors.red[600],
            hover: globalColors.red[700],
            active: globalColors.red[800],
            disabled: globalColors.gray[300],
        },
    },
};

// Avatar Colors
export const avatarColors = [
    'gray',
    'red',
    'orange',
    'yellow',
    'lightGreen',
    'green',
    'cyan',
    'teal',
    'lightBlue',
    'blue',
    'indigo',
    'purple',
    'magenta',
    'burgundy',
    'primary',
] as const;

export type AvatarColorType = typeof avatarColors[number];

// Dot Colors
export const dotColors = ['black', 'gray', 'white', 'red', 'orange', 'green', 'purple'] as const;
export type DotColorType = typeof dotColors[number];

// Status Badge Colors
export const statusBadgeColors = ['default', 'informative', 'error', 'warning', 'success', 'primary'] as const;
export type StatusBadgeColorType = typeof statusBadgeColors[number];

// Tag Colors
export const tagColors = [
    'primary',
    'gray',
    'red',
    'orange',
    'lightGreen',
    'teal',
    'blue',
    'indigo',
    'magenta',
    'contrast',
] as const;
export type TagColorType = typeof tagColors[number];

export default {
    global: globalColors,
    semantic: semanticColors,
};
