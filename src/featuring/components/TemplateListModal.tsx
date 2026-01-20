import { useState } from "react";
import {
    X, Plus, Trash2, Save, Edit2, Copy, Check,
    MessageSquare, Link2, Hash, Lock, Unlock, Eye
} from "lucide-react";
import { CoreButton } from "../../design-system";
import { DMTemplate, CTALink } from "../types";

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
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<DMTemplate>>({});

    if (!isOpen) return null;

    const handleNewTemplate = () => {
        const newTemplate: DMTemplate = {
            name: "새 템플릿",
            automationGroupId: 1,
            dmGuide: "",
            ctaLinks: [
                { buttonName: "버튼 1", url: "", isVariable: false },
            ],
            status: "draft",
            triggerKeywords: [],
        };
        setEditForm(newTemplate);
        setSelectedTemplate(null);
        setIsEditing(true);
    };

    const handleEdit = (template: DMTemplate) => {
        setEditForm({ ...template });
        setSelectedTemplate(template);
        setIsEditing(true);
    };

    const handleSave = () => {
        const templateToSave: DMTemplate = {
            id: selectedTemplate?.id,
            name: editForm.name || "새 템플릿",
            automationGroupId: editForm.automationGroupId || 1,
            dmGuide: editForm.dmGuide || "",
            ctaLinks: editForm.ctaLinks || [],
            status: "saved",
            triggerKeywords: editForm.triggerKeywords || [],
        };
        onSave(templateToSave);
        setIsEditing(false);
        setSelectedTemplate(null);
    };

    const handleAddButton = () => {
        if ((editForm.ctaLinks?.length || 0) >= 3) return;
        setEditForm(prev => ({
            ...prev,
            ctaLinks: [
                ...(prev.ctaLinks || []),
                { buttonName: `버튼 ${(prev.ctaLinks?.length || 0) + 1}`, url: "", isVariable: false }
            ]
        }));
    };

    const handleUpdateButton = (index: number, field: keyof CTALink, value: any) => {
        setEditForm(prev => ({
            ...prev,
            ctaLinks: prev.ctaLinks?.map((btn, i) =>
                i === index ? { ...btn, [field]: value } : btn
            )
        }));
    };

    const handleRemoveButton = (index: number) => {
        setEditForm(prev => ({
            ...prev,
            ctaLinks: prev.ctaLinks?.filter((_, i) => i !== index)
        }));
    };

    const handleAddKeyword = (keyword: string) => {
        if (!keyword.trim()) return;
        setEditForm(prev => ({
            ...prev,
            triggerKeywords: [...(prev.triggerKeywords || []), keyword.trim()]
        }));
    };

    const handleRemoveKeyword = (index: number) => {
        setEditForm(prev => ({
            ...prev,
            triggerKeywords: prev.triggerKeywords?.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-[900px] max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold text-[var(--ft-text-primary)]">
                        템플릿 관리
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-[var(--ft-bg-secondary)] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Template List */}
                    <div className="w-[280px] border-r border-[var(--ft-border-primary)] flex flex-col shrink-0">
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

                    {/* Editor Panel */}
                    <div className="flex-1 overflow-auto">
                        {isEditing ? (
                            <div className="p-6 space-y-6">
                                {/* Template Name */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-2">
                                        템플릿 이름
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.name || ""}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2.5 border border-[var(--ft-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                        placeholder="템플릿 이름 입력"
                                    />
                                </div>

                                {/* DM Message */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-2">
                                        <MessageSquare className="w-4 h-4 inline mr-1" />
                                        DM 메시지
                                    </label>
                                    <textarea
                                        value={editForm.dmGuide || ""}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, dmGuide: e.target.value }))}
                                        className="w-full px-4 py-3 border border-[var(--ft-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)] resize-none"
                                        rows={4}
                                        placeholder="인플루언서에게 보낼 DM 메시지를 입력하세요"
                                    />
                                </div>

                                {/* CTA Buttons */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-[var(--ft-text-primary)]">
                                            <Link2 className="w-4 h-4 inline mr-1" />
                                            CTA 버튼 (최대 3개)
                                        </label>
                                        {(editForm.ctaLinks?.length || 0) < 3 && (
                                            <button
                                                onClick={handleAddButton}
                                                className="text-sm text-[var(--ft-color-primary-600)] hover:underline flex items-center gap-1"
                                            >
                                                <Plus className="w-4 h-4" /> 버튼 추가
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        {editForm.ctaLinks?.map((btn, idx) => (
                                            <div key={idx} className="p-4 bg-[var(--ft-bg-secondary)] rounded-xl border border-[var(--ft-border-primary)]">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-medium text-[var(--ft-text-secondary)]">버튼 {idx + 1}</span>
                                                    <button
                                                        onClick={() => handleRemoveButton(idx)}
                                                        className="text-[var(--ft-text-disabled)] hover:text-[var(--ft-color-error-500)]"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <input
                                                        type="text"
                                                        value={btn.buttonName}
                                                        onChange={(e) => handleUpdateButton(idx, 'buttonName', e.target.value)}
                                                        className="px-3 py-2 border border-[var(--ft-border-primary)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                                        placeholder="버튼 텍스트"
                                                    />
                                                    {!btn.isVariable && (
                                                        <input
                                                            type="text"
                                                            value={btn.url}
                                                            onChange={(e) => handleUpdateButton(idx, 'url', e.target.value)}
                                                            className="px-3 py-2 border border-[var(--ft-border-primary)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                                            placeholder="URL"
                                                        />
                                                    )}
                                                    {btn.isVariable && (
                                                        <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                                                            <span className="text-purple-700 text-sm font-mono">{`{{${btn.variableName || 'url'}}}`}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={btn.isVariable || false}
                                                            onChange={(e) => {
                                                                handleUpdateButton(idx, 'isVariable', e.target.checked);
                                                                if (e.target.checked && !btn.variableName) {
                                                                    handleUpdateButton(idx, 'variableName', `button_${idx + 1}_url`);
                                                                }
                                                            }}
                                                            className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)]"
                                                        />
                                                        <span className="text-sm text-[var(--ft-text-secondary)]">변수로 설정 (인플루언서별 다른 URL)</span>
                                                    </label>
                                                    {btn.isVariable && (
                                                        <input
                                                            type="text"
                                                            value={btn.variableName || ""}
                                                            onChange={(e) => handleUpdateButton(idx, 'variableName', e.target.value.replace(/\s/g, '_'))}
                                                            className="px-2 py-1 border border-purple-200 rounded text-sm font-mono bg-purple-50 text-purple-700 w-32"
                                                            placeholder="변수명"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Trigger Keywords */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-2">
                                        <Hash className="w-4 h-4 inline mr-1" />
                                        트리거 키워드
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {editForm.triggerKeywords?.map((kw, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-700)] rounded-full text-sm"
                                            >
                                                {kw}
                                                <button onClick={() => handleRemoveKeyword(idx)} className="hover:text-[var(--ft-color-error-500)]">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="키워드 입력 후 Enter"
                                        className="w-full px-4 py-2 border border-[var(--ft-border-primary)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddKeyword((e.target as HTMLInputElement).value);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--ft-border-primary)]">
                                    <CoreButton variant="secondary" size="md" onClick={() => setIsEditing(false)}>
                                        취소
                                    </CoreButton>
                                    <CoreButton variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
                                        저장
                                    </CoreButton>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-[var(--ft-text-disabled)]">
                                <div className="text-center">
                                    <Edit2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-base">템플릿을 선택하거나 새로 만드세요</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
