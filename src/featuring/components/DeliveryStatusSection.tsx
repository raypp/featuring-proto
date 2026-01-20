import { useState } from "react";
import {
    CheckCircle, Clock, XCircle, RefreshCw, X as XMark,
    ChevronDown, Search, Filter, MoreHorizontal, ExternalLink
} from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { AutomationInfluencer } from "../types";

type DeliveryStatus = 'delivered' | 'pending' | 'failed' | 'cancelled';

interface DeliveryRecord {
    id: number;
    influencer: AutomationInfluencer;
    status: DeliveryStatus;
    deliveredAt?: string;
    method: 'studio' | 'link';
    errorMessage?: string;
}

interface DeliveryStatusSectionProps {
    influencers: AutomationInfluencer[];
    onRetry: (ids: number[]) => void;
    onCancel: (ids: number[]) => void;
}

// Mock delivery records
const createMockRecords = (influencers: AutomationInfluencer[]): DeliveryRecord[] => {
    return influencers.slice(0, 8).map((inf, idx) => ({
        id: idx + 1,
        influencer: inf,
        status: ['delivered', 'delivered', 'delivered', 'pending', 'pending', 'failed', 'delivered', 'cancelled'][idx] as DeliveryStatus,
        deliveredAt: idx < 3 ? '2026-01-20 17:30:00' : idx < 5 ? undefined : '2026-01-20 17:25:00',
        method: inf.isConnected ? 'studio' : 'link',
        errorMessage: idx === 5 ? 'API 요청 한도 초과' : undefined
    }));
};

export function DeliveryStatusSection({ influencers, onRetry, onCancel }: DeliveryStatusSectionProps) {
    const [filter, setFilter] = useState<DeliveryStatus | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const records = createMockRecords(influencers);

    // Filter records
    const filteredRecords = records
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r =>
            r.influencer.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.influencer.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Stats
    const deliveredCount = records.filter(r => r.status === 'delivered').length;
    const pendingCount = records.filter(r => r.status === 'pending').length;
    const failedCount = records.filter(r => r.status === 'failed').length;
    const cancelledCount = records.filter(r => r.status === 'cancelled').length;

    const getStatusIcon = (status: DeliveryStatus) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="w-4 h-4 text-[var(--ft-color-success-500)]" />;
            case 'pending': return <Clock className="w-4 h-4 text-[var(--ft-color-warning-500)]" />;
            case 'failed': return <XCircle className="w-4 h-4 text-[var(--ft-color-error-500)]" />;
            case 'cancelled': return <XMark className="w-4 h-4 text-[var(--ft-text-disabled)]" />;
        }
    };

    const getStatusLabel = (status: DeliveryStatus) => {
        switch (status) {
            case 'delivered': return '전달됨';
            case 'pending': return '대기중';
            case 'failed': return '실패';
            case 'cancelled': return '취소됨';
        }
    };

    const handleRetrySelected = () => {
        const failedSelected = selectedIds.filter(id =>
            records.find(r => r.id === id)?.status === 'failed'
        );
        if (failedSelected.length > 0) {
            onRetry(failedSelected);
            setSelectedIds([]);
        }
    };

    const handleCancelSelected = () => {
        const pendingSelected = selectedIds.filter(id =>
            records.find(r => r.id === id)?.status === 'pending'
        );
        if (pendingSelected.length > 0) {
            if (confirm(`${pendingSelected.length}건의 전달을 취소하시겠습니까?`)) {
                onCancel(pendingSelected);
                setSelectedIds([]);
            }
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Stats Header */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-5">
                <h3 className="text-base font-semibold text-[var(--ft-text-primary)] mb-4">
                    전달 현황
                </h3>
                <div className="grid grid-cols-4 gap-4">
                    <button
                        onClick={() => setFilter(filter === 'delivered' ? 'all' : 'delivered')}
                        className={`p-4 rounded-xl border transition-colors ${filter === 'delivered' ? 'bg-green-50 border-green-300' : 'bg-[var(--ft-bg-secondary)] border-transparent hover:border-[var(--ft-border-primary)]'}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-[var(--ft-color-success-500)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">전달됨</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-color-success-600)]">{deliveredCount}</p>
                    </button>
                    <button
                        onClick={() => setFilter(filter === 'pending' ? 'all' : 'pending')}
                        className={`p-4 rounded-xl border transition-colors ${filter === 'pending' ? 'bg-yellow-50 border-yellow-300' : 'bg-[var(--ft-bg-secondary)] border-transparent hover:border-[var(--ft-border-primary)]'}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-[var(--ft-color-warning-500)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">대기중</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-color-warning-600)]">{pendingCount}</p>
                    </button>
                    <button
                        onClick={() => setFilter(filter === 'failed' ? 'all' : 'failed')}
                        className={`p-4 rounded-xl border transition-colors ${filter === 'failed' ? 'bg-red-50 border-red-300' : 'bg-[var(--ft-bg-secondary)] border-transparent hover:border-[var(--ft-border-primary)]'}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <XCircle className="w-4 h-4 text-[var(--ft-color-error-500)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">실패</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-color-error-600)]">{failedCount}</p>
                    </button>
                    <button
                        onClick={() => setFilter(filter === 'cancelled' ? 'all' : 'cancelled')}
                        className={`p-4 rounded-xl border transition-colors ${filter === 'cancelled' ? 'bg-gray-100 border-gray-300' : 'bg-[var(--ft-bg-secondary)] border-transparent hover:border-[var(--ft-border-primary)]'}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <XMark className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                            <span className="text-sm text-[var(--ft-text-secondary)]">취소됨</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-secondary)]">{cancelledCount}</p>
                    </button>
                </div>
            </div>

            {/* Search & Actions */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-3 flex items-center justify-between">
                <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                    <input
                        type="text"
                        placeholder="인플루언서 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--ft-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {selectedIds.length > 0 && (
                        <>
                            <span className="text-sm text-[var(--ft-text-secondary)]">{selectedIds.length}개 선택</span>
                            <CoreButton
                                variant="secondary"
                                size="sm"
                                leftIcon={<XMark className="w-4 h-4" />}
                                onClick={handleCancelSelected}
                            >
                                전달 취소
                            </CoreButton>
                            <CoreButton
                                variant="primary"
                                size="sm"
                                leftIcon={<RefreshCw className="w-4 h-4" />}
                                onClick={handleRetrySelected}
                            >
                                재전달
                            </CoreButton>
                        </>
                    )}
                </div>
            </div>

            {/* Records List */}
            <div className="flex-1 overflow-auto">
                <div className="p-6 grid gap-3">
                    {filteredRecords.map((record) => (
                        <div
                            key={record.id}
                            className={`bg-white rounded-xl border p-4 transition-colors ${selectedIds.includes(record.id)
                                    ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)]'
                                    : 'border-[var(--ft-border-primary)] hover:border-[var(--ft-color-primary-300)]'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(record.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedIds(prev => [...prev, record.id]);
                                            } else {
                                                setSelectedIds(prev => prev.filter(id => id !== record.id));
                                            }
                                        }}
                                        className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                    />
                                    <div className="flex items-center gap-3">
                                        <CoreAvatar src={record.influencer.profileImage} name={record.influencer.displayName} size="md" />
                                        <div>
                                            <p className="text-sm font-medium text-[var(--ft-text-primary)]">{record.influencer.displayName}</p>
                                            <p className="text-xs text-[var(--ft-text-disabled)]">@{record.influencer.username}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* Method */}
                                    <div className="text-center">
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">전달 방식</p>
                                        <span className="text-sm text-[var(--ft-text-secondary)]">
                                            {record.method === 'studio' ? '스튜디오' : '링크'}
                                        </span>
                                    </div>

                                    {/* Time */}
                                    <div className="text-center min-w-[120px]">
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">전달 시간</p>
                                        <span className="text-sm text-[var(--ft-text-secondary)]">
                                            {record.deliveredAt || '-'}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2 min-w-[100px]">
                                        {getStatusIcon(record.status)}
                                        <span className={`text-sm font-medium ${record.status === 'delivered' ? 'text-[var(--ft-color-success-600)]' :
                                                record.status === 'pending' ? 'text-[var(--ft-color-warning-600)]' :
                                                    record.status === 'failed' ? 'text-[var(--ft-color-error-600)]' :
                                                        'text-[var(--ft-text-disabled)]'
                                            }`}>
                                            {getStatusLabel(record.status)}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        {record.status === 'failed' && (
                                            <CoreButton
                                                variant="secondary"
                                                size="sm"
                                                leftIcon={<RefreshCw className="w-3 h-3" />}
                                                onClick={() => onRetry([record.id])}
                                            >
                                                재전달
                                            </CoreButton>
                                        )}
                                        {record.status === 'pending' && (
                                            <CoreButton
                                                variant="tertiary"
                                                size="sm"
                                                onClick={() => onCancel([record.id])}
                                            >
                                                취소
                                            </CoreButton>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {record.errorMessage && (
                                <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm text-[var(--ft-color-error-600)]">
                                        오류: {record.errorMessage}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
