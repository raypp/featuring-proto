import { useState } from "react";
import { Plus, Search, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, FileText, Upload, DollarSign } from "lucide-react";
import { Campaign } from "../types";
import { CoreButton, CoreDot, CoreTag, CoreDropdown, CoreDropdownItem } from "../../design-system";

interface CampaignManagementProps {
    campaigns: Campaign[];
    onNavigate: (view: string) => void;
    onCreateCampaign: () => void;
}

type TabType = 'all' | 'drafting' | 'pending' | 'running' | 'completed' | 'archived';

const CAMPAIGN_TYPES = ['전체 캠페인 유형', '어필리에이트', '뮤가 시딩', '오프라인/팝업', '노스폰서쉽'] as const;

export function CampaignManagement({ campaigns, onNavigate, onCreateCampaign }: CampaignManagementProps) {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [selectedType, setSelectedType] = useState<string>('전체 캠페인 유형');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

    // Filter campaigns based on tab, type, and search
    const filteredCampaigns = campaigns.filter(campaign => {
        // Tab filter
        if (activeTab !== 'all' && campaign.status !== activeTab) return false;

        // Type filter
        if (selectedType !== '전체 캠페인 유형' && campaign.campaignType !== selectedType) return false;

        // Search filter
        if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        return true;
    });

    // Count by status
    const counts = {
        drafting: campaigns.filter(c => c.status === 'drafting').length,
        pending: campaigns.filter(c => c.status === 'pending').length,
        running: campaigns.filter(c => c.status === 'running').length,
        completed: campaigns.filter(c => c.status === 'completed').length,
        archived: campaigns.filter(c => c.status === 'archived').length,
    };

    // Calculate totals
    const totalCampaigns = campaigns.length;
    const totalContents = campaigns.reduce((sum, c) => sum + c.contentCount, 0);
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('ko-KR') + ' 원';
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
            case 'Sponsored Content':
                return 'primary' as const;
            case 'Ambassadors':
                return 'blue' as const;
            case 'Engagement':
                return 'teal' as const;
            case 'Reach':
                return 'orange' as const;
            case 'UGC':
                return 'gray' as const;
            case 'KOLs':
                return 'indigo' as const;
            default:
                return 'gray' as const;
        }
    };

    const getPlatformIcon = (platform?: Campaign['platform']) => {
        switch (platform) {
            case 'instagram':
                return '📷';
            case 'tiktok':
                return '🎵';
            case 'youtube':
                return '▶️';
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Page Header */}
            <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] bg-[var(--ft-bg-primary)]">
                <h1 className="text-lg font-medium text-[var(--ft-text-primary)]">
                    캠페인 관리
                </h1>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[var(--ft-color-primary-50)] rounded-[var(--ft-radius-md)] flex items-center justify-center">
                                <FileText className="w-4 h-4 text-[var(--ft-color-primary-600)]" />
                            </div>
                            <span className="text-sm text-[var(--ft-text-secondary)]">전체 캠페인 수</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {totalCampaigns}
                            <span className="text-sm font-normal text-[var(--ft-text-disabled)] ml-1">/100 개</span>
                        </p>
                    </div>

                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[var(--ft-color-green-50)] rounded-[var(--ft-radius-md)] flex items-center justify-center">
                                <Upload className="w-4 h-4 text-[var(--ft-color-green-600)]" />
                            </div>
                            <span className="text-sm text-[var(--ft-text-secondary)]">업로드된 콘텐츠 수</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {totalContents}
                            <span className="text-sm font-normal text-[var(--ft-text-disabled)] ml-1">개</span>
                        </p>
                    </div>

                    <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-[var(--ft-color-orange-50)] rounded-[var(--ft-radius-md)] flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-[var(--ft-color-orange-500)]" />
                            </div>
                            <span className="text-sm text-[var(--ft-text-secondary)]">총 광고비</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {formatCurrency(totalBudget)}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-4 border-b border-[var(--ft-border-primary)]">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        전체 {campaigns.length}
                    </button>
                    <button
                        onClick={() => setActiveTab('drafting')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'drafting'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        작성 중 {counts.drafting}
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pending'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        진행 대기 {counts.pending}
                    </button>
                    <button
                        onClick={() => setActiveTab('running')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'running'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        진행 중 {counts.running}
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        진행 완료 {counts.completed}
                    </button>
                    <button
                        onClick={() => setActiveTab('archived')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'archived'
                            ? 'text-[var(--ft-text-primary)] border-[var(--ft-text-primary)]'
                            : 'text-[var(--ft-text-disabled)] border-transparent hover:text-[var(--ft-text-secondary)]'
                            }`}
                    >
                        보관됨
                    </button>
                </div>

                {/* Filters & Actions */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Campaign Type Dropdown */}
                        <CoreDropdown
                            open={typeDropdownOpen}
                            onOpenChange={setTypeDropdownOpen}
                            trigger={
                                <button className="flex items-center gap-2 h-9 px-3 bg-[var(--ft-bg-primary)] border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-sm text-[var(--ft-text-secondary)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors">
                                    {selectedType}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            }
                            width={180}
                        >
                            {CAMPAIGN_TYPES.map((type) => (
                                <CoreDropdownItem
                                    key={type}
                                    selected={selectedType === type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setTypeDropdownOpen(false);
                                    }}
                                >
                                    {type}
                                </CoreDropdownItem>
                            ))}
                        </CoreDropdown>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                            <input
                                type="text"
                                placeholder="캠페인 검색"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-9 pr-4 w-[200px] bg-[var(--ft-bg-primary)] border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-sm text-[var(--ft-text-primary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-border-focus)]"
                            />
                        </div>

                        {/* Create Button */}
                        <CoreButton
                            variant="primary"
                            size="sm"
                            leftIcon={<Plus className="w-4 h-4" />}
                            onClick={onCreateCampaign}
                        >
                            새 캠페인 시작
                        </CoreButton>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-secondary)] overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_100px_180px_150px_100px_100px_80px_40px] items-center h-10 border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)] px-4">
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">캠페인명</span>
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">상태</span>
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">태그</span>
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">캠페인 기간</span>
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">캠페인 유형</span>
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">브랜드명</span>
                        <span className="text-[13px] text-[var(--ft-text-secondary)]">2차 활용(개)</span>
                        <span></span>
                    </div>

                    {/* Table Body */}
                    {filteredCampaigns.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="text-sm text-[var(--ft-text-disabled)]">
                                캠페인이 없습니다
                            </p>
                        </div>
                    ) : (
                        <div>
                            {filteredCampaigns.map((campaign) => {
                                const statusDisplay = getStatusDisplay(campaign.status);
                                return (
                                    <div
                                        key={campaign.id}
                                        className="grid grid-cols-[1fr_100px_180px_150px_100px_100px_80px_40px] items-center min-h-[56px] border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)] cursor-pointer transition-colors px-4"
                                        onClick={() => onNavigate(`campaign-detail-${campaign.id}`)}
                                    >
                                        {/* Campaign Name */}
                                        <div className="py-3">
                                            <p className="text-sm font-medium text-[var(--ft-text-primary)] mb-0.5">
                                                {campaign.name}
                                            </p>
                                            {campaign.description && (
                                                <p className="text-xs text-[var(--ft-text-disabled)] truncate max-w-[280px]">
                                                    {campaign.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-1.5">
                                            <CoreDot size="sm" color={statusDisplay.color} />
                                            <span className={`text-[13px] ${statusDisplay.color === 'purple' ? 'text-[var(--ft-color-primary-600)]' :
                                                statusDisplay.color === 'green' ? 'text-[var(--ft-color-green-600)]' :
                                                    'text-[var(--ft-text-secondary)]'
                                                }`}>
                                                {statusDisplay.label}
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex items-center gap-1 flex-wrap">
                                            {campaign.tags.slice(0, 2).map((tag) => (
                                                <CoreTag key={tag} colorType={getTagColor(tag)} size="xs">
                                                    {tag}
                                                </CoreTag>
                                            ))}
                                            {campaign.tags.length > 2 && (
                                                <span className="text-xs text-[var(--ft-text-disabled)]">
                                                    +{campaign.tags.length - 2}
                                                </span>
                                            )}
                                        </div>

                                        {/* Period */}
                                        <span className="text-[13px] text-[var(--ft-text-secondary)]">
                                            {campaign.startDate} - {campaign.endDate}
                                        </span>

                                        {/* Type */}
                                        <span className="text-[13px] text-[var(--ft-text-secondary)]">
                                            {campaign.campaignType}
                                        </span>

                                        {/* Brand */}
                                        <span className="text-[13px] text-[var(--ft-text-secondary)]">
                                            {campaign.brandName}
                                        </span>

                                        {/* Secondary Usage */}
                                        <div className="flex items-center gap-1">
                                            <span className="text-[13px] text-[var(--ft-text-secondary)]">
                                                {campaign.secondaryUsageCount}
                                            </span>
                                            {campaign.platform && (
                                                <span className="text-sm">{getPlatformIcon(campaign.platform)}</span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // TODO: Show dropdown menu
                                            }}
                                            className="w-7 h-7 flex items-center justify-center rounded-[var(--ft-radius-md)] hover:bg-[var(--ft-interactive-secondary-hover)] transition-colors"
                                        >
                                            <MoreHorizontal className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] bg-[var(--ft-bg-primary)] focus:outline-none focus:border-[var(--ft-border-focus)]"
                        >
                            <option value={20}>20 / page</option>
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
                            className="w-24 h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-border-focus)]"
                        />
                        <CoreButton variant="primary" size="xs">
                            이동
                        </CoreButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
