/**
 * Featuring Design System - Core Badge Components
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';
import type { StatusBadgeColorType, TagColorType } from '../tokens/colors';

// ============================================
// Status Badge
// ============================================

export type CoreStatusBadgeType = 'filled' | 'tint' | 'outline' | 'subtle';
export type CoreStatusBadgeSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CoreStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    colorType?: StatusBadgeColorType;
    type?: CoreStatusBadgeType;
    size?: CoreStatusBadgeSize;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    children?: React.ReactNode;
}

const statusBadgeColorStyles: Record<StatusBadgeColorType, Record<CoreStatusBadgeType, string>> = {
    default: {
        filled: 'bg-[var(--ft-color-gray-600)] text-white',
        tint: 'bg-[var(--ft-color-gray-100)] text-[var(--ft-color-gray-700)]',
        outline: 'bg-transparent border border-[var(--ft-color-gray-300)] text-[var(--ft-color-gray-700)]',
        subtle: 'bg-transparent text-[var(--ft-color-gray-600)]',
    },
    informative: {
        filled: 'bg-[var(--ft-color-blue-600)] text-white',
        tint: 'bg-[var(--ft-color-blue-50)] text-[var(--ft-color-blue-700)]',
        outline: 'bg-transparent border border-[var(--ft-color-blue-300)] text-[var(--ft-color-blue-700)]',
        subtle: 'bg-transparent text-[var(--ft-color-blue-600)]',
    },
    error: {
        filled: 'bg-[var(--ft-color-red-600)] text-white',
        tint: 'bg-[var(--ft-color-red-50)] text-[var(--ft-color-red-700)]',
        outline: 'bg-transparent border border-[var(--ft-color-red-300)] text-[var(--ft-color-red-700)]',
        subtle: 'bg-transparent text-[var(--ft-color-red-600)]',
    },
    warning: {
        filled: 'bg-[var(--ft-color-yellow-500)] text-[var(--ft-color-yellow-900)]',
        tint: 'bg-[var(--ft-color-yellow-50)] text-[var(--ft-color-yellow-700)]',
        outline: 'bg-transparent border border-[var(--ft-color-yellow-300)] text-[var(--ft-color-yellow-700)]',
        subtle: 'bg-transparent text-[var(--ft-color-yellow-600)]',
    },
    success: {
        filled: 'bg-[var(--ft-color-green-600)] text-white',
        tint: 'bg-[var(--ft-color-green-50)] text-[var(--ft-color-green-700)]',
        outline: 'bg-transparent border border-[var(--ft-color-green-300)] text-[var(--ft-color-green-700)]',
        subtle: 'bg-transparent text-[var(--ft-color-green-600)]',
    },
    primary: {
        filled: 'bg-[var(--ft-color-primary-600)] text-white',
        tint: 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-700)]',
        outline: 'bg-transparent border border-[var(--ft-color-primary-300)] text-[var(--ft-color-primary-700)]',
        subtle: 'bg-transparent text-[var(--ft-color-primary-600)]',
    },
};

const statusBadgeSizeStyles: Record<CoreStatusBadgeSize, string> = {
    sm: 'h-5 px-1.5 text-xs gap-1',
    md: 'h-6 px-2 text-xs gap-1',
    lg: 'h-7 px-2.5 text-sm gap-1.5',
    xl: 'h-8 px-3 text-sm gap-1.5',
};

export const CoreStatusBadge = React.forwardRef<HTMLDivElement, CoreStatusBadgeProps>(
    (
        {
            colorType = 'default',
            type = 'filled',
            size = 'md',
            leftContent,
            rightContent,
            children,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap',
                    statusBadgeColorStyles[colorType][type],
                    statusBadgeSizeStyles[size],
                    className
                )}
                {...props}
            >
                {leftContent && <span className="flex-shrink-0">{leftContent}</span>}
                {children}
                {rightContent && <span className="flex-shrink-0">{rightContent}</span>}
            </div>
        );
    }
);

CoreStatusBadge.displayName = 'CoreStatusBadge';

// ============================================
// Tag
// ============================================

export type CoreTagSize = 'xs' | 'sm' | 'md';

export interface CoreTagProps extends React.HTMLAttributes<HTMLDivElement> {
    colorType?: TagColorType;
    size?: CoreTagSize;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    onClose?: React.EventHandler<any>;
    closable?: boolean;
    children?: React.ReactNode;
}

const tagColorStyles: Record<TagColorType, string> = {
    primary: 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-700)] border-[var(--ft-color-primary-200)]',
    gray: 'bg-[var(--ft-color-gray-100)] text-[var(--ft-color-gray-700)] border-[var(--ft-color-gray-200)]',
    red: 'bg-[var(--ft-color-red-50)] text-[var(--ft-color-red-700)] border-[var(--ft-color-red-200)]',
    orange: 'bg-[var(--ft-color-orange-50)] text-[var(--ft-color-orange-700)] border-[var(--ft-color-orange-200)]',
    lightGreen: 'bg-[var(--ft-color-green-50)] text-[var(--ft-color-green-700)] border-[var(--ft-color-green-200)]',
    teal: 'bg-[var(--ft-color-teal-50)] text-[var(--ft-color-teal-700)] border-[var(--ft-color-teal-200)]',
    blue: 'bg-[var(--ft-color-blue-50)] text-[var(--ft-color-blue-700)] border-[var(--ft-color-blue-200)]',
    indigo: 'bg-[var(--ft-color-indigo-50)] text-[var(--ft-color-indigo-700)] border-[var(--ft-color-indigo-200)]',
    magenta: 'bg-[var(--ft-color-magenta-50)] text-[var(--ft-color-magenta-700)] border-[var(--ft-color-magenta-200)]',
    contrast: 'bg-[var(--ft-color-gray-900)] text-white border-[var(--ft-color-gray-900)]',
};

const tagSizeStyles: Record<CoreTagSize, string> = {
    xs: 'h-5 px-1.5 text-[10px] gap-0.5 rounded',
    sm: 'h-6 px-2 text-xs gap-1 rounded-md',
    md: 'h-7 px-2.5 text-xs gap-1 rounded-md',
};

export const CoreTag = React.forwardRef<HTMLDivElement, CoreTagProps>(
    (
        {
            colorType = 'primary',
            size = 'md',
            leftContent,
            rightContent,
            onClose,
            closable = false,
            children,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium border whitespace-nowrap',
                    tagColorStyles[colorType],
                    tagSizeStyles[size],
                    className
                )}
                {...props}
            >
                {leftContent && <span className="flex-shrink-0">{leftContent}</span>}
                {children}
                {rightContent && <span className="flex-shrink-0">{rightContent}</span>}
                {closable && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-shrink-0 ml-0.5 hover:opacity-70 transition-opacity"
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }
);

CoreTag.displayName = 'CoreTag';

// ============================================
// Dot
// ============================================

export type CoreDotSize = 'xs' | 'sm' | 'md' | 'lg';
export type CoreDotType = 'filled' | 'border';
export type CoreDotColor = 'black' | 'gray' | 'white' | 'red' | 'orange' | 'green' | 'purple';

export interface CoreDotProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: CoreDotSize;
    type?: CoreDotType;
    color?: CoreDotColor;
}

const dotSizeStyles: Record<CoreDotSize, string> = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
};

const dotColorStyles: Record<CoreDotColor, Record<CoreDotType, string>> = {
    black: { filled: 'bg-black', border: 'border-2 border-black' },
    gray: { filled: 'bg-[var(--ft-color-gray-400)]', border: 'border-2 border-[var(--ft-color-gray-400)]' },
    white: { filled: 'bg-white', border: 'border-2 border-white' },
    red: { filled: 'bg-[var(--ft-color-red-500)]', border: 'border-2 border-[var(--ft-color-red-500)]' },
    orange: { filled: 'bg-[var(--ft-color-orange-500)]', border: 'border-2 border-[var(--ft-color-orange-500)]' },
    green: { filled: 'bg-[var(--ft-color-green-500)]', border: 'border-2 border-[var(--ft-color-green-500)]' },
    purple: { filled: 'bg-[var(--ft-color-purple-500)]', border: 'border-2 border-[var(--ft-color-purple-500)]' },
};

export const CoreDot = React.forwardRef<HTMLDivElement, CoreDotProps>(
    ({ size = 'md', type = 'filled', color = 'black', className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-full flex-shrink-0',
                    dotSizeStyles[size],
                    dotColorStyles[color][type],
                    type === 'border' && 'bg-transparent',
                    className
                )}
                {...props}
            />
        );
    }
);

CoreDot.displayName = 'CoreDot';

export default {
    CoreStatusBadge,
    CoreTag,
    CoreDot,
};
