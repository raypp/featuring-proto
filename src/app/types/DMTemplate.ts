export interface CTALink {
    buttonName: string;
    url: string;
}

export type TemplateStatus = 'draft' | 'saved' | 'deployed';

export interface DMTemplate {
    id?: number;
    automationGroupId: number;
    dmGuide: string;           // Plain text, multi-line
    imageUrl?: string;         // Optional single image
    ctaLinks: CTALink[];       // Max 3 links
    status: TemplateStatus;
    lastModified?: string;
    deployedAt?: string;
}
