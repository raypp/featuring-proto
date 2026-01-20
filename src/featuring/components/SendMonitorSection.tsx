import { useState } from "react";
import {
    RefreshCw, CheckCircle, Clock, AlertTriangle, XCircle,
    ChevronDown, Download, Filter
} from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { SendLogEntry, SendStatus } from "../types";

interface SendMonitorSectionProps {
    totalCount: number;
}

// Mock Log Data
const mockLogData: SendLogEntry[] = [
    { id: 1, influencerId: 1, influencerName: "김뷰티", timestamp: "2026-01-20 17:15:32", status: "sent" },
    { id: 2, influencerId: 2, influencerName: "이패션", timestamp: "2026-01-20 17:15:28", status: "sent" },
    { id: 3, influencerId: 3, influencerName: "박라이프", timestamp: "2026-01-20 17:15:25", status: "sent" },
    { id: 4, influencerId: 4, influencerName: "최푸드", timestamp: "2026-01-20 17:15:20", status: "failed", errorMessage: "API 요청 한도 초과" },
    { id: 5, influencerId: 5, influencerName: "정트래블", timestamp: "2026-01-20 17:15:15", status: "sending" },
    { id: 6, influencerId: 6, influencerName: "한테크", timestamp: "2026-01-20 17:15:10", status: "pending" },
    { id: 7, influencerId: 7, influencerName: "오뷰티", timestamp: "2026-01-20 17:15:05", status: "pending" },
    { id: 8, influencerId: 8, influencerName: "강패션", timestamp: "2026-01-20 17:15:00", status: "pending" },
];

export function SendMonitorSection({ totalCount }: SendMonitorSectionProps) {
    const [logFilter, setLogFilter] = useState<SendStatus | 'all'>('all');
    const [selectedFailed, setSelectedFailed] = useState<number[]>([]);

    // Stats
    const sentCount = mockLogData.filter(l => l.status === 'sent').length;
    const sendingCount = mockLogData.filter(l => l.status === 'sending').length;
    const failedCount = mockLogData.filter(l => l.status === 'failed').length;
    const pendingCount = mockLogData.filter(l => l.status === 'pending').length;

    const progressPercent = ((sentCount + failedCount) / mockLogData.length) * 100;

    const filteredLogs = logFilter === 'all'
        ? mockLogData
        : mockLogData.filter(l => l.status === logFilter);

    const getStatusIcon = (status: SendStatus) => {
        switch (status) {
            case "sent": return <CheckCircle className="w-4 h-4 text-[var(--ft-color-success-500)]" />;
            case "sending": return <RefreshCw className="w-4 h-4 text-[var(--ft-color-warning-500)] animate-spin" />;
            case "failed": return <XCircle className="w-4 h-4 text-[var(--ft-color-error-500)]" />;
            case "pending": return <Clock className="w-4 h-4 text-[var(--ft-text-disabled)]" />;
        }
    };

    const getStatusLabel = (status: SendStatus) => {
        switch (status) {
            case "sent": return "발송됨";
            case "sending": return "발송중";
            case "failed": return "실패";
            case "pending": return "대기";
        }
    };

    const handleRetryFailed = () => {
        if (selectedFailed.length === 0) {
            alert("재발송할 인플루언서를 선택해주세요.");
            return;
        }
        alert(`${selectedFailed.length}명에게 재발송을 시작합니다.`);
        setSelectedFailed([]);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Progress Section */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                        발송 진행 현황
                    </h3>
                    <div className="flex items-center gap-2">
                        <CoreButton variant="tertiary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                            로그 내보내기
                        </CoreButton>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[var(--ft-text-secondary)]">
                            진행률
                        </span>
                        <span className="text-sm font-medium text-[var(--ft-text-primary)]">
                            {sentCount + failedCount} / {mockLogData.length} ({progressPercent.toFixed(0)}%)
                        </span>
                    </div>
                    <div className="h-3 bg-[var(--ft-bg-secondary)] rounded-full overflow-hidden">
                        <div className="h-full flex">
                            <div
                                className="bg-[var(--ft-color-success-500)] transition-all duration-500"
                                style={{ width: `${(sentCount / mockLogData.length) * 100}%` }}
                            />
                            <div
                                className="bg-[var(--ft-color-error-500)] transition-all duration-500"
                                style={{ width: `${(failedCount / mockLogData.length) * 100}%` }}
                            />
                            <div
                                className="bg-[var(--ft-color-warning-500)] animate-pulse transition-all duration-500"
                                style={{ width: `${(sendingCount / mockLogData.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[var(--ft-bg-secondary)] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-[var(--ft-color-success-500)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">발송 완료</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-color-success-600)]">{sentCount}</p>
                    </div>
                    <div className="bg-[var(--ft-bg-secondary)] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <RefreshCw className="w-5 h-5 text-[var(--ft-color-warning-500)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">발송중</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-color-warning-600)]">{sendingCount}</p>
                    </div>
                    <div className="bg-[var(--ft-bg-secondary)] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-5 h-5 text-[var(--ft-color-error-500)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">실패</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-color-error-600)]">{failedCount}</p>
                    </div>
                    <div className="bg-[var(--ft-bg-secondary)] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-[var(--ft-text-disabled)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">대기</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-secondary)]">{pendingCount}</p>
                    </div>
                </div>
            </div>

            {/* Log Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Log Header */}
                <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h4 className="text-sm font-medium text-[var(--ft-text-primary)]">발송 로그</h4>
                        {/* Filter */}
                        <div className="flex items-center gap-1">
                            {(['all', 'sent', 'sending', 'failed', 'pending'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setLogFilter(status)}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${logFilter === status
                                        ? 'bg-[var(--ft-color-primary-500)] text-white'
                                        : 'bg-[var(--ft-bg-secondary)] text-[var(--ft-text-secondary)] hover:bg-[var(--ft-border-primary)]'
                                        }`}
                                >
                                    {status === 'all' ? '전체' : getStatusLabel(status as SendStatus)}
                                </button>
                            ))}
                        </div>
                    </div>
                    {failedCount > 0 && (
                        <CoreButton
                            variant="primary"
                            size="sm"
                            leftIcon={<RefreshCw className="w-4 h-4" />}
                            onClick={handleRetryFailed}
                        >
                            {selectedFailed.length > 0 ? `${selectedFailed.length}명 재발송` : '실패 건 재발송'}
                        </CoreButton>
                    )}
                </div>

                {/* Log Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--ft-bg-secondary)] sticky top-0 z-10">
                            <tr className="border-b border-[var(--ft-border-secondary)]">
                                {failedCount > 0 && (
                                    <th className="w-12 px-6 py-3">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedFailed(mockLogData.filter(l => l.status === 'failed').map(l => l.id));
                                                } else {
                                                    setSelectedFailed([]);
                                                }
                                            }}
                                            className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                        />
                                    </th>
                                )}
                                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">타임스탬프</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                                <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">상태</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">오류 메시지</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr
                                    key={log.id}
                                    className={`border-b border-[var(--ft-border-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors ${log.status === 'failed' ? 'bg-red-50/50' : ''
                                        }`}
                                >
                                    {failedCount > 0 && (
                                        <td className="w-12 px-6 py-3">
                                            {log.status === 'failed' && (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFailed.includes(log.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedFailed(prev => [...prev, log.id]);
                                                        } else {
                                                            setSelectedFailed(prev => prev.filter(id => id !== log.id));
                                                        }
                                                    }}
                                                    className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                                />
                                            )}
                                        </td>
                                    )}
                                    <td className="px-4 py-3">
                                        <span className="text-xs font-mono text-[var(--ft-text-secondary)]">
                                            {log.timestamp}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <CoreAvatar name={log.influencerName} size="xs" />
                                            <span className="text-sm text-[var(--ft-text-primary)]">
                                                {log.influencerName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            {getStatusIcon(log.status)}
                                            <span className="text-xs text-[var(--ft-text-secondary)]">
                                                {getStatusLabel(log.status)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {log.errorMessage ? (
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4 text-[var(--ft-color-error-500)]" />
                                                <span className="text-xs text-[var(--ft-color-error-600)]">
                                                    {log.errorMessage}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-[var(--ft-text-disabled)]">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
