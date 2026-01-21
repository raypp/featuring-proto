import { useState } from "react";
import {
    ArrowLeft,
    Edit,
    Users,
    DollarSign,
    TrendingUp,
    BarChart3,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Send,
    Check,
    X,
    ExternalLink,
    Image,
    Plus,
    Zap,
    Calendar,
    MousePointer
} from "lucide-react";
import { Campaign, CampaignInfluencer, CampaignContent, ReactionAutomation as ReactionAutomationType, AutomationInfluencer } from "../types";
import { CoreButton, CoreTag, CoreDot, CoreAvatar, CoreStatusBadge } from "../../design-system";

import { CampaignAutomationDashboard } from "../components/CampaignAutomationDashboard";
import { AutomationGroupSummary } from "../types";
import { InfluencerGrid } from "../components/InfluencerGrid";

interface CampaignDetailProps {
    campaign: Campaign;
    influencers: CampaignInfluencer[];
    contents: CampaignContent[];
    reactionAutomation?: ReactionAutomationType;
    automationInfluencers?: AutomationInfluencer[];
    campaignAutomations?: AutomationGroupSummary[];
    onBack: () => void;
    onEdit: () => void;
    onAddReactionAutomation?: () => void;
    onEditReactionAutomation?: () => void;
    onNavigateToAutomation?: (automationId: number) => void;
    onAddAutomation?: (automation: AutomationGroupSummary) => void;
}

type TabType = 'influencers' | 'contents' | 'reports' | 'reaction-automation';

export function CampaignDetail({ campaign, influencers, contents, reactionAutomation, automationInfluencers = [], campaignAutomations = [], onBack, onEdit, onAddReactionAutomation, onEditReactionAutomation, onNavigateToAutomation, onAddAutomation }: CampaignDetailProps) {
    const [activeTab, setActiveTab] = useState<TabType>('influencers');
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [isInfoExpanded, setIsInfoExpanded] = useState(true);
    const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
    const [selectedContents, setSelectedContents] = useState<number[]>([]);
    const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
    const [hasReactionAutomation, setHasReactionAutomation] = useState(!!reactionAutomation);
    const [selectedAutomationInfluencers, setSelectedAutomationInfluencers] = useState<number[]>([]);

    // Selection handlers
    const toggleInfluencer = (id: number) => {
        setSelectedInfluencers(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAllInfluencers = () => {
        if (selectedInfluencers.length === influencers.length) {
            setSelectedInfluencers([]);
        } else {
            setSelectedInfluencers(influencers.map(i => i.id));
        }
    };

    const toggleContent = (id: number) => {
        setSelectedContents(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAllContents = () => {
        if (selectedContents.length === contents.length) {
            setSelectedContents([]);
        } else {
            setSelectedContents(contents.map(c => c.id));
        }
    };

    const getStatusDisplay = (status: Campaign['status']) => {
        switch (status) {
            case 'drafting':
                return { color: 'gray' as const, label: '작성 중' };
            case 'pending':
                return { color: 'purple' as const, label: '진행 예정' };
            case 'running':
                return { color: 'green' as const, label: '진행 중' };
            case 'completed':
                return { color: 'gray' as const, label: '완료' };
            case 'archived':
                return { color: 'gray' as const, label: '보관됨' };
            default:
                return { color: 'gray' as const, label: status };
        }
    };

    const getTagColor = (tag: Campaign['tags'][number]) => {
        switch (tag) {
            case 'Sponsored Content': return 'primary' as const;
            case 'Ambassadors': return 'blue' as const;
            case 'Engagement': return 'teal' as const;
            case 'Reach': return 'orange' as const;
            case 'UGC': return 'gray' as const;
            case 'KOLs': return 'indigo' as const;
            default: return 'gray' as const;
        }
    };

    const getPlatformIcon = (platform?: Campaign['platform']) => {
        switch (platform) {
            case 'instagram': return '📷';
            case 'tiktok': return '🎵';
            case 'youtube': return '▶️';
            default: return null;
        }
    };

    const formatCurrency = (value: number) => {
        if (value >= 100000000) {
            return (value / 100000000).toFixed(1) + '억 원';
        } else if (value >= 10000) {
            return (value / 10000).toFixed(0) + '만 원';
        }
        return value.toLocaleString('ko-KR') + ' 원';
    };

    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

    const statusDisplay = getStatusDisplay(campaign.status);

    // Calculate stats
    const totalInfluencers = influencers.length;
    const totalSpent = influencers.reduce((sum, i) => sum + (i.totalContentCost || 0), 0);
    const conversionRate = 10; // Mock
    const totalReach = 30; // Mock percentage

    // Convert campaign influencers to automation influencers for reaction automation tab
    const campaignAutomationInfluencers: AutomationInfluencer[] = influencers.map((inf) => ({
        id: inf.id,
        influencerId: inf.id,
        displayName: inf.displayName,
        username: inf.username,
        profileImage: inf.profileImage,
        isConnected: true, // Assume connected since they're in the campaign
        status: 'pending' as const,
        sentCount: 0,
        clickCount: 0,
        cpv: 0,
        cpe: 0,
        isTemplateShared: false,
        likes: 0,
        comments: 0,
        saves: 0,
        reposts: 0,
        shares: 0,
        uniqueReach: 0,
        uniqueClicks: 0,
        ctr: 0,
        followConversions: 0,
        followConversionRate: 0
    }));

    // Use campaign influencers for reaction automation if no specific automation influencers provided
    const effectiveAutomationInfluencers = automationInfluencers.length > 0
        ? automationInfluencers
        : campaignAutomationInfluencers;

    return (
        <div className="flex flex-col h-full bg-[var(--ft-bg-secondary)]">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                {/* Top Nav / Title Area */}
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-900">{campaign.name}</span>
                            <CoreButton variant="tertiary" size="sm" onClick={onEdit}>
                                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                            </CoreButton>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">진행 중</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-gray-500 flex items-center gap-1 text-sm">
                            <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">i</div>
                            상세 정보
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Tabs (Now at Top) */}
                <div className="px-6 flex gap-6 border-b border-gray-100 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab('influencers')}
                        className={`pb-3 border-b-2 transition-colors ${activeTab === 'influencers'
                            ? 'text-gray-900 border-gray-900'
                            : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                    >
                        인플루언서
                    </button>
                    <button
                        onClick={() => setActiveTab('contents')}
                        className={`pb-3 border-b-2 transition-colors ${activeTab === 'contents'
                            ? 'text-gray-900 border-gray-900'
                            : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                    >
                        콘텐츠
                    </button>
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`pb-3 border-b-2 transition-colors ${activeTab === 'reports'
                            ? 'text-gray-900 border-gray-900'
                            : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                    >
                        리포트
                    </button>

                    {/* Reaction Automation Tab - only show if added */}
                    {hasReactionAutomation && (
                        <button
                            onClick={() => setActiveTab('reaction-automation')}
                            className={`pb-3 border-b-2 transition-colors flex items-center gap-1 ${activeTab === 'reaction-automation'
                                ? 'text-gray-900 border-gray-900'
                                : 'text-gray-500 border-transparent hover:text-gray-700'
                                }`}
                        >
                            <Zap className="w-4 h-4" />
                            반응 자동화
                        </button>
                    )}

                    {/* +기능 추가 Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsAddFeatureOpen(!isAddFeatureOpen)}
                            className="flex items-center gap-1 pb-3 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            기능 추가
                        </button>

                        {/* Dropdown Menu */}
                        {isAddFeatureOpen && (
                            <>
                                {/* Overlay to close dropdown */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsAddFeatureOpen(false)}
                                />
                                <div className="absolute left-0 top-full mt-1 z-20 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1">
                                    <button
                                        onClick={() => {
                                            setIsAddFeatureOpen(false);
                                            setHasReactionAutomation(true);
                                            setActiveTab('reaction-automation');
                                        }}
                                        disabled={hasReactionAutomation}
                                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${hasReactionAutomation
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-900 hover:bg-gray-50'}`}
                                    >
                                        <Zap className="w-4 h-4 text-orange-500" />
                                        반응 자동화 {hasReactionAutomation && '(추가됨)'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Stats Section (Clean Text) */}
                <div className="px-6 py-8 border-b border-gray-100 flex items-center">
                    <div className="flex-1 border-r border-gray-100 pr-8">
                        <p className="text-xs text-gray-500 mb-2">전체 인플루언서 수</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">{totalInfluencers} 명</span>
                            <span className="text-sm text-gray-400">/500</span>
                        </div>
                    </div>
                    <div className="flex-1 px-8 border-r border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">평균 팔로워 수</p>
                        <p className="text-2xl font-bold text-gray-900">9,204만 명</p>
                    </div>
                    <div className="flex-1 px-8">
                        <p className="text-xs text-gray-500 mb-2">콘텐츠 업로드 완료율</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">30%</span>
                            <span className="text-sm text-gray-400">(30/100)</span>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="px-6 py-4 flex items-center justify-between bg-white">
                    <CoreButton variant="secondary" size="sm" leftIcon={<Users className="w-4 h-4" />}>
                        필터
                    </CoreButton>
                    <div className="w-[300px] relative">
                        <input
                            type="text"
                            placeholder="아이디, 닉네임, 카테고리 등 검색"
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <MousePointer className="w-4 h-4 rotate-90" /> {/* Using MousePointer as generic search icon if needed, or Search */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-auto bg-white">

                {/* Influencer Table AG Grid */}
                {activeTab === 'influencers' && (
                    <InfluencerGrid
                        influencers={influencers}
                        onSelectionChange={setSelectedInfluencers}
                    />
                )}

                {/* Contents Tab */}
                {activeTab === 'contents' && (
                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-secondary)] overflow-hidden">
                        {/* Table Header */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[1600px]">
                                <div className="grid grid-cols-[40px_60px_150px_80px_80px_70px_70px_70px_80px_80px_100px_80px_80px_100px] items-center h-10 border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)] px-4 text-[12px] text-[var(--ft-text-secondary)]">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedContents.length === contents.length && contents.length > 0}
                                            onChange={toggleAllContents}
                                            className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                        />
                                    </div>
                                    <span></span>
                                    <span>인플루언서</span>
                                    <span>콘텐츠 유형</span>
                                    <span>게시일</span>
                                    <span>좋아요</span>
                                    <span>댓글</span>
                                    <span>저장</span>
                                    <span>도달</span>
                                    <span>인사이트</span>
                                    <span>콘텐츠 비용</span>
                                    <span>CPV</span>
                                    <span>2차 활용</span>
                                    <span>승인 상태</span>
                                </div>

                                {/* Table Body */}
                                {contents.length === 0 ? (
                                    <div className="py-16 text-center">
                                        <p className="text-sm text-[var(--ft-text-disabled)]">
                                            콘텐츠가 없습니다
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        {contents.map((content) => (
                                            <div
                                                key={content.id}
                                                className="grid grid-cols-[40px_60px_150px_80px_80px_70px_70px_70px_80px_80px_100px_80px_80px_100px] items-center min-h-[64px] border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)] px-4 text-[13px]"
                                            >
                                                {/* Checkbox */}
                                                <div className="flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedContents.includes(content.id)}
                                                        onChange={() => toggleContent(content.id)}
                                                        className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                                    />
                                                </div>

                                                {/* Thumbnail */}
                                                <div className="flex items-center justify-center">
                                                    {content.thumbnailUrl ? (
                                                        <img
                                                            src={content.thumbnailUrl}
                                                            alt="content"
                                                            className="w-10 h-10 rounded-[var(--ft-radius-md)] object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-[var(--ft-radius-md)] bg-[var(--ft-bg-secondary)] flex items-center justify-center">
                                                            <Image className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Influencer */}
                                                <div className="flex items-center gap-2">
                                                    <CoreAvatar
                                                        src={content.influencerProfileImage}
                                                        name={content.influencerDisplayName}
                                                        size="xs"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-[var(--ft-text-primary)]">
                                                            {content.influencerDisplayName}
                                                        </p>
                                                        <p className="text-xs text-[var(--ft-text-disabled)]">
                                                            @{content.influencerUsername}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Content Type */}
                                                <CoreTag colorType="gray" size="xs">{content.contentType}</CoreTag>

                                                {/* Posted Date */}
                                                <span className="text-[var(--ft-text-secondary)]">{content.postedDate}</span>

                                                {/* Likes */}
                                                <span className="text-[var(--ft-text-secondary)]">{formatNumber(content.likes)}</span>

                                                {/* Comments */}
                                                <span className="text-[var(--ft-text-secondary)]">{formatNumber(content.comments)}</span>

                                                {/* Saves */}
                                                <span className="text-[var(--ft-text-secondary)]">{formatNumber(content.saves)}</span>

                                                {/* Reach */}
                                                <span className="text-[var(--ft-text-secondary)]">{formatNumber(content.reach)}</span>

                                                {/* Insight Data */}
                                                <span className="text-center">
                                                    {content.insightDataReceived ? (
                                                        <Check className="w-4 h-4 text-[var(--ft-color-green-600)] inline" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-[var(--ft-text-disabled)] inline" />
                                                    )}
                                                </span>

                                                {/* Content Cost */}
                                                <span className="text-[var(--ft-text-secondary)]">{formatCurrency(content.contentCost)}</span>

                                                {/* CPV */}
                                                <span className="text-[var(--ft-text-secondary)]">{content.cpv}</span>

                                                {/* Secondary Usage */}
                                                <CoreStatusBadge
                                                    colorType={content.secondaryUsage ? 'success' : 'default'}
                                                    type="tint"
                                                    size="sm"
                                                >
                                                    {content.secondaryUsage ? '사용' : '미사용'}
                                                </CoreStatusBadge>

                                                {/* Approval Status */}
                                                <CoreStatusBadge
                                                    colorType={
                                                        content.approvalStatus === 'approved' ? 'success' :
                                                            content.approvalStatus === 'rejected' ? 'error' : 'warning'
                                                    }
                                                    type="tint"
                                                    size="sm"
                                                >
                                                    {content.approvalStatus === 'approved' ? '승인됨' :
                                                        content.approvalStatus === 'rejected' ? '반려됨' : '대기중'}
                                                </CoreStatusBadge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--ft-border-primary)]">
                            <div className="flex items-center gap-2">
                                <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                    className="h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] bg-[var(--ft-bg-primary)] focus:outline-none"
                                >
                                    <option value={25}>25 / page</option>
                                    <option value={50}>50 / page</option>
                                    <option value={100}>100 / page</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-1">
                                <CoreButton variant="tertiary" size="xs">
                                    <ChevronLeft className="w-4 h-4" />
                                </CoreButton>
                                <span className="px-3 text-[13px] font-medium text-[var(--ft-text-primary)]">
                                    {currentPage}
                                </span>
                                <CoreButton variant="tertiary" size="xs">
                                    <ChevronRight className="w-4 h-4" />
                                </CoreButton>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="페이지 입력"
                                    className="w-20 h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none"
                                />
                                <CoreButton variant="primary" size="xs">
                                    이동
                                </CoreButton>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reports Tab Placeholder */}
                {activeTab === 'reports' && (
                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-16 text-center">
                        <p className="text-[var(--ft-text-disabled)]">리포트 탭 내용이 여기에 표시됩니다</p>
                    </div>
                )}

                {/* Reaction Automation Tab - Summary Dashboard */}
                {activeTab === 'reaction-automation' && (
                    <CampaignAutomationDashboard
                        campaignInfluencerCount={influencers.length}
                        formatNumber={formatNumber}
                        onNavigateToAutomation={onNavigateToAutomation}
                        onAddAutomation={onAddAutomation}
                        existingAutomations={campaignAutomations}
                    />
                )}
            </div>
        </div>
    );
}
