import React, { useState, useMemo } from "react";
import {
    X,
    ChevronLeft,
    Send,
    Plus,
    Users,
    CheckCircle2,
    AlertCircle,
    Clock,
    ExternalLink,
    Link,
    AlertTriangle,
    FileText,
    History
} from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { CollaborationInfluencer, DMTemplate, InfluencerTemplateAssignment } from "../types";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/app/components/ui/utils";
import { SmartSendModal } from "./SmartSendModal";

export type SideSheetMode = 'empty' | 'single' | 'bulk' | 'detail';

// Draft guide data structure for temporary save
export interface DraftGuideData {
    templateId?: number;
    dmMessage: string;
    keywords: string[];
    ctaLinks: { buttonName: string; url: string; isVariable?: boolean; variableName?: string }[];
    customVariables: Record<string, string>;
    savedAt: string;
}

interface CollaborationSideSheetProps {
    mode: SideSheetMode;
    // Single mode
    selectedInfluencer?: CollaborationInfluencer;
    // Bulk mode
    selectedInfluencers?: CollaborationInfluencer[];
    // Detail mode
    selectedDelivery?: {
        influencer: CollaborationInfluencer;
        assignment: InfluencerTemplateAssignment;
    };
    // Data
    templates: DMTemplate[];
    // Draft data (loaded when switching to a saved draft)
    draftData?: DraftGuideData;
    // Callbacks
    onClose: () => void;
    onBackToInfluencer?: () => void; // For detail -> single navigation
    onDeliverTemplate?: (influencerId: number, assignmentId: number) => void;
    onCancelDelivery?: (influencerId: number, assignmentId: number) => void;
    onUpdateVariable?: (influencerId: number, assignmentId: number, key: string, value: string) => void;
    onBulkDeliver?: (influencerIds: number[]) => void;
    onViewDeliveryDetail?: (influencer: CollaborationInfluencer, assignment: InfluencerTemplateAssignment) => void;
    onAddTemplateToInfluencer?: (influencerId: number) => void;
    onSaveAsDraft?: (influencerId: number, draftData: DraftGuideData) => void;
}

type TabType = 'compose' | 'history';

export function CollaborationSideSheet({
    mode,
    selectedInfluencer,
    selectedInfluencers = [],
    selectedDelivery,
    templates,
    draftData,
    onClose,
    onBackToInfluencer,
    onDeliverTemplate,
    onCancelDelivery,
    onUpdateVariable,
    onBulkDeliver,
    onViewDeliveryDetail,
    onAddTemplateToInfluencer,
    onSaveAsDraft,
}: CollaborationSideSheetProps) {
    const [activeTab, setActiveTab] = useState<TabType>('history');
    const [bulkTemplateId, setBulkTemplateId] = useState<number | "">("");
    const [showSmartSendModal, setShowSmartSendModal] = useState(false);;

    // Count disconnected influencers in bulk mode
    const disconnectedCount = useMemo(() => {
        return selectedInfluencers.filter(inf => !inf.isConnected).length;
    }, [selectedInfluencers]);

    // Empty State
    if (mode === 'empty') {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-gray-500 p-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-center text-sm font-medium mb-2">인플루언서를 선택하세요</p>
                <p className="text-center text-xs text-gray-400 max-w-[200px]">
                    인플루언서를 선택하여 자동화 가이드를 발송하거나, 발송 내역을 확인할 수 있습니다.
                </p>
            </div>
        );
    }

    // Detail View (for specific delivery)
    if (mode === 'detail' && selectedDelivery) {
        const { influencer, assignment } = selectedDelivery;
        const isDelivered = assignment.deliveryStatus === 'delivered';
        const isPending = assignment.deliveryStatus === 'pending';
        const isFailed = assignment.deliveryStatus === 'failed';
        const isDraft = assignment.deliveryStatus === 'draft';
        const isNotDelivered = assignment.deliveryStatus === 'not_delivered';

        // Editable only when not_delivered or draft
        const isEditable = isNotDelivered || isDraft;

        return (
            <div className="h-full flex flex-col bg-white">
                {/* Header with Back Button */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3 bg-white sticky top-0 z-10">
                    <button
                        onClick={onBackToInfluencer}
                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">전송 상세</p>
                        <p className="text-xs text-gray-500">{influencer.displayName} · {assignment.templateName}</p>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Status Card */}
                    <div className={cn(
                        "p-4 rounded-lg border",
                        isDelivered && "bg-green-50 border-green-200",
                        isPending && "bg-amber-50 border-amber-200",
                        isFailed && "bg-red-50 border-red-200",
                        isDraft && "bg-orange-50 border-orange-200",
                        isNotDelivered && "bg-gray-50 border-gray-200"
                    )}>
                        <div className="flex items-center gap-2 mb-2">
                            {isDelivered && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                            {isPending && <Clock className="w-5 h-5 text-amber-600" />}
                            {isFailed && <AlertCircle className="w-5 h-5 text-red-600" />}
                            {isDraft && <Clock className="w-5 h-5 text-orange-600" />}
                            {isNotDelivered && <Clock className="w-5 h-5 text-gray-400" />}
                            <span className={cn(
                                "font-semibold",
                                isDelivered && "text-green-700",
                                isPending && "text-amber-700",
                                isFailed && "text-red-700",
                                isDraft && "text-orange-700",
                                isNotDelivered && "text-gray-600"
                            )}>
                                {isDelivered && "전달 완료"}
                                {isPending && "전달 대기중"}
                                {isFailed && "전달 실패"}
                                {isDraft && "임시 저장됨"}
                                {isNotDelivered && "미전달"}
                            </span>
                            {isEditable && (
                                <Badge variant="outline" className="ml-auto text-xs text-blue-600 border-blue-200 bg-blue-50">
                                    수정 가능
                                </Badge>
                            )}
                        </div>
                        {assignment.deliveredAt && (
                            <p className="text-xs text-gray-600">
                                전달일: {format(new Date(assignment.deliveredAt), 'yyyy.MM.dd HH:mm')}
                            </p>
                        )}
                        {isFailed && assignment.failReason && (
                            <p className="text-xs text-red-600 mt-1">사유: {assignment.failReason}</p>
                        )}
                    </div>

                    {/* STEP 1: Target Post */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 1</span>
                                <span className="text-sm font-medium text-gray-900">어떤 게시물에서 실행할까요?</span>
                            </div>
                        </div>
                        <div className="p-4">
                            {assignment.snapshotContent?.postData ? (
                                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                    <img
                                        src={assignment.snapshotContent.postData.image}
                                        alt="Post"
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {assignment.snapshotContent.postData.caption || '게시물'}
                                        </p>
                                        <p className="text-xs text-gray-500">{assignment.snapshotContent.postData.date}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50 border-dashed">
                                    <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-white/80" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">최근 게시물 1개 (기본)</p>
                                        <p className="text-xs text-gray-500 mt-0.5">인플루언서의 가장 최근 게시물에 자동화가 적용됩니다.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STEP 2: Trigger Keywords */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 2</span>
                                <span className="text-sm font-medium text-gray-900">어떤 댓글에서 응답할까요?</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1.5 block">트리거 키워드</label>
                                {assignment.snapshotContent?.triggerKeywords && assignment.snapshotContent.triggerKeywords.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {assignment.snapshotContent.triggerKeywords.map((keyword, idx) => (
                                            <span
                                                key={idx}
                                                className={cn(
                                                    "inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full",
                                                    isEditable
                                                        ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                                                        : "bg-gray-100 text-gray-600"
                                                )}
                                            >
                                                {keyword}
                                                {isEditable && (
                                                    <button className="hover:text-[#6D28D9] ml-0.5">
                                                        <X size={10} />
                                                    </button>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400">모든 댓글에 응답</p>
                                )}
                            </div>
                            {isEditable && (
                                <div className="relative">
                                    <Input
                                        placeholder="키워드 추가 (Enter)"
                                        className="h-9 bg-gray-50 border-gray-200 rounded-lg text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STEP 3: DM Message & Buttons */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 3</span>
                                <span className="text-sm font-medium text-gray-900">어떤 메시지를 보낼까요?</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            {/* DM Message */}
                            <div>
                                <label className="text-xs text-gray-500 mb-1.5 block">DM 메시지</label>
                                <textarea
                                    value={assignment.snapshotContent?.dmGuide || ''}
                                    disabled={!isEditable}
                                    placeholder="인플루언서에게 보낼 DM 메시지를 입력하세요..."
                                    className={cn(
                                        "w-full min-h-[100px] p-3 text-sm border rounded-lg resize-none transition-colors",
                                        isEditable
                                            ? "bg-white border-gray-200 focus:border-[#7C3AED] focus:outline-none"
                                            : "bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed"
                                    )}
                                />
                            </div>

                            {/* CTA Buttons */}
                            <div>
                                <label className="text-xs text-gray-500 mb-1.5 block">버튼 설정 (최대 3개)</label>
                                <div className="space-y-2">
                                    {assignment.snapshotContent?.ctaLinks && assignment.snapshotContent.ctaLinks.length > 0 ? (
                                        assignment.snapshotContent.ctaLinks.map((btn, idx) => (
                                            <div key={idx} className="bg-gray-50 p-3 rounded-lg space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-gray-600 w-16">버튼 {idx + 1}</span>
                                                    <Input
                                                        value={btn.buttonName}
                                                        disabled={!isEditable}
                                                        placeholder="버튼명"
                                                        className={cn(
                                                            "flex-1 h-8 text-sm",
                                                            !isEditable && "bg-gray-100 cursor-not-allowed"
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link size={14} className="text-gray-400 ml-16" />
                                                    <Input
                                                        value={btn.isVariable
                                                            ? (assignment.variables[btn.variableName!] || '')
                                                            : btn.url
                                                        }
                                                        disabled={!isEditable}
                                                        placeholder={btn.isVariable ? `변수: ${btn.variableName}` : "https://"}
                                                        className={cn(
                                                            "flex-1 h-8 text-sm",
                                                            !isEditable && "bg-gray-100 cursor-not-allowed",
                                                            btn.isVariable && isEditable && "border-blue-200 bg-blue-50"
                                                        )}
                                                    />
                                                    {btn.isVariable && (
                                                        <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-600 border-blue-200">
                                                            변수
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-lg">버튼이 설정되지 않았습니다.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t bg-white space-y-2">
                    {isEditable && (
                        <div className="flex gap-2">
                            <CoreButton
                                variant="secondary"
                                size="md"
                                className="flex-1"
                            >
                                임시 저장
                            </CoreButton>
                            <CoreButton
                                variant="primary"
                                size="md"
                                className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9]"
                                leftIcon={<Send className="w-4 h-4" />}
                                onClick={() => onDeliverTemplate?.(influencer.influencerId, assignment.id)}
                                disabled={!influencer.isConnected}
                            >
                                가이드 전달하기
                            </CoreButton>
                        </div>
                    )}
                    {isPending && (
                        <CoreButton
                            variant="secondary"
                            size="md"
                            className="w-full text-red-600 bg-red-50 border-red-200 hover:bg-red-100"
                            onClick={() => onCancelDelivery?.(influencer.influencerId, assignment.id)}
                        >
                            전달 취소
                        </CoreButton>
                    )}
                    {isFailed && (
                        <CoreButton
                            variant="primary"
                            size="md"
                            className="w-full"
                            onClick={() => onDeliverTemplate?.(influencer.influencerId, assignment.id)}
                            disabled={!influencer.isConnected}
                        >
                            재전송
                        </CoreButton>
                    )}
                    {isDelivered && (
                        <p className="text-center text-sm text-gray-500">전달 완료된 건은 수정할 수 없습니다.</p>
                    )}
                </div>
            </div>
        );
    }

    // Bulk Mode
    if (mode === 'bulk' && selectedInfluencers.length > 0) {
        return (
            <div className="h-full flex flex-col bg-white">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-blue-50 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-blue-900">{selectedInfluencers.length}명 선택됨</p>
                            <p className="text-xs text-blue-700">일괄 발송 모드</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-blue-100 rounded-md transition-colors">
                        <X className="w-5 h-5 text-blue-600" />
                    </button>
                </div>

                {/* Warning for disconnected */}
                {disconnectedCount > 0 && (
                    <div className="px-4 py-3 bg-amber-50 border-b border-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-800">
                            <span className="font-semibold">발송 불가 대상 {disconnectedCount}명 포함</span>
                            <p className="mt-0.5">스튜디오 미연결 인플루언서는 발송에서 제외됩니다.</p>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Template Selection */}
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">적용할 템플릿 선택</h4>
                        <select
                            value={bulkTemplateId}
                            onChange={(e) => setBulkTemplateId(e.target.value ? Number(e.target.value) : "")}
                            className="w-full h-10 text-sm border rounded-md px-3 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">템플릿을 선택하세요...</option>
                            {templates.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selected Influencers List */}
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">선택된 인플루언서</h4>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {selectedInfluencers.map(inf => (
                                <div key={inf.id} className={cn(
                                    "flex items-center gap-3 p-2 rounded-lg",
                                    inf.isConnected ? "bg-gray-50" : "bg-red-50"
                                )}>
                                    <CoreAvatar src={inf.profileImage} name={inf.displayName} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{inf.displayName}</p>
                                        <p className="text-xs text-gray-500">@{inf.username}</p>
                                    </div>
                                    {!inf.isConnected && (
                                        <Badge variant="outline" className="text-[10px] text-red-600 bg-red-100 border-red-200">
                                            미연결
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t bg-white">
                    <CoreButton
                        variant="primary"
                        size="md"
                        className="w-full"
                        leftIcon={<Send className="w-4 h-4" />}
                        disabled={!bulkTemplateId || selectedInfluencers.filter(inf => inf.isConnected).length === 0}
                        onClick={() => {
                            const connectedIds = selectedInfluencers
                                .filter(inf => inf.isConnected)
                                .map(inf => inf.influencerId);
                            onBulkDeliver?.(connectedIds);
                        }}
                    >
                        {selectedInfluencers.filter(inf => inf.isConnected).length}명에게 일괄 발송
                    </CoreButton>
                </div>
            </div>
        );
    }

    // Single Mode (Influencer Workspace)
    if (mode === 'single' && selectedInfluencer) {
        const assignments = selectedInfluencer.templateAssignments;

        return (
            <div className="h-full flex flex-col bg-white">
                {/* Header - Profile & Navigation */}
                <div className="px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            {/* Back Button (Only in Compose Mode) */}
                            {activeTab === 'compose' && (
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors -ml-1"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                                </button>
                            )}
                            <CoreAvatar src={selectedInfluencer.profileImage} name={selectedInfluencer.displayName} size="md" />
                            <div>
                                <p className="font-semibold text-gray-900">{selectedInfluencer.displayName}</p>
                                <p className="text-xs text-gray-500">@{selectedInfluencer.username}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Connection Status */}
                    <div className="flex items-center gap-2">
                        {selectedInfluencer.isConnected ? (
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 text-xs">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1" />
                                스튜디오 연결됨
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200 text-xs">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1" />
                                스튜디오 미연결
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'compose' && (
                        <div className="p-4 space-y-4">
                            {/* Header for Compose */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">새 가이드 작성</h3>
                                <button
                                    className="px-3 py-2 text-sm font-medium text-[#7C3AED] bg-[#7C3AED]/10 rounded-lg hover:bg-[#7C3AED]/20 transition-colors flex items-center gap-1.5"
                                    onClick={() => onAddTemplateToInfluencer?.(selectedInfluencer.influencerId)}
                                >
                                    <FileText className="w-4 h-4" />
                                    템플릿 불러오기
                                </button>
                            </div>

                            {/* Not connected warning */}
                            {!selectedInfluencer.isConnected && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                    <div className="text-xs text-red-800">
                                        <p className="font-semibold">스튜디오 연결 필요</p>
                                        <p className="mt-0.5">인플루언서가 스튜디오에 연결되어야 자동화 가이드를 발송할 수 있습니다.</p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 1: Target Post */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 1</span>
                                        <span className="text-sm font-medium text-gray-900">어떤 게시물에서 실행할까요?</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start gap-3">
                                        <input type="radio" checked readOnly className="mt-1 w-4 h-4 text-[#7C3AED]" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">특정 게시물 또는 릴스</p>
                                            <div className="mt-2 flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50 border-dashed">
                                                <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5 text-white/80" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">최근 게시물 1개 (기본)</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">인플루언서의 가장 최근 게시물에 자동화가 적용됩니다.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 2: Trigger */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 2</span>
                                        <span className="text-sm font-medium text-gray-900">어떤 댓글에서 응답할까요?</span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <input type="radio" checked readOnly className="mt-1 w-4 h-4 text-[#7C3AED]" />
                                        <div className="flex-1 space-y-2">
                                            <p className="text-sm font-medium text-gray-900">특정 댓글</p>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">키워드 설정 (최대 10개)</label>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="응답할 키워드를 입력 후 Enter"
                                                        className="pr-12 h-9 bg-gray-50 border-gray-200 rounded-lg text-sm"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/10</span>
                                                </div>
                                            </div>
                                            {/* Existing Keywords */}
                                            {templates.length > 0 && templates[0].triggerKeywords && templates[0].triggerKeywords.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {templates[0].triggerKeywords.map((keyword, idx) => (
                                                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-xs rounded-full">
                                                            {keyword}
                                                            <button className="hover:text-[#6D28D9]">
                                                                <X size={10} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {/* Suggested Keywords */}
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <span className="text-blue-500">💡</span> 이런 키워드는 어때요?
                                                </span>
                                                {['가격', '공동구매', '정보', '링크'].map(kw => (
                                                    <button
                                                        key={kw}
                                                        className="px-2 py-0.5 text-xs rounded-full border bg-white border-gray-200 text-gray-600 hover:border-[#7C3AED]/30 hover:text-[#7C3AED] transition-colors"
                                                    >
                                                        {kw}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 pt-2">
                                        <input type="radio" className="mt-1 w-4 h-4 text-[#7C3AED]" />
                                        <p className="text-sm font-medium text-gray-900">모든 댓글</p>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 3: DM Message */}
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 3</span>
                                        <span className="text-sm font-medium text-gray-900">어떤 메시지를 보낼까요?</span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-4">
                                    {/* DM Message Textarea */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">DM 메시지</label>
                                        <textarea
                                            placeholder="인플루언서에게 전달될 가이드 메시지를 입력하세요."
                                            className="w-full h-28 resize-none bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition-colors"
                                            defaultValue={templates.length > 0 ? templates[0].dmGuide : ''}
                                        />
                                        <p className="text-xs text-gray-400 text-right">0 / 1000자</p>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-gray-700">버튼 설정 (최대 3개)</label>
                                            <button className="px-2.5 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                                                <Plus size={12} /> 추가
                                            </button>
                                        </div>

                                        {/* Existing Buttons from template */}
                                        {templates.length > 0 && templates[0].ctaLinks && templates[0].ctaLinks.map((link, idx) => (
                                            <div key={idx} className="bg-gray-50 p-3 rounded-xl space-y-2 relative group">
                                                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100">
                                                    <X size={14} />
                                                </button>
                                                <Input
                                                    placeholder="버튼명 (예: 상품 보기)"
                                                    defaultValue={link.buttonName}
                                                    className="bg-white h-9 text-sm"
                                                />
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Link size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                                        <Input
                                                            placeholder="https://"
                                                            defaultValue={link.url}
                                                            className="pl-9 bg-white h-9 text-sm"
                                                            disabled={link.isVariable}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 min-w-[90px]">
                                                        <input
                                                            type="checkbox"
                                                            id={`var-${idx}`}
                                                            defaultChecked={link.isVariable}
                                                            className="rounded border-gray-300"
                                                        />
                                                        <label htmlFor={`var-${idx}`} className="text-xs text-gray-600 cursor-pointer">
                                                            변수 사용
                                                        </label>
                                                    </div>
                                                </div>
                                                {link.isVariable && (
                                                    <Input
                                                        placeholder="변수명 (예: product_url)"
                                                        defaultValue={link.variableName || ''}
                                                        className="bg-blue-50 border-blue-200 text-blue-700 text-sm h-8"
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        {/* If no template buttons, show empty state */}
                                        {(!templates[0]?.ctaLinks || templates[0].ctaLinks.length === 0) && (
                                            <div className="bg-gray-50 p-3 rounded-xl space-y-2">
                                                <Input
                                                    placeholder="버튼명 (예: 상품 보기)"
                                                    className="bg-white h-9 text-sm"
                                                />
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Link size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                                        <Input
                                                            placeholder="https://"
                                                            className="pl-9 bg-white h-9 text-sm"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 min-w-[90px]">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300"
                                                        />
                                                        <label className="text-xs text-gray-600 cursor-pointer">
                                                            변수 사용
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Draft Indicator Banner */}
                            {draftData && (
                                <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg mb-2">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-orange-800">임시 저장된 가이드</p>
                                        <p className="text-xs text-orange-600">
                                            {new Date(draftData.savedAt).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}에 저장됨
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="flex gap-2 pt-2">
                                <CoreButton
                                    variant="secondary"
                                    size="md"
                                    className="flex-1"
                                    onClick={() => {
                                        if (selectedInfluencer && onSaveAsDraft) {
                                            const currentDraft: DraftGuideData = {
                                                templateId: templates[0]?.id,
                                                dmMessage: templates[0]?.dmGuide || '',
                                                keywords: templates[0]?.triggerKeywords || [],
                                                ctaLinks: templates[0]?.ctaLinks || [],
                                                customVariables: {},
                                                savedAt: new Date().toISOString(),
                                            };
                                            onSaveAsDraft(selectedInfluencer.influencerId, currentDraft);
                                        }
                                    }}
                                >
                                    임시 저장
                                </CoreButton>
                                <CoreButton
                                    variant="primary"
                                    size="md"
                                    className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9]"
                                    leftIcon={<Send className="w-4 h-4" />}
                                    onClick={() => setShowSmartSendModal(true)}
                                >
                                    가이드 전달하기
                                </CoreButton>
                            </div>

                            {/* Smart Send Modal */}
                            {showSmartSendModal && selectedInfluencer && (
                                <SmartSendModal
                                    influencer={selectedInfluencer}
                                    templateName={templates[0]?.name || '새 가이드'}
                                    onClose={() => setShowSmartSendModal(false)}
                                    onSendDirect={() => {
                                        console.log('Sending directly to studio...');
                                        setShowSmartSendModal(false);
                                    }}
                                    onSendAlimTalk={(phone, withNotification) => {
                                        console.log('Sending AlimTalk to:', phone, 'with notification:', withNotification);
                                        setShowSmartSendModal(false);
                                    }}
                                    onCopyLink={(link) => {
                                        console.log('Link copied:', link);
                                    }}
                                />
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="p-4 space-y-4">
                            {/* Create New Guide Button */}
                            <button
                                onClick={() => setActiveTab('compose')}
                                className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-[#7C3AED]/40 rounded-xl bg-[#7C3AED]/5 text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold">새 가이드 작성하기</p>
                                    <p className="text-xs opacity-80">인플루언서에게 1:1 맞춤 가이드를 전달합니다</p>
                                </div>
                            </button>

                            {/* Delivery Summary Stats */}
                            <div className="grid grid-cols-4 gap-2">
                                <div className="bg-green-50 rounded-lg p-2 text-center">
                                    <p className="text-lg font-bold text-green-600">{selectedInfluencer.deliverySummary.delivered}</p>
                                    <p className="text-[10px] text-green-700">전달완료</p>
                                </div>
                                <div className="bg-amber-50 rounded-lg p-2 text-center">
                                    <p className="text-lg font-bold text-amber-600">{selectedInfluencer.deliverySummary.pending}</p>
                                    <p className="text-[10px] text-amber-700">대기중</p>
                                </div>
                                <div className="bg-red-50 rounded-lg p-2 text-center">
                                    <p className="text-lg font-bold text-red-600">{selectedInfluencer.deliverySummary.failed}</p>
                                    <p className="text-[10px] text-red-700">실패</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                    <p className="text-lg font-bold text-gray-600">{selectedInfluencer.deliverySummary.notDelivered}</p>
                                    <p className="text-[10px] text-gray-600">미전달</p>
                                </div>
                            </div>

                            {/* All Deliveries List */}
                            {assignments.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                    <History className="w-10 h-10 mb-3" />
                                    <p className="text-sm">발송 내역이 없습니다</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {/* Delivered Items */}
                                    {assignments.filter(a => a.deliveryStatus === 'delivered').length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                                전달 완료
                                            </h4>
                                            <div className="space-y-2">
                                                {assignments.filter(a => a.deliveryStatus === 'delivered').map(assignment => (
                                                    <button
                                                        key={assignment.id}
                                                        className="w-full p-3 text-left border border-green-200 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors"
                                                        onClick={() => onViewDeliveryDetail?.(selectedInfluencer, assignment)}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900">{assignment.templateName}</p>
                                                                <p className="text-xs text-gray-500 mt-0.5">
                                                                    v{assignment.snapshotVersion} · {assignment.deliveredAt && format(new Date(assignment.deliveredAt), 'yyyy.MM.dd HH:mm')}
                                                                </p>
                                                                {/* CTA Links Summary */}
                                                                {assignment.snapshotContent?.ctaLinks && assignment.snapshotContent.ctaLinks.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                                        {assignment.snapshotContent.ctaLinks.map((btn, idx) => (
                                                                            <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-white border px-1.5 py-0.5 rounded text-gray-600">
                                                                                <Link className="w-2.5 h-2.5" />
                                                                                {btn.buttonName}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Pending Items */}
                                    {assignments.filter(a => a.deliveryStatus === 'pending').length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                                대기중
                                            </h4>
                                            <div className="space-y-2">
                                                {assignments.filter(a => a.deliveryStatus === 'pending').map(assignment => (
                                                    <button
                                                        key={assignment.id}
                                                        className="w-full p-3 text-left border border-amber-200 rounded-lg bg-amber-50/50 hover:bg-amber-50 transition-colors"
                                                        onClick={() => onViewDeliveryDetail?.(selectedInfluencer, assignment)}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900">{assignment.templateName}</p>
                                                                <p className="text-xs text-gray-500 mt-0.5">v{assignment.snapshotVersion} · 전달 대기중</p>
                                                                <p className="text-xs text-amber-600 mt-1">인플루언서 확인 대기 중입니다</p>
                                                            </div>
                                                            <Badge variant="outline" className="text-[10px] text-amber-600 bg-amber-100 border-amber-300 shrink-0">
                                                                대기
                                                            </Badge>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Failed Items */}
                                    {assignments.filter(a => a.deliveryStatus === 'failed').length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                                실패
                                            </h4>
                                            <div className="space-y-2">
                                                {assignments.filter(a => a.deliveryStatus === 'failed').map(assignment => (
                                                    <button
                                                        key={assignment.id}
                                                        className="w-full p-3 text-left border border-red-200 rounded-lg bg-red-50/50 hover:bg-red-50 transition-colors"
                                                        onClick={() => onViewDeliveryDetail?.(selectedInfluencer, assignment)}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900">{assignment.templateName}</p>
                                                                <p className="text-xs text-gray-500 mt-0.5">v{assignment.snapshotVersion}</p>
                                                                {assignment.failReason && (
                                                                    <p className="text-xs text-red-600 mt-1">실패 사유: {assignment.failReason}</p>
                                                                )}
                                                            </div>
                                                            <Badge variant="outline" className="text-[10px] text-red-600 bg-red-100 border-red-300 shrink-0">
                                                                실패
                                                            </Badge>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Not Delivered Items */}
                                    {assignments.filter(a => a.deliveryStatus === 'not_delivered').length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                미전달
                                            </h4>
                                            <div className="space-y-2">
                                                {assignments.filter(a => a.deliveryStatus === 'not_delivered').map(assignment => (
                                                    <button
                                                        key={assignment.id}
                                                        className="w-full p-3 text-left border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100 transition-colors"
                                                        onClick={() => onViewDeliveryDetail?.(selectedInfluencer, assignment)}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900">{assignment.templateName}</p>
                                                                <p className="text-xs text-gray-500 mt-0.5">v{assignment.snapshotVersion} · 아직 전달되지 않음</p>
                                                            </div>
                                                            <Badge variant="outline" className="text-[10px] text-gray-500 bg-gray-100 border-gray-300 shrink-0">
                                                                미전달
                                                            </Badge>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Fallback
    return null;
}
