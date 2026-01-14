import { useState } from "react";
import { Layout } from "./components/Layout";
import { ServiceSwitcherBar } from "../design-system";
import { ConnectedAccount } from "../shared";
import { Dashboard } from "./pages/Dashboard";
import { AutomationGroupList } from "./pages/AutomationGroupList";
import { AutomationGroupDetail } from "./pages/AutomationGroupDetail";
import { TemplateManagement } from "./pages/TemplateManagement";
import { CampaignManagement } from "./pages/CampaignManagement";
import { CampaignDetail } from "./pages/CampaignDetail";
import { AutomationGroup, DMTemplate, Campaign, CampaignInfluencer, CampaignContent, AutomationInfluencer } from "./types";

// Mock Data
const MOCK_AUTOMATION_GROUPS: AutomationGroup[] = [
    {
        id: 1,
        name: "다이슨 에어랩 캠페인",
        description: "2026 다이슨 에어랩 멀티 스타일러 반응 자동화",
        status: "active",
        influencerCount: 12,
        templateStatus: "deployed",
        lastModified: "2026-01-14",
        createdAt: "2026-01-10",
        linkedCampaignId: 1  // Links to MOCK_CAMPAIGNS[0]
    },
    {
        id: 2,
        name: "신규 브랜드 런칭",
        description: "브랜드 인지도 향상 캠페인",
        status: "active",
        influencerCount: 8,
        templateStatus: "saved",
        lastModified: "2024-03-14",
        createdAt: "2024-02-15"
    },
    {
        id: 3,
        name: "할인 이벤트 프로모션",
        description: "주간 할인 이벤트 홍보",
        status: "inactive",
        influencerCount: 5,
        templateStatus: "draft",
        lastModified: "2024-03-10",
        createdAt: "2024-03-01"
    },
    {
        id: 4,
        name: "VIP 고객 전용",
        description: "VIP 고객 대상 프리미엄 혜택 안내",
        status: "active",
        influencerCount: 3,
        templateStatus: "none",
        lastModified: "2024-03-08",
        createdAt: "2024-03-05"
    }
];

const MOCK_TEMPLATES: DMTemplate[] = [
    {
        id: 1,
        automationGroupId: 1,
        dmGuide: '안녕하세요! [브랜드명]입니다.\n\n이번에 새롭게 출시된 여름 신제품을 소개해 드리려고 해요.\n무더운 여름을 시원하게 보낼 수 있는 특별한 제품들이 준비되어 있어요.\n\n아래 링크에서 특별 할인가로 만나보세요!',
        ctaLinks: [
            { buttonName: '제품 보러가기', url: 'https://example.com/summer' },
            { buttonName: '할인 쿠폰 받기', url: 'https://example.com/coupon' }
        ],
        status: 'deployed',
        lastModified: '2024-03-15',
        deployedAt: '2024-03-15'
    },
    {
        id: 2,
        automationGroupId: 2,
        dmGuide: '새로운 브랜드를 소개합니다!\n\n혁신적인 제품으로 여러분의 일상을 바꿔드릴게요.',
        ctaLinks: [
            { buttonName: '브랜드 스토리', url: 'https://example.com/brand' }
        ],
        status: 'saved',
        lastModified: '2024-03-14'
    },
    {
        id: 3,
        automationGroupId: 3,
        dmGuide: '',
        ctaLinks: [],
        status: 'draft',
        lastModified: '2024-03-10'
    }
];

const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: 1,
        name: "26.03 다이슨 에어랩 멀티 스타일러 캠페인",
        description: "새학기 헤어 스타일링 꿀팁 및 풍은 달콤 웨이브 가이드",
        status: "pending",
        tags: ["Sponsored Content", "Ambassadors"],
        startDate: "26.02.01",
        endDate: "26.03.01",
        campaignType: "어필리에이트",
        brandName: "dyson",
        contentCount: 100,
        secondaryUsageCount: 6,
        budget: 15000000,
        platform: "tiktok",
        createdAt: "2024-02-01",
        lastModified: "2024-03-15",
        reactionAutomationGroupId: 1  // Links to MOCK_AUTOMATION_GROUPS[0]
    },
    {
        id: 2,
        name: "26.01 미녀스다플랜터 캠페인",
        description: "미녀스다플랜터 신규 제품 홍보를 위한 인플루언서 캠페인",
        status: "running",
        tags: ["Engagement", "Reach", "UGC"],
        startDate: "25.12.25",
        endDate: "26.01.26",
        campaignType: "뮤가 시딩",
        brandName: "미녀스",
        contentCount: 100,
        secondaryUsageCount: 3,
        budget: 8500000,
        platform: "instagram",
        createdAt: "2024-01-15",
        lastModified: "2024-03-14"
    },
    {
        id: 3,
        name: "25.10 페페바이옴 인터에이징 세럼 캠페인",
        status: "drafting",
        tags: [],
        startDate: "",
        endDate: "",
        campaignType: "어필리에이트",
        brandName: "",
        contentCount: 0,
        secondaryUsageCount: 0,
        createdAt: "2024-03-01",
        lastModified: "2024-03-10"
    },
    {
        id: 4,
        name: "25.10 상수 팝업 방문 캠페인",
        description: "10월 연말 상수동 오프라인 팝업 행사 방문명",
        status: "completed",
        tags: ["KOLs", "Ambassadors", "UGC"],
        startDate: "25.12.01",
        endDate: "26.01.01",
        campaignType: "오프라인/팝업",
        brandName: "FIG",
        contentCount: 100,
        secondaryUsageCount: 3,
        budget: 12000000,
        platform: "instagram",
        createdAt: "2024-01-01",
        lastModified: "2024-02-15"
    },
    {
        id: 5,
        name: "25.09 겨울 패딩 스타일링",
        description: "Y2K 무드 숏패딩 코디 제안, 데일리룩 OOTD 인증 캠페인",
        status: "completed",
        tags: ["KOLs", "Ambassadors", "UGC"],
        startDate: "25.12.01",
        endDate: "26.01.01",
        campaignType: "노스폰서쉽",
        brandName: "노스페이스",
        contentCount: 100,
        secondaryUsageCount: 3,
        budget: 7300000,
        platform: "instagram",
        createdAt: "2024-01-01",
        lastModified: "2024-02-15"
    }
];

const MOCK_CAMPAIGN_INFLUENCERS: CampaignInfluencer[] = [
    {
        id: 1,
        username: "beauty_dahyun",
        displayName: "뷰티 다현",
        profileImage: "",
        category: "뷰티",
        task: "피드+스토리/릴스",
        aiReachPrediction: 85000,
        hasCustomRequirements: false,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 125000,
        contentReachCount: 92000,
        totalContentCost: 1200000,
        contentReceivedDate: "25.01.4",
        cpvPerformance: "65.3%",
        guideDelivered: true,
        contentUrl: "https://www.instagram.com/p/abc123"
    },
    {
        id: 2,
        username: "lifestyle_mina",
        displayName: "라이프 미나",
        profileImage: "",
        category: "라이프",
        task: "피드+스토리/릴스",
        aiReachPrediction: 62000,
        hasCustomRequirements: true,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 89000,
        contentReachCount: 71000,
        totalContentCost: 950000,
        contentReceivedDate: "25.01.5",
        cpvPerformance: "58.2%",
        guideDelivered: true
    },
    {
        id: 3,
        username: "fashion_jisoo",
        displayName: "패션 지수",
        profileImage: "",
        category: "패션",
        task: "피드+스토리/릴스",
        hasCustomRequirements: false,
        contentUsageApproved: false,
        contractSent: false,
        followerCount: 156000,
        guideDelivered: false
    },
    {
        id: 4,
        username: "travel_yuna",
        displayName: "트래블 유나",
        profileImage: "",
        category: "여행",
        task: "피드+스토리/릴스",
        aiReachPrediction: 45000,
        hasCustomRequirements: false,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 78000,
        contentReachCount: 52000,
        totalContentCost: 800000,
        contentReceivedDate: "25.01.6",
        cpvPerformance: "52.1%",
        guideDelivered: true
    },
    {
        id: 5,
        username: "food_soyeon",
        displayName: "푸드 소연",
        profileImage: "",
        category: "푸드",
        task: "피드+스토리/릴스",
        aiReachPrediction: 38000,
        hasCustomRequirements: true,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 67000,
        contentReachCount: 41000,
        totalContentCost: 720000,
        contentReceivedDate: "25.01.7",
        cpvPerformance: "48.5%",
        guideDelivered: true
    },
    {
        id: 6,
        username: "fitness_hyerin",
        displayName: "피트니스 혜린",
        profileImage: "",
        category: "헬스",
        task: "피드+스토리/릴스",
        hasCustomRequirements: false,
        contentUsageApproved: false,
        contractSent: true,
        followerCount: 92000,
        guideDelivered: false
    },
    {
        id: 7,
        username: "tech_junhee",
        displayName: "테크 준희",
        profileImage: "",
        category: "테크",
        task: "피드+스토리/릴스",
        aiReachPrediction: 55000,
        hasCustomRequirements: false,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 103000,
        contentReachCount: 68000,
        totalContentCost: 1100000,
        contentReceivedDate: "25.01.8",
        cpvPerformance: "61.2%",
        guideDelivered: true
    },
    {
        id: 8,
        username: "mom_soojin",
        displayName: "육아맘 수진",
        profileImage: "",
        category: "육아",
        task: "피드+스토리/릴스",
        aiReachPrediction: 42000,
        hasCustomRequirements: true,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 71000,
        contentReachCount: 48000,
        totalContentCost: 680000,
        contentReceivedDate: "25.01.9",
        cpvPerformance: "55.8%",
        guideDelivered: true
    },
    // sojumanjan - Dyson campaign influencer with synced performance data
    {
        id: 9,
        username: "sojumanjan",
        displayName: "소주만잔",
        profileImage: "",
        category: "뷰티",
        task: "피드+스토리/릴스",
        aiReachPrediction: 50000,
        hasCustomRequirements: false,
        contentUsageApproved: true,
        contractSent: true,
        followerCount: 50000,
        contentReachCount: 45000,
        totalContentCost: 800000,
        contentReceivedDate: "26.01.14",
        cpvPerformance: "30.0%",
        guideDelivered: true,
        contentUrl: "https://www.instagram.com/p/airwrap2026"
    }
];

const MOCK_CAMPAIGN_CONTENTS: CampaignContent[] = [
    {
        id: 1,
        contentUrl: "https://instagram.com/p/abc123",
        influencerUsername: "beauty_dahyun",
        influencerDisplayName: "뷰티 다현",
        contentType: "피드",
        postedDate: "25.01.04",
        likes: 8520,
        comments: 234,
        saves: 890,
        reach: 45000,
        insightDataReceived: true,
        contentCost: 1200000,
        cpv: "26.7원",
        secondaryUsage: true,
        approvalStatus: "approved"
    },
    {
        id: 2,
        contentUrl: "https://instagram.com/p/def456",
        influencerUsername: "lifestyle_mina",
        influencerDisplayName: "라이프 미나",
        contentType: "릴스",
        postedDate: "25.01.05",
        likes: 12300,
        comments: 456,
        saves: 1200,
        reach: 78000,
        insightDataReceived: true,
        contentCost: 950000,
        cpv: "12.2원",
        secondaryUsage: true,
        approvalStatus: "approved"
    },
    {
        id: 3,
        contentUrl: "https://instagram.com/p/ghi789",
        influencerUsername: "fashion_jisoo",
        influencerDisplayName: "패션 지수",
        contentType: "스토리",
        postedDate: "25.01.06",
        likes: 0,
        comments: 0,
        saves: 0,
        reach: 32000,
        insightDataReceived: false,
        contentCost: 800000,
        cpv: "-",
        secondaryUsage: false,
        approvalStatus: "pending"
    },
    {
        id: 4,
        contentUrl: "https://instagram.com/p/jkl012",
        influencerUsername: "travel_yuna",
        influencerDisplayName: "트래블 유나",
        contentType: "피드",
        postedDate: "25.01.06",
        likes: 6200,
        comments: 178,
        saves: 520,
        reach: 38000,
        insightDataReceived: true,
        contentCost: 800000,
        cpv: "21.1원",
        secondaryUsage: true,
        approvalStatus: "approved"
    },
    {
        id: 5,
        contentUrl: "https://instagram.com/p/mno345",
        influencerUsername: "food_soyeon",
        influencerDisplayName: "푸드 소연",
        contentType: "릴스",
        postedDate: "25.01.07",
        likes: 9800,
        comments: 312,
        saves: 780,
        reach: 52000,
        insightDataReceived: true,
        contentCost: 720000,
        cpv: "13.8원",
        secondaryUsage: false,
        approvalStatus: "approved"
    }
];

interface FeaturingAppProps {
    onBackToServiceSelector?: () => void;
    onSwitchService?: (service: "studio" | "response") => void;
    connectedAccount: ConnectedAccount | null;
}

export default function FeaturingApp({ onBackToServiceSelector, onSwitchService, connectedAccount }: FeaturingAppProps) {
    const [currentView, setCurrentView] = useState('dashboard');
    const [automationGroups, setAutomationGroups] = useState<AutomationGroup[]>(MOCK_AUTOMATION_GROUPS);
    const [templates, setTemplates] = useState<DMTemplate[]>(MOCK_TEMPLATES);
    const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
    const [campaignInfluencers] = useState<CampaignInfluencer[]>(MOCK_CAMPAIGN_INFLUENCERS);
    const [campaignContents] = useState<CampaignContent[]>(MOCK_CAMPAIGN_CONTENTS);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const [nextTemplateId, setNextTemplateId] = useState(4);
    const [reactionAutomationContext, setReactionAutomationContext] = useState<{ context: 'global' | 'campaign'; campaignId?: number; campaignName?: string } | null>(null);
    const [reactionAutomationMode, setReactionAutomationMode] = useState<'view' | 'edit'>('view');

    // Mock automation influencers - derives from campaign influencers if linked
    const getAutomationInfluencers = (): AutomationInfluencer[] => {
        // If we are in a campaign context (viewing campaign detail or automation from campaign)
        if (selectedCampaignId) {
            return campaignInfluencers.map(inf => ({
                id: inf.id,
                influencerId: inf.id,
                username: inf.username,
                displayName: inf.displayName,
                profileImage: inf.profileImage || '',
                status: 'delivered' as const, // Default status for campaign view
                sentCount: 0,
                clickCount: 0,
                cpv: 0,
                cpe: 0,
                isConnected: true
            }));
        }

        // If we are in an automation group context
        if (selectedGroupId) {
            const group = automationGroups.find(g => g.id === selectedGroupId);
            // If the group is linked to a campaign (e.g., Dyson campaign)
            if (group?.linkedCampaignId) {
                // In a real app, we would filter by campaign ID. Here we use the shared mock data.
                // Assuming MOCK_CAMPAIGN_INFLUENCERS belongs to the linked campaign.
                return campaignInfluencers.map(inf => ({
                    id: inf.id,
                    influencerId: inf.id,
                    username: inf.username,
                    displayName: inf.displayName,
                    profileImage: inf.profileImage || '',
                    status: 'clicked' as const, // Mock status for automation view
                    sentCount: Math.floor(Math.random() * 100),
                    clickCount: Math.floor(Math.random() * 50),
                    cpv: Math.floor(Math.random() * 50),
                    cpe: Math.floor(Math.random() * 200),
                    isConnected: true
                }));
            }
        }

        // Fallback or unlinked groups
        return [
            { id: 1, influencerId: 1, username: 'beauty_dahyun', displayName: '뷰티 다현', status: 'clicked' as const, sentCount: 120, clickCount: 45, cpv: 28, cpe: 150, isConnected: true },
            { id: 2, influencerId: 2, username: 'lifestyle_mina', displayName: '라이프 미나', status: 'read' as const, sentCount: 85, clickCount: 22, cpv: 35, cpe: 180, isConnected: false },
            { id: 3, influencerId: 3, username: 'fashion_jisoo', displayName: '패션 지수', status: 'sent' as const, sentCount: 50, clickCount: 8, cpv: 45, cpe: 220, isConnected: true },
        ];
    };

    const mockAutomationInfluencers = getAutomationInfluencers();

    // Extract group ID from view string like "automation-group-detail-1"
    const getGroupIdFromView = (view: string): number | null => {
        const match = view.match(/automation-group-detail-(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    };

    // Extract campaign ID from view string like "campaign-detail-1"
    const getCampaignIdFromView = (view: string): number | null => {
        const match = view.match(/campaign-detail-(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    };

    // Handle navigation
    const handleNavigate = (view: string) => {
        const groupId = getGroupIdFromView(view);
        const campaignId = getCampaignIdFromView(view);

        if (groupId) {
            setSelectedGroupId(groupId);
            setSelectedCampaignId(null);
            setReactionAutomationMode('view'); // Reset to view mode
            setCurrentView('automation-group-detail');
        } else if (campaignId) {
            setSelectedCampaignId(campaignId);
            setSelectedGroupId(null);
            setCurrentView('campaign-detail');
        } else {
            setSelectedGroupId(null);
            setSelectedCampaignId(null);
            setCurrentView(view);
        }
    };

    // Handle create new group
    const handleCreateGroup = () => {
        // TODO: Open create group modal
        console.log('Create new group');
    };

    // Handle open template management
    const handleOpenTemplateManagement = () => {
        setCurrentView('template-management');
    };

    // Handle save template
    const handleSaveTemplate = (template: DMTemplate) => {
        if (template.id) {
            setTemplates((prev: DMTemplate[]) => prev.map((t: DMTemplate) => t.id === template.id ? template : t));
        } else {
            const newTemplate = { ...template, id: nextTemplateId };
            setTemplates((prev: DMTemplate[]) => [...prev, newTemplate]);
            setNextTemplateId((prev: number) => prev + 1);
        }

        // Update group template status
        setAutomationGroups((prev: AutomationGroup[]) => prev.map((g: AutomationGroup) =>
            g.id === template.automationGroupId
                ? { ...g, templateStatus: template.status as AutomationGroup['templateStatus'], lastModified: template.lastModified || g.lastModified }
                : g
        ));

        console.log("Template saved:", template);
    };

    // Handle deploy template
    const handleDeployTemplate = (template: DMTemplate) => {
        handleSaveTemplate(template);
        console.log("Template deployed:", template);
    };

    // Get selected group and template
    const selectedGroup = selectedGroupId
        ? automationGroups.find((g: AutomationGroup) => g.id === selectedGroupId)
        : null;
    const selectedTemplate = selectedGroupId
        ? templates.find((t: DMTemplate) => t.automationGroupId === selectedGroupId)
        : undefined;

    // Render content based on current view
    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <Dashboard
                        automationGroups={automationGroups}
                        onNavigate={handleNavigate}
                        connectedAccount={connectedAccount}
                    />
                );

            case 'automation-groups':
                return (
                    <AutomationGroupList
                        automationGroups={automationGroups}
                        onNavigate={handleNavigate}
                        onCreateGroup={handleCreateGroup}
                    />
                );

            case 'campaign':
                return (
                    <CampaignManagement
                        campaigns={campaigns}
                        onNavigate={handleNavigate}
                        onCreateCampaign={() => console.log('Create campaign')}
                    />
                );

            case 'campaign-detail':
                const selectedCampaign = selectedCampaignId
                    ? campaigns.find((c: Campaign) => c.id === selectedCampaignId)
                    : null;
                if (!selectedCampaign) {
                    return (
                        <div className="p-8 text-center">
                            <p className="text-[#707070]">캠페인을 찾을 수 없습니다</p>
                        </div>
                    );
                }
                return (
                    <CampaignDetail
                        campaign={selectedCampaign}
                        influencers={campaignInfluencers}
                        contents={campaignContents}
                        reactionAutomation={
                            selectedCampaign.reactionAutomationGroupId
                                ? (() => {
                                    const group = automationGroups.find(g => g.id === selectedCampaign.reactionAutomationGroupId);
                                    const template = templates.find(t => t.automationGroupId === selectedCampaign.reactionAutomationGroupId);
                                    if (group && template) {
                                        return {
                                            id: group.id,
                                            name: group.name,
                                            status: group.status === 'active' ? 'running' as const : 'draft' as const,
                                            triggerType: 'comment_keyword' as const,
                                            triggerKeywords: template.triggerKeywords || ['가격', '구매', '링크'],
                                            message: template.dmGuide || '',
                                            linkUrl: template.ctaLinks?.[0]?.url || '',
                                            createdAt: group.createdAt,
                                            lastModified: group.lastModified
                                        };
                                    }
                                    return undefined;
                                })()
                                : undefined
                        }
                        automationInfluencers={campaignInfluencers.map(inf => ({
                            id: inf.id,
                            influencerId: inf.id,
                            username: inf.username,
                            displayName: inf.displayName,
                            profileImage: inf.profileImage || '',
                            status: 'delivered' as const,
                            sentCount: 0,
                            clickCount: 0,
                            isConnected: true
                        }))}
                        onBack={() => handleNavigate('campaign')}
                        onEdit={() => console.log('Edit campaign')}
                        onAddReactionAutomation={() => {
                            setReactionAutomationContext({
                                context: 'campaign',
                                campaignId: selectedCampaign.id,
                                campaignName: selectedCampaign.name
                            });
                            setCurrentView('reaction-automation');
                        }}
                        onEditReactionAutomation={() => {
                            setReactionAutomationContext({
                                context: 'campaign',
                                campaignId: selectedCampaign.id,
                                campaignName: selectedCampaign.name
                            });
                            setCurrentView('reaction-automation');
                        }}
                    />
                );

            case 'automation-group-detail':
                if (!selectedGroup) {
                    return (
                        <div className="p-8 text-center">
                            <p className="text-[#707070]">그룹을 찾을 수 없습니다</p>
                        </div>
                    );
                }
                return (
                    <AutomationGroupDetail
                        group={selectedGroup}
                        template={selectedTemplate}
                        influencers={mockAutomationInfluencers}
                        onBack={() => handleNavigate('automation-groups')}
                        onOpenTemplateManagement={handleOpenTemplateManagement}
                        onDeliverTemplate={(ids) => console.log('Deliver template to:', ids)}
                    />
                );

            case 'template-management':
                if (!selectedGroup) {
                    return (
                        <div className="p-8 text-center">
                            <p className="text-[#707070]">그룹을 찾을 수 없습니다</p>
                        </div>
                    );
                }
                return (
                    <TemplateManagement
                        initialData={selectedTemplate}
                        automationGroup={selectedGroup}
                        onBack={() => handleNavigate(`automation-group-detail-${selectedGroup.id}`)}
                        onSave={handleSaveTemplate}
                        onDeploy={handleDeployTemplate}
                    />
                );

            case 'reaction-automation': {
                // Create a temporary automation group for campaign context
                const tempAutomationGroup: AutomationGroup = {
                    id: reactionAutomationContext?.campaignId || 0,
                    name: reactionAutomationContext?.campaignName || '새 반응 자동화',
                    description: '',
                    status: 'inactive',
                    influencerCount: mockAutomationInfluencers.length,
                    templateStatus: 'draft',
                    lastModified: new Date().toISOString().split('T')[0],
                    createdAt: new Date().toISOString().split('T')[0]
                };
                return (
                    <TemplateManagement
                        automationGroup={tempAutomationGroup}
                        onBack={() => {
                            if (reactionAutomationContext?.context === 'campaign' && reactionAutomationContext.campaignId) {
                                setCurrentView('campaign-detail');
                            } else {
                                handleNavigate('automation-groups');
                            }
                            setReactionAutomationContext(null);
                        }}
                        onSave={handleSaveTemplate}
                        onDeploy={handleDeployTemplate}
                    />
                );
            }

            case 'settings':
                return (
                    <div className="p-8">
                        <h1 className="font-['Pretendard:Bold',sans-serif] text-[24px] text-[#242424] mb-2">
                            설정
                        </h1>
                        <p className="font-['Pretendard:Regular',sans-serif] text-[14px] text-[#707070]">
                            계정 및 서비스 설정을 관리합니다
                        </p>
                        {/* TODO: Add settings content */}
                    </div>
                );

            default:
                return (
                    <Dashboard
                        automationGroups={automationGroups}
                        onNavigate={handleNavigate}
                    />
                );
        }
    };

    const renderLayout = () => {
        // Template management uses full screen without sidebar
        if (currentView === 'template-management') {
            return renderContent();
        }

        return (
            <Layout
                currentView={currentView}
                onChangeView={handleNavigate}
                onBackToServiceSelector={onBackToServiceSelector}
            >
                {renderContent()}
            </Layout>
        );
    };

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <div className="flex-1 w-full overflow-hidden relative">
                {renderLayout()}
            </div>
            {onSwitchService && (
                <ServiceSwitcherBar
                    currentService="response"
                    onSwitchService={onSwitchService}
                />
            )}
        </div>
    );
}
