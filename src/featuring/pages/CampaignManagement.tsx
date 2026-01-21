import { useState, useMemo, useCallback } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import { CoreButton } from "../../design-system";
import { CampaignGrid, CampaignGridRow } from "../components/CampaignGrid";

// Mock data matching Figma design
const MOCK_CAMPAIGNS: CampaignGridRow[] = [
    {
        id: 1,
        name: "26.03 다이슨 에어랩 멀티 스타일러 캠페인",
        description: "새학기 헤어 스타일링 꿀팁 및 똥손 탈출 웨이브 가...",
        status: "pending", // 진행 전
        tags: ["Sponsored Content", "Ambassadors"],
        startDate: "-",
        endDate: "-",
        campaignType: "오프라인/팝업",
        brandName: "dyson",
        contentCount: 0,
        contentReceivedCount: 0,
        contentTotalCount: 200,
        secondaryUsageCount: 6,
        budget: 100000000,
        platform: "instagram",
        contentTypes: ["tiktok"],
        influencerCategories: ["뷰티", "패션", "일상"],
        manager: "Rosie, Ian",
        createdAt: "2026-03-01",
        lastModified: "2026-03-01",
    },
    {
        id: 2,
        name: "26.01 미녀스더플랜더 캠페인",
        description: "미녀스더플랜더 신규 제품 홍보를 위한 인플루언서 캠페인",
        status: "running", // 진행 중
        tags: ["Engagement", "Reach", "UGC"],
        startDate: "25. 12. 25",
        endDate: "26. 01. 26",
        campaignType: "부가 시딩",
        brandName: "미녀스",
        contentCount: 30,
        contentReceivedCount: 30,
        contentTotalCount: 100,
        secondaryUsageCount: 3,
        budget: 100000000,
        platform: "instagram",
        contentTypes: ["instagram", "tiktok", "shorts"],
        influencerCategories: ["홈/리빙", "취미"],
        manager: "Rosie, Ian",
        createdAt: "2026-01-01",
        lastModified: "2026-01-01",
    },
    {
        id: 3,
        name: "25.10 성수 팝업 방문 캠페인",
        description: "10월 연달 성수동 오프라인 팝업 행사 방문형 ...",
        status: "completed", // 완료 (종료)
        tags: ["KOLs", "Ambassadors", "UGC"],
        startDate: "25. 12. 01",
        endDate: "26. 01. 01",
        campaignType: "어필리에이트",
        brandName: "FIG",
        contentCount: 100,
        contentReceivedCount: 100,
        contentTotalCount: 100,
        secondaryUsageCount: 3,
        budget: 100000000,
        platform: "instagram",
        contentTypes: ["instagram", "youtube", "shorts"],
        influencerCategories: ["IT/테크", "게임", "사진/영상"],
        manager: "Rosie, Ian",
        createdAt: "2025-10-01",
        lastModified: "2025-10-01",
    },
    {
        id: 4,
        name: "25.09 겨울 패딩 스타일링",
        description: "Y2K 무드 숏패딩 코디 제안, 데일리룩 OOTD 인증 캠페인",
        status: "completed",
        tags: ["KOLs", "Ambassadors", "UGC"],
        startDate: "25. 12. 01",
        endDate: "26. 01. 01",
        campaignType: "어필리에이트",
        brandName: "노스페이스",
        contentCount: 100,
        contentReceivedCount: 100,
        contentTotalCount: 100,
        secondaryUsageCount: 3,
        budget: 100000000,
        platform: "instagram",
        contentTypes: ["instagram", "shorts"],
        influencerCategories: ["여행/관광", "취미", "F&B"],
        manager: "Rosie, Ian",
        createdAt: "2025-09-01",
        lastModified: "2025-09-01",
    }
];

interface CampaignManagementProps {
    campaigns?: CampaignGridRow[];
    onNavigate: (view: string) => void;
    onCreateCampaign: () => void;
}

export function CampaignManagement({
    campaigns = MOCK_CAMPAIGNS,
    onNavigate,
    onCreateCampaign
}: CampaignManagementProps) {
    const [rowData, setRowData] = useState<CampaignGridRow[]>(campaigns);
    const [searchTerm, setSearchTerm] = useState("");
    // Tabs can be simplified or removed if not in design, keeping filters instead.
    // Design has filters: Status, Tag, Campaign Type, Content Type, Influencer Category, Manager

    // Filter Mock Logic
    const filteredData = useMemo(() => {
        let filtered = rowData;
        if (searchTerm) {
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [rowData, searchTerm]);

    // Stats
    const stats = useMemo(() => ({
        total: rowData.length,
        pre: rowData.filter(c => c.status === "pending" || c.status === "drafting").length,
        running: rowData.filter(c => c.status === "running").length,
        completed: rowData.filter(c => c.status === "completed" || c.status === "archived").length
    }), [rowData]);

    // Handle cell value change (for memo updates from Grid)
    const handleUpdateCampaign = useCallback((id: number, field: string, value: any) => {
        setRowData(prev =>
            prev.map(row =>
                row.id === id
                    ? { ...row, [field as keyof CampaignGridRow]: value }
                    : row
            )
        );
        console.log(`Updated ${field} for campaign ${id}: ${value}`);
    }, []);

    const FilterButton = ({ label }: { label: string }) => (
        <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
            {label}
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-100">
                <h1 className="text-lg font-bold text-gray-900">캠페인 관리</h1>
            </div>

            {/* Stats Cards (White blocks with dividers) */}
            <div className="px-6 py-6 font-[Pretendard]">
                <div className="flex bg-white rounded-lg border border-gray-200 divide-x divide-gray-100 shadow-sm">
                    {/* Total - Custom Layout for first item */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-gray-200 rounded-full"></div>
                            <span className="text-sm text-gray-400 font-medium">전체 캠페인 수</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            5 <span className="text-base font-normal text-gray-400">/ 100 개</span>
                        </p>
                    </div>

                    {/* Pre */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                            <span className="text-sm text-gray-400 font-medium">진행 전</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.pre} <span className="text-base font-normal text-gray-400">건</span>
                        </p>
                    </div>

                    {/* Running */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-blue-600 font-medium">진행 중</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.running} <span className="text-base font-normal text-gray-400">건</span>
                        </p>
                    </div>

                    {/* Completed */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span className="text-sm text-gray-500 font-medium">완료</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.completed} <span className="text-base font-normal text-gray-400">건</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="px-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FilterButton label="상태" />
                    <FilterButton label="태그" />
                    <FilterButton label="캠페인 유형" />
                    <FilterButton label="콘텐츠 유형" />
                    <FilterButton label="인플루언서 카테고리" />
                    <FilterButton label="담당자" />
                </div>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="캠페인명, 설명, 브랜드명 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded bg-white w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow placeholder:text-gray-300"
                        />
                    </div>
                    <CoreButton
                        variant="primary"
                        size="md"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={onCreateCampaign}
                        className="bg-blue-600 hover:bg-blue-700 border-none font-medium"
                    >
                        + 새 캠페인 시작
                    </CoreButton>
                </div>
            </div>

            {/* Campaign Grid with light background for table container if needed, but per design it looks white */}
            <div className="flex-1 px-6 pb-6 overflow-hidden">
                <CampaignGrid
                    campaigns={filteredData}
                    onNavigate={onNavigate}
                    onUpdateCampaign={handleUpdateCampaign}
                />
            </div>
        </div>
    );
}
