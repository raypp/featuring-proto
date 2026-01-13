/**
 * Featuring Design System - Core Loader Component
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';

export type CoreLoaderSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type CoreLoaderColor = 'primary' | 'white';

export interface CoreLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: CoreLoaderSize;
    color?: CoreLoaderColor;
}

const loaderSizeStyles: Record<CoreLoaderSize, string> = {
    xxs: 'w-3 h-3',
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    xxl: 'w-12 h-12',
};

const loaderColorStyles: Record<CoreLoaderColor, string> = {
    primary: 'text-[var(--ft-interactive-primary)]',
    white: 'text-white',
};

export const CoreLoader = React.forwardRef<HTMLDivElement, CoreLoaderProps>(
    ({ size = 'md', color = 'primary', className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'animate-spin',
                    loaderSizeStyles[size],
                    loaderColorStyles[color],
                    className
                )}
                role="status"
                aria-label="Loading"
                {...props}
            >
                <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
        );
    }
);

CoreLoader.displayName = 'CoreLoader';

// ============================================
// Full Page Loader
// ============================================

export interface CorePageLoaderProps {
    message?: string;
}

export const CorePageLoader: React.FC<CorePageLoaderProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 z-[var(--ft-z-modal)] flex flex-col items-center justify-center bg-[var(--ft-bg-primary)]/80 backdrop-blur-sm">
            <CoreLoader size="xl" />
            {message && (
                <p className="mt-4 text-sm text-[var(--ft-text-secondary)]">{message}</p>
            )}
        </div>
    );
};

// ============================================
// Skeleton Loader
// ============================================

export interface CoreSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    circle?: boolean;
}

export const CoreSkeleton = React.forwardRef<HTMLDivElement, CoreSkeletonProps>(
    ({ width, height, rounded = true, circle = false, className, style, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'animate-pulse bg-[var(--ft-color-gray-200)]',
                    rounded && !circle && 'rounded-[var(--ft-radius-md)]',
                    circle && 'rounded-full',
                    className
                )}
                style={{
                    width: typeof width === 'number' ? `${width}px` : width,
                    height: typeof height === 'number' ? `${height}px` : height,
                    ...style,
                }}
                {...props}
            />
        );
    }
);

CoreSkeleton.displayName = 'CoreSkeleton';

export default {
    CoreLoader,
    CorePageLoader,
    CoreSkeleton,
};
