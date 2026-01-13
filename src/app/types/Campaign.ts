// Campaign Types for B2C Influencer Side

export interface Campaign {
    id: number;
    brandName: string;
    brandLogo?: string;
    campaignName: string;
    status: 'invited' | 'active' | 'settlement' | 'completed';
    period: {
        start: string;
        end: string;
    };
    contactEmail?: string;

    // To-do items
    todoItems: CampaignTodoItem[];

    // Template data (from B2B)
    templateData?: {
        triggerKeywords: string[];
        publicReplyTexts: string[];
        dmMessage: string;
        ctaButtonText: string;
        ctaLink: string;
    };

    // Linked automation (after setup)
    automationId?: number;
    selectedPostId?: string;
    selectedPostThumbnail?: string;

    // Stats (after activation)
    executions?: number;
    ctr?: string;

    // Timestamps
    invitedAt: string;
    acceptedAt?: string;
    completedAt?: string;
}

export interface CampaignTodoItem {
    id: string;
    type: 'automation' | 'contract' | 'settlement';
    status: 'pending' | 'completed';
    label: string;
    description?: string;
}

// Extended Automation type (add to existing)
export type AutomationType = 'personal' | 'campaign';
