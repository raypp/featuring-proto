import { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    ModuleRegistry,
    AllCommunityModule,
    ICellRendererParams,
    RowHeightParams,
    IsFullWidthRowParams,
    GridReadyEvent
} from "ag-grid-community";
import { ChevronDown, ChevronRight, ExternalLink, Image, RefreshCw, Trash2, UserPlus, Download, LayoutGrid, Check } from "lucide-react";
import { CampaignInfluencer } from "../types";
import { CoreAvatar, CoreTag, CoreButton, CoreStatusBadge } from "../../design-system";
import { InfluencerManagementDrawer, InfluencerProfile } from "./InfluencerManagementDrawer";

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Custom Theme (Same as CampaignManagement)
import { customAgGridTheme } from "../utils/agGridTheme";

// Extended interface for Grid
interface InfluencerGridRow extends CampaignInfluencer {
    isDetailRow?: boolean;
    parentIds?: number[]; // For detail rows to know which parent they belong to
}

interface InfluencerGridProps {
    influencers: CampaignInfluencer[];
    onSelectionChange?: (selectedIds: number[]) => void;
    onAddInfluencer?: () => void;
}

// Full Width Renderer (Detail View) - Matching Figma Design
const DetailCellRenderer = (params: ICellRendererParams & { data: InfluencerGridRow }) => {
    // Mock content list based on Figma design
    const contentItems = [
        {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&h=150&fit=crop",
            title: "LE SSERAFIM (르세라핌) 'HOT' OFFICIAL MV",
            date: "2025-06-11",
            type: "youtube",
            url: "https://www.instagram.com/p/DLL-dssRNCG/"
        },
        {
            id: 2,
            thumbnail: null,
            title: "나는 무슨 안경만두일까? @bibigo_kr...",
            date: "2025-06-11",
            type: "instagram",
            url: "https://www.instagram.com/p/ABCDEFG/"
        }
    ];

    // Check if this row should show "no content" message
    const hasNoContent = contentItems.length === 0;

    return (
        <div className="w-full bg-gray-50 py-3 border-t border-gray-100">
            <div className="pl-[60px] pr-4"> {/* Indent to align with Account column */}
                {hasNoContent ? (
                    <p className="text-sm text-gray-400 py-4 text-center">등록된 콘텐츠가 없습니다.</p>
                ) : (
                    <div className="space-y-2">
                        {contentItems.map(item => (
                            <div key={item.id} className="flex items-center gap-3">
                                {/* Thumbnail or placeholder */}
                                <div className="w-9 h-9 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                                    {item.thumbnail ? (
                                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
                                            <Image className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content Info - Vertical Stack */}
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-600 font-medium truncate max-w-[400px]">
                                        {item.title}
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{item.date}</p>
                                </div>

                                {/* Spacer */}
                                <div className="flex-1" />

                                {/* Link with platform icon */}
                                <div className="flex items-center gap-2">
                                    {item.type === 'instagram' && (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                                            className="w-4 h-4"
                                            alt="instagram"
                                        />
                                    )}
                                    {item.type === 'youtube' && (
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                                            className="w-4 h-4"
                                            alt="youtube"
                                        />
                                    )}
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-gray-500 hover:text-blue-600 hover:underline truncate max-w-[280px]"
                                    >
                                        {item.url}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export function InfluencerGrid({ influencers, onSelectionChange, onAddInfluencer }: InfluencerGridProps) {
    const [gridApi, setGridApi] = useState<any>(null);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerProfile | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Open drawer handler
    const handleOpenDrawer = useCallback((influencer: CampaignInfluencer) => {
        const profile: InfluencerProfile = {
            id: influencer.id,
            username: influencer.username,
            displayName: influencer.displayName,
            profileImage: influencer.profileImage,
            bio: '',
            isVerified: true,
            postsCount: 1900,
            followersCount: influencer.followerCount || 155000,
            followingCount: 1000,
            categories: ['Makeup Artist', 'F&B', '일상'],
        };
        setSelectedInfluencer(profile);
        setIsDrawerOpen(true);
    }, []);

    // Prepare Row Data with potential Detail Rows
    // Since we can't use Master/Detail easily in Community, we use a trick:
    // We don't inject rows into the main list because sorting/filtering gets messy.
    // Instead, we will use 'masterDetail' feature if available, OR 'fullWidthCellRenderer'.
    // Actually, properly injecting Detail Rows into `rowData` is the standard way for "Tree Data" or custom detail views in pure component frameworks, 
    // but AG Grid's `fullWidthCellRenderer` usually works on existing rows.

    // STRATEGY: We will augment the `rowData` to include "detail" rows immediately following expanded "master" rows.
    const rowData = useMemo(() => {
        const rows: any[] = [];
        influencers.forEach(inf => {
            rows.push(inf);
            if (expandedIds.includes(inf.id)) {
                rows.push({
                    id: `detail-${inf.id}`,
                    isDetailRow: true,
                    parentIds: [inf.id],
                    // Copy some props to satisfy Types if stricter, or just use 'any' cast in loop
                });
            }
        });
        return rows;
    }, [influencers, expandedIds]);

    const handleRowGroupOpened = (params: any) => {
        // Not used for manual expansion
    };

    const toggleExpand = useCallback((id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    }, []);

    // Account Renderer with Expand Button
    const AccountRenderer = (params: ICellRendererParams) => {
        const { data } = params;
        if (data.isDetailRow) return null;

        const isExpanded = expandedIds.includes(data.id);

        return (
            <div className="flex items-center gap-2 h-full">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(data.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                >
                    {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                </button>
                <div
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDrawer(data);
                    }}
                >
                    <CoreAvatar
                        src={data.profileImage}
                        name={data.displayName}
                        size="sm"
                    />
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1">
                            <p className="text-sm font-medium text-gray-900 leading-tight">{data.displayName}</p>
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-0.5">더 많은 글을 기다리고 있을게요.</p>
                    </div>
                </div>
            </div>
        );
    };

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 50,
            maxWidth: 50,
            field: "checkbox",
            headerName: "",
            pinned: 'left',
            cellClass: (params) => params.data.isDetailRow ? "hidden-cell" : ""
        },
        {
            field: "displayName",
            headerName: "계정",
            width: 320,
            cellRenderer: AccountRenderer,
            pinned: 'left'
        },
        {
            field: "category",
            headerName: "카테고리",
            width: 150,
            cellRenderer: (params: ICellRendererParams) => {
                if (params.data.isDetailRow) return null;
                return (
                    <div className="flex gap-1 items-center h-full">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-600 text-xs text font-medium">뷰티</span>
                        <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-600 text-xs font-medium">패션</span>
                    </div>
                );
            }
        },
        {
            field: "followerCount",
            headerName: "팔로워/구독자 수",
            width: 140,
            valueFormatter: (params) => params.value ? params.value.toLocaleString() : '-'
        },
        {
            field: "contentCount",
            headerName: "콘텐츠 수",
            width: 100,
            cellClass: "text-right",
            cellRenderer: (params: ICellRendererParams) => {
                if (params.data.isDetailRow) return null;
                return <span>{params.data.contentCount || 2}</span>;
            }
        },
        {
            field: "platform",
            headerName: "콘텐츠 유형",
            width: 120,
            cellRenderer: (params: ICellRendererParams) => {
                if (params.data.isDetailRow) return null;
                return (
                    <div className="flex gap-1 items-center h-full">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-5 h-5" alt="insta" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" className="w-5 h-5" alt="youtube" />
                    </div>
                );
            }
        }
    ], [expandedIds]);

    const isFullWidthRow = useCallback((params: IsFullWidthRowParams) => {
        return params.rowNode.data.isDetailRow === true;
    }, []);

    const getRowHeight = useCallback((params: RowHeightParams) => {
        if (params.data.isDetailRow) {
            return 200;
        }
        return 60; // Reduced from 80 to 60 for slim look
    }, []);

    return (
        <div className="space-y-4">
            {/* Actions Toolbar */}
            <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 mr-2">총 {influencers.length}명</span>
                    <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1">
                        <LayoutGrid className="w-3.5 h-3.5" /> 그룹에 저장
                    </button>
                    <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1">
                        다른 캠페인에 추가
                    </button>
                    <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> 삭제
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onAddInfluencer}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded flex items-center gap-1.5 text-gray-900 bg-white hover:bg-gray-50 shadow-sm"
                    >
                        <UserPlus className="w-3.5 h-3.5" /> 인플루언서 추가
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded flex items-center gap-1.5 text-gray-900 bg-white hover:bg-gray-50 shadow-sm">
                        <Download className="w-3.5 h-3.5" /> 데이터 다운로드
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="w-full bg-white border border-gray-200 overflow-hidden h-[600px] border-l-0 border-r-0 border-b-0 rounded-none">
                <AgGridReact
                    theme={customAgGridTheme}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        resizable: true,
                        suppressMovable: true,
                        cellStyle: { display: 'flex', alignItems: 'center' } // Enforce vertical align middle
                    }}
                    rowSelection="multiple"
                    onSelectionChanged={(event) => {
                        const selectedRows = event.api.getSelectedRows();
                        onSelectionChange?.(selectedRows.map(r => r.id).filter(id => typeof id === 'number'));
                    }}
                    isFullWidthRow={isFullWidthRow}
                    fullWidthCellRenderer={DetailCellRenderer}
                    getRowHeight={getRowHeight}
                    headerHeight={48}
                    suppressRowTransform={true}
                />
            </div>

            <style>{`
                .hidden-cell {
                    display: none;
                }
            `}</style>

            {/* Influencer Management Drawer */}
            <InfluencerManagementDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                influencer={selectedInfluencer}
            />
        </div>
    );
}
