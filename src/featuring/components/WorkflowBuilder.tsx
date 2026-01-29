import { useState } from "react";
import { Plus, Settings, Play, ArrowRight, Save } from "lucide-react";
import { WorkflowStep, WorkflowStepType, ActionType } from "../types";
import { WorkflowNode } from "./WorkflowNode";
import { CoreButton } from "../../design-system";

const INITIAL_STEPS: WorkflowStep[] = [
    {
        id: 'start',
        type: 'start',
        title: '시퀀스 시작',
        description: '자동화가 시작됩니다',
        nextId: 'step-1'
    },
    {
        id: 'step-1',
        type: 'action',
        title: '프로필 방문하기',
        description: '발신자 오류', // from screenshot
        config: { actionType: 'profile_visit' },
        nextId: 'step-2'
    },
    {
        id: 'step-2',
        type: 'action',
        title: '초대',
        description: '발신자 오류',
        config: { actionType: 'invite' },
        nextId: 'step-3'
    },
    {
        id: 'step-3',
        type: 'action',
        title: '이메일',
        description: '발신자 오류',
        config: { actionType: 'email' },
        nextId: 'step-4'
    },
    {
        id: 'step-4',
        type: 'delay',
        title: '6 일 이내에 초대를 수락했습니다',
        description: '발신자 오류',
        config: { duration: 144 }, // 6 days
        nextId: 'end'
    }
];

export function WorkflowBuilder() {
    const [steps, setSteps] = useState<WorkflowStep[]>(INITIAL_STEPS);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

    // Helper to get ordered steps
    const getOrderedSteps = () => {
        const ordered: WorkflowStep[] = [];
        let currentId: string | undefined = 'start';

        while (currentId) {
            const step = steps.find(s => s.id === currentId);
            if (!step) break;
            ordered.push(step);
            currentId = step.nextId;
        }
        return ordered;
    };

    const handleAddStep = (afterId: string) => {
        const newId = `step-${Date.now()}`;
        const newStep: WorkflowStep = {
            id: newId,
            type: 'action',
            title: '새로운 단계',
            description: '설정이 필요합니다',
            config: { actionType: 'message' },
            nextId: steps.find(s => s.id === afterId)?.nextId
        };

        setSteps(prev => prev.map(s => {
            if (s.id === afterId) return { ...s, nextId: newId };
            return s;
        }).concat(newStep));

        setSelectedStepId(newId);
    };

    const handleDeleteStep = (id: string) => {
        const stepToDelete = steps.find(s => s.id === id);
        const prevStep = steps.find(s => s.nextId === id);

        if (prevStep && stepToDelete) {
            setSteps(prev => prev.filter(s => s.id !== id).map(s => {
                if (s.id === prevStep.id) return { ...s, nextId: stepToDelete.nextId };
                return s;
            }));
            if (selectedStepId === id) setSelectedStepId(null);
        }
    };

    const handleUpdateConfig = (key: string, value: any) => {
        if (!selectedStepId) return;
        setSteps(prev => prev.map(s => {
            if (s.id === selectedStepId) {
                return {
                    ...s,
                    config: { ...s.config, [key]: value },
                    // Update title based on type just for demo
                    title: key === 'actionType' ?
                        (value === 'message' ? '메시지 보내기' : value === 'email' ? '이메일 보내기' : '프로필 방문') : s.title
                };
            }
            return s;
        }));
    };

    const selectedStep = steps.find(s => s.id === selectedStepId);
    const orderedSteps = getOrderedSteps();

    return (
        <div className="flex h-full bg-gray-50">
            {/* Left: Canvas Area */}
            <div className="flex-1 overflow-auto p-10 flex justify-center">
                <div className="flex flex-col items-center pb-20">
                    <div className="mb-8 p-3 bg-white rounded-full shadow-sm border border-gray-200 text-gray-400 text-sm flex items-center gap-2">
                        <Play className="w-4 h-4" /> 시퀀스 시작
                    </div>

                    {orderedSteps.map((step, idx) => (
                        <WorkflowNode
                            key={step.id}
                            step={step}
                            isSelected={selectedStepId === step.id}
                            onSelect={() => setSelectedStepId(step.id)}
                            onAddAfter={() => handleAddStep(step.id)}
                            onDelete={() => handleDeleteStep(step.id)}
                            isLast={idx === orderedSteps.length - 1} // Actually not last if we iterate correctly, but strictly visually
                        />
                    ))}

                    <div className="mt-4 p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
                        시퀀스 종료
                    </div>
                </div>
            </div>

            {/* Right: Properties Panel */}
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800">
                        {selectedStep ? '단계 설정' : '워크플로우 설정'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {selectedStep ? '선택한 단계의 세부 설정을 변경하세요.' : '전체 시퀀스의 설정을 관리합니다.'}
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {selectedStep ? (
                        <div className="space-y-6">
                            {/* Type Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-700">단계 유형</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['action', 'delay', 'condition'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setSteps(prev => prev.map(s => s.id === selectedStep.id ? { ...s, type: type as any } : s))}
                                            className={`px-3 py-2 text-xs rounded border transition-colors ${selectedStep.type === type
                                                ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                                                : 'border-gray-200 hover:border-blue-300 text-gray-600'}`}
                                        >
                                            {type === 'action' ? '액션' : type === 'delay' ? '대기' : '조건'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedStep.type === 'action' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-700">액션 종류</label>
                                        <select
                                            className="w-full h-9 text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                            value={selectedStep.config?.actionType || 'message'}
                                            onChange={(e) => handleUpdateConfig('actionType', e.target.value)}
                                        >
                                            <option value="profile_visit">프로필 방문하기</option>
                                            <option value="invite">초대하기</option>
                                            <option value="email">이메일 보내기</option>
                                            <option value="message">DM 보내기</option>
                                        </select>
                                    </div>

                                    {selectedStep.config?.actionType === 'message' && (
                                        <div className="p-3 bg-gray-50 rounded text-xs text-gray-500">
                                            DM 템플릿을 선택하거나 작성할 수 있습니다.
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedStep.type === 'delay' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700">대기 시간 (시간)</label>
                                    <input
                                        type="number"
                                        className="w-full h-9 text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                        value={selectedStep.config?.duration || 24}
                                        onChange={(e) => handleUpdateConfig('duration', parseInt(e.target.value))}
                                    />
                                    <p className="text-xs text-gray-400">{(selectedStep.config?.duration || 24) / 24}일 동안 대기합니다.</p>
                                </div>
                            )}

                            <div className="pt-4 border-t">
                                <label className="text-xs font-semibold text-gray-700 block mb-2">설명 (메모)</label>
                                <input
                                    className="w-full h-9 text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedStep.description || ''}
                                    onChange={(e) => setSteps(prev => prev.map(s => s.id === selectedStep.id ? { ...s, description: e.target.value } : s))}
                                    placeholder="단계에 대한 설명을 입력하세요"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            <Settings className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">단계를 선택하여 설정을 변경하세요</p>
                        </div>
                    )}
                </div>

                <div className="p-5 border-t border-gray-200">
                    <CoreButton variant="primary" className="w-full justify-center" disabled={!selectedStep}>
                        설정 저장
                    </CoreButton>
                </div>
            </div>
        </div>
    );
}
