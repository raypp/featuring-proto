import { Sparkles, RefreshCw, HelpCircle, ChevronRight, Play, Instagram, Youtube } from "lucide-react";
import { AutomationGroup } from "../types";
import { CoreTag } from "../../design-system";
import { ConnectedAccount } from "../../shared";

interface DashboardProps {
    automationGroups: AutomationGroup[];
    onNavigate: (view: string) => void;
    connectedAccount?: ConnectedAccount | null;
}

// Mock data for recent influencers
const MOCK_RECENT_INFLUENCERS = [
    {
        id: 1,
        username: "yeon_e_home",
        displayName: "집꾸미기",
        profileImage: "",
        platform: "instagram" as const,
        followerCount: "51.2만",
        categories: ["F&B", "일상"]
    },
    {
        id: 2,
        username: "_thenewgrey",
        displayName: "더뉴그레이(THENEWGREY)",
        profileImage: "",
        platform: "instagram" as const,
        followerCount: "49만",
        categories: ["일상", "패션"]
    },
    {
        id: 3,
        username: "유리아YuRia",
        displayName: "yuria",
        profileImage: "",
        platform: "youtube" as const,
        followerCount: "29.2만",
        categories: ["뷰티", "패션"]
    },
    {
        id: 4,
        username: "ddobini",
        displayName: "또비니",
        profileImage: "",
        platform: "tiktok" as const,
        followerCount: "4.5만",
        categories: ["뷰티", "패션"]
    }
];

// Mock data for guide videos
const MOCK_GUIDE_VIDEOS = [
    {
        id: 1,
        title: "인플루언서 찾기",
        description: "데이터 기반, 브랜드 맞춤 인플루언서 빠르게 찾기",
        thumbnail: "",
        duration: "0:59",
        gradient: "from-[#6366f1] to-[#8b5cf6]",
        heading: "데이터 기반,",
        subheading: "브랜드 맞춤 인플루언서",
        highlight: "빠르게 찾기"
    },
    {
        id: 2,
        title: "인플루언서 관리",
        description: "찾은 인플루언서, 그룹으로 쉽고 간편하게 관리하기",
        thumbnail: "",
        duration: "0:39",
        gradient: "from-[#06b6d4] to-[#3b82f6]",
        heading: "찾은 인플루언서,",
        subheading: "그룹으로 한 눈에 정리하고",
        highlight: "쉽게 관리하기"
    },
    {
        id: 3,
        title: "DM/이메일 발송",
        description: "한 번의 클릭으로 대량의 인플루언서들에게 제안하기",
        thumbnail: "",
        duration: "0:31",
        gradient: "from-[#f97316] to-[#ef4444]",
        heading: "한 번의 클릭으로",
        subheading: "대량의 인플루언서들에게",
        highlight: "빠르게 제안하기"
    },
    {
        id: 4,
        title: "캠페인 관리",
        description: "캠페인 진행 현황과 결과 리포트로 성과 최적화하기",
        thumbnail: "",
        duration: "",
        gradient: "from-[#10b981] to-[#059669]",
        heading: "캠페인 진행 현황과",
        subheading: "자동 생성 결과 리포트로",
        highlight: "성과 최적화하기"
    }
];

export function Dashboard({ automationGroups, onNavigate, connectedAccount }: DashboardProps) {
    // Build influencer list with connected account first
    const recentInfluencers = connectedAccount
        ? [
            {
                id: 0,
                username: connectedAccount.username,
                displayName: connectedAccount.displayName,
                profileImage: connectedAccount.profileImage,
                platform: connectedAccount.platform as 'instagram' | 'youtube' | 'tiktok',
                followerCount: connectedAccount.followerCountFormatted,
                categories: connectedAccount.categories,
                isConnected: true
            },
            ...MOCK_RECENT_INFLUENCERS
        ]
        : MOCK_RECENT_INFLUENCERS;

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'instagram':
                return <Instagram className="w-4 h-4" />;
            case 'youtube':
                return <Youtube className="w-4 h-4" />;
            case 'tiktok':
                return (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-8 max-w-[1200px] mx-auto">
            {/* Header */}
            <h1 className="text-lg font-medium text-[var(--ft-text-primary)] mb-6">
                대시보드
            </h1>

            {/* AI List-up Hero Section */}
            <div className="bg-gradient-to-b from-[#f8f7ff] to-white rounded-2xl border border-[#e8e5ff] p-8 mb-8 relative overflow-hidden">
                {/* Help icon */}
                <button className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs">
                    ?
                </button>

                {/* Section header */}
                <p className="text-center text-sm text-[#6366f1] font-medium mb-2">
                    AI 프리 리스트업
                </p>

                {/* Greeting */}
                <h2 className="text-center text-2xl font-bold text-[var(--ft-text-primary)] mb-4">
                    안녕하세요. ray2님
                </h2>

                {/* CTA Banner */}
                <div className="flex items-center justify-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border border-[#e8e5ff] mx-auto w-fit mb-8">
                    <Sparkles className="w-5 h-5 text-[#6366f1]" />
                    <span className="text-sm text-[var(--ft-text-primary)]">
                        번거로운 인플루언서 찾기, 매일 제가 대신 해드릴게요!
                    </span>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-[var(--ft-border-primary)] p-6 text-center">
                            {/* Status Badge */}
                            <div className="flex justify-end mb-4">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#f3f4f6] text-[#6b7280]">
                                    ○ 진행 대기
                                </span>
                            </div>

                            {/* Icon */}
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f9fafb] flex items-center justify-center">
                                <RefreshCw className="w-6 h-6 text-[#d1d5db]" />
                            </div>

                            {/* Text */}
                            <p className="text-sm font-medium text-[var(--ft-text-primary)] mb-2">
                                진행 중인 리스트업이 없습니다.
                            </p>
                            <p className="text-xs text-[var(--ft-text-tertiary)] mb-4">
                                지금 AI에게 리스트업을 요청하고<br />
                                매일 손쉽게 인플루언서를 추천 받아 보세요.
                            </p>

                            {/* Button */}
                            <button className="px-4 py-2 border border-[var(--ft-border-primary)] rounded-lg text-sm text-[var(--ft-text-primary)] hover:bg-[var(--ft-bg-secondary)] transition-colors">
                                새 리스트업 요청
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cumulative Stats Section */}
            <div className="mb-8">
                <h3 className="text-base font-medium text-[var(--ft-text-primary)] mb-4">
                    AI 프리 리스트업 누적 현황
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="flex items-center gap-1 text-xs text-[var(--ft-text-secondary)] mb-1">
                                <span>총 리스트업 요청 건수</span>
                                <HelpCircle className="w-3 h-3 text-[var(--ft-text-disabled)]" />
                            </div>
                            <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                                0<span className="text-base font-normal">회</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="flex items-center gap-1 text-xs text-[var(--ft-text-secondary)] mb-1">
                                <span>총 리스트업된 인플루언서 수</span>
                                <HelpCircle className="w-3 h-3 text-[var(--ft-text-disabled)]" />
                            </div>
                            <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                                0<span className="text-base font-normal">명</span>
                                <span className="text-sm text-[#6366f1] font-normal ml-2">어제보다 +0</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="flex items-center gap-1 text-xs text-[var(--ft-text-secondary)] mb-1">
                                <span>평균 리스트업 진행 일수</span>
                                <HelpCircle className="w-3 h-3 text-[var(--ft-text-disabled)]" />
                            </div>
                            <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                                0<span className="text-base font-normal">일</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Influencers Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium text-[var(--ft-text-primary)]">
                        최근 조회한 인플루언서
                    </h3>
                    <button className="text-[var(--ft-text-tertiary)] hover:text-[var(--ft-text-secondary)]">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {recentInfluencers.map((influencer) => (
                        <div
                            key={influencer.id}
                            className={`flex-shrink-0 w-[200px] bg-[var(--ft-bg-primary)] rounded-xl border p-4 cursor-pointer hover:shadow-md transition-shadow ${(influencer as { isConnected?: boolean }).isConnected ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20' : 'border-[var(--ft-border-primary)]'}`}
                        >
                            {/* Categories */}
                            <div className="flex gap-1 mb-3 flex-wrap">
                                {influencer.categories.map((cat, idx) => (
                                    <CoreTag key={idx} size="xs" colorType={cat === 'F&B' ? 'primary' : 'gray'}>
                                        {cat}
                                    </CoreTag>
                                ))}
                            </div>

                            {/* Profile */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                    {influencer.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[var(--ft-text-tertiary)]">
                                            {getPlatformIcon(influencer.platform)}
                                        </span>
                                        <p className="text-sm font-medium text-[var(--ft-text-primary)] truncate">
                                            {influencer.username}
                                        </p>
                                    </div>
                                    <p className="text-xs text-[var(--ft-text-tertiary)] truncate">
                                        {influencer.displayName}
                                    </p>
                                </div>
                            </div>

                            {/* Follower count */}
                            <p className="text-xs text-[var(--ft-text-secondary)] mt-3">
                                {influencer.followerCount} {influencer.platform === 'youtube' ? '구독자' : '팔로워'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Guide Section */}
            <div>
                <h3 className="text-base font-medium text-[var(--ft-text-primary)] mb-2">
                    피처링 활용 가이드
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--ft-text-secondary)] mb-4">
                    <Play className="w-4 h-4" />
                    <span>영상으로 쉽게 이해하기</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {MOCK_GUIDE_VIDEOS.map((video) => (
                        <div
                            key={video.id}
                            className="flex-shrink-0 w-[240px] cursor-pointer group"
                        >
                            {/* Video Thumbnail */}
                            <div className={`relative h-[140px] rounded-xl bg-gradient-to-br ${video.gradient} p-4 mb-3 overflow-hidden`}>
                                <div className="text-white text-sm">
                                    <p className="font-medium leading-tight">{video.heading}</p>
                                    <p className="font-medium leading-tight">{video.subheading}</p>
                                    <p className="font-bold text-yellow-300 leading-tight">{video.highlight}</p>
                                </div>

                                {/* Play button and duration */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <span className="text-xs text-white/80 flex items-center gap-1">
                                        <span className="text-[10px]">★</span> Featuring Guide
                                    </span>
                                </div>
                                {video.duration && (
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 rounded px-1.5 py-0.5">
                                        <Play className="w-3 h-3 text-white fill-white" />
                                        <span className="text-xs text-white">{video.duration}</span>
                                    </div>
                                )}
                            </div>

                            {/* Video Info */}
                            <p className="text-sm font-medium text-[var(--ft-text-primary)] mb-1">
                                {video.title}
                            </p>
                            <p className="text-xs text-[var(--ft-text-secondary)] line-clamp-2">
                                {video.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
