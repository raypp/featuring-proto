import { X, Lock, Unlock, ExternalLink, RefreshCw, AlertTriangle, FileText, Send, MessageSquare, Image as ImageIcon } from "lucide-react";
import { AutomationInfluencer, DMTemplate } from "../types";
import { CoreButton, CoreStatusBadge, CoreAvatar } from "../../design-system";

interface InfluencerDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    influencer: AutomationInfluencer | null;
    masterTemplate?: DMTemplate;
    onSave: (id: number, updates: Partial<AutomationInfluencer>) => void;
}

export function InfluencerDetailDrawer({ isOpen, onClose, influencer, masterTemplate, onSave }: InfluencerDetailDrawerProps) {
    if (!isOpen || !influencer) return null;

    const isActive = influencer.automationStatus === 'active' || influencer.automationStatus === 'updating';
    const isMockLive = influencer.reviewStatus === 'modified'; // Simulate if influencer changed settings

    return (
        <div className="absolute inset-y-0 right-0 w-[480px] bg-white shadow-[-4px_0_16px_rgba(0,0,0,0.1)] z-50 flex flex-col border-l border-[var(--ft-border-primary)] transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[var(--ft-border-primary)] flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-[var(--ft-text-primary)]">인플루언서 설정 상세</h3>
                    <CoreStatusBadge colorType={isActive ? "success" : "default"} type="tint">
                        {isActive ? "작동중 (Live)" : "제안 대기 (Draft)"}
                    </CoreStatusBadge>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 text-[var(--ft-text-secondary)] hover:bg-[var(--ft-bg-secondary)] rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50">
                {/* Profile Card */}
                <div className="bg-white rounded-xl border border-[var(--ft-border-primary)] p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CoreAvatar src={influencer.profileImage} name={influencer.displayName} size="md" />
                        <div>
                            <div className="font-bold text-[var(--ft-text-primary)] text-lg">{influencer.displayName}</div>
                            <div className="text-sm text-[var(--ft-text-secondary)]">@{influencer.username}</div>
                        </div>
                    </div>
                    <a href={`https://instagram.com/${influencer.username}`} target="_blank" rel="noreferrer" className="text-[var(--ft-color-primary-600)] hover:underline text-sm flex items-center gap-1">
                        프로필 보기 <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                {/* Main Content Area */}
                {isActive ? (
                    // ACTIVE STATE: Show comparison or Live Data
                    <div className="space-y-6">
                        {isMockLive && (
                            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 flex gap-3 text-orange-800">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <div className="text-sm">
                                    <p className="font-bold mb-1">설정 불일치 감지</p>
                                    <p>인플루언서가 스튜디오 앱에서 설정을 변경했습니다. 제안하신 내용과 다를 수 있습니다.</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white border border-[var(--ft-border-primary)] rounded-xl overflow-hidden shadow-sm">
                            <div className="px-5 py-3 border-b border-[var(--ft-border-secondary)] bg-gray-50 flex justify-between items-center">
                                <h4 className="font-bold text-[var(--ft-text-primary)] flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4 text-green-600" />
                                    현재 적용 데이터 (Live)
                                </h4>
                                <span className="text-xs text-[var(--ft-text-disabled)]">마지막 동기화: 10분 전</span>
                            </div>
                            <div className="p-5 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--ft-text-secondary)] uppercase">버튼 1 (Custom)</label>
                                    <div className="p-3 bg-gray-50 rounded border border-[var(--ft-border-secondary)] text-sm font-medium text-[var(--ft-text-primary)] break-all">
                                        {influencer.customUrl || '-'}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--ft-text-secondary)] uppercase">버튼 2</label>
                                    <div className="p-3 bg-gray-50 rounded border border-[var(--ft-border-secondary)] text-sm font-medium text-[var(--ft-text-primary)] break-all">
                                        {influencer.button2Url || '-'}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--ft-text-secondary)] uppercase">버튼 3</label>
                                    <div className="p-3 bg-gray-50 rounded border border-[var(--ft-border-secondary)] text-sm font-medium text-[var(--ft-text-primary)] break-all">
                                        {influencer.button3Url || '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // DRAFT STATE: Show Proposal Preview (ALL STEPS)
                    <div className="space-y-6">
                        {/* Step 1: Target Post */}
                        <div className="bg-white border border-[var(--ft-border-primary)] rounded-xl overflow-hidden shadow-sm">
                            <div className="px-5 py-3 border-b border-[var(--ft-border-secondary)] bg-gray-50">
                                <h4 className="font-bold text-[var(--ft-text-primary)] flex items-center gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-[var(--ft-color-primary-100)] text-[var(--ft-color-primary-600)] flex items-center justify-center text-xs mr-1">1</span>
                                    대상 게시물
                                </h4>
                            </div>
                            <div className="p-5">
                                {masterTemplate?.postData ? (
                                    <div className="flex gap-4 p-3 border border-[var(--ft-border-secondary)] rounded-lg bg-gray-50">
                                        <img src={masterTemplate.postData.image} alt="Target Post" className="w-16 h-16 object-cover rounded bg-gray-200" />
                                        <div className="flex flex-col justify-center">
                                            <p className="text-sm font-medium text-[var(--ft-text-primary)] line-clamp-1">{masterTemplate.postData.caption}</p>
                                            <p className="text-xs text-[var(--ft-text-secondary)] mt-1">{masterTemplate.postData.date}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 p-4 border border-[var(--ft-border-secondary)] rounded-lg bg-gray-50 border-dashed">
                                        <ImageIcon className="w-8 h-8 text-[var(--ft-text-disabled)]" />
                                        <div>
                                            <p className="text-sm font-medium text-[var(--ft-text-primary)]">최근 게시물 1개 (기본)</p>
                                            <p className="text-xs text-[var(--ft-text-secondary)]">인플루언서의 가장 최근 게시물에 자동화가 적용됩니다.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 2: Trigger */}
                        <div className="bg-white border border-[var(--ft-border-primary)] rounded-xl overflow-hidden shadow-sm">
                            <div className="px-5 py-3 border-b border-[var(--ft-border-secondary)] bg-gray-50">
                                <h4 className="font-bold text-[var(--ft-text-primary)] flex items-center gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-[var(--ft-color-primary-100)] text-[var(--ft-color-primary-600)] flex items-center justify-center text-xs mr-1">2</span>
                                    반응 조건 (Trigger)
                                </h4>
                            </div>
                            <div className="p-5">
                                {masterTemplate?.triggerKeywords && masterTemplate.triggerKeywords.length > 0 ? (
                                    <div className="space-y-2">
                                        <p className="text-sm text-[var(--ft-text-secondary)] mb-2">다음 키워드가 포함된 댓글에 반응:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {masterTemplate.triggerKeywords.map((keyword, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 p-4 border border-[var(--ft-border-secondary)] rounded-lg bg-gray-50 border-dashed">
                                        <MessageSquare className="w-5 h-5 text-[var(--ft-text-disabled)]" />
                                        <p className="text-sm text-[var(--ft-text-secondary)]">모든 댓글에 반응 (키워드 없음)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 3: DM Message (Existing) */}
                        <div className="bg-white border border-[var(--ft-border-primary)] rounded-xl overflow-hidden shadow-sm">
                            <div className="px-5 py-3 border-b border-[var(--ft-border-secondary)] bg-gray-50">
                                <h4 className="font-bold text-[var(--ft-text-primary)] flex items-center gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-[var(--ft-color-primary-100)] text-[var(--ft-color-primary-600)] flex items-center justify-center text-xs mr-1">3</span>
                                    DM 메시지 & 버튼 (Preview)
                                </h4>
                            </div>
                            <div className="p-5 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--ft-text-secondary)] uppercase">버튼 1 URL</label>
                                    <div className="relative">
                                        <input
                                            className="w-full p-2 pl-3 pr-10 border border-[var(--ft-border-primary)] rounded hover:border-[var(--ft-border-secondary)] focus:border-[var(--ft-color-primary-500)] focus:ring-1 focus:ring-[var(--ft-color-primary-500)] outline-none transition-all text-sm"
                                            value={influencer.customUrl || ''}
                                            readOnly
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {influencer.isLinkLocked ? <Lock className="w-4 h-4 text-gray-400" /> : <Unlock className="w-4 h-4 text-[var(--ft-color-primary-500)]" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--ft-text-secondary)] uppercase">버튼 2 URL</label>
                                    <input
                                        className="w-full p-2 border border-[var(--ft-border-primary)] rounded bg-gray-50 text-gray-500 text-sm"
                                        value={influencer.button2Url || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--ft-text-secondary)] uppercase">버튼 3 URL</label>
                                    <input
                                        className="w-full p-2 border border-[var(--ft-border-primary)] rounded bg-gray-50 text-gray-500 text-sm"
                                        value={influencer.button3Url || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[var(--ft-border-primary)] bg-white sticky bottom-0 z-10 flex justify-end gap-3">
                <CoreButton variant="tertiary" size="md" onClick={onClose}>
                    닫기
                </CoreButton>
                {isActive ? (
                    <CoreButton
                        variant="secondary"
                        size="md"
                        leftIcon={<RefreshCw className="w-4 h-4" />}
                        onClick={() => {
                            if (confirm('현재 설정값을 인플루언서에게 다시 제안하시겠습니까?')) {
                                onSave(influencer.id, { reviewStatus: 'default' }); // Reset conflict status
                                onClose();
                            }
                        }}
                    >
                        설정값 갱신 요청
                    </CoreButton>
                ) : (
                    <CoreButton
                        variant="primary"
                        size="md"
                        leftIcon={<Send className="w-4 h-4" />}
                        onClick={() => {
                            if (confirm('이 인플루언서에게 제안을 보내시겠습니까?')) {
                                onSave(influencer.id, { automationStatus: 'pending' });
                                onClose();
                            }
                        }}
                    >
                        제안 보내기
                    </CoreButton>
                )}
            </div>
        </div>
    );
}
