import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, ICellRendererParams } from "ag-grid-community";
import { Plus, Sparkles, MoreHorizontal, HelpCircle, Users } from "lucide-react";
import { CoreButton, CoreTag } from "../../design-system";
import { customAgGridTheme } from "../utils/agGridTheme";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface InfluencerGroup {
    id: number;
    name: string;
    platform: 'instagram' | 'youtube' | 'x' | 'tiktok' | 'blog';
    badge?: string;
    memberCount: number;
    sharedWorkspaces?: { id: number; name: string }[];
}

interface InfluencerManagementProps {
    onNavigate: (view: string) => void;
}

// Mock Data
const MOCK_GROUPS: InfluencerGroup[] = [
    {
        id: 1,
        name: "신학기 백투스쿨 캠페인 리스트업",
        platform: "instagram",
        badge: "AI 프리 리스트업 중",
        memberCount: 100,
        sharedWorkspaces: []
    },
    {
        id: 2,
        name: "신학기 백투스쿨 캠페인 리스트업",
        platform: "instagram",
        badge: "AI 프리 리스트업 중",
        memberCount: 100,
        sharedWorkspaces: []
    },
    {
        id: 3,
        name: "{List-up}Cass_JCE&LEMON7.0",
        platform: "instagram",
        memberCount: 60,
        sharedWorkspaces: [
            { id: 1, name: "연결된 워크스페이스(2)" }
        ]
    },
    {
        id: 4,
        name: "2025 추석 홈파티 프로젝트",
        platform: "instagram",
        memberCount: 20,
        sharedWorkspaces: [
            { id: 1, name: "연결된 워크스페이스(2)" }
        ]
    }
];

// Platform icons
const platformIcons: Record<string, string> = {
    instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    youtube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    x: "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
    tiktok: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1200px-TikTok_logo.svg.png",
    blog: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Naver_Blog_logo.svg"
};

export function InfluencerManagement({ onNavigate }: InfluencerManagementProps) {
    const [activeTab, setActiveTab] = useState<'my' | 'shared'>('my');
    const [activePlatform, setActivePlatform] = useState<string>('all');
    const [groups] = useState<InfluencerGroup[]>(MOCK_GROUPS);

    // Calculate total influencers
    const totalInfluencers = useMemo(() =>
        groups.reduce((sum, g) => sum + g.memberCount, 0),
        [groups]);

    // Filter groups by platform
    const filteredGroups = useMemo(() => {
        if (activePlatform === 'all') return groups;
        return groups.filter(g => g.platform === activePlatform);
    }, [groups, activePlatform]);

    // Column Definitions
    const columnDefs = useMemo<ColDef<InfluencerGroup>[]>(() => [
        {
            field: "name",
            headerName: "그룹 목록",
            flex: 1,
            minWidth: 350,
            cellRenderer: (params: ICellRendererParams<InfluencerGroup>) => {
                const { data } = params;
                if (!data) return null;
                return (
                    <div className="flex items-center gap-3 py-2">
                        <img
                            src={platformIcons[data.platform]}
                            alt={data.platform}
                            className="w-5 h-5"
                        />
                        <span className="font-medium text-gray-900">{data.name}</span>
                        {data.badge && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                {data.badge}
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            field: "memberCount",
            headerName: "",
            width: 100,
            cellRenderer: (params: ICellRendererParams<InfluencerGroup>) => {
                if (!params.data) return null;
                return (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {params.data.memberCount}
                    </div>
                );
            }
        },
        {
            headerName: "",
            width: 50,
            cellRenderer: () => (
                <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
            )
        },
        {
            field: "sharedWorkspaces",
            headerName: "공유 상태",
            width: 200,
            cellRenderer: (params: ICellRendererParams<InfluencerGroup>) => {
                const workspaces = params.data?.sharedWorkspaces || [];
                if (workspaces.length === 0) return null;
                return (
                    <div className="flex flex-wrap gap-1">
                        {workspaces.map(ws => (
                            <span
                                key={ws.id}
                                className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs"
                            >
                                {ws.name}
                            </span>
                        ))}
                    </div>
                );
            }
        }
    ], []);

    // Platform filter buttons
    const platforms = [
        { key: 'instagram', label: '인스타그램', icon: platformIcons.instagram },
        { key: 'youtube', label: '유튜브', icon: platformIcons.youtube },
        { key: 'x', label: '엑스', icon: platformIcons.x },
        { key: 'tiktok', label: '틱톡', icon: platformIcons.tiktok },
        { key: 'blog', label: '네이버 블로그', icon: platformIcons.blog }
    ];

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-900">인플루언서 관리</h1>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1.5">
                    <HelpCircle className="w-4 h-4" />
                    인플루언서 관리 가이드
                </button>
            </div>

            {/* Tabs */}
            <div className="px-6 py-3 border-b border-gray-100">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('my')}
                        className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'my'
                            ? 'text-gray-900 border-gray-900'
                            : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                    >
                        내 그룹
                    </button>
                    <button
                        onClick={() => setActiveTab('shared')}
                        className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'shared'
                            ? 'text-gray-900 border-gray-900'
                            : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                    >
                        공유 받은 그룹
                    </button>
                </div>
            </div>

            {/* Platform Filters */}
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex gap-2">
                    {platforms.map(({ key, label, icon }) => (
                        <button
                            key={key}
                            onClick={() => setActivePlatform(activePlatform === key ? 'all' : key)}
                            className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 border transition-colors ${activePlatform === key
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <img src={icon} alt={label} className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <CoreButton
                        variant="secondary"
                        size="sm"
                        leftIcon={<Sparkles className="w-4 h-4 text-purple-600" />}
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                        AI 프리 리스트업
                    </CoreButton>
                    <CoreButton
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus className="w-4 h-4" />}
                    >
                        새 그룹 생성
                    </CoreButton>
                </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">전체</span>
                    <span className="text-sm text-gray-500">👥 전체 인플루언서</span>
                    <span className="text-sm font-bold text-gray-900">R. {totalInfluencers}</span>
                </div>
            </div>

            {/* Group Table */}
            <div className="flex-1 px-6 py-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">그룹 목록</span>
                        <span className="text-xs text-gray-400">🗂️ {groups.length}/100</span>
                    </div>
                </div>

                <div className="h-[calc(100%-80px)] border border-gray-200 rounded-lg overflow-hidden">
                    <AgGridReact
                        theme={customAgGridTheme}
                        rowData={filteredGroups}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellStyle: { display: 'flex', alignItems: 'center' }
                        }}
                        rowHeight={56}
                        headerHeight={44}
                        domLayout="normal"
                        onRowClicked={(event) => {
                            if (event.data?.id) {
                                onNavigate(`influencer-group-detail-${event.data.id}`);
                            }
                        }}
                    />
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <select className="px-3 py-1.5 border border-gray-200 rounded text-sm">
                            <option>50 / page</option>
                            <option>100 / page</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-2 py-1 text-gray-400 hover:text-gray-600">&lt;</button>
                        <span className="px-3 py-1 text-sm text-gray-900 border-b-2 border-gray-900">1</span>
                        <button className="px-2 py-1 text-gray-400 hover:text-gray-600">&gt;</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="페이지 입력"
                            className="w-24 px-2 py-1.5 border border-gray-200 rounded text-sm"
                        />
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded">
                            이동
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
