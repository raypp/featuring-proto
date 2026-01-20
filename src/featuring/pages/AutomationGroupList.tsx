import { Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AutomationGroup } from "../types";
import { CoreButton, CoreDot, CoreTag } from "@/design-system";

interface AutomationGroupListProps {
    automationGroups: AutomationGroup[];
    onNavigate: (view: string) => void;
    onCreateGroup: () => void;
}

export function AutomationGroupList({ automationGroups, onNavigate, onCreateGroup }: AutomationGroupListProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'archived'>('all');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [pageSize, setPageSize] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredGroups = automationGroups.filter(group => {
        if (activeTab === 'all') return true;
        if (activeTab === 'active') return group.status === 'active';
        if (activeTab === 'archived') return group.status === 'inactive';
        return true;
    });

    const activeCount = automationGroups.filter(g => g.status === 'active').length;
    const archivedCount = automationGroups.filter(g => g.status === 'inactive').length;

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredGroups.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredGroups.map(g => g.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const getStatusBadge = (group: AutomationGroup) => {
        if (group.templateStatus === 'deployed') {
            return (
                <div className="flex items-center gap-1.5">
                    <CoreDot size="sm" color="purple" />
                    <span className="text-[13px] text-[var(--ft-color-primary-600)]">캠페인 연동됨</span>
                </div>
            );
        }
        if (group.status === 'active') {
            return (
                <div className="flex items-center gap-1.5">
                    <CoreDot size="sm" color="green" />
                    <span className="text-[13px] text-[var(--ft-color-green-600)]">활성</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col h-full">
            {/* Page Header */}
            <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] bg-[var(--ft-bg-primary)]">
                <h1 className="text-lg font-medium text-[var(--ft-text-primary)]">
                    반응 자동화 관리
                </h1>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-auto">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-medium text-[var(--ft-text-primary)]">
                        관리 목록
                    </h2>
                    <CoreButton
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={onCreateGroup}
                    >
                        새 그룹 생성
                    </CoreButton>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-4 border-b border-[var(--ft-border-primary)]">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        전체 {automationGroups.length}
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'active'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        사용 중 {activeCount}
                    </button>
                    <button
                        onClick={() => setActiveTab('archived')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'archived'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        보관됨
                    </button>
                </div>

                {/* Table */}
                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-secondary)] overflow-hidden">
                    {/* Table Header */}
                    <div className="flex items-center h-10 border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)]">
                        <div className="flex items-center gap-3 flex-1 px-4">
                            <input
                                type="checkbox"
                                checked={selectedIds.length === filteredGroups.length && filteredGroups.length > 0}
                                onChange={toggleSelectAll}
                                className="w-4 h-4 rounded border-[var(--ft-border-secondary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)]"
                            />
                            <span className="text-[13px] text-[var(--ft-text-secondary)]">
                                목록
                            </span>
                            <span className="text-xs text-[var(--ft-text-disabled)]">
                                □ {filteredGroups.length}/100
                            </span>
                        </div>
                        <div className="w-[180px] px-4">
                            <span className="text-[13px] text-[var(--ft-text-secondary)]">
                                상태
                            </span>
                        </div>
                    </div>

                    {/* Table Body */}
                    {filteredGroups.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="text-sm text-[var(--ft-text-disabled)]">
                                {activeTab === 'all' ? '생성된 그룹이 없습니다' : '해당하는 그룹이 없습니다'}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {filteredGroups.map((group) => (
                                <div
                                    key={group.id}
                                    className="flex items-center h-12 border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)] cursor-pointer transition-colors"
                                    onClick={() => onNavigate(`automation-group-detail-${group.id}`)}
                                >
                                    <div className="flex items-center gap-3 flex-1 px-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(group.id)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(group.id);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-4 h-4 rounded border-[var(--ft-border-secondary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)]"
                                        />
                                        <span className="text-sm text-[var(--ft-text-primary)]">
                                            {group.name}
                                        </span>
                                        {group.linkedCampaignId && (
                                            <CoreTag colorType="blue" size="xs">
                                                캠페인 연결
                                            </CoreTag>
                                        )}
                                        {group.templateStatus === 'deployed' && (
                                            <CoreTag colorType="gray" size="xs">
                                                보기 전용
                                            </CoreTag>
                                        )}
                                    </div>
                                    <div className="w-[180px] px-4 flex items-center justify-between">
                                        {getStatusBadge(group)}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // TODO: Show dropdown menu
                                            }}
                                            className="w-7 h-7 flex items-center justify-center rounded-[var(--ft-radius-md)] hover:bg-[var(--ft-interactive-secondary-hover)] transition-colors"
                                        >
                                            <MoreHorizontal className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] bg-[var(--ft-bg-primary)] focus:outline-none focus:border-[var(--ft-border-focus)]"
                        >
                            <option value={20}>20 / page</option>
                            <option value={50}>50 / page</option>
                            <option value={100}>100 / page</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1">
                        <CoreButton variant="tertiary" size="xs">
                            <ChevronLeft className="w-4 h-4" />
                        </CoreButton>
                        <span className="px-3 text-[13px] font-medium text-[var(--ft-text-primary)]">
                            {currentPage}
                        </span>
                        <CoreButton variant="tertiary" size="xs">
                            <ChevronRight className="w-4 h-4" />
                        </CoreButton>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="페이지 입력"
                            className="w-24 h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-border-focus)]"
                        />
                        <CoreButton variant="primary" size="xs">
                            이동
                        </CoreButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
