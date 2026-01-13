/**
 * Featuring Design System - Core Modal Component
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';
import { CoreButton } from './CoreButton';

export type CoreModalSize = 'sm' | 'md' | 'lg';
export type CoreModalStatus = 'none' | 'danger';
export type CoreModalActionsJustify = 'start' | 'center' | 'end' | 'between';

export interface CoreModalProps {
    open: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    size?: CoreModalSize;
    status?: CoreModalStatus;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    actions?: React.ReactNode[];
    actionsJustify?: CoreModalActionsJustify;
}

const modalSizeStyles: Record<CoreModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
};

const actionsJustifyStyles: Record<CoreModalActionsJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
};

export const CoreModal: React.FC<CoreModalProps> = ({
    open,
    onClose,
    title,
    description,
    children,
    size = 'md',
    status = 'none',
    showCloseButton = true,
    closeOnOverlayClick = true,
    actions,
    actionsJustify = 'end',
}) => {
    // Handle escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open && onClose) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[var(--ft-z-modal)] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={closeOnOverlayClick ? onClose : undefined}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    'relative w-full mx-4 bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-xl)] shadow-[var(--ft-shadow-xl)]',
                    'animate-in fade-in zoom-in-95 duration-200',
                    modalSizeStyles[size]
                )}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-start justify-between p-6 pb-0">
                        <div className="flex-1">
                            {title && (
                                <h2
                                    className={cn(
                                        'text-lg font-semibold',
                                        status === 'danger'
                                            ? 'text-[var(--ft-color-red-600)]'
                                            : 'text-[var(--ft-text-primary)]'
                                    )}
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-[var(--ft-text-secondary)]">
                                    {description}
                                </p>
                            )}
                        </div>
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-shrink-0 ml-4 p-1 rounded-[var(--ft-radius-md)] text-[var(--ft-text-tertiary)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                {children && (
                    <div className="p-6">
                        {children}
                    </div>
                )}

                {/* Actions */}
                {actions && actions.length > 0 && (
                    <div
                        className={cn(
                            'flex items-center gap-3 p-6 pt-0',
                            actionsJustifyStyles[actionsJustify]
                        )}
                    >
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================
// Confirm Modal (Preset)
// ============================================

export interface CoreConfirmModalProps {
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    status?: CoreModalStatus;
    loading?: boolean;
}

export const CoreConfirmModal: React.FC<CoreConfirmModalProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = '확인',
    cancelText = '취소',
    status = 'none',
    loading = false,
}) => {
    return (
        <CoreModal
            open={open}
            onClose={onClose}
            title={title}
            description={description}
            size="sm"
            status={status}
            actions={[
                <CoreButton
                    key="cancel"
                    variant="secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </CoreButton>,
                <CoreButton
                    key="confirm"
                    variant={status === 'danger' ? 'primary' : 'primary'}
                    onClick={onConfirm}
                    loading={loading}
                    className={status === 'danger' ? 'bg-[var(--ft-interactive-danger)] hover:bg-[var(--ft-interactive-danger-hover)]' : ''}
                >
                    {confirmText}
                </CoreButton>,
            ]}
        />
    );
};

export default CoreModal;
