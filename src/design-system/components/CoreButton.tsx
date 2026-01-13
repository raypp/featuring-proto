/**
 * Featuring Design System - Core Button Component
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';

export type CoreButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'contrast';
export type CoreButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: CoreButtonVariant;
    size?: CoreButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}

const variantStyles: Record<CoreButtonVariant, string> = {
    primary: `
    bg-[var(--ft-interactive-primary)]
    text-white
    hover:bg-[var(--ft-interactive-primary-hover)]
    active:bg-[var(--ft-interactive-primary-active)]
    disabled:bg-[var(--ft-interactive-primary-disabled)]
    disabled:cursor-not-allowed
  `,
    secondary: `
    bg-[var(--ft-interactive-secondary)]
    text-[var(--ft-text-primary)]
    border border-[var(--ft-border-primary)]
    hover:bg-[var(--ft-interactive-secondary-hover)]
    active:bg-[var(--ft-interactive-secondary-active)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
    tertiary: `
    bg-transparent
    text-[var(--ft-text-primary)]
    hover:bg-[var(--ft-interactive-tertiary-hover)]
    active:bg-[var(--ft-interactive-tertiary-active)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
    contrast: `
    bg-[var(--ft-color-gray-900)]
    text-white
    hover:bg-[var(--ft-color-gray-800)]
    active:bg-[var(--ft-color-gray-700)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
};

const sizeStyles: Record<CoreButtonSize, string> = {
    xs: 'h-6 px-2 text-xs gap-1 rounded-[var(--ft-radius-sm)]',
    sm: 'h-8 px-3 text-sm gap-1.5 rounded-[var(--ft-radius-md)]',
    md: 'h-10 px-4 text-sm gap-2 rounded-[var(--ft-radius-md)]',
    lg: 'h-12 px-5 text-base gap-2 rounded-[var(--ft-radius-lg)]',
    xl: 'h-14 px-6 text-base gap-2.5 rounded-[var(--ft-radius-lg)]',
};

export const CoreButton = React.forwardRef<HTMLButtonElement, CoreButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            leftIcon,
            rightIcon,
            children,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--ft-border-focus)] focus:ring-offset-2',
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && 'w-full',
                    loading && 'pointer-events-none opacity-70',
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <span className="animate-spin mr-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
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
                    </span>
                ) : leftIcon ? (
                    <span className="flex-shrink-0">{leftIcon}</span>
                ) : null}
                {children}
                {rightIcon && !loading && (
                    <span className="flex-shrink-0">{rightIcon}</span>
                )}
            </button>
        );
    }
);

CoreButton.displayName = 'CoreButton';

export default CoreButton;
