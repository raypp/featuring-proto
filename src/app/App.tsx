import { useState } from "react";
import { ConnectAccount } from "./pages/ConnectAccount";
import { Dashboard } from "./pages/Dashboard";
import { AutomationDetail, Automation } from "./pages/AutomationDetail";
import { LogsPage } from "./pages/LogsPage";
import { AccountSettings } from "./pages/AccountSettings";
import { TemplateManagement } from "./pages/TemplateManagement";
import { ProposalDetail } from "./pages/ProposalDetail";
import { MyAutomationsPage } from "./pages/MyAutomationsPage";
import { CampaignsPage } from "./pages/CampaignsPage";
import { CampaignDetail } from "./pages/CampaignDetail";
import { Layout } from "./components/Layout";
import { DMTemplate } from "./types/DMTemplate";
import { CampaignProposal, InstagramPost } from "./types/CampaignProposal";
import { Campaign } from "./types/Campaign";
import { ServiceSwitcherBar } from "../design-system";
import { ConnectedAccount } from "../shared";

// Helper function to get current date in YYYY.MM.DD format
function getCurrentDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

// Helper function to check if automation can be activated
function canActivate(automation: Automation): boolean {
  // 게시물 선택 완료 (필수값 - 항상 postIds가 필요)
  const hasValidPost = automation.trigger.postIds.length > 0;

  // 댓글 트리거 설정 완료 (keywords 모드면 keywords 필요, any면 통과)
  const hasValidTrigger = automation.trigger.matchType === 'any' ||
    (automation.trigger.matchType === 'keywords' && automation.trigger.keywords.length > 0);

  // 공개 답글이 ON이면 texts 필요
  const hasValidPublicReply = !automation.publicReply.isActive ||
    (automation.publicReply.isActive && automation.publicReply.texts.length > 0 &&
      automation.publicReply.texts.some(text => text.trim() !== ''));

  // DM 본문 설정 완료
  const hasDmText = automation.privateDm.text.trim() !== '';

  // 팔로우 유도가 ON이면 양쪽 메시지 모두 필요
  const hasValidFollowCheck = !automation.privateDm.followCheck.isActive ||
    (automation.privateDm.followCheck.isActive &&
      automation.privateDm.followCheck.nonFollowerMessage.trim() !== '' &&
      automation.privateDm.followCheck.followerMessage.trim() !== '');

  return hasValidPost && hasValidTrigger && hasValidPublicReply && hasDmText && hasValidFollowCheck;
}

// Mock Data
const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: 1,
    title: "새 팔로워 환영 인사",
    status: "running",
    trigger: {
      type: "any",
      postIds: [],
      matchType: "any",
      keywords: []
    },
    publicReply: {
      isActive: false,
      texts: [
        "팔로우 감사합니다! 특별한 혜택을 준비했어요.",
        "환영합니다! DM 확인해주세요 😊",
        "감사합니다! 특별 혜택 보내드렸어요 🎁"
      ]
    },
    privateDm: {
      text: "팔로우 감사합니다! 특별한 혜택을 준비했어요.",
      buttons: [
        {
          text: "혜택 받기",
          url: "https://example.com"
        }
      ],
      hasImage: false,
      followCheck: {
        isActive: false,
        nonFollowerMessage: "",
        followerMessage: ""
      }
    },
    thumbnail: "https://images.unsplash.com/photo-1760411537627-a850334d4cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMGFic3RyYWN0fGVufDF8fHx8MTc2NTg4NDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    executions: 1250,
    ctr: "12.5%",
    lastModified: "2024-03-15"
  },
  {
    id: 2,
    title: "여름 프로모션",
    status: "stopped",
    trigger: {
      type: "specific",
      postIds: ["https://images.unsplash.com/photo-1740126103551-512fd967e0b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzYWxlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjU4ODQ5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      matchType: "keywords",
      keywords: ["가격", "정보", "구매"]
    },
    publicReply: {
      isActive: false,
      texts: [
        "안녕하세요! 여름 프로모션에 관심 가져주셔서 감사합니다.",
        "현재 30% 할인 진행 중입니다! DM 확인해주세요.",
        "감사합니다! 할인 쿠폰 보내드렸어요 🎉"
      ]
    },
    privateDm: {
      text: "안녕하세요! 여름 프로모션에 관심 가져주셔서 감사합니다.\n현재 30% 할인 진행 중입니다!",
      buttons: [
        {
          text: "쿠폰 받기",
          url: "https://example.com/summer-sale"
        }
      ],
      hasImage: false,
      followCheck: {
        isActive: false,
        nonFollowerMessage: "",
        followerMessage: ""
      }
    },
    thumbnail: "https://images.unsplash.com/photo-1740126103551-512fd967e0b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzYWxlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjU4ODQ5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    executions: 850,
    ctr: "8.2%",
    lastModified: "2024-03-14"
  },
  {
    id: 3,
    title: "가격 문의 응답",
    status: "running",
    trigger: {
      type: "any",
      postIds: [],
      matchType: "keywords",
      keywords: ["얼마", "비용"]
    },
    publicReply: {
      isActive: false,
      texts: [
        "문의주신 가격 정보입니다. DM 확인해주세요.",
        "가격표를 DM으로 보내드렸어요 📋",
        "확인했습니다! DM을 확인해주세요 ✨"
      ]
    },
    privateDm: {
      text: "문의주신 가격 정보입니다.\n자세한 가격표는 아래 버튼을 눌러 확인해주세요.",
      buttons: [
        {
          text: "가격표 보기",
          url: "https://example.com/pricing"
        }
      ],
      hasImage: false,
      followCheck: {
        isActive: false,
        nonFollowerMessage: "",
        followerMessage: ""
      }
    },
    thumbnail: undefined,
    executions: 45,
    ctr: "25.0%",
    lastModified: "2024-03-13"
  },
  {
    id: 4,
    title: "스토리 멘션 감사",
    status: "running",
    trigger: {
      type: "any",
      postIds: [],
      matchType: "any",
      keywords: []
    },
    publicReply: {
      isActive: false,
      texts: [
        "스토리 언급 감사합니다! DM 확인해주세요 💕",
        "감사합니다! DM 보내드렸어요 😍",
        "언급 감사드려요! 선물 보내드렸습니다 🎁"
      ]
    },
    privateDm: {
      text: "스토리에 언급해주셔서 정말 감사합니다! 😍",
      buttons: [],
      hasImage: false,
      followCheck: {
        isActive: false,
        nonFollowerMessage: "",
        followerMessage: ""
      }
    },
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    executions: 320,
    ctr: "15.8%",
    lastModified: "2024-03-12"
  },
  {
    id: 5,
    title: "주말 이벤트",
    status: "draft",
    trigger: {
      type: "any",
      postIds: [],
      matchType: "any",
      keywords: []
    },
    publicReply: {
      isActive: false,
      texts: [
        "주말 이벤트 참여 완료! DM 확인해주세요 🎉",
        "참여해주셔서 감사합니다! DM 보내드렸어요 ✨",
        "이벤트 참여 감사드려요! DM을 확인해주세요 💌"
      ]
    },
    privateDm: {
      text: "주말 이벤트 참여 완료!\n감사합니다.",
      buttons: [],
      hasImage: false,
      followCheck: {
        isActive: false,
        nonFollowerMessage: "",
        followerMessage: ""
      }
    },
    thumbnail: undefined,
    executions: 0,
    ctr: "0%",
    lastModified: "2024-03-10"
  },
  {
    id: 6,
    title: "신규 이벤트 준비중",
    status: "draft",
    trigger: {
      type: "any",
      postIds: [],
      matchType: "any",
      keywords: []
    },
    publicReply: {
      isActive: false,
      texts: []
    },
    privateDm: {
      text: "",  // DM 본문 없음 - 필수값 미입력
      buttons: [],
      hasImage: false,
      followCheck: {
        isActive: false,
        nonFollowerMessage: "",
        followerMessage: ""
      }
    },
    thumbnail: undefined,
    executions: 0,
    ctr: "0%",
    lastModified: "2024-03-09"
  },
];

// Mock Template Data
const MOCK_TEMPLATES: DMTemplate[] = [
  {
    id: 1,
    automationGroupId: 1,
    dmGuide: '안녕하세요! [브랜드명]입니다.\n\n이번에 새롭게 출시된 [제품명]을 소개해 드리려고 해요.\n아래 링크에서 특별 할인가로 만나보세요!',
    ctaLinks: [
      { buttonName: '제품 보러가기', url: 'https://example.com/product' },
      { buttonName: '할인 쿠폰 받기', url: 'https://example.com/coupon' }
    ],
    status: 'deployed',
    lastModified: '2024-03-15',
    deployedAt: '2024-03-15'
  },
  {
    id: 2,
    automationGroupId: 2,
    dmGuide: '',
    ctaLinks: [],
    status: 'draft',
    lastModified: '2024-03-14'
  }
];

// Mock Campaign Proposals (from B2B brands) - 다양한 상태를 포함한 테스트 데이터
const MOCK_PROPOSALS: CampaignProposal[] = [
  // ✅ 해야 할 일 섹션 - sent (새로운 제안)
  {
    id: 1,
    brandName: '다이슨',
    brandLogo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop',
    automationName: '에어랩 출시 기념 자동 DM',
    campaignName: '2026 에어랩 런칭 캠페인',
    campaignId: 101,
    templateId: 101,
    triggerKeywords: ['에어랩', '참여', '이벤트'],
    publicReplyTexts: ['감사합니다! DM 확인해주세요 😊'],
    dmMessage: '안녕하세요! 다이슨 2026 에어랩 런칭 이벤트에 참여해주셔서 감사합니다. 🎁',
    ctaButtonText: '쿠폰 받기',
    ctaLink: 'https://dyson.co.kr/promo',
    isCtaLocked: true,
    status: 'sent',
    isUnread: true,
    createdAt: '2026-01-19T10:00:00+09:00',
    updatedAt: '2026-01-19T10:00:00+09:00',
    receivedAt: '2026-01-19'
  },
  // ✅ 해야 할 일 섹션 - accepted (설정 필요)
  {
    id: 2,
    brandName: '나이키',
    brandLogo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    automationName: '에어맥스 댓글 이벤트',
    campaignName: '에어맥스 2026 캠페인',
    campaignId: 102,
    templateId: 102,
    triggerKeywords: ['에어맥스', '참여'],
    publicReplyTexts: ['참여 감사합니다! 🎉'],
    dmMessage: '에어맥스 이벤트에 참여해주셔서 감사합니다!',
    ctaButtonText: '이벤트 참여',
    ctaLink: 'https://nike.com/event',
    isCtaLocked: true,
    status: 'accepted',
    isUnread: false,
    createdAt: '2026-01-17T14:00:00+09:00',
    updatedAt: '2026-01-18T09:00:00+09:00',
    receivedAt: '2026-01-17',
    acceptedAt: '2026-01-18'
  },
  // ✅ 해야 할 일 섹션 - error (연동 필요)
  {
    id: 3,
    brandName: '삼성',
    brandLogo: '',
    automationName: '갤럭시 자동 응답',
    campaignName: '갤럭시 S26 런칭',
    campaignId: 103,
    templateId: 103,
    triggerKeywords: ['갤럭시', '구매'],
    publicReplyTexts: ['문의 감사합니다!'],
    dmMessage: '갤럭시 S26에 관심 가져주셔서 감사합니다.',
    ctaButtonText: '사전예약',
    ctaLink: 'https://samsung.com/preorder',
    isCtaLocked: false,
    status: 'error',
    errorReason: 'account_disconnected',
    isUnread: true,
    createdAt: '2026-01-15T10:00:00+09:00',
    updatedAt: '2026-01-19T08:00:00+09:00',
    receivedAt: '2026-01-15',
    acceptedAt: '2026-01-15',
    activatedAt: '2026-01-16'
  },
  // 🟢 운영 중 섹션 - active
  {
    id: 4,
    brandName: '애플',
    brandLogo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=100&fit=crop',
    automationName: '아이폰 16 자동 DM',
    campaignName: '아이폰 16 출시 캠페인',
    campaignId: 104,
    templateId: 104,
    triggerKeywords: ['아이폰', '가격', '구매'],
    publicReplyTexts: ['DM으로 정보 보내드렸어요! 📱'],
    dmMessage: '아이폰 16에 관심 가져주셔서 감사합니다!',
    ctaButtonText: '구매하기',
    ctaLink: 'https://apple.com/iphone16',
    isCtaLocked: true,
    status: 'active',
    isUnread: false,
    createdAt: '2026-01-10T10:00:00+09:00',
    updatedAt: '2026-01-19T07:30:00+09:00',
    receivedAt: '2026-01-10',
    acceptedAt: '2026-01-10',
    activatedAt: '2026-01-11',
    performance: {
      sentCount: 1250,
      clickCount: 380,
      ctr: '30.4%'
    }
  },
  // 🟢 운영 중 섹션 - active (단독 협업)
  {
    id: 5,
    brandName: '스타벅스',
    brandLogo: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=100&h=100&fit=crop',
    automationName: '신메뉴 자동 응답',
    campaignName: '스타벅스 신메뉴 홍보',
    campaignId: null,  // 단독 협업
    templateId: 105,
    triggerKeywords: ['메뉴', '추천', '신메뉴'],
    publicReplyTexts: ['추천드려요! ☕'],
    dmMessage: '스타벅스 신메뉴를 추천드려요!',
    ctaButtonText: '메뉴 보기',
    ctaLink: 'https://starbucks.co.kr/menu',
    isCtaLocked: false,
    status: 'active',
    isUnread: false,
    createdAt: '2026-01-05T10:00:00+09:00',
    updatedAt: '2026-01-18T15:00:00+09:00',
    receivedAt: '2026-01-05',
    acceptedAt: '2026-01-05',
    activatedAt: '2026-01-06',
    performance: {
      sentCount: 850,
      clickCount: 195,
      ctr: '22.9%'
    }
  },
  // ⏸ 중단됨 섹션 - paused
  {
    id: 6,
    brandName: '아디다스',
    brandLogo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop',
    automationName: '스니커즈 이벤트',
    campaignName: '아디다스 스니커즈 캠페인',
    campaignId: 106,
    templateId: 106,
    triggerKeywords: ['스니커즈', '신발'],
    publicReplyTexts: ['이벤트 참여하세요!'],
    dmMessage: '아디다스 스니커즈 이벤트입니다.',
    ctaButtonText: '참여하기',
    ctaLink: 'https://adidas.co.kr/event',
    isCtaLocked: true,
    status: 'paused',
    isUnread: false,
    createdAt: '2026-01-01T10:00:00+09:00',
    updatedAt: '2026-01-15T12:00:00+09:00',
    receivedAt: '2026-01-01',
    acceptedAt: '2026-01-02',
    activatedAt: '2026-01-03',
    performance: {
      sentCount: 420,
      clickCount: 89,
      ctr: '21.2%'
    }
  },
  // 🗃 보관함 섹션 - rejected
  {
    id: 7,
    brandName: '테슬라',
    brandLogo: '',
    automationName: '모델3 자동 DM',
    campaignName: '테슬라 모델3 캠페인',
    campaignId: null,  // 단독 협업
    templateId: 107,
    triggerKeywords: ['테슬라', '모델3'],
    publicReplyTexts: ['관심 감사합니다!'],
    dmMessage: '테슬라 모델3 정보입니다.',
    ctaButtonText: '자세히 보기',
    ctaLink: 'https://tesla.com/model3',
    isCtaLocked: true,
    status: 'rejected',
    isUnread: false,
    createdAt: '2025-12-20T10:00:00+09:00',
    updatedAt: '2025-12-21T10:00:00+09:00',
    receivedAt: '2025-12-20'
  },
  // 🗃 보관함 섹션 - expired
  {
    id: 8,
    brandName: '구글',
    brandLogo: '',
    automationName: '픽셀 자동 응답',
    campaignName: '픽셀 8 캠페인',
    campaignId: 108,
    templateId: 108,
    triggerKeywords: ['픽셀', 'AI'],
    publicReplyTexts: ['AI 폰 최고!'],
    dmMessage: '픽셀 8 정보 보내드려요.',
    ctaButtonText: '구매하기',
    ctaLink: 'https://google.com/pixel',
    isCtaLocked: true,
    status: 'expired',
    isUnread: false,
    createdAt: '2025-11-01T10:00:00+09:00',
    updatedAt: '2025-12-01T10:00:00+09:00',
    receivedAt: '2025-11-01',
    acceptedAt: '2025-11-02'
  }
];

// Mock Instagram Posts for selection
const MOCK_INSTAGRAM_POSTS: InstagramPost[] = [
  { id: 'post1', thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop', mediaType: 'IMAGE', likeCount: 1250, commentCount: 45, postedAt: '2024-03-18' },
  { id: 'post2', thumbnailUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop', mediaType: 'IMAGE', likeCount: 980, commentCount: 32, postedAt: '2024-03-15' },
  { id: 'post3', thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop', mediaType: 'VIDEO', likeCount: 2100, commentCount: 88, postedAt: '2024-03-12' },
  { id: 'post4', thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop', mediaType: 'IMAGE', likeCount: 750, commentCount: 21, postedAt: '2024-03-10' },
  { id: 'post5', thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop', mediaType: 'CAROUSEL_ALBUM', likeCount: 1500, commentCount: 55, postedAt: '2024-03-08' },
  { id: 'post6', thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop', mediaType: 'IMAGE', likeCount: 620, commentCount: 18, postedAt: '2024-03-05' },
];

interface AppProps {
  onSwitchService?: (service: "studio" | "response") => void;
  connectedAccount: ConnectedAccount | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function App({ onSwitchService, connectedAccount, onConnect, onDisconnect }: AppProps) {
  const [currentView, setCurrentView] = useState('home');
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | undefined>(undefined);
  const [automations, setAutomations] = useState<Automation[]>(MOCK_AUTOMATIONS);
  const [nextId, setNextId] = useState(7);

  // Template Management State
  const [templates, setTemplates] = useState<DMTemplate[]>(MOCK_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<DMTemplate | undefined>(undefined);
  const [selectedAutomationGroup, setSelectedAutomationGroup] = useState<{ id: number; name: string } | undefined>(undefined);
  const [nextTemplateId, setNextTemplateId] = useState(3);

  // Campaign Proposal State
  const [proposals, setProposals] = useState<CampaignProposal[]>(MOCK_PROPOSALS);
  const [selectedProposal, setSelectedProposal] = useState<CampaignProposal | undefined>(undefined);

  // Campaign State
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>(undefined);

  const handleConnect = () => {
    onConnect();
  };

  const handleLogout = () => {
    onDisconnect();
    setCurrentView('dashboard');
  };

  const handleSaveAutomation = (automation: Automation) => {
    if (automation.id) {
      // 기존 자동화 수정
      setAutomations(prev =>
        prev.map(a => a.id === automation.id ? automation : a)
      );
    } else {
      // 새 자동화 생성 (이 경로는 실제로 handleCreateNew에서 처리됨)
      const newAutomation = {
        ...automation,
        id: nextId,
        lastModified: getCurrentDateString()
      };
      setAutomations(prev => [newAutomation, ...prev]);
      setNextId(prev => prev + 1);
    }
    console.log("Saved:", automation);
    setCurrentView('dashboard');
    setSelectedAutomation(undefined);
  };

  const handleAutomationClick = (id: number) => {
    const automation = automations.find(a => a.id === id);
    if (automation) {
      setSelectedAutomation(automation);
      setCurrentView('create-automation');
    }
  };

  const handleCreateNew = () => {
    // 생성하기 버튼 클릭 시 즉시 새 초안 생성
    const newAutomation: Automation = {
      id: nextId,
      title: `자동 DM_${getCurrentDateString()}`,
      status: 'draft',
      trigger: {
        type: 'any',
        postIds: [],
        matchType: 'keywords',
        keywords: []
      },
      publicReply: {
        isActive: false,
        texts: []
      },
      privateDm: {
        text: '',
        buttons: [
          {
            text: '자세히 보기',
            url: ''
          }
        ],
        hasImage: false,
        followCheck: {
          isActive: false,
          nonFollowerMessage: '팔로우하고 혜택을 받아보세요!',
          followerMessage: '팔로우 감사합니다! 특별한 혜택을 드립니다.'
        }
      },
      executions: 0,
      ctr: '0%',
      lastModified: getCurrentDateString()
    };

    setAutomations(prev => [newAutomation, ...prev]);
    setNextId(prev => prev + 1);
    setSelectedAutomation(newAutomation);
    setCurrentView('create-automation');
  };

  const handleToggleStatus = (id: number) => {
    setAutomations(prevAutomations =>
      prevAutomations.map(automation => {
        if (automation.id === id) {
          // 상태 전환 로직
          if (automation.status === 'draft') {
            // 초안 상태에서는 토글로 활성화 불가 (상세 페이지에서 "실행하기" 버튼으로만 활성화 가능)
            return automation;
          } else if (automation.status === 'running') {
            // 실행 중 → 중단됨
            return { ...automation, status: 'stopped' as const };
          } else if (automation.status === 'stopped') {
            // 중단됨 → 실행 중
            return { ...automation, status: 'running' as const };
          }
        }
        return automation;
      })
    );
  };

  // Template Management Handlers
  const handleOpenTemplateManagement = (automationId: number) => {
    const automation = automations.find(a => a.id === automationId);
    if (automation) {
      const existingTemplate = templates.find(t => t.automationGroupId === automationId);
      setSelectedTemplate(existingTemplate);
      setSelectedAutomationGroup({ id: automationId, name: automation.title });
      setCurrentView('template-management');
    }
  };

  const handleSaveTemplate = (template: DMTemplate) => {
    if (template.id) {
      // Update existing template
      setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
    } else {
      // Create new template
      const newTemplate = { ...template, id: nextTemplateId };
      setTemplates(prev => [...prev, newTemplate]);
      setNextTemplateId(prev => prev + 1);
      setSelectedTemplate(newTemplate);
    }
    console.log("Template saved:", template);
  };

  const handleDeployTemplate = (template: DMTemplate) => {
    handleSaveTemplate(template);
    console.log("Template deployed:", template);
  };

  // Campaign Proposal Handlers
  const handleProposalClick = (id: number) => {
    const proposal = proposals.find(p => p.id === id);
    if (proposal) {
      setSelectedProposal(proposal);
      setCurrentView('proposal-detail');
    }
  };

  const handleActivateProposal = (proposalId: number, postId: string, editedData: Partial<CampaignProposal>) => {
    const activatedProposal = proposals.find(p => p.id === proposalId);
    if (activatedProposal) {
      const updatedProposal = {
        ...activatedProposal,
        ...editedData,
        status: 'active' as const,
        selectedPostId: postId,
        activatedAt: getCurrentDateString(),
        // Initialize performance data
        performance: {
          sentCount: 0,
          clickCount: 0,
          ctr: '0%'
        }
      };
      setProposals(prev => prev.map(p => p.id === proposalId ? updatedProposal : p));
      setSelectedProposal(undefined);
      setCurrentView('dashboard');  // Navigate back to dashboard
      console.log('Proposal activated:', proposalId, postId, editedData);
    }
  };

  // Accept proposal - moves to 'accepted' state (can edit and then activate)
  const handleAcceptProposal = (proposalId: number) => {
    const updatedProposal = proposals.find(p => p.id === proposalId);
    if (updatedProposal) {
      const acceptedProposal = {
        ...updatedProposal,
        status: 'accepted' as const,
        acceptedAt: getCurrentDateString()
      };
      setProposals(prev => prev.map(p => p.id === proposalId ? acceptedProposal : p));
      setSelectedProposal(acceptedProposal);  // Update selected proposal so view changes
    }
  };

  // Reject proposal - moves to 'rejected' state (archived)
  const handleRejectProposal = (proposalId: number) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          status: 'rejected' as const,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    setCurrentView('dashboard');
    setSelectedProposal(undefined);
  };

  // Quick pause - moves active proposal to 'paused' state
  const handleQuickPause = (proposalId: number) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId && p.status === 'active') {
        return {
          ...p,
          status: 'paused' as const,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  // Quick resume - moves paused proposal back to 'active' state
  const handleQuickResume = (proposalId: number) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId && p.status === 'paused') {
        return {
          ...p,
          status: 'active' as const,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  // Check if there are new (unread) proposals for GNB notification
  const hasPendingProposal = proposals.some(p => p.status === 'sent' && p.isUnread);

  const renderContent = () => {
    if (!connectedAccount) {
      return <ConnectAccount onConnect={handleConnect} />;
    }

    return (
      <Layout
        currentView={currentView}
        onChangeView={setCurrentView}
        onLogout={handleLogout}
        hasPendingProposal={hasPendingProposal}
      >
        {(currentView === 'home' || currentView === 'dashboard') && (
          <Dashboard
            onNavigate={(view: string) => {
              if (view === 'create-automation') {
                handleCreateNew();
              } else {
                setCurrentView(view);
              }
            }}
            onAutomationClick={handleAutomationClick}
            recentAutomations={automations.filter(a => !a.campaignId).slice(0, 5)}
            onToggleStatus={handleToggleStatus}
            onMenuAction={(id: number, action: 'edit' | 'delete' | 'template') => {
              if (action === 'template') {
                handleOpenTemplateManagement(id);
              } else if (action === 'edit') {
                handleAutomationClick(id);
              } else if (action === 'delete') {
                console.log('Delete automation:', id);
              }
            }}
            proposals={proposals.filter(p => p.status === 'sent' && p.isUnread)}
            onProposalClick={handleProposalClick}
          />
        )}
        {currentView === 'my-automations' && (
          <MyAutomationsPage
            automations={automations}
            onCreateNew={handleCreateNew}
            onAutomationClick={handleAutomationClick}
            onToggleStatus={handleToggleStatus}
            onMenuAction={(id: number, action: 'edit' | 'delete' | 'template') => {
              if (action === 'template') {
                handleOpenTemplateManagement(id);
              } else if (action === 'edit') {
                handleAutomationClick(id);
              }
            }}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'campaigns' && (
          <CampaignsPage
            proposals={proposals}
            onProposalClick={handleProposalClick}
            onQuickPause={handleQuickPause}
            onQuickResume={handleQuickResume}
          />
        )}
        {currentView === 'campaign-detail' && selectedCampaign && (
          <CampaignDetail
            campaign={selectedCampaign}
            influencers={[]} // Mock influencers
            contents={[]}    // Mock contents
            connectedAutomations={[
              {
                id: 1,
                name: "새 팔로워 환영 인사",
                status: "running",
                triggerType: "comment_keyword",
                triggerKeywords: ["가격", "정보"],
                influencerCount: 15,
                setupDoneCount: 12,
                lastModified: "2024-03-20",
                stats: {
                  participation: 15,
                  sent: 1250,
                  click: 450,
                  ctr: 36.0
                }
              },
              {
                id: 2,
                name: "여름 프로모션",
                status: "stopped",
                triggerType: "dm_keyword",
                triggerKeywords: ["이벤트"],
                influencerCount: 8,
                setupDoneCount: 8,
                lastModified: "2024-03-18",
                stats: {
                  participation: 8,
                  sent: 850,
                  click: 120,
                  ctr: 14.1
                }
              }
            ] as any} // Cast to any to bypass strict type checking for mock data interface mismatch if any
            onBack={() => {
              setCurrentView('campaigns');
              setSelectedCampaign(undefined);
            }}
            onEdit={() => console.log("Edit campaign")}
            onAddReactionAutomation={() => console.log("Add reaction automation")}
          />
        )}
        {currentView === 'create-automation' && (
          <AutomationDetail
            initialData={selectedAutomation}
            onBack={() => {
              setCurrentView('my-automations');
              setSelectedAutomation(undefined);
            }}
            onSave={handleSaveAutomation}
            usedPostIds={
              // 현재 편집 중인 자동화를 제외한 다른 자동화들에서 사용 중인 게시물 ID 목록
              automations
                .filter(a => a.id !== selectedAutomation?.id)
                .flatMap(a => a.trigger.postIds)
            }
          />
        )}
        {currentView === 'logs' && (
          <LogsPage />
        )}
        {currentView === 'account-settings' && (
          <AccountSettings onLogout={handleLogout} />
        )}
        {currentView === 'template-management' && selectedAutomationGroup && (
          <TemplateManagement
            initialData={selectedTemplate}
            automationGroupId={selectedAutomationGroup.id}
            automationGroupName={selectedAutomationGroup.name}
            onBack={() => {
              setCurrentView('dashboard');
              setSelectedTemplate(undefined);
              setSelectedAutomationGroup(undefined);
            }}
            onSave={handleSaveTemplate}
            onDeploy={handleDeployTemplate}
          />
        )}
        {currentView === 'proposal-detail' && selectedProposal && (
          <ProposalDetail
            proposal={selectedProposal}
            posts={MOCK_INSTAGRAM_POSTS}
            onBack={() => {
              setCurrentView('dashboard');
              setSelectedProposal(undefined);
            }}
            onActivate={handleActivateProposal}
            onAccept={handleAcceptProposal}
            onReject={handleRejectProposal}
          />
        )}
      </Layout>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="flex-1 w-full overflow-hidden relative">
        {renderContent()}
      </div>
      {onSwitchService && (
        <ServiceSwitcherBar
          currentService="studio"
          onSwitchService={onSwitchService}
        />
      )}
    </div>
  );
}