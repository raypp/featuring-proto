/**
 * Featuring Design System - Core Tooltip Component
 * Based on @featuring-corp/components
 */

import React from 'react';
import { cn } from '../utils';

export type TooltipPlacement =
    | 'top-start' | 'top-center' | 'top-end'
    | 'left-start' | 'left-center' | 'left-end'
    | 'right-start' | 'right-center' | 'right-end'
    | 'bottom-start' | 'bottom-center' | 'bottom-end'
    | 'top' | 'bottom' | 'left' | 'right';

export type TooltipEvent = 'hover' | 'click' | 'none';

export interface CoreTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    placement?: TooltipPlacement;
    trigger?: TooltipEvent;
    showArrow?: boolean;
    className?: string;
    contentClassName?: string;
    delay?: number;
}

const placementStyles: Record<TooltipPlacement, string> = {
    'top-start': 'bottom-full left-0 mb-2',
    'top-center': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-center': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'left-start': 'right-full top-0 mr-2',
    'left-center': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'left-end': 'right-full bottom-0 mr-2',
    'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'right-start': 'left-full top-0 ml-2',
    'right-center': 'left-full top-1/2 -translate-y-1/2 ml-2',
    'right-end': 'left-full bottom-0 ml-2',
    'right': 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const CoreTooltip: React.FC<CoreTooltipProps> = ({
    content,
    children,
    placement = 'top-center',
    trigger = 'hover',
    showArrow = true,
    className,
    contentClassName,
    delay = 0,
}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    const showTooltip = () => {
        if (delay > 0) {
            timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
        } else {
            setIsVisible(true);
        }
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const toggleTooltip = () => {
        setIsVisible((prev) => !prev);
    };

    const getTriggerProps = () => {
        if (trigger === 'hover') {
            return {
                onMouseEnter: showTooltip,
                onMouseLeave: hideTooltip,
                onFocus: showTooltip,
                onBlur: hideTooltip,
            };
        }
        if (trigger === 'click') {
            return {
                onClick: toggleTooltip,
            };
        }
        return {};
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={cn('relative inline-flex', className)}>
            <div {...getTriggerProps()}>{children}</div>
            {isVisible && content && (
                <div
                    className={cn(
                        'absolute z-[var(--ft-z-tooltip)] px-2.5 py-1.5',
                        'bg-[var(--ft-color-gray-900)] text-white text-xs rounded-[var(--ft-radius-md)]',
                        'whitespace-nowrap shadow-[var(--ft-shadow-lg)]',
                        'animate-in fade-in zoom-in-95 duration-150',
                        placementStyles[placement],
                        contentClassName
                    )}
                    role="tooltip"
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default CoreTooltip;
