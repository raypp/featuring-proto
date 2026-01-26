import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { CoreButton } from "../../design-system";

interface DeliveryConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: {
        influencerName: string;
        templateName: string;
    } | null;
}

export function DeliveryConfirmationModal({ isOpen, onClose, onConfirm, data }: DeliveryConfirmationModalProps) {
    const [isAgreed, setIsAgreed] = useState(false);

    if (!isOpen || !data) return null;

    const handleConfirm = () => {
        if (isAgreed) {
            onConfirm();
            setIsAgreed(false); // Reset for next time
            onClose();
        }
    };

    const handleClose = () => {
        setIsAgreed(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-[480px] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold text-[var(--ft-text-primary)]">
                        템플릿 전달 확인
                    </h2>
                    <button onClick={handleClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-[var(--ft-text-primary)] mb-1">
                            <strong>{data.influencerName}</strong>님에게 <strong>{data.templateName}</strong>을(를)<br />
                            전달하시겠습니까?
                        </p>
                        <p className="text-sm text-[var(--ft-text-secondary)]">
                            전달 후에는 수정할 수 없으며, 인플루언서에게 DM이 발송됩니다.
                        </p>
                    </div>

                    {/* Policy Box */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                        <div className="flex items-start gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                            <span className="text-sm font-semibold text-[var(--ft-text-primary)]">주의사항 및 정책 안내</span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-[var(--ft-text-secondary)] space-y-1 ml-1">
                            <li>자동화 템플릿은 인스타그램 커뮤니티 가이드라인을 준수해야 합니다.</li>
                            <li>과도한 메시지 발송은 계정 제한의 원인이 될 수 있습니다.</li>
                            <li>수신자의 동의 없는 광고성 메시지 전송은 금지됩니다.</li>
                        </ul>
                    </div>

                    {/* Agreement Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)]"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                        />
                        <span className="text-sm text-[var(--ft-text-primary)] font-medium">
                            위 정책을 확인하였으며, 템플릿 전달에 동의합니다.
                        </span>
                    </label>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex justify-end gap-2 bg-gray-50">
                    <CoreButton variant="secondary" onClick={handleClose}>
                        취소
                    </CoreButton>
                    <CoreButton variant="primary" onClick={handleConfirm} disabled={!isAgreed}>
                        전달하기
                    </CoreButton>
                </div>
            </div>
        </div>
    );
}
