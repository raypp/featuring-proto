import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, MoreHorizontal, Filter, Download, Plus, Search, CheckCircle2, AlertCircle, Clock, Save, FileText, BarChart2, GitGraph, List, ChevronRight, Users } from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { AutomationGroup, CollaborationInfluencer, DMTemplate, InfluencerTemplateAssignment, AutomationInfluencer } from "../types";
import { CollaborationTable } from "../components/CollaborationTable";
import { TemplateListModal } from "../components/TemplateListModal";
import { AddInfluencerModal } from "../components/AddInfluencerModal";
import { PerformanceDashboard } from "../components/PerformanceDashboard";
import { DeliveryConfirmationModal } from "../components/DeliveryConfirmationModal";
import { CancelDeliveryModal } from "../components/CancelDeliveryModal";

type TabType = 'list' | 'performance';

interface AutomationGroupDetailProps {
    group: AutomationGroup;
    template?: DMTemplate;
    influencers?: AutomationInfluencer[];
    onBack: () => void;
    onOpenTemplateManagement: () => void;
    onDeliverTemplate?: (influencerIds: number[]) => void;
    onAddInfluencer?: () => void;
}


// Mock Data Generator (Lifted from previous SplitView)
function generateMockInfluencers(templates: DMTemplate[]): CollaborationInfluencer[] {
    const mockUsers = [
        { username: "beauty_dahyun", displayName: "뷰티 다현", profileImage: "https://i.pravatar.cc/150?u=beauty_dahyun" },
        { username: "fashion_mina", displayName: "패션 미나", profileImage: "https://i.pravatar.cc/150?u=fashion_mina" },
        { username: "lifestyle_yuna", displayName: "라이프스타일 유나", profileImage: "https://i.pravatar.cc/150?u=lifestyle_yuna" },
        { username: "travel_jisoo", displayName: "트래블 지수", profileImage: "https://i.pravatar.cc/150?u=travel_jisoo" },
        { username: "food_soojin", displayName: "푸드 수진", profileImage: "https://i.pravatar.cc/150?u=food_soojin" },
        { username: "tech_hyunjin", displayName: "테크 현진", profileImage: "https://i.pravatar.cc/150?u=tech_hyunjin" },
        { username: "fitness_yeji", displayName: "피트니스 예지", profileImage: "https://i.pravatar.cc/150?u=fitness_yeji" },
        { username: "music_chaeyoung", displayName: "뮤직 채영", profileImage: "https://i.pravatar.cc/150?u=music_chaeyoung" },
    ];

    return mockUsers.map((user, idx) => {
        const templateCount = Math.floor(Math.random() * 3) + 1;
        const assignedTemplates = templates.slice(0, templateCount);

        const assignments: InfluencerTemplateAssignment[] = assignedTemplates.map((template, tIdx) => {
            const statuses: InfluencerTemplateAssignment['deliveryStatus'][] = ['not_delivered', 'pending', 'delivered', 'failed'];
            const status = statuses[(idx + tIdx) % 4];

            return {
                id: idx * 100 + tIdx,
                influencerId: idx + 1,
                templateId: template.id!,
                templateName: template.name || `템플릿 ${template.id}`,
                snapshotVersion: Math.floor(Math.random() * 3) + 1,
                deliveryStatus: status,
                deliveredAt: status === 'delivered' ? '2026-01-20T10:30:00Z' : undefined,
                failReason: status === 'failed' ? '인스타그램 API 연결 실패' : undefined,
                variables: {
                    product_url: `https://shop.brand.com/product/${idx}`,
                    discount_url: `https://shop.brand.com/discount/${idx}`,
                },
                snapshotContent: {
                    dmGuide: template.dmGuide,
                    imageUrl: template.imageUrl,
                    ctaLinks: template.ctaLinks,
                    triggerKeywords: template.triggerKeywords,
                },
                createdAt: '2026-01-15T09:00:00Z',
                lastModifiedAt: '2026-01-18T14:30:00Z',
            };
        });

        const deliverySummary = {
            delivered: assignments.filter(a => a.deliveryStatus === 'delivered').length,
            pending: assignments.filter(a => a.deliveryStatus === 'pending').length,
            failed: assignments.filter(a => a.deliveryStatus === 'failed').length,
            notDelivered: assignments.filter(a => a.deliveryStatus === 'not_delivered').length,
        };

        const automationStatuses: CollaborationInfluencer['automationStatus'][] = ['running', 'stopped', 'error', 'none'];

        return {
            id: idx + 1,
            influencerId: idx + 1,
            username: user.username,
            displayName: user.displayName,
            profileImage: user.profileImage,
            isConnected: idx % 3 !== 2,
            templateCount: assignments.length,
            templateNames: assignments.map(a => a.templateName),
            deliverySummary,
            automationStatus: automationStatuses[idx % 4],
            lastDeliveredAt: deliverySummary.delivered > 0 ? '2026-01-20T10:30:00Z' : undefined,
            templateAssignments: assignments,
        };
    });
}

export function AutomationGroupDetail({
    group,
    template,
    influencers = [],
    onBack,
    onOpenTemplateManagement,
    onDeliverTemplate,
    onAddInfluencer
}: AutomationGroupDetailProps) {
    const [activeTab, setActiveTab] = useState<TabType>('list');
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isAddInfluencerModalOpen, setIsAddInfluencerModalOpen] = useState(false);

    // Modal States for Delivery Actions
    const [deliveryConfirmation, setDeliveryConfirmation] = useState<{
        isOpen: boolean;
        influencerId: number;
        assignmentId: number;
        influencerName: string;
        templateName: string;
    } | null>(null);

    const [cancelConfirmation, setCancelConfirmation] = useState<{
        isOpen: boolean;
        influencerId: number;
        assignmentId: number;
    } | null>(null);

    // Initial Templates
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

    // Influencers State (For Table)
    const mockInfluencers = useMemo(() => generateMockInfluencers(templates), [templates]); // Re-generate if templates change
    const [collaborationInfluencers, setCollaborationInfluencers] = useState<CollaborationInfluencer[]>(mockInfluencers);

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

    // Table Handlers
    const handleUpdateVariable = (influencerId: number, assignmentId: number, key: string, value: string) => {
        setCollaborationInfluencers(prev => prev.map(inf => {
            if (inf.influencerId !== influencerId) return inf;
            return {
                ...inf,
                templateAssignments: inf.templateAssignments.map(a =>
                    a.id === assignmentId
                        ? { ...a, variables: { ...a.variables, [key]: value }, lastModifiedAt: new Date().toISOString() }
                        : a
                )
            };
        }));
        // Optional: Show toast "Saved: key=value"
    };

    const handleDeliverSingle = (influencerId: number, assignmentId: number) => {
        const influencer = collaborationInfluencers.find(inf => inf.influencerId === influencerId);
        const assignment = influencer?.templateAssignments.find(a => a.id === assignmentId);

        if (influencer && assignment) {
            setDeliveryConfirmation({
                isOpen: true,
                influencerId,
                assignmentId,
                influencerName: influencer.displayName,
                templateName: assignment.templateName
            });
        }
    };

    const confirmDeliverSingle = () => {
        if (!deliveryConfirmation) return;
        const { influencerId, assignmentId } = deliveryConfirmation;

        setCollaborationInfluencers(prev => prev.map(inf => {
            if (inf.influencerId !== influencerId) return inf;
            return {
                ...inf,
                templateAssignments: inf.templateAssignments.map(a =>
                    a.id === assignmentId
                        ? { ...a, deliveryStatus: 'delivered', deliveredAt: new Date().toISOString() }
                        : a
                ),
                deliverySummary: {
                    ...inf.deliverySummary,
                    delivered: inf.deliverySummary.delivered + 1,
                    notDelivered: Math.max(0, inf.deliverySummary.notDelivered - 1),
                    pending: Math.max(0, inf.deliverySummary.pending - 1) // Handle pending transition too
                }
            };
        }));

        setDeliveryConfirmation(null);
    };

    const handleStopSingle = (influencerId: number, assignmentId: number) => {
        setCollaborationInfluencers(prev => prev.map(inf => {
            if (inf.influencerId !== influencerId) return inf;
            const updatedAssignments = inf.templateAssignments.map(a =>
                a.id === assignmentId ? { ...a, deliveryStatus: 'not_delivered' as const } : a
            );
            return {
                ...inf,
                templateAssignments: updatedAssignments,
                deliverySummary: {
                    ...inf.deliverySummary,
                    pending: Math.max(0, inf.deliverySummary.pending - 1),
                    notDelivered: inf.deliverySummary.notDelivered + 1
                }
            };
        }));
    };

    // Cancel a pending delivery (delivered but not yet accepted)
    const handleCancelDelivery = (influencerId: number, assignmentId: number) => {
        const influencer = collaborationInfluencers.find(inf => inf.influencerId === influencerId);
        const assignment = influencer?.templateAssignments.find(a => a.id === assignmentId);

        if (influencer && assignment) {
            setCancelConfirmation({
                isOpen: true,
                influencerId,
                assignmentId
            });
        }
    };

    const confirmCancelDelivery = () => {
        if (!cancelConfirmation) return;
        const { influencerId, assignmentId } = cancelConfirmation;

        setCollaborationInfluencers(prev => prev.map(inf => {
            if (inf.influencerId !== influencerId) return inf;
            return {
                ...inf,
                templateAssignments: inf.templateAssignments.map(a =>
                    a.id === assignmentId
                        ? { ...a, deliveryStatus: 'failed', failReason: '취소됨' }
                        : a
                ),
                deliverySummary: {
                    ...inf.deliverySummary,
                    pending: Math.max(0, inf.deliverySummary.pending - 1),
                    failed: inf.deliverySummary.failed + 1
                }
            };
        }));
        setCancelConfirmation(null);
    };

    // Add influencers from modal
    const handleAddInfluencers = (newInfluencers: Partial<AutomationInfluencer>[]) => {
        const mappedInfluencers: CollaborationInfluencer[] = newInfluencers.map(inf => ({
            id: inf.id || Date.now(),
            influencerId: inf.influencerId || inf.id || Date.now(),
            username: inf.username || '',
            displayName: inf.displayName || inf.username || '',
            profileImage: inf.profileImage || '',
            isConnected: inf.isConnected || false,
            templateCount: 0,
            templateNames: [],
            deliverySummary: {
                delivered: 0,
                pending: 0,
                failed: 0,
                notDelivered: 0,
            },
            automationStatus: 'none' as const,
            templateAssignments: [],
        }));
        setCollaborationInfluencers(prev => [...prev, ...mappedInfluencers]);
    };

    // Add a new template to a specific influencer
    const handleAddTemplateToInfluencer = (influencerId: number) => {
        // For now, show an alert. In a real app, this would open a template selection modal.
        alert(`인플루언서 ${influencerId}에게 템플릿을 추가합니다. (템플릿 선택 모달 구현 필요)`);
    };

    // Campaign status helper
    const getCampaignStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">진행중</span>;
            case 'completed':
                return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">종료</span>;
            case 'paused':
                return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">중단</span>;
            default:
                return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">진행중</span>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--ft-bg-secondary)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-5 sticky top-0 z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CoreButton variant="tertiary" size="sm" onClick={onBack} leftIcon={<ChevronLeft className="w-4 h-4" />}>
                            뒤로
                        </CoreButton>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-[var(--ft-text-secondary)] mb-1">
                                <span>반응 자동화 관리</span>
                                <ChevronRight className="w-3 h-3" />
                                <span>{group.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-[var(--ft-text-primary)]">{group.name}</h1>
                                {getCampaignStatusBadge(group.status || 'active')}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--ft-text-secondary)]">
                        <Users className="w-4 h-4" />
                        <span>참여 인플루언서 <strong className="text-[var(--ft-text-primary)]">{collaborationInfluencers.length}명</strong></span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 mt-4">
                    <button
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'list'
                            ? 'border-[var(--ft-color-primary-500)] text-[var(--ft-color-primary-600)]'
                            : 'border-transparent text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)]'
                            }`}
                        onClick={() => setActiveTab('list')}
                    >
                        <List className="w-4 h-4" />
                        템플릿&협업 관리
                    </button>
                    <button
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'performance'
                            ? 'border-[var(--ft-color-primary-500)] text-[var(--ft-color-primary-600)]'
                            : 'border-transparent text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)]'
                            }`}
                        onClick={() => setActiveTab('performance')}
                    >
                        <BarChart2 className="w-4 h-4" />
                        성과 요약
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'list' && (
                    <div className="h-full bg-white">
                        <CollaborationTable
                            influencers={collaborationInfluencers}
                            templates={templates}
                            onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
                            onAddInfluencer={() => setIsAddInfluencerModalOpen(true)}
                            onUpdateVariable={handleUpdateVariable}
                            onDeliverTemplate={handleDeliverSingle}
                            onCancelDelivery={handleCancelDelivery}
                            onAddTemplateToInfluencer={handleAddTemplateToInfluencer}
                            onBulkApplyTemplate={(ids, tId) => alert(`Bulk apply template ${tId} to ${ids.length} influencers`)}
                            onBulkDeliver={(ids) => alert(`Bulk deliver to ${ids.length} influencers`)}
                        />
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="h-full bg-white overflow-auto">
                        <PerformanceDashboard influencerCount={collaborationInfluencers.length} />
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

            {/* Add Influencer Modal */}
            <AddInfluencerModal
                isOpen={isAddInfluencerModalOpen}
                onClose={() => setIsAddInfluencerModalOpen(false)}
                onAdd={handleAddInfluencers}
            />
            {/* Delivery Confirmation Modal */}
            <DeliveryConfirmationModal
                isOpen={!!deliveryConfirmation && deliveryConfirmation.isOpen}
                onClose={() => setDeliveryConfirmation(null)}
                onConfirm={confirmDeliverSingle}
                data={deliveryConfirmation}
            />

            {/* Cancel Confirmation Modal */}
            <CancelDeliveryModal
                isOpen={!!cancelConfirmation && cancelConfirmation.isOpen}
                onClose={() => setCancelConfirmation(null)}
                onConfirm={confirmCancelDelivery}
            />
        </div>
    );
}
