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
    linkedCampaignId?: number;  // Links to Campaign.id
}

// CTA 링크 (변수 지원)
export interface CTALink {
    buttonName: string;
    url: string;
    isVariable?: boolean;      // true면 변수로 처리
    variableName?: string;     // 변수명 (예: "product_url")
}

// 템플릿 상태
export type TemplateStatus = 'draft' | 'saved' | 'deployed';

// DM 템플릿
export interface DMTemplate {
    id?: number;
    name?: string;             // 템플릿 이름
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

// 인플루언서별 템플릿 변수값
export interface InfluencerTemplateVars {
    influencerId: number;
    templateId: number;
    variables: Record<string, string>;  // { "product_url": "https://..." }
    deliveryStatus?: 'pending' | 'sent' | 'failed' | 'cancelled';
    deliveredAt?: string;
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
    reactionAutomationGroupId?: number;  // Links to AutomationGroup.id
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

// 캠페인 대시보드용 자동화 요약
export interface AutomationGroupSummary {
    id: number;
    name: string;
    status: AutomationStatus;
    triggerType: TriggerType;
    triggerKeywords: string[]; // 요약용 (최대 3개 + n)
    influencerCount: number;
    setupDoneCount: number; // 설정 완료 수 (예: 5/10)
    lastModified?: string;
    stats?: {
        participation: number; // 참여 인플루언서
        sent: number;         // 발송
        click: number;        // 클릭
        ctr: number;          // CTR
    };
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

    // Custom Settings for Setup Tab
    customUrl?: string; // Can be deprecated or aliased to button1Url if needed
    hasCustomSettings?: boolean;
    productApplicationUrl?: string;

    // Advanced Automation Fields
    automationStatus?: 'draft' | 'pending' | 'active' | 'updating' | 'rejected';
    button1Url?: string;
    button2Url?: string;
    button3Url?: string;
    reviewStatus?: 'default' | 'custom' | 'modified';
    isLinkLocked?: boolean; // 상품 신청서 URL

    // Extended Analytics
    isTemplateShared: boolean;
    likes?: number;
    comments?: number;
    saves?: number;
    reposts?: number;
    shares?: number;
    uniqueReach?: number;
    uniqueClicks?: number;
    ctr?: number; // uniqueClicks / uniqueReach * 100
    followConversions?: number;
    followConversionRate?: number; // followConversions / uniqueReach * 100

    // Applied Contents
    appliedContents?: {
        id: number;
        thumbnailUrl?: string;
        contentUrl: string;
        postedDate: string; // e.g. '24.01.01'
        type: '피드' | '릴스' | '스토리' | '쇼츠' | '영상';
        // Per-content performance metrics
        likes?: number;
        comments?: number;
        saves?: number;
        uniqueReach?: number;
        uniqueClicks?: number;
        ctr?: number;
        followConversions?: number;
        followConversionRate?: number;
    }[];
}

// 발송 상태
export type SendStatus = 'pending' | 'sending' | 'sent' | 'failed';

// 발송 속도
export type SendSpeed = 'slow' | 'normal' | 'fast';

// 발송 로그 엔트리
export interface SendLogEntry {
    id: number;
    influencerId: number;
    influencerName: string;
    profileImage?: string;
    timestamp: string;
    status: SendStatus;
    errorMessage?: string;
}

// 발송 스케줄
export interface SendSchedule {
    scheduledTime: string;
    speed: SendSpeed;
}

// 대기열 메시지
export interface QueuedMessage {
    id: number;
    influencerId: number;
    influencerName: string;
    profileImage?: string;
    followerCount: number;
    messageType: 'dm' | 'comment_reply';
    linkSettings: string[];
    status: SendStatus;
    scheduledTime?: string;
}

// 일별 성과 데이터 (차트용)
export interface DailyPerformance {
    date: string;
    reach: number;
    clicks: number;
    conversions: number;
}

// 성과 상세 테이블 행
export interface PerformanceTableRow {
    id: number;
    influencerName: string;
    profileImage?: string;
    followerCount: number;
    sentDate: string;
    isOpened: boolean;
    clickCount: number;
    conversionCount: number;
    clickRate: number;
    roi: number;
    likes: number;
    comments: number;
    saves: number;
}
