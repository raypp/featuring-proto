import { X } from "lucide-react";

interface DeployConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeployConfirmModal({ isOpen, onClose, onConfirm }: DeployConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-['Pretendard:Medium',sans-serif] text-lg text-[#242424]">
                        템플릿을 전달하시겠습니까?
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-[#f5f5f5] rounded transition-colors"
                    >
                        <X className="w-5 h-5 text-[#707070]" />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <span className="text-[#5e51ff] mt-0.5">•</span>
                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#424242]">
                                이 가이드는 인플루언서에게 참고용으로 전달됩니다
                            </p>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#5e51ff] mt-0.5">•</span>
                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#424242]">
                                인플루언서는 본인 말투로 자유롭게 수정할 수 있습니다
                            </p>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#f57c00] mt-0.5">•</span>
                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#424242]">
                                CTA 링크는 수정할 수 없습니다
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                    >
                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                    </button>
                    <button
                        onClick={onConfirm}
                        className="h-10 px-4 rounded bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors"
                    >
                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">전달하기</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
