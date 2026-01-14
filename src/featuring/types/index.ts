// 피처링 서비스 (B2B) 타입 정의

// 반응 자동화 그룹
export interface AutomationGroup {
    id: number;
    name: string;
    description?: string;
    status: 'active' | 'inactive';
    influencerCount: number;
    templateStatus: 'none' | 'draft' | 'saved' | 'deployed';
    lastModified: string;
    createdAt: string;
}

// CTA 링크
export interface CTALink {
    buttonName: string;
    url: string;
}

// 템플릿 상태
export type TemplateStatus = 'draft' | 'saved' | 'deployed';

// DM 템플릿
export interface DMTemplate {
    id?: number;
    automationGroupId: number;
    dmGuide: string;           // Plain text, multi-line
    imageUrl?: string;         // Optional single image
    ctaLinks: CTALink[];       // Max 3 links
    status: TemplateStatus;
    lastModified?: string;
    deployedAt?: string;

    // Extended fields for Proposal Mode
    triggerKeywords?: string[];
    publicReplyTexts?: string[];
    publicReplyActive?: boolean;
    postData?: {
        id: string;
        image: string;
        caption: string;
        date: string;
    };
}

// 인플루언서
export interface Influencer {
    id: number;
    username: string;
    displayName: string;
    profileImage?: string;
    followerCount: number;
    isSelected: boolean;
}

// 캠페인 상태
export type CampaignStatus = 'drafting' | 'pending' | 'running' | 'completed' | 'archived';

// 캠페인 태그
export type CampaignTag = 'Sponsored Content' | 'Ambassadors' | 'Engagement' | 'Reach' | 'UGC' | 'KOLs';

// 캠페인 유형
export type CampaignType = '어필리에이트' | '뮤가 시딩' | '오프라인/팝업' | '노스폰서쉽';

// 캠페인
export interface Campaign {
    id: number;
    name: string;
    description?: string;
    status: CampaignStatus;
    tags: CampaignTag[];
    startDate: string;
    endDate: string;
    campaignType: CampaignType;
    brandName: string;
    contentCount: number;
    secondaryUsageCount: number;
    budget?: number;
    platform?: 'instagram' | 'tiktok' | 'youtube';
    createdAt: string;
    lastModified: string;
}

// 캠페인 인플루언서
export interface CampaignInfluencer {
    id: number;
    username: string;
    displayName: string;
    profileImage?: string;
    category: string;
    task: string;
    aiReachPrediction?: number;
    hasCustomRequirements: boolean;
    contentUsageApproved: boolean;
    contractSent: boolean;
    followerCount: number;
    contentReachCount?: number;
    totalContentCost?: number;
    contentReceivedDate?: string;
    cpvPerformance?: string;
    guideDelivered: boolean;
    contentUrl?: string;
}

// 캠페인 콘텐츠
export type ContentType = '피드' | '릴스' | '스토리' | '쇼츠' | '영상';

export interface CampaignContent {
    id: number;
    thumbnailUrl?: string;
    contentUrl: string;
    influencerUsername: string;
    influencerDisplayName: string;
    influencerProfileImage?: string;
    contentType: ContentType;
    postedDate: string;
    likes: number;
    comments: number;
    saves: number;
    reach: number;
    insightDataReceived: boolean;
    contentCost: number;
    cpv: string;
    secondaryUsage: boolean;
    approvalStatus: 'pending' | 'approved' | 'rejected';
}

// 반응 자동화
export type AutomationStatus = 'draft' | 'running' | 'stopped';
export type TriggerType = 'comment_keyword' | 'dm_keyword' | 'story_mention';

export interface ReactionAutomation {
    id: number;
    name: string;
    campaignId?: number;
    campaignName?: string;
    status: AutomationStatus;
    triggerType: TriggerType;
    triggerKeywords: string[];
    message: string;
    linkUrl?: string;
    linkButtonText?: string;
    createdAt: string;
    lastModified: string;
}

// 자동화 인플루언서 성과
export interface AutomationInfluencer {
    id: number;
    influencerId: number;
    username: string;
    displayName: string;
    profileImage?: string;
    status: 'pending' | 'sent' | 'delivered' | 'read' | 'clicked';
    sentCount: number;
    clickCount: number;
    cpv?: number;
    cpe?: number;
    isConnected: boolean;
    lastSentAt?: string;
}
