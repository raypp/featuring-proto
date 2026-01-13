import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    Bot,
    FileText,
    Wallet,
    ChevronRight,
    Send,
    MousePointer,
    AlertCircle,
    Pause
} from "lucide-react";
import { Campaign, CampaignTodoItem } from "../types/Campaign";

interface CampaignDetailProps {
    campaign: Campaign;
    onBack: () => void;
    onSetupAutomation: (campaignId: number) => void;
    onPauseCampaign?: (campaignId: number) => void;
}

export function CampaignDetail({
    campaign,
    onBack,
    onSetupAutomation,
    onPauseCampaign
}: CampaignDetailProps) {
    const [showPauseWarning, setShowPauseWarning] = useState(false);

    const statusSteps = [
        { key: 'invited', label: '제안받음' },
        { key: 'active', label: '진행중' },
        { key: 'settlement', label: '정산대기' },
        { key: 'completed', label: '완료' }
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.key === campaign.status);

    const getTodoIcon = (type: CampaignTodoItem['type']) => {
        switch (type) {
            case 'automation': return <Bot className="w-5 h-5" />;
            case 'contract': return <FileText className="w-5 h-5" />;
            case 'settlement': return <Wallet className="w-5 h-5" />;
        }
    };

    const pendingTodos = campaign.todoItems.filter(t => t.status === 'pending');
    const completedTodos = campaign.todoItems.filter(t => t.status === 'completed');

    return (
        <div className="h-full bg-[#fafafa]">
            {/* Header */}
            <div className="bg-white border-b border-[#f0f0f0]">
                <div className="px-6 py-4 flex items-center gap-4">
                    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-[#707070]" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            {campaign.brandLogo ? (
                                <img src={campaign.brandLogo} alt={campaign.brandName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-sm font-bold text-[#707070]">{campaign.brandName.charAt(0)}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-base font-medium text-[#242424]">{campaign.brandName}</h1>
                            <p className="text-sm text-[#707070]">{campaign.campaignName}</p>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="px-6 pb-4">
                    <div className="flex items-center justify-between">
                        {statusSteps.map((step, index) => (
                            <div key={step.key} className="flex items-center">
                                <div className={`flex items-center gap-2 ${index <= currentStepIndex ? 'text-[#5e51ff]' : 'text-[#bbbbbb]'}`}>
                                    {index < currentStepIndex ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : index === currentStepIndex ? (
                                        <div className="w-5 h-5 rounded-full bg-[#5e51ff] flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                    ) : (
                                        <Circle className="w-5 h-5" />
                                    )}
                                    <span className={`text-sm font-medium ${index <= currentStepIndex ? 'text-[#242424]' : 'text-[#bbbbbb]'}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < statusSteps.length - 1 && (
                                    <div className={`w-12 h-0.5 mx-2 ${index < currentStepIndex ? 'bg-[#5e51ff]' : 'bg-[#e0e0e0]'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Action Required */}
                {pendingTodos.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
                            <h2 className="text-base font-medium text-[#242424]">Action Required</h2>
                        </div>
                        <div className="space-y-2">
                            {pendingTodos.map((todo) => (
                                <Card
                                    key={todo.id}
                                    className="rounded-xl border border-[#fef3c7] bg-[#fffbeb] hover:border-[#f59e0b] transition-colors cursor-pointer"
                                    onClick={() => todo.type === 'automation' && onSetupAutomation(campaign.id)}
                                >
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
                                            {getTodoIcon(todo.type)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-[#242424]">{todo.label}</h3>
                                            {todo.description && (
                                                <p className="text-xs text-[#707070] mt-0.5">{todo.description}</p>
                                            )}
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-[#d97706]" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Completed Todos */}
                {completedTodos.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-base font-medium text-[#242424]">완료된 항목</h2>
                        <div className="space-y-2">
                            {completedTodos.map((todo) => (
                                <Card key={todo.id} className="rounded-xl border border-[#f0f0f0]">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#22c55e]">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-[#707070] line-through">{todo.label}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats (if automation is active) */}
                {campaign.automationId && (
                    <div className="space-y-3">
                        <h2 className="text-base font-medium text-[#242424]">성과</h2>
                        <Card className="rounded-xl border border-[#f0f0f0]">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-[#707070] mb-1">
                                            <Send className="w-4 h-4" />
                                            <span className="text-xs">발송</span>
                                        </div>
                                        <p className="text-xl font-semibold text-[#242424]">
                                            {campaign.executions?.toLocaleString() || '-'}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-[#707070] mb-1">
                                            <MousePointer className="w-4 h-4" />
                                            <span className="text-xs">클릭</span>
                                        </div>
                                        <p className="text-xl font-semibold text-[#242424]">-</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-[#707070] mb-1">
                                            <span className="text-xs">CTR</span>
                                        </div>
                                        <p className="text-xl font-semibold text-[#242424]">{campaign.ctr || '-'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pause Button */}
                        <Button
                            variant="outline"
                            className="w-full border-[#e0e0e0] text-[#707070]"
                            onClick={() => setShowPauseWarning(true)}
                        >
                            <Pause className="w-4 h-4 mr-2" />
                            자동화 중단하기
                        </Button>
                    </div>
                )}
            </div>

            {/* Pause Warning Modal */}
            {showPauseWarning && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md rounded-2xl">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#fef3c7] flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-[#f59e0b]" />
                            </div>
                            <h3 className="text-lg font-medium text-[#242424] mb-2">정말 중단하시겠어요?</h3>
                            <p className="text-sm text-[#707070] mb-6">
                                브랜드와 협의된 캠페인입니다.<br />
                                중단 시 불이익이 있을 수 있습니다.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowPauseWarning(false)}
                                >
                                    취소
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => {
                                        onPauseCampaign?.(campaign.id);
                                        setShowPauseWarning(false);
                                    }}
                                >
                                    중단하기
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
