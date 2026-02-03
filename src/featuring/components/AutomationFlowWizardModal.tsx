import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Users, FileText, Send, Check, Search, Plus, Instagram, X } from "lucide-react";
import { CoreButton, CoreAvatar, CoreModal } from "../../design-system";
import { AutomationInfluencer, DMTemplate, CTALink } from "../types";

// Types for wizard result
export interface WizardInfluencer {
    id: number;
    username: string;
    displayName: string;
    profileImage: string;
}

export interface WizardResult {
    influencers: WizardInfluencer[];
    dmMessage: string;
    ctaLinks: CTALink[];
    triggerKeywords: string[];
}

interface AutomationFlowWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (result: WizardResult) => void;
}

type WizardStep = 1 | 2 | 3;

// Mock data for groups
const MOCK_GROUPS = [
    {
        id: 1,
        name: '시트_25.06_더위 기획전',
        platform: 'instagram' as const,
        influencers: [
            { id: 101, username: 'susu_review', displayName: '수수리뷰 | 솔직리뷰', profileImage: '', categories: ['뷰티', '리뷰'] },
            { id: 102, username: 'daily_yujin', displayName: '데일리유진✨', profileImage: '', categories: ['라이프', '일상'] },
            { id: 103, username: 'beauty_minzy', displayName: '뷰티민지 | 메이크업', profileImage: '', categories: ['뷰티'] },
        ]
    },
    {
        id: 2,
        name: '뷰티 인플루언서 풀',
        platform: 'instagram' as const,
        influencers: [
            { id: 201, username: 'beauty_queen', displayName: '뷰티퀸 | 메이크업 전문', profileImage: '', categories: ['뷰티', '패션'] },
            { id: 202, username: 'skincare_daily', displayName: '스킨케어 데일리', profileImage: '', categories: ['뷰티', '일상'] },
        ]
    },
];

const MOCK_CAMPAIGNS = [
    {
        id: 101,
        name: '여름 시즌 캠페인',
        influencers: [
            { id: 301, username: 'summer_vibes', displayName: '썸머바이브✨', profileImage: '', categories: ['패션', '라이프'] },
            { id: 302, username: 'beach_lover', displayName: '비치러버🏖️', profileImage: '', categories: ['여행', '라이프'] },
        ]
    },
    {
        id: 102,
        name: '신제품 런칭 캠페인',
        influencers: [
            { id: 401, username: 'tech_reviewer', displayName: '테크 리뷰어', profileImage: '', categories: ['테크', '리뷰'] },
        ]
    },
];

export function AutomationFlowWizardModal({ isOpen, onClose, onComplete }: AutomationFlowWizardModalProps) {
    const [currentStep, setCurrentStep] = useState<WizardStep>(1);

    // Step 1: Recipients
    const [selectedInfluencers, setSelectedInfluencers] = useState<Partial<AutomationInfluencer>[]>([]);
    const [importTab, setImportTab] = useState<'groups' | 'campaigns'>('groups');
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Step 2: Guide Setup
    const [dmMessage, setDmMessage] = useState('');
    const [ctaLinks, setCtaLinks] = useState<CTALink[]>([
        { buttonName: '', url: '' }
    ]);
    const [triggerKeywords, setTriggerKeywords] = useState<string[]>([]);
    const [newKeyword, setNewKeyword] = useState('');

    // Reset state on close
    const handleClose = () => {
        setCurrentStep(1);
        setSelectedInfluencers([]);
        setSelectedGroupId(null);
        setDmMessage('');
        setCtaLinks([{ buttonName: '', url: '' }]);
        setTriggerKeywords([]);
        onClose();
    };

    // Derived data
    const selectedGroup = useMemo(() => {
        if (importTab === 'groups') {
            return MOCK_GROUPS.find(g => g.id === selectedGroupId);
        }
        return MOCK_CAMPAIGNS.find(c => c.id === selectedGroupId);
    }, [importTab, selectedGroupId]);

    const filteredInfluencers = useMemo(() => {
        if (!selectedGroup) return [];
        const influencers = selectedGroup.influencers;
        if (!searchQuery) return influencers;
        return influencers.filter(inf =>
            inf.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inf.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [selectedGroup, searchQuery]);

    // Handlers
    const handleToggleInfluencer = (inf: typeof MOCK_GROUPS[0]['influencers'][0]) => {
        const exists = selectedInfluencers.find(s => s.id === inf.id);
        if (exists) {
            setSelectedInfluencers(prev => prev.filter(s => s.id !== inf.id));
        } else {
            setSelectedInfluencers(prev => [...prev, {
                id: inf.id,
                username: inf.username,
                displayName: inf.displayName,
                profileImage: inf.profileImage,
            }]);
        }
    };

    const handleSelectAllFromGroup = () => {
        if (!selectedGroup) return;
        const newInfluencers = selectedGroup.influencers.map(inf => ({
            id: inf.id,
            username: inf.username,
            displayName: inf.displayName,
            profileImage: inf.profileImage,
        }));
        setSelectedInfluencers(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const toAdd = newInfluencers.filter(n => !existingIds.has(n.id));
            return [...prev, ...toAdd];
        });
    };

    const handleAddKeyword = () => {
        if (newKeyword.trim() && !triggerKeywords.includes(newKeyword.trim())) {
            setTriggerKeywords(prev => [...prev, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setTriggerKeywords(prev => prev.filter(k => k !== keyword));
    };

    const handleUpdateCtaLink = (index: number, field: 'buttonName' | 'url', value: string) => {
        setCtaLinks(prev => prev.map((link, i) =>
            i === index ? { ...link, [field]: value } : link
        ));
    };

    const handleAddCtaLink = () => {
        if (ctaLinks.length < 3) {
            setCtaLinks(prev => [...prev, { buttonName: '', url: '' }]);
        }
    };

    const handleRemoveCtaLink = (index: number) => {
        setCtaLinks(prev => prev.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep((currentStep + 1) as WizardStep);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as WizardStep);
        }
    };

    const handleComplete = () => {
        const result: WizardResult = {
            influencers: selectedInfluencers.map(inf => ({
                id: inf.id!,
                username: inf.username || '',
                displayName: inf.displayName || '',
                profileImage: inf.profileImage || ''
            })),
            dmMessage,
            ctaLinks: ctaLinks.filter(l => l.buttonName && l.url),
            triggerKeywords
        };
        console.log('Wizard completed:', result);
        handleClose();
        onComplete(result);
    };

    const canProceed = useMemo(() => {
        switch (currentStep) {
            case 1:
                return selectedInfluencers.length > 0;
            case 2:
                return dmMessage.trim().length > 0;
            case 3:
                return true;
            default:
                return false;
        }
    }, [currentStep, selectedInfluencers, dmMessage]);

    // Step indicator
    const steps = [
        { step: 1, label: '수신인 추가', icon: Users },
        { step: 2, label: '자동화 가이드 설정', icon: FileText },
        { step: 3, label: '발송하기', icon: Send },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-[900px] max-h-[85vh] flex flex-col overflow-hidden">
                {/* Header with Step Indicator */}
                <div className="border-b border-gray-200 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">자동화 가이드 전달하기</h2>
                        <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-4">
                        {steps.map((s, idx) => (
                            <div key={s.step} className="flex items-center">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${currentStep === s.step
                                    ? 'bg-purple-100 text-purple-700'
                                    : currentStep > s.step
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${currentStep === s.step
                                        ? 'bg-purple-600 text-white'
                                        : currentStep > s.step
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                        }`}>
                                        {currentStep > s.step ? <Check className="w-3 h-3" /> : s.step}
                                    </div>
                                    <span className="text-xs font-medium">{s.label}</span>
                                </div>
                                {idx < steps.length - 1 && (
                                    <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    {/* Step 1: Recipients */}
                    {currentStep === 1 && (
                        <div>
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-1">수신인 추가</h3>
                                <p className="text-sm text-gray-500">자동화 가이드를 전달할 인플루언서를 선택하세요.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Left: Source Selection */}
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex gap-2 mb-3">
                                        <button
                                            onClick={() => { setImportTab('groups'); setSelectedGroupId(null); }}
                                            className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-colors ${importTab === 'groups'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            그룹에서 불러오기
                                        </button>
                                        <button
                                            onClick={() => { setImportTab('campaigns'); setSelectedGroupId(null); }}
                                            className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-colors ${importTab === 'campaigns'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            캠페인에서 불러오기
                                        </button>
                                    </div>

                                    {/* Group/Campaign List */}
                                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto mb-3">
                                        {(importTab === 'groups' ? MOCK_GROUPS : MOCK_CAMPAIGNS).map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => setSelectedGroupId(item.id)}
                                                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${selectedGroupId === item.id
                                                    ? 'bg-purple-50 border-2 border-purple-500'
                                                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                    }`}
                                            >
                                                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                                                    {importTab === 'groups' ? <Users className="w-3.5 h-3.5 text-purple-600" /> : <Instagram className="w-3.5 h-3.5 text-purple-600" />}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.influencers.length}명</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Influencer List from Selected Group */}
                                    {selectedGroup && (
                                        <>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex-1 flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg">
                                                    <Search className="w-3.5 h-3.5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="인플루언서 검색"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="flex-1 bg-transparent text-xs outline-none"
                                                    />
                                                </div>
                                                <CoreButton variant="secondary" size="sm" onClick={handleSelectAllFromGroup}>
                                                    전체 추가
                                                </CoreButton>
                                            </div>

                                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                                                {filteredInfluencers.map(inf => {
                                                    const isSelected = selectedInfluencers.some(s => s.id === inf.id);
                                                    return (
                                                        <button
                                                            key={inf.id}
                                                            onClick={() => handleToggleInfluencer(inf)}
                                                            className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${isSelected
                                                                ? 'bg-purple-50 border border-purple-300'
                                                                : 'bg-white border border-gray-200 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            <CoreAvatar size="xs" name={inf.displayName} />
                                                            <div className="flex-1 text-left">
                                                                <p className="text-xs font-medium text-gray-900">{inf.displayName}</p>
                                                                <p className="text-xs text-gray-500">@{inf.username}</p>
                                                            </div>
                                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                                                                }`}>
                                                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Right: Selected Influencers */}
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-semibold text-gray-900">선택된 인플루언서</h4>
                                        <span className="text-sm text-purple-600 font-medium">{selectedInfluencers.length}명</span>
                                    </div>

                                    {selectedInfluencers.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                                <Users className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500">선택된 인플루언서가 없습니다</p>
                                            <p className="text-xs text-gray-400 mt-0.5">좌측에서 인플루언서를 선택하세요</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1.5 max-h-[280px] overflow-y-auto">
                                            {selectedInfluencers.map(inf => (
                                                <div key={inf.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                    <CoreAvatar size="xs" name={inf.displayName || ''} />
                                                    <div className="flex-1">
                                                        <p className="text-xs font-medium text-gray-900">{inf.displayName}</p>
                                                        <p className="text-xs text-gray-500">@{inf.username}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedInfluencers(prev => prev.filter(s => s.id !== inf.id))}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Guide Setup */}
                    {currentStep === 2 && (
                        <div>
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-1">자동화 가이드 설정</h3>
                                <p className="text-sm text-gray-500">인플루언서에게 전달할 DM 메시지와 버튼을 설정하세요.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Left: Settings */}
                                <div className="space-y-4">
                                    {/* Trigger Keywords */}
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">트리거 키워드</h4>
                                        <p className="text-xs text-gray-500 mb-2">댓글에 이 키워드가 포함되면 자동으로 DM을 발송합니다.</p>

                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="키워드 입력"
                                                value={newKeyword}
                                                onChange={(e) => setNewKeyword(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                                                className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500"
                                            />
                                            <CoreButton variant="secondary" size="sm" onClick={handleAddKeyword}>
                                                추가
                                            </CoreButton>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            {triggerKeywords.map(keyword => (
                                                <span key={keyword} className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                                                    {keyword}
                                                    <button onClick={() => handleRemoveKeyword(keyword)} className="hover:text-purple-900">×</button>
                                                </span>
                                            ))}
                                            {triggerKeywords.length === 0 && (
                                                <span className="text-xs text-gray-400">키워드를 추가하세요</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* DM Message */}
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">DM 메시지</h4>
                                        <textarea
                                            placeholder="인플루언서에게 전달할 메시지를 입력하세요..."
                                            value={dmMessage}
                                            onChange={(e) => setDmMessage(e.target.value)}
                                            rows={4}
                                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"
                                        />
                                    </div>

                                    {/* CTA Links */}
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900">CTA 버튼</h4>
                                            {ctaLinks.length < 3 && (
                                                <CoreButton variant="tertiary" size="sm" onClick={handleAddCtaLink} leftIcon={<Plus className="w-3 h-3" />}>
                                                    버튼 추가
                                                </CoreButton>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            {ctaLinks.map((link, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="버튼명"
                                                        value={link.buttonName}
                                                        onChange={(e) => handleUpdateCtaLink(idx, 'buttonName', e.target.value)}
                                                        className="w-1/3 px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="URL"
                                                        value={link.url}
                                                        onChange={(e) => handleUpdateCtaLink(idx, 'url', e.target.value)}
                                                        className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500"
                                                    />
                                                    {ctaLinks.length > 1 && (
                                                        <button
                                                            onClick={() => handleRemoveCtaLink(idx)}
                                                            className="px-1.5 text-gray-400 hover:text-red-500"
                                                        >
                                                            ×
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Preview */}
                                <div className="border border-gray-200 rounded-xl p-3">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">미리보기</h4>

                                    <div className="bg-gray-900 rounded-[1.5rem] p-2 max-w-[220px] mx-auto">
                                        <div className="bg-white rounded-[1rem] p-3 min-h-[280px]">
                                            {/* Chat Header */}
                                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 mb-2">
                                                <CoreAvatar size="xs" name="브랜드" colorType="primary" />
                                                <span className="text-xs font-medium">브랜드 계정</span>
                                            </div>

                                            {/* Message Bubble */}
                                            <div className="bg-gray-100 rounded-xl rounded-tl-sm p-2 mb-2">
                                                <p className="text-xs text-gray-800 whitespace-pre-wrap">
                                                    {dmMessage || '메시지를 입력하세요...'}
                                                </p>
                                            </div>

                                            {/* CTA Buttons */}
                                            <div className="space-y-1.5">
                                                {ctaLinks.filter(l => l.buttonName).map((link, idx) => (
                                                    <button
                                                        key={idx}
                                                        className="w-full py-1.5 px-3 bg-purple-600 text-white text-xs font-medium rounded-full"
                                                    >
                                                        {link.buttonName}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Send */}
                    {currentStep === 3 && (
                        <div className="max-w-lg mx-auto">
                            <div className="mb-4 text-center">
                                <h3 className="text-base font-semibold text-gray-900 mb-1">발송 확인</h3>
                                <p className="text-sm text-gray-500">설정 내용을 확인하고 발송하세요.</p>
                            </div>

                            {/* Summary Cards */}
                            <div className="space-y-3">
                                {/* Recipients Summary */}
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Users className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">수신인</h4>
                                            <p className="text-xs text-gray-500">{selectedInfluencers.length}명의 인플루언서</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedInfluencers.slice(0, 5).map(inf => (
                                            <div key={inf.id} className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-full">
                                                <CoreAvatar size="xs" name={inf.displayName || ''} />
                                                <span className="text-xs text-gray-700">{inf.displayName}</span>
                                            </div>
                                        ))}
                                        {selectedInfluencers.length > 5 && (
                                            <span className="px-2 py-1 text-xs text-gray-500">+{selectedInfluencers.length - 5}명</span>
                                        )}
                                    </div>
                                </div>

                                {/* Guide Summary */}
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">자동화 가이드</h4>
                                            <p className="text-xs text-gray-500">{triggerKeywords.length}개 키워드, {ctaLinks.filter(l => l.buttonName).length}개 버튼</p>
                                        </div>
                                    </div>

                                    {triggerKeywords.length > 0 && (
                                        <div className="mb-2">
                                            <p className="text-xs text-gray-500 mb-1">트리거 키워드:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {triggerKeywords.map(kw => (
                                                    <span key={kw} className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">{kw}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-gray-50 rounded-lg p-2">
                                        <p className="text-xs text-gray-700 whitespace-pre-wrap line-clamp-3">{dmMessage}</p>
                                    </div>
                                </div>

                                {/* Action Notice */}
                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                                    <Send className="w-6 h-6 text-purple-600 mx-auto mb-1.5" />
                                    <p className="text-sm text-purple-800 font-medium">발송 버튼을 클릭하면 선택한 인플루언서에게 자동화가 적용됩니다.</p>
                                    <p className="text-xs text-purple-600 mt-0.5">발송 후 협업&가이드 탭에서 현황을 확인할 수 있습니다.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="border-t border-gray-200 px-6 py-4 shrink-0">
                    <div className="flex items-center justify-between">
                        <CoreButton
                            variant="secondary"
                            onClick={currentStep === 1 ? handleClose : handlePrev}
                            leftIcon={<ChevronLeft className="w-4 h-4" />}
                        >
                            {currentStep === 1 ? '취소' : '이전'}
                        </CoreButton>

                        <div className="flex gap-2">
                            {currentStep < 3 ? (
                                <CoreButton
                                    variant="primary"
                                    onClick={handleNext}
                                    disabled={!canProceed}
                                    rightIcon={<ChevronRight className="w-4 h-4" />}
                                >
                                    다음
                                </CoreButton>
                            ) : (
                                <CoreButton
                                    variant="primary"
                                    onClick={handleComplete}
                                    leftIcon={<Send className="w-4 h-4" />}
                                >
                                    발송하기
                                </CoreButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
