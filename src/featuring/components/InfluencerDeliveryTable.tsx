import { useState } from "react";
import {
    Search, ChevronDown, Send, RefreshCw, X, Check,
    CheckCircle, Clock, XCircle, AlertCircle, ExternalLink,
    Settings, Wifi, WifiOff, Eye, Copy, Link, Upload,
    AlertTriangle, FileText, Filter, Plus
} from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { AutomationInfluencer, DMTemplate, CTALink } from "../types";
import { DeliveryLogDrawer } from "./DeliveryLogDrawer";
import { DeliveryPreviewModal } from "./DeliveryPreviewModal";
import { BulkUrlInputModal } from "./BulkUrlInputModal";
import { AddInfluencerModal } from "./AddInfluencerModal";

interface InfluencerDeliveryTableProps {
    influencers: AutomationInfluencer[];
    templates: DMTemplate[];
    groupName?: string;
    campaignName?: string;
    onOpenTemplateModal: () => void;
    onDeliver: (ids: number[]) => void;
    onRetry: (ids: number[]) => void;
    onCancel: (ids: number[]) => void;
    onAddInfluencer?: (influencers: Partial<AutomationInfluencer>[]) => void;
}

interface InfluencerWithTemplate extends AutomationInfluencer {
    selectedTemplateId?: number;
    variableValues?: Record<string, string>;
    deliveryStatus?: 'pending' | 'sent' | 'failed' | 'cancelled';
    errorCode?: string;
    lastDeliveredAt?: string;
}

// Mock templates with versioning
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
        version: 3,
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
        status: "saved",
        triggerKeywords: ["이벤트", "할인"],
        version: 2,
    },
];

interface ValidationError {
    influencerId: number;
    reason: string;
    code: string;
}

export function InfluencerDeliveryTable({
    influencers,
    templates = mockTemplates,
    groupName = "다이슨 에어랩 캠페인",
    campaignName = "26.03 다이슨 에어랩 멀티 스타일러 캠페인",
    onOpenTemplateModal,
    onDeliver,
    onRetry,
    onCancel,
    onAddInfluencer
}: InfluencerDeliveryTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [localData, setLocalData] = useState<InfluencerWithTemplate[]>(() =>
        influencers.map((inf, idx) => ({
            ...inf,
            selectedTemplateId: idx % 2 === 0 ? 1 : undefined,
            variableValues: idx % 2 === 0 ? { product_url: `https://brand.com/product/${inf.id}` } : {},
            deliveryStatus: ['sent', 'pending', 'failed', undefined, 'sent', 'pending'][idx % 6] as any,
            errorCode: idx % 6 === 2 ? 'API_ERROR' : undefined,
            lastDeliveredAt: idx % 6 === 2 ? '2026-01-20 14:35:05' : undefined,
        }))
    );

    // Modals state
    const [logDrawerOpen, setLogDrawerOpen] = useState(false);
    const [logDrawerInfluencer, setLogDrawerInfluencer] = useState<InfluencerWithTemplate | null>(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [previewInfluencer, setPreviewInfluencer] = useState<InfluencerWithTemplate | null>(null);
    const [bulkUrlModalOpen, setBulkUrlModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [addInfluencerModalOpen, setAddInfluencerModalOpen] = useState(false);

    // Add influencer handler
    const handleAddInfluencers = (newInfluencers: Partial<AutomationInfluencer>[]) => {
        const newData = newInfluencers.map((inf, idx) => ({
            ...inf,
            id: Date.now() + idx,
            selectedTemplateId: undefined,
            variableValues: {},
            deliveryStatus: undefined,
        })) as InfluencerWithTemplate[];
        setLocalData(prev => [...prev, ...newData]);
        onAddInfluencer?.(newInfluencers);
    };

    // Filter & Stats
    const filteredData = localData.filter(inf => {
        const matchesSearch =
            inf.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "undelivered" && !inf.deliveryStatus) ||
            inf.deliveryStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sentCount = localData.filter(i => i.deliveryStatus === 'sent').length;
    const pendingCount = localData.filter(i => i.deliveryStatus === 'pending').length;
    const failedCount = localData.filter(i => i.deliveryStatus === 'failed').length;
    const undeliveredCount = localData.filter(i => !i.deliveryStatus).length;
    const lastDeliveredAt = localData
        .filter(i => i.deliveryStatus === 'sent' || i.deliveryStatus === 'failed')
        .sort((a, b) => (b.lastDeliveredAt || '').localeCompare(a.lastDeliveredAt || ''))[0]?.lastDeliveredAt;

    // Selection handlers
    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? filteredData.map(i => i.id) : []);
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
    };

    // Template change handlers
    const handleTemplateChange = (influencerId: number, templateId: number) => {
        setLocalData(prev => prev.map(inf => {
            if (inf.id !== influencerId) return inf;

            const oldTemplate = templates.find(t => t.id === inf.selectedTemplateId);
            const newTemplate = templates.find(t => t.id === templateId);

            // Value preservation: keep values for matching variable keys
            const newVariables: Record<string, string> = {};
            newTemplate?.ctaLinks.filter(c => c.isVariable).forEach(cta => {
                if (cta.variableName && inf.variableValues?.[cta.variableName]) {
                    newVariables[cta.variableName] = inf.variableValues[cta.variableName];
                }
            });

            return { ...inf, selectedTemplateId: templateId, variableValues: newVariables };
        }));
    };

    const handleVariableChange = (influencerId: number, varName: string, value: string) => {
        // Auto-add https:// if missing
        let normalizedValue = value.trim();
        if (normalizedValue && !normalizedValue.startsWith('http://') && !normalizedValue.startsWith('https://')) {
            if (normalizedValue.includes('.')) {
                normalizedValue = 'https://' + normalizedValue;
            }
        }

        setLocalData(prev => prev.map(inf =>
            inf.id === influencerId
                ? { ...inf, variableValues: { ...inf.variableValues, [varName]: normalizedValue } }
                : inf
        ));
    };

    // Helpers
    const getSelectedTemplate = (templateId?: number) => {
        return templates.find(t => t.id === templateId);
    };

    const getVariableButtons = (templateId?: number): CTALink[] => {
        const template = getSelectedTemplate(templateId);
        return template?.ctaLinks.filter(c => c.isVariable) || [];
    };

    const isUrlValid = (url: string): boolean => {
        if (!url) return false;
        return url.startsWith('http://') || url.startsWith('https://');
    };

    const hasUrlError = (inf: InfluencerWithTemplate): boolean => {
        const vars = getVariableButtons(inf.selectedTemplateId);
        return vars.some(v => {
            const val = inf.variableValues?.[v.variableName || ''] || '';
            return !val || !isUrlValid(val);
        });
    };

    // Validation
    const validateDelivery = (ids: number[]): ValidationError[] => {
        const errors: ValidationError[] = [];

        ids.forEach(id => {
            const inf = localData.find(i => i.id === id);
            if (!inf) return;

            if (!inf.selectedTemplateId) {
                errors.push({ influencerId: id, reason: `${inf.displayName}: 템플릿을 선택해주세요`, code: 'TEMPLATE_MISSING' });
                return;
            }

            const vars = getVariableButtons(inf.selectedTemplateId);
            vars.forEach(v => {
                const val = inf.variableValues?.[v.variableName || ''] || '';
                if (!val) {
                    errors.push({ influencerId: id, reason: `${inf.displayName}: ${v.variableName}은 필수입니다`, code: 'URL_MISSING' });
                } else if (!isUrlValid(val)) {
                    errors.push({ influencerId: id, reason: `${inf.displayName}: ${v.variableName} URL 형식이 올바르지 않습니다`, code: 'URL_INVALID' });
                }
            });
        });

        return errors;
    };

    // Bulk actions
    const handleBulkDeliver = () => {
        if (selectedIds.length === 0) return;

        const errors = validateDelivery(selectedIds);
        if (errors.length > 0) {
            setValidationErrors(errors);
            setShowValidationModal(true);
            return;
        }

        const confirmMsg = `${selectedIds.length}명에게 템플릿을 전달합니다.\n취소는 대기 상태에서만 가능합니다.\n\n계속하시겠습니까?`;
        if (!confirm(confirmMsg)) return;

        // Update status to pending
        setLocalData(prev => prev.map(inf =>
            selectedIds.includes(inf.id)
                ? { ...inf, deliveryStatus: 'pending' as const, lastDeliveredAt: new Date().toLocaleString('ko-KR') }
                : inf
        ));

        onDeliver(selectedIds);
        setSelectedIds([]);
    };

    const handleBulkTemplateChange = (templateId: number) => {
        selectedIds.forEach(id => handleTemplateChange(id, templateId));
    };

    const handleBulkUrlApply = (mode: 'common' | 'individual', data: string | Record<string, string>) => {
        if (mode === 'common') {
            selectedIds.forEach(id => {
                const inf = localData.find(i => i.id === id);
                const vars = getVariableButtons(inf?.selectedTemplateId);
                if (vars.length > 0) {
                    handleVariableChange(id, vars[0].variableName || '', data as string);
                }
            });
        } else {
            const urlMap = data as Record<string, string>;
            Object.entries(urlMap).forEach(([handle, url]) => {
                const inf = localData.find(i => i.username === handle);
                if (inf) {
                    const vars = getVariableButtons(inf.selectedTemplateId);
                    if (vars.length > 0) {
                        handleVariableChange(inf.id, vars[0].variableName || '', url);
                    }
                }
            });
        }
    };

    // Copy URL
    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        // Would show toast in real app
    };

    // Open Log Drawer
    const handleOpenLogDrawer = (inf: InfluencerWithTemplate) => {
        setLogDrawerInfluencer(inf);
        setLogDrawerOpen(true);
    };

    // Open Preview
    const handleOpenPreview = (inf: InfluencerWithTemplate) => {
        setPreviewInfluencer(inf);
        setPreviewModalOpen(true);
    };

    // Retry/Cancel
    const handleRetry = (id: number) => {
        setLocalData(prev => prev.map(inf =>
            inf.id === id ? { ...inf, deliveryStatus: 'pending' as const } : inf
        ));
        onRetry([id]);
    };

    const handleCancelDelivery = (id: number) => {
        setLocalData(prev => prev.map(inf =>
            inf.id === id ? { ...inf, deliveryStatus: 'cancelled' as const } : inf
        ));
        onCancel([id]);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header Summary Bar */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-[var(--ft-border-primary)] px-6 py-3 shrink-0">
                <div className="flex items-center justify-between">
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
                            <p className="text-sm font-semibold text-[var(--ft-text-primary)]">{localData.length}명</p>
                        </div>
                    </div>
                    {lastDeliveredAt && (
                        <p className="text-xs text-[var(--ft-text-disabled)]">
                            마지막 전달: {lastDeliveredAt}
                        </p>
                    )}
                </div>
            </div>

            {/* Controls Header */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-4 shrink-0">
                {/* Title Row */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                            템플릿 전달 현황 관리
                        </h3>
                        <p className="text-sm text-[var(--ft-text-secondary)] mt-1">
                            인플루언서별 템플릿을 지정하고 변수 URL을 입력하세요
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CoreButton
                            variant="secondary"
                            size="md"
                            leftIcon={<Plus className="w-4 h-4" />}
                            onClick={() => setAddInfluencerModalOpen(true)}
                        >
                            인플루언서 추가
                        </CoreButton>
                        <CoreButton variant="secondary" size="md" leftIcon={<Settings className="w-4 h-4" />} onClick={onOpenTemplateModal}>
                            템플릿 관리
                        </CoreButton>
                        <CoreButton
                            variant="primary"
                            size="md"
                            leftIcon={<Send className="w-4 h-4" />}
                            onClick={handleBulkDeliver}
                            disabled={selectedIds.length === 0}
                        >
                            {selectedIds.length > 0 ? `${selectedIds.length}명 전달하기` : '전달하기'}
                        </CoreButton>
                    </div>
                </div>

                {/* Status Summary */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        >
                            <span className="text-sm text-[var(--ft-text-secondary)]">전체 {localData.length}</span>
                        </button>
                        <button
                            onClick={() => setStatusFilter('sent')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'sent' ? 'bg-green-100' : 'bg-green-50 hover:bg-green-100'}`}
                        >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">전달됨 {sentCount}</span>
                        </button>
                        <button
                            onClick={() => setStatusFilter('pending')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'pending' ? 'bg-yellow-100' : 'bg-yellow-50 hover:bg-yellow-100'}`}
                        >
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-700">대기중 {pendingCount}</span>
                        </button>
                        <button
                            onClick={() => setStatusFilter('failed')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'failed' ? 'bg-red-100' : 'bg-red-50 hover:bg-red-100'}`}
                        >
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-700">실패 {failedCount}</span>
                        </button>
                        <button
                            onClick={() => setStatusFilter('undelivered')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'undelivered' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            <AlertCircle className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">미전달 {undeliveredCount}</span>
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                        <input
                            type="text"
                            placeholder="인플루언서명 / 핸들 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-[var(--ft-border-primary)] rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                        />
                    </div>
                </div>
            </div>

            {/* Bulk Action Toolbar (visible when items selected) */}
            {selectedIds.length > 0 && (
                <div className="bg-[var(--ft-color-primary-50)] border-b border-[var(--ft-color-primary-200)] px-6 py-3 flex items-center gap-4 animate-in slide-in-from-top-1 shrink-0">
                    <span className="text-sm font-medium text-[var(--ft-color-primary-700)]">
                        {selectedIds.length}명 선택됨
                    </span>
                    <div className="w-px h-5 bg-[var(--ft-color-primary-200)]" />

                    {/* Bulk Template Select */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--ft-text-secondary)]">템플릿 일괄 지정:</span>
                        <select
                            onChange={(e) => e.target.value && handleBulkTemplateChange(Number(e.target.value))}
                            className="px-2 py-1 text-sm border border-[var(--ft-border-primary)] rounded bg-white"
                            defaultValue=""
                        >
                            <option value="" disabled>선택...</option>
                            {templates.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bulk URL Input */}
                    <CoreButton
                        variant="tertiary"
                        size="sm"
                        leftIcon={<Upload className="w-3.5 h-3.5" />}
                        onClick={() => setBulkUrlModalOpen(true)}
                    >
                        URL 일괄 입력
                    </CoreButton>

                    <div className="flex-1" />

                    <CoreButton
                        variant="tertiary"
                        size="sm"
                        onClick={() => setSelectedIds([])}
                    >
                        선택 해제
                    </CoreButton>
                </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="bg-[var(--ft-bg-secondary)] sticky top-0 z-10">
                        <tr className="border-b border-[var(--ft-border-secondary)]">
                            <th className="w-12 px-4 py-3">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)]"
                                />
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">
                                템플릿
                                <span className="ml-1 text-[10px] text-[var(--ft-text-disabled)]">(버전)</span>
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">
                                변수 URL <span className="text-red-500">*</span>
                            </th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">전달 상태</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((inf) => {
                            const variableButtons = getVariableButtons(inf.selectedTemplateId);
                            const isExpanded = expandedId === inf.id;
                            const template = getSelectedTemplate(inf.selectedTemplateId);
                            const urlError = hasUrlError(inf);

                            return (
                                <tr
                                    key={inf.id}
                                    className={`border-b border-[var(--ft-border-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)] ${selectedIds.includes(inf.id) ? 'bg-[var(--ft-color-primary-50)]' : ''
                                        } ${inf.deliveryStatus === 'failed' ? 'bg-red-50/50' : ''}`}
                                >
                                    <td className="w-12 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(inf.id)}
                                            onChange={(e) => handleSelectOne(inf.id, e.target.checked)}
                                            className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)]"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <CoreAvatar src={inf.profileImage} name={inf.displayName} size="sm" />
                                            <div>
                                                <p className="text-sm font-medium text-[var(--ft-text-primary)]">{inf.displayName}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-[var(--ft-text-disabled)]">@{inf.username}</span>
                                                    {inf.isConnected ? (
                                                        <Wifi className="w-3 h-3 text-green-500" />
                                                    ) : (
                                                        <WifiOff className="w-3 h-3 text-gray-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={inf.selectedTemplateId || ""}
                                                onChange={(e) => handleTemplateChange(inf.id, Number(e.target.value))}
                                                className="flex-1 px-3 py-1.5 text-sm border border-[var(--ft-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)] bg-white"
                                            >
                                                <option value="">템플릿 선택</option>
                                                {templates.map(t => (
                                                    <option key={t.id} value={t.id}>{t.name}</option>
                                                ))}
                                            </select>
                                            {template && (
                                                <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full shrink-0">
                                                    v{template.version || 1}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {variableButtons.length > 0 ? (
                                            <div className="space-y-1">
                                                {(isExpanded ? variableButtons : variableButtons.slice(0, 1)).map((btn, idx) => {
                                                    const value = inf.variableValues?.[btn.variableName || ''] || '';
                                                    const isValid = isUrlValid(value);
                                                    const isEmpty = !value;

                                                    return (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <span className={`text-xs font-mono px-1.5 py-0.5 rounded shrink-0 ${isEmpty ? 'bg-red-100 text-red-600' : 'bg-purple-50 text-purple-600'
                                                                }`}>
                                                                {btn.variableName}
                                                                <span className="text-red-500 ml-0.5">*</span>
                                                            </span>
                                                            <div className="flex-1 relative">
                                                                <input
                                                                    type="text"
                                                                    value={value}
                                                                    onChange={(e) => handleVariableChange(inf.id, btn.variableName || '', e.target.value)}
                                                                    placeholder="https://..."
                                                                    className={`w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 ${isEmpty || !isValid
                                                                        ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                                        : 'border-[var(--ft-border-primary)] focus:ring-[var(--ft-color-primary-500)]'
                                                                        }`}
                                                                />
                                                                {(!isValid && !isEmpty) && (
                                                                    <AlertTriangle className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-500" />
                                                                )}
                                                            </div>
                                                            {value && isValid && (
                                                                <>
                                                                    <button
                                                                        onClick={() => window.open(value, '_blank')}
                                                                        className="p-1 text-[var(--ft-text-disabled)] hover:text-[var(--ft-color-primary-600)] rounded"
                                                                        title="URL 열기"
                                                                    >
                                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleCopyUrl(value)}
                                                                        className="p-1 text-[var(--ft-text-disabled)] hover:text-[var(--ft-color-primary-600)] rounded"
                                                                        title="URL 복사"
                                                                    >
                                                                        <Copy className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                                {variableButtons.length > 1 && (
                                                    <button
                                                        onClick={() => setExpandedId(isExpanded ? null : inf.id)}
                                                        className="text-xs text-[var(--ft-color-primary-600)] hover:underline"
                                                    >
                                                        {isExpanded ? '접기' : `+${variableButtons.length - 1}개 더보기`}
                                                    </button>
                                                )}
                                            </div>
                                        ) : inf.selectedTemplateId ? (
                                            <span className="text-xs text-[var(--ft-text-disabled)]">변수 없음</span>
                                        ) : (
                                            <span className="text-xs text-[var(--ft-text-disabled)]">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => handleOpenLogDrawer(inf)}
                                            className="hover:opacity-80 cursor-pointer"
                                            title="상세 보기"
                                        >
                                            <div className="flex flex-col items-center gap-1">
                                                {inf.deliveryStatus === 'sent' && (
                                                    <CoreStatusBadge colorType="success" type="tint" size="sm">전달됨</CoreStatusBadge>
                                                )}
                                                {inf.deliveryStatus === 'pending' && (
                                                    <CoreStatusBadge colorType="warning" type="tint" size="sm">대기중</CoreStatusBadge>
                                                )}
                                                {inf.deliveryStatus === 'failed' && (
                                                    <>
                                                        <CoreStatusBadge colorType="error" type="tint" size="sm">실패</CoreStatusBadge>
                                                        <span className="text-[10px] text-red-500">{inf.errorCode}</span>
                                                    </>
                                                )}
                                                {inf.deliveryStatus === 'cancelled' && (
                                                    <CoreStatusBadge colorType="default" type="tint" size="sm">취소됨</CoreStatusBadge>
                                                )}
                                                {!inf.deliveryStatus && (
                                                    <CoreStatusBadge colorType="default" type="tint" size="sm">미전달</CoreStatusBadge>
                                                )}
                                            </div>
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            {/* Preview button - always visible */}
                                            <button
                                                onClick={() => handleOpenPreview(inf)}
                                                disabled={!inf.selectedTemplateId}
                                                className="p-1.5 text-[var(--ft-text-secondary)] hover:bg-[var(--ft-bg-secondary)] rounded-lg disabled:opacity-40"
                                                title="미리보기"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            {/* 전달 button - for undelivered */}
                                            {(!inf.deliveryStatus || inf.deliveryStatus === 'cancelled') && (
                                                <button
                                                    onClick={() => {
                                                        if (!inf.selectedTemplateId) {
                                                            alert('템플릿을 먼저 선택해주세요.');
                                                            return;
                                                        }
                                                        if (urlError) {
                                                            alert('URL을 올바르게 입력해주세요.');
                                                            return;
                                                        }
                                                        if (confirm(`${inf.displayName}에게 전달하시겠습니까?`)) {
                                                            setLocalData(prev => prev.map(i =>
                                                                i.id === inf.id ? { ...i, deliveryStatus: 'pending' as const } : i
                                                            ));
                                                            onDeliver([inf.id]);
                                                        }
                                                    }}
                                                    disabled={!inf.selectedTemplateId || urlError}
                                                    className="px-2 py-1 text-xs text-[var(--ft-color-primary-600)] hover:bg-[var(--ft-color-primary-50)] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    전달
                                                </button>
                                            )}

                                            {/* 재전달 button - for sent or failed */}
                                            {(inf.deliveryStatus === 'sent' || inf.deliveryStatus === 'failed') && (
                                                <button
                                                    onClick={() => handleRetry(inf.id)}
                                                    className="px-2 py-1 text-xs text-[var(--ft-color-primary-600)] hover:bg-[var(--ft-color-primary-50)] rounded-lg"
                                                >
                                                    재전달
                                                </button>
                                            )}

                                            {/* 취소 button - for pending */}
                                            {inf.deliveryStatus === 'pending' && (
                                                <button
                                                    onClick={() => {
                                                        if (confirm('전달을 취소하시겠습니까?')) {
                                                            handleCancelDelivery(inf.id);
                                                        }
                                                    }}
                                                    className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    취소
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <DeliveryLogDrawer
                isOpen={logDrawerOpen}
                onClose={() => setLogDrawerOpen(false)}
                influencer={logDrawerInfluencer ? {
                    id: logDrawerInfluencer.id,
                    displayName: logDrawerInfluencer.displayName,
                    username: logDrawerInfluencer.username,
                    profileImage: logDrawerInfluencer.profileImage,
                    templateName: getSelectedTemplate(logDrawerInfluencer.selectedTemplateId)?.name,
                    status: logDrawerInfluencer.deliveryStatus,
                    errorCode: logDrawerInfluencer.errorCode,
                    lastDeliveredAt: logDrawerInfluencer.lastDeliveredAt,
                } : null}
                onRetry={handleRetry}
                onCancel={handleCancelDelivery}
            />

            <DeliveryPreviewModal
                isOpen={previewModalOpen}
                onClose={() => setPreviewModalOpen(false)}
                influencer={previewInfluencer ? {
                    displayName: previewInfluencer.displayName,
                    username: previewInfluencer.username,
                    profileImage: previewInfluencer.profileImage,
                } : null}
                template={previewInfluencer ? getSelectedTemplate(previewInfluencer.selectedTemplateId) || null : null}
                variableValues={previewInfluencer?.variableValues || {}}
            />

            <BulkUrlInputModal
                isOpen={bulkUrlModalOpen}
                onClose={() => setBulkUrlModalOpen(false)}
                variableName="product_url"
                selectedCount={selectedIds.length}
                onApply={handleBulkUrlApply}
            />

            {/* Validation Error Modal */}
            {showValidationModal && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowValidationModal(false)} />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">전달 불가</h3>
                                    <p className="text-sm text-[var(--ft-text-secondary)]">{validationErrors.length}건의 오류가 있습니다</p>
                                </div>
                            </div>
                            <div className="max-h-60 overflow-auto mb-4">
                                {validationErrors.map((err, idx) => (
                                    <div key={idx} className="flex items-start gap-2 py-2 border-b border-[var(--ft-border-primary)] last:border-0">
                                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <p className="text-sm text-[var(--ft-text-primary)]">{err.reason}</p>
                                    </div>
                                ))}
                            </div>
                            <CoreButton variant="secondary" size="md" onClick={() => setShowValidationModal(false)} className="w-full">
                                확인
                            </CoreButton>
                        </div>
                    </div>
                </>
            )}

            {/* Add Influencer Modal */}
            <AddInfluencerModal
                isOpen={addInfluencerModalOpen}
                onClose={() => setAddInfluencerModalOpen(false)}
                onAdd={handleAddInfluencers}
            />
        </div>
    );
}
