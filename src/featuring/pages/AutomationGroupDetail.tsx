import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Zap, Send, MousePointer, BarChart2, Link, Plus, ChevronDown } from "lucide-react";
import { AutomationGroup, DMTemplate, AutomationInfluencer } from "../types";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";

interface AutomationGroupDetailProps {
    group: AutomationGroup;
    template?: DMTemplate;
    influencers?: AutomationInfluencer[];
    onBack: () => void;
    onOpenTemplateManagement: () => void;
    onDeliverTemplate?: (influencerIds: number[]) => void;
    onAddInfluencer?: () => void;
}

export function AutomationGroupDetail({
    group,
    template,
    influencers = [],
    onBack,
    onOpenTemplateManagement,
    onDeliverTemplate,
    onAddInfluencer
}: AutomationGroupDetailProps) {
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

    // Template status
    const getTemplateStatus = () => {
        if (!template || template.status === 'draft') return '초안';
        if (template.status === 'saved') return '저장됨';
        return '전달됨';
    };

    // Mock trigger data (should come from template/group)
    const triggerType = '댓글 키워드';
    const triggerKeywords = template?.ctaLinks?.length ? ['가격', '구매', '링크'] : ['가격', '구매', '링크'];
    const messagePreview = template?.dmGuide || '메시지를 설정해주세요';
    const linkCount = template?.ctaLinks?.length || 0;

    return (
        <div className="flex flex-col h-full bg-[var(--ft-bg-secondary)]">
            {/* Header removed - using page content only */}
            <div className="flex-1 overflow-auto">
                {/* Template Summary Card */}
                <div
                    className="mx-6 mt-6 bg-white rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6 cursor-pointer hover:border-[var(--ft-color-primary-300)] transition-colors"
                    onClick={onOpenTemplateManagement}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-[var(--ft-radius-md)] bg-[var(--ft-color-primary-50)] flex items-center justify-center">
                                <Zap className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                                    {group.name || '새 반응 자동화'}
                                </h3>
                                <p className="text-xs text-[var(--ft-text-disabled)]">템플릿 설정</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <CoreStatusBadge
                                colorType={
                                    template?.status === 'deployed' ? 'success' :
                                        template?.status === 'saved' ? 'default' : 'warning'
                                }
                                type="tint"
                                size="sm"
                            >
                                {getTemplateStatus()}
                            </CoreStatusBadge>
                            <ChevronRight className="w-5 h-5 text-[var(--ft-text-disabled)]" />
                        </div>
                    </div>

                    {/* Template Details Grid */}
                    <div className="grid grid-cols-4 gap-6 pt-4 border-t border-[var(--ft-border-primary)]">
                        <div>
                            <p className="text-xs text-[var(--ft-text-disabled)] mb-1">트리거</p>
                            <p className="text-sm font-medium text-[var(--ft-text-primary)]">{triggerType}</p>
                        </div>
                        <div>
                            <p className="text-xs text-[var(--ft-text-disabled)] mb-1">키워드</p>
                            <p className="text-sm font-medium text-[var(--ft-text-primary)]">
                                {triggerKeywords.join(', ')}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-[var(--ft-text-disabled)] mb-1">메시지</p>
                            <p className="text-sm text-[var(--ft-text-secondary)] truncate">
                                {messagePreview.length > 20 ? messagePreview.slice(0, 20) + '...' : messagePreview}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-[var(--ft-text-disabled)] mb-1">링크</p>
                            <p className="text-sm text-[var(--ft-text-secondary)]">
                                {linkCount > 0 ? `${linkCount}개` : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Influencer Performance Section */}
                <div className="mx-6 mt-6 bg-white rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] overflow-hidden">
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

                        <div className="flex items-center gap-4">
                            {selectedInfluencers.length > 0 ? (
                                <>
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
                                </>
                            ) : influencers.length > 0 ? (
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
                            ) : (
                                <CoreButton
                                    variant="secondary"
                                    size="sm"
                                    leftIcon={<Users className="w-4 h-4" />}
                                    onClick={onAddInfluencer}
                                >
                                    인플루언서 추가
                                </CoreButton>
                            )}
                        </div>
                    </div>

                    {/* Empty State or Table */}
                    {influencers.length === 0 ? (
                        <div className="py-16 text-center">
                            <Users className="w-12 h-12 text-[var(--ft-text-disabled)] mx-auto mb-4" />
                            <p className="text-base font-medium text-[var(--ft-text-secondary)] mb-1">참여 인플루언서가 없습니다</p>
                            <p className="text-sm text-[var(--ft-text-disabled)]">인플루언서를 추가해주세요</p>
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
                                                    className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                                />
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
                                    {/* Table Footer - Totals */}
                                    <tfoot className="bg-[var(--ft-bg-secondary)] border-t-2 border-[var(--ft-border-primary)] font-semibold text-[var(--ft-text-primary)]">
                                        <tr>
                                            <td className="px-6 py-4 sticky left-0 bg-[var(--ft-bg-secondary)] z-10"></td>
                                            <td className="px-4 py-4 sticky left-12 bg-[var(--ft-bg-secondary)] z-10 text-center" colSpan={3}>
                                                전체 합계 / 평균
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {formatNumber(influencers.flatMap(i => i.appliedContents || []).reduce((sum, c) => sum + (c.likes || 0), 0))}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {formatNumber(influencers.flatMap(i => i.appliedContents || []).reduce((sum, c) => sum + (c.comments || 0), 0))}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {formatNumber(influencers.flatMap(i => i.appliedContents || []).reduce((sum, c) => sum + (c.saves || 0), 0))}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {formatNumber(influencers.flatMap(i => i.appliedContents || []).reduce((sum, c) => sum + (c.uniqueReach || 0), 0))}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {formatNumber(influencers.flatMap(i => i.appliedContents || []).reduce((sum, c) => sum + (c.uniqueClicks || 0), 0))}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm text-[var(--ft-color-primary-600)]">
                                                {(() => {
                                                    const contents = influencers.flatMap(i => i.appliedContents || []);
                                                    const totalClicks = contents.reduce((sum, c) => sum + (c.uniqueClicks || 0), 0);
                                                    const totalReach = contents.reduce((sum, c) => sum + (c.uniqueReach || 0), 0);
                                                    return totalReach > 0 ? ((totalClicks / totalReach) * 100).toFixed(1) : 0;
                                                })()}%
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {formatNumber(influencers.flatMap(i => i.appliedContents || []).reduce((sum, c) => sum + (c.followConversions || 0), 0))}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-[var(--ft-color-primary-600)]">
                                                {(() => {
                                                    const contents = influencers.flatMap(i => i.appliedContents || []);
                                                    const totalConversions = contents.reduce((sum, c) => sum + (c.followConversions || 0), 0);
                                                    const totalReach = contents.reduce((sum, c) => sum + (c.uniqueReach || 0), 0);
                                                    return totalReach > 0 ? ((totalConversions / totalReach) * 100).toFixed(1) : 0;
                                                })()}%
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--ft-border-primary)]">
                                <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                    className="h-8 px-2 border border-[var(--ft-border-primary)] rounded-[var(--ft-radius-md)] text-[13px] text-[var(--ft-text-secondary)] bg-white"
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
            </div>
        </div>
    );
}
