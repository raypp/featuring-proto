import { useState } from "react";
import {
    Search, Filter, Clock, Link, MessageSquare, ChevronDown,
    Eye, Edit2, Send, Calendar, Zap, AlertCircle, CheckCircle
} from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { QueuedMessage, SendSpeed } from "../types";

interface SendQueueSectionProps {
    influencerCount: number;
}

// Mock Data for Queue
const mockQueueData: QueuedMessage[] = [
    { id: 1, influencerId: 1, influencerName: "김뷰티", profileImage: "", followerCount: 125000, messageType: "dm", linkSettings: ["상품 링크", "이벤트 페이지"], status: "pending" },
    { id: 2, influencerId: 2, influencerName: "이패션", profileImage: "", followerCount: 89000, messageType: "dm", linkSettings: ["상품 링크"], status: "pending" },
    { id: 3, influencerId: 3, influencerName: "박라이프", profileImage: "", followerCount: 234000, messageType: "comment_reply", linkSettings: ["상품 링크", "브랜드 페이지"], status: "sending" },
    { id: 4, influencerId: 4, influencerName: "최푸드", profileImage: "", followerCount: 56000, messageType: "dm", linkSettings: ["상품 링크"], status: "pending" },
    { id: 5, influencerId: 5, influencerName: "정트래블", profileImage: "", followerCount: 178000, messageType: "dm", linkSettings: ["이벤트 페이지"], status: "failed" },
];

export function SendQueueSection({ influencerCount }: SendQueueSectionProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sendSpeed, setSendSpeed] = useState<SendSpeed>("normal");
    const [scheduledTime, setScheduledTime] = useState("");
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewInfluencer, setPreviewInfluencer] = useState<QueuedMessage | null>(null);

    const filteredData = mockQueueData.filter(item =>
        item.influencerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredData.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(p => p !== id));
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending": return <Clock className="w-4 h-4 text-[var(--ft-text-disabled)]" />;
            case "sending": return <Zap className="w-4 h-4 text-[var(--ft-color-warning-500)]" />;
            case "sent": return <CheckCircle className="w-4 h-4 text-[var(--ft-color-success-500)]" />;
            case "failed": return <AlertCircle className="w-4 h-4 text-[var(--ft-color-error-500)]" />;
            default: return null;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending": return "대기";
            case "sending": return "발송중";
            case "sent": return "발송완료";
            case "failed": return "실패";
            default: return "-";
        }
    };

    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header Controls */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                            발송 예정 메시지
                        </h3>
                        <span className="text-sm text-[var(--ft-text-disabled)]">
                            {filteredData.length}건
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <>
                                <CoreButton variant="secondary" size="sm" leftIcon={<Edit2 className="w-4 h-4" />}>
                                    일괄 수정 ({selectedIds.length})
                                </CoreButton>
                                <CoreButton variant="primary" size="sm" leftIcon={<Send className="w-4 h-4" />}>
                                    선택 발송
                                </CoreButton>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                        <input
                            type="text"
                            placeholder="인플루언서 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--ft-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)] focus:border-transparent"
                        />
                    </div>

                    {/* Schedule Settings */}
                    <div className="flex items-center gap-2 border-l border-[var(--ft-border-primary)] pl-4">
                        <Calendar className="w-4 h-4 text-[var(--ft-text-secondary)]" />
                        <input
                            type="datetime-local"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="text-sm border border-[var(--ft-border-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                        />
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--ft-text-secondary)]">발송 속도:</span>
                        <div className="flex rounded-lg border border-[var(--ft-border-primary)] overflow-hidden">
                            {(['slow', 'normal', 'fast'] as SendSpeed[]).map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => setSendSpeed(speed)}
                                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${sendSpeed === speed
                                        ? 'bg-[var(--ft-color-primary-500)] text-white'
                                        : 'bg-white text-[var(--ft-text-secondary)] hover:bg-[var(--ft-bg-secondary)]'
                                        }`}
                                >
                                    {speed === 'slow' ? '느림' : speed === 'normal' ? '보통' : '빠름'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Queue Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="bg-[var(--ft-bg-secondary)] sticky top-0 z-10">
                        <tr className="border-b border-[var(--ft-border-secondary)]">
                            <th className="w-12 px-6 py-3">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                />
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">팔로워</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">메시지 타입</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">링크 설정</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">상태</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">미리보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b border-[var(--ft-border-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors"
                            >
                                <td className="w-12 px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                                        className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                    />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <CoreAvatar name={item.influencerName} size="sm" />
                                        <span className="text-sm font-medium text-[var(--ft-text-primary)]">
                                            {item.influencerName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className="text-sm text-[var(--ft-text-secondary)]">
                                        {formatNumber(item.followerCount)}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        {item.messageType === 'dm' ? (
                                            <MessageSquare className="w-4 h-4 text-[var(--ft-color-primary-500)]" />
                                        ) : (
                                            <MessageSquare className="w-4 h-4 text-[var(--ft-color-warning-500)]" />
                                        )}
                                        <span className="text-xs text-[var(--ft-text-secondary)]">
                                            {item.messageType === 'dm' ? 'DM' : '댓글 답장'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-1 flex-wrap">
                                        {item.linkSettings.map((link, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[var(--ft-bg-secondary)] text-[var(--ft-text-secondary)] rounded"
                                            >
                                                <Link className="w-3 h-3" />
                                                {link}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {getStatusIcon(item.status)}
                                        <span className="text-xs text-[var(--ft-text-secondary)]">
                                            {getStatusLabel(item.status)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <button
                                        onClick={() => {
                                            setPreviewInfluencer(item);
                                            setShowPreviewModal(true);
                                        }}
                                        className="p-2 rounded-lg hover:bg-[var(--ft-bg-secondary)] transition-colors"
                                    >
                                        <Eye className="w-4 h-4 text-[var(--ft-text-secondary)]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Preview Modal */}
            {showPreviewModal && previewInfluencer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-h-[80vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                            <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                                메시지 미리보기
                            </h3>
                            <button
                                onClick={() => setShowPreviewModal(false)}
                                className="text-[var(--ft-text-disabled)] hover:text-[var(--ft-text-primary)]"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CoreAvatar name={previewInfluencer.influencerName} size="md" />
                                <div>
                                    <p className="text-sm font-medium text-[var(--ft-text-primary)]">
                                        {previewInfluencer.influencerName}
                                    </p>
                                    <p className="text-xs text-[var(--ft-text-disabled)]">
                                        팔로워 {formatNumber(previewInfluencer.followerCount)}
                                    </p>
                                </div>
                            </div>

                            {/* Mock DM Preview */}
                            <div className="bg-[var(--ft-bg-secondary)] rounded-xl p-4 space-y-3">
                                <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-[var(--ft-text-primary)]">
                                    안녕하세요 {previewInfluencer.influencerName}님! 저희 브랜드와 협업 제안드립니다. 🎉
                                </div>
                                {previewInfluencer.linkSettings.map((link, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[var(--ft-color-primary-500)] text-white p-3 rounded-lg text-center font-medium text-sm"
                                    >
                                        {link} 바로가기
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex justify-end gap-2">
                            <CoreButton variant="secondary" size="sm" onClick={() => setShowPreviewModal(false)}>
                                닫기
                            </CoreButton>
                            <CoreButton variant="primary" size="sm">
                                수정하기
                            </CoreButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
