import { useState, useCallback, useMemo } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical } from "lucide-react";
import { CollaborationInfluencer, DMTemplate, InfluencerTemplateAssignment, CTALink } from "../types";
import { InfluencerSummaryTable } from "./InfluencerSummaryTable";
import { InfluencerTemplatePanel } from "./InfluencerTemplatePanel";

interface CollaborationSplitViewProps {
    influencers: CollaborationInfluencer[];
    templates: DMTemplate[];
    groupName?: string;
    campaignName?: string;
    onOpenTemplateModal: () => void;
    onAddInfluencer?: () => void;
}

// Generate mock data for demonstration
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

export function CollaborationSplitView({
    influencers: propInfluencers,
    templates,
    groupName = "다이슨 에어랩 캠페인",
    campaignName = "26.03 다이슨 에어랩 멀티 스타일러 캠페인",
    onOpenTemplateModal,
    onAddInfluencer
}: CollaborationSplitViewProps) {
    // Use mock data if no influencers provided
    const mockInfluencers = useMemo(() => generateMockInfluencers(templates), [templates]);
    const [influencers, setInfluencers] = useState<CollaborationInfluencer[]>(
        propInfluencers.length > 0 ? propInfluencers : mockInfluencers
    );

    const [selectedInfluencerId, setSelectedInfluencerId] = useState<number | null>(null);

    const selectedInfluencer = useMemo(() => {
        return influencers.find(i => i.influencerId === selectedInfluencerId) || null;
    }, [influencers, selectedInfluencerId]);

    // Handle influencer selection
    const handleInfluencerSelect = useCallback((influencerId: number) => {
        setSelectedInfluencerId(influencerId);
    }, []);

    // Handle adding a template to an influencer
    const handleAddTemplate = useCallback((influencerId: number, templateId: number) => {
        const template = templates.find(t => t.id === templateId);
        if (!template) return;

        setInfluencers(prev => prev.map(inf => {
            if (inf.influencerId !== influencerId) return inf;

            const newAssignment: InfluencerTemplateAssignment = {
                id: Date.now(),
                influencerId,
                templateId,
                templateName: template.name || `템플릿 ${templateId}`,
                snapshotVersion: 1,
                deliveryStatus: 'not_delivered',
                variables: {},
                snapshotContent: {
                    dmGuide: template.dmGuide,
                    imageUrl: template.imageUrl,
                    ctaLinks: template.ctaLinks,
                    triggerKeywords: template.triggerKeywords,
                },
                createdAt: new Date().toISOString(),
                lastModifiedAt: new Date().toISOString(),
            };

            return {
                ...inf,
                templateCount: inf.templateCount + 1,
                templateNames: [...inf.templateNames, newAssignment.templateName],
                deliverySummary: {
                    ...inf.deliverySummary,
                    notDelivered: inf.deliverySummary.notDelivered + 1,
                },
                templateAssignments: [...inf.templateAssignments, newAssignment],
            };
        }));
    }, [templates]);

    // Handle template delivery
    const handleDeliver = useCallback((assignmentId: number) => {
        setInfluencers(prev => prev.map(inf => {
            const assignment = inf.templateAssignments.find(a => a.id === assignmentId);
            if (!assignment) return inf;

            const updatedAssignments = inf.templateAssignments.map(a => {
                if (a.id !== assignmentId) return a;
                const wasNotDelivered = a.deliveryStatus === 'not_delivered';
                const wasPending = a.deliveryStatus === 'pending';
                return {
                    ...a,
                    deliveryStatus: 'delivered' as const,
                    deliveredAt: new Date().toISOString(),
                    snapshotVersion: a.snapshotVersion + (wasPending ? 0 : 1),
                };
            });

            const newSummary = {
                delivered: updatedAssignments.filter(a => a.deliveryStatus === 'delivered').length,
                pending: updatedAssignments.filter(a => a.deliveryStatus === 'pending').length,
                failed: updatedAssignments.filter(a => a.deliveryStatus === 'failed').length,
                notDelivered: updatedAssignments.filter(a => a.deliveryStatus === 'not_delivered').length,
            };

            return {
                ...inf,
                deliverySummary: newSummary,
                lastDeliveredAt: new Date().toISOString(),
                templateAssignments: updatedAssignments,
            };
        }));
    }, []);

    // Handle retry failed delivery
    const handleRetry = useCallback((assignmentId: number) => {
        handleDeliver(assignmentId);
    }, [handleDeliver]);

    // Handle stop pending delivery
    const handleStop = useCallback((assignmentId: number) => {
        setInfluencers(prev => prev.map(inf => {
            const assignment = inf.templateAssignments.find(a => a.id === assignmentId);
            if (!assignment) return inf;

            const updatedAssignments = inf.templateAssignments.map(a => {
                if (a.id !== assignmentId) return a;
                return {
                    ...a,
                    deliveryStatus: 'not_delivered' as const,
                };
            });

            const newSummary = {
                delivered: updatedAssignments.filter(a => a.deliveryStatus === 'delivered').length,
                pending: updatedAssignments.filter(a => a.deliveryStatus === 'pending').length,
                failed: updatedAssignments.filter(a => a.deliveryStatus === 'failed').length,
                notDelivered: updatedAssignments.filter(a => a.deliveryStatus === 'not_delivered').length,
            };

            return {
                ...inf,
                deliverySummary: newSummary,
                templateAssignments: updatedAssignments,
            };
        }));
    }, []);

    // Handle variable change
    const handleVariableChange = useCallback((assignmentId: number, variableName: string, value: string) => {
        setInfluencers(prev => prev.map(inf => {
            const assignment = inf.templateAssignments.find(a => a.id === assignmentId);
            if (!assignment) return inf;

            const updatedAssignments = inf.templateAssignments.map(a => {
                if (a.id !== assignmentId) return a;
                return {
                    ...a,
                    variables: {
                        ...a.variables,
                        [variableName]: value,
                    },
                    lastModifiedAt: new Date().toISOString(),
                };
            });

            return {
                ...inf,
                templateAssignments: updatedAssignments,
            };
        }));
    }, []);

    // Handle bulk template apply
    const handleBulkApplyTemplate = useCallback((influencerIds: number[], templateId: number) => {
        influencerIds.forEach(id => {
            handleAddTemplate(id, templateId);
        });
    }, [handleAddTemplate]);

    // Handle bulk deliver
    const handleBulkDeliver = useCallback((influencerIds: number[]) => {
        alert(`${influencerIds.length}명에게 템플릿을 전달합니다.`);
    }, []);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header Summary Bar */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-[var(--ft-border-primary)] px-6 py-3 shrink-0">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-xs text-[var(--ft-text-disabled)]">캠페인</p>
                        <p className="text-sm font-medium text-[var(--ft-text-primary)]">{campaignName}</p>
                    </div>
                    <div className="w-px h-8 bg-[var(--ft-border-primary)]" />
                    <div>
                        <p className="text-xs text-[var(--ft-text-disabled)]">자동화 그룹</p>
                        <p className="text-sm font-medium text-[var(--ft-text-primary)]">{groupName}</p>
                    </div>
                    <div className="w-px h-8 bg-[var(--ft-border-primary)]" />
                    <div>
                        <p className="text-xs text-[var(--ft-text-disabled)]">총 인플루언서</p>
                        <p className="text-sm font-semibold text-[var(--ft-text-primary)]">{influencers.length}명</p>
                    </div>
                    <div className="w-px h-8 bg-[var(--ft-border-primary)]" />
                    <div>
                        <p className="text-xs text-[var(--ft-text-disabled)]">템플릿</p>
                        <p className="text-sm font-semibold text-[var(--ft-text-primary)]">{templates.length}개</p>
                    </div>
                </div>
            </div>

            {/* Split View Panels */}
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">
                    {/* Left Panel - Influencer List */}
                    <Panel defaultSize={55} minSize={40} maxSize={70}>
                        <InfluencerSummaryTable
                            influencers={influencers}
                            templates={templates}
                            selectedInfluencerId={selectedInfluencerId}
                            onInfluencerSelect={handleInfluencerSelect}
                            onOpenTemplateModal={onOpenTemplateModal}
                            onAddInfluencer={onAddInfluencer}
                            onBulkApplyTemplate={handleBulkApplyTemplate}
                            onBulkDeliver={handleBulkDeliver}
                        />
                    </Panel>

                    {/* Resize Handle */}
                    <PanelResizeHandle className="w-1.5 bg-gray-100 hover:bg-[var(--ft-color-primary-200)] transition-colors flex items-center justify-center group">
                        <div className="w-4 h-8 flex items-center justify-center">
                            <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-[var(--ft-color-primary-500)]" />
                        </div>
                    </PanelResizeHandle>

                    {/* Right Panel - Influencer Detail */}
                    <Panel defaultSize={45} minSize={30} maxSize={60}>
                        <InfluencerTemplatePanel
                            influencer={selectedInfluencer}
                            availableTemplates={templates}
                            onAddTemplate={handleAddTemplate}
                            onDeliver={handleDeliver}
                            onRetry={handleRetry}
                            onStop={handleStop}
                            onVariableChange={handleVariableChange}
                        />
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
