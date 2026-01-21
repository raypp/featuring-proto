import { useState } from "react";
import {
    X,
    ExternalLink,
    ChevronDown,
    ChevronRight,
    Edit2,
    Instagram,
    Youtube,
    Bookmark,
    FileText,
    Mail,
    Send
} from "lucide-react";
import { CoreButton, CoreAvatar, CoreTag } from "../../design-system";

// Types for Management Info
interface SavedGroup {
    id: number;
    name: string;
}

interface CampaignInfo {
    id: number;
    name: string;
    status: 'pending' | 'running' | 'completed';
    budget: number;
    deadline?: string;
    manager?: string;
}

interface DMHistoryItem {
    id: number;
    campaignName: string;
    type: 'dm' | 'email';
    status: 'sent' | 'pending' | 'failed';
    sender?: string;
    receiver?: string;
}

export interface InfluencerProfile {
    id: number;
    username: string;
    displayName: string;
    profileImage?: string;
    bio?: string;
    isVerified?: boolean;
    postsCount?: number;
    followersCount?: number;
    followingCount?: number;
    categories?: string[];
    hashtags?: string[];
    externalLinks?: { label: string; url: string }[];
    photos?: string[];
    lastUpdated?: string;
    // Management Info
    email?: string;
    notes?: string;
    tier?: string;
    affiliation?: string;
    savedGroups?: SavedGroup[];
    campaigns?: CampaignInfo[];
    dmHistory?: DMHistoryItem[];
}

interface InfluencerManagementDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    influencer: InfluencerProfile | null;
    onSave?: (id: number, updates: Partial<InfluencerProfile>) => void;
}

export function InfluencerManagementDrawer({
    isOpen,
    onClose,
    influencer,
    onSave
}: InfluencerManagementDrawerProps) {
    const [activePlatform, setActivePlatform] = useState<'instagram' | 'youtube' | 'x'>('instagram');
    const [expandedSections, setExpandedSections] = useState<string[]>(['groups', 'campaigns', 'dm']);

    // Local state for editable fields
    const [email, setEmail] = useState(influencer?.email || '');
    const [notes, setNotes] = useState(influencer?.notes || '');
    const [tier, setTier] = useState(influencer?.tier || '');
    const [affiliation, setAffiliation] = useState(influencer?.affiliation || '');

    if (!isOpen || !influencer) return null;

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const formatNumber = (num: number) => {
        if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
        return num.toLocaleString();
    };

    // Mock data
    const mockPhotos = [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1583241475880-083f84372725?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1581182800629-7d90925ad072?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=150&h=150&fit=crop",
    ];

    const savedGroups: SavedGroup[] = influencer.savedGroups || [
        { id: 1, name: "2025년 뷰티 캠페인" },
        { id: 2, name: "AI 크리에이터" },
    ];

    const campaigns: CampaignInfo[] = influencer.campaigns || [
        { id: 1, name: "2025년 뷰티 캠페인", status: "running", budget: 3500000, deadline: "미지시", manager: "ray" },
        { id: 2, name: "시딩", status: "completed", budget: 100000, deadline: "25. 10. 10 까지", manager: "ray" },
    ];

    const dmHistory: DMHistoryItem[] = influencer.dmHistory || [
        { id: 1, campaignName: "2025년 뷰티 캠페인", type: "email", status: "sent", sender: "ddd@feat.com", receiver: "ray@featuring.in" },
        { id: 2, campaignName: "워킹맘/30대/육아 (참여로 인정된 채널 기준 최종 업로드한 콜랍이...", type: "dm", status: "sent", sender: "ddd@feat.com", receiver: "ray@featuring.in" },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-40"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-[900px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.15)] z-50 flex">
                {/* Left Panel - Profile Card */}
                <div className="w-[480px] border-r border-gray-100 flex flex-col overflow-hidden">
                    {/* Header - Close Button Only */}
                    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-end">
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Profile Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5">
                        {/* Profile Header */}
                        <div className="flex items-start gap-4">
                            <CoreAvatar
                                src={influencer.profileImage}
                                name={influencer.displayName}
                                size="lg"
                                className="w-20 h-20"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg text-gray-900">@{influencer.username}</span>
                                    {influencer.isVerified && (
                                        <span className="text-blue-500">✓</span>
                                    )}
                                    <a
                                        href={`https://instagram.com/${influencer.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-auto p-1.5 hover:bg-gray-100 rounded"
                                    >
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </a>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{influencer.bio || "메이크업 아티스트 제이라니다🤎"}</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 py-3 border-y border-gray-100">
                            <div className="text-center">
                                <p className="text-lg font-bold text-gray-900">{formatNumber(influencer.postsCount || 1900)}</p>
                                <p className="text-xs text-gray-500">게시물</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-gray-900">{formatNumber(influencer.followersCount || 155000)}</p>
                                <p className="text-xs text-gray-500">팔로워</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-gray-900">{formatNumber(influencer.followingCount || 1000)}</p>
                                <p className="text-xs text-gray-500">팔로잉</p>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-1.5">
                            {(influencer.categories || ['Makeup Artist', 'F&B', '일상']).map((cat, idx) => (
                                <CoreTag key={idx} colorType="gray" size="sm">{cat}</CoreTag>
                            ))}
                        </div>

                        {/* Bio / Description */}
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>makeup artist 제이</p>
                            <p>열심히 모습을 만날 수 있어요.</p>
                            <p className="text-blue-600">#메이크업 #화장품리뷰 #makeup #hair #hairmakeup</p>
                        </div>

                        {/* External Links */}
                        <div className="space-y-2">
                            <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                                <span className="w-4 h-4 rounded-full bg-gray-200"></span>
                                Threads 프로필 방문
                            </a>
                            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <span className="w-4 h-4">🔗</span>
                                bit.ly/maaaaaaaaake
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                                <Bookmark className="w-4 h-4" />
                                저장
                            </button>
                            <button className="flex-1 py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5">
                                <FileText className="w-4 h-4" />
                                리포트
                            </button>
                            <button className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
                                <span className="text-gray-400">•••</span>
                            </button>
                        </div>

                        {/* Photo Grid */}
                        <div className="grid grid-cols-3 gap-1">
                            {mockPhotos.map((photo, idx) => (
                                <div key={idx} className="aspect-square bg-gray-100 rounded overflow-hidden">
                                    <img src={photo} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Last Update */}
                        <p className="text-xs text-gray-400 text-center">
                            Last update: {influencer.lastUpdated || "2025. 07. 08"}
                        </p>
                    </div>
                </div>

                {/* Right Panel - Management Info */}
                <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
                        <h3 className="text-base font-bold text-gray-900">인플루언서 관리 정보</h3>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <Edit2 className="w-3.5 h-3.5" />
                            관리 정보 설정
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5">
                        {/* Editable Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5">이메일</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="인플루언서의 이메일 주소를 입력하세요."
                                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5">참고 사항</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="워크스페이스 팀원들과 인플루언서에 대한 정보를 메모하고 공유하세요."
                                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 h-16 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5">인플루언서 티어</label>
                                <input
                                    type="text"
                                    value={tier}
                                    onChange={(e) => setTier(e.target.value)}
                                    placeholder="내용을 입력하세요."
                                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5">제휴</label>
                                <input
                                    type="text"
                                    value={affiliation}
                                    onChange={(e) => setAffiliation(e.target.value)}
                                    placeholder="내용을 입력하세요."
                                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Collapsible Sections */}
                        {/* Saved Groups */}
                        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button
                                onClick={() => toggleSection('groups')}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                            >
                                <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <span className="text-gray-400">:</span>
                                    저장된 그룹 ({savedGroups.length})
                                </span>
                                {expandedSections.includes('groups') ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {expandedSections.includes('groups') && (
                                <div className="px-4 pb-3 flex flex-wrap gap-2">
                                    {savedGroups.map(group => (
                                        <span key={group.id} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs flex items-center gap-1">
                                            {group.name}
                                            <button className="hover:text-purple-900">×</button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Campaigns */}
                        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button
                                onClick={() => toggleSection('campaigns')}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                            >
                                <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    참여 캠페인 ({campaigns.length})
                                </span>
                                {expandedSections.includes('campaigns') ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {expandedSections.includes('campaigns') && (
                                <div className="px-4 pb-3 space-y-2">
                                    {campaigns.map(campaign => (
                                        <div key={campaign.id} className="p-3 border border-gray-100 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">
                                                    {campaign.name}
                                                </span>
                                                <span className="text-xs text-gray-400">👤 {campaign.manager}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className={`flex items-center gap-1 ${campaign.status === 'running' ? 'text-blue-600' : 'text-gray-500'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${campaign.status === 'running' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                                                    {campaign.status === 'running' ? '진행중' : campaign.status === 'completed' ? '종료' : '대기'}
                                                </span>
                                                <span>💰 {campaign.budget.toLocaleString()}원</span>
                                                {campaign.deadline && (
                                                    <span>📅 {campaign.deadline}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded">
                                        더보기
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* DM/Email History */}
                        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button
                                onClick={() => toggleSection('dm')}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                            >
                                <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Send className="w-4 h-4 text-gray-400" />
                                    DM/이메일 발송 ({dmHistory.length})
                                </span>
                                {expandedSections.includes('dm') ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {expandedSections.includes('dm') && (
                                <div className="px-4 pb-3 space-y-2">
                                    {dmHistory.map(item => (
                                        <div key={item.id} className="p-3 border border-gray-100 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs truncate max-w-[200px]">
                                                    {item.campaignName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    {item.type === 'email' ? <Mail className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                                                    발송 성공
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400 space-y-0.5">
                                                <p>발신: {item.sender}</p>
                                                <p>수신: {item.receiver}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
