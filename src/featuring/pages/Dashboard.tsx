import { Users, FileText, TrendingUp } from "lucide-react";
import { AutomationGroup } from "../types";
import { CoreStatusBadge } from "@/design-system";

interface DashboardProps {
    automationGroups: AutomationGroup[];
    onNavigate: (view: string) => void;
}

export function Dashboard({ automationGroups, onNavigate }: DashboardProps) {
    const activeGroups = automationGroups.filter(g => g.status === 'active').length;
    const totalInfluencers = automationGroups.reduce((sum, g) => sum + g.influencerCount, 0);
    const deployedTemplates = automationGroups.filter(g => g.templateStatus === 'deployed').length;

    const getTemplateStatusBadge = (status: AutomationGroup['templateStatus']) => {
        switch (status) {
            case 'deployed':
                return <CoreStatusBadge colorType="success" type="tint" size="sm">템플릿 전달됨</CoreStatusBadge>;
            case 'saved':
                return <CoreStatusBadge colorType="default" type="tint" size="sm">템플릿 저장됨</CoreStatusBadge>;
            case 'draft':
                return <CoreStatusBadge colorType="warning" type="tint" size="sm">템플릿 작성중</CoreStatusBadge>;
            case 'none':
                return <CoreStatusBadge colorType="error" type="tint" size="sm">템플릿 없음</CoreStatusBadge>;
            default:
                return null;
        }
    };

    const getGroupStatusBadge = (status: AutomationGroup['status']) => {
        if (status === 'active') {
            return <CoreStatusBadge colorType="success" type="tint" size="sm">활성</CoreStatusBadge>;
        }
        return <CoreStatusBadge colorType="default" type="tint" size="sm">비활성</CoreStatusBadge>;
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--ft-text-primary)] mb-2">
                    대시보드
                </h1>
                <p className="text-sm text-[var(--ft-text-secondary)]">
                    브랜드 반응 자동화 현황을 한눈에 확인하세요
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[var(--ft-color-orange-50)] rounded-[var(--ft-radius-lg)] flex items-center justify-center">
                            <Users className="w-5 h-5 text-[var(--ft-color-orange-500)]" />
                        </div>
                        <p className="text-sm font-medium text-[var(--ft-text-secondary)]">활성 그룹</p>
                    </div>
                    <p className="text-[32px] font-bold text-[var(--ft-text-primary)]">
                        {activeGroups}
                        <span className="text-sm font-normal text-[var(--ft-text-secondary)] ml-1">개</span>
                    </p>
                </div>

                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[var(--ft-color-green-50)] rounded-[var(--ft-radius-lg)] flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[var(--ft-color-green-600)]" />
                        </div>
                        <p className="text-sm font-medium text-[var(--ft-text-secondary)]">연결된 인플루언서</p>
                    </div>
                    <p className="text-[32px] font-bold text-[var(--ft-text-primary)]">
                        {totalInfluencers}
                        <span className="text-sm font-normal text-[var(--ft-text-secondary)] ml-1">명</span>
                    </p>
                </div>

                <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)] p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[var(--ft-color-primary-50)] rounded-[var(--ft-radius-lg)] flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                        </div>
                        <p className="text-sm font-medium text-[var(--ft-text-secondary)]">전달된 템플릿</p>
                    </div>
                    <p className="text-[32px] font-bold text-[var(--ft-text-primary)]">
                        {deployedTemplates}
                        <span className="text-sm font-normal text-[var(--ft-text-secondary)] ml-1">개</span>
                    </p>
                </div>
            </div>

            {/* Recent Groups */}
            <div className="bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-lg)] border border-[var(--ft-border-primary)]">
                <div className="flex items-center justify-between p-6 border-b border-[var(--ft-border-primary)]">
                    <h2 className="text-lg font-medium text-[var(--ft-text-primary)]">
                        최근 반응 자동화 그룹
                    </h2>
                    <button
                        onClick={() => onNavigate('automation-groups')}
                        className="text-[var(--ft-color-orange-500)] font-medium text-sm hover:underline"
                    >
                        전체 보기 →
                    </button>
                </div>

                <div className="divide-y divide-[var(--ft-border-primary)]">
                    {automationGroups.slice(0, 5).map((group) => (
                        <div
                            key={group.id}
                            className="p-4 hover:bg-[var(--ft-interactive-tertiary-hover)] cursor-pointer transition-colors"
                            onClick={() => onNavigate(`automation-group-detail-${group.id}`)}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[var(--ft-text-primary)] mb-1">
                                        {group.name}
                                    </p>
                                    <p className="text-xs text-[var(--ft-text-secondary)]">
                                        인플루언서 {group.influencerCount}명 • 수정일 {group.lastModified}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getTemplateStatusBadge(group.templateStatus)}
                                    {getGroupStatusBadge(group.status)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
