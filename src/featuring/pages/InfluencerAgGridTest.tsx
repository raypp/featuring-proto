import { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    CellValueChangedEvent,
    ModuleRegistry,
    AllCommunityModule,
} from "ag-grid-community";

// Register AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Influencer type definition
interface Influencer {
    id: number;
    name: string;
    platform: string;
    memo: string;
    status: "pending" | "active" | "paused";
}

// Dummy data
const INITIAL_DATA: Influencer[] = [
    { id: 1, name: "김뷰티", platform: "Instagram", memo: "뷰티 전문 인플루언서", status: "active" },
    { id: 2, name: "이푸드", platform: "YouTube", memo: "음식 리뷰어", status: "pending" },
    { id: 3, name: "박트래블", platform: "Instagram", memo: "여행 콘텐츠", status: "active" },
    { id: 4, name: "최테크", platform: "TikTok", memo: "IT 리뷰어", status: "paused" },
    { id: 5, name: "정라이프", platform: "Instagram", memo: "", status: "pending" },
    { id: 6, name: "한패션", platform: "YouTube", memo: "패션 스타일링", status: "active" },
    { id: 7, name: "오펫", platform: "TikTok", memo: "반려동물 콘텐츠", status: "active" },
    { id: 8, name: "서홈", platform: "Instagram", memo: "홈인테리어", status: "paused" },
];

export function InfluencerAgGridTest() {
    const [rowData, setRowData] = useState<Influencer[]>(INITIAL_DATA);

    // Column definitions
    const columnDefs = useMemo<ColDef<Influencer>[]>(() => [
        {
            field: "name",
            headerName: "이름",
            editable: false,
            flex: 1,
            minWidth: 120,
        },
        {
            field: "platform",
            headerName: "플랫폼",
            editable: false,
            flex: 1,
            minWidth: 100,
        },
        {
            field: "memo",
            headerName: "메모",
            editable: true,
            flex: 2,
            minWidth: 200,
        },
        {
            field: "status",
            headerName: "상태",
            editable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["pending", "active", "paused"],
            },
            cellRenderer: (params: { value: string }) => {
                const statusMap: Record<string, { label: string; color: string }> = {
                    pending: { label: "대기중", color: "#f59e0b" },
                    active: { label: "활성", color: "#22c55e" },
                    paused: { label: "일시정지", color: "#6b7280" },
                };
                const status = statusMap[params.value] || { label: params.value, color: "#000" };
                return (
                    <span
                        style={{
                            color: status.color,
                            fontWeight: 500,
                        }}
                    >
                        {status.label}
                    </span>
                );
            },
            flex: 1,
            minWidth: 100,
        },
    ], []);

    // Default column settings
    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    // Handle cell value change
    const onCellValueChanged = useCallback((event: CellValueChangedEvent<Influencer>) => {
        const { data, colDef, newValue } = event;
        if (!data || !colDef.field) return;

        setRowData(prev =>
            prev.map(row =>
                row.id === data.id
                    ? { ...row, [colDef.field as keyof Influencer]: newValue }
                    : row
            )
        );

        console.log(`Updated ${colDef.field} for ${data.name}: ${newValue}`);
    }, []);

    return (
        <div className="h-full flex flex-col bg-white p-6">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-900">
                    인플루언서 관리 (AG Grid Test)
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    memo와 status 컬럼은 더블클릭으로 편집 가능합니다
                </p>
            </div>

            {/* AG Grid */}
            <div className="flex-1 w-full">
                <AgGridReact<Influencer>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection="multiple"
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>

            {/* Debug: Current State */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">현재 상태 (Debug)</p>
                <pre className="text-xs text-gray-700 overflow-auto max-h-32">
                    {JSON.stringify(rowData, null, 2)}
                </pre>
            </div>
        </div>
    );
}
