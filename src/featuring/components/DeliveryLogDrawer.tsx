import { X, RefreshCw, XCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";

interface DeliveryLogEntry {
    timestamp: string;
    action: 'created' | 'delivered' | 'failed' | 'retried' | 'cancelled';
    message: string;
    errorCode?: string;
}

interface DeliveryLogDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    influencer: {
        id: number;
        displayName: string;
        username: string;
        profileImage?: string;
        templateName?: string;
        status: 'pending' | 'sent' | 'failed' | 'cancelled' | undefined;
        errorCode?: string;
        errorMessage?: string;
        lastDeliveredAt?: string;
    } | null;
    onRetry: (id: number) => void;
    onCancel: (id: number) => void;
}

// Error code definitions
const ERROR_CODES: Record<string, { label: string; description: string; retryable: boolean }> = {
    URL_MISSING: { label: 'URL 누락', description: '필수 URL이 입력되지 않았습니다.', retryable: false },
    URL_INVALID: { label: 'URL 형식 오류', description: 'URL 형식이 올바르지 않습니다.', retryable: false },
    TEMPLATE_MISSING: { label: '템플릿 미선택', description: '템플릿이 선택되지 않았습니다.', retryable: false },
    API_ERROR: { label: 'API 오류', description: '서버와 통신 중 오류가 발생했습니다.', retryable: true },
    RATE_LIMIT: { label: '요청 한도 초과', description: '잠시 후 다시 시도해주세요.', retryable: true },
    PERMISSION_DENIED: { label: '권한 없음', description: '스튜디오 연동 권한이 필요합니다.', retryable: false },
    ACCOUNT_BLOCKED: { label: '계정 차단', description: '인플루언서 계정이 차단 상태입니다.', retryable: false },
};

// Mock log data generator
const generateMockLogs = (status?: string): DeliveryLogEntry[] => {
    const logs: DeliveryLogEntry[] = [
        { timestamp: '2026-01-20 14:30:00', action: 'created', message: '전달 항목 생성됨' },
    ];

    if (status === 'sent') {
        logs.push({ timestamp: '2026-01-20 14:30:05', action: 'delivered', message: '스튜디오에 전달 완료' });
    } else if (status === 'failed') {
        logs.push({ timestamp: '2026-01-20 14:30:05', action: 'failed', message: '전달 실패', errorCode: 'API_ERROR' });
        logs.push({ timestamp: '2026-01-20 14:35:00', action: 'retried', message: '재전달 시도' });
        logs.push({ timestamp: '2026-01-20 14:35:05', action: 'failed', message: '전달 실패', errorCode: 'RATE_LIMIT' });
    } else if (status === 'cancelled') {
        logs.push({ timestamp: '2026-01-20 14:30:05', action: 'cancelled', message: '사용자에 의해 취소됨' });
    }

    return logs.reverse();
};

export function DeliveryLogDrawer({ isOpen, onClose, influencer, onRetry, onCancel }: DeliveryLogDrawerProps) {
    if (!isOpen || !influencer) return null;

    const logs = generateMockLogs(influencer.status);
    const errorInfo = influencer.errorCode ? ERROR_CODES[influencer.errorCode] : null;

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'sent':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'failed':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-gray-400" />;
            default:
                return <Clock className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusLabel = (status?: string) => {
        switch (status) {
            case 'sent': return '전달됨';
            case 'failed': return '실패';
            case 'pending': return '대기중';
            case 'cancelled': return '취소됨';
            default: return '미전달';
        }
    };

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'delivered':
                return <div className="w-2 h-2 rounded-full bg-green-500" />;
            case 'failed':
                return <div className="w-2 h-2 rounded-full bg-red-500" />;
            case 'retried':
                return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
            case 'cancelled':
                return <div className="w-2 h-2 rounded-full bg-gray-400" />;
            default:
                return <div className="w-2 h-2 rounded-full bg-blue-500" />;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            {/* Drawer */}
            <div className="fixed right-0 top-0 bottom-0 w-[420px] bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                    <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">전달 상세</h3>
                    <button onClick={onClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg">
                        <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    {/* Influencer Info */}
                    <div className="px-6 py-5 border-b border-[var(--ft-border-primary)]">
                        <div className="flex items-center gap-4 mb-4">
                            <CoreAvatar name={influencer.displayName} size="lg" />
                            <div>
                                <p className="text-base font-medium text-[var(--ft-text-primary)]">{influencer.displayName}</p>
                                <p className="text-sm text-[var(--ft-text-secondary)]">@{influencer.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-[var(--ft-text-disabled)] mb-1">템플릿</p>
                                <p className="text-sm text-[var(--ft-text-primary)]">{influencer.templateName || '미선택'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[var(--ft-text-disabled)] mb-1">현재 상태</p>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(influencer.status)}
                                    <span className="text-sm font-medium">{getStatusLabel(influencer.status)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Details (if failed) */}
                    {influencer.status === 'failed' && errorInfo && (
                        <div className="px-6 py-4 bg-red-50 border-b border-red-100">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-red-800">{errorInfo.label}</p>
                                    <p className="text-sm text-red-600 mt-1">{errorInfo.description}</p>
                                    {influencer.lastDeliveredAt && (
                                        <p className="text-xs text-red-500 mt-2">발생 시각: {influencer.lastDeliveredAt}</p>
                                    )}
                                    {errorInfo.retryable && (
                                        <CoreStatusBadge colorType="warning" type="tint" size="sm" className="mt-2">
                                            재시도 가능
                                        </CoreStatusBadge>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delivery Timeline */}
                    <div className="px-6 py-5">
                        <h4 className="text-sm font-medium text-[var(--ft-text-primary)] mb-4">전달 이력</h4>
                        <div className="space-y-4">
                            {logs.map((log, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-1.5">{getActionIcon(log.action)}</div>
                                    <div className="flex-1">
                                        <p className="text-sm text-[var(--ft-text-primary)]">{log.message}</p>
                                        {log.errorCode && (
                                            <p className="text-xs text-red-500 mt-0.5">
                                                오류 코드: {log.errorCode}
                                            </p>
                                        )}
                                        <p className="text-xs text-[var(--ft-text-disabled)] mt-0.5">{log.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex gap-3 shrink-0">
                    {influencer.status === 'pending' && (
                        <CoreButton
                            variant="secondary"
                            size="md"
                            leftIcon={<XCircle className="w-4 h-4" />}
                            onClick={() => {
                                if (confirm('전달을 취소하시겠습니까?')) {
                                    onCancel(influencer.id);
                                    onClose();
                                }
                            }}
                            className="flex-1"
                        >
                            전달 취소
                        </CoreButton>
                    )}
                    {(influencer.status === 'failed' || influencer.status === 'sent') && (
                        <CoreButton
                            variant="primary"
                            size="md"
                            leftIcon={<RefreshCw className="w-4 h-4" />}
                            onClick={() => {
                                onRetry(influencer.id);
                                onClose();
                            }}
                            className="flex-1"
                        >
                            재전달
                        </CoreButton>
                    )}
                    {!influencer.status && (
                        <p className="text-sm text-[var(--ft-text-disabled)] text-center w-full">
                            전달 전 상태입니다
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
