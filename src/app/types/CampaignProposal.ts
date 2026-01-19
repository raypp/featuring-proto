// Campaign Proposal Types for B2C Influencer Side

// 전체 상태 머신 (Status Machine)
export type ProposalStatus =
    | 'sent'       // 전달됨 - 브랜드가 전송, 인플루언서 미확인
    | 'viewed'     // 확인됨 - 인플루언서가 확인
    | 'accepted'   // 수락됨 - 설정 전
    | 'setup_done' // 설정 완료 - 아직 실행 안함
    | 'active'     // 실행 중
    | 'paused'     // 중단됨
    | 'rejected'   // 거절됨
    | 'revoked'    // 철회됨 (브랜드가 취소)
    | 'expired'    // 만료됨
    | 'error';     // 오류

// Legacy status mapping for backward compatibility
export type LegacyProposalStatus = 'pending' | 'accepted' | 'active' | 'completed' | 'rejected';

// 에러 사유 타입
export type ErrorReason =
    | 'account_disconnected'  // 계정 연결 해제
    | 'permission_expired'    // 권한 만료
    | 'rate_limited'          // 요청 제한
    | 'policy_blocked';       // 정책 차단 (댓글 7일 경과 등)

// 에러 사유 라벨 매핑
export const ERROR_REASON_LABELS: Record<ErrorReason, string> = {
    account_disconnected: '연동 필요',
    permission_expired: '권한 만료',
    rate_limited: '지연 중',
    policy_blocked: '정책 제한'
};

export interface CampaignProposal {
    id: number;
    brandId?: string;
    brandName: string;
    brandLogo?: string;

    // 자동화 정보
    automationGroupId?: number;
    automationName?: string;  // 자동화명 (없으면 campaignName 사용)
    campaignName: string;
    templateId: number;

    // 캠페인 연결 (nullable - 단독 협업 vs 캠페인 연결)
    campaignId?: number | null;
    // campaignName은 위에 이미 있음 (캠페인 연결된 경우 캠페인명으로 사용)

    // Template Content (from B2B)
    triggerKeywords: string[];
    publicReplyTexts: string[];
    dmMessage: string;
    ctaButtonText: string;
    ctaLink: string;
    isCtaLocked: boolean;  // Brand can lock the CTA link

    // Status (extended)
    status: ProposalStatus;
    isUnread: boolean;  // 읽지 않음 표시

    // Timestamps
    createdAt: string;
    updatedAt: string;
    receivedAt: string;
    acceptedAt?: string;
    activatedAt?: string;

    // Error information
    errorReason?: ErrorReason;

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

    // Optional: Performance metrics summary (P1)
    metricsSummary?: {
        deliveredUnique: number;
        clickUnique: number;
        ctr: number;
    };
    lastSyncedAt?: string;
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

// Helper: 상태별 섹션 분류
export type ProposalSection = 'action_required' | 'running' | 'paused' | 'archived';

export const STATUS_TO_SECTION: Record<ProposalStatus, ProposalSection> = {
    sent: 'action_required',
    viewed: 'action_required',
    accepted: 'action_required',
    setup_done: 'action_required',
    error: 'action_required',
    active: 'running',
    paused: 'paused',
    rejected: 'archived',
    revoked: 'archived',
    expired: 'archived'
};

// Helper: 섹션 정보
export const SECTION_INFO: Record<ProposalSection, { label: string; icon: string }> = {
    action_required: { label: '해야 할 일', icon: '✅' },
    running: { label: '운영 중', icon: '🟢' },
    paused: { label: '중단됨', icon: '⏸' },
    archived: { label: '보관함', icon: '🗃' }
};

// Helper: 상태 라벨
export const STATUS_LABELS: Record<ProposalStatus, string> = {
    sent: '수락 대기',
    viewed: '확인됨',
    accepted: '설정 필요',
    setup_done: '실행 대기',
    active: '실행 중',
    paused: '중단됨',
    rejected: '거절됨',
    revoked: '철회됨',
    expired: '만료됨',
    error: '오류'
};
