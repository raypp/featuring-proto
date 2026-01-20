import { X, Eye, MessageSquare, Link as LinkIcon } from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { DMTemplate } from "../types";

interface DeliveryPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    influencer: {
        displayName: string;
        username: string;
        profileImage?: string;
    } | null;
    template: DMTemplate | null;
    variableValues: Record<string, string>;
}

export function DeliveryPreviewModal({ isOpen, onClose, influencer, template, variableValues }: DeliveryPreviewModalProps) {
    if (!isOpen || !influencer || !template) return null;

    // Replace variables in DM message
    const renderMessage = () => {
        let message = template.dmGuide || '';
        // Replace {{variable}} patterns
        Object.entries(variableValues).forEach(([key, value]) => {
            message = message.replace(new RegExp(`{{${key}}}`, 'g'), value || `[${key}]`);
        });
        return message;
    };

    // Render CTA buttons with resolved URLs
    const renderButtons = () => {
        return template.ctaLinks.map((link, idx) => {
            let url = link.url;
            if (link.isVariable && link.variableName) {
                url = variableValues[link.variableName] || `[${link.variableName}]`;
            }
            return { ...link, resolvedUrl: url, index: idx };
        });
    };

    const buttons = renderButtons();
    const hasUnresolvedVariables = buttons.some(b => b.resolvedUrl.startsWith('['));

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                            <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">전달 미리보기</h3>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg">
                            <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-6">
                        {/* Recipient Info */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--ft-border-primary)]">
                            <CoreAvatar name={influencer.displayName} size="md" />
                            <div>
                                <p className="text-sm font-medium text-[var(--ft-text-primary)]">{influencer.displayName}</p>
                                <p className="text-xs text-[var(--ft-text-secondary)]">@{influencer.username}에게 전달될 내용</p>
                            </div>
                        </div>

                        {/* DM Preview */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-4">
                            <div className="flex items-start gap-2 mb-3">
                                <MessageSquare className="w-4 h-4 text-purple-500 mt-0.5" />
                                <span className="text-xs font-medium text-purple-700">DM 메시지</span>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <p className="text-sm text-[var(--ft-text-primary)] whitespace-pre-wrap leading-relaxed">
                                    {renderMessage()}
                                </p>
                            </div>
                        </div>

                        {/* CTA Buttons Preview */}
                        {buttons.length > 0 && (
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4">
                                <div className="flex items-start gap-2 mb-3">
                                    <LinkIcon className="w-4 h-4 text-blue-500 mt-0.5" />
                                    <span className="text-xs font-medium text-blue-700">CTA 버튼</span>
                                </div>
                                <div className="space-y-2">
                                    {buttons.map((btn, idx) => (
                                        <div key={idx} className="bg-white rounded-xl p-3 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-[var(--ft-text-primary)]">
                                                    {btn.buttonName}
                                                </span>
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                                    버튼 {idx + 1}
                                                </span>
                                            </div>
                                            <div className={`text-xs px-2 py-1 rounded ${btn.resolvedUrl.startsWith('[')
                                                    ? 'bg-red-50 text-red-600'
                                                    : 'bg-gray-50 text-[var(--ft-text-secondary)]'
                                                } break-all`}>
                                                {btn.resolvedUrl.startsWith('[') ? (
                                                    <span className="flex items-center gap-1">
                                                        ⚠️ {btn.resolvedUrl} - URL 미입력
                                                    </span>
                                                ) : (
                                                    btn.resolvedUrl
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Warning if variables not resolved */}
                        {hasUnresolvedVariables && (
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                                <p className="text-sm text-yellow-800">
                                    ⚠️ 일부 변수 URL이 입력되지 않았습니다. 전달 전 URL을 입력해주세요.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] shrink-0">
                        <CoreButton variant="secondary" size="md" onClick={onClose} className="w-full">
                            닫기
                        </CoreButton>
                    </div>
                </div>
            </div>
        </>
    );
}
