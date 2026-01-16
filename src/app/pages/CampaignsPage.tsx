import { Card, CardContent } from "../components/ui/card";
import { Gift, Zap, X, Clock, CheckCircle2, MoreHorizontal, Send, MousePointerClick } from "lucide-react";
import { CampaignProposal } from "../types/CampaignProposal";

interface CampaignsPageProps {
    proposals: CampaignProposal[];
    onProposalClick: (id: number) => void;
}

export function CampaignsPage({
    proposals,
    onProposalClick
}: CampaignsPageProps) {
    const pendingProposals = proposals.filter(p => p.status === 'pending');
    const otherProposals = proposals.filter(p => p.status !== 'pending');

    const getStatusBadge = (status: CampaignProposal['status']) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full">
                        <Gift className="w-3 h-3" />
                        대기 중
                    </span>
                );
            case 'accepted':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-medium rounded-full">
                        <Clock className="w-3 h-3" />
                        설정 대기
                    </span>
                );
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded-full">
                        <Zap className="w-3 h-3" />
                        실행 중
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#6b7280]/10 text-[#6b7280] text-xs font-medium rounded-full">
                        <X className="w-3 h-3" />
                        거절됨
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-[#242424]">브랜드 파트너십</h1>
                <p className="text-sm text-[#707070] mt-1">브랜드와 함께하는 파트너십을 관리하세요</p>
            </div>

            {/* Pending Proposals Section */}
            {pendingProposals.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-[#5e51ff]" />
                        <h2 className="text-lg font-medium text-[#242424]">새로운 제안</h2>
                        <span className="px-2 py-0.5 bg-[#5e51ff] text-white text-xs font-medium rounded-full animate-pulse">
                            {pendingProposals.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {pendingProposals.map((proposal) => (
                            <Card
                                key={proposal.id}
                                className="rounded-xl border-2 border-[#5e51ff]/30 bg-gradient-to-r from-[#fafaff] to-[#f5f3ff] hover:border-[#5e51ff] transition-all cursor-pointer shadow-sm hover:shadow-md"
                                onClick={() => onProposalClick(proposal.id)}
                            >
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5e51ff] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 ring-2 ring-[#5e51ff]/20">
                                        {proposal.brandLogo ? (
                                            <img src={proposal.brandLogo} alt={proposal.brandName} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span className="text-white font-bold text-lg">{proposal.brandName.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full animate-pulse">
                                                <Gift className="w-3 h-3" />
                                                협업 제안
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-medium text-[#242424] truncate">{proposal.campaignName}</h3>
                                        <p className="text-xs text-[#707070] truncate">{proposal.brandName} · {proposal.receivedAt}</p>
                                    </div>
                                    <div className="bg-[#5e51ff] text-white px-3 py-1.5 rounded-lg text-xs font-medium shrink-0">
                                        확인하기
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Campaign Automation Table */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#242424]" />
                        <h2 className="text-lg font-medium text-[#242424]">파트너십 자동화 목록</h2>
                        <span className="text-sm text-[#707070]">({proposals.length})</span>
                    </div>
                </div>

                {proposals.length === 0 ? (
                    <Card className="rounded-xl border border-dashed border-[#e0e0e0]">
                        <CardContent className="py-12 text-center">
                            <div className="w-12 h-12 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-3">
                                <Gift className="w-6 h-6 text-[#9ca3af]" />
                            </div>
                            <p className="text-sm text-[#707070]">아직 파트너십이 없습니다</p>
                            <p className="text-xs text-[#9ca3af] mt-1">브랜드에서 제안이 오면 여기에 표시됩니다</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-[1fr_120px_100px_100px_100px_40px] gap-4 px-4 py-3 bg-[#f9fafb] border-b border-[#e5e7eb] text-xs font-medium text-[#6b7280]">
                            <div>파트너십</div>
                            <div>상태</div>
                            <div className="text-right">발송</div>
                            <div className="text-right">클릭</div>
                            <div className="text-right">CTR</div>
                            <div></div>
                        </div>

                        {/* Table Rows */}
                        {proposals.map((proposal) => (
                            <div
                                key={proposal.id}
                                className={`grid grid-cols-[1fr_120px_100px_100px_100px_40px] gap-4 px-4 py-3 border-b border-[#f3f4f6] hover:bg-[#fafafa] cursor-pointer transition-colors items-center ${proposal.status === 'rejected' ? 'opacity-50' : ''}`}
                                onClick={() => onProposalClick(proposal.id)}
                            >
                                {/* Campaign Info */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                                        {proposal.brandLogo ? (
                                            <img src={proposal.brandLogo} alt={proposal.brandName} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span className="text-[#707070] font-medium text-sm">{proposal.brandName.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-[#242424] truncate">{proposal.campaignName}</p>
                                        <p className="text-xs text-[#707070] truncate">{proposal.brandName}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    {getStatusBadge(proposal.status)}
                                </div>

                                {/* Sent */}
                                <div className="text-right">
                                    {proposal.status === 'active' && proposal.performance ? (
                                        <div className="flex items-center justify-end gap-1">
                                            <Send className="w-3 h-3 text-[#9ca3af]" />
                                            <span className="text-sm font-medium text-[#242424]">{proposal.performance.sentCount}</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-[#9ca3af]">-</span>
                                    )}
                                </div>

                                {/* Clicks */}
                                <div className="text-right">
                                    {proposal.status === 'active' && proposal.performance ? (
                                        <div className="flex items-center justify-end gap-1">
                                            <MousePointerClick className="w-3 h-3 text-[#9ca3af]" />
                                            <span className="text-sm font-medium text-[#242424]">{proposal.performance.clickCount}</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-[#9ca3af]">-</span>
                                    )}
                                </div>

                                {/* CTR */}
                                <div className="text-right">
                                    {proposal.status === 'active' && proposal.performance ? (
                                        <span className="text-sm font-medium text-[#10b981]">{proposal.performance.ctr}</span>
                                    ) : (
                                        <span className="text-sm text-[#9ca3af]">-</span>
                                    )}
                                </div>

                                {/* Menu */}
                                <div className="text-center">
                                    <button
                                        className="p-1 hover:bg-[#f3f4f6] rounded transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreHorizontal className="w-4 h-4 text-[#9ca3af]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
