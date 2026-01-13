import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
    ArrowLeft,
    Gift,
    Check,
    Lock,
    MessageSquare,
    Hash,
    Link,
    Sparkles,
    AlertCircle
} from "lucide-react";
import { CampaignProposal, InstagramPost } from "../types/CampaignProposal";
import { PostGrid } from "../components/PostGrid";

interface ProposalDetailProps {
    proposal: CampaignProposal;
    posts: InstagramPost[];
    onBack: () => void;
    onActivate: (proposalId: number, postId: string, editedData: Partial<CampaignProposal>) => void;
}

type Step = 'preview' | 'select-post' | 'review' | 'success';

export function ProposalDetail({ proposal, posts, onBack, onActivate }: ProposalDetailProps) {
    const [currentStep, setCurrentStep] = useState<Step>('preview');
    const [selectedPostId, setSelectedPostId] = useState<string | undefined>(proposal.selectedPostId);

    // Editable fields
    const [triggerKeywords, setTriggerKeywords] = useState<string[]>(proposal.triggerKeywords);
    const [newKeyword, setNewKeyword] = useState('');
    const [publicReply, setPublicReply] = useState(proposal.publicReplyTexts[0] || '');
    const [dmMessage, setDmMessage] = useState(proposal.dmMessage);

    const handleAddKeyword = () => {
        if (newKeyword.trim() && !triggerKeywords.includes(newKeyword.trim())) {
            setTriggerKeywords([...triggerKeywords, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setTriggerKeywords(triggerKeywords.filter(k => k !== keyword));
    };

    const handleActivate = () => {
        if (!selectedPostId) return;

        onActivate(proposal.id, selectedPostId, {
            triggerKeywords,
            publicReplyTexts: publicReply ? [publicReply] : [],
            dmMessage
        });
        setCurrentStep('success');
    };

    const selectedPost = posts.find(p => p.id === selectedPostId);

    // Step 1: Preview
    if (currentStep === 'preview') {
        return (
            <div className="flex flex-col h-full bg-[#fafafa]">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#f0f0f0] bg-white flex items-center gap-3">
                    <button onClick={onBack} className="p-1">
                        <ArrowLeft className="w-5 h-5 text-[#707070]" />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full">
                            <Gift className="w-3 h-3" />
                            {proposal.brandName}의 제안
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {/* Brand Info */}
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                            {proposal.brandLogo ? (
                                <img src={proposal.brandLogo} alt={proposal.brandName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-white font-bold text-2xl">{proposal.brandName.charAt(0)}</span>
                            )}
                        </div>
                        <h1 className="text-lg font-medium text-[#242424]">{proposal.campaignName}</h1>
                        <p className="text-sm text-[#707070] mt-1">{proposal.brandName}</p>
                    </div>

                    {/* DM Preview Mockup */}
                    <Card className="rounded-2xl border border-[#e0e0e0] overflow-hidden mb-6">
                        <div className="bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-0.5">
                            <div className="bg-white rounded-t-xl">
                                <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                                    <span className="text-sm font-medium">브랜드 계정</span>
                                </div>
                                <div className="p-4">
                                    <div className="bg-[#f0f0f0] rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                        <p className="text-sm text-[#242424] whitespace-pre-wrap">{proposal.dmMessage}</p>
                                        {proposal.ctaLink && (
                                            <Button className="mt-3 w-full bg-[#5e51ff] hover:bg-[#5e51ff]/90 text-sm">
                                                {proposal.ctaButtonText || '자세히 보기'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Info */}
                    <div className="bg-[#f5f3ff] rounded-lg p-4 flex gap-3">
                        <Sparkles className="w-5 h-5 text-[#5e51ff] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-[#242424] mb-1">자동화가 적용되면</p>
                            <p className="text-sm text-[#707070]">
                                게시물에 댓글이 달리면 자동으로 위 메시지가 DM으로 전송됩니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky CTA */}
                <div className="p-4 border-t border-[#f0f0f0] bg-white">
                    <Button
                        className="w-full h-12 bg-[#5e51ff] hover:bg-[#5e51ff]/90 text-base font-medium"
                        onClick={() => setCurrentStep('select-post')}
                    >
                        이 템플릿 사용하기
                    </Button>
                </div>
            </div>
        );
    }

    // Step 2: Select Post
    if (currentStep === 'select-post') {
        return (
            <div className="flex flex-col h-full bg-[#fafafa]">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#f0f0f0] bg-white flex items-center gap-3">
                    <button onClick={() => setCurrentStep('preview')} className="p-1">
                        <ArrowLeft className="w-5 h-5 text-[#707070]" />
                    </button>
                    <h1 className="text-base font-medium">게시물 선택</h1>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-4 pb-2">
                        <p className="text-sm text-[#707070]">
                            자동화를 적용할 게시물을 선택해주세요.
                            <br />
                            선택한 게시물의 댓글에 자동 DM이 발송됩니다.
                        </p>
                    </div>
                    <PostGrid
                        posts={posts}
                        selectedPostId={selectedPostId}
                        onSelect={setSelectedPostId}
                    />
                </div>

                {/* Sticky CTA */}
                <div className="p-4 border-t border-[#f0f0f0] bg-white">
                    <Button
                        className="w-full h-12 bg-[#5e51ff] hover:bg-[#5e51ff]/90 text-base font-medium disabled:opacity-50"
                        disabled={!selectedPostId}
                        onClick={() => setCurrentStep('review')}
                    >
                        다음
                    </Button>
                </div>
            </div>
        );
    }

    // Step 3: Review & Edit
    if (currentStep === 'review') {
        return (
            <div className="flex flex-col h-full bg-[#fafafa]">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#f0f0f0] bg-white flex items-center gap-3">
                    <button onClick={() => setCurrentStep('select-post')} className="p-1">
                        <ArrowLeft className="w-5 h-5 text-[#707070]" />
                    </button>
                    <h1 className="text-base font-medium">설정 검토</h1>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                    {/* Selected Post Preview */}
                    {selectedPost && (
                        <Card className="rounded-lg border border-[#f0f0f0]">
                            <CardContent className="p-3 flex items-center gap-3">
                                <img
                                    src={selectedPost.thumbnailUrl}
                                    alt=""
                                    className="w-12 h-12 rounded-md object-cover"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-[#242424]">선택된 게시물</p>
                                    <p className="text-xs text-[#707070]">
                                        좋아요 {selectedPost.likeCount.toLocaleString()} · 댓글 {selectedPost.commentCount.toLocaleString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentStep('select-post')}
                                >
                                    변경
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Trigger Keywords */}
                    <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-[#242424] mb-2">
                            <Hash className="w-4 h-4 text-[#707070]" />
                            트리거 키워드
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {triggerKeywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f0f0f0] text-sm rounded-full"
                                >
                                    {keyword}
                                    <button
                                        onClick={() => handleRemoveKeyword(keyword)}
                                        className="w-4 h-4 rounded-full hover:bg-[#e0e0e0] flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                placeholder="키워드 추가"
                                className="flex-1"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                            />
                            <Button variant="outline" onClick={handleAddKeyword}>추가</Button>
                        </div>
                    </div>

                    {/* Public Reply */}
                    <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-[#242424] mb-2">
                            <MessageSquare className="w-4 h-4 text-[#707070]" />
                            공개 답글 (선택)
                        </label>
                        <Input
                            value={publicReply}
                            onChange={(e) => setPublicReply(e.target.value)}
                            placeholder="예: 감사합니다! DM 확인해주세요 😊"
                        />
                        <p className="text-xs text-[#bbbbbb] mt-1">댓글에 자동으로 달리는 공개 답글입니다</p>
                    </div>

                    {/* DM Message */}
                    <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-[#242424] mb-2">
                            <MessageSquare className="w-4 h-4 text-[#707070]" />
                            DM 메시지
                        </label>
                        <Textarea
                            value={dmMessage}
                            onChange={(e) => setDmMessage(e.target.value)}
                            placeholder="자동으로 발송될 DM 메시지"
                            rows={4}
                        />
                        <p className="text-xs text-[#bbbbbb] mt-1">본인의 말투에 맞게 수정할 수 있어요</p>
                    </div>

                    {/* CTA Link (Locked) */}
                    <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-[#242424] mb-2">
                            <Link className="w-4 h-4 text-[#707070]" />
                            버튼 링크
                            <Lock className="w-3.5 h-3.5 text-[#bbbbbb]" />
                        </label>
                        <div className="relative">
                            <Input
                                value={proposal.ctaLink}
                                disabled
                                className="bg-[#f5f5f5] text-[#707070] pr-10"
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbbbbb]" />
                        </div>
                        <div className="flex items-start gap-1.5 mt-2 text-xs text-[#707070]">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <span>성과 측정을 위해 브랜드가 설정한 링크는 수정할 수 없습니다</span>
                        </div>
                    </div>
                </div>

                {/* Sticky CTA */}
                <div className="p-4 border-t border-[#f0f0f0] bg-white">
                    <Button
                        className="w-full h-12 bg-[#5e51ff] hover:bg-[#5e51ff]/90 text-base font-medium"
                        onClick={handleActivate}
                    >
                        자동화 시작하기
                    </Button>
                </div>
            </div>
        );
    }

    // Step 4: Success
    return (
        <div className="flex flex-col h-full bg-white items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-[#4caf50]" />
            </div>
            <h1 className="text-xl font-medium text-[#242424] mb-2">
                자동화가 시작되었습니다!
            </h1>
            <p className="text-sm text-[#707070] mb-8">
                선택한 게시물에 댓글이 달리면<br />
                자동으로 DM이 발송됩니다.
            </p>
            <Button
                className="bg-[#5e51ff] hover:bg-[#5e51ff]/90"
                onClick={onBack}
            >
                대시보드로 돌아가기
            </Button>
        </div>
    );
}
