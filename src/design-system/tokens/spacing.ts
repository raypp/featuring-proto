/**
 * Featuring Design System - Spacing Tokens
 * Based on @featuring-corp/design-tokens
 */

// Base spacing unit (4px)
const baseUnit = 4;

// Spacing Scale
export const spacing = {
    0: '0',
    px: '1px',
    0.5: `${baseUnit * 0.5}px`,   // 2px
    1: `${baseUnit * 1}px`,       // 4px
    1.5: `${baseUnit * 1.5}px`,   // 6px
    2: `${baseUnit * 2}px`,       // 8px
    2.5: `${baseUnit * 2.5}px`,   // 10px
    3: `${baseUnit * 3}px`,       // 12px
    3.5: `${baseUnit * 3.5}px`,   // 14px
    4: `${baseUnit * 4}px`,       // 16px
    5: `${baseUnit * 5}px`,       // 20px
    6: `${baseUnit * 6}px`,       // 24px
    7: `${baseUnit * 7}px`,       // 28px
    8: `${baseUnit * 8}px`,       // 32px
    9: `${baseUnit * 9}px`,       // 36px
    10: `${baseUnit * 10}px`,     // 40px
    11: `${baseUnit * 11}px`,     // 44px
    12: `${baseUnit * 12}px`,     // 48px
    14: `${baseUnit * 14}px`,     // 56px
    16: `${baseUnit * 16}px`,     // 64px
    20: `${baseUnit * 20}px`,     // 80px
    24: `${baseUnit * 24}px`,     // 96px
    28: `${baseUnit * 28}px`,     // 112px
    32: `${baseUnit * 32}px`,     // 128px
    36: `${baseUnit * 36}px`,     // 144px
    40: `${baseUnit * 40}px`,     // 160px
    44: `${baseUnit * 44}px`,     // 176px
    48: `${baseUnit * 48}px`,     // 192px
    52: `${baseUnit * 52}px`,     // 208px
    56: `${baseUnit * 56}px`,     // 224px
    60: `${baseUnit * 60}px`,     // 240px
    64: `${baseUnit * 64}px`,     // 256px
    72: `${baseUnit * 72}px`,     // 288px
    80: `${baseUnit * 80}px`,     // 320px
    96: `${baseUnit * 96}px`,     // 384px
};

// Numeric spacing for calculations
export const spacingNumeric = {
    0: 0,
    px: 1,
    0.5: baseUnit * 0.5,
    1: baseUnit * 1,
    1.5: baseUnit * 1.5,
    2: baseUnit * 2,
    2.5: baseUnit * 2.5,
    3: baseUnit * 3,
    3.5: baseUnit * 3.5,
    4: baseUnit * 4,
    5: baseUnit * 5,
    6: baseUnit * 6,
    7: baseUnit * 7,
    8: baseUnit * 8,
    9: baseUnit * 9,
    10: baseUnit * 10,
    11: baseUnit * 11,
    12: baseUnit * 12,
    14: baseUnit * 14,
    16: baseUnit * 16,
    20: baseUnit * 20,
    24: baseUnit * 24,
    28: baseUnit * 28,
    32: baseUnit * 32,
    36: baseUnit * 36,
    40: baseUnit * 40,
    44: baseUnit * 44,
    48: baseUnit * 48,
    52: baseUnit * 52,
    56: baseUnit * 56,
    60: baseUnit * 60,
    64: baseUnit * 64,
    72: baseUnit * 72,
    80: baseUnit * 80,
    96: baseUnit * 96,
};

// Border Radius
export const radius = {
    none: '0',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
};

// Border Width
export const borderWidth = {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
};

// Elevation / Box Shadow
export const elevation = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Z-Index
export const zIndex = {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '100',
    sticky: '200',
    modal: '300',
    popover: '400',
    tooltip: '500',
    toast: '600',
};

// Breakpoints
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export default {
    spacing,
    spacingNumeric,
    radius,
    borderWidth,
    elevation,
    zIndex,
    breakpoints,
};
