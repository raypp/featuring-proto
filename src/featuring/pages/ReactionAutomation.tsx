import { useState } from "react";
import {
    ArrowLeft,
    Edit2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Save,
    Link,
    MessageSquare,
    Hash,
    Users,
    Send,
    BarChart2,
    MousePointer,
    Zap
} from "lucide-react";
import { Campaign, ReactionAutomation as ReactionAutomationType, AutomationInfluencer } from "../types";
import { CoreButton, CoreTag, CoreDot, CoreAvatar, CoreStatusBadge } from "../../design-system";

interface ReactionAutomationProps {
    context: 'global' | 'campaign';
    mode?: 'view' | 'edit';
    campaignId?: number;
    campaignName?: string;
    automation?: ReactionAutomationType;
    campaigns?: Campaign[];
    influencers: AutomationInfluencer[];
    onBack: () => void;
    onSave?: (automation: Partial<ReactionAutomationType>) => void;
    onEdit?: () => void;
}

export function ReactionAutomation({
    context,
    mode = 'edit',
    campaignId,
    campaignName,
    automation,
    campaigns = [],
    influencers,
    onBack,
    onSave,
    onEdit
}: ReactionAutomationProps) {
    // Form state
    const [name, setName] = useState(automation?.name || '새 반응 자동화');
    const [isEditingName, setIsEditingName] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(campaignId || automation?.campaignId || null);
    const [triggerType, setTriggerType] = useState(automation?.triggerType || 'comment_keyword');
    const [keywords, setKeywords] = useState(automation?.triggerKeywords?.join(', ') || '');
    const [message, setMessage] = useState(automation?.message || '');
    const [linkUrl, setLinkUrl] = useState(automation?.linkUrl || '');
    const [linkButtonText, setLinkButtonText] = useState(automation?.linkButtonText || '자세히 보기');
    const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);

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

        if (connectedSelected.length < selectedInfluencers.length) {
            const confirmed = window.confirm(
                `선택한 ${selectedInfluencers.length}명 중 연동된 ${connectedSelected.length}명에게만 템플릿을 전달합니다. 진행하시겠습니까?`
            );
            if (!confirmed) return;
        }

        // Mock success
        alert(`연동된 인플루언서 ${connectedSelected.length}명에게 템플릿을 전달했습니다.`);
        setSelectedInfluencers([]);
    };

    const status = automation?.status || 'draft';
    const isConnected = context === 'campaign' || selectedCampaignId !== null;

    const getStatusBadge = () => {
        switch (status) {
            case 'running':
                return <CoreStatusBadge colorType="success" type="tint" size="sm">실행 중</CoreStatusBadge>;
            case 'stopped':
                return <CoreStatusBadge colorType="warning" type="tint" size="sm">중지됨</CoreStatusBadge>;
            default:
                return <CoreStatusBadge colorType="default" type="tint" size="sm">초안</CoreStatusBadge>;
        }
    };

    const getTriggerLabel = (type: string) => {
        switch (type) {
            case 'comment_keyword': return '댓글 키워드';
            case 'dm_keyword': return 'DM 키워드';
            case 'story_mention': return '스토리 멘션';
            default: return type;
        }
    };

    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

    // Calculate totals
    const totalSent = influencers.reduce((sum, i) => sum + i.sentCount, 0);
    const totalClicks = influencers.reduce((sum, i) => sum + i.clickCount, 0);
    const avgCpv = influencers.length > 0
        ? influencers.reduce((sum, i) => sum + (i.cpv || 0), 0) / influencers.length
        : 0;

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

                    {/* Editable Title */}
                    <div className="flex items-center gap-2 flex-1">
                        {isEditingName ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setIsEditingName(false)}
                                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                                autoFocus
                                className="text-lg font-medium text-[var(--ft-text-primary)] bg-transparent border-b-2 border-[var(--ft-color-primary-500)] outline-none px-1"
                            />
                        ) : (
                            <h1
                                className="text-lg font-medium text-[var(--ft-text-primary)] cursor-pointer hover:text-[var(--ft-color-primary-600)]"
                                onClick={() => setIsEditingName(true)}
                            >
                                {name}
                                <Edit2 className="w-4 h-4 inline ml-2 text-[var(--ft-text-disabled)]" />
                            </h1>
                        )}
                        {getStatusBadge()}
                    </div>

                    {/* Variable Area - Campaign Selection/Display */}
                    <div className="flex items-center gap-4">
                        {context === 'global' ? (
                            /* Global: Campaign Dropdown */
                            <div className="relative">
                                <button
                                    onClick={() => setIsCampaignDropdownOpen(!isCampaignDropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] hover:border-[var(--ft-color-primary-500)] transition-colors"
                                >
                                    <span className="text-sm text-[var(--ft-text-secondary)]">
                                        {selectedCampaignId
                                            ? campaigns.find(c => c.id === selectedCampaignId)?.name || '캠페인 선택'
                                            : '캠페인 선택'
                                        }
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                </button>

                                {isCampaignDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsCampaignDropdownOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-1 z-20 w-64 bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] shadow-[var(--ft-shadow-lg)] py-1 max-h-60 overflow-auto">
                                            {campaigns.map((campaign) => (
                                                <button
                                                    key={campaign.id}
                                                    onClick={() => {
                                                        setSelectedCampaignId(campaign.id);
                                                        setIsCampaignDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors ${selectedCampaignId === campaign.id ? 'text-[var(--ft-color-primary-600)] bg-[var(--ft-color-primary-50)]' : 'text-[var(--ft-text-primary)]'}`}
                                                >
                                                    {campaign.name}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            /* Campaign Context: Fixed Campaign Name */
                            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--ft-bg-secondary)] rounded-[var(--ft-radius-md)]">
                                <span className="text-xs text-[var(--ft-text-disabled)]">연결된 캠페인</span>
                                <span className="text-sm font-medium text-[var(--ft-text-primary)]">{campaignName}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {mode === 'edit' && onSave && (
                            <CoreButton variant="secondary" size="sm" leftIcon={<Save className="w-4 h-4" />} onClick={() => onSave({ name, message, linkUrl })}>
                                저장
                            </CoreButton>
                        )}
                        {status === 'running' ? (
                            <CoreButton variant="secondary" size="sm" leftIcon={<Pause className="w-4 h-4" />}>
                                중지
                            </CoreButton>
                        ) : (
                            <CoreButton variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
                                실행
                            </CoreButton>
                        )}
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    {mode === 'view' ? (
                        /* View Mode: Summary Card */
                        <div className="mb-6">
                            <div
                                className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6 cursor-pointer hover:border-[var(--ft-color-primary-300)] transition-colors"
                                onClick={onEdit}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-[var(--ft-radius-md)] bg-[var(--ft-color-orange-50)] flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-[var(--ft-color-orange-500)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                                                {name}
                                            </h3>
                                            <p className="text-xs text-[var(--ft-text-disabled)]">템플릿 설정</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-[var(--ft-text-disabled)]" />
                                </div>

                                <div className="grid grid-cols-4 gap-4 p-4 bg-[var(--ft-bg-secondary)] rounded-[var(--ft-radius-md)]">
                                    <div>
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">트리거</p>
                                        <p className="text-sm text-[var(--ft-text-primary)]">
                                            {getTriggerLabel(triggerType)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">키워드</p>
                                        <p className="text-sm text-[var(--ft-text-primary)] truncate">
                                            {keywords || '설정되지 않음'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">메시지</p>
                                        <p className="text-sm text-[var(--ft-text-primary)] truncate">
                                            {message || '메시지를 설정해주세요'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--ft-text-disabled)] mb-1">링크</p>
                                        <p className="text-sm text-[var(--ft-text-primary)] truncate">
                                            {linkUrl || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Edit Mode: Template Builder + Preview */
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Left: Template Builder */}
                            <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6">
                                <h2 className="text-base font-semibold text-[var(--ft-text-primary)] mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                                    템플릿 설정
                                </h2>

                                {/* Trigger Type */}
                                <div className="mb-4">
                                    <label className="block text-xs text-[var(--ft-text-disabled)] mb-2">트리거 유형</label>
                                    <div className="flex gap-2">
                                        {(['comment_keyword', 'dm_keyword', 'story_mention'] as const).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setTriggerType(type)}
                                                className={`px-3 py-2 text-sm rounded-[var(--ft-radius-md)] border transition-colors ${triggerType === type
                                                    ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-600)]'
                                                    : 'border-[var(--ft-border-primary)] text-[var(--ft-text-secondary)] hover:border-[var(--ft-color-primary-300)]'
                                                    }`}
                                            >
                                                {getTriggerLabel(type)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div className="mb-4">
                                    <label className="block text-xs text-[var(--ft-text-disabled)] mb-2">
                                        <Hash className="w-3 h-3 inline mr-1" />
                                        트리거 키워드 (쉼표로 구분)
                                    </label>
                                    <input
                                        type="text"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        placeholder="예: 가격, 구매, 링크"
                                        className="w-full h-10 px-3 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-sm text-[var(--ft-text-primary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                                    />
                                </div>

                                {/* Message */}
                                <div className="mb-4">
                                    <label className="block text-xs text-[var(--ft-text-disabled)] mb-2">DM 메시지</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="자동으로 발송될 DM 메시지를 입력하세요..."
                                        rows={4}
                                        className="w-full px-3 py-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-sm text-[var(--ft-text-primary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-color-primary-500)] resize-none"
                                    />
                                </div>

                                {/* Link */}
                                <div className="mb-4">
                                    <label className="block text-xs text-[var(--ft-text-disabled)] mb-2">
                                        <Link className="w-3 h-3 inline mr-1" />
                                        링크 URL (선택)
                                    </label>
                                    <input
                                        type="url"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                        placeholder="https://example.com/landing"
                                        className="w-full h-10 px-3 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-sm text-[var(--ft-text-primary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                                    />
                                </div>

                                {/* Link Button Text */}
                                {linkUrl && (
                                    <div>
                                        <label className="block text-xs text-[var(--ft-text-disabled)] mb-2">버튼 텍스트</label>
                                        <input
                                            type="text"
                                            value={linkButtonText}
                                            onChange={(e) => setLinkButtonText(e.target.value)}
                                            placeholder="자세히 보기"
                                            className="w-full h-10 px-3 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-sm text-[var(--ft-text-primary)] placeholder:text-[var(--ft-text-disabled)] focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Right: Phone Preview */}
                            <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6 flex flex-col items-center">
                                <h2 className="text-base font-semibold text-[var(--ft-text-primary)] mb-4 self-start">미리보기</h2>

                                {/* Phone Frame */}
                                <div className="w-[280px] h-[500px] bg-[#1a1a1a] rounded-[36px] p-3 shadow-xl">
                                    <div className="w-full h-full bg-white rounded-[28px] overflow-hidden flex flex-col">
                                        {/* Phone Header */}
                                        <div className="h-12 bg-[var(--ft-bg-secondary)] flex items-center px-4 border-b border-[var(--ft-border-primary)]">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                            <span className="ml-2 text-sm font-medium text-[var(--ft-text-primary)]">브랜드 계정</span>
                                        </div>

                                        {/* Chat Area */}
                                        <div className="flex-1 p-4 overflow-auto">
                                            {message && (
                                                <div className="bg-[var(--ft-bg-secondary)] rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                                                    <p className="text-sm text-[var(--ft-text-primary)] whitespace-pre-wrap">{message}</p>
                                                    {linkUrl && (
                                                        <button className="mt-2 w-full py-2 bg-[var(--ft-color-primary-600)] text-white text-sm font-medium rounded-lg">
                                                            {linkButtonText}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            {!message && (
                                                <p className="text-center text-sm text-[var(--ft-text-disabled)] mt-20">
                                                    메시지를 입력하면<br />여기에 미리보기가 표시됩니다
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom: Influencer Performance Table */}
                    {mode === 'view' && (
                        <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)]">
                            {/* Table Header */}
                            <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                                <h2 className="text-base font-semibold text-[var(--ft-text-primary)] flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                                    참여 인플루언서 및 성과
                                    <span className="text-sm font-normal text-[var(--ft-text-disabled)] ml-2">
                                        {influencers.length}명
                                    </span>
                                </h2>

                                {selectedInfluencers.length > 0 ? (
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-[var(--ft-color-primary-600)]">
                                            {selectedInfluencers.length}명 선택됨
                                        </span>
                                        <CoreButton
                                            variant="primary"
                                            size="sm"
                                            leftIcon={<Send className="w-4 h-4" />}
                                            onClick={handleDeliver}
                                        >
                                            템플릿 전달
                                        </CoreButton>
                                    </div>
                                ) : (
                                    /* Stats Summary */
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <Send className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                            <span className="text-sm text-[var(--ft-text-secondary)]">발송: {formatNumber(totalSent)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MousePointer className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                            <span className="text-sm text-[var(--ft-text-secondary)]">클릭: {formatNumber(totalClicks)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BarChart2 className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                            <span className="text-sm text-[var(--ft-text-secondary)]">평균 CPV: {avgCpv.toFixed(0)}원</span>
                                        </div>
                                        {context === 'campaign' && (
                                            <CoreButton variant="secondary" size="sm" leftIcon={<Users className="w-4 h-4" />}>
                                                인플루언서 추가
                                            </CoreButton>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Table Content */}
                            {!isConnected ? (
                                /* Empty State for Global context without campaign */
                                <div className="py-16 text-center">
                                    <Zap className="w-12 h-12 text-[var(--ft-text-disabled)] mx-auto mb-4" />
                                    <p className="text-[var(--ft-text-secondary)] mb-2">캠페인을 연결하면 인플루언서를 불러올 수 있습니다</p>
                                    <p className="text-sm text-[var(--ft-text-disabled)]">상단에서 캠페인을 선택해주세요</p>
                                </div>
                            ) : influencers.length === 0 ? (
                                <div className="py-16 text-center">
                                    <Users className="w-12 h-12 text-[var(--ft-text-disabled)] mx-auto mb-4" />
                                    <p className="text-[var(--ft-text-secondary)]">참여 인플루언서가 없습니다</p>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)]">
                                                    <th className="w-12 px-6 py-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedInfluencers.length === influencers.length && influencers.length > 0}
                                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                                            className="w-4 h-4 rounded border-[var(--ft-border-input)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)]"
                                                        />
                                                    </th>
                                                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">연동</th>
                                                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                                                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">상태</th>
                                                    <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">발송 수</th>
                                                    <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">클릭 수</th>
                                                    <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">CPV</th>
                                                    <th className="text-right px-6 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">CPE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {influencers.map((influencer) => (
                                                    <tr key={influencer.id} className="border-b border-[var(--ft-border-primary)] last:border-b-0 hover:bg-[var(--ft-interactive-tertiary-hover)]">
                                                        <td className="px-6 py-4">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedInfluencers.includes(influencer.id)}
                                                                onChange={(e) => handleSelectOne(influencer.id, e.target.checked)}
                                                                className="w-4 h-4 rounded border-[var(--ft-border-input)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)]"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            {influencer.isConnected ? (
                                                                <div className="w-6 h-6 rounded-full bg-[var(--ft-color-success-50)] flex items-center justify-center" title="연동됨">
                                                                    <Link className="w-3.5 h-3.5 text-[var(--ft-color-success-600)]" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-6 h-6 rounded-full bg-[var(--ft-bg-tertiary)] flex items-center justify-center" title="미연동">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--ft-text-disabled)]" />
                                                                </div>
                                                            )}
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
                                                            <CoreStatusBadge
                                                                colorType={
                                                                    influencer.status === 'clicked' ? 'success' :
                                                                        influencer.status === 'read' ? 'informative' :
                                                                            influencer.status === 'delivered' ? 'informative' :
                                                                                influencer.status === 'sent' ? 'warning' : 'default'
                                                                }
                                                                type="tint"
                                                                size="sm"
                                                            >
                                                                {influencer.status === 'clicked' ? '클릭됨' :
                                                                    influencer.status === 'read' ? '읽음' :
                                                                        influencer.status === 'delivered' ? '전달됨' :
                                                                            influencer.status === 'sent' ? '발송됨' : '대기'}
                                                            </CoreStatusBadge>
                                                        </td>
                                                        <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                            {formatNumber(influencer.sentCount)}
                                                        </td>
                                                        <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                            {formatNumber(influencer.clickCount)}
                                                        </td>
                                                        <td className="px-4 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                            {influencer.cpv ? `${influencer.cpv}원` : '-'}
                                                        </td>
                                                        <td className="px-6 py-4 text-right text-sm text-[var(--ft-text-secondary)]">
                                                            {influencer.cpe ? `${influencer.cpe}원` : '-'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--ft-border-primary)]">
                                        <select
                                            value={pageSize}
                                            onChange={(e) => setPageSize(Number(e.target.value))}
                                            className="h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] bg-[var(--ft-bg-primary)]"
                                        >
                                            <option value={25}>25 / page</option>
                                            <option value={50}>50 / page</option>
                                            <option value={100}>100 / page</option>
                                        </select>

                                        <div className="flex items-center gap-1">
                                            <CoreButton variant="tertiary" size="xs">
                                                <ChevronLeft className="w-4 h-4" />
                                            </CoreButton>
                                            <span className="px-3 text-[13px] font-medium text-[var(--ft-text-primary)]">{currentPage}</span>
                                            <CoreButton variant="tertiary" size="xs">
                                                <ChevronRight className="w-4 h-4" />
                                            </CoreButton>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
