/**
 * Featuring Design System - Core Input Components
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';

// ============================================
// Status Types
// ============================================

export type CoreStatusType = 'none' | 'success' | 'warning' | 'error';
export type CoreInputSize = 'md' | 'lg';

// ============================================
// Text Input
// ============================================

export interface CoreTextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: CoreInputSize;
    status?: CoreStatusType;
    label?: string;
    helperText?: string;
    errorText?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    fullWidth?: boolean;
}

const inputSizeStyles: Record<CoreInputSize, string> = {
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
};

const inputStatusStyles: Record<CoreStatusType, string> = {
    none: 'border-[var(--ft-border-primary)] focus:border-[var(--ft-border-focus)] focus:ring-[var(--ft-border-focus)]',
    success: 'border-[var(--ft-color-green-500)] focus:border-[var(--ft-color-green-500)] focus:ring-[var(--ft-color-green-500)]',
    warning: 'border-[var(--ft-color-yellow-500)] focus:border-[var(--ft-color-yellow-500)] focus:ring-[var(--ft-color-yellow-500)]',
    error: 'border-[var(--ft-color-red-500)] focus:border-[var(--ft-color-red-500)] focus:ring-[var(--ft-color-red-500)]',
};

export const CoreTextInput = React.forwardRef<HTMLInputElement, CoreTextInputProps>(
    (
        {
            size = 'md',
            status = 'none',
            label,
            helperText,
            errorText,
            leftContent,
            rightContent,
            fullWidth = false,
            className,
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || React.useId();
        const displayMessage = status === 'error' ? errorText : helperText;

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-[var(--ft-text-primary)]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative flex items-center">
                    {leftContent && (
                        <div className="absolute left-3 flex items-center text-[var(--ft-text-tertiary)]">
                            {leftContent}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full rounded-[var(--ft-radius-md)] border bg-[var(--ft-bg-primary)] text-[var(--ft-text-primary)]',
                            'placeholder:text-[var(--ft-text-disabled)]',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--ft-bg-secondary)]',
                            'transition-colors duration-150',
                            inputSizeStyles[size],
                            inputStatusStyles[status],
                            leftContent && 'pl-10',
                            rightContent && 'pr-10',
                            className
                        )}
                        disabled={disabled}
                        {...props}
                    />
                    {rightContent && (
                        <div className="absolute right-3 flex items-center text-[var(--ft-text-tertiary)]">
                            {rightContent}
                        </div>
                    )}
                </div>
                {displayMessage && (
                    <p
                        className={cn(
                            'text-xs',
                            status === 'error' ? 'text-[var(--ft-color-red-500)]' : 'text-[var(--ft-text-secondary)]'
                        )}
                    >
                        {displayMessage}
                    </p>
                )}
            </div>
        );
    }
);

CoreTextInput.displayName = 'CoreTextInput';

// ============================================
// Textarea
// ============================================

export interface CoreTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    status?: CoreStatusType;
    label?: string;
    helperText?: string;
    errorText?: string;
    fullWidth?: boolean;
}

export const CoreTextarea = React.forwardRef<HTMLTextAreaElement, CoreTextareaProps>(
    (
        {
            status = 'none',
            label,
            helperText,
            errorText,
            fullWidth = false,
            className,
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const textareaId = id || React.useId();
        const displayMessage = status === 'error' ? errorText : helperText;

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="text-sm font-medium text-[var(--ft-text-primary)]"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(
                        'w-full rounded-[var(--ft-radius-md)] border bg-[var(--ft-bg-primary)] text-[var(--ft-text-primary)]',
                        'placeholder:text-[var(--ft-text-disabled)]',
                        'focus:outline-none focus:ring-2 focus:ring-offset-0',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--ft-bg-secondary)]',
                        'transition-colors duration-150',
                        'p-3 text-sm min-h-[100px] resize-y',
                        inputStatusStyles[status],
                        className
                    )}
                    disabled={disabled}
                    {...props}
                />
                {displayMessage && (
                    <p
                        className={cn(
                            'text-xs',
                            status === 'error' ? 'text-[var(--ft-color-red-500)]' : 'text-[var(--ft-text-secondary)]'
                        )}
                    >
                        {displayMessage}
                    </p>
                )}
            </div>
        );
    }
);

CoreTextarea.displayName = 'CoreTextarea';

// ============================================
// Checkbox
// ============================================

export interface CoreCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    helperText?: string;
}

export const CoreCheckbox = React.forwardRef<HTMLInputElement, CoreCheckboxProps>(
    ({ label, helperText, className, disabled, id, ...props }, ref) => {
        const checkboxId = id || React.useId();

        return (
            <div className="flex items-start gap-2">
                <input
                    ref={ref}
                    id={checkboxId}
                    type="checkbox"
                    className={cn(
                        'mt-0.5 h-4 w-4 rounded border-[var(--ft-border-primary)]',
                        'text-[var(--ft-interactive-primary)] focus:ring-[var(--ft-border-focus)]',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    disabled={disabled}
                    {...props}
                />
                {(label || helperText) && (
                    <div className="flex flex-col">
                        {label && (
                            <label
                                htmlFor={checkboxId}
                                className={cn(
                                    'text-sm font-medium text-[var(--ft-text-primary)]',
                                    disabled && 'opacity-50'
                                )}
                            >
                                {label}
                            </label>
                        )}
                        {helperText && (
                            <span className="text-xs text-[var(--ft-text-secondary)]">
                                {helperText}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

CoreCheckbox.displayName = 'CoreCheckbox';

// ============================================
// Toggle / Switch
// ============================================

export type CoreToggleSize = 'sm' | 'md';
export type CoreToggleTextPosition = 'left' | 'right';

export interface CoreToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    size?: CoreToggleSize;
    label?: string;
    textPosition?: CoreToggleTextPosition;
}

const toggleSizeStyles: Record<CoreToggleSize, { track: string; thumb: string; translate: string }> = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
};

export const CoreToggle = React.forwardRef<HTMLInputElement, CoreToggleProps>(
    (
        {
            size = 'md',
            label,
            textPosition = 'right',
            className,
            disabled,
            checked,
            id,
            ...props
        },
        ref
    ) => {
        const toggleId = id || React.useId();
        const sizeStyle = toggleSizeStyles[size];

        const toggle = (
            <div className="relative inline-flex items-center">
                <input
                    ref={ref}
                    id={toggleId}
                    type="checkbox"
                    className="sr-only peer"
                    disabled={disabled}
                    checked={checked}
                    {...props}
                />
                <div
                    className={cn(
                        'rounded-full transition-colors duration-200',
                        'bg-[var(--ft-color-gray-300)] peer-checked:bg-[var(--ft-interactive-primary)]',
                        'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
                        sizeStyle.track,
                        className
                    )}
                />
                <div
                    className={cn(
                        'absolute left-0.5 top-0.5 bg-white rounded-full shadow-sm transition-transform duration-200',
                        'peer-checked:' + sizeStyle.translate,
                        sizeStyle.thumb
                    )}
                />
            </div>
        );

        if (!label) return toggle;

        return (
            <label
                htmlFor={toggleId}
                className={cn(
                    'inline-flex items-center gap-2 cursor-pointer',
                    disabled && 'cursor-not-allowed',
                    textPosition === 'left' && 'flex-row-reverse'
                )}
            >
                {toggle}
                <span
                    className={cn(
                        'text-sm font-medium text-[var(--ft-text-primary)]',
                        disabled && 'opacity-50'
                    )}
                >
                    {label}
                </span>
            </label>
        );
    }
);

CoreToggle.displayName = 'CoreToggle';

export default {
    CoreTextInput,
    CoreTextarea,
    CoreCheckbox,
    CoreToggle,
};
