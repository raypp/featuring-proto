import { useState } from "react";
import { Plus, Zap, BarChart3 } from "lucide-react";
import { CoreButton, CoreTag } from "../../design-system";
import { AutomationGroupSummary } from "../types";
import { AddAutomationModal } from "./AddAutomationModal";

interface CampaignAutomationDashboardProps {
    campaignInfluencerCount: number;
    formatNumber: (value: number) => string;
    onNavigateToAutomation?: (automationId: number) => void;
    onAddAutomation?: (automation: AutomationGroupSummary) => void;
    existingAutomations?: AutomationGroupSummary[];
}

export function CampaignAutomationDashboard({
    campaignInfluencerCount,
    formatNumber,
    onNavigateToAutomation,
    onAddAutomation,
    existingAutomations = []
}: CampaignAutomationDashboardProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [localAutomations, setLocalAutomations] = useState<AutomationGroupSummary[]>(existingAutomations);

    const goToAutomationDetail = (id: number) => {
        if (onNavigateToAutomation) {
            onNavigateToAutomation(id);
        } else {
            console.log(`Navigate to: /automation-groups/${id}`);
        }
    };

    const handleAddAutomation = (automation: AutomationGroupSummary) => {
        setLocalAutomations(prev => [...prev, automation]);
        // Notify parent to sync with global state
        if (onAddAutomation) {
            onAddAutomation(automation);
        }
    };

    return (
        <>
            <div className="space-y-6">
                {/* Summary Stats Section (Read-Only) */}
                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-5">
                    <h3 className="text-sm font-semibold text-[var(--ft-text-primary)] mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[var(--ft-text-secondary)]" />
                        전체 반응 성과 요약
                    </h3>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs text-[var(--ft-text-secondary)]">총 참여 인플루언서</p>
                            <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                                {formatNumber(localAutomations.reduce((acc, curr) => acc + (curr.stats?.participation || 0), 0))}
                                <span className="text-sm font-normal text-[var(--ft-text-disabled)] ml-1">명</span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-[var(--ft-text-secondary)]">총 발송</p>
                            <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                                {formatNumber(localAutomations.reduce((acc, curr) => acc + (curr.stats?.sent || 0), 0))}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-[var(--ft-text-secondary)]">총 클릭</p>
                            <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                                {formatNumber(localAutomations.reduce((acc, curr) => acc + (curr.stats?.click || 0), 0))}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-[var(--ft-text-secondary)]">평균 CTR</p>
                            <p className="text-2xl font-bold text-[var(--ft-color-primary-600)]">
                                {localAutomations.length > 0
                                    ? (localAutomations.reduce((acc, curr) => acc + (curr.stats?.ctr || 0), 0) / localAutomations.length).toFixed(1)
                                    : '0.0'}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Connected Automations List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-semibold text-[var(--ft-text-primary)]">
                            연결된 반응 자동화 ({localAutomations.length})
                        </h3>
                        <CoreButton
                            variant="primary"
                            size="sm"
                            leftIcon={<Plus className="w-4 h-4" />}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            반응 자동화 추가
                        </CoreButton>
                    </div>

                    {localAutomations.length === 0 ? (
                        <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] border-dashed p-12 text-center">
                            <div className="w-12 h-12 rounded-full bg-[var(--ft-bg-secondary)] flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-6 h-6 text-[var(--ft-text-disabled)]" />
                            </div>
                            <p className="text-[var(--ft-text-primary)] font-medium mb-1">연결된 반응 자동화가 없습니다</p>
                            <p className="text-sm text-[var(--ft-text-secondary)] mb-6">새로운 자동화를 생성하거나 기존 자동화를 연결해보세요.</p>
                            <CoreButton variant="primary" onClick={() => setIsAddModalOpen(true)}>
                                반응 자동화 추가
                            </CoreButton>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {localAutomations.map((automation) => (
                                <div
                                    key={automation.id}
                                    onClick={() => goToAutomationDetail(automation.id)}
                                    className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] hover:border-[var(--ft-color-primary-400)] hover:shadow-md transition-all cursor-pointer group p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${automation.status === 'running' ? 'bg-green-100 text-green-600' :
                                                automation.status === 'stopped' ? 'bg-gray-100 text-gray-500' :
                                                    'bg-orange-100 text-orange-500'
                                                }`}>
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="text-base font-semibold text-[var(--ft-text-primary)] group-hover:text-[var(--ft-color-primary-600)] transition-colors">
                                                        {automation.name}
                                                    </h4>
                                                    <CoreTag color={automation.status === 'running' ? 'green' : automation.status === 'stopped' ? 'gray' : 'orange'} size="sm">
                                                        {automation.status === 'running' ? '운영중' : automation.status === 'stopped' ? '중단' : '준비중'}
                                                    </CoreTag>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-[var(--ft-text-secondary)]">
                                                    <span>발송 {automation.stats?.sent || 0}</span>
                                                    <span className="w-px h-3 bg-[var(--ft-border-primary)]"></span>
                                                    <span>클릭 {automation.stats?.click || 0}</span>
                                                    <span className="w-px h-3 bg-[var(--ft-border-primary)]"></span>
                                                    <span>CTR {automation.stats?.ctr?.toFixed(1) || '0.0'}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-xs text-[var(--ft-text-disabled)] mb-0.5">설정 완료</p>
                                                <p className="text-sm font-medium text-[var(--ft-text-primary)]">
                                                    {automation.setupDoneCount} <span className="text-[var(--ft-text-disabled)]">/ {automation.influencerCount}</span>
                                                </p>
                                            </div>
                                            <CoreButton
                                                variant="secondary"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    goToAutomationDetail(automation.id);
                                                }}
                                            >
                                                상세 보기
                                            </CoreButton>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for adding automations */}
            <AddAutomationModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                campaignInfluencerCount={campaignInfluencerCount}
                onCreateNew={handleAddAutomation}
                onLinkExisting={handleAddAutomation}
            />
        </>
    );
}
