
import { useState, useEffect } from "react";
import {
    ChevronLeft, ChevronRight, Send, BarChart2, Truck
} from "lucide-react";
import { AutomationGroup, DMTemplate, AutomationInfluencer } from "../types";
import { CoreButton } from "../../design-system";
import { InfluencerDeliveryTable } from "../components/InfluencerDeliveryTable";
import { TemplateListModal } from "../components/TemplateListModal";
import { PerformanceDashboard } from "../components/PerformanceDashboard";

interface AutomationGroupDetailProps {
    group: AutomationGroup;
    template?: DMTemplate;
    influencers?: AutomationInfluencer[];
    onBack: () => void;
    onOpenTemplateManagement: () => void;
    onDeliverTemplate?: (influencerIds: number[]) => void;
    onAddInfluencer?: () => void;
}

type TabType = 'delivery' | 'performance';

export function AutomationGroupDetail({
    group,
    template,
    influencers = [],
    onBack,
    onOpenTemplateManagement,
    onDeliverTemplate,
    onAddInfluencer
}: AutomationGroupDetailProps) {
    const [activeTab, setActiveTab] = useState<TabType>('delivery');
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [templates, setTemplates] = useState<DMTemplate[]>([
        {
            id: 1,
            name: "신상품 홍보 템플릿",
            automationGroupId: group.id,
            dmGuide: "안녕하세요! 저희 브랜드의 신상품을 소개해드려요 🎉",
            ctaLinks: [
                { buttonName: "상품 보기", url: "", isVariable: true, variableName: "product_url" },
                { buttonName: "이벤트 참여", url: "https://brand.com/event", isVariable: false },
            ],
            status: "saved",
            triggerKeywords: ["가격", "구매", "링크"],
        },
        {
            id: 2,
            name: "시즌 이벤트 템플릿",
            automationGroupId: group.id,
            dmGuide: "특별 할인 이벤트에 초대합니다! 🎁",
            ctaLinks: [
                { buttonName: "할인 받기", url: "", isVariable: true, variableName: "discount_url" },
                { buttonName: "브랜드 팔로우", url: "", isVariable: true, variableName: "profile_url" },
            ],
            status: "saved",
            triggerKeywords: ["이벤트", "할인"],
        },
    ]);

    const handleSaveTemplate = (newTemplate: DMTemplate) => {
        setTemplates(prev => {
            if (newTemplate.id) {
                return prev.map(t => t.id === newTemplate.id ? newTemplate : t);
            }
            return [...prev, { ...newTemplate, id: Date.now() }];
        });
    };

    const handleDeleteTemplate = (id: number) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
    };

    const handleDeliver = (ids: number[]) => {
        alert(`${ids.length}명에게 템플릿을 전달합니다.`);
    };

    const handleRetry = (ids: number[]) => {
        alert(`${ids.length}건 재전달을 시도합니다.`);
    };

    const handleCancel = (ids: number[]) => {
        alert(`${ids.length}건 전달을 취소합니다.`);
    };

    const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
        { key: 'delivery', label: '협업 관리', icon: <Truck className="w-4 h-4" /> },
        { key: 'performance', label: '성과 분석', icon: <BarChart2 className="w-4 h-4" /> },
    ];

    return (
        <div className="flex flex-col h-full bg-[var(--ft-bg-secondary)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 pt-6 sticky top-0 z-20">
                <div className="flex items-center gap-3 mb-6">
                    <CoreButton variant="tertiary" size="sm" onClick={onBack} leftIcon={<ChevronLeft className="w-4 h-4" />}>
                        뒤로
                    </CoreButton>
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[var(--ft-text-secondary)] mb-1">
                            <span>반응 자동화 관리</span>
                            <ChevronRight className="w-3 h-3" />
                            <span>{group.name}</span>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--ft-text-primary)]">{group.name}</h1>
                    </div>
                </div>

                {/* 2-Tab Navigation */}
                <div className="flex gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                ? 'border-[var(--ft-color-primary-500)] text-[var(--ft-color-primary-600)]'
                                : 'border-transparent text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)]'
                                }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'delivery' && (
                    <div className="h-full bg-white">
                        <InfluencerDeliveryTable
                            influencers={influencers}
                            templates={templates}
                            onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
                            onDeliver={handleDeliver}
                            onRetry={handleRetry}
                            onCancel={handleCancel}
                        />
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="h-full bg-white overflow-auto">
                        <PerformanceDashboard influencerCount={influencers.length} />
                    </div>
                )}
            </div>

            {/* Template Modal */}
            <TemplateListModal
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                templates={templates}
                onSave={handleSaveTemplate}
                onDelete={handleDeleteTemplate}
            />
        </div>
    );
}
