import { useState, useMemo } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    Gift, Zap, X, Clock, CheckCircle2, MoreHorizontal, Send, MousePointerClick,
    AlertTriangle, Pause, Archive, Search, Filter, ChevronDown, RefreshCw,
    Play, Power, PowerOff, AlertCircle, Ban, Timer, CheckSquare, Activity
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import {
    CampaignProposal,
    ProposalStatus,
    ProposalSection,
    STATUS_TO_SECTION,
    STATUS_LABELS,
    SECTION_INFO,
    ERROR_REASON_LABELS,
    ErrorReason
} from "../types/CampaignProposal";

interface PartnershipsPageProps {
    proposals: CampaignProposal[];
    onProposalClick: (id: number) => void;
    onQuickPause?: (id: number) => void;
    onQuickResume?: (id: number) => void;
}

// 상대적 시간 포맷팅
function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR');
}

// 탭 정보
const TAB_INFO: { key: ProposalSection; label: string; icon: React.ReactNode; activeColor: string }[] = [
    { key: 'action_required', label: '해야 할 일', icon: <CheckSquare className="w-4 h-4" />, activeColor: 'text-[#5e51ff] border-[#5e51ff]' },
    { key: 'running', label: '운영 중', icon: <Activity className="w-4 h-4" />, activeColor: 'text-[#10b981] border-[#10b981]' },
    { key: 'paused', label: '중단됨', icon: <Pause className="w-4 h-4" />, activeColor: 'text-[#6b7280] border-[#6b7280]' },
    { key: 'archived', label: '보관함', icon: <Archive className="w-4 h-4" />, activeColor: 'text-[#9ca3af] border-[#9ca3af]' }
];

// 캠페인 필터 옵션
type CampaignFilter = 'all' | 'standalone' | string;

export function CampaignsPage({
    proposals,
    onProposalClick,
    onQuickPause,
    onQuickResume
}: PartnershipsPageProps) {
    const [activeTab, setActiveTab] = useState<ProposalSection>('action_required');
    const [campaignFilter, setCampaignFilter] = useState<CampaignFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // 캠페인 목록 추출 (필터용)
    const campaignList = useMemo(() => {
        const campaigns = new Map<number, string>();
        proposals.forEach(p => {
            if (p.campaignId && p.campaignName) {
                campaigns.set(p.campaignId, p.campaignName);
            }
        });
        return Array.from(campaigns.entries()).map(([id, name]) => ({ id, name }));
    }, [proposals]);

    // 섹션별 분류 및 정렬 (필터 적용 전)
    const categorizedProposals = useMemo(() => {
        const result: Record<ProposalSection, CampaignProposal[]> = {
            action_required: [],
            running: [],
            paused: [],
            archived: []
        };

        proposals.forEach(p => {
            const section = STATUS_TO_SECTION[p.status];
            result[section].push(p);
        });

        // 각 섹션 내 정렬: isUnread 우선, updatedAt DESC
        Object.keys(result).forEach(section => {
            result[section as ProposalSection].sort((a, b) => {
                if (a.isUnread !== b.isUnread) return a.isUnread ? -1 : 1;
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
        });

        return result;
    }, [proposals]);

    // 현재 탭의 항목들 (검색 및 캠페인 필터 적용)
    const currentTabItems = useMemo(() => {
        return categorizedProposals[activeTab].filter(p => {
            // 캠페인 필터
            if (campaignFilter === 'standalone' && p.campaignId) {
                return false;
            }
            if (campaignFilter !== 'all' && campaignFilter !== 'standalone') {
                if (p.campaignId !== parseInt(campaignFilter)) {
                    return false;
                }
            }

            // 검색 필터
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesBrand = p.brandName.toLowerCase().includes(query);
                const matchesAutomation = (p.automationName || p.campaignName).toLowerCase().includes(query);
                if (!matchesBrand && !matchesAutomation) {
                    return false;
                }
            }

            return true;
        });
    }, [categorizedProposals, activeTab, campaignFilter, searchQuery]);

    // 상태 배지 렌더링
    const getStatusBadge = (status: ProposalStatus, errorReason?: ErrorReason) => {
        const baseClasses = "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full";

        switch (status) {
            case 'sent':
                return (
                    <span className={`${baseClasses} bg-[#5e51ff]/10 text-[#5e51ff] animate-pulse`}>
                        <Gift className="w-3 h-3" />
                        수락 대기
                    </span>
                );
            case 'viewed':
                return (
                    <span className={`${baseClasses} bg-[#5e51ff]/10 text-[#5e51ff]`}>
                        <CheckCircle2 className="w-3 h-3" />
                        확인됨
                    </span>
                );
            case 'accepted':
                return (
                    <span className={`${baseClasses} bg-[#f59e0b]/10 text-[#f59e0b]`}>
                        <Clock className="w-3 h-3" />
                        설정 필요
                    </span>
                );
            case 'setup_done':
                return (
                    <span className={`${baseClasses} bg-[#3b82f6]/10 text-[#3b82f6]`}>
                        <Play className="w-3 h-3" />
                        실행 대기
                    </span>
                );
            case 'active':
                return (
                    <span className={`${baseClasses} bg-[#10b981]/10 text-[#10b981]`}>
                        <Power className="w-3 h-3" />
                        실행 중
                    </span>
                );
            case 'paused':
                return (
                    <span className={`${baseClasses} bg-[#6b7280]/10 text-[#6b7280]`}>
                        <Pause className="w-3 h-3" />
                        중단됨
                    </span>
                );
            case 'rejected':
                return (
                    <span className={`${baseClasses} bg-[#6b7280]/10 text-[#6b7280]`}>
                        <X className="w-3 h-3" />
                        거절됨
                    </span>
                );
            case 'revoked':
                return (
                    <span className={`${baseClasses} bg-[#6b7280]/10 text-[#6b7280]`}>
                        <Ban className="w-3 h-3" />
                        철회됨
                    </span>
                );
            case 'expired':
                return (
                    <span className={`${baseClasses} bg-[#6b7280]/10 text-[#6b7280]`}>
                        <Timer className="w-3 h-3" />
                        만료됨
                    </span>
                );
            case 'error':
                const errorLabel = errorReason ? ERROR_REASON_LABELS[errorReason] : '오류';
                return (
                    <span className={`${baseClasses} bg-[#ef4444]/10 text-[#ef4444]`}>
                        <AlertCircle className="w-3 h-3" />
                        {errorLabel}
                    </span>
                );
            default:
                return null;
        }
    };

    // 캠페인 라벨 렌더링
    const getCampaignLabel = (proposal: CampaignProposal) => {
        if (proposal.campaignId && proposal.campaignName) {
            return (
                <span className="inline-flex items-center gap-1 text-xs text-[#5e51ff]">
                    캠페인: {proposal.campaignName}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 text-xs text-[#707070]">
                단독 협업
            </span>
        );
    };

    // 테이블 행 렌더링
    const renderTableRow = (proposal: CampaignProposal, index: number, totalItems: number) => (
        <div
            key={proposal.id}
            className={`flex items-center gap-4 px-4 py-3 hover:bg-[#fafafa] cursor-pointer transition-colors ${index !== totalItems - 1 ? 'border-b border-[#f3f4f6]' : ''
                } ${proposal.isUnread ? 'bg-[#fafaff]' : ''}`}
            onClick={() => onProposalClick(proposal.id)}
        >
            {/* 브랜드 로고 */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 relative">
                {proposal.brandLogo ? (
                    <img src={proposal.brandLogo} alt={proposal.brandName} className="w-full h-full rounded-full object-cover" />
                ) : (
                    <span className="text-[#707070] font-medium text-sm">{proposal.brandName.charAt(0)}</span>
                )}
                {proposal.isUnread && (
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#5e51ff] rounded-full border-2 border-white" />
                )}
            </div>

            {/* 제목 및 캠페인 라벨 */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#242424] truncate">
                        {proposal.automationName || proposal.campaignName}
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    {getCampaignLabel(proposal)}
                    <span className="text-xs text-[#9ca3af]">·</span>
                    <span className="text-xs text-[#707070]">{proposal.brandName}</span>
                </div>
            </div>

            {/* 성과 (active 상태일 때만) */}
            {proposal.status === 'active' && proposal.performance && (
                <div className="flex items-center gap-4 text-xs mr-2">
                    <div className="flex items-center gap-1 text-[#707070]">
                        <Send className="w-3 h-3" />
                        <span className="font-medium text-[#242424]">{proposal.performance.sentCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#707070]">
                        <MousePointerClick className="w-3 h-3" />
                        <span className="font-medium text-[#242424]">{proposal.performance.clickCount}</span>
                    </div>
                    <div className="text-[#10b981] font-medium">
                        {proposal.performance.ctr}
                    </div>
                </div>
            )}

            {/* 상태 배지 */}
            <div className="flex-shrink-0">
                {getStatusBadge(proposal.status, proposal.errorReason)}
            </div>

            {/* 마지막 업데이트 시간 */}
            <div className="text-xs text-[#9ca3af] w-16 text-right flex-shrink-0">
                {formatRelativeTime(proposal.updatedAt)}
            </div>

            {/* Quick Action - ACTIVE일 때 중단 버튼 */}
            {proposal.status === 'active' && onQuickPause && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-[#6b7280] hover:text-[#ef4444] hover:bg-[#fef2f2]"
                    onClick={(e) => {
                        e.stopPropagation();
                        onQuickPause(proposal.id);
                    }}
                >
                    <Pause className="w-3 h-3 mr-1" />
                    중단
                </Button>
            )}

            {/* Quick Action - PAUSED일 때 재시작 버튼 */}
            {proposal.status === 'paused' && onQuickResume && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-[#6b7280] hover:text-[#10b981] hover:bg-[#f0fdf4]"
                    onClick={(e) => {
                        e.stopPropagation();
                        onQuickResume(proposal.id);
                    }}
                >
                    <Play className="w-3 h-3 mr-1" />
                    재시작
                </Button>
            )}

            {/* 더보기 메뉴 */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="p-1 hover:bg-[#f3f4f6] rounded transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal className="w-4 h-4 text-[#9ca3af]" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onProposalClick(proposal.id);
                    }}>
                        상세 보기
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );

    const totalCount = proposals.length;

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-[#242424]">브랜드 파트너십</h1>
                <p className="text-sm text-[#707070] mt-1">브랜드와 함께하는 협업 자동화를 관리하세요</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#e5e7eb]">
                <div className="flex gap-0">
                    {TAB_INFO.map(tab => {
                        const count = categorizedProposals[tab.key].length;
                        const isActive = activeTab === tab.key;
                        const hasUnread = categorizedProposals[tab.key].some(p => p.isUnread);

                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                                        ? tab.activeColor
                                        : 'text-[#707070] border-transparent hover:text-[#242424] hover:border-[#e5e7eb]'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                <span className={`px-1.5 py-0.5 text-xs rounded-full ${isActive ? 'bg-current/10' : 'bg-[#f3f4f6] text-[#707070]'
                                    }`}>
                                    {count}
                                </span>
                                {hasUnread && !isActive && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#5e51ff] rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* 검색 */}
                <div className="relative flex-1 min-w-[200px] max-w-[320px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                    <input
                        type="text"
                        placeholder="브랜드명, 자동화명 검색"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e51ff]/20 focus:border-[#5e51ff]"
                    />
                </div>

                {/* 캠페인 필터 */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 gap-2 border-[#e5e7eb]">
                            캠페인: {campaignFilter === 'all' ? '전체' : campaignFilter === 'standalone' ? '단독 협업' : campaignList.find(c => c.id === parseInt(campaignFilter))?.name || '선택'}
                            <ChevronDown className="w-3 h-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onClick={() => setCampaignFilter('all')}
                            className={campaignFilter === 'all' ? 'bg-[#f3f4f6]' : ''}
                        >
                            전체
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setCampaignFilter('standalone')}
                            className={campaignFilter === 'standalone' ? 'bg-[#f3f4f6]' : ''}
                        >
                            단독 협업
                        </DropdownMenuItem>
                        {campaignList.length > 0 && <DropdownMenuSeparator />}
                        {campaignList.map(campaign => (
                            <DropdownMenuItem
                                key={campaign.id}
                                onClick={() => setCampaignFilter(String(campaign.id))}
                                className={campaignFilter === String(campaign.id) ? 'bg-[#f3f4f6]' : ''}
                            >
                                {campaign.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* 검색 결과 카운트 */}
                <span className="text-sm text-[#707070] ml-auto">
                    {currentTabItems.length}개
                </span>
            </div>

            {/* Table Content */}
            {totalCount === 0 ? (
                <Card className="rounded-xl border border-dashed border-[#e0e0e0]">
                    <CardContent className="py-16 text-center">
                        <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gift className="w-8 h-8 text-[#9ca3af]" />
                        </div>
                        <p className="text-base text-[#707070]">아직 파트너십이 없습니다</p>
                        <p className="text-sm text-[#9ca3af] mt-2">브랜드에서 협업 자동화 제안이 오면 여기에 표시됩니다</p>
                    </CardContent>
                </Card>
            ) : currentTabItems.length === 0 ? (
                <Card className="rounded-xl border border-dashed border-[#e0e0e0]">
                    <CardContent className="py-12 text-center">
                        <div className="w-12 h-12 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Search className="w-6 h-6 text-[#9ca3af]" />
                        </div>
                        <p className="text-sm text-[#707070]">
                            {searchQuery || campaignFilter !== 'all'
                                ? '검색 결과가 없습니다'
                                : `${TAB_INFO.find(t => t.key === activeTab)?.label}에 항목이 없습니다`
                            }
                        </p>
                        {(searchQuery || campaignFilter !== 'all') && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-[#5e51ff]"
                                onClick={() => {
                                    setSearchQuery('');
                                    setCampaignFilter('all');
                                }}
                            >
                                필터 초기화
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
                    {currentTabItems.map((proposal, index) =>
                        renderTableRow(proposal, index, currentTabItems.length)
                    )}
                </div>
            )}
        </div>
    );
}
