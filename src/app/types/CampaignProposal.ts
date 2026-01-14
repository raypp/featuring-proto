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
    ctaLink: string;
    isCtaLocked: boolean;  // Brand can lock the CTA link

    // Status
    status: 'pending' | 'accepted' | 'active' | 'completed' | 'rejected';
    receivedAt: string;
    acceptedAt?: string;
    activatedAt?: string;

    // Post binding (set by influencer)
    selectedPostId?: string;
    selectedPostThumbnail?: string;

    // Customized message (influencer can edit)
    customizedMessage?: string;

    // Performance (synced with B2B)
    performance?: {
        sentCount: number;
        clickCount: number;
        ctr: string;
    };
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
