import { useState } from "react";
import { Plus, Zap } from "lucide-react";
import { CoreButton, CoreModal, CoreTag } from "../../design-system";
import { AutomationGroupSummary } from "../types";

interface AddAutomationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignInfluencerCount: number;
    onCreateNew: (automation: AutomationGroupSummary) => void;
    onLinkExisting: (automation: AutomationGroupSummary) => void;
}

// Mock existing automations for demo
const MOCK_EXISTING_AUTOMATIONS = [
    { id: 101, name: '새 팔로워 환영 인사', status: 'running' as const },
    { id: 102, name: '여름 프로모션', status: 'stopped' as const },
];

export function AddAutomationModal({
    isOpen,
    onClose,
    campaignInfluencerCount,
    onCreateNew,
    onLinkExisting
}: AddAutomationModalProps) {
    const [step, setStep] = useState<'choice' | 'select-existing'>('choice');

    const handleClose = () => {
        setStep('choice');
        onClose();
    };

    const handleCreateNew = () => {
        const newAutomation: AutomationGroupSummary = {
            id: Date.now(),
            name: `새 자동화_${new Date().toLocaleDateString('ko-KR')}`,
            status: 'draft',
            triggerType: 'comment_keyword',
            triggerKeywords: [],
            influencerCount: campaignInfluencerCount,
            setupDoneCount: 0,
            stats: { participation: 0, sent: 0, click: 0, ctr: 0 }
        };
        onCreateNew(newAutomation);
        handleClose();
    };

    const handleSelectExisting = (existing: typeof MOCK_EXISTING_AUTOMATIONS[0]) => {
        const linked: AutomationGroupSummary = {
            id: existing.id,
            name: existing.name,
            status: existing.status,
            triggerType: 'comment_keyword',
            triggerKeywords: [],
            influencerCount: campaignInfluencerCount,
            setupDoneCount: 0,
            stats: { participation: 0, sent: 0, click: 0, ctr: 0 }
        };
        onLinkExisting(linked);
        handleClose();
    };

    if (step === 'select-existing') {
        return (
            <CoreModal
                open={isOpen}
                onClose={handleClose}
                title="기존 자동화 연결"
                size="lg"
            >
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {MOCK_EXISTING_AUTOMATIONS.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => handleSelectExisting(group)}
                            className="w-full p-4 border border-[var(--ft-border-primary)] rounded-lg text-left hover:border-[var(--ft-color-primary-500)] hover:bg-[var(--ft-bg-secondary)] transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                                <span className="font-medium text-[var(--ft-text-primary)]">{group.name}</span>
                            </div>
                            <CoreTag color={group.status === 'running' ? 'green' : 'gray'} size="sm">
                                {group.status === 'running' ? '운영중' : '중단'}
                            </CoreTag>
                        </button>
                    ))}
                </div>
            </CoreModal>
        );
    }

    return (
        <CoreModal
            open={isOpen}
            onClose={handleClose}
            title="반응 자동화 추가"
            size="md"
        >
            <div className="space-y-3">
                <button
                    onClick={handleCreateNew}
                    className="w-full p-4 border border-[var(--ft-border-primary)] rounded-lg text-left hover:border-[var(--ft-color-primary-500)] hover:bg-[var(--ft-bg-secondary)] transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--ft-color-primary-100)] flex items-center justify-center">
                            <Plus className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                        </div>
                        <div>
                            <p className="font-medium text-[var(--ft-text-primary)] group-hover:text-[var(--ft-color-primary-600)]">새 자동화 생성</p>
                            <p className="text-sm text-[var(--ft-text-secondary)]">캠페인에 바로 연결되는 새로운 반응 자동화를 생성합니다.</p>
                        </div>
                    </div>
                </button>
                <button
                    onClick={() => setStep('select-existing')}
                    className="w-full p-4 border border-[var(--ft-border-primary)] rounded-lg text-left hover:border-[var(--ft-color-primary-500)] hover:bg-[var(--ft-bg-secondary)] transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-medium text-[var(--ft-text-primary)] group-hover:text-[var(--ft-color-primary-600)]">기존 자동화 연결</p>
                            <p className="text-sm text-[var(--ft-text-secondary)]">이미 만들어진 반응 자동화를 이 캠페인에 연결합니다.</p>
                        </div>
                    </div>
                </button>
            </div>
        </CoreModal>
    );
}
