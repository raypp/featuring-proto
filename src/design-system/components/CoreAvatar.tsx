/**
 * Featuring Design System - Core Avatar Component
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn, getInitials } from '../utils';
import { globalColors } from '../tokens/colors';
import type { AvatarColorType } from '../tokens/colors';

export type CoreAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CoreAvatarShape = 'circle' | 'square';

export interface CoreAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: CoreAvatarSize;
    shape?: CoreAvatarShape;
    colorType?: AvatarColorType;
    showBorder?: boolean;
}

const sizeStyles: Record<CoreAvatarSize, { container: string; text: string }> = {
    xs: { container: 'w-6 h-6', text: 'text-[10px]' },
    sm: { container: 'w-8 h-8', text: 'text-xs' },
    md: { container: 'w-10 h-10', text: 'text-sm' },
    lg: { container: 'w-12 h-12', text: 'text-base' },
    xl: { container: 'w-16 h-16', text: 'text-lg' },
};

const colorStyles: Record<AvatarColorType, { bg: string; text: string }> = {
    gray: { bg: 'bg-gray-200', text: 'text-gray-700' },
    red: { bg: 'bg-red-100', text: 'text-red-700' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    lightGreen: { bg: 'bg-green-100', text: 'text-green-700' },
    green: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-700' },
    lightBlue: { bg: 'bg-sky-100', text: 'text-sky-700' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
    magenta: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
    burgundy: { bg: 'bg-pink-100', text: 'text-pink-700' },
    primary: { bg: 'bg-[var(--ft-color-primary-100)]', text: 'text-[var(--ft-color-primary-700)]' },
};

export const CoreAvatar = React.forwardRef<HTMLDivElement, CoreAvatarProps>(
    (
        {
            src,
            alt,
            name,
            size = 'md',
            shape = 'circle',
            colorType = 'primary',
            showBorder = false,
            className,
            ...props
        },
        ref
    ) => {
        const [imageError, setImageError] = React.useState(false);
        const initials = name ? getInitials(name) : '';
        const sizeStyle = sizeStyles[size];
        const colorStyle = colorStyles[colorType];

        return (
            <div
                ref={ref}
                className={cn(
                    'relative inline-flex items-center justify-center overflow-hidden flex-shrink-0',
                    sizeStyle.container,
                    shape === 'circle' ? 'rounded-full' : 'rounded-[var(--ft-radius-md)]',
                    showBorder && 'ring-2 ring-white',
                    !src || imageError ? colorStyle.bg : '',
                    className
                )}
                {...props}
            >
                {src && !imageError ? (
                    <img
                        src={src}
                        alt={alt || name || 'Avatar'}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <span className={cn('font-medium', sizeStyle.text, colorStyle.text)}>
                        {initials || (
                            <svg
                                className="w-1/2 h-1/2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        )}
                    </span>
                )}
            </div>
        );
    }
);

CoreAvatar.displayName = 'CoreAvatar';

export interface CoreAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    max?: number;
    size?: CoreAvatarSize;
    children: React.ReactNode;
    renderSurplus?: (surplus: number) => React.ReactNode;
}

export const CoreAvatarGroup = React.forwardRef<HTMLDivElement, CoreAvatarGroupProps>(
    ({ max = 4, size = 'md', children, renderSurplus, className, ...props }, ref) => {
        const childArray = React.Children.toArray(children);
        const visibleChildren = childArray.slice(0, max);
        const surplus = childArray.length - max;

        return (
            <div
                ref={ref}
                className={cn('flex items-center -space-x-2', className)}
                {...props}
            >
                {visibleChildren.map((child, index) =>
                    React.isValidElement<CoreAvatarProps>(child)
                        ? React.cloneElement(child, { size, showBorder: true, key: index })
                        : child
                )}
                {surplus > 0 && (
                    <div
                        className={cn(
                            'relative inline-flex items-center justify-center bg-[var(--ft-color-gray-200)] text-[var(--ft-text-secondary)] font-medium ring-2 ring-white',
                            sizeStyles[size].container,
                            sizeStyles[size].text,
                            'rounded-full'
                        )}
                    >
                        {renderSurplus ? renderSurplus(surplus) : `+${surplus}`}
                    </div>
                )}
            </div>
        );
    }
);

CoreAvatarGroup.displayName = 'CoreAvatarGroup';

export default CoreAvatar;
