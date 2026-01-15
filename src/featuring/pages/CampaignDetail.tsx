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
interface CampaignDetailProps {
    campaign: Campaign;
    influencers: CampaignInfluencer[];
    contents: CampaignContent[];
    reactionAutomation?: ReactionAutomationType;
    automationInfluencers?: AutomationInfluencer[];
    onBack: () => void;
    onEdit: () => void;
    onAddReactionAutomation?: () => void;
    onEditReactionAutomation?: () => void;
}

type TabType = 'influencers' | 'contents' | 'reports' | 'reaction-automation';

export function CampaignDetail({ campaign, influencers, contents, reactionAutomation, automationInfluencers = [], onBack, onEdit, onAddReactionAutomation, onEditReactionAutomation }: CampaignDetailProps) {
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
            <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] bg-[var(--ft-bg-primary)]">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-8 h-8 flex items-center justify-center rounded-[var(--ft-radius-md)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                    <h1 className="text-lg font-medium text-[var(--ft-text-primary)] flex-1">
                        {campaign.name}
                    </h1>
                    <CoreButton variant="secondary" size="sm" leftIcon={<Edit className="w-4 h-4" />} onClick={onEdit}>
                        수정
                    </CoreButton>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-auto">
                {/* Campaign Info Section - Collapsible */}
                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] mb-6 overflow-hidden">
                    {/* Toggle Header */}
                    <button
                        onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors"
                    >
                        <span className="text-sm font-medium text-[var(--ft-text-primary)]">캠페인 정보</span>
                        <ChevronDown className={`w-5 h-5 text-[var(--ft-text-secondary)] transition-transform duration-200 ${isInfoExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Collapsible Content */}
                    <div className={`transition-all duration-300 ease-in-out ${isInfoExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}>
                        <div className="grid grid-cols-2 gap-8 px-6 pb-6 border-t border-[var(--ft-border-primary)] pt-4">
                            {/* Left: Campaign Details */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-[var(--ft-text-disabled)] mb-1">캠페인명</p>
                                    <p className="text-sm font-medium text-[var(--ft-text-primary)]">{campaign.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--ft-text-disabled)] mb-1">태그</p>
                                    <div className="flex items-center gap-1 flex-wrap">
                                        {campaign.tags.map((tag) => (
                                            <CoreTag key={tag} colorType={getTagColor(tag)} size="sm">
                                                {tag}
                                            </CoreTag>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">캠페인 기간</p>
                                        <p className="text-sm text-[var(--ft-text-primary)]">
                                            {campaign.startDate} - {campaign.endDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">상태</p>
                                        <div className="flex items-center gap-1.5">
                                            <CoreDot size="sm" color={statusDisplay.color} />
                                            <span className="text-sm text-[var(--ft-text-primary)]">{statusDisplay.label}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--ft-text-disabled)] mb-1">브랜드</p>
                                    <p className="text-sm text-[var(--ft-text-primary)]">{campaign.brandName}</p>
                                </div>
                            </div>

                            {/* Right: Platform & Progress */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-[var(--ft-text-disabled)] mb-1">플랫폼</p>
                                    <div className="flex items-center gap-2">
                                        {campaign.platform && (
                                            <span className="text-lg">{getPlatformIcon(campaign.platform)}</span>
                                        )}
                                        <span className="text-sm text-[var(--ft-text-primary)]">
                                            {campaign.platform === 'instagram' ? 'Instagram' :
                                                campaign.platform === 'tiktok' ? 'TikTok' :
                                                    campaign.platform === 'youtube' ? 'YouTube' : '-'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--ft-text-disabled)] mb-1">콘텐츠 생성률</p>
                                    <p className="text-sm text-[var(--ft-text-primary)]">70% (70/100)</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--ft-text-disabled)] mb-1">진행 일수</p>
                                    <p className="text-sm text-[var(--ft-text-primary)]">14일째</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-[var(--ft-color-primary-600)]" />
                            <span className="text-xs text-[var(--ft-text-secondary)]">참여 인플루언서</span>
                        </div>
                        <p className="text-xl font-bold text-[var(--ft-text-primary)]">
                            {totalInfluencers}
                            <span className="text-sm font-normal text-[var(--ft-text-disabled)] ml-1">명</span>
                        </p>
                    </div>

                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-[var(--ft-color-green-600)]" />
                            <span className="text-xs text-[var(--ft-text-secondary)]">전환된 광고비</span>
                        </div>
                        <p className="text-xl font-bold text-[var(--ft-text-primary)]">
                            {formatCurrency(totalSpent)}
                        </p>
                    </div>

                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-[var(--ft-color-orange-500)]" />
                            <span className="text-xs text-[var(--ft-text-secondary)]">전환률</span>
                        </div>
                        <p className="text-xl font-bold text-[var(--ft-text-primary)]">
                            {conversionRate}%
                        </p>
                    </div>

                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-[var(--ft-color-teal-500)]" />
                            <span className="text-xs text-[var(--ft-text-secondary)]">전체 콘텐츠 도달률</span>
                        </div>
                        <p className="text-xl font-bold text-[var(--ft-text-primary)]">
                            {totalReach}%
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 border-b border-[var(--ft-border-primary)]">
                        <button
                            onClick={() => setActiveTab('influencers')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'influencers'
                                ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                                : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                                }`}
                        >
                            인플루언서 {influencers.length}명
                        </button>
                        <button
                            onClick={() => setActiveTab('contents')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'contents'
                                ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                                : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                                }`}
                        >
                            콘텐츠
                        </button>
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reports'
                                ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                                : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                                }`}
                        >
                            리포트
                        </button>

                        {/* Reaction Automation Tab - only show if added */}
                        {hasReactionAutomation && (
                            <button
                                onClick={() => setActiveTab('reaction-automation')}
                                className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${activeTab === 'reaction-automation'
                                    ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                                    : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                                    }`}
                            >
                                <Zap className="w-4 h-4" />
                                반응 자동화
                            </button>
                        )}

                        {/* +기능 추가 Button */}
                        <div className="relative ml-4">
                            <button
                                onClick={() => setIsAddFeatureOpen(!isAddFeatureOpen)}
                                className="flex items-center gap-1 pb-3 text-sm font-medium text-[var(--ft-color-primary-600)] hover:text-[var(--ft-color-primary-700)] transition-colors"
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
                                    <div className="absolute left-0 top-full mt-1 z-20 w-48 bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] shadow-[var(--ft-shadow-lg)] py-1">
                                        <button
                                            onClick={() => {
                                                setIsAddFeatureOpen(false);
                                                setHasReactionAutomation(true);
                                                setActiveTab('reaction-automation');
                                            }}
                                            disabled={hasReactionAutomation}
                                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${hasReactionAutomation
                                                ? 'text-[var(--ft-text-disabled)] cursor-not-allowed'
                                                : 'text-[var(--ft-text-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)]'}`}
                                        >
                                            <Zap className="w-4 h-4 text-[var(--ft-color-orange-500)]" />
                                            반응 자동화 {hasReactionAutomation && '(추가됨)'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <CoreButton variant="secondary" size="sm">
                            기능별 필터
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </CoreButton>
                        <CoreButton variant="secondary" size="sm">
                            콘텐츠 여부
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </CoreButton>
                        <CoreButton variant="primary" size="sm" leftIcon={<Send className="w-4 h-4" />}>
                            가이드 전달
                        </CoreButton>
                    </div>
                </div>

                {/* Influencer Table */}
                {activeTab === 'influencers' && (
                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-secondary)] overflow-hidden">
                        {/* Table Header */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[1400px]">
                                <div className="grid grid-cols-[40px_180px_80px_100px_100px_80px_80px_80px_90px_100px_100px_100px_80px_100px] items-center h-10 border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)] px-4 text-[12px] text-[var(--ft-text-secondary)]">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedInfluencers.length === influencers.length && influencers.length > 0}
                                            onChange={toggleAllInfluencers}
                                            className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                        />
                                    </div>
                                    <span>계정</span>
                                    <span>카테고리</span>
                                    <span>과업</span>
                                    <span>도달 AI 예측치</span>
                                    <span>맞춤사항</span>
                                    <span>콘텐츠여부</span>
                                    <span>계약발송</span>
                                    <span>팔로워 수</span>
                                    <span>콘텐츠 도달수</span>
                                    <span>총 콘텐츠 비용</span>
                                    <span>콘텐츠 수령일</span>
                                    <span>CPV 성과</span>
                                    <span>가이드 전달</span>
                                </div>

                                {/* Table Body */}
                                {influencers.length === 0 ? (
                                    <div className="py-16 text-center">
                                        <p className="text-sm text-[var(--ft-text-disabled)]">
                                            참여 인플루언서가 없습니다
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        {influencers.map((influencer) => (
                                            <div
                                                key={influencer.id}
                                                className="grid grid-cols-[40px_180px_80px_100px_100px_80px_80px_80px_90px_100px_100px_100px_80px_100px] items-center min-h-[52px] border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)] px-4 text-[13px]"
                                            >
                                                {/* Checkbox */}
                                                <div className="flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedInfluencers.includes(influencer.id)}
                                                        onChange={() => toggleInfluencer(influencer.id)}
                                                        className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                                    />
                                                </div>
                                                {/* Account */}
                                                <div className="flex items-center gap-2">
                                                    <CoreAvatar
                                                        src={influencer.profileImage}
                                                        name={influencer.displayName}
                                                        size="sm"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-[var(--ft-text-primary)]">
                                                            {influencer.displayName}
                                                        </p>
                                                        <p className="text-xs text-[var(--ft-text-disabled)]">
                                                            @{influencer.username}
                                                        </p>
                                                    </div>
                                                    {influencer.contentUrl && (
                                                        <a href={influencer.contentUrl} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="w-3 h-3 text-[var(--ft-text-disabled)]" />
                                                        </a>
                                                    )}
                                                </div>

                                                {/* Category */}
                                                <span className="text-[var(--ft-text-secondary)]">{influencer.category}</span>

                                                {/* Task */}
                                                <CoreTag colorType="primary" size="xs">{influencer.task}</CoreTag>

                                                {/* AI Reach Prediction */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {influencer.aiReachPrediction ? formatNumber(influencer.aiReachPrediction) : '-'}
                                                </span>

                                                {/* Custom Requirements */}
                                                <span className="text-center">
                                                    {influencer.hasCustomRequirements ? (
                                                        <Check className="w-4 h-4 text-[var(--ft-color-green-600)] inline" />
                                                    ) : (
                                                        <span className="text-[var(--ft-text-disabled)]">-</span>
                                                    )}
                                                </span>

                                                {/* Content Usage */}
                                                <CoreStatusBadge
                                                    colorType={influencer.contentUsageApproved ? 'success' : 'default'}
                                                    type="tint"
                                                    size="sm"
                                                >
                                                    {influencer.contentUsageApproved ? 'Yes' : 'No'}
                                                </CoreStatusBadge>

                                                {/* Contract Sent */}
                                                <span className="text-center">
                                                    {influencer.contractSent ? (
                                                        <Check className="w-4 h-4 text-[var(--ft-color-green-600)] inline" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-[var(--ft-text-disabled)] inline" />
                                                    )}
                                                </span>

                                                {/* Follower Count */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {formatNumber(influencer.followerCount)}
                                                </span>

                                                {/* Content Reach */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {influencer.contentReachCount ? formatNumber(influencer.contentReachCount) : '-'}
                                                </span>

                                                {/* Total Cost */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {influencer.totalContentCost ? formatCurrency(influencer.totalContentCost) : '-'}
                                                </span>

                                                {/* Content Received Date */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {influencer.contentReceivedDate || '-'}
                                                </span>

                                                {/* CPV Performance */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {influencer.cpvPerformance || '-'}
                                                </span>

                                                {/* Guide Delivered */}
                                                <span className="text-[var(--ft-text-secondary)]">
                                                    {influencer.guideDelivered ? '전달완료' : '미전달'}
                                                </span>
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

                {/* Reaction Automation Tab */}
                {activeTab === 'reaction-automation' && (
                    <CampaignAutomationDashboard
                        campaignInfluencerCount={influencers.length}
                        formatNumber={formatNumber}
                    />
                )}
            </div>
        </div>
    );
}
