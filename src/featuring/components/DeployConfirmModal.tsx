import { CoreModal, CoreButton } from "@/design-system";

interface DeployConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeployConfirmModal({ isOpen, onClose, onConfirm }: DeployConfirmModalProps) {
    return (
        <CoreModal
            open={isOpen}
            onClose={onClose}
            title="템플릿을 전달하시겠습니까?"
            size="sm"
            actions={[
                <CoreButton
                    key="cancel"
                    variant="secondary"
                    onClick={onClose}
                >
                    취소
                </CoreButton>,
                <CoreButton
                    key="confirm"
                    variant="primary"
                    onClick={onConfirm}
                    className="bg-[var(--ft-color-orange-500)] hover:bg-[var(--ft-color-orange-600)]"
                >
                    전달하기
                </CoreButton>,
            ]}
        >
            <ul className="space-y-3">
                <li className="flex items-start gap-2">
                    <span className="text-[var(--ft-color-orange-500)] mt-0.5">•</span>
                    <p className="text-sm text-[var(--ft-text-secondary)]">
                        이 가이드는 인플루언서에게 참고용으로 전달됩니다
                    </p>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-[var(--ft-color-orange-500)] mt-0.5">•</span>
                    <p className="text-sm text-[var(--ft-text-secondary)]">
                        인플루언서는 본인 말투로 자유롭게 수정할 수 있습니다
                    </p>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-[var(--ft-color-red-500)] mt-0.5">•</span>
                    <p className="text-sm text-[var(--ft-text-secondary)]">
                        CTA 링크는 수정할 수 없습니다
                    </p>
                </li>
            </ul>
        </CoreModal>
    );
}
