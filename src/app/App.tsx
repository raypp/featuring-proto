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

// Mock Campaign Proposals (from B2B brands)
const MOCK_PROPOSALS: CampaignProposal[] = [
  {
    id: 1,
    brandName: '다이슨 코리아',
    brandLogo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop',
    campaignName: '에어랩 멀티 스타일러 프로모션',
    templateId: 101,
    triggerKeywords: ['이벤트', '참여', '링크'],
    publicReplyTexts: ['감사합니다! DM 확인해주세요 😊'],
    dmMessage: '안녕하세요! 다이슨 코리아입니다.\n\n이번에 새롭게 출시된 에어랩 멀티 스타일러를 소개해 드려고 해요!\n\n아래 링크에서 특별 할인가로 만나보세요 ✨',
    ctaButtonText: '특별 할인 받기',
    ctaLink: 'https://featuring.link/dyson-campaign-2024',
    status: 'pending',
    receivedAt: '2024-03-20'
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

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
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
    setIsConnected(true);
  };

  const handleLogout = () => {
    setIsConnected(false);
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
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          ...editedData,
          status: 'active' as const,
          selectedPostId: postId,
          activatedAt: getCurrentDateString()
        };
      }
      return p;
    }));
    console.log('Proposal activated:', proposalId, postId, editedData);
  };

  if (!isConnected) {
    return <ConnectAccount onConnect={handleConnect} />;
  }

  return (
    <Layout
      currentView={currentView}
      onChangeView={setCurrentView}
      onLogout={handleLogout}
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
          proposals={proposals.filter(p => p.status === 'pending')}
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
          campaigns={campaigns}
          proposals={proposals}
          onCampaignClick={(id: number) => {
            const campaign = campaigns.find(c => c.id === id);
            if (campaign) {
              setSelectedCampaign(campaign);
              setCurrentView('campaign-detail');
            }
          }}
          onProposalClick={handleProposalClick}
        />
      )}
      {currentView === 'campaign-detail' && selectedCampaign && (
        <CampaignDetail
          campaign={selectedCampaign}
          onBack={() => {
            setCurrentView('campaigns');
            setSelectedCampaign(undefined);
          }}
          onSetupAutomation={(campaignId: number) => {
            const proposal = proposals.find(p => p.id === campaignId);
            if (proposal) {
              setSelectedProposal(proposal);
              setCurrentView('proposal-detail');
            }
          }}
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
            setCurrentView('campaigns');
            setSelectedProposal(undefined);
          }}
          onActivate={handleActivateProposal}
        />
      )}
    </Layout>
  );
}