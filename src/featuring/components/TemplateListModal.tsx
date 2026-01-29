import { useState } from "react";
import {
    X, Plus, MessageSquare
} from "lucide-react";
import { CoreButton } from "../../design-system";
import { DMTemplate } from "../types";
import { CreateTemplateModal } from "./CreateTemplateModal";

interface TemplateListModalProps {
    isOpen: boolean;
    onClose: () => void;
    templates: DMTemplate[];
    onSave: (template: DMTemplate) => void;
    onDelete: (id: number) => void;
}

// Mock templates
const mockTemplates: DMTemplate[] = [
    {
        id: 1,
        name: "신상품 홍보 템플릿",
        automationGroupId: 1,
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
        automationGroupId: 1,
        dmGuide: "특별 할인 이벤트에 초대합니다! 🎁",
        ctaLinks: [
            { buttonName: "할인 받기", url: "", isVariable: true, variableName: "discount_url" },
            { buttonName: "브랜드 팔로우", url: "", isVariable: true, variableName: "profile_url" },
        ],
        status: "draft",
        triggerKeywords: ["이벤트", "할인"],
    },
];

export function TemplateListModal({ isOpen, onClose, templates = mockTemplates, onSave, onDelete }: TemplateListModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<DMTemplate | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<DMTemplate | undefined>(undefined);

    if (!isOpen) return null;

    const handleNewTemplate = () => {
        setSelectedTemplate(null);
        setEditingTemplate(undefined);
        setIsCreateModalOpen(true);
    };

    const handleEdit = (template: DMTemplate) => {
        setSelectedTemplate(template);
        setEditingTemplate(template);
        setIsCreateModalOpen(true);
    };

    const handleSaveTemplate = (template: DMTemplate) => {
        onSave(template);
        setIsCreateModalOpen(false);
        setEditingTemplate(undefined);
        // Keep the selection or clear it? Clearing it is safer.
        setSelectedTemplate(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-[480px] max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold text-[var(--ft-text-primary)]">
                        자동화 가이드 템플릿 관리
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                </div>

                {/* Template List */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-[var(--ft-border-primary)]">
                        <CoreButton variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={handleNewTemplate} className="w-full">
                            새 템플릿 만들기
                        </CoreButton>
                    </div>
                    <div className="flex-1 overflow-auto p-3 space-y-2">
                        {(templates.length > 0 ? templates : mockTemplates).map((template) => (
                            <button
                                key={template.id}
                                onClick={() => handleEdit(template)}
                                className={`w-full text-left p-3 rounded-xl border transition-colors ${selectedTemplate?.id === template.id
                                    ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)]'
                                    : 'border-[var(--ft-border-primary)] hover:border-[var(--ft-color-primary-300)]'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-[var(--ft-text-primary)] truncate">
                                        {template.name || "이름 없음"}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${template.status === 'saved'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {template.status === 'saved' ? '저장됨' : '초안'}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--ft-text-disabled)] truncate">
                                    버튼 {template.ctaLinks.length}개 • 변수 {template.ctaLinks.filter(c => c.isVariable).length}개
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                <CreateTemplateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleSaveTemplate}
                    initialData={editingTemplate}
                />
            </div>
        </div>
    );
}
