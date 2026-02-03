import { CoreButton, CoreModal } from "../../design-system";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
}

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    itemName
}: DeleteConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <CoreModal
            open={isOpen}
            onClose={onClose}
            title="삭제 확인"
            size="sm"
        >
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-[var(--ft-text-primary)]">
                            {itemName ? (
                                <>
                                    <span className="font-medium">'{itemName}'</span>을(를) 삭제하시겠습니까?
                                </>
                            ) : (
                                '정말 삭제하시겠습니까?'
                            )}
                        </p>
                        <p className="mt-1 text-xs text-[var(--ft-text-secondary)]">
                            이 작업은 되돌릴 수 없습니다.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <CoreButton
                        variant="tertiary"
                        size="md"
                        onClick={onClose}
                    >
                        취소
                    </CoreButton>
                    <CoreButton
                        variant="primary"
                        size="md"
                        onClick={handleConfirm}
                        className="!bg-red-600 hover:!bg-red-700"
                    >
                        삭제
                    </CoreButton>
                </div>
            </div>
        </CoreModal>
    );
}
