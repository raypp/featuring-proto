// Shared types used across both B2C (Studio) and B2B (Featuring) services

export interface ConnectedAccount {
    id: string;
    username: string;
    displayName: string;
    profileImage: string;
    platform: 'instagram' | 'youtube' | 'tiktok';
    followerCount: number;
    followerCountFormatted: string;
    categories: string[];
    isVerified: boolean;
    connectedAt: string;
}

// Shared Campaign Template - synced between B2B (brand) and B2C (influencer)
export interface SharedCampaignTemplate {
    id: string;
    campaignId: number;
    campaignName: string;
    brandName: string;
    brandLogo?: string;

    // Template Content
    triggerKeywords: string[];
    dmMessage: string;
    ctaButton: {
        text: string;
        url: string;
        isLocked: boolean;  // Brand can lock the URL
    };

    // Performance (synced between both sides)
    performance: {
        sentCount: number;
        clickCount: number;
        ctr: string;
    };

    // Status per influencer
    influencerUsername: string;
    influencerStatus: 'pending' | 'accepted' | 'active' | 'completed';
    receivedAt: string;
    acceptedAt?: string;
    activatedAt?: string;

    // Post binding (set by influencer)
    selectedPostId?: string;
    selectedPostThumbnail?: string;

    // Editable message (influencer can customize)
    customizedMessage?: string;
}

// Default connected account for demo purposes
export const DEMO_CONNECTED_ACCOUNT: ConnectedAccount = {
    id: 'ig-sojumanjan',
    username: 'sojumanjan',
    displayName: '소주만잔',
    profileImage: '',
    platform: 'instagram',
    followerCount: 50000,
    followerCountFormatted: '5만',
    categories: ['뷰티', '라이프스타일'],
    isVerified: false,
    connectedAt: '2024-03-01'
};

// Dyson Campaign Template - shared demo data
export const DYSON_CAMPAIGN_TEMPLATE: SharedCampaignTemplate = {
    id: 'dyson-2026-airwrap',
    campaignId: 1,
    campaignName: '2026 에어랩 런칭 캠페인',
    brandName: '다이슨',
    brandLogo: '',
    triggerKeywords: ['에어랩', '참여', '이벤트'],
    dmMessage: '안녕하세요! 다이슨 2026 에어랩 런칭 이벤트에 참여해주셔서 감사합니다. 🎁',
    ctaButton: {
        text: '쿠폰 받기',
        url: 'https://dyson.co.kr/promo',
        isLocked: true
    },
    performance: {
        sentCount: 150,
        clickCount: 45,
        ctr: '30.0%'
    },
    influencerUsername: 'sojumanjan',
    influencerStatus: 'active',
    receivedAt: '2026-01-14',
    acceptedAt: '2026-01-14',
    activatedAt: '2026-01-14',
    selectedPostId: 'post1',
    customizedMessage: '안녕 곤쥬님들!💖 다이슨 2026 에어랩 런칭 이벤트에 참여해주셔서 감사합니다. 🎁'
};
