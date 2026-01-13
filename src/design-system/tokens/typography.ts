/**
 * Featuring Design System - Typography Tokens
 * Based on @featuring-corp/design-tokens
 */

// Font Family
export const fontFamily = {
    sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    mono: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
};

// Font Size
export const fontSize = {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    md: '1rem',         // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
};

// Font Weight
export const fontWeight = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
};

// Line Height
export const lineHeight = {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
};

// Letter Spacing
export const letterSpacing = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
};

// Typography Presets - Heading
export const heading = {
    h1: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
    },
    h2: {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
    },
    h3: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.snug,
        letterSpacing: letterSpacing.normal,
    },
    h4: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.snug,
        letterSpacing: letterSpacing.normal,
    },
    h5: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    h6: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
};

// Typography Presets - Body
export const body = {
    lg: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.regular,
        lineHeight: lineHeight.relaxed,
        letterSpacing: letterSpacing.normal,
    },
    md: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.regular,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    sm: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.regular,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    xs: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.regular,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
};

// Typography Presets - Caption
export const caption = {
    lg: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    md: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    sm: {
        fontSize: '0.6875rem', // 11px
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.wide,
    },
};

// Typography Presets - Label
export const label = {
    lg: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    md: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    sm: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
};

export default {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    heading,
    body,
    caption,
    label,
};
