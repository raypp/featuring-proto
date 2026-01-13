/**
 * Featuring Design System - Utility Functions
 */

import { globalColors } from '../tokens/colors';
import type { AvatarColorType, DotColorType, TagColorType } from '../tokens/colors';

/**
 * Get color value from color name and shade
 */
export function getColor(colorName: keyof typeof globalColors, shade?: number): string {
    const color = globalColors[colorName];
    if (typeof color === 'string') {
        return color;
    }
    if (shade && typeof color === 'object') {
        return color[shade as keyof typeof color] || '';
    }
    return '';
}

/**
 * Generate CSS variable reference
 */
export function cssVar(name: string): string {
    return `var(--ft-${name})`;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Merge class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Get avatar color by index (for consistent avatar colors)
 */
export function getAvatarColor(index: number): AvatarColorType {
    const colors: AvatarColorType[] = [
        'primary', 'blue', 'green', 'orange', 'purple',
        'red', 'teal', 'indigo', 'cyan', 'magenta'
    ];
    return colors[index % colors.length];
}

/**
 * Convert hex to rgba
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Get initials from name
 */
export function getInitials(name: string, maxLength: number = 2): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, maxLength);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default {
    getColor,
    cssVar,
    clamp,
    cn,
    getAvatarColor,
    hexToRgba,
    getInitials,
    truncate,
    formatNumber,
    formatBytes,
};
