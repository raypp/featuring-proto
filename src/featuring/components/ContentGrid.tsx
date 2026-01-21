import { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    ModuleRegistry,
    AllCommunityModule,
    ICellRendererParams,
    RowHeightParams
} from "ag-grid-community";
import { LayoutGrid, Download, Plus, Settings, RotateCw, Trash2, MoreHorizontal, Check, X, Pencil, Eye, MessageCircle, Heart, Bookmark, Calendar } from "lucide-react";
import { CampaignContent } from "../types";
import { CoreAvatar, CoreTag, CoreStatusBadge } from "../../design-system";
import { customAgGridTheme } from "../utils/agGridTheme";

// Custom Header Component with Pencil Icon
const EditableHeader = (props: any) => {
    return (
        <div className="flex items-center gap-1.5">
            <span>{props.displayName}</span>
            <Pencil className="w-3 h-3 text-gray-400" />
        </div>
    );
};

const ContentCard = ({ data }: { data: ContentGridRow }) => {
    const formatNumber = (num: number) => num.toLocaleString();
    const icon = (data.contentType === '영상' || data.contentType === '쇼츠')
        ? "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg";

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="p-3 flex items-center gap-2">
                <div className="relative">
                    <CoreAvatar src={data.influencerProfileImage} name={data.influencerDisplayName} size="sm" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full p-0.5 shadow-sm border border-gray-50">
                        <img src={icon} alt="" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{data.influencerDisplayName}</p>
                    <p className="text-xs text-gray-400 truncate">I Can Do It With A Broken Heart</p>
                </div>
            </div>

            {/* Media */}
            <div className="relative aspect-square bg-gray-100">
                {data.thumbnailUrl && <img src={data.thumbnailUrl} alt="" className="w-full h-full object-cover" />}
                {(data.contentType === '영상' || data.contentType === '쇼츠') && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                        2:02:25
                    </div>
                )}
                {/* Platform Icon Overlay (Optional based on design, currently in header) */}
            </div>

            {/* Body */}
            <div className="p-3 space-y-3">
                <div className="space-y-1">
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {/* Mock Caption */}
                        💬 치킨 좀 먹어본 친구가 추천한 그 치킨.<br />
                        👉 바로 #고메소바바치킨 🍗 에어프라이어 15분...
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span>2025. 05. 20</span>
                        {data.secondaryUsage && (
                            <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-gray-500">
                                <RotateCw className="w-3 h-3" /> 2차 활용 ~25.06.20
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
                    <div className="flex flex-col items-center gap-0.5">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-700">{formatNumber(data.reach || 0)}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <Heart className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-700">{formatNumber(data.likes || 0)}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-700">{formatNumber(data.comments || 0)}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <Bookmark className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-700">{formatNumber(data.saves || 0)}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">
                        25.10_피쳐링 자동 DM 캠페인
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                        25년 연...
                    </span>
                </div>
            </div>
        </div>
    );
};

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Extended interface for Grid
export interface ContentGridRow extends CampaignContent {
    category?: string[];
    email?: string;
    note?: string;
}

interface ContentGridProps {
    contents: ContentGridRow[];
    onSelectionChange?: (selectedIds: number[]) => void;
}

export function ContentGrid({ contents, onSelectionChange }: ContentGridProps) {
    const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
    const formatNumber = (num: number) => num.toLocaleString();
    const formatCurrency = (amount: number) => `${amount.toLocaleString()}원`;

    // Content Renderer
    const ContentRenderer = (params: ICellRendererParams) => {
        const { data } = params;
        const icon = (data.contentType === '영상' || data.contentType === '쇼츠')
            ? "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
            : "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg";

        return (
            <div className="flex items-center gap-3 h-full py-2">
                {/* Thumbnail */}
                <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                    {data.thumbnailUrl && <img src={data.thumbnailUrl} alt="" className="w-full h-full object-cover" />}
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white p-0.5 shadow-sm">
                        <img src={icon} alt="" className="w-full h-full object-contain" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        Unleashing Creativity: The Power of...
                    </p>
                    <a href={data.contentUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate mt-0.5">
                        {data.contentUrl}
                    </a>
                </div>

                {/* More Button */}
                <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
        );
    };

    // Account Renderer
    const AccountRenderer = (params: ICellRendererParams) => {
        const { data } = params;
        return (
            <div className="flex items-center gap-3 h-full">
                <CoreAvatar
                    src={data.influencerProfileImage}
                    name={data.influencerDisplayName}
                    size="sm"
                />
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1">
                        <p className="text-sm font-medium text-gray-900 leading-tight">{data.influencerDisplayName}</p>
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">더 많은 글을 기다리고 있을게요. 항상...</p>
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
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            headerName: "No.",
            width: 60,
            valueGetter: "node.rowIndex + 1",
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }
        },
        {
            field: "content",
            headerName: "콘텐츠",
            width: 380,
            cellRenderer: ContentRenderer
        },
        {
            field: "account",
            headerName: "계정/채널",
            width: 300,
            cellRenderer: AccountRenderer
        },
        {
            field: "category",
            headerName: "인플루언서 카테고리",
            width: 200,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex gap-1 items-center h-full">
                    {params.data.category?.map((cat: string, idx: number) => (
                        <span key={idx} className={`px-2 py-0.5 rounded text-xs font-medium ${idx === 0 ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                            }`}>
                            {cat}
                        </span>
                    )) || (
                            <>
                                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100 text-xs font-medium">F&B</span>
                                <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-100 text-xs font-medium">다이어트/건강보조식품</span>
                            </>
                        )}
                </div>
            )
        },
        {
            field: "postedDate",
            headerName: "게시일",
            width: 120,
            editable: true,
            headerComponent: EditableHeader,
            cellEditor: 'agDateStringCellEditor',
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "likes",
            headerName: "좋아요",
            width: 80,
            valueFormatter: (params: any) => formatNumber(params.value),
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "comments",
            headerName: "댓글",
            width: 80,
            valueFormatter: (params: any) => formatNumber(params.value),
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "saves",
            headerName: "저장",
            width: 80,
            valueFormatter: (params: any) => formatNumber(params.value),
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "reach",
            headerName: "도달",
            width: 80,
            valueFormatter: (params: any) => formatNumber(params.value),
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "insightDataReceived",
            headerName: "인사이트",
            width: 80,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center justify-center h-full">
                    {params.value ? (
                        <Check className="w-4 h-4 text-green-600" />
                    ) : (
                        <X className="w-4 h-4 text-gray-300" />
                    )}
                </div>
            )
        },
        {
            field: "contentCost",
            headerName: "콘텐츠 비용",
            width: 120,
            editable: true,
            headerComponent: EditableHeader,
            valueFormatter: (params: any) => formatCurrency(params.value),
            cellEditor: 'agNumberCellEditor',
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "cpv",
            headerName: "CPV",
            width: 80,
            cellStyle: { display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '13px' }
        },
        {
            field: "secondaryUsage",
            headerName: "2차 활용",
            width: 120,
            editable: true,
            headerComponent: EditableHeader,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: [true, false],
                formatValue: (value: boolean) => value ? '사용' : '미사용'
            },
            valueFormatter: (params: any) => params.value ? '사용' : '미사용',
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center h-full">
                    <CoreStatusBadge
                        colorType={params.value ? 'success' : 'default'}
                        type="tint"
                        size="sm"
                    >
                        {params.value ? '사용' : '미사용'}
                    </CoreStatusBadge>
                </div>
            )
        },
        {
            field: "approvalStatus",
            headerName: "승인 상태",
            width: 120,
            editable: true,
            headerComponent: EditableHeader,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['approved', 'pending', 'rejected'],
                formatValue: (value: string) => value === 'approved' ? '승인됨' : value === 'rejected' ? '반려됨' : '대기중'
            },
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center h-full">
                    <CoreStatusBadge
                        colorType={
                            params.value === 'approved' ? 'success' :
                                params.value === 'rejected' ? 'error' : 'warning'
                        }
                        type="tint"
                        size="sm"
                    >
                        {params.value === 'approved' ? '승인됨' :
                            params.value === 'rejected' ? '반려됨' : '대기중'}
                    </CoreStatusBadge>
                </div>
            )
        },
        {
            field: "email",
            headerName: "이메일",
            width: 180,
            editable: true,
            headerComponent: EditableHeader,
            cellRenderer: (params: ICellRendererParams) => (
                <span className={params.value ? "text-gray-900 text-sm" : "text-gray-400 text-sm"}>
                    {params.value || "미입력"}
                </span>
            ),
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: "note",
            headerName: "참고 사항",
            minWidth: 200,
            flex: 1,
            editable: true,
            headerComponent: EditableHeader,
            cellRenderer: (params: ICellRendererParams) => (
                <span className={params.value ? "text-gray-900 text-sm" : "text-gray-400 text-sm"}>
                    {params.value || "미입력"}
                </span>
            ),
            cellStyle: { display: 'flex', alignItems: 'center' }
        }
    ], []);

    const getRowHeight = useCallback((params: RowHeightParams) => {
        return 60; // Slimmer rows
    }, []);

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col gap-4">
                {/* Upper Toolbar: View Toggle & Search */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1.5 flex items-center gap-1.5 rounded text-xs font-medium shadow-sm transition-colors ${viewMode === 'list'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-500 hover:bg-gray-50 bg-transparent shadow-none'
                                    }`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" /> 목록형
                            </button>
                            <button
                                onClick={() => setViewMode('card')}
                                className={`px-3 py-1.5 flex items-center gap-1.5 rounded text-xs font-medium shadow-sm transition-colors ${viewMode === 'card'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-500 hover:bg-gray-50 bg-transparent shadow-none'
                                    }`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" /> 카드형
                            </button>
                        </div>
                        <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white flex items-center gap-1.5">
                            필터
                        </button>
                    </div>
                    <div className="w-[300px]">
                        <input
                            type="text"
                            placeholder="아이디, 닉네임, 카테고리 등 검색"
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                        />
                    </div>
                </div>

                {/* Lower Toolbar: Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 mr-2">
                            {contents.length}개 <span className="text-gray-400 font-normal">/ 500개</span>
                        </span>
                        <button disabled className="px-3 py-1.5 text-xs text-gray-300 border border-gray-100 rounded cursor-not-allowed flex items-center gap-1 bg-white">
                            <Trash2 className="w-3.5 h-3.5" /> 삭제
                        </button>
                        <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50 bg-white flex items-center gap-1">
                            <RotateCw className="w-3.5 h-3.5" /> 일괄 업데이트
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded flex items-center gap-1.5 text-gray-900 bg-white hover:bg-gray-50 shadow-sm">
                            <Plus className="w-3.5 h-3.5" /> 콘텐츠 추가
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded flex items-center gap-1.5 text-gray-600 bg-white hover:bg-gray-50">
                            <Settings className="w-3.5 h-3.5" /> 컬럼 설정
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded flex items-center gap-1.5 text-gray-600 bg-white hover:bg-gray-50">
                            <Download className="w-3.5 h-3.5" /> 데이터 다운로드
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {viewMode === 'list' ? (
                <div className="w-full bg-white border border-gray-200 overflow-hidden h-[600px] border-l-0 border-r-0 border-b-0 rounded-none">
                    <AgGridReact
                        theme={customAgGridTheme}
                        rowData={contents}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            sortable: true,
                            resizable: true,
                            suppressMovable: true,
                        }}
                        rowSelection="multiple"
                        onSelectionChanged={(event) => {
                            const selectedRows = event.api.getSelectedRows();
                            onSelectionChange?.(selectedRows.map(r => r.id));
                        }}
                        getRowHeight={getRowHeight}
                        headerHeight={48}
                        suppressRowTransform={true}
                        suppressRowClickSelection={true}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                    {contents.map((content) => (
                        <ContentCard key={content.id} data={content} />
                    ))}
                </div>
            )}
        </div>
    );
}
