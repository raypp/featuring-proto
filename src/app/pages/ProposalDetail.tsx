import { useMemo } from "react";
import { CampaignProposal, InstagramPost } from "../types/CampaignProposal";
import { TemplateManagement } from "../../featuring/pages/TemplateManagement";
import { DMTemplate } from "../../featuring/types";
import { ChevronLeft, X, Handshake, CheckCircle2, AlertCircle, Lock, BarChart3 } from "lucide-react";

interface ProposalDetailProps {
    proposal: CampaignProposal;
    posts: InstagramPost[];
    onBack: () => void;
    onActivate: (proposalId: number, postId: string, editedData: Partial<CampaignProposal>) => void;
    onAccept?: (proposalId: number) => void;
    onReject?: (proposalId: number) => void;
}

export function ProposalDetail({ proposal, posts, onBack, onActivate, onAccept, onReject }: ProposalDetailProps) {
    const isPending = proposal.status === 'pending';
    const isRejected = proposal.status === 'rejected';

    // Map CampaignProposal to DMTemplate for TemplateManagement
    const initialTemplateData: DMTemplate = useMemo(() => {
        const selectedPost = posts.find(p => p.id === proposal.selectedPostId);

        return {
            id: proposal.templateId,
            automationGroupId: proposal.id,
            dmGuide: proposal.customizedMessage || proposal.dmMessage,
            ctaLinks: proposal.ctaLink ? [{ buttonName: proposal.ctaButtonText, url: proposal.ctaLink }] : [],
            status: 'draft',
            triggerKeywords: proposal.triggerKeywords,
            publicReplyTexts: proposal.publicReplyTexts,
            publicReplyActive: proposal.publicReplyTexts.length > 0,
            postData: selectedPost ? {
                id: selectedPost.id,
                image: selectedPost.thumbnailUrl,
                caption: selectedPost.caption || '',
                date: selectedPost.postedAt
            } : undefined
        };
    }, [proposal, posts]);

    // Pending state: Show brand collaboration invite
    if (isPending) {
        return (
            <div className="h-full bg-gradient-to-b from-[#fafaff] to-[#f0f0ff] flex flex-col">
                {/* Header */}
                <div className="bg-white h-[60px] border-b border-[#e5e7eb] shrink-0">
                    <div className="flex items-center h-full px-8">
                        <button onClick={onBack} className="p-1 hover:bg-[#f5f5f5] rounded transition-colors mr-3">
                            <ChevronLeft className="w-5 h-5 text-[#707070]" />
                        </button>
                        <Handshake className="w-5 h-5 text-[#5e51ff] mr-2" />
                        <p className="font-medium text-base text-[#242424]">브랜드 협업 초대</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
                    <div className="max-w-lg w-full">
                        {/* Brand Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-[#e5e7eb] overflow-hidden">
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-[#5e51ff] to-[#8b5cf6] p-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-md">
                                    {proposal.brandLogo ? (
                                        <img src={proposal.brandLogo} alt={proposal.brandName} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-[#5e51ff] font-bold text-3xl">{proposal.brandName.charAt(0)}</span>
                                    )}
                                </div>
                                <h1 className="text-xl font-semibold text-white mb-1">{proposal.brandName}</h1>
                                <p className="text-sm text-white/80">{proposal.campaignName}</p>
                            </div>

                            {/* Message */}
                            <div className="p-6">
                                <div className="bg-[#f8f7ff] rounded-xl p-5 mb-6">
                                    <p className="text-base font-medium text-[#374151] text-center mb-4">
                                        🤝 브랜드사가 협업을 제안했습니다
                                    </p>
                                    <p className="text-sm text-[#6b7280] text-center leading-relaxed">
                                        해당 템플릿을 사용하여 진행해야<br />
                                        <span className="text-[#5e51ff] font-medium">캠페인 참여로 반영</span>됩니다.
                                    </p>
                                </div>

                                {/* Notice Items */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3 p-3 bg-[#f0fdf4] rounded-lg border border-[#bbf7d0]">
                                        <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#166534]">
                                            수락 후 템플릿 내 DM 메시지를 자유롭게 수정할 수 있습니다.
                                        </p>
                                    </div>

                                    {proposal.isCtaLocked && (
                                        <div className="flex items-start gap-3 p-3 bg-[#fef3c7] rounded-lg border border-[#fcd34d]">
                                            <Lock className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                                            <p className="text-sm text-[#92400e]">
                                                CTA 링크는 브랜드 정책에 따라 수정이 불가합니다.
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 p-3 bg-[#eff6ff] rounded-lg border border-[#bfdbfe]">
                                        <BarChart3 className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#1e40af]">
                                            브랜드사에 <span className="font-medium">해당 자동화에 대한 성과가 공유</span>됩니다.
                                            <br />
                                            <span className="text-xs text-[#3b82f6]/70">(다른 자동화는 공유되지 않습니다)</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => onReject?.(proposal.id)}
                                        className="flex-1 h-12 rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X className="w-4 h-4 text-[#6b7280]" />
                                        <span className="font-medium text-sm text-[#374151]">거절하기</span>
                                    </button>
                                    <button
                                        onClick={() => onAccept?.(proposal.id)}
                                        className="flex-1 h-12 rounded-xl bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#5e51ff]/25"
                                    >
                                        <Handshake className="w-4 h-4 text-white" />
                                        <span className="font-medium text-sm text-white">수락하기</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer note */}
                        <p className="text-xs text-[#9ca3af] text-center mt-4">
                            수락 후에도 언제든지 자동화를 중단할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Rejected state: Show archived view
    if (isRejected) {
        return (
            <div className="h-full bg-[#fafafa] flex flex-col">
                <div className="bg-white h-[60px] border-b border-[#f0f0f0] shrink-0">
                    <div className="flex items-center h-full px-8">
                        <button onClick={onBack} className="p-1 hover:bg-[#f5f5f5] rounded transition-colors mr-2">
                            <ChevronLeft className="w-5 h-5 text-[#707070]" />
                        </button>
                        <X className="w-5 h-5 text-[#6b7280] mr-2" />
                        <p className="font-medium text-base text-[#6b7280]">[거절됨] {proposal.campaignName}</p>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-8 h-8 text-[#9ca3af]" />
                        </div>
                        <p className="text-lg font-medium text-[#6b7280] mb-2">이 제안은 거절되었습니다</p>
                        <p className="text-sm text-[#9ca3af]">{proposal.brandName} · {proposal.campaignName}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Accepted/Active state: Show TemplateManagement with brand message accordion
    const brandMessage = `${proposal.brandName} 캠페인에 참여해주셔서 감사합니다!\n\n📌 캠페인: ${proposal.campaignName}\n\n• DM 메시지는 자유롭게 수정 가능합니다.\n${proposal.isCtaLocked ? '• CTA 링크는 브랜드 정책에 따라 수정이 불가합니다. 🔒' : ''}\n• 게시물을 선택한 후 "활성화하기"를 눌러주세요.`;

    return (
        <TemplateManagement
            initialData={initialTemplateData}
            automationGroup={{
                id: proposal.id,
                name: proposal.campaignName,
                status: 'active',
                influencerCount: 0,
                templateStatus: 'draft',
                lastModified: new Date().toISOString(),
                createdAt: new Date().toISOString()
            }}
            onBack={onBack}
            onSave={() => { }}
            onDeploy={(template) => {
                if (template.postData?.id) {
                    onActivate(proposal.id, template.postData.id, {
                        triggerKeywords: template.triggerKeywords,
                        publicReplyTexts: template.publicReplyTexts,
                        dmMessage: template.dmGuide
                    });
                } else {
                    alert("게시물을 선택해주세요.");
                }
            }}
            mode="proposal"
            isCtaLocked={proposal.isCtaLocked}
            brandName={proposal.brandName}
            brandMessage={brandMessage}
            context="campaign"
        />
    );
}
