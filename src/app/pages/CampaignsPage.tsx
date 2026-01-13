import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronRight, Gift, CheckCircle2, Clock, Briefcase } from "lucide-react";
import { Campaign } from "../types/Campaign";
import { CampaignProposal } from "../types/CampaignProposal";

interface CampaignsPageProps {
    campaigns: Campaign[];
    proposals: CampaignProposal[];
    onCampaignClick: (id: number) => void;
    onProposalClick: (id: number) => void;
}

export function CampaignsPage({
    campaigns,
    proposals,
    onCampaignClick,
    onProposalClick
}: CampaignsPageProps) {
    const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'settlement');
    const completedCampaigns = campaigns.filter(c => c.status === 'completed');
    const pendingProposals = proposals.filter(p => p.status === 'pending');

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-[#242424]">캠페인</h1>
                <p className="text-sm text-[#707070] mt-1">브랜드와 함께하는 캠페인을 관리하세요</p>
            </div>

            {/* Invited Proposals */}
            {pendingProposals.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-[#5e51ff]" />
                        <h2 className="text-lg font-medium text-[#242424]">초대받은 제안</h2>
                        <span className="px-2 py-0.5 bg-[#5e51ff] text-white text-xs font-medium rounded-full">
                            {pendingProposals.length}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {pendingProposals.map((proposal) => (
                            <Card
                                key={proposal.id}
                                className="rounded-xl border border-[#f0f0f0] hover:border-[#5e51ff] transition-colors cursor-pointer"
                                onClick={() => onProposalClick(proposal.id)}
                            >
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                        {proposal.brandLogo ? (
                                            <img src={proposal.brandLogo} alt={proposal.brandName} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span className="text-white font-bold text-lg">{proposal.brandName.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full">
                                                <Gift className="w-3 h-3" />
                                                새로운 제안
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-medium text-[#242424] truncate">{proposal.brandName}</h3>
                                        <p className="text-xs text-[#707070] truncate">{proposal.campaignName}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-[#bbbbbb] flex-shrink-0" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Campaigns */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#f59e0b]" />
                    <h2 className="text-lg font-medium text-[#242424]">진행 중인 캠페인</h2>
                    <span className="text-sm text-[#707070]">({activeCampaigns.length})</span>
                </div>
                {activeCampaigns.length === 0 ? (
                    <Card className="rounded-xl border border-dashed border-[#e0e0e0]">
                        <CardContent className="py-8 text-center">
                            <p className="text-sm text-[#707070]">진행 중인 캠페인이 없습니다</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-2">
                        {activeCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} onClick={() => onCampaignClick(campaign.id)} />
                        ))}
                    </div>
                )}
            </div>

            {/* Completed Campaigns */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                    <h2 className="text-lg font-medium text-[#242424]">지난 캠페인</h2>
                    <span className="text-sm text-[#707070]">({completedCampaigns.length})</span>
                </div>
                {completedCampaigns.length === 0 ? (
                    <Card className="rounded-xl border border-dashed border-[#e0e0e0]">
                        <CardContent className="py-8 text-center">
                            <p className="text-sm text-[#707070]">완료된 캠페인이 없습니다</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-2">
                        {completedCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} onClick={() => onCampaignClick(campaign.id)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Campaign Card Component
function CampaignCard({ campaign, onClick }: { campaign: Campaign; onClick: () => void }) {
    const hasPendingTodo = campaign.todoItems.some(t => t.status === 'pending');

    return (
        <Card
            className="rounded-xl border border-[#f0f0f0] hover:border-[#5e51ff] transition-colors cursor-pointer"
            onClick={onClick}
        >
            <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                    {campaign.brandLogo ? (
                        <img src={campaign.brandLogo} alt={campaign.brandName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <Briefcase className="w-6 h-6 text-[#707070]" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        {hasPendingTodo && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fef3c7] text-[#d97706] text-xs font-medium rounded-full">
                                설정 필요
                            </span>
                        )}
                        <span className={`text-xs ${campaign.status === 'active' ? 'text-[#22c55e]' : 'text-[#707070]'}`}>
                            {campaign.status === 'active' ? '진행중' : campaign.status === 'settlement' ? '정산대기' : '완료'}
                        </span>
                    </div>
                    <h3 className="text-sm font-medium text-[#242424] truncate">{campaign.brandName}</h3>
                    <p className="text-xs text-[#707070] truncate">{campaign.campaignName}</p>
                </div>
                <div className="text-right flex-shrink-0">
                    {campaign.executions !== undefined && (
                        <p className="text-sm font-medium text-[#242424]">{campaign.executions.toLocaleString()}</p>
                    )}
                    <p className="text-xs text-[#707070]">발송</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#bbbbbb] flex-shrink-0" />
            </CardContent>
        </Card>
    );
}
