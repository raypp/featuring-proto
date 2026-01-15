
import { useState, useEffect } from "react";
import {
    ChevronLeft, ChevronRight, Users, Zap, Send, MousePointer,
    BarChart2, Link, Plus, ChevronDown, FileText, Check, X,
    Lock, Unlock, Settings, Download
} from "lucide-react";
import { AutomationGroup, DMTemplate, AutomationInfluencer } from "../types";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { AutomationBuilderPanel } from "../components/AutomationBuilderPanel";
import { InfluencerGrid } from "../components/InfluencerGrid";
import { InfluencerDetailDrawer } from "../components/InfluencerDetailDrawer";

interface AutomationGroupDetailProps {
    group: AutomationGroup;
    template?: DMTemplate;
    influencers?: AutomationInfluencer[];
    onBack: () => void;
    onOpenTemplateManagement: () => void;
    onDeliverTemplate?: (influencerIds: number[]) => void;
    onAddInfluencer?: () => void;
}

type TabType = 'report' | 'setup';
type RightPanelTab = 'preview' | 'grid';

export function AutomationGroupDetail({
    group,
    template,
    influencers = [],
    onBack,
    onOpenTemplateManagement,
    onDeliverTemplate,
    onAddInfluencer
}: AutomationGroupDetailProps) {
    const [activeTab, setActiveTab] = useState<TabType>('report');

    // Setup Tab State - Advanced
    const [rightPanelTab, setRightPanelTab] = useState<RightPanelTab>('grid'); // Default to grid for better UX
    const [isLinkLock, setIsLinkLock] = useState(true);
    const [localInfluencers, setLocalInfluencers] = useState<AutomationInfluencer[]>([]);

    // Initializer
    useEffect(() => {
        if (influencers.length > 0) {
            setLocalInfluencers(influencers.map(inf => ({
                ...inf,
                automationStatus: inf.automationStatus || 'draft',
                button1Url: inf.customUrl || "https://atable.co.kr/lookbook" // Default Mock URL
            })));
        }
    }, [influencers]);

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerInfluencer, setDrawerInfluencer] = useState<AutomationInfluencer | null>(null);

    // Influencer selection state
    const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedInfluencers(influencers.map(i => i.id));
        } else {
            setSelectedInfluencers([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedInfluencers(prev => [...prev, id]);
        } else {
            setSelectedInfluencers(prev => prev.filter(p => p !== id));
        }
    };

    const handleDeliver = () => {
        const connectedSelected = influencers.filter(
            i => selectedInfluencers.includes(i.id) && i.isConnected
        );
        if (connectedSelected.length === 0) {
            alert("선택한 인플루언서 중 연동된 계정이 없습니다.");
            return;
        }
        onDeliverTemplate?.(connectedSelected.map(i => i.id));
        setSelectedInfluencers([]);
    };



    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

    const totalSent = influencers.reduce((sum, i) => sum + i.sentCount, 0);
    const totalClicks = influencers.reduce((sum, i) => sum + i.clickCount, 0);
    const totalReach = influencers.reduce((sum, i) => sum + (i.uniqueReach || 0), 0);
    const avgCtr = totalReach > 0 ? (totalClicks / totalReach) * 100 : 0;

    // Template status helper
    const getTemplateStatus = () => {
        if (!template || template.status === 'draft') return '초안';
        if (template.status === 'saved') return '저장됨';
        return '전달됨';
    };

    // Mock Data for Setup Tab
    const triggerType = '댓글 키워드';
    const triggerKeywords = template?.ctaLinks?.length ? ['가격', '구매', '링크'] : ['가격', '구매', '링크'];
    const messagePreview = template?.dmGuide || '메시지를 설정해주세요';
    const linkCount = template?.ctaLinks?.length || 0;

    // Master Builder Update Logic
    // If field is 'APPLY_TEMPLATE', it means the user clicked "Apply to N selected" in Selection Mode.
    // In that case, we take the `value` (which should be the current template state from the builder) 
    // and apply it to the selected influencers.
    // However, to keep it simple, we already sync state via `onChange`. 
    // Let's modify this to handle both field updates and the explicit "Apply" action.

    // Actually, the BuilderPanel calls `onChange` for every keystroke. 
    // In "Default Mode", this updates "non-custom" users immediately (Live Sync).
    // In "Selection Mode", we typically want to wait for "Apply".
    // BUT the previous implementation applied immediately even in Selection Mode, marking them custom.
    // The requirement says: "Explicit Apply Button for Selection Mode".
    // So:
    // 1. In Default Mode -> Apply immediately to !hasCustomSettings
    // 2. In Selection Mode -> Do NOT apply immediately. Update a temporary "draft" state or just let the BuilderPanel hold the state.
    //    When "Apply" is clicked, push that state to selectedInfluencers.

    // Refined Approach:
    // We need a specific handler for the "Apply" button action. 
    // The `AutomationBuilderPanel` calls `onChange` essentially updating a "Draft Template" state.
    // We should probably separate the "Draft Template" state from the `localInfluencers` state.
    // OR, we stick to the simpler logic: 
    // - Default Mode: Updates applied immediately to default users.
    // - Selection Mode: Updates applied ONLY when `handleApplySelection` is called.

    // To support this, we need to know the *current configuration* of the BuilderPanel.
    // Since `AutomationBuilderPanel` has local state, we need it to pass the full template data on `onApply`.
    // Let's assume `onApply` prop in `AutomationBuilderPanel` calls the handler we pass.
    // BUT `AutomationBuilderPanel`'s `onChange` is currently sending (field, value).
    // Let's introduce a `masterTemplate` state in this page to hold the builder's current state.

    // 1. Add masterTemplate state
    const [masterTemplate, setMasterTemplate] = useState<any>({
        ctaLinks: [{ buttonName: '', url: '' }, { buttonName: '', url: '' }, { buttonName: '', url: '' }],
        dmGuide: '',
        triggerKeywords: []
    });

    const handleBuilderChange = (field: string, value: any) => {
        setMasterTemplate((prev: any) => {
            const newState = { ...prev, [field]: value };

            // If Default Mode, apply immediately to default users
            const currentMode = selectedInfluencers.length > 0 ? 'selection' : 'default';
            if (currentMode === 'default') {
                // Update localInfluencers based on this new state
                // We need to mirror the `applyTemplateToInfluencer` logic here
                setLocalInfluencers(currentInfluencers => currentInfluencers.map(inf => {
                    if (inf.hasCustomSettings) return inf; // Skip custom users in default mode

                    const updates: any = {};
                    if (field === 'ctaLinks') {
                        const links = value as { buttonName: string, url: string }[];
                        if (links[0]) updates.customUrl = links[0].url;
                        if (links[1]) updates.button2Url = links[1].url;
                        if (links[2]) updates.button3Url = links[2].url;
                    }
                    // Handle other fields if needed for table preview
                    return { ...inf, ...updates };
                }));
            }
            return newState;
        });
    };

    const handleApplySelection = () => {
        if (selectedInfluencers.length === 0) return;

        if (confirm(`${selectedInfluencers.length}명에게 템플릿 설정을 적용하시겠습니까?`)) {
            setLocalInfluencers(prev => prev.map(inf => {
                if (!selectedInfluencers.includes(inf.id)) return inf;

                // Apply masterTemplate settings
                const updates: any = {
                    hasCustomSettings: true,
                    customUrl: masterTemplate.ctaLinks[0]?.url || '',
                    button2Url: masterTemplate.ctaLinks[1]?.url || '',
                    button3Url: masterTemplate.ctaLinks[2]?.url || '',
                };
                return { ...inf, ...updates };
            }));
            alert('적용되었습니다.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--ft-bg-secondary)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 pt-6 sticky top-0 z-20">
                <div className="flex items-center gap-3 mb-6">
                    <CoreButton variant="tertiary" size="sm" onClick={onBack} leftIcon={<ChevronLeft className="w-4 h-4" />}>
                        뒤로
                    </CoreButton>
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[var(--ft-text-secondary)] mb-1">
                            <span>반응 자동화 관리</span>
                            <ChevronRight className="w-3 h-3" />
                            <span>{group.name}</span>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--ft-text-primary)]">{group.name}</h1>
                    </div>
                </div>

                <div className="flex gap-6">
                    <button
                        className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'report'
                            ? 'border-[var(--ft-color-primary-500)] text-[var(--ft-color-primary-600)]'
                            : 'border-transparent text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]'
                            }`}
                        onClick={() => setActiveTab('report')}
                    >
                        <div className="flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" />
                            인플루언서별 성과 (Report)
                        </div>
                    </button>
                    <button
                        className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'setup'
                            ? 'border-[var(--ft-color-primary-500)] text-[var(--ft-color-primary-600)]'
                            : 'border-transparent text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]'
                            }`}
                        onClick={() => setActiveTab('setup')}
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            자동화 설정 (Setup)
                        </div>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'report' ? (
                    <div className="h-full overflow-auto p-6">
                        {/* Report Content (Preserved from original) */}
                        <div className="bg-white rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                                    <h2 className="text-base font-medium text-[var(--ft-text-primary)]">
                                        참여 인플루언서 및 성과
                                    </h2>
                                    <span className="text-sm text-[var(--ft-text-disabled)]">
                                        {influencers.length}명
                                    </span>
                                </div>
                                {/* Global Actions for Report */}
                                <div className="flex items-center gap-4">
                                    {selectedInfluencers.length > 0 ? (
                                        <>
                                            <span className="text-sm font-medium text-[var(--ft-color-primary-600)]">
                                                {selectedInfluencers.length}명 선택됨
                                            </span>
                                            <CoreButton variant="primary" size="sm" leftIcon={<Send className="w-4 h-4" />} onClick={handleDeliver}>
                                                템플릿 전달
                                            </CoreButton>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Send className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                                <span className="text-sm text-[var(--ft-text-disabled)]">발송: {formatNumber(totalSent)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MousePointer className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                                <span className="text-sm text-[var(--ft-text-disabled)]">클릭: {formatNumber(totalClicks)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                                <span className="text-sm text-[var(--ft-text-disabled)]">CTR: {avgCtr.toFixed(1)}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Table */}
                            {influencers.length === 0 ? (
                                <div className="py-16 text-center">
                                    <Users className="w-12 h-12 text-[var(--ft-text-disabled)] mx-auto mb-4" />
                                    <p className="text-base font-medium text-[var(--ft-text-secondary)] mb-1">참여 인플루언서가 없습니다</p>
                                    <p className="text-sm text-[var(--ft-text-disabled)]">인플루언서를 추가해주세요</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)]">
                                                <th className="w-12 px-6 py-3">
                                                    <input type="checkbox" checked={selectedInfluencers.length === influencers.length && influencers.length > 0} onChange={(e) => handleSelectAll(e.target.checked)} className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer" />
                                                </th>
                                                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                                                <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">콘텐츠</th>
                                                <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">공유 여부</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">좋아요</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">댓글</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">저장</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">도달</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">클릭</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">CTR</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">팔로우 전환</th>
                                                <th className="text-right px-6 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">전환율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {influencers.flatMap((influencer) =>
                                                (influencer.appliedContents && influencer.appliedContents.length > 0)
                                                    ? influencer.appliedContents.map((content) => (
                                                        <tr key={`${influencer.id}-${content.id}`} className="border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)]">
                                                            <td className="w-12 px-6 py-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedInfluencers.includes(influencer.id)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setSelectedInfluencers(prev => [...prev, influencer.id]);
                                                                        } else {
                                                                            setSelectedInfluencers(prev => prev.filter(id => id !== influencer.id));
                                                                        }
                                                                    }}
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
                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <a
                                                                        href={content.contentUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        title={`${content.postedDate} • ${content.type}`}
                                                                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                                                    >
                                                                        <img
                                                                            className="h-8 w-8 rounded-lg object-cover ring-2 ring-[var(--ft-border-primary)]"
                                                                            src={content.thumbnailUrl}
                                                                            alt={content.type}
                                                                        />
                                                                        <div className="text-left">
                                                                            <p className="text-xs font-medium text-[var(--ft-text-primary)]">{content.type}</p>
                                                                            <p className="text-xs text-[var(--ft-text-disabled)]">{content.postedDate}</p>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-center">
                                                                <CoreStatusBadge
                                                                    colorType={influencer.isTemplateShared ? 'success' : 'default'}
                                                                    type="tint"
                                                                    size="sm"
                                                                >
                                                                    {influencer.isTemplateShared ? '공유완료' : '미공유'}
                                                                </CoreStatusBadge>
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                                {formatNumber(content.likes || 0)}
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                                {formatNumber(content.comments || 0)}
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                                {formatNumber(content.saves || 0)}
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                                {formatNumber(content.uniqueReach || 0)}
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                                {formatNumber(content.uniqueClicks || 0)}
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-color-primary-600)]">
                                                                {(content.ctr || 0).toFixed(1)}%
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                                {formatNumber(content.followConversions || 0)}
                                                            </td>
                                                            <td className="px-6 py-4 text-right text-sm text-[var(--ft-color-primary-600)]">
                                                                {(content.followConversionRate || 0).toFixed(1)}%
                                                            </td>
                                                        </tr>
                                                    ))
                                                    : [(
                                                        <tr key={influencer.id} className="border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)]">
                                                            <td className="w-12 px-6 py-4">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedInfluencers.includes(influencer.id)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setSelectedInfluencers(prev => [...prev, influencer.id]);
                                                                        } else {
                                                                            setSelectedInfluencers(prev => prev.filter(id => id !== influencer.id));
                                                                        }
                                                                    }}
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
                                                                <span className="text-sm text-[var(--ft-text-disabled)]">-</span>
                                                            </td>
                                                            <td className="px-4 py-4 text-center">
                                                                <CoreStatusBadge
                                                                    colorType={influencer.isTemplateShared ? 'success' : 'default'}
                                                                    type="tint"
                                                                    size="sm"
                                                                >
                                                                    {influencer.isTemplateShared ? '공유완료' : '미공유'}
                                                                </CoreStatusBadge>
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                            <td className="px-6 py-4 text-right text-sm text-[var(--ft-text-disabled)]">-</td>
                                                        </tr>
                                                    )]
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // SETUP TAB - Advanced Split Layout
                    <div className="h-full flex overflow-hidden">
                        {/* LEFT PANEL - Master Builder */}
                        <div className="w-[400px] shrink-0 h-full overflow-hidden">
                            <AutomationBuilderPanel
                                mode={selectedInfluencers.length > 0 ? 'selection' : 'default'}
                                selectedCount={selectedInfluencers.length}
                                initialData={undefined}
                                onChange={handleBuilderChange}
                                onApply={handleApplySelection}
                                onLoadTemplate={() => {
                                    alert('템플릿 불러오기 기능은 준비중입니다.');
                                }}
                                onSaveTemplate={() => {
                                    alert('템플릿 저장 기능은 준비중입니다.');
                                }}
                            />
                        </div>

                        {/* RIGHT PANEL - Influencer Grid & Tabs */}
                        <div className="flex-1 flex flex-col bg-white overflow-hidden border-l border-[#e0e0e0]">
                            {/* Tabs */}
                            <div className="flex border-b border-[#e0e0e0]">
                                <button
                                    onClick={() => setRightPanelTab('preview')}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${rightPanelTab === 'preview' ? 'border-[#5e51ff] text-[#5e51ff]' : 'border-transparent text-[#757575]'}`}
                                >
                                    미리보기 (Preview)
                                </button>
                                <button
                                    onClick={() => setRightPanelTab('grid')}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${rightPanelTab === 'grid' ? 'border-[#5e51ff] text-[#5e51ff]' : 'border-transparent text-[#757575]'}`}
                                >
                                    인플루언서 제안하기 (Proposal)
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-hidden relative">
                                {rightPanelTab === 'preview' ? (
                                    <div className="h-full flex items-center justify-center bg-gray-50 p-8">
                                        <div className="w-[375px] h-[667px] bg-white rounded-[30px] border-[8px] border-[#1c1c1e] shadow-xl overflow-hidden relative flex flex-col">
                                            {/* Fake DM Preview */}
                                            <div className="bg-white border-b p-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                                <div className="font-bold text-sm">Brand Name</div>
                                            </div>
                                            <div className="flex-1 p-4 bg-gray-50 space-y-4">
                                                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 max-w-[80%] text-sm">
                                                    {template?.dmGuide || "메시지를 설정해주세요."}
                                                </div>
                                                {(template?.ctaLinks || []).map((link, i) => (
                                                    <div key={i} className="bg-[#5e51ff] text-white p-3 rounded-lg text-center font-bold text-sm shadow-md">
                                                        {link.buttonName || "버튼명"}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <InfluencerGrid
                                        data={localInfluencers}
                                        selectedIds={selectedInfluencers}
                                        onSelect={setSelectedInfluencers}
                                        onUpdate={(id, field, value) => {
                                            setLocalInfluencers(prev => prev.map(inf =>
                                                inf.id === id ? { ...inf, [field]: value, hasCustomSettings: true } : inf
                                            ));
                                        }}
                                        onOpenDrawer={(id) => {
                                            const inf = localInfluencers.find(i => i.id === id);
                                            if (inf) {
                                                setDrawerInfluencer(inf);
                                                setIsDrawerOpen(true);
                                            }
                                        }}
                                        isLinkLocked={isLinkLock}
                                    />
                                )}
                            </div>

                            {/* Footer Actions (Only visible in Grid View or Global) */}
                            <div className="bg-white border-t border-[#e0e0e0] p-4 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsLinkLock(!isLinkLock)}
                                        className={`w-10 h-6 rounded-full relative transition-colors ${isLinkLock ? 'bg-[#5e51ff]' : 'bg-[#e0e0e0]'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isLinkLock ? 'left-5' : 'left-1'}`} />
                                    </button>
                                    <span className="text-sm text-[#424242]">링크 수정 권한 잠금</span>
                                    <Lock className="w-3 h-3 text-[#9e9e9e]" />
                                </div>
                                <div className="flex gap-2">
                                    <CoreButton variant="secondary" size="md">임시 저장</CoreButton>
                                    <CoreButton variant="primary" size="md" rightIcon={<Send className="w-4 h-4" />}>
                                        {selectedInfluencers.length > 0
                                            ? `${selectedInfluencers.length}명에게 제안 보내기`
                                            : "전체 제안 보내기"
                                        }
                                    </CoreButton>
                                </div>
                            </div>
                        </div>

                        {/* Detail Drawer */}
                        <InfluencerDetailDrawer
                            isOpen={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                            influencer={drawerInfluencer}
                            masterTemplate={masterTemplate}
                            onSave={(id, updates) => {
                                setLocalInfluencers(prev => prev.map(inf =>
                                    inf.id === id ? { ...inf, ...updates, automationStatus: 'updating' } : inf
                                ));
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
