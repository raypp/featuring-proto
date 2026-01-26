import React, { useState, useMemo } from "react";
import { Search, Plus, Settings, CheckCircle2, X as XIcon, Send, ChevronDown, ChevronUp, ExternalLink, AlertCircle, Clock } from "lucide-react";
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
    onOpenTemplateModal: () => void;
    onAddInfluencer?: () => void;
    onBulkApplyTemplate?: (influencerIds: number[], templateId: number) => void;
    onBulkDeliver?: (influencerIds: number[]) => void;
    onUpdateVariable?: (influencerId: number, assignmentId: number, key: string, value: string) => void;
    onDeliverTemplate?: (influencerId: number, assignmentId: number) => void;
    onCancelDelivery?: (influencerId: number, assignmentId: number) => void;
    onAddTemplateToInfluencer?: (influencerId: number) => void;
}

export function CollaborationTable({
    influencers,
    templates,
    onOpenTemplateModal,
    onAddInfluencer,
    onBulkApplyTemplate,
    onBulkDeliver,
    onUpdateVariable,
    onDeliverTemplate,
    onCancelDelivery,
    onAddTemplateToInfluencer
}: CollaborationTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInfluencerIds, setSelectedInfluencerIds] = useState<number[]>([]);
    const [expandedInfluencerId, setExpandedInfluencerId] = useState<number | null>(null);
    const [bulkTemplateId, setBulkTemplateId] = useState<number | "">("");

    // Detail Modal State
    const [detailAssignment, setDetailAssignment] = useState<InfluencerTemplateAssignment | null>(null);

    // Filter Logic
    const filteredData = useMemo(() => {
        return influencers.filter(inf =>
            inf.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [influencers, searchTerm]);

    // Handlers
    const toggleSelection = (id: number) => {
        setSelectedInfluencerIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedInfluencerIds.length === filteredData.length) {
            setSelectedInfluencerIds([]);
        } else {
            setSelectedInfluencerIds(filteredData.map(i => i.influencerId));
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedInfluencerId(prev => prev === id ? null : id);
    };

    const handleBulkApply = () => {
        if (!bulkTemplateId || selectedInfluencerIds.length === 0) return;
        onBulkApplyTemplate?.(selectedInfluencerIds, bulkTemplateId as number);
        setBulkTemplateId("");
        setSelectedInfluencerIds([]);
    };

    return (
        <div className="flex flex-col h-full bg-white text-sm">
            {/* Header Controls */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--ft-border-primary)] shrink-0 bg-white z-10">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="인플루언서 검색"
                        className="w-full h-9 pl-9 pr-4 text-sm border rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <CoreButton variant="tertiary" size="sm" onClick={onAddInfluencer} leftIcon={<Plus className="w-4 h-4" />}>
                        인플루언서 추가
                    </CoreButton>
                    <CoreButton variant="tertiary" size="sm" onClick={onOpenTemplateModal} leftIcon={<Settings className="w-4 h-4" />}>
                        템플릿 관리
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
                    const isExpanded = expandedInfluencerId === influencer.influencerId;
                    const isSelected = selectedInfluencerIds.includes(influencer.influencerId);

                    return (
                        <div key={influencer.influencerId} className="flex flex-col border-b last:border-0 hover:bg-gray-50 transition-colors">
                            {/* Master Row - Updated Columns */}
                            <div
                                className={cn(
                                    "grid grid-cols-[40px_1.8fr_100px_1fr_1.2fr_100px_40px] gap-2 px-6 py-3 items-center cursor-pointer",
                                    isExpanded ? "bg-blue-50/50" : ""
                                )}
                                onClick={() => toggleExpand(influencer.influencerId)}
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
                                <div className="flex items-center gap-1 text-xs">
                                    <span className={cn("font-medium", influencer.templateCount > 0 ? "text-blue-600" : "text-gray-400")}>
                                        {influencer.templateCount}개 적용
                                    </span>
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

                                {/* Expand Icon */}
                                <div className="flex justify-center text-gray-400">
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </div>

                            {/* Detail Table (Expanded) - Updated Columns */}
                            {isExpanded && (
                                <div className="bg-gray-50/80 p-4 border-t shadow-inner">
                                    <div className="bg-white rounded-lg border overflow-hidden">
                                        <table className="w-full text-xs">
                                            <thead className="bg-gray-100 border-b text-gray-500">
                                                <tr>
                                                    <th className="px-4 py-2 text-left font-medium w-[200px]">템플릿</th>
                                                    <th className="px-4 py-2 text-left font-medium w-[90px]">전달 상태</th>
                                                    <th className="px-4 py-2 text-left font-medium w-[90px]">자동화 상태</th>
                                                    <th className="px-4 py-2 text-left font-medium">버튼 URL</th>
                                                    <th className="px-4 py-2 text-left font-medium w-[90px]">전달일</th>
                                                    <th className="px-4 py-2 text-right font-medium w-[120px]">액션</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {influencer.templateAssignments.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                                            할당된 템플릿이 없습니다.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    influencer.templateAssignments.map((assignment) => {
                                                        const buttons = assignment.snapshotContent?.ctaLinks || [];
                                                        const isDelivered = assignment.deliveryStatus === 'delivered';
                                                        const isPending = assignment.deliveryStatus === 'pending';
                                                        const isNotDelivered = assignment.deliveryStatus === 'not_delivered';
                                                        const isFailed = assignment.deliveryStatus === 'failed';

                                                        // URL editing is disabled if already delivered
                                                        const isUrlDisabled = isDelivered;

                                                        return (
                                                            <tr key={assignment.id} className="hover:bg-gray-50">
                                                                {/* Template Name */}
                                                                <td className="px-4 py-3 align-middle">
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="font-medium text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                                                                            onClick={() => setDetailAssignment(assignment)}
                                                                        >
                                                                            {assignment.templateName}
                                                                            <ExternalLink size={10} />
                                                                        </div>
                                                                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-gray-50 text-gray-500">
                                                                            v{assignment.snapshotVersion}
                                                                        </Badge>
                                                                    </div>
                                                                </td>

                                                                {/* Delivery Status */}
                                                                <td className="px-4 py-3 align-middle">
                                                                    {isDelivered && <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle2 size={12} /> 전달됨</span>}
                                                                    {isPending && <span className="text-amber-600 font-medium flex items-center gap-1"><Clock size={12} /> 대기중</span>}
                                                                    {isFailed && <span className="text-red-600 font-medium flex items-center gap-1"><AlertCircle size={12} /> 실패</span>}
                                                                    {isNotDelivered && <span className="text-gray-400">미전달</span>}
                                                                </td>

                                                                {/* Automation Status */}
                                                                <td className="px-4 py-3 align-middle">
                                                                    <div className="flex items-center gap-1">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                                        <span className="text-gray-600">작동중</span>
                                                                    </div>
                                                                </td>

                                                                {/* Button URL */}
                                                                <td className="px-4 py-3 align-middle">
                                                                    <div className="flex flex-col gap-1.5">
                                                                        {buttons.length === 0 && <span className="text-gray-400">-</span>}
                                                                        {buttons.map((btn, idx) => {
                                                                            if (!btn.isVariable || !btn.variableName) return null;

                                                                            return (
                                                                                <div key={idx} className="flex items-center gap-2">
                                                                                    <span className="text-gray-500 w-14 text-right shrink-0 truncate text-[11px] bg-gray-100 px-1 rounded">
                                                                                        {btn.buttonName}
                                                                                    </span>
                                                                                    <Input
                                                                                        className={cn(
                                                                                            "h-7 text-xs flex-1 min-w-[180px]",
                                                                                            isUrlDisabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                                                        )}
                                                                                        placeholder="https://..."
                                                                                        defaultValue={assignment.variables[btn.variableName] || ''}
                                                                                        disabled={isUrlDisabled}
                                                                                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                                                                            if (!isUrlDisabled) {
                                                                                                onUpdateVariable?.(
                                                                                                    influencer.influencerId,
                                                                                                    assignment.id,
                                                                                                    btn.variableName!,
                                                                                                    e.target.value
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </td>

                                                                {/* Delivery Date */}
                                                                <td className="px-4 py-3 align-middle text-gray-500">
                                                                    {assignment.deliveredAt ? format(new Date(assignment.deliveredAt), 'MM.dd HH:mm') : '-'}
                                                                </td>

                                                                {/* Action Button */}
                                                                <td className="px-4 py-3 align-middle text-right whitespace-nowrap">
                                                                    {isNotDelivered && (
                                                                        <CoreButton
                                                                            size="sm"
                                                                            variant="primary"
                                                                            onClick={() => onDeliverTemplate?.(influencer.influencerId, assignment.id)}
                                                                        >
                                                                            전달하기
                                                                        </CoreButton>
                                                                    )}
                                                                    {isPending && (
                                                                        <CoreButton
                                                                            size="sm"
                                                                            variant="secondary"
                                                                            className="text-red-600 bg-red-50 border-red-200 hover:bg-red-100"
                                                                            onClick={() => onCancelDelivery?.(influencer.influencerId, assignment.id)}
                                                                        >
                                                                            전달취소
                                                                        </CoreButton>
                                                                    )}
                                                                    {isDelivered && (
                                                                        <CoreButton
                                                                            size="sm"
                                                                            variant="tertiary"
                                                                            disabled
                                                                        >
                                                                            전달완료
                                                                        </CoreButton>
                                                                    )}
                                                                    {isFailed && (
                                                                        <CoreButton
                                                                            size="sm"
                                                                            variant="secondary"
                                                                            onClick={() => onDeliverTemplate?.(influencer.influencerId, assignment.id)}
                                                                        >
                                                                            재시도
                                                                        </CoreButton>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                )}
                                            </tbody>
                                        </table>

                                        {/* Add Template Button - Full Width at Bottom */}
                                        <button
                                            className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 border-t transition-colors"
                                            onClick={() => onAddTemplateToInfluencer?.(influencer.influencerId)}
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
