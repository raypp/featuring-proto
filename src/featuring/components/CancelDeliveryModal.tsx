import { X, AlertTriangle } from "lucide-react";
import { CoreButton } from "../../design-system";

interface CancelDeliveryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function CancelDeliveryModal({ isOpen, onClose, onConfirm }: CancelDeliveryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold text-[var(--ft-text-primary)]">
                        전달 취소 확인
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                    </div>
                    <p className="text-[var(--ft-text-primary)] font-medium mb-1">
                        정말로 전달을 취소하시겠습니까?
                    </p>
                    <p className="text-sm text-[var(--ft-text-secondary)]">
                        취소된 내역은 '전달 실패' 또는 '취소됨' 상태로 변경되며,<br />
                        언제든지 다시 전달할 수 있습니다.
                    </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex justify-end gap-2 bg-gray-50">
                    <CoreButton variant="secondary" onClick={onClose}>
                        돌아가기
                    </CoreButton>
                    <CoreButton
                        variant="primary"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-600 hover:bg-red-700 border-red-600"
                    >
                        전달 취소
                    </CoreButton>
                </div>
            </div>
        </div>
    );
}
