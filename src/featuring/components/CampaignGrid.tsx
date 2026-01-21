import { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    CellValueChangedEvent,
    ModuleRegistry,
    AllCommunityModule,
    ICellRendererParams
} from "ag-grid-community";
import { customAgGridTheme } from "../utils/agGridTheme";
import { Campaign } from "../types";
import { CoreDot, CoreTag } from "../../design-system";

// Register AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Extended Campaign type for grid
export interface CampaignGridRow extends Campaign {
    kpiUsageRate?: string;
    cpvAchievementRate?: string;
    memo?: string;
    contentReceivedCount?: number;
    contentTotalCount?: number;
    manager?: string;
}

interface CampaignGridProps {
    campaigns: CampaignGridRow[];
    onNavigate: (view: string) => void;
    onUpdateCampaign?: (id: number, field: string, value: any) => void;
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
        <div className="flex items-center gap-1.5 h-full">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border
                ${config.color === 'purple' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    config.color === 'green' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-gray-50 text-gray-600 border-gray-200'}`}>
                <CoreDot size="sm" color={config.color} className="mr-1.5" />
                {config.label}
            </span>
        </div>
    );
};

// Type Tag Renderer (Blue background style)
const TypeCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const type = params.value as string;
    if (!type) return <span className="text-gray-400">-</span>;
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
            {type}
        </span>
    );
};

// Platform Icons Renderer (Multiple icons)
const PlatformCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const types = params.data?.contentTypes;
    if (!types || types.length === 0) {
        // Fallback to single platform
        const platform = params.data?.platform;
        const icons: Record<string, string> = {
            instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
            tiktok: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
            youtube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
            blog: "https://upload.wikimedia.org/wikipedia/commons/4/41/Naver_Blog_Icon.png" // Simple placeholder
        };
        const src = icons[platform || ""];

        if (!src) return <span className="text-gray-400">-</span>;
        return <img src={src} alt={platform} className="w-4 h-4 object-contain inline-block" />;
    }

    const iconMap: Record<string, string> = {
        instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
        tiktok: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
        youtube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
        shorts: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Youtube_shorts_icon.svg",
        blog: "https://upload.wikimedia.org/wikipedia/commons/4/41/Naver_Blog_Icon.png"
    };

    return (
        <div className="flex items-center gap-1 h-full">
            {types.map((t, idx) => (
                iconMap[t] && <img key={idx} src={iconMap[t]} alt={t} className="w-4 h-4 object-contain" />
            ))}
        </div>
    );
};

// Influencer Categories Renderer (Greenish tags)
const CategoryCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const categories = params.value as string[];
    if (!categories || categories.length === 0) return <span className="text-gray-400">-</span>;

    return (
        <div className="flex flex-wrap gap-1 h-full items-center">
            {categories.slice(0, 2).map((cat, idx) => (
                <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {cat}
                </span>
            ))}
            {categories.length > 2 && (
                <span className="text-xs text-gray-500">+{categories.length - 2}</span>
            )}
        </div>
    );
};

// Content Progress Renderer
const ContentProgressRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const received = params.data?.contentReceivedCount || 0;
    const total = params.data?.contentTotalCount || 0;

    if (total === 0) return <span className="text-gray-400 text-xs">0/0 (0%)</span>;

    const percentage = Math.round((received / total) * 100);
    return (
        <span className="text-xs font-medium text-gray-700">
            {received}/{total} ({percentage}%)
        </span>
    );
};

// Currency Renderer
const CurrencyCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const value = params.value as number;
    if (!value) return <span className="text-gray-400">-</span>;
    return <span className="text-xs">{value.toLocaleString()}</span>;
};

// Tags Renderer (Soft Gray)
const TagsCellRenderer = (params: ICellRendererParams<CampaignGridRow>) => {
    const tags = params.value as string[];
    if (!tags || tags.length === 0) return <span className="text-gray-400">-</span>;

    return (
        <div className="flex flex-wrap gap-1 h-full items-center">
            {tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    {tag}
                </span>
            ))}
        </div>
    );
};


export function CampaignGrid({ campaigns, onNavigate, onUpdateCampaign }: CampaignGridProps) {
    // Column definitions
    const columnDefs = useMemo<ColDef<CampaignGridRow>[]>(() => [
        {
            field: "name",
            headerName: "캠페인명",
            flex: 2,
            minWidth: 280,
            cellRenderer: (params: ICellRendererParams<CampaignGridRow>) => (
                <div className="py-2 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="font-semibold text-sm text-gray-900 truncate">{params.value}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{params.data?.description}</p>
                </div>
            ),
            onCellClicked: (params) => {
                if (params.data) {
                    onNavigate(`campaign-detail-${params.data.id}`);
                }
            },
            cellStyle: { cursor: "pointer", display: 'flex', alignItems: 'center' }
        },
        {
            field: "status",
            headerName: "상태",
            width: 100,
            cellRenderer: StatusCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: "tags",
            headerName: "태그",
            width: 180,
            cellRenderer: TagsCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            headerName: "캠페인 기간",
            width: 160,
            valueGetter: (params) => {
                if (!params.data?.startDate || !params.data?.endDate) return "-";
                // Formatting to 25. 12. 25 ~ 26. 01. 26 style if needed, but keeping simple for now
                return `${params.data.startDate} ~ ${params.data.endDate}`;
            },
            cellStyle: { display: 'flex', alignItems: 'center', fontSize: '12px' }
        },
        {
            field: "campaignType",
            headerName: "캠페인 유형",
            width: 110,
            cellRenderer: TypeCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: "brandName",
            headerName: "브랜드명",
            width: 100,
            cellStyle: { display: 'flex', alignItems: 'center', fontSize: '13px' }
        },
        {
            field: "secondaryUsageCount",
            headerName: "2차 활용(개별)",
            width: 100,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            headerName: "콘텐츠 유형",
            width: 120,
            cellRenderer: PlatformCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            headerName: "콘텐츠 업로드 인원",
            width: 140,
            cellRenderer: ContentProgressRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: "budget",
            headerName: "광고비",
            width: 100,
            cellRenderer: CurrencyCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }
        },
        {
            field: "influencerCategories",
            headerName: "인플루언서 카테고리",
            width: 150,
            cellRenderer: CategoryCellRenderer,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: "manager",
            headerName: "담당자",
            width: 100,
            cellStyle: { display: 'flex', alignItems: 'center', fontSize: '13px' }
        }
    ], [onNavigate]);

    // Default column settings
    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
        suppressMovable: true,
        headerClass: "bg-gray-50 text-gray-500 font-medium text-xs"
    }), []);

    // Handle cell value change
    const handleCellValueChanged = useCallback((event: CellValueChangedEvent<CampaignGridRow>) => {
        const { data, colDef, newValue } = event;
        if (!data || !colDef.field) return;

        onUpdateCampaign?.(data.id, colDef.field, newValue);
    }, [onUpdateCampaign]);

    return (
        <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
            <AgGridReact<CampaignGridRow>
                theme={customAgGridTheme}
                rowData={campaigns}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onCellValueChanged={handleCellValueChanged}
                rowHeight={56} // Slightly tighter
                headerHeight={40}
                pagination={true}
                paginationPageSize={50}
                paginationPageSizeSelector={[25, 50, 100]}
                animateRows={true}
                suppressCellFocus={false}
            />
        </div>
    );
}
