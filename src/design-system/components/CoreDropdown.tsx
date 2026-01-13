/**
 * Featuring Design System - Core Dropdown Component
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';

export type DropdownPlacement =
    | 'top-start' | 'top-center' | 'top-end'
    | 'bottom-start' | 'bottom-center' | 'bottom-end'
    | 'left-start' | 'left-center' | 'left-end'
    | 'right-start' | 'right-center' | 'right-end';

export interface CoreDropdownProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger: React.ReactNode;
    children: React.ReactNode;
    placement?: DropdownPlacement;
    width?: number | string;
    maxHeight?: number | string;
    className?: string;
    contentClassName?: string;
}

const placementStyles: Record<DropdownPlacement, string> = {
    'top-start': 'bottom-full left-0 mb-1',
    'top-center': 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    'top-end': 'bottom-full right-0 mb-1',
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-center': 'top-full left-1/2 -translate-x-1/2 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    'left-start': 'right-full top-0 mr-1',
    'left-center': 'right-full top-1/2 -translate-y-1/2 mr-1',
    'left-end': 'right-full bottom-0 mr-1',
    'right-start': 'left-full top-0 ml-1',
    'right-center': 'left-full top-1/2 -translate-y-1/2 ml-1',
    'right-end': 'left-full bottom-0 ml-1',
};

export const CoreDropdown: React.FC<CoreDropdownProps> = ({
    open,
    onOpenChange,
    trigger,
    children,
    placement = 'bottom-start',
    width,
    maxHeight,
    className,
    contentClassName,
}) => {
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Handle click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                onOpenChange?.(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onOpenChange]);

    // Handle escape key
    React.useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange?.(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open, onOpenChange]);

    return (
        <div ref={dropdownRef} className={cn('relative inline-block', className)}>
            <div onClick={() => onOpenChange?.(!open)}>{trigger}</div>
            {open && (
                <div
                    className={cn(
                        'absolute z-[var(--ft-z-dropdown)]',
                        'bg-[var(--ft-bg-primary)] border border-[var(--ft-border-primary)]',
                        'rounded-[var(--ft-radius-lg)] shadow-[var(--ft-shadow-lg)]',
                        'overflow-hidden',
                        'animate-in fade-in zoom-in-95 duration-150',
                        placementStyles[placement],
                        contentClassName
                    )}
                    style={{
                        width: typeof width === 'number' ? `${width}px` : width,
                        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

// ============================================
// Dropdown Menu Item
// ============================================

export interface CoreDropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    danger?: boolean;
    selected?: boolean;
}

export const CoreDropdownItem = React.forwardRef<HTMLButtonElement, CoreDropdownItemProps>(
    (
        {
            leftIcon,
            rightIcon,
            danger = false,
            selected = false,
            disabled,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                    'transition-colors duration-150',
                    danger
                        ? 'text-[var(--ft-color-red-600)] hover:bg-[var(--ft-color-red-50)]'
                        : 'text-[var(--ft-text-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)]',
                    selected && 'bg-[var(--ft-color-primary-50)]',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                disabled={disabled}
                {...props}
            >
                {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                <span className="flex-1">{children}</span>
                {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                {selected && !rightIcon && (
                    <svg className="w-4 h-4 text-[var(--ft-interactive-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>
        );
    }
);

CoreDropdownItem.displayName = 'CoreDropdownItem';

// ============================================
// Dropdown Divider
// ============================================

export const CoreDropdownDivider: React.FC = () => {
    return <div className="my-1 h-px bg-[var(--ft-border-primary)]" />;
};

// ============================================
// Dropdown Label
// ============================================

export interface CoreDropdownLabelProps {
    children: React.ReactNode;
}

export const CoreDropdownLabel: React.FC<CoreDropdownLabelProps> = ({ children }) => {
    return (
        <div className="px-3 py-2 text-xs font-medium text-[var(--ft-text-tertiary)] uppercase tracking-wider">
            {children}
        </div>
    );
};

export default {
    CoreDropdown,
    CoreDropdownItem,
    CoreDropdownDivider,
    CoreDropdownLabel,
};
