import { useState, useCallback } from "react";
import { ReactGrid, Column, Row, CellChange, TextCell, DropdownCell, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

// Influencer type definition
interface Influencer {
    id: number;
    name: string;
    platform: string;
    memo: string;
    status: "pending" | "active" | "paused";
}

// Status options for dropdown
const STATUS_OPTIONS = [
    { value: "pending", label: "대기중" },
    { value: "active", label: "활성" },
    { value: "paused", label: "일시정지" },
];

// Initial dummy data
const INITIAL_DATA: Influencer[] = [
    { id: 1, name: "김뷰티", platform: "Instagram", memo: "뷰티 전문 인플루언서", status: "active" },
    { id: 2, name: "이푸드", platform: "YouTube", memo: "음식 리뷰어", status: "pending" },
    { id: 3, name: "박트래블", platform: "TikTok", memo: "여행 콘텐츠", status: "paused" },
];

// Column definitions
const getColumns = (): Column[] => [
    { columnId: "name", width: 150 },
    { columnId: "platform", width: 120 },
    { columnId: "memo", width: 250 },
    { columnId: "status", width: 120 },
];

// Header row
const getHeaderRow = (): Row => ({
    rowId: "header",
    cells: [
        { type: "header", text: "이름" },
        { type: "header", text: "플랫폼" },
        { type: "header", text: "메모" },
        { type: "header", text: "상태" },
    ],
});

// Convert influencer data to ReactGrid rows
const getRows = (influencers: Influencer[]): Row<DefaultCellTypes | DropdownCell>[] => [
    getHeaderRow(),
    ...influencers.map<Row<DefaultCellTypes | DropdownCell>>((inf) => ({
        rowId: inf.id,
        cells: [
            { type: "text", text: inf.name, nonEditable: true } as TextCell,
            { type: "text", text: inf.platform, nonEditable: true } as TextCell,
            { type: "text", text: inf.memo } as TextCell,
            {
                type: "dropdown",
                selectedValue: inf.status,
                values: STATUS_OPTIONS,
                isOpen: false,
            } as DropdownCell,
        ],
    })),
];

export function InfluencerGridTest() {
    const [influencers, setInfluencers] = useState<Influencer[]>(INITIAL_DATA);

    const columns = getColumns();
    const rows = getRows(influencers);

    // Handle cell changes - separated for future server saving
    const handleCellsChanged = useCallback((changes: CellChange<DefaultCellTypes | DropdownCell>[]) => {
        // Filter only editable column changes (memo, status)
        const editableChanges = changes.filter(
            (change) => change.columnId === "memo" || change.columnId === "status"
        );

        if (editableChanges.length === 0) return;

        setInfluencers((prev) => {
            // Create shallow copy only when needed
            const updated = [...prev];

            editableChanges.forEach((change) => {
                const rowIndex = updated.findIndex((inf) => inf.id === change.rowId);
                if (rowIndex === -1) return;

                // Update only the changed field
                if (change.type === "text" && change.columnId === "memo") {
                    const textChange = change as CellChange<TextCell>;
                    if (updated[rowIndex].memo !== textChange.newCell.text) {
                        updated[rowIndex] = {
                            ...updated[rowIndex],
                            memo: textChange.newCell.text,
                        };
                    }
                }

                if (change.type === "dropdown" && change.columnId === "status") {
                    const dropdownChange = change as CellChange<DropdownCell>;
                    const newStatus = dropdownChange.newCell.selectedValue as Influencer["status"];
                    if (updated[rowIndex].status !== newStatus) {
                        updated[rowIndex] = {
                            ...updated[rowIndex],
                            status: newStatus,
                        };
                    }
                }
            });

            return updated;
        });

        // TODO: Future server save integration point
        // await saveToServer(editableChanges);
    }, []);

    return (
        <div className="h-full flex flex-col bg-white p-6">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-900">
                    인플루언서 관리 (ReactGrid Test)
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    memo와 status 컬럼은 클릭/더블클릭으로 편집 가능합니다
                </p>
            </div>

            {/* ReactGrid */}
            <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
                <ReactGrid
                    rows={rows}
                    columns={columns}
                    onCellsChanged={handleCellsChanged}
                    enableRangeSelection
                    enableRowSelection
                />
            </div>

            {/* Debug: Current State */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-2">현재 상태 (Debug)</p>
                <pre className="text-xs text-gray-700 overflow-auto max-h-32">
                    {JSON.stringify(influencers, null, 2)}
                </pre>
            </div>
        </div>
    );
}
