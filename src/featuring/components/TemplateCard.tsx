import { useState } from "react";
import { ChevronDown, ChevronUp, Send, Eye, RefreshCw, Square, Lock, ExternalLink } from "lucide-react";
import { CoreButton, CoreStatusBadge } from "../../design-system";
import { InfluencerTemplateAssignment, TemplateDeliveryStatus, CTALink } from "../types";

interface TemplateCardProps {
    assignment: InfluencerTemplateAssignment;
    onDeliver?: (assignmentId: number) => void;
    onRetry?: (assignmentId: number) => void;
    onStop?: (assignmentId: number) => void;
    onViewDetails?: (assignmentId: number) => void;
    onVariableChange?: (assignmentId: number, variableName: string, value: string) => void;
    isReadOnly?: boolean;
}

const getStatusConfig = (status: TemplateDeliveryStatus) => {
    switch (status) {
        case 'delivered':
            return { colorType: 'success' as const, label: '전달됨', type: 'tint' as const };
        case 'pending':
            return { colorType: 'warning' as const, label: '대기중', type: 'tint' as const };
        case 'failed':
            return { colorType: 'error' as const, label: '실패', type: 'tint' as const };
        default:
            return { colorType: 'default' as const, label: '미전달', type: 'tint' as const };
    }
};

export function TemplateCard({
    assignment,
    onDeliver,
    onRetry,
    onStop,
    onViewDetails,
    onVariableChange,
    isReadOnly = false
}: TemplateCardProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const statusConfig = getStatusConfig(assignment.deliveryStatus);
    const isDelivered = assignment.deliveryStatus === 'delivered';
    const isPending = assignment.deliveryStatus === 'pending';
    const isFailed = assignment.deliveryStatus === 'failed';
    const isNotDelivered = assignment.deliveryStatus === 'not_delivered';

    // Extract variable fields from snapshotContent or template
    const ctaLinks: CTALink[] = assignment.snapshotContent?.ctaLinks || [];
    const variableLinks = ctaLinks.filter(link => link.isVariable);

    const renderActionButtons = () => {
        if (isNotDelivered) {
            return (
                <CoreButton
                    variant="primary"
                    size="sm"
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                    onClick={() => onDeliver?.(assignment.id)}
                    disabled={isReadOnly}
                >
                    전달하기
                </CoreButton>
            );
        }

        if (isPending) {
            return (
                <CoreButton
                    variant="secondary"
                    size="sm"
                    leftIcon={<Square className="w-3.5 h-3.5" />}
                    onClick={() => onStop?.(assignment.id)}
                >
                    중단
                </CoreButton>
            );
        }

        if (isDelivered) {
            return (
                <div className="flex items-center gap-2">
                    <CoreButton
                        variant="tertiary"
                        size="sm"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => onViewDetails?.(assignment.id)}
                    >
                        내용 보기
                    </CoreButton>
                    <CoreButton
                        variant="secondary"
                        size="sm"
                        leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                        onClick={() => onDeliver?.(assignment.id)}
                    >
                        재전달
                    </CoreButton>
                </div>
            );
        }

        if (isFailed) {
            return (
                <CoreButton
                    variant="secondary"
                    size="sm"
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    onClick={() => onRetry?.(assignment.id)}
                >
                    재시도
                </CoreButton>
            );
        }

        return null;
    };

    return (
        <div className={`border rounded-lg overflow-hidden transition-all ${isDelivered
            ? 'border-green-200 bg-green-50/30'
            : isFailed
                ? 'border-red-200 bg-red-50/30'
                : 'border-[var(--ft-border-primary)] bg-white'
            }`}>
            {/* Card Header */}
            <div
                className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[var(--ft-text-primary)]">
                                {assignment.templateName}
                            </span>
                            <span className="text-xs text-[var(--ft-text-disabled)]">
                                · 스냅샷 v{assignment.snapshotVersion}
                            </span>
                            {isDelivered && (
                                <Lock className="w-3.5 h-3.5 text-[var(--ft-text-disabled)]" />
                            )}
                        </div>
                        {assignment.deliveredAt && (
                            <span className="text-xs text-[var(--ft-text-secondary)] mt-0.5">
                                마지막 전달: {new Date(assignment.deliveredAt).toLocaleDateString('ko-KR')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <CoreStatusBadge
                        colorType={statusConfig.colorType}
                        size="sm"
                        type={statusConfig.type}
                    >
                        {statusConfig.label}
                    </CoreStatusBadge>
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                    )}
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t border-[var(--ft-border-primary)] px-4 py-4 space-y-4">
                    {/* Failure Reason */}
                    {isFailed && assignment.failReason && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                            <p className="text-xs text-red-700">
                                <span className="font-medium">실패 사유:</span> {assignment.failReason}
                            </p>
                        </div>
                    )}

                    {/* Read-only Notice for Delivered */}
                    {isDelivered && (
                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start gap-2">
                            <Lock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                            <p className="text-xs text-amber-700">
                                이미 전달된 템플릿은 스냅샷으로 고정되어 수정할 수 없습니다.
                            </p>
                        </div>
                    )}

                    {/* DM Guide Preview */}
                    {assignment.snapshotContent?.dmGuide && (
                        <div>
                            <p className="text-xs font-medium text-[var(--ft-text-secondary)] mb-2">DM 메시지</p>
                            <div className="p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-[var(--ft-text-primary)] whitespace-pre-wrap">
                                    {assignment.snapshotContent.dmGuide}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Variable Fields */}
                    {variableLinks.length > 0 && (
                        <div>
                            <p className="text-xs font-medium text-[var(--ft-text-secondary)] mb-2">변수 설정</p>
                            <div className="space-y-3">
                                {variableLinks.map((link, idx) => (
                                    <div key={idx}>
                                        <label className="block text-xs text-[var(--ft-text-secondary)] mb-1">
                                            {link.buttonName} URL
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={assignment.variables[link.variableName || `button${idx + 1}_url`] || ''}
                                                onChange={(e) => onVariableChange?.(
                                                    assignment.id,
                                                    link.variableName || `button${idx + 1}_url`,
                                                    e.target.value
                                                )}
                                                disabled={isDelivered || isReadOnly}
                                                className={`w-full h-9 px-3 pr-9 text-sm border rounded-md transition-colors ${isDelivered || isReadOnly
                                                    ? 'bg-gray-100 border-gray-200 text-[var(--ft-text-disabled)] cursor-not-allowed'
                                                    : 'bg-white border-[var(--ft-border-primary)] focus:border-[var(--ft-color-primary-500)] focus:outline-none'
                                                    }`}
                                                placeholder="https://"
                                            />
                                            {assignment.variables[link.variableName || `button${idx + 1}_url`] && (
                                                <a
                                                    href={assignment.variables[link.variableName || `button${idx + 1}_url`]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--ft-text-disabled)] hover:text-[var(--ft-color-primary-500)]"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end pt-2 border-t border-[var(--ft-border-primary)]">
                        {renderActionButtons()}
                    </div>
                </div>
            )}
        </div>
    );
}
