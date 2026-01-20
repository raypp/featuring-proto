import { useState } from "react";
import { X, Upload, AlertCircle, Check } from "lucide-react";
import { CoreButton } from "../../design-system";

interface BulkUrlInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    variableName: string;
    selectedCount: number;
    onApply: (mode: 'common' | 'individual', data: string | Record<string, string>) => void;
}

export function BulkUrlInputModal({ isOpen, onClose, variableName, selectedCount, onApply }: BulkUrlInputModalProps) {
    const [mode, setMode] = useState<'common' | 'individual'>('common');
    const [commonUrl, setCommonUrl] = useState('');
    const [individualInput, setIndividualInput] = useState('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    if (!isOpen) return null;

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return url.startsWith('http://') || url.startsWith('https://');
        }
    };

    const handleApply = () => {
        setValidationErrors([]);

        if (mode === 'common') {
            if (!commonUrl.trim()) {
                setValidationErrors(['URL을 입력해주세요']);
                return;
            }
            if (!validateUrl(commonUrl)) {
                setValidationErrors(['올바른 URL 형식이 아닙니다 (http:// 또는 https://로 시작)']);
                return;
            }
            onApply('common', commonUrl);
            onClose();
        } else {
            const errors: string[] = [];
            const result: Record<string, string> = {};

            const lines = individualInput.trim().split('\n');
            lines.forEach((line, idx) => {
                const parts = line.split(',').map(p => p.trim());
                if (parts.length < 2) {
                    errors.push(`${idx + 1}번 줄: 형식 오류 (핸들, URL 형식 필요)`);
                    return;
                }
                const handle = parts[0].replace('@', '');
                const url = parts[1];
                if (!validateUrl(url)) {
                    errors.push(`${idx + 1}번 줄: ${handle} - URL 형식 오류`);
                    return;
                }
                result[handle] = url;
            });

            if (errors.length > 0) {
                setValidationErrors(errors);
                return;
            }
            onApply('individual', result);
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Upload className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                            <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                                URL 일괄 입력
                            </h3>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg">
                            <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-6">
                        <p className="text-sm text-[var(--ft-text-secondary)] mb-4">
                            선택한 <strong>{selectedCount}명</strong>에게 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[var(--ft-color-primary-600)]">{variableName}</code> URL을 입력합니다.
                        </p>

                        {/* Mode Toggle */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setMode('common')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${mode === 'common'
                                        ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-700)]'
                                        : 'border-[var(--ft-border-primary)] text-[var(--ft-text-secondary)] hover:border-[var(--ft-border-secondary)]'
                                    }`}
                            >
                                공통 URL 적용
                            </button>
                            <button
                                onClick={() => setMode('individual')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${mode === 'individual'
                                        ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-700)]'
                                        : 'border-[var(--ft-border-primary)] text-[var(--ft-text-secondary)] hover:border-[var(--ft-border-secondary)]'
                                    }`}
                            >
                                개별 URL 입력
                            </button>
                        </div>

                        {mode === 'common' ? (
                            <div>
                                <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-2">
                                    공통 URL
                                </label>
                                <input
                                    type="url"
                                    value={commonUrl}
                                    onChange={(e) => setCommonUrl(e.target.value)}
                                    placeholder="https://brand.com/product/1"
                                    className="w-full px-4 py-3 border border-[var(--ft-border-primary)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                />
                                <p className="text-xs text-[var(--ft-text-disabled)] mt-2">
                                    선택한 모든 인플루언서에게 동일한 URL이 적용됩니다.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-2">
                                    핸들별 URL (한 줄에 하나씩)
                                </label>
                                <textarea
                                    value={individualInput}
                                    onChange={(e) => setIndividualInput(e.target.value)}
                                    placeholder={`@beauty_dahyun, https://brand.com/product/1\n@lifestyle_mina, https://brand.com/product/2\n@fashion_jisoo, https://brand.com/product/3`}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-[var(--ft-border-primary)] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                />
                                <p className="text-xs text-[var(--ft-text-disabled)] mt-2">
                                    형식: @핸들, URL (쉼표로 구분, 줄바꿈으로 구분)
                                </p>
                            </div>
                        )}

                        {/* Validation Errors */}
                        {validationErrors.length > 0 && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        {validationErrors.map((err, idx) => (
                                            <p key={idx} className="text-sm text-red-600">{err}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex gap-3 shrink-0">
                        <CoreButton variant="secondary" size="md" onClick={onClose} className="flex-1">
                            취소
                        </CoreButton>
                        <CoreButton
                            variant="primary"
                            size="md"
                            onClick={handleApply}
                            leftIcon={<Check className="w-4 h-4" />}
                            className="flex-1"
                        >
                            적용하기
                        </CoreButton>
                    </div>
                </div>
            </div>
        </>
    );
}
