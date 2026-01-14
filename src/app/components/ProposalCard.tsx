import { Card, CardContent } from "./ui/card";
import { Gift, ChevronRight, Zap, Send, MousePointerClick, X } from "lucide-react";
import { CampaignProposal } from "../types/CampaignProposal";

interface ProposalCardProps {
    proposal: CampaignProposal;
    onClick: (id: number) => void;
}

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
    const isPending = proposal.status === 'pending';
    const isActive = proposal.status === 'active';
    const isAccepted = proposal.status === 'accepted';
    const isRejected = proposal.status === 'rejected';

    const getStatusBadge = () => {
        if (isPending) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full animate-pulse">
                    <Gift className="w-3 h-3" />
                    새로운 제안
                </span>
            );
        }
        if (isAccepted) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-medium rounded-full">
                    <Gift className="w-3 h-3" />
                    수락됨 · 설정 대기
                </span>
            );
        }
        if (isActive) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded-full">
                    <Zap className="w-3 h-3" />
                    실행 중
                </span>
            );
        }
        if (isRejected) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#6b7280]/10 text-[#6b7280] text-xs font-medium rounded-full">
                    <X className="w-3 h-3" />
                    거절됨
                </span>
            );
        }
        return null;
    };

    const getCardStyle = () => {
        if (isPending) return 'border-[#5e51ff] bg-[#fafaff] shadow-sm';
        if (isActive) return 'border-[#10b981] bg-[#f0fdf4]';
        if (isAccepted) return 'border-[#f59e0b] bg-[#fffbeb]';
        if (isRejected) return 'border-[#e5e7eb] bg-[#f9fafb] opacity-60';
        return 'border-[#f0f0f0] hover:border-[#5e51ff]';
    };

    const getTitle = () => {
        if (isPending) return `🎁 ${proposal.brandName}님이 자동화 템플릿을 보냈습니다`;
        if (isAccepted) return `${proposal.campaignName} - 설정을 완료해주세요`;
        if (isActive) return proposal.campaignName;
        if (isRejected) return `[거절됨] ${proposal.campaignName}`;
        return proposal.campaignName;
    };

    return (
        <Card
            className={`rounded-lg border transition-colors cursor-pointer ${getCardStyle()}`}
            onClick={() => onClick(proposal.id)}
        >
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    {/* Brand Logo */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isPending ? 'bg-gradient-to-br from-[#5e51ff] to-[#8b5cf6] ring-2 ring-[#5e51ff]/20' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                        {proposal.brandLogo ? (
                            <img
                                src={proposal.brandLogo}
                                alt={proposal.brandName}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-white font-bold text-lg">
                                {proposal.brandName.charAt(0)}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge()}
                        </div>
                        <h3 className={`text-sm font-medium truncate ${isRejected ? 'text-[#6b7280]' : 'text-[#242424]'}`}>
                            {getTitle()}
                        </h3>
                        <p className="text-xs text-[#707070] truncate mt-0.5">
                            {proposal.brandName} · {proposal.receivedAt}
                        </p>
                    </div>

                    {/* Performance Stats (for active proposals) */}
                    {isActive && proposal.performance && (
                        <div className="flex items-center gap-4 text-xs mr-4">
                            <div className="flex items-center gap-1 text-[#707070]">
                                <Send className="w-3.5 h-3.5" />
                                <span className="font-medium text-[#242424]">{proposal.performance.sentCount}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#707070]">
                                <MousePointerClick className="w-3.5 h-3.5" />
                                <span className="font-medium text-[#242424]">{proposal.performance.clickCount}</span>
                            </div>
                            <div className="text-[#10b981] font-medium">
                                CTR {proposal.performance.ctr}
                            </div>
                        </div>
                    )}

                    {/* Arrow */}
                    <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isRejected ? 'text-[#d1d5db]' : 'text-[#bbbbbb]'}`} />
                </div>
            </CardContent>
        </Card>
    );
}
