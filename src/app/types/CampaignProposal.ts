// Campaign Proposal Types for B2C Influencer Side

export interface CampaignProposal {
    id: number;
    brandName: string;
    brandLogo?: string;
    campaignName: string;
    templateId: number;

    // Template Content (from B2B)
    triggerKeywords: string[];
    publicReplyTexts: string[];
    dmMessage: string;
    ctaButtonText: string;
    ctaLink: string;  // Locked - cannot be edited by influencer

    // Status
    status: 'pending' | 'accepted' | 'active' | 'completed' | 'rejected';
    receivedAt: string;
    acceptedAt?: string;
    activatedAt?: string;

    // Post binding (set by influencer)
    selectedPostId?: string;
    selectedPostThumbnail?: string;

    // Performance (after activation)
    executions?: number;
    ctr?: string;
}

// Instagram Post for selection
export interface InstagramPost {
    id: string;
    thumbnailUrl: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    caption?: string;
    likeCount: number;
    commentCount: number;
    postedAt: string;
}
