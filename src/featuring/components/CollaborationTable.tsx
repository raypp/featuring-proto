import React, { useState, useMemo } from "react";
import { Search, Plus, Settings, CheckCircle2, X as XIcon, Send, ChevronDown, ChevronUp, ExternalLink, AlertCircle, Clock, Link, Trash2 } from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { CollaborationInfluencer, DMTemplate, InfluencerTemplateAssignment } from "../types";
import { Badge } from "@/app/components/ui/badge";
import { format } from "date-fns";
import { TemplateDetailModal } from "./TemplateDetailModal";
import { cn } from "@/app/components/ui/utils";

interface CollaborationTableProps {
    influencers: CollaborationInfluencer[];
    templates: DMTemplate[];
    selectedInfluencerId?: number; // For highlighting selected row (Side Sheet mode) or general selection
    expandedInfluencerId?: number | null; // For Expandable Row mode
    onToggleExpand?: (id: number) => void; // For Expandable Row mode
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
    onSelectionChange?: (selectedIds: number[]) => void;
}

export function CollaborationTable({
    influencers,
    templates,
    selectedInfluencerId,
    expandedInfluencerId,
    onToggleExpand,
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

    const getDeliveryStatusBadge = (status: InfluencerTemplateAssignment['deliveryStatus'], failReason?: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 font-normal"><Clock className="w-3 h-3 mr-1" />대기중</Badge>;
            case 'delivered':
                return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 font-normal"><CheckCircle2 className="w-3 h-3 mr-1" />전달됨</Badge>;
            case 'failed':
                return (
                    <div className="flex flex-col gap-1 items-start">
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 font-normal"><AlertCircle className="w-3 h-3 mr-1" />실패</Badge>
                        {failReason && <span className="text-[10px] text-red-500">{failReason}</span>}
                    </div>
                );
            case 'not_delivered':
            default:
                return <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 font-normal">미전달</Badge>;
        }
    };

    const getAutomationStatusBadge = (status: 'running' | 'stopped' | 'error' | 'none') => {
        switch (status) {
            case 'running':
                return (
                    <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        작동중
                    </div>
                );
            case 'stopped':
                return (
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        중단됨
                    </div>
                );
            case 'error':
                return (
                    <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        오류
                    </div>
                );
            default:
                return <span className="text-gray-400">-</span>;
        }
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
                <div>템플릿 요약</div>
                <div>전달 요약</div>
                <div className="text-right">마지막 전달일</div>
                <div />
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
                {filteredData.map((influencer) => {
                    const isSelected = selectedInfluencerIds.includes(influencer.influencerId);
                    const isExpanded = expandedInfluencerId === influencer.influencerId;
                    const isRowHighlighted = selectedInfluencerId === influencer.influencerId;

                    return (
                        <div key={influencer.influencerId} className="flex flex-col border-b last:border-0 transition-colors">
                            {/* Master Row */}
                            <div
                                className={cn(
                                    "grid grid-cols-[40px_1.8fr_100px_1fr_1.2fr_100px_40px] gap-2 px-6 py-3 items-center cursor-pointer transition-colors",
                                    (isExpanded || isRowHighlighted) ? "bg-[var(--ft-bg-base)]" : "hover:bg-gray-50",
                                    isRowHighlighted && "border-l-2 border-l-blue-500 bg-blue-50/50"
                                )}
                                onClick={() => {
                                    if (onRowClick) {
                                        onRowClick(influencer);
                                    } else if (onToggleExpand) {
                                        onToggleExpand(influencer.influencerId);
                                    }
                                }}
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
                                <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                                    <span>{influencer.templateAssignments.length}개 적용</span>
                                </div>

                                {/* Delivery Summary */}
                                <div className="flex items-center gap-2 text-xs">
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

                                {/* Chevron Icon */}
                                <div className="flex justify-center text-gray-400">
                                    <ChevronDown size={16} className={cn(
                                        "transition-transform",
                                        onRowClick ? "-rotate-90" : (isExpanded && "transform rotate-180")
                                    )} />
                                </div>
                            </div>

                            {/* Detail Panel (Expanded) */}
                            {isExpanded && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                                    {/* Inner Table */}
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                        <div className="grid grid-cols-[1.5fr_100px_100px_2fr_100px_80px] gap-4 px-4 py-2.5 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500">
                                            <div>템플릿</div>
                                            <div>전달 상태</div>
                                            <div>자동화 상태</div>
                                            <div>버튼 URL</div>
                                            <div>전달일</div>
                                            <div className="text-center">액션</div>
                                        </div>

                                        {influencer.templateAssignments.length === 0 ? (
                                            <div className="p-8 text-center text-gray-400 text-sm">
                                                연결된 템플릿이 없습니다.
                                            </div>
                                        ) : (
                                            influencer.templateAssignments.map((assignment) => (
                                                <div key={assignment.id} className="grid grid-cols-[1.5fr_100px_100px_2fr_100px_80px] gap-4 px-4 py-3 items-center border-b last:border-0 border-gray-100 text-sm hover:bg-gray-50/30 transition-colors">
                                                    {/* Template Name */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5 truncate"
                                                            onClick={() => setDetailAssignment(assignment)}
                                                        >
                                                            {assignment.templateName}
                                                            <ExternalLink className="w-3 h-3" />
                                                        </button>
                                                        <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-gray-100">v{assignment.snapshotVersion}</Badge>
                                                    </div>

                                                    {/* Delivery Status */}
                                                    <div>
                                                        {getDeliveryStatusBadge(assignment.deliveryStatus, assignment.failReason)}
                                                    </div>

                                                    {/* Automation Status */}
                                                    <div>
                                                        {getAutomationStatusBadge(influencer.automationStatus)}
                                                    </div>

                                                    {/* Button URLs (Variables) */}
                                                    <div className="flex flex-col gap-1.5">
                                                        {Object.entries(assignment.variables).map(([key, value]) => {
                                                            const variableName = key === 'product_url' ? '상품 보기' : key === 'discount_url' ? '할인 받기' : '브랜드 홈'; // Mapping for demo
                                                            return (
                                                                <div key={key} className="flex items-center gap-2">
                                                                    <Badge variant="outline" className="shrink-0 text-[10px] w-16 justify-center bg-gray-50 text-gray-500">{variableName}</Badge>
                                                                    <input
                                                                        type="text"
                                                                        value={value}
                                                                        onChange={(e) => onUpdateVariable?.(influencer.influencerId, assignment.id, key, e.target.value)}
                                                                        className="w-full h-7 px-2 text-xs bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-300"
                                                                        placeholder="https://..."
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Delivery Date */}
                                                    <div className="text-gray-500 text-xs">
                                                        {assignment.deliveredAt ? format(new Date(assignment.deliveredAt), 'yyyy-MM-dd') : '-'}
                                                    </div>

                                                    {/* Action */}
                                                    <div className="flex justify-center">
                                                        {assignment.deliveryStatus === 'delivered' || assignment.deliveryStatus === 'pending' ? (
                                                            <button
                                                                onClick={() => onCancelDelivery?.(influencer.influencerId, assignment.id)}
                                                                className="px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors"
                                                            >
                                                                전달취소
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => onDeliverTemplate?.(influencer.influencerId, assignment.id)}
                                                                className="px-2.5 py-1.5 text-xs font-medium text-white bg-[var(--ft-color-primary-500)] hover:bg-[var(--ft-color-primary-600)] rounded shadow-sm transition-colors"
                                                            >
                                                                전달하기
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Add Template Action */}
                                    <div className="mt-3">
                                        <button
                                            onClick={() => onAddTemplateToInfluencer?.(influencer.influencerId)}
                                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            전달할 템플릿 추가
                                        </button>
                                    </div>
                                </div>
                            )}
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
