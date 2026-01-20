import { useState } from "react";
import {
    Search, Users, Send, Link2, ExternalLink, CheckCircle,
    AlertCircle, Info, ChevronRight, Eye, Wifi, WifiOff
} from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { AutomationInfluencer } from "../types";

interface TemplateDeliverySectionProps {
    influencers: AutomationInfluencer[];
    onDeliver: (ids: number[], method: 'studio' | 'link') => void;
}

export function TemplateDeliverySection({ influencers, onDeliver }: TemplateDeliverySectionProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showPolicyModal, setShowPolicyModal] = useState(false);
    const [deliveryStep, setDeliveryStep] = useState<'select' | 'confirm'>('select');

    // Filtering
    const filteredInfluencers = influencers.filter(inf =>
        inf.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats
    const connectedCount = selectedIds.filter(id =>
        influencers.find(i => i.id === id)?.isConnected
    ).length;
    const unconnectedCount = selectedIds.length - connectedCount;

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredInfluencers.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(p => p !== id));
        }
    };

    const handleProceedToConfirm = () => {
        if (selectedIds.length === 0) {
            alert("전달할 인플루언서를 선택해주세요.");
            return;
        }
        setDeliveryStep('confirm');
    };

    const handleDeliver = () => {
        // 연동된 인플루언서는 스튜디오 전달
        const connectedIds = selectedIds.filter(id =>
            influencers.find(i => i.id === id)?.isConnected
        );
        if (connectedIds.length > 0) {
            onDeliver(connectedIds, 'studio');
        }

        // 미연동 인플루언서는 링크 전달
        const unconnectedIds = selectedIds.filter(id =>
            !influencers.find(i => i.id === id)?.isConnected
        );
        if (unconnectedIds.length > 0) {
            onDeliver(unconnectedIds, 'link');
        }

        setSelectedIds([]);
        setDeliveryStep('select');
    };

    const formatNumber = (value: number) => {
        if (value >= 10000) return (value / 10000).toFixed(1) + '만';
        return value.toLocaleString('ko-KR');
    };

    return (
        <div className="h-full flex flex-col">
            {deliveryStep === 'select' ? (
                <>
                    {/* Header */}
                    <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                                    템플릿 전달 대상 선택
                                </h3>
                                <p className="text-sm text-[var(--ft-text-secondary)] mt-1">
                                    자동화 템플릿을 전달할 인플루언서를 선택하세요
                                </p>
                            </div>
                            <button
                                onClick={() => setShowPolicyModal(true)}
                                className="flex items-center gap-1 text-sm text-[var(--ft-color-primary-600)] hover:underline"
                            >
                                <Info className="w-4 h-4" />
                                작동 방식 안내
                            </button>
                        </div>

                        {/* Search & Stats */}
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                                <input
                                    type="text"
                                    placeholder="인플루언서 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--ft-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                />
                            </div>

                            {selectedIds.length > 0 && (
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="font-medium text-[var(--ft-color-primary-600)]">
                                        {selectedIds.length}명 선택
                                    </span>
                                    <div className="flex items-center gap-2 text-[var(--ft-text-secondary)]">
                                        <Wifi className="w-4 h-4 text-[var(--ft-color-success-500)]" />
                                        <span>연동 {connectedCount}명</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--ft-text-secondary)]">
                                        <WifiOff className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                        <span>미연동 {unconnectedCount}명</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Influencer List */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full">
                            <thead className="bg-[var(--ft-bg-secondary)] sticky top-0 z-10">
                                <tr className="border-b border-[var(--ft-border-secondary)]">
                                    <th className="w-12 px-6 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === filteredInfluencers.length && filteredInfluencers.length > 0}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                        />
                                    </th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">연동 상태</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">전달 방식</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">템플릿 상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInfluencers.map((influencer) => (
                                    <tr
                                        key={influencer.id}
                                        className={`border-b border-[var(--ft-border-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors ${selectedIds.includes(influencer.id) ? 'bg-[var(--ft-color-primary-50)]' : ''
                                            }`}
                                    >
                                        <td className="w-12 px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(influencer.id)}
                                                onChange={(e) => handleSelectOne(influencer.id, e.target.checked)}
                                                className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <CoreAvatar src={influencer.profileImage} name={influencer.displayName} size="sm" />
                                                <div>
                                                    <p className="text-sm font-medium text-[var(--ft-text-primary)]">{influencer.displayName}</p>
                                                    <p className="text-xs text-[var(--ft-text-disabled)]">@{influencer.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            {influencer.isConnected ? (
                                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs">
                                                    <Wifi className="w-3 h-3" />
                                                    연동됨
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                                                    <WifiOff className="w-3 h-3" />
                                                    미연동
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            {influencer.isConnected ? (
                                                <span className="text-xs text-[var(--ft-color-success-600)] font-medium">스튜디오 전달</span>
                                            ) : (
                                                <span className="text-xs text-[var(--ft-text-secondary)]">링크 전달</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <CoreStatusBadge
                                                colorType={influencer.isTemplateShared ? 'success' : 'default'}
                                                type="tint"
                                                size="sm"
                                            >
                                                {influencer.isTemplateShared ? '전달완료' : '미전달'}
                                            </CoreStatusBadge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="bg-white border-t border-[var(--ft-border-primary)] px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => setShowPreviewModal(true)}
                            className="flex items-center gap-2 text-sm text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]"
                        >
                            <Eye className="w-4 h-4" />
                            전달 내용 미리보기
                        </button>
                        <CoreButton
                            variant="primary"
                            size="md"
                            rightIcon={<ChevronRight className="w-4 h-4" />}
                            onClick={handleProceedToConfirm}
                            disabled={selectedIds.length === 0}
                        >
                            {selectedIds.length > 0 ? `${selectedIds.length}명에게 전달하기` : '대상 선택 필요'}
                        </CoreButton>
                    </div>
                </>
            ) : (
                /* Confirm Step */
                <div className="h-full flex flex-col">
                    <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-4">
                        <button
                            onClick={() => setDeliveryStep('select')}
                            className="text-sm text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] mb-2"
                        >
                            ← 대상 선택으로 돌아가기
                        </button>
                        <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                            전달 확인
                        </h3>
                    </div>

                    <div className="flex-1 overflow-auto p-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {/* Studio Delivery */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Wifi className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-green-800">스튜디오 전달</span>
                                </div>
                                <p className="text-3xl font-bold text-green-900 mb-2">{connectedCount}명</p>
                                <p className="text-sm text-green-700">
                                    연동된 계정에 자동으로 템플릿이 적용됩니다
                                </p>
                            </div>

                            {/* Link Delivery */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Link2 className="w-5 h-5 text-gray-600" />
                                    <span className="font-medium text-gray-800">링크 전달</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">{unconnectedCount}명</p>
                                <p className="text-sm text-gray-600">
                                    인플루언서가 링크를 통해 직접 설정합니다
                                </p>
                            </div>
                        </div>

                        {/* Selected Influencers Preview */}
                        <div className="bg-white rounded-xl border border-[var(--ft-border-primary)] overflow-hidden">
                            <div className="px-4 py-3 border-b border-[var(--ft-border-primary)] bg-[var(--ft-bg-secondary)]">
                                <span className="text-sm font-medium text-[var(--ft-text-primary)]">
                                    전달 대상 ({selectedIds.length}명)
                                </span>
                            </div>
                            <div className="p-4 max-h-48 overflow-auto">
                                <div className="flex flex-wrap gap-2">
                                    {selectedIds.map(id => {
                                        const inf = influencers.find(i => i.id === id);
                                        if (!inf) return null;
                                        return (
                                            <div
                                                key={id}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ft-bg-secondary)] rounded-full"
                                            >
                                                <CoreAvatar name={inf.displayName} size="xs" />
                                                <span className="text-sm text-[var(--ft-text-primary)]">{inf.displayName}</span>
                                                {inf.isConnected && <Wifi className="w-3 h-3 text-green-500" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800 mb-1">전달 후 안내</p>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• 스튜디오 전달: 인플루언서 화면에 즉시 반영됩니다</li>
                                        <li>• 링크 전달: 인플루언서가 링크를 통해 확인 후 적용합니다</li>
                                        <li>• 전달 현황 탭에서 상태를 확인할 수 있습니다</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-white border-t border-[var(--ft-border-primary)] px-6 py-4 flex justify-end gap-3">
                        <CoreButton variant="secondary" size="md" onClick={() => setDeliveryStep('select')}>
                            취소
                        </CoreButton>
                        <CoreButton variant="primary" size="md" leftIcon={<Send className="w-4 h-4" />} onClick={handleDeliver}>
                            {selectedIds.length}명에게 템플릿 전달
                        </CoreButton>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-[420px] max-h-[80vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                            <h3 className="text-base font-semibold">전달 내용 미리보기</h3>
                            <button onClick={() => setShowPreviewModal(false)} className="text-[var(--ft-text-disabled)] hover:text-[var(--ft-text-primary)]">✕</button>
                        </div>
                        <div className="p-6">
                            <div className="bg-[var(--ft-bg-secondary)] rounded-xl p-4 space-y-3">
                                <div className="bg-white p-3 rounded-lg shadow-sm text-sm">
                                    안녕하세요! 저희 브랜드와 협업 제안드립니다. 🎉
                                </div>
                                <div className="bg-[var(--ft-color-primary-500)] text-white p-3 rounded-lg text-center font-medium text-sm">
                                    상품 보기
                                </div>
                                <div className="bg-[var(--ft-color-primary-500)] text-white p-3 rounded-lg text-center font-medium text-sm">
                                    이벤트 참여하기
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex justify-end">
                            <CoreButton variant="secondary" size="sm" onClick={() => setShowPreviewModal(false)}>닫기</CoreButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Policy Modal */}
            {showPolicyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-[500px] max-h-[80vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                            <h3 className="text-base font-semibold">템플릿 전달 작동 방식</h3>
                            <button onClick={() => setShowPolicyModal(false)} className="text-[var(--ft-text-disabled)] hover:text-[var(--ft-text-primary)]">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wifi className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-green-800">스튜디오 전달 (연동된 계정)</span>
                                </div>
                                <ul className="text-sm text-green-700 space-y-1 ml-7">
                                    <li>• 인플루언서 스튜디오에 자동으로 템플릿이 적용됩니다</li>
                                    <li>• 인플루언서는 별도 작업 없이 바로 사용 가능합니다</li>
                                    <li>• 잠금 처리된 영역은 인플루언서가 수정할 수 없습니다</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Link2 className="w-5 h-5 text-gray-600" />
                                    <span className="font-semibold text-gray-800">링크 전달 (미연동 계정)</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1 ml-7">
                                    <li>• 인플루언서에게 설정 링크가 전달됩니다</li>
                                    <li>• 인플루언서가 링크를 통해 직접 설정을 완료해야 합니다</li>
                                    <li>• 계정 연동 시 스튜디오 전달로 전환됩니다</li>
                                </ul>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-[var(--ft-border-primary)] flex justify-end">
                            <CoreButton variant="primary" size="sm" onClick={() => setShowPolicyModal(false)}>확인</CoreButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
