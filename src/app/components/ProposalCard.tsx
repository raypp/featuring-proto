import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Gift, ChevronRight } from "lucide-react";
import { CampaignProposal } from "../types/CampaignProposal";

interface ProposalCardProps {
    proposal: CampaignProposal;
    onClick: (id: number) => void;
}

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
    return (
        <Card
            className="rounded-lg border border-[#f0f0f0] hover:border-[#5e51ff] transition-colors cursor-pointer"
            onClick={() => onClick(proposal.id)}
        >
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    {/* Brand Logo */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
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
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full">
                                <Gift className="w-3 h-3" />
                                새로운 제안
                            </span>
                        </div>
                        <h3 className="text-sm font-medium text-[#242424] truncate">
                            {proposal.brandName}님이 자동화 템플릿을 보냈습니다
                        </h3>
                        <p className="text-xs text-[#707070] truncate mt-0.5">
                            {proposal.campaignName}
                        </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-5 h-5 text-[#bbbbbb] flex-shrink-0" />
                </div>
            </CardContent>
        </Card>
    );
}
