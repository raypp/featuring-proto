import { useState, useMemo, useCallback, useRef } from "react";
import { Search, Plus, Settings, Upload, CheckCircle2, X, Send, Info } from "lucide-react";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";
import { CollaborationInfluencer, DMTemplate } from "../types";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, ICellRendererParams, RowSelectionOptions, SelectionChangedEvent, RowClickedEvent } from "ag-grid-community";
import { customAgGridTheme } from "../utils/agGridTheme";
import * as Tooltip from "@radix-ui/react-tooltip";

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface InfluencerSummaryTableProps {
    influencers: CollaborationInfluencer[];
    templates: DMTemplate[];
    selectedInfluencerId: number | null;
    onInfluencerSelect: (influencerId: number) => void;
    onOpenTemplateModal: () => void;
    onAddInfluencer?: () => void;
    onBulkApplyTemplate?: (influencerIds: number[], templateId: number) => void;
    onBulkDeliver?: (influencerIds: number[]) => void;
}

export function InfluencerSummaryTable({
    influencers,
    templates,
    selectedInfluencerId,
    onInfluencerSelect,
    onOpenTemplateModal,
    onAddInfluencer,
    onBulkApplyTemplate,
    onBulkDeliver
}: InfluencerSummaryTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState<CollaborationInfluencer[]>([]);
    const [bulkTemplateId, setBulkTemplateId] = useState<number | "">("");
    const gridRef = useRef<AgGridReact<CollaborationInfluencer>>(null);

    // Filter Logic
    const filteredData = useMemo(() => {
        return influencers.filter(inf =>
            inf.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [influencers, searchTerm]);

    // Selection change handler
    const handleSelectionChanged = useCallback((event: SelectionChangedEvent<CollaborationInfluencer>) => {
        const selected = event.api.getSelectedRows();
        setSelectedRows(selected);
    }, []);

    // Row click handler
    const handleRowClicked = useCallback((event: RowClickedEvent<CollaborationInfluencer>) => {
        if (event.data) {
            onInfluencerSelect(event.data.influencerId);
        }
    }, [onInfluencerSelect]);

    // Bulk template apply handler
    const handleBulkTemplateApply = useCallback(() => {
        if (!bulkTemplateId || selectedRows.length === 0) return;
        const selectedIds = selectedRows.map(row => row.influencerId);
        onBulkApplyTemplate?.(selectedIds, bulkTemplateId as number);
        setBulkTemplateId("");
        gridRef.current?.api?.deselectAll();
        setSelectedRows([]);
    }, [bulkTemplateId, selectedRows, onBulkApplyTemplate]);

    // Clear selection handler
    const handleClearSelection = useCallback(() => {
        gridRef.current?.api?.deselectAll();
        setSelectedRows([]);
        setBulkTemplateId("");
    }, []);

    // Column Definitions
    const columnDefs = useMemo<ColDef<CollaborationInfluencer>[]>(() => [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 50,
            pinned: 'left' as const,
            lockPosition: 'left' as const,
            suppressMovable: true,
        },
        {
            headerName: "인플루언서",
            field: "displayName",
            width: 180,
            pinned: 'left' as const,
            cellRenderer: (params: ICellRendererParams<CollaborationInfluencer>) => (
                <div className={`flex items-center gap-3 h-full cursor-pointer ${params.data?.influencerId === selectedInfluencerId ? 'bg-[var(--ft-color-primary-50)]' : ''
                    }`}>
                    <CoreAvatar src={params.data?.profileImage} name={params.data?.displayName || ''} size="sm" />
                    <div className="flex flex-col justify-center min-w-0">
                        <span className="text-sm font-medium text-[var(--ft-text-primary)] leading-tight truncate">{params.value}</span>
                        <span className="text-xs text-[var(--ft-text-disabled)] truncate">@{params.data?.username}</span>
                    </div>
                </div>
            ),
        },
        {
            headerName: "스튜디오 연결",
            field: "isConnected",
            width: 110,
            cellRenderer: (params: ICellRendererParams<CollaborationInfluencer>) => (
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
        },
        {
            headerName: "템플릿 요약",
            field: "templateCount",
            width: 130,
            cellRenderer: (params: ICellRendererParams<CollaborationInfluencer>) => {
                const count = params.value || 0;
                const names = params.data?.templateNames || [];

                if (count === 0) {
                    return <span className="text-xs text-[var(--ft-text-disabled)]">적용된 템플릿 없음</span>;
                }

                return (
                    <Tooltip.Provider delayDuration={200}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                    <span className="text-sm font-medium text-[var(--ft-color-primary-600)]">
                                        템플릿 {count}개 적용됨
                                    </span>
                                    <Info className="w-3.5 h-3.5 text-[var(--ft-text-disabled)]" />
                                </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs max-w-[200px] z-50"
                                    sideOffset={5}
                                >
                                    <ul className="space-y-1">
                                        {names.map((name, idx) => (
                                            <li key={idx}>• {name}</li>
                                        ))}
                                    </ul>
                                    <Tooltip.Arrow className="fill-gray-900" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                );
            },
        },
        {
            headerName: "전달 요약",
            field: "deliverySummary",
            width: 180,
            cellRenderer: (params: ICellRendererParams<CollaborationInfluencer>) => {
                const summary = params.value;
                if (!summary) return <span className="text-[var(--ft-text-disabled)]">-</span>;

                return (
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-600 font-medium">전달됨 {summary.delivered}</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-amber-600 font-medium">대기 {summary.pending}</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-red-600 font-medium">실패 {summary.failed}</span>
                    </div>
                );
            },
        },
        {
            headerName: "자동화 상태",
            field: "automationStatus",
            width: 100,
            cellRenderer: (params: ICellRendererParams<CollaborationInfluencer>) => {
                const status = params.value;
                switch (status) {
                    case 'running': return <CoreStatusBadge colorType="success" size="sm" type="filled">진행 중</CoreStatusBadge>;
                    case 'stopped': return <CoreStatusBadge colorType="default" size="sm" type="filled">중단됨</CoreStatusBadge>;
                    case 'error': return <CoreStatusBadge colorType="error" size="sm" type="filled">오류</CoreStatusBadge>;
                    default: return <span className="text-[var(--ft-text-disabled)]">-</span>;
                }
            },
        },
        {
            headerName: "마지막 전달일",
            field: "lastDeliveredAt",
            width: 110,
            valueFormatter: (params) => {
                if (!params.value) return '-';
                return new Date(params.value).toLocaleDateString('ko-KR');
            },
        }
    ], [selectedInfluencerId]);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
        suppressMovable: true,
        headerClass: "bg-[var(--ft-bg-secondary)] text-[var(--ft-text-secondary)] font-medium text-xs"
    }), []);

    const selectionOptions = useMemo<RowSelectionOptions>(() => ({
        mode: 'multiRow',
        headerCheckbox: true,
        checkboxes: true,
        enableClickSelection: false
    }), []);

    const getRowClass = useCallback((params: { data?: CollaborationInfluencer }) => {
        if (params.data?.influencerId === selectedInfluencerId) {
            return 'bg-[var(--ft-color-primary-50)]';
        }
        return '';
    }, [selectedInfluencerId]);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Controls Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--ft-border-primary)] shrink-0">
                <div className="relative w-52">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                    <input
                        type="text"
                        placeholder="인플루언서 검색"
                        className="w-full h-8 pl-9 pr-4 text-sm bg-white border border-[var(--ft-border-primary)] rounded-md focus:border-[var(--ft-color-primary-500)] focus:outline-none transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <CoreButton
                        variant="tertiary"
                        size="sm"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={onAddInfluencer}
                    >
                        추가
                    </CoreButton>
                    <CoreButton variant="tertiary" size="sm" leftIcon={<Settings className="w-4 h-4" />} onClick={onOpenTemplateModal}>
                        템플릿
                    </CoreButton>
                </div>
            </div>

            {/* Bulk Action Bar */}
            <div className={`px-4 py-2.5 border-b flex items-center justify-between transition-all duration-200 shrink-0 ${selectedRows.length > 0
                ? 'bg-gradient-to-r from-[var(--ft-color-primary-50)] to-[var(--ft-color-primary-25)] border-[var(--ft-color-primary-200)]'
                : 'bg-gray-50/50 border-[var(--ft-border-primary)]'
                }`}>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 ${selectedRows.length > 0 ? '' : 'opacity-50'}`}>
                        <CheckCircle2 className={`w-4 h-4 ${selectedRows.length > 0 ? 'text-[var(--ft-color-primary-600)]' : 'text-gray-400'}`} />
                        <span className={`text-xs font-medium ${selectedRows.length > 0 ? 'text-[var(--ft-color-primary-700)]' : 'text-gray-400'}`}>
                            {selectedRows.length > 0 ? `${selectedRows.length}명 선택` : '선택 없음'}
                        </span>
                    </div>

                    <div className={`w-px h-5 ${selectedRows.length > 0 ? 'bg-[var(--ft-color-primary-200)]' : 'bg-gray-200'}`} />

                    <div className={`flex items-center gap-2 ${selectedRows.length > 0 ? '' : 'opacity-50'}`}>
                        <select
                            value={bulkTemplateId}
                            onChange={(e) => setBulkTemplateId(e.target.value ? Number(e.target.value) : "")}
                            disabled={selectedRows.length === 0}
                            className={`h-7 px-2 text-xs bg-white border rounded focus:outline-none focus:border-[var(--ft-color-primary-500)] min-w-[140px] ${selectedRows.length > 0
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
                            일괄 적용
                        </CoreButton>
                    </div>

                    <div className={`w-px h-5 ${selectedRows.length > 0 ? 'bg-[var(--ft-color-primary-200)]' : 'bg-gray-200'}`} />

                    <CoreButton
                        variant="primary"
                        size="sm"
                        leftIcon={<Send className="w-3.5 h-3.5" />}
                        onClick={() => onBulkDeliver?.(selectedRows.map(r => r.influencerId))}
                        disabled={selectedRows.length === 0}
                    >
                        전달
                    </CoreButton>
                </div>

                {selectedRows.length > 0 && (
                    <button
                        onClick={handleClearSelection}
                        className="flex items-center gap-1 text-xs text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                        해제
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
                    onRowClicked={handleRowClicked}
                    rowHeight={56}
                    headerHeight={36}
                    animateRows={true}
                    getRowClass={getRowClass}
                />
            </div>
        </div>
    );
}
