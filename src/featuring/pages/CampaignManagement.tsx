import { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    CellValueChangedEvent,
    ModuleRegistry,
    AllCommunityModule,
    ICellRendererParams
} from "ag-grid-community";
import { customAgGridTheme } from "../utils/agGridTheme";

// Custom Theme Definition


import { Plus, Search } from "lucide-react";
import { Campaign } from "../types";
import { CoreButton, CoreTag, CoreDot } from "../../design-system";

// Register AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Extended Campaign type for grid
interface CampaignGridRow extends Campaign {
    kpiUsageRate?: string;
    cpvAchievementRate?: string;
    memo?: string;
}

// Mock data
const MOCK_CAMPAIGNS: CampaignGridRow[] = [
    {
        id: 1,
        name: "25.03 다이슨 에어랩 멀티 스타일러 캠페인",
        description: "헤어케어 제품 브랜딩 시딩 팀 인플루언서 참여",
        status: "running",
        tags: ["Sponsored Content", "Ambassadors"],
        startDate: "25.12.26",
        endDate: "26.01.26",
        campaignType: "어필리에이트",
        brandName: "다이슨",
        contentCount: 0,
        secondaryUsageCount: 0,
        budget: 20000000,
        platform: "instagram",
        createdAt: "2025-01-01",
        lastModified: "2025-01-20",
        kpiUsageRate: "0/0(0%)",
        cpvAchievementRate: "0/0(0%)",
        memo: ""
    },
    {
        id: 2,
        name: "25.07 디바스크 폼클렌 캠페인",
        description: "미녀스 제품다양 시딩을 위한 인플루언서 세션",
        status: "pending",
        tags: ["Engagement", "Reach"],
        startDate: "25.12.26",
        endDate: "26.01.26",
        campaignType: "뮤가 시딩",
        brandName: "미녀스",
        contentCount: 0,
        secondaryUsageCount: 0,
        budget: 15000000,
        platform: "instagram",
        createdAt: "2025-01-05",
        lastModified: "2025-01-18",
        kpiUsageRate: "0/0(0%)",
        cpvAchievementRate: "1-0 | Rtr | 0",
        memo: ""
    },
    {
        id: 3,
        name: "25.05 상수 트렌드 캠페인 전시촬영",
        description: "100원 상수동 무기획전 촬영 예상 명소캠페인",
        status: "drafting",
        tags: ["UGC"],
        startDate: "25.12.01",
        endDate: "26.01.01",
        campaignType: "오프라인/팝업",
        brandName: "",
        contentCount: 0,
        secondaryUsageCount: 0,
        createdAt: "2025-01-10",
        lastModified: "2025-01-15",
        kpiUsageRate: "0(0%)/0(0%)",
        cpvAchievementRate: "",
        memo: ""
    },
    {
        id: 4,
        name: "25.09 가을 겨울 신상 브랜드론",
        description: "D2C 패션 아이템 새롭게 바이럴까진 20TV 광고 제작",
        status: "completed",
        tags: ["KOLs"],
        startDate: "25.12.01",
        endDate: "26.01.01",
        campaignType: "노스폰서쉽",
        brandName: "",
        contentCount: 0,
        secondaryUsageCount: 0,
        createdAt: "2025-01-01",
        lastModified: "2025-01-14",
        kpiUsageRate: "0(0%)/0(0%)",
        cpvAchievementRate: "",
        memo: ""
    }
];

interface CampaignManagementProps {
    campaigns?: CampaignGridRow[];
    onNavigate: (view: string) => void;
    onCreateCampaign: () => void;
}

// Status Badge Cell Renderer
const StatusCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const status = params.value as Campaign["status"];
    const statusConfig: Record<Campaign["status"], { color: "gray" | "purple" | "green"; label: string }> = {
        drafting: { color: "gray", label: "작성 중" },
        pending: { color: "purple", label: "진행 예정" },
        running: { color: "green", label: "진행 중" },
        completed: { color: "gray", label: "완료" },
        archived: { color: "gray", label: "보관됨" }
    };
    const config = statusConfig[status] || { color: "gray", label: status };

    return (
        <div className="flex items-center gap-1.5">
            <CoreDot size="sm" color={config.color} />
            <span className="text-sm">{config.label}</span>
        </div>
    );
};

// Campaign Type Tag Renderer
const TypeCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const type = params.value as string;
    if (!type) return <span className="text-gray-400">-</span>;
    return <CoreTag colorType="gray" size="sm">{type}</CoreTag>;
};

// Platform Icon Renderer
const PlatformCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const platform = params.value as Campaign["platform"];
    const icons: Record<string, string> = {
        instagram: "📷",
        tiktok: "🎵",
        youtube: "▶️"
    };
    return <span className="text-lg">{icons[platform || ""] || "-"}</span>;
};

// Tags Renderer
const TagsCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const tags = params.value as string[];
    if (!tags || tags.length === 0) return <span className="text-gray-400">-</span>;

    return (
        <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, idx) => (
                <CoreTag key={idx} colorType="primary" size="xs">{tag}</CoreTag>
            ))}
            {tags.length > 2 && (
                <span className="text-xs text-gray-500">+{tags.length - 2}</span>
            )}
        </div>
    );
};

// Currency Renderer
const CurrencyCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const value = params.value as number;
    if (!value) return <span className="text-gray-400">-</span>;

    const formatted = value >= 10000
        ? `${(value / 10000).toLocaleString()}만원`
        : `${value.toLocaleString()}원`;

    return <span>{formatted}</span>;
};

export function CampaignManagement({
    campaigns = MOCK_CAMPAIGNS,
    onNavigate,
    onCreateCampaign
}: CampaignManagementProps) {
    const [rowData, setRowData] = useState<CampaignGridRow[]>(campaigns);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "running" | "pending" | "completed">("all");

    // Filter campaigns based on tab and search
    const filteredData = useMemo(() => {
        let filtered = rowData;

        // Filter by tab
        if (activeTab === "running") {
            filtered = filtered.filter(c => c.status === "running");
        } else if (activeTab === "pending") {
            filtered = filtered.filter(c => c.status === "pending" || c.status === "drafting");
        } else if (activeTab === "completed") {
            filtered = filtered.filter(c => c.status === "completed" || c.status === "archived");
        }

        // Filter by search
        if (searchTerm) {
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [rowData, activeTab, searchTerm]);

    // Stats
    const stats = useMemo(() => ({
        total: rowData.length,
        running: rowData.filter(c => c.status === "running").length,
        pending: rowData.filter(c => c.status === "pending" || c.status === "drafting").length,
        completed: rowData.filter(c => c.status === "completed" || c.status === "archived").length
    }), [rowData]);

    // Column definitions
    const columnDefs = useMemo<ColDef<CampaignGridRow>[]>(() => [
        {
            field: "name",
            headerName: "캠페인명",
            flex: 2,
            minWidth: 280,
            cellRenderer: (params: ICellRendererParams<CampaignGridRow>) => (
                <div className="py-1">
                    <p className="font-medium text-gray-900 truncate">{params.value}</p>
                    <p className="text-xs text-gray-500 truncate">{params.data?.description}</p>
                </div>
            ),
            onCellClicked: (params) => {
                if (params.data) {
                    onNavigate(`campaign-detail-${params.data.id}`);
                }
            },
            cellStyle: { cursor: "pointer" }
        },
        {
            field: "status",
            headerName: "상태",
            width: 100,
            cellRenderer: StatusCellRenderer
        },
        {
            field: "campaignType",
            headerName: "유형",
            width: 120,
            cellRenderer: TypeCellRenderer
        },
        {
            headerName: "캠페인 기간",
            width: 150,
            valueGetter: (params) => {
                if (!params.data?.startDate || !params.data?.endDate) return "-";
                return `${params.data.startDate} ~ ${params.data.endDate}`;
            }
        },
        {
            field: "platform",
            headerName: "배너/이미지",
            width: 100,
            cellRenderer: PlatformCellRenderer
        },
        {
            field: "tags",
            headerName: "2차 활용관리",
            width: 180,
            cellRenderer: TagsCellRenderer
        },
        {
            field: "contentCount",
            headerName: "콘텐츠 수",
            width: 100,
            cellRenderer: (params: ICellRendererParams<CampaignGridRow>) => (
                <span>{params.value || 0}</span>
            )
        },
        {
            field: "budget",
            headerName: "예산",
            width: 120,
            cellRenderer: CurrencyCellRenderer
        },
        {
            field: "kpiUsageRate",
            headerName: "결과 KPI/사용률",
            width: 130
        },
        {
            field: "cpvAchievementRate",
            headerName: "배포/CPV달성률",
            width: 140
        },
        {
            field: "memo",
            headerName: "비고",
            width: 150,
            editable: true
        }
    ], [onNavigate]);

    // Default column settings
    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
        suppressMovable: true
    }), []);

    // Handle cell value change
    const handleCellValueChanged = useCallback((event: CellValueChangedEvent<CampaignGridRow>) => {
        const { data, colDef, newValue } = event;
        if (!data || !colDef.field) return;

        setRowData(prev =>
            prev.map(row =>
                row.id === data.id
                    ? { ...row, [colDef.field as keyof CampaignGridRow]: newValue }
                    : row
            )
        );

        // TODO: Future server save
        console.log(`Updated ${colDef.field} for campaign ${data.name}: ${newValue}`);
    }, []);

    return (
        <div className="h-full flex flex-col bg-[var(--ft-bg-secondary)]">
            {/* Header */}
            <div className="px-6 py-4 bg-[var(--ft-bg-primary)] border-b border-[var(--ft-border-primary)]">
                <h1 className="text-lg font-semibold text-[var(--ft-text-primary)]">캠페인 관리</h1>
            </div>

            {/* Stats Cards */}
            <div className="px-6 py-4 flex gap-4">
                <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-500">진행 · 예정중</p>
                    <p className="text-2xl font-bold mt-1">{stats.total}<span className="text-sm font-normal text-gray-400">개(s)</span></p>
                </div>
                <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-500">+ 진행중</p>
                    <p className="text-2xl font-bold mt-1">{stats.running}<span className="text-sm font-normal text-gray-400">건</span></p>
                </div>
                <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-500">+ 예정</p>
                    <p className="text-2xl font-bold mt-1">{stats.pending}<span className="text-sm font-normal text-gray-400">건</span></p>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Tabs */}
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-3 py-1.5 text-sm rounded ${activeTab === "all"
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => setActiveTab("running")}
                        className={`px-3 py-1.5 text-sm rounded ${activeTab === "running"
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        태그 ▾
                    </button>
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-3 py-1.5 text-sm rounded ${activeTab === "pending"
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        캠페인 상태 ▾
                    </button>
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        + 캠페인 유형 ▾
                    </button>
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        + 콘텐츠 타입/개수 ▾
                    </button>
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        + 날짜기간 ▾
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="검색으로 알려 드릴께요 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <CoreButton
                        variant="primary"
                        size="md"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={onCreateCampaign}
                    >
                        + 새 캠페인 시작
                    </CoreButton>
                </div>
            </div>

            {/* AG Grid Table */}
            <div className="flex-1 px-6 pb-6">
                <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <AgGridReact<CampaignGridRow>
                        theme={customAgGridTheme}
                        rowData={filteredData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onCellValueChanged={handleCellValueChanged}
                        rowHeight={60}
                        headerHeight={44}
                        pagination={true}
                        paginationPageSize={50}
                        paginationPageSizeSelector={[25, 50, 100]}
                        animateRows={true}
                        suppressCellFocus={false}
                    />
                </div>
            </div>
        </div>
    );
}
