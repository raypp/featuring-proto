import React, { useState, useMemo } from "react";
import { Search, Plus, Settings, CheckCircle2, X as XIcon, Send, ChevronDown, ChevronUp, ExternalLink, AlertCircle, Clock, Link } from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { CollaborationInfluencer, DMTemplate, InfluencerTemplateAssignment } from "../types";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { format } from "date-fns";
import { TemplateDetailModal } from "./TemplateDetailModal";
import { cn } from "@/app/components/ui/utils";

interface CollaborationTableProps {
    influencers: CollaborationInfluencer[];
    templates: DMTemplate[];
    selectedInfluencerId?: number; // For highlighting selected row
    onOpenTemplateModal: () => void;
    onAddInfluencer?: () => void;
    onRowClick?: (influencer: CollaborationInfluencer) => void; // Side Sheet - single mode
    onDeliveryClick?: (influencer: CollaborationInfluencer, assignment: InfluencerTemplateAssignment) => void; // Side Sheet - detail mode
    onBulkApplyTemplate?: (influencerIds: number[], templateId: number) => void;
    onBulkDeliver?: (influencerIds: number[]) => void;
    onUpdateVariable?: (influencerId: number, assignmentId: number, key: string, value: string) => void;
    onDeliverTemplate?: (influencerId: number, assignmentId: number) => void;
    onCancelDelivery?: (influencerId: number, assignmentId: number) => void;
    onAddTemplateToInfluencer?: (influencerId: number) => void;
    onSelectionChange?: (selectedIds: number[]) => void; // For bulk mode sync
}

export function CollaborationTable({
    influencers,
    templates,
    selectedInfluencerId,
    onOpenTemplateModal,
    onAddInfluencer,
    onRowClick,
    onDeliveryClick,
    onBulkApplyTemplate,
    onBulkDeliver,
    onUpdateVariable,
    onDeliverTemplate,
    onCancelDelivery,
    onAddTemplateToInfluencer,
    onSelectionChange
}: CollaborationTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInfluencerIds, setSelectedInfluencerIds] = useState<number[]>([]);
    const [bulkTemplateId, setBulkTemplateId] = useState<number | "">("");
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'delivered' | 'failed'>('all');

    // Detail Modal State (kept for backward compatibility)
    const [detailAssignment, setDetailAssignment] = useState<InfluencerTemplateAssignment | null>(null);

    // Filter Logic
    const filteredData = useMemo(() => {
        return influencers.filter(inf => {
            // Text search
            const matchesSearch = inf.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inf.username.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            let matchesStatus = true;
            if (statusFilter === 'draft') {
                matchesStatus = (inf.deliverySummary.draft || 0) > 0;
            } else if (statusFilter === 'delivered') {
                matchesStatus = inf.deliverySummary.delivered > 0;
            } else if (statusFilter === 'failed') {
                matchesStatus = inf.deliverySummary.failed > 0;
            }

            return matchesSearch && matchesStatus;
        });
    }, [influencers, searchTerm, statusFilter]);

    // Handlers
    const toggleSelection = (id: number) => {
        let newSelection: number[];
        if (selectedInfluencerIds.includes(id)) {
            newSelection = selectedInfluencerIds.filter(i => i !== id);
        } else {
            newSelection = [...selectedInfluencerIds, id];
        }
        setSelectedInfluencerIds(newSelection);
        onSelectionChange?.(newSelection);
    };

    const handleCopyLink = (assignmentId: number) => {
        const link = `https://featu.re/t/${assignmentId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert(`템플릿 링크가 복사되었습니다.\n${link}`);
        });
    };

    const toggleAll = () => {
        let newSelection: number[];
        if (selectedInfluencerIds.length === filteredData.length) {
            newSelection = [];
        } else {
            newSelection = filteredData.map(i => i.influencerId);
        }
        setSelectedInfluencerIds(newSelection);
        onSelectionChange?.(newSelection);
    };

    const handleBulkApply = () => {
        if (!bulkTemplateId || selectedInfluencerIds.length === 0) return;
        onBulkApplyTemplate?.(selectedInfluencerIds, bulkTemplateId as number);
        setBulkTemplateId("");
        setSelectedInfluencerIds([]);
        onSelectionChange?.([]);
    };

    return (
        <div className="flex flex-col h-full bg-white text-sm">
            {/* Header Controls */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--ft-border-primary)] shrink-0 bg-white z-10">
                <div className="flex items-center gap-3">
                    <div className="relative w-52">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="인플루언서 검색"
                            className="w-full h-9 pl-9 pr-4 text-sm border rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'delivered' | 'failed')}
                        className="h-9 text-sm border rounded-md px-3 text-gray-700 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="all">전체 상태</option>
                        <option value="draft">임시저장됨</option>
                        <option value="delivered">전달완료</option>
                        <option value="failed">실패</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <CoreButton variant="tertiary" size="sm" onClick={onAddInfluencer} leftIcon={<Plus className="w-4 h-4" />}>
                        인플루언서 추가
                    </CoreButton>
                    <CoreButton variant="tertiary" size="sm" onClick={onOpenTemplateModal} leftIcon={<Settings className="w-4 h-4" />}>
                        자동화 가이드 템플릿 관리
                    </CoreButton>
                </div>
            </div>

            {/* Bulk Actions */}
            <div className={cn(
                "px-4 py-2 flex items-center justify-between border-b transition-colors",
                selectedInfluencerIds.length > 0 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
            )}>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={filteredData.length > 0 && selectedInfluencerIds.length === filteredData.length}
                            onChange={toggleAll}
                        />
                        <span className={cn("text-xs font-medium", selectedInfluencerIds.length > 0 ? "text-blue-700" : "text-gray-500")}>
                            {selectedInfluencerIds.length > 0 ? `${selectedInfluencerIds.length}명 선택됨` : "전체 선택"}
                        </span>
                    </div>

                    {selectedInfluencerIds.length > 0 && (
                        <>
                            <div className="h-4 w-px bg-blue-200" />
                            <div className="flex items-center gap-2">
                                <select
                                    value={bulkTemplateId}
                                    onChange={(e) => setBulkTemplateId(e.target.value ? Number(e.target.value) : "")}
                                    className="h-8 text-xs border rounded px-2 min-w-[150px]"
                                >
                                    <option value="">템플릿 선택...</option>
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                                <CoreButton variant="secondary" size="sm" onClick={handleBulkApply} disabled={!bulkTemplateId}>
                                    일괄 적용
                                </CoreButton>
                            </div>
                            <div className="h-4 w-px bg-blue-200" />
                            <CoreButton
                                variant="primary"
                                size="sm"
                                leftIcon={<Send className="w-3 h-3" />}
                                onClick={() => onBulkDeliver?.(selectedInfluencerIds)}
                            >
                                전달
                            </CoreButton>
                        </>
                    )}
                </div>
            </div>

            {/* Table Header - Updated Columns */}
            <div className="grid grid-cols-[40px_1.8fr_100px_1fr_1.2fr_100px_40px] gap-2 px-6 py-2 bg-gray-50 border-b text-xs font-medium text-gray-500 sticky top-0">
                <div className="pl-1">#</div>
                <div>인플루언서</div>
                <div className="text-center">스튜디오 연결</div>
                <div>적용된 자동화 가이드</div>
                <div>전달 요약</div>
                <div className="text-right">마지막 전달일</div>
                <div />
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
                {filteredData.map((influencer) => {
                    const isSelected = selectedInfluencerIds.includes(influencer.influencerId);
                    const isRowHighlighted = selectedInfluencerId === influencer.influencerId;

                    return (
                        <div key={influencer.influencerId} className="flex flex-col border-b last:border-0 transition-colors">
                            {/* Master Row - Updated Columns */}
                            <div
                                className={cn(
                                    "grid grid-cols-[40px_1.8fr_100px_1fr_1.2fr_100px_40px] gap-2 px-6 py-3 items-center cursor-pointer",
                                    isRowHighlighted ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-gray-50"
                                )}
                                onClick={() => onRowClick?.(influencer)}
                            >
                                <div className="pl-1" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleSelection(influencer.influencerId)}
                                        className="rounded border-gray-300"
                                    />
                                </div>

                                {/* Influencer */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <CoreAvatar
                                        src={influencer.profileImage}
                                        name={influencer.displayName}
                                        size="sm"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{influencer.displayName}</p>
                                        <p className="text-xs text-gray-500 truncate">@{influencer.username}</p>
                                    </div>
                                </div>

                                {/* Studio Connection */}
                                <div className="flex justify-center">
                                    {influencer.isConnected ? (
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 font-normal text-[10px] h-5 px-1.5 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            연결됨
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-gray-500 bg-gray-50 font-normal text-[10px] h-5 px-1.5 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                            미연결
                                        </Badge>
                                    )}
                                </div>

                                {/* Template Summary */}
                                <div className="flex items-center gap-1.5 text-xs flex-wrap" onClick={(e) => e.stopPropagation()}>
                                    {influencer.templateAssignments.length === 0 ? (
                                        <span className="text-gray-400">템플릿 없음</span>
                                    ) : (
                                        <>
                                            {influencer.templateAssignments.slice(0, 2).map((assignment) => (
                                                <button
                                                    key={assignment.id}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-[11px] font-medium text-gray-700 transition-colors shadow-sm max-w-[120px] truncate"
                                                    onClick={() => onDeliveryClick?.(influencer, assignment)}
                                                    title={assignment.templateName}
                                                >
                                                    <span className="truncate">{assignment.templateName}</span>
                                                </button>
                                            ))}
                                            {influencer.templateAssignments.length > 2 && (
                                                <span className="text-[11px] text-gray-500 font-medium px-1.5 py-1 bg-gray-100 rounded-md">
                                                    +{influencer.templateAssignments.length - 2}개
                                                </span>
                                            )}
                                        </>
                                    )}
                                    <button
                                        className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddTemplateToInfluencer?.(influencer.influencerId);
                                        }}
                                        title="템플릿 추가"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>

                                {/* Delivery Summary */}
                                <div className="flex items-center gap-2 text-xs">
                                    {(influencer.deliverySummary.draft || 0) > 0 && (
                                        <>
                                            <span className="text-orange-600 font-medium whitespace-nowrap">임시저장 {influencer.deliverySummary.draft}</span>
                                            <span className="text-gray-300">|</span>
                                        </>
                                    )}
                                    <span className="text-green-600 font-medium whitespace-nowrap">전달 {influencer.deliverySummary.delivered}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-amber-600 font-medium whitespace-nowrap">대기 {influencer.deliverySummary.pending}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-red-600 font-medium whitespace-nowrap">실패 {influencer.deliverySummary.failed}</span>
                                </div>

                                {/* Last Delivery Date */}
                                <div className="text-right text-xs text-gray-500">
                                    {influencer.lastDeliveredAt ? format(new Date(influencer.lastDeliveredAt), 'yyyy.MM.dd') : '-'}
                                </div>

                                {/* Arrow Icon (instead of expand) */}
                                <div className="flex justify-center text-gray-400">
                                    <ChevronDown size={16} className={cn(
                                        "transform -rotate-90 transition-transform",
                                        isRowHighlighted && "text-blue-500"
                                    )} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Template Detail Modal */}
            <TemplateDetailModal
                isOpen={!!detailAssignment}
                onClose={() => setDetailAssignment(null)}
                assignment={detailAssignment}
            />
        </div>
    );
}
