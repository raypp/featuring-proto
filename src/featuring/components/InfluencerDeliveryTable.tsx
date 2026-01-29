import { useState, useMemo, useCallback, useRef } from "react";
import { Search, Plus, Settings, Send, Upload, Trash2, CheckCircle2, X, FileText } from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { AutomationInfluencer, DMTemplate } from "../types";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, ICellRendererParams, RowSelectionOptions, SelectionChangedEvent, GridApi } from "ag-grid-community";
import { customAgGridTheme } from "../utils/agGridTheme";

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

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

// Extended type for local state - Omit conflicting fields
interface ExtendedInfluencer extends Omit<AutomationInfluencer, 'automationStatus' | 'status'> {
    selectedTemplateId?: number;
    deliveryStatus?: 'pending' | 'sent' | 'failed' | 'cancelled';
    lastDeliveredAt?: string;
    automationStatus?: 'running' | 'stopped' | 'error';
    button1Url?: string;
    button2Url?: string;
    button3Url?: string;
    // Keep original status for reference if needed, but we use deliveryStatus for display
    originalStatus?: AutomationInfluencer['status'];
}

export function InfluencerDeliveryTable({
    influencers,
    templates,
    groupName = "다이슨 에어랩 캠페인",
    campaignName = "26.03 다이슨 에어랩 멀티 스타일러 캠페인",
    onOpenTemplateModal,
    onDeliver,
    onRetry,
    onCancel,
    onAddInfluencer
}: InfluencerDeliveryTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState<ExtendedInfluencer[]>([]);
    const [bulkTemplateId, setBulkTemplateId] = useState<number | "">("");
    const gridRef = useRef<AgGridReact<ExtendedInfluencer>>(null);

    // Initialize local data with mock values for new columns
    const [rowData, setRowData] = useState<ExtendedInfluencer[]>(() =>
        influencers.map((inf, idx) => ({
            ...inf,
            originalStatus: inf.status,
            selectedTemplateId: idx % 2 === 0 ? templates[0]?.id : undefined,
            deliveryStatus: ['sent', 'pending', 'failed', undefined][idx % 4] as any,
            lastDeliveredAt: idx % 4 === 0 ? '2026-01-01' : undefined,
            automationStatus: ['running', 'stopped', 'error'][idx % 3] as any,
            button1Url: `https://link.com/${inf.username}/1`,
            button2Url: `https://link.com/${inf.username}/2`,
            button3Url: `https://link.com/${inf.username}/3`,
        }))
    );

    // Filter Logic
    const filteredData = useMemo(() => {
        return rowData.filter(inf =>
            inf.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [rowData, searchTerm]);

    // Handlers
    const handleTemplateChange = useCallback((id: number, templateId: number) => {
        setRowData(prev => prev.map(row => row.id === id ? { ...row, selectedTemplateId: templateId } : row));
    }, []);

    const handleUrlChange = useCallback((id: number, field: 'button1Url' | 'button2Url' | 'button3Url', value: string) => {
        setRowData(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
    }, []);

    // Selection change handler
    const handleSelectionChanged = useCallback((event: SelectionChangedEvent<ExtendedInfluencer>) => {
        const selected = event.api.getSelectedRows();
        setSelectedRows(selected);
    }, []);

    // Bulk template apply handler
    const handleBulkTemplateApply = useCallback(() => {
        if (!bulkTemplateId || selectedRows.length === 0) return;

        const selectedIds = selectedRows.map(row => row.id);
        setRowData(prev => prev.map(row =>
            selectedIds.includes(row.id)
                ? { ...row, selectedTemplateId: bulkTemplateId as number }
                : row
        ));

        // Clear selection after applying
        setBulkTemplateId("");
        gridRef.current?.api?.deselectAll();
        setSelectedRows([]);
    }, [bulkTemplateId, selectedRows]);

    // Clear selection handler
    const handleClearSelection = useCallback(() => {
        gridRef.current?.api?.deselectAll();
        setSelectedRows([]);
        setBulkTemplateId("");
    }, []);

    // Column Definitions
    const columnDefs = useMemo<ColDef<ExtendedInfluencer>[]>(() => [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 50,
            pinned: 'left',
            lockPosition: 'left',
            suppressMovable: true,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            headerName: "No.",
            width: 60,
            valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ft-text-disabled)' },
            pinned: 'left'
        },
        {
            headerName: "인플루언서",
            field: "displayName",
            width: 220,
            pinned: 'left',
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => (
                <div className="flex items-center gap-3 h-full">
                    <CoreAvatar src={params.data?.profileImage} name={params.data?.displayName || ''} size="sm" />
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-medium text-[var(--ft-text-primary)] leading-tight">{params.value}</span>
                        <span className="text-xs text-[var(--ft-text-disabled)] overflow-hidden text-ellipsis max-w-[120px]">@{params.data?.username}</span>
                    </div>
                </div>
            ),
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            headerName: "스튜디오 연결 상태",
            field: "isConnected",
            width: 140,
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => (
                <div className="flex items-center justify-center w-full h-full">
                    {params.value ? (
                        <div className="px-2 py-0.5 bg-green-50 rounded-md border border-green-100 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-xs font-medium text-green-700">연결됨</span>
                        </div>
                    ) : (
                        <div className="px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            <span className="text-xs font-medium text-gray-500">미연결</span>
                        </div>
                    )}
                </div>
            ),
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            headerName: "선택됨 템플릿",
            field: "selectedTemplateId",
            width: 200,
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => (
                <div className="w-full px-1">
                    <select
                        className="w-full h-8 text-sm border border-[var(--ft-border-primary)] rounded px-2 bg-white focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                        value={params.value || ""}
                        onChange={(e) => handleTemplateChange(params.data!.id, Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()} // Prevent row selection
                    >
                        <option value="">자동화 템플릿 선택</option>
                        {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>
            ),
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            headerName: "전달 여부",
            field: "deliveryStatus",
            width: 120,
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => {
                const status = params.value;
                switch (status) {
                    case 'sent': return <CoreStatusBadge colorType="success" size="sm" type="tint">전달됨</CoreStatusBadge>;
                    case 'pending': return <CoreStatusBadge colorType="warning" size="sm" type="tint">대기중</CoreStatusBadge>;
                    case 'failed': return <CoreStatusBadge colorType="error" size="sm" type="tint">실패</CoreStatusBadge>;
                    default: return <CoreStatusBadge colorType="default" size="sm" type="tint">미전달</CoreStatusBadge>;
                }
            },
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            headerName: "마지막 전달일",
            field: "lastDeliveredAt",
            width: 120,
            valueFormatter: (params) => params.value || '-',
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ft-text-secondary)' }
        },
        {
            headerName: "자동화 상태",
            field: "automationStatus",
            width: 120,
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => {
                const status = params.value;
                switch (status) {
                    case 'running': return <CoreStatusBadge colorType="success" size="sm" type="filled">진행 중</CoreStatusBadge>;
                    case 'stopped': return <CoreStatusBadge colorType="default" size="sm" type="filled">중단됨</CoreStatusBadge>;
                    case 'error': return <CoreStatusBadge colorType="error" size="sm" type="filled">오류</CoreStatusBadge>;
                    default: return <span className="text-[var(--ft-text-disabled)]">-</span>;
                }
            },
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            headerName: "버튼1 URL",
            field: "button1Url",
            width: 200,
            editable: true,
            cellEditor: 'agTextCellEditor',
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => (
                <div className="w-full h-full flex items-center px-1">
                    <input
                        type="text"
                        value={params.value || ''}
                        onChange={(e) => handleUrlChange(params.data!.id, 'button1Url', e.target.value)}
                        className="w-full h-8 text-sm border border-[var(--ft-border-primary)] rounded px-2 focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                        placeholder="https://"
                    />
                </div>
            )
        },
        {
            headerName: "버튼2 URL",
            field: "button2Url",
            width: 200,
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => (
                <div className="w-full h-full flex items-center px-1">
                    <input
                        type="text"
                        value={params.value || ''}
                        onChange={(e) => handleUrlChange(params.data!.id, 'button2Url', e.target.value)}
                        className="w-full h-8 text-sm border border-[var(--ft-border-primary)] rounded px-2 focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                        placeholder="https://"
                    />
                </div>
            )
        },
        {
            headerName: "버튼3 URL",
            field: "button3Url",
            width: 200,
            cellRenderer: (params: ICellRendererParams<ExtendedInfluencer>) => (
                <div className="w-full h-full flex items-center px-1">
                    <input
                        type="text"
                        value={params.value || ''}
                        onChange={(e) => handleUrlChange(params.data!.id, 'button3Url', e.target.value)}
                        className="w-full h-8 text-sm border border-[var(--ft-border-primary)] rounded px-2 focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                        placeholder="https://"
                    />
                </div>
            )
        }
    ], [templates, handleTemplateChange, handleUrlChange]);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
        suppressMovable: true,
        headerClass: "bg-[var(--ft-bg-secondary)] text-[var(--ft-text-secondary)] font-medium text-xs"
    }), []);

    const selectionOptions = useMemo<RowSelectionOptions>(() => ({
        mode: 'multiRow',
        headerCheckbox: false,
        checkboxes: false,
        enableClickSelection: true
    }), []);

    return (
        <div className="h-full flex flex-col bg-white">
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
                            <p className="text-sm font-semibold text-[var(--ft-text-primary)]">{rowData.length}명</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--ft-border-primary)]">
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                        <input
                            type="text"
                            placeholder="인플루언서 검색"
                            className="w-full h-9 pl-9 pr-4 text-sm bg-white border border-[var(--ft-border-primary)] rounded-md focus:border-[var(--ft-color-primary-500)] focus:outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <CoreButton
                        variant="secondary"
                        size="md"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={() => onAddInfluencer?.([])}
                    >
                        인플루언서 추가
                    </CoreButton>
                    <CoreButton variant="secondary" size="md" leftIcon={<Settings className="w-4 h-4" />} onClick={onOpenTemplateModal}>
                        자동화 가이드 템플릿 관리
                    </CoreButton>
                    <CoreButton variant="secondary" size="md" leftIcon={<Upload className="w-4 h-4" />} onClick={() => { }}>
                        엑셀 업로드
                    </CoreButton>
                </div>
            </div>

            {/* Bulk Action Bar - Always visible, active when rows selected */}
            <div className={`px-6 py-3 border-b flex items-center justify-between transition-all duration-200 ${selectedRows.length > 0
                ? 'bg-gradient-to-r from-[var(--ft-color-primary-50)] to-[var(--ft-color-primary-25)] border-[var(--ft-color-primary-200)]'
                : 'bg-gray-50/50 border-[var(--ft-border-primary)]'
                }`}>
                <div className="flex items-center gap-4">
                    {/* Selection Count */}
                    <div className={`flex items-center gap-2 ${selectedRows.length > 0 ? '' : 'opacity-50'}`}>
                        <CheckCircle2 className={`w-5 h-5 ${selectedRows.length > 0 ? 'text-[var(--ft-color-primary-600)]' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${selectedRows.length > 0 ? 'text-[var(--ft-color-primary-700)]' : 'text-gray-400'}`}>
                            {selectedRows.length > 0 ? `${selectedRows.length}명 선택됨` : '선택된 항목 없음'}
                        </span>
                    </div>

                    <div className={`w-px h-6 ${selectedRows.length > 0 ? 'bg-[var(--ft-color-primary-200)]' : 'bg-gray-200'}`} />

                    {/* Bulk Template Apply */}
                    <div className={`flex items-center gap-2 ${selectedRows.length > 0 ? '' : 'opacity-50'}`}>
                        <FileText className="w-4 h-4 text-[var(--ft-text-secondary)]" />
                        <span className="text-sm text-[var(--ft-text-secondary)]">템플릿 일괄 적용:</span>
                        <select
                            value={bulkTemplateId}
                            onChange={(e) => setBulkTemplateId(e.target.value ? Number(e.target.value) : "")}
                            disabled={selectedRows.length === 0}
                            className={`h-8 px-3 text-sm bg-white border rounded-md focus:outline-none focus:border-[var(--ft-color-primary-500)] min-w-[200px] ${selectedRows.length > 0
                                ? 'border-[var(--ft-border-primary)] cursor-pointer'
                                : 'border-gray-200 cursor-not-allowed text-gray-400'
                                }`}
                        >
                            <option value="">템플릿 선택</option>
                            {templates.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <CoreButton
                            variant="secondary"
                            size="sm"
                            onClick={handleBulkTemplateApply}
                            disabled={!bulkTemplateId || selectedRows.length === 0}
                        >
                            적용
                        </CoreButton>
                    </div>

                    <div className={`w-px h-6 ${selectedRows.length > 0 ? 'bg-[var(--ft-color-primary-200)]' : 'bg-gray-200'}`} />

                    {/* Deliver Button - Same Row */}
                    <CoreButton
                        variant="primary"
                        size="sm"
                        leftIcon={<Send className="w-4 h-4" />}
                        onClick={() => onDeliver(selectedRows.map(r => r.id))}
                        disabled={selectedRows.length === 0}
                    >
                        {selectedRows.length > 0 ? `${selectedRows.length}명에게 전달` : '전달하기'}
                    </CoreButton>
                </div>

                {/* Clear Selection */}
                {selectedRows.length > 0 && (
                    <button
                        onClick={handleClearSelection}
                        className="flex items-center gap-1 text-sm text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] transition-colors"
                    >
                        <X className="w-4 h-4" />
                        선택 해제
                    </button>
                )}
            </div>

            {/* Grid Container */}
            <div className="flex-1 overflow-hidden">
                <AgGridReact
                    ref={gridRef}
                    theme={customAgGridTheme}
                    rowData={filteredData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={selectionOptions}
                    onSelectionChanged={handleSelectionChanged}
                    pagination={true}
                    paginationPageSize={20}
                    rowHeight={60}
                    headerHeight={40}
                    animateRows={true}
                />
            </div>
        </div>
    );
}
