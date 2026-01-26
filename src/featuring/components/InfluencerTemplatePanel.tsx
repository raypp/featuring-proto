import { useState } from "react";
import { User, Wifi, WifiOff, Plus, ChevronDown, Sparkles } from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { CollaborationInfluencer, DMTemplate, InfluencerTemplateAssignment, TemplateDeliveryStatus } from "../types";
import { TemplateCard } from "./TemplateCard";

interface InfluencerTemplatePanelProps {
    influencer: CollaborationInfluencer | null;
    availableTemplates: DMTemplate[];
    onAddTemplate?: (influencerId: number, templateId: number) => void;
    onRemoveTemplate?: (influencerId: number, assignmentId: number) => void;
    onDeliver?: (assignmentId: number) => void;
    onRetry?: (assignmentId: number) => void;
    onStop?: (assignmentId: number) => void;
    onVariableChange?: (assignmentId: number, variableName: string, value: string) => void;
}

const getAutomationStatusConfig = (status: CollaborationInfluencer['automationStatus']) => {
    switch (status) {
        case 'running':
            return { colorType: 'success' as const, label: '진행 중', type: 'filled' as const };
        case 'stopped':
            return { colorType: 'default' as const, label: '중단됨', type: 'filled' as const };
        case 'error':
            return { colorType: 'error' as const, label: '오류', type: 'filled' as const };
        default:
            return { colorType: 'default' as const, label: '-', type: 'tint' as const };
    }
};

export function InfluencerTemplatePanel({
    influencer,
    availableTemplates,
    onAddTemplate,
    onRemoveTemplate,
    onDeliver,
    onRetry,
    onStop,
    onVariableChange
}: InfluencerTemplatePanelProps) {
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);

    if (!influencer) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-[var(--ft-text-primary)] mb-2">
                    인플루언서를 선택하세요
                </h3>
                <p className="text-sm text-[var(--ft-text-secondary)]">
                    좌측 목록에서 인플루언서를 클릭하면<br />
                    상세 정보와 템플릿을 관리할 수 있습니다.
                </p>
            </div>
        );
    }

    const automationStatus = getAutomationStatusConfig(influencer.automationStatus);

    // Filter out already assigned templates
    const assignedTemplateIds = influencer.templateAssignments.map(a => a.templateId);
    const unassignedTemplates = availableTemplates.filter(t => !assignedTemplateIds.includes(t.id!));

    const handleAddTemplate = (templateId: number) => {
        onAddTemplate?.(influencer.influencerId, templateId);
        setShowTemplateSelector(false);
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Panel Header */}
            <div className="border-b border-[var(--ft-border-primary)] p-4 shrink-0">
                <div className="flex items-start gap-4">
                    <CoreAvatar
                        src={influencer.profileImage}
                        name={influencer.displayName}
                        size="lg"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-[var(--ft-text-primary)] truncate">
                                {influencer.displayName}
                            </h2>
                            <span className="text-sm text-[var(--ft-text-disabled)]">
                                @{influencer.username}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            {/* Connection Status */}
                            {influencer.isConnected ? (
                                <div className="flex items-center gap-1.5 text-green-600">
                                    <Wifi className="w-4 h-4" />
                                    <span className="text-xs font-medium">스튜디오 연결됨</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <WifiOff className="w-4 h-4" />
                                    <span className="text-xs font-medium">스튜디오 미연결</span>
                                </div>
                            )}

                            <div className="w-px h-4 bg-gray-200" />

                            {/* Automation Status */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--ft-text-secondary)]">자동화 상태:</span>
                                <CoreStatusBadge
                                    colorType={automationStatus.colorType}
                                    size="sm"
                                    type={automationStatus.type}
                                >
                                    {automationStatus.label}
                                </CoreStatusBadge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-[var(--ft-text-disabled)]">적용 템플릿</p>
                        <p className="text-lg font-bold text-[var(--ft-text-primary)]">{influencer.templateCount}개</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-[var(--ft-text-disabled)]">전달됨</p>
                        <p className="text-lg font-bold text-green-600">{influencer.deliverySummary.delivered}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-[var(--ft-text-disabled)]">대기중</p>
                        <p className="text-lg font-bold text-amber-600">{influencer.deliverySummary.pending}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-[var(--ft-text-disabled)]">실패</p>
                        <p className="text-lg font-bold text-red-600">{influencer.deliverySummary.failed}</p>
                    </div>
                </div>
            </div>

            {/* Template Cards List */}
            <div className="flex-1 overflow-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[var(--ft-text-primary)]">
                        적용된 템플릿 ({influencer.templateAssignments.length})
                    </h3>
                </div>

                {influencer.templateAssignments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Sparkles className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-[var(--ft-text-secondary)] mb-4">
                            아직 적용된 템플릿이 없습니다.<br />
                            템플릿을 추가하여 자동화를 시작하세요.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {influencer.templateAssignments.map((assignment) => (
                            <TemplateCard
                                key={assignment.id}
                                assignment={assignment}
                                onDeliver={onDeliver}
                                onRetry={onRetry}
                                onStop={onStop}
                                onVariableChange={onVariableChange}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Add Template Button */}
            <div className="border-t border-[var(--ft-border-primary)] p-4 shrink-0">
                {showTemplateSelector ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--ft-text-primary)]">
                                템플릿 선택
                            </span>
                            <button
                                onClick={() => setShowTemplateSelector(false)}
                                className="text-xs text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]"
                            >
                                취소
                            </button>
                        </div>

                        {unassignedTemplates.length === 0 ? (
                            <p className="text-sm text-[var(--ft-text-disabled)] text-center py-4">
                                모든 템플릿이 이미 적용되었습니다.
                            </p>
                        ) : (
                            <div className="space-y-2 max-h-48 overflow-auto">
                                {unassignedTemplates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => handleAddTemplate(template.id!)}
                                        className="w-full p-3 text-left border border-[var(--ft-border-primary)] rounded-lg hover:bg-gray-50 hover:border-[var(--ft-color-primary-300)] transition-colors"
                                    >
                                        <p className="text-sm font-medium text-[var(--ft-text-primary)]">
                                            {template.name}
                                        </p>
                                        <p className="text-xs text-[var(--ft-text-secondary)] mt-0.5 line-clamp-1">
                                            {template.dmGuide}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <CoreButton
                        variant="secondary"
                        size="md"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={() => setShowTemplateSelector(true)}
                        className="w-full justify-center"
                        disabled={unassignedTemplates.length === 0}
                    >
                        템플릿 추가
                    </CoreButton>
                )}
            </div>
        </div>
    );
}
