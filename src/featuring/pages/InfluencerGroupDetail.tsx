import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, ICellRendererParams, SelectionChangedEvent, RowClickedEvent } from "ag-grid-community";
import {
    ArrowLeft,
    Share2,
    X,
    Search,
    Edit2,
    RotateCw,
    Sparkles,
    Settings,
    Upload,
    Download,
    Trash2,
    Copy,
    FolderInput,
    ChevronDown,
    MoreHorizontal,
    FileSpreadsheet,
    UserPlus,
    EyeOff,
    RefreshCw
} from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { InfluencerManagementDrawer, InfluencerProfile } from "../components/InfluencerManagementDrawer";
import { customAgGridTheme } from "../utils/agGridTheme";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface GroupInfluencer {
    id: number;
    username: string;
    displayName: string;
    profileImage?: string;
    email?: string;
    note?: string;
    cost: number;
    isProgressing: boolean;
    profileLink: string;
    categories: string[];
    followers: number;
    avgViews: number;
    er: number;
    estimatedReach: number;
    avgLikes: number;
    avgComments: number;
    avgLikesVideo: number;
    cpr: number;
    cpv: number;
    platform: 'instagram' | 'youtube' | 'x' | 'tiktok' | 'blog';
}

interface InfluencerGroup {
    id: number;
    name: string;
    platform: 'instagram' | 'youtube' | 'x' | 'tiktok' | 'blog';
    memberCount: number;
    tags?: string[];
}

interface InfluencerGroupDetailProps {
    group: InfluencerGroup;
    onBack: () => void;
    onNavigate: (view: string) => void;
}

// Mock influencer data
const MOCK_INFLUENCERS: GroupInfluencer[] = [
    {
        id: 1,
        username: "00onkoshiyun",
        displayName: "Tteokbokkiyun",
        email: "",
        note: "미입력",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        avgLikesVideo: 0,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    } as any,
    {
        id: 2,
        username: "dinopark47",
        displayName: "dinopark47",
        email: "chxr789@gmail.com",
        note: "참가 확약시 추가 할인 가능",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    },
    {
        id: 3,
        username: "alienfox11",
        displayName: "alienfox11",
        email: "미입력",
        note: "10대와 20대 초반의 젊은 팔로워를 타겟으로 한 틱톡 댄스 및 유머 콘텐츠...",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    },
    {
        id: 4,
        username: "goldcol",
        displayName: "goldcol",
        email: "미입력",
        note: "미입력",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    },
    {
        id: 5,
        username: "silentfox11",
        displayName: "silentfox11",
        email: "미입력",
        note: "미입력",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    },
    {
        id: 6,
        username: "silentfox11",
        displayName: "silentfox11",
        email: "leo@gmail.com",
        note: "장기 계약 시 추가 할인 가능",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    },
    {
        id: 7,
        username: "oceanwave72",
        displayName: "oceanwave72",
        email: "ho345@kakao.com",
        note: "미입력",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
    },
    {
        id: 8,
        username: "kimchiblower",
        displayName: "kimchiblower",
        email: "미입력",
        note: "미입력",
        cost: 900000,
        isProgressing: true,
        profileLink: "www.instagram.com/tteokb...",
        categories: ["F&B", "다이어트/건강보조식품"],
        followers: 9204,
        avgViews: 9204,
        er: 10,
        estimatedReach: 9204,
        avgLikes: 9204,
        avgComments: 9204,
        cpr: 10000,
        cpv: 10,
        platform: "instagram"
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

export function InfluencerGroupDetail({ group, onBack, onNavigate }: InfluencerGroupDetailProps) {
    const [influencers] = useState<GroupInfluencer[]>(MOCK_INFLUENCERS);
    const [filterTags, setFilterTags] = useState<string[]>(['Tag', 'Tag', 'Tag']);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Drawer state
    const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerProfile | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Refs for dropdown click outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const removeTag = (index: number) => {
        setFilterTags(prev => prev.filter((_, i) => i !== index));
    };

    const handleSelectionChanged = (event: SelectionChangedEvent) => {
        setSelectedCount(event.api.getSelectedRows().length);
    };

    // Row click handler to open drawer
    const handleRowClicked = (event: RowClickedEvent<GroupInfluencer>) => {
        if (!event.data) return;

        // Map GroupInfluencer to InfluencerProfile
        const profile: InfluencerProfile = {
            id: event.data.id,
            username: event.data.username,
            displayName: event.data.displayName,
            profileImage: event.data.profileImage,
            bio: '', // Mock data doesn't have bio
            isVerified: true,
            postsCount: 120, // Mock
            followersCount: event.data.followers,
            followingCount: 500, // Mock
            categories: event.data.categories,
        };

        setSelectedInfluencer(profile);
        setIsDrawerOpen(true);
    };

    // Format number
    const formatNumber = (num: number) => {
        if (!num) return '0';
        return num.toLocaleString();
    };

    // Format large number
    const formatLargeNumber = (num: number) => {
        if (!num) return '0명';
        return `${num.toLocaleString()} 명`;
    };

    // Format currency
    const formatCurrency = (num: number) => {
        return num.toLocaleString();
    };

    // Column Definitions
    const columnDefs = useMemo<ColDef<GroupInfluencer>[]>(() => [
        {
            field: "displayName",
            headerName: "계정",
            width: 250,
            pinned: 'left',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => {
                if (!params.data) return null;
                return (
                    <div className="flex items-center gap-3 py-1">
                        <CoreAvatar
                            src={params.data.profileImage}
                            name={params.data.displayName}
                            size="sm"
                        />
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-gray-900 truncate">
                                    {params.data.displayName}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                    {params.data.note?.startsWith("미입력") ? "미입력 설명..." : params.data.note?.substring(0, 15) + "..."}
                                </span>
                            </div>
                        </div>
                        {/* SNS Icons - simplified for mock */}
                        <div className="flex items-center gap-1 ml-auto">
                            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                );
            }
        },
        {
            field: "email",
            headerName: "이메일",
            width: 150,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className={`text-sm ${!params.value ? 'text-gray-300' : 'text-gray-600'}`}>
                    {params.value || '미입력'}
                </span>
            )
        },
        {
            field: "note",
            headerName: "참고 사항",
            width: 200,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className={`text-sm truncate ${params.value === '미입력' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {params.value}
                </span>
            )
        },
        {
            field: "cost",
            headerName: "26 예상 단가",
            width: 100,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatCurrency(params.value)}</span>
            )
        },
        {
            field: "isProgressing",
            headerName: "진행 여부",
            width: 90,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={params.value}
                        readOnly
                        className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                </div>
            )
        },
        {
            field: "profileLink",
            headerName: "계정 링크",
            width: 150,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <a href={`https://${params.value}`} className="text-sm text-blue-500 hover:underline truncate block">
                    {params.value}
                </a>
            )
        },
        {
            field: "categories",
            headerName: "카테고리",
            width: 180,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <div className="flex items-center gap-1 overflow-hidden">
                    {params.value?.map((cat: string, idx: number) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-orange-50 text-orange-700 text-[11px] rounded flex-shrink-0">
                            {cat}
                        </span>
                    ))}
                </div>
            )
        },
        {
            field: "followers",
            headerName: "팔로워 수",
            width: 100,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatLargeNumber(params.value)}</span>
            )
        },
        {
            field: "avgViews",
            headerName: "예상 유효 팔로워 수",
            width: 130,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatLargeNumber(params.value)}</span>
            )
        },
        {
            field: "er",
            headerName: "ER",
            width: 80,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{params.value}%</span>
            )
        },
        {
            field: "estimatedReach",
            headerName: "예상 평균 도달 수",
            width: 130,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatLargeNumber(params.value)}</span>
            )
        },
        {
            field: "avgLikes",
            headerName: "평균 피드 좋아요 수",
            width: 130,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatLargeNumber(params.value)} 회</span>
            )
        },
        {
            field: "avgLikesVideo",
            headerName: "평균 동영상 조회 수",
            width: 130,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatLargeNumber(params.value || 9204)} 회</span>
            )
        },
        {
            field: "avgComments",
            headerName: "평균 동영상 좋아요 수",
            width: 140,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatLargeNumber(params.value)} 회</span>
            )
        },
        {
            field: "cpr",
            headerName: "예상 CPR",
            width: 100,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatCurrency(params.value)}원</span>
            )
        },
        {
            field: "cpv",
            headerName: "예상 광고비",
            width: 100,
            cellRenderer: (params: ICellRendererParams<GroupInfluencer>) => (
                <span className="text-sm text-gray-900">{formatCurrency(params.value)}원</span>
            )
        }
    ], []);

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    {/* Left: Breadcrumb/Title Area */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-1.5 hover:bg-gray-100 rounded"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* Platform Icons Group */}
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                            <img src={platformIcons.instagram} alt="instagram" className="w-4 h-4" />
                            <img src={platformIcons.youtube} alt="youtube" className="w-4 h-4 grayscale opacity-50" />
                            <img src={platformIcons.x} alt="x" className="w-4 h-4 grayscale opacity-50" />
                            <img src={platformIcons.tiktok} alt="tiktok" className="w-4 h-4 grayscale opacity-50" />
                            <span className="w-px h-3 bg-gray-300 mx-1"></span>
                            <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center text-[10px] text-pink-600 font-bold">P</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-bold text-gray-900">{group.name}</h1>
                            <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-2 py-0.5 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50">
                                <Share2 className="w-3 h-3" /> 공유
                            </button>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs flex items-center gap-1">
                                연결된 워크스페이스(2)
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs flex items-center gap-1">
                                공사 링크(1)
                            </span>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-2">
                        <CoreButton
                            variant="primary"
                            size="sm"
                            leftIcon={<Sparkles className="w-4 h-4 text-yellow-400" />}
                            className="bg-black text-white hover:bg-gray-800 border-none"
                        >
                            AI 프리 리스트업 요청
                        </CoreButton>
                        <CoreButton
                            variant="secondary"
                            size="sm"
                            leftIcon={<RotateCw className="w-4 h-4" />}
                            className="bg-white border-gray-200 text-gray-700"
                        >
                            리스트업 진행중
                        </CoreButton>
                    </div>
                </div>

                {/* Filter Tags & Search */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 rounded">
                            ⚡ 필터
                        </button>
                        {filterTags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded text-sm flex items-center gap-1 border border-purple-100"
                            >
                                {tag} <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(idx)} />
                            </span>
                        ))}
                        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700">
                            <RotateCw className="w-3 h-3" /> 초기화
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="아이디, 그룹명, 카테고리, 메모 검색"
                            className="w-80 pl-9 pr-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                </div>
            </div>

            {/* Stats & Toolbar */}
            <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900">총 100명 <span className="text-gray-400 text-xs font-normal">/ 500명</span></span>

                    {/* Bulk Actions */}
                    <div className="flex items-center gap-1 ml-4 pl-4 border-l border-gray-300">
                        {/* 캠페인 배정 */}
                        <div className="relative group">
                            <button
                                disabled={selectedCount === 0}
                                onClick={() => alert("Mock: 캠페인 배정")}
                                className={`px-2 py-1.5 flex items-center gap-1 text-xs rounded transition-colors
                                    ${selectedCount > 0
                                        ? 'text-gray-700 hover:bg-gray-100'
                                        : 'text-gray-300 cursor-not-allowed'}`}
                            >
                                <FolderInput className="w-3.5 h-3.5" />
                                캠페인 배정
                            </button>
                            {selectedCount === 0 && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                                    먼저 목록에서 인플루언서를 선택해 주세요.
                                </div>
                            )}
                        </div>

                        {/* 다른 그룹에 복사 */}
                        <div className="relative group">
                            <button
                                disabled={selectedCount === 0}
                                onClick={() => alert("Mock: 다른 그룹에 복사")}
                                className={`px-2 py-1.5 flex items-center gap-1 text-xs rounded transition-colors
                                    ${selectedCount > 0
                                        ? 'text-gray-700 hover:bg-gray-100'
                                        : 'text-gray-300 cursor-not-allowed'}`}
                            >
                                <Copy className="w-3.5 h-3.5" />
                                다른 그룹에 복사
                            </button>
                            {selectedCount === 0 && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                                    먼저 목록에서 인플루언서를 선택해 주세요.
                                </div>
                            )}
                        </div>

                        {/* 삭제 */}
                        <div className="relative group">
                            <button
                                disabled={selectedCount === 0}
                                onClick={() => alert("Mock: 삭제 확인")}
                                className={`px-2 py-1.5 flex items-center gap-1 text-xs rounded transition-colors
                                    ${selectedCount > 0
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-gray-300 cursor-not-allowed'}`}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                삭제
                            </button>
                            {selectedCount === 0 && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                                    먼저 목록에서 인플루언서를 선택해 주세요.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" /> 일괄 업데이트
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1.5">
                        <EyeOff className="w-3.5 h-3.5" /> 민감 데이터 설정
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" /> 표 컬럼 설정
                    </button>

                    {/* Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1.5"
                        >
                            <Download className="w-3.5 h-3.5" />
                            인플루언서 업/다운로드
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
                                <button className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <UserPlus className="w-3.5 h-3.5" />
                                    인플루언서 대량 추가
                                </button>
                                <button className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <FileSpreadsheet className="w-3.5 h-3.5" />
                                    엑셀 다운로드
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 px-6 py-0 overflow-hidden bg-white">
                <div className="h-full">
                    <AgGridReact
                        theme={customAgGridTheme}
                        rowData={influencers}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellStyle: { display: 'flex', alignItems: 'center' }
                        }}
                        rowHeight={50}
                        headerHeight={40}
                        rowSelection="multiple"
                        domLayout="normal"
                        suppressRowClickSelection={true}
                        onSelectionChanged={handleSelectionChanged}
                        onRowClicked={handleRowClicked}
                    />
                </div>
            </div>

            {/* Influencer Management Drawer */}
            <InfluencerManagementDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                influencer={selectedInfluencer}
            />
        </div>
    );
}
