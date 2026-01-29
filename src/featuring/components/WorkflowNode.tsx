import React from "react";
import {
    MessageSquare, Mail, UserPlus, MousePointerClick,
    Clock, GitFork, Play, StopCircle, MoreHorizontal, Plus, Trash2
} from "lucide-react";
import { WorkflowStep, WorkflowStepType, ActionType } from "../types";
import { cn } from "../../app/components/ui/utils";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "../../app/components/ui/dropdown-menu";

interface WorkflowNodeProps {
    step: WorkflowStep;
    isSelected: boolean;
    onSelect: () => void;
    onAddAfter: () => void;
    onDelete: () => void;
    isLast?: boolean;
}

const getIcon = (step: WorkflowStep) => {
    switch (step.type) {
        case 'start': return <Play className="w-5 h-5 text-green-600" />;
        case 'end': return <StopCircle className="w-5 h-5 text-gray-400" />;
        case 'delay': return <Clock className="w-5 h-5 text-amber-500" />;
        case 'condition': return <GitFork className="w-5 h-5 text-purple-500" />;
        case 'action':
            switch (step.config?.actionType) {
                case 'email': return <Mail className="w-5 h-5 text-blue-500" />;
                case 'invite': return <UserPlus className="w-5 h-5 text-indigo-500" />;
                case 'profile_visit': return <MousePointerClick className="w-5 h-5 text-orange-500" />;
                default: return <MessageSquare className="w-5 h-5 text-blue-500" />;
            }
        default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
};

const getBorderColor = (step: WorkflowStep, isSelected: boolean) => {
    if (isSelected) return "border-[var(--ft-color-primary-500)] ring-1 ring-[var(--ft-color-primary-500)]";
    switch (step.type) {
        case 'start': return "border-green-200 hover:border-green-300";
        case 'end': return "border-gray-200";
        case 'delay': return "border-amber-200 hover:border-amber-300";
        case 'condition': return "border-purple-200 hover:border-purple-300";
        case 'action': return "border-blue-200 hover:border-blue-300";
        default: return "border-gray-200 hover:border-gray-300";
    }
};

export function WorkflowNode({ step, isSelected, onSelect, onAddAfter, onDelete, isLast }: WorkflowNodeProps) {
    if (step.type === 'end') return null; // Handle end differently or not show it

    return (
        <div className="flex flex-col items-center relative group">
            {/* Node Card */}
            <div
                className={cn(
                    "w-[320px] bg-white rounded-xl border p-4 shadow-sm transition-all cursor-pointer relative",
                    getBorderColor(step, isSelected)
                )}
                onClick={onSelect}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg bg-opacity-10",
                            step.type === 'delay' ? "bg-amber-100" :
                                step.type === 'condition' ? "bg-purple-100" :
                                    step.type === 'start' ? "bg-green-100" : "bg-blue-100"
                        )}>
                            {getIcon(step)}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                            {step.description && <p className="text-xs text-red-500 font-medium">{step.description}</p>}
                        </div>
                    </div>

                    {step.type !== 'start' && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-1 hover:bg-gray-100 rounded text-gray-400" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e: React.MouseEvent) => { e.stopPropagation(); onDelete(); }} className="text-red-600 focus:text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" /> 삭제
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* Specific Config Preview (Optional) */}
                {step.config?.duration && (
                    <div className="mt-2 text-xs bg-gray-50 p-2 rounded text-gray-600">
                        {step.config.duration}시간 대기
                    </div>
                )}
            </div>

            {/* Connector Line & Add Button */}
            {!isLast && (
                <div className="h-12 flex flex-col items-center justify-center relative w-full">
                    <div className="w-px h-full bg-gray-200 absolute top-0 bottom-0 left-1/2 -ml-px z-0" />
                    <button
                        className="z-10 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-500 hover:shadow-md transition-all scale-0 group-hover:scale-100"
                        onClick={(e) => { e.stopPropagation(); onAddAfter(); }}
                        title="다음 단계 추가"
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}
