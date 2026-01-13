import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, ClipboardList, Briefcase, ChevronRight, AlertCircle } from "lucide-react";
import { Automation } from "./AutomationDetail";
import { AutomationTable } from "../components/AutomationTable";
import { Campaign } from "../types/Campaign";

interface MyAutomationsPageProps {
    automations: Automation[];
    onCreateNew: () => void;
    onAutomationClick?: (id: number) => void;
    onToggleStatus?: (id: number) => void;
    onMenuAction?: (id: number, action: 'edit' | 'delete' | 'template') => void;
    onNavigate: (view: string) => void;
}

export function MyAutomationsPage({
    automations,
    onCreateNew,
    onAutomationClick,
    onToggleStatus,
    onMenuAction,
    onNavigate
}: MyAutomationsPageProps) {
    // Filter only personal automations (exclude campaign-linked ones)
    const personalAutomations = automations.filter(a => !a.campaignId);

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[#242424]">내 자동화</h1>
                    <p className="text-sm text-[#707070] mt-1">직접 만든 개인 자동화를 관리하세요</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => onNavigate('logs')}
                        variant="outline"
                        className="gap-1.5 border-[#e0e0e0]"
                    >
                        <ClipboardList className="h-4 w-4" />
                        발송 로그
                    </Button>
                    <Button
                        onClick={onCreateNew}
                        className="bg-[#5e51ff] hover:bg-[#5e51ff]/90 gap-1.5"
                    >
                        <Plus className="h-4 w-4" />
                        새로운 자동화 만들기
                    </Button>
                </div>
            </div>

            {/* Automation List */}
            {personalAutomations.length === 0 ? (
                <Card className="rounded-xl border border-[#f0f0f0]">
                    <CardContent className="py-16 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f5f3ff] flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-[#5e51ff]" />
                        </div>
                        <h3 className="text-lg font-medium text-[#242424] mb-2">아직 자동화가 없어요</h3>
                        <p className="text-sm text-[#707070] mb-6">
                            댓글에 자동으로 DM을 보내는 자동화를 만들어보세요
                        </p>
                        <Button
                            onClick={onCreateNew}
                            className="bg-[#5e51ff] hover:bg-[#5e51ff]/90"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            첫 번째 자동화 만들기
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card className="rounded-xl border border-[#f0f0f0]">
                    <AutomationTable
                        automations={personalAutomations}
                        onAutomationClick={onAutomationClick}
                        onToggleStatus={onToggleStatus}
                        onMenuAction={onMenuAction}
                    />
                </Card>
            )}
        </div>
    );
}
