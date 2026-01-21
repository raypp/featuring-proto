import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { CoreButton, CoreDot } from "../../design-system";
import { AutomationGroup } from "../types";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, ICellRendererParams, SelectionOptions } from "ag-grid-community";
import { customAgGridTheme } from "../utils/agGridTheme";

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface AutomationGroupListProps {
    automationGroups: AutomationGroup[];
    onNavigate: (view: string) => void;
    onCreateGroup: () => void;
}

// Status Cell Renderer
const StatusCellRenderer = (params: ICellRendererParams<AutomationGroup>) => {
    const status = params.value as string; // 'active' | 'inactive' | 'pending' | 'running' | 'completed'

    let color: 'green' | 'orange' | 'gray' = 'gray';
    let label = '완료';

    if (status === 'running' || status === 'active') {
        color = 'green';
        label = '진행 중';
    } else if (status === 'pending') {
        color = 'orange';
        label = '진행 예정';
    }

    // Map color to styling
    const colorStyles = {
        green: 'bg-[var(--ft-color-green-50)] text-[var(--ft-color-green-700)] border-[var(--ft-color-green-200)]',
        orange: 'bg-[var(--ft-color-orange-50)] text-[var(--ft-color-orange-700)] border-[var(--ft-color-orange-200)]',
        gray: 'bg-[var(--ft-color-gray-50)] text-[var(--ft-color-gray-600)] border-[var(--ft-color-gray-200)]'
    };

    return (
        <div className="flex items-center gap-1.5 h-full">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorStyles[color]}`}>
                <CoreDot size="sm" color={color} className="mr-1.5" />
                {label}
            </span>
        </div>
    );
};

export function AutomationGroupList({ automationGroups, onNavigate, onCreateGroup }: AutomationGroupListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<'all' | 'running' | 'completed'>('all');

    // Filter Logic
    const filteredGroups = useMemo(() => {
        let filtered = automationGroups;

        if (activeTab === 'running') {
            filtered = filtered.filter(g => g.status === 'active' || g.status === 'running');
        } else if (activeTab === 'completed') {
            filtered = filtered.filter(g => g.status === 'inactive' || g.status === 'completed');
        }

        if (searchTerm) {
            filtered = filtered.filter(g =>
                g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                g.campaignName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                g.productBrand?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [automationGroups, activeTab, searchTerm]);

    // Column Definitions
    const columnDefs = useMemo<ColDef<AutomationGroup>[]>(() => [
        {
            headerName: "No.",
            width: 60,
            valueGetter: (params) => {
                return (params.node?.rowIndex ?? 0) + 1;
            },
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ft-text-disabled)' }
        },
        {
            field: "name",
            headerName: "자동화명",
            flex: 1,
            minWidth: 200,
            cellRenderer: (params: ICellRendererParams<AutomationGroup>) => (
                <div className="flex flex-col justify-center h-full">
                    <span className="font-medium text-[var(--ft-text-primary)]">{params.value}</span>
                </div>
            ),
            cellStyle: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
            onCellClicked: (params) => params.data && onNavigate(`automation-group-detail-${params.data.id}`)
        },
        {
            field: "campaignName",
            headerName: "캠페인",
            width: 220,
            valueFormatter: (params) => params.value || '단독',
            cellStyle: { display: 'flex', alignItems: 'center', color: 'var(--ft-text-secondary)' }
        },
        {
            field: "status",
            headerName: "상태",
            width: 110,
            cellRenderer: StatusCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: "productBrand",
            headerName: "상품/브랜드명",
            width: 180,
            valueFormatter: (params) => params.value || '-',
            cellStyle: { display: 'flex', alignItems: 'center', color: 'var(--ft-text-secondary)' }
        }
    ], [onNavigate]);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
        suppressMovable: true,
        headerClass: "bg-[var(--ft-bg-secondary)] text-[var(--ft-text-secondary)] font-medium text-xs"
    }), []);

    const selectionOptions = useMemo<SelectionOptions>(() => ({
        mode: 'multiRow',
        headerCheckbox: true,
        checkboxes: true,
        enableClickSelection: false // Only checkbox selection
    }), []);

    return (
        <div className="h-full flex flex-col bg-[var(--ft-bg-primary)]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[var(--ft-border-secondary)] flex items-center justify-between">
                <div>
                    <h1 className="font-['Pretendard:Bold'] text-xl text-[var(--ft-text-primary)] mb-1">
                        반응 자동화 관리
                    </h1>
                    <p className="text-sm text-[var(--ft-text-secondary)]">
                        캠페인 및 단독 자동화 그룹을 관리합니다
                    </p>
                </div>
                <CoreButton
                    variant="primary"
                    size="md"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={onCreateGroup}
                >
                    새 자동화 만들기
                </CoreButton>
            </div>

            {/* Filters */}
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    {/* Tabs */}
                    <div className="flex bg-[var(--ft-bg-secondary)] p-1 rounded-lg">
                        {(['all', 'running', 'completed'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                        ? 'bg-white text-[var(--ft-text-primary)] shadow-sm'
                                        : 'text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]'
                                    }`}
                            >
                                {tab === 'all' && '전체'}
                                {tab === 'running' && '진행 중'}
                                {tab === 'completed' && '완료'}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                        <input
                            type="text"
                            placeholder="자동화명, 캠페인, 브랜드 검색"
                            className="w-full h-9 pl-9 pr-4 text-sm bg-white border border-[var(--ft-border-primary)] rounded-md focus:border-[var(--ft-color-primary-500)] focus:outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid Container */}
                <div className="h-[calc(100vh-250px)] bg-white rounded-lg border border-[var(--ft-border-secondary)] overflow-hidden">
                    <AgGridReact<AutomationGroup>
                        theme={customAgGridTheme}
                        rowData={filteredGroups}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection={selectionOptions}
                        pagination={true}
                        paginationPageSize={20}
                        rowHeight={52}
                        headerHeight={40}
                        animateRows={true}
                    />
                </div>
            </div>
        </div>
    );
}
