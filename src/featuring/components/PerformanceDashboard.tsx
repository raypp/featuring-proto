import { useState, useMemo, useCallback, useRef } from "react";
import {
    Users, MousePointer, TrendingUp, Target, ChevronDown, ChevronRight,
    Download, ArrowUpRight, ArrowDownRight, ExternalLink, Play,
    Heart, MessageCircle, Bookmark, Image, Search
} from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { DailyPerformance } from "../types";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, AllCommunityModule, ICellRendererParams, RowSelectionOptions, SelectionChangedEvent } from "ag-grid-community";
import { customAgGridTheme } from "../utils/agGridTheme";

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface PerformanceDashboardProps {
    influencerCount: number;
}

// Extended Content Performance interface with new columns
interface ContentPerformance {
    id: number;
    contentType: '릴스' | '피드' | '스토리' | '쇼츠' | '릴스/피드';
    thumbnailUrl?: string;
    contentUrl: string;
    postedDate: string;
    influencerName: string;
    influencerUsername?: string;
    influencerProfileImage?: string;
    followerCount: number;
    likes: number;
    comments: number;
    views: number;
    shares: number;
    cpv?: number; // Cost per View
    cpe?: number; // Cost per Engagement
    er?: number; // Engagement Rate (follower-based)
    // DM-related metrics
    dmReceivedCount: number;
    totalClickUsers: number;
    totalClicks: number;
    ctr: number; // Click Through Rate
    followConversionCount: number;
    followConversionRate: number;
    notes?: string;
    // Button-level performance (for expansion)
    buttonPerformance: {
        buttonName: string;
        url: string;
        clicks: number;
        uniqueClicks: number;
        ctr: number;
    }[];
}

const mockDailyData: DailyPerformance[] = [
    { date: "01/14", reach: 12500, clicks: 890, conversions: 45 },
    { date: "01/15", reach: 15800, clicks: 1120, conversions: 62 },
    { date: "01/16", reach: 14200, clicks: 980, conversions: 51 },
    { date: "01/17", reach: 18900, clicks: 1450, conversions: 78 },
    { date: "01/18", reach: 21000, clicks: 1680, conversions: 92 },
    { date: "01/19", reach: 19500, clicks: 1520, conversions: 85 },
    { date: "01/20", reach: 23400, clicks: 1890, conversions: 105 },
];

const mockContentData: ContentPerformance[] = [
    {
        id: 1,
        contentType: '릴스/피드',
        thumbnailUrl: 'https://picsum.photos/seed/content1/100/100',
        contentUrl: 'https://www.instagram.com/p/DTuPNt4kxAL/?img_index=1',
        postedDate: '2026-01-15',
        influencerName: 'pochaacccoo',
        influencerUsername: 'pochaacccoo',
        followerCount: 125000,
        likes: 3200,
        comments: 145,
        views: 45200,
        shares: 89,
        cpv: 0.45,
        cpe: 2.8,
        er: 2.7,
        dmReceivedCount: 1250,
        totalClickUsers: 890,
        totalClicks: 2340,
        ctr: 71.2,
        followConversionCount: 125,
        followConversionRate: 10.0,
        notes: '',
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/1', clicks: 1520, uniqueClicks: 580, ctr: 46.4 },
            { buttonName: '이벤트 참여', url: 'https://brand.com/event', clicks: 820, uniqueClicks: 310, ctr: 24.8 },
        ]
    },
    {
        id: 2,
        contentType: '피드',
        thumbnailUrl: 'https://picsum.photos/seed/content2/100/100',
        contentUrl: 'https://instagram.com/p/2',
        postedDate: '2026-01-19',
        influencerName: '이패션',
        influencerUsername: 'fashion_lee',
        followerCount: 89000,
        likes: 2100,
        comments: 89,
        views: 32100,
        shares: 56,
        cpv: 0.52,
        cpe: 3.2,
        er: 2.5,
        dmReceivedCount: 980,
        totalClickUsers: 650,
        totalClicks: 1890,
        ctr: 66.3,
        followConversionCount: 98,
        followConversionRate: 10.0,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/2', clicks: 1230, uniqueClicks: 420, ctr: 42.9 },
            { buttonName: '브랜드 팔로우', url: 'https://instagram.com/brand', clicks: 660, uniqueClicks: 230, ctr: 23.5 },
        ]
    },
    {
        id: 3,
        contentType: '릴스',
        thumbnailUrl: 'https://picsum.photos/seed/content3/100/100',
        contentUrl: 'https://instagram.com/reel/3',
        postedDate: '2026-01-18',
        influencerName: '박라이프',
        influencerUsername: 'life_park',
        followerCount: 245000,
        likes: 5600,
        comments: 312,
        views: 78500,
        shares: 145,
        cpv: 0.38,
        cpe: 2.1,
        er: 2.5,
        dmReceivedCount: 1850,
        totalClickUsers: 1120,
        totalClicks: 4120,
        ctr: 60.5,
        followConversionCount: 189,
        followConversionRate: 10.2,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/3', clicks: 2890, uniqueClicks: 780, ctr: 42.2 },
            { buttonName: '이벤트 참여', url: 'https://brand.com/event', clicks: 1230, uniqueClicks: 340, ctr: 18.4 },
        ]
    },
    {
        id: 4,
        contentType: '스토리',
        thumbnailUrl: 'https://picsum.photos/seed/content4/100/100',
        contentUrl: 'https://instagram.com/story/4',
        postedDate: '2026-01-18',
        influencerName: '최푸드',
        influencerUsername: 'food_choi',
        followerCount: 56000,
        likes: 0,
        comments: 0,
        views: 18200,
        shares: 12,
        cpv: 0.65,
        cpe: 5.8,
        er: 0.0,
        dmReceivedCount: 420,
        totalClickUsers: 280,
        totalClicks: 720,
        ctr: 66.7,
        followConversionCount: 35,
        followConversionRate: 8.3,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/4', clicks: 720, uniqueClicks: 280, ctr: 66.7 },
        ]
    },
    {
        id: 5,
        contentType: '피드',
        thumbnailUrl: 'https://picsum.photos/seed/content5/100/100',
        contentUrl: 'https://instagram.com/p/5',
        postedDate: '2026-01-17',
        influencerName: '정트래블',
        influencerUsername: 'travel_jung',
        followerCount: 178000,
        likes: 3400,
        comments: 178,
        views: 52300,
        shares: 98,
        cpv: 0.42,
        cpe: 2.5,
        er: 2.1,
        dmReceivedCount: 1320,
        totalClickUsers: 890,
        totalClicks: 2890,
        ctr: 67.4,
        followConversionCount: 145,
        followConversionRate: 11.0,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/5', clicks: 1890, uniqueClicks: 580, ctr: 43.9 },
            { buttonName: '할인 받기', url: 'https://brand.com/discount', clicks: 1000, uniqueClicks: 310, ctr: 23.5 },
        ]
    },
    {
        id: 6,
        contentType: '릴스',
        thumbnailUrl: 'https://picsum.photos/seed/content6/100/100',
        contentUrl: 'https://instagram.com/reel/6',
        postedDate: '2026-01-16',
        influencerName: '헬스보이',
        influencerUsername: 'health_boy',
        followerCount: 320000,
        likes: 12500,
        comments: 450,
        views: 156000,
        shares: 320,
        cpv: 0.35,
        cpe: 1.8,
        er: 4.1,
        dmReceivedCount: 2560,
        totalClickUsers: 1890,
        totalClicks: 5600,
        ctr: 73.8,
        followConversionCount: 420,
        followConversionRate: 16.4,
        buttonPerformance: [
            { buttonName: '운동 루틴 보기', url: 'https://brand.com/routine', clicks: 3200, uniqueClicks: 1100, ctr: 57.1 },
            { buttonName: '보충제 구매', url: 'https://brand.com/supplement', clicks: 2400, uniqueClicks: 790, ctr: 42.8 },
        ]
    },
    {
        id: 7,
        contentType: '피드',
        thumbnailUrl: 'https://picsum.photos/seed/content7/100/100',
        contentUrl: 'https://instagram.com/p/7',
        postedDate: '2026-01-16',
        influencerName: '데일리룩',
        influencerUsername: 'daily_look',
        followerCount: 65000,
        likes: 1800,
        comments: 65,
        views: 24000,
        shares: 45,
        cpv: 0.55,
        cpe: 3.5,
        er: 2.9,
        dmReceivedCount: 560,
        totalClickUsers: 320,
        totalClicks: 890,
        ctr: 57.1,
        followConversionCount: 45,
        followConversionRate: 8.0,
        buttonPerformance: [
            { buttonName: '코디 정보', url: 'https://brand.com/look/7', clicks: 650, uniqueClicks: 210, ctr: 73.0 },
            { buttonName: '최저가 검색', url: 'https://brand.com/search', clicks: 240, uniqueClicks: 110, ctr: 27.0 },
        ]
    },
    {
        id: 8,
        contentType: '스토리',
        thumbnailUrl: 'https://picsum.photos/seed/content8/100/100',
        contentUrl: 'https://instagram.com/story/8',
        postedDate: '2026-01-15',
        influencerName: '카페투어',
        influencerUsername: 'cafe_tour',
        followerCount: 42000,
        likes: 0,
        comments: 0,
        views: 12500,
        shares: 56,
        cpv: 0.72,
        cpe: 6.2,
        er: 0.0,
        dmReceivedCount: 280,
        totalClickUsers: 150,
        totalClicks: 420,
        ctr: 53.6,
        followConversionCount: 20,
        followConversionRate: 7.1,
        buttonPerformance: [
            { buttonName: '위치 보기', url: 'https://brand.com/location/8', clicks: 420, uniqueClicks: 150, ctr: 100 },
        ]
    },
    {
        id: 9,
        contentType: '릴스/피드',
        thumbnailUrl: 'https://picsum.photos/seed/content9/100/100',
        contentUrl: 'https://instagram.com/p/9',
        postedDate: '2026-01-15',
        influencerName: '집밥선생',
        influencerUsername: 'home_cook',
        followerCount: 210000,
        likes: 8900,
        comments: 320,
        views: 98000,
        shares: 560,
        cpv: 0.40,
        cpe: 2.2,
        er: 4.6,
        dmReceivedCount: 1890,
        totalClickUsers: 950,
        totalClicks: 3200,
        ctr: 50.3,
        followConversionCount: 210,
        followConversionRate: 11.1,
        buttonPerformance: [
            { buttonName: '레시피 보기', url: 'https://brand.com/recipe/9', clicks: 2100, uniqueClicks: 650, ctr: 65.6 },
            { buttonName: '재료 구매', url: 'https://brand.com/ingredients', clicks: 1100, uniqueClicks: 300, ctr: 34.4 },
        ]
    },
    {
        id: 10,
        contentType: '쇼츠',
        thumbnailUrl: 'https://picsum.photos/seed/content10/100/100',
        contentUrl: 'https://youtube.com/shorts/10',
        postedDate: '2026-01-14',
        influencerName: '테크리뷰',
        influencerUsername: 'tech_review',
        followerCount: 450000,
        likes: 25000,
        comments: 1200,
        views: 350000,
        shares: 890,
        cpv: 0.25,
        cpe: 1.5,
        er: 6.0,
        dmReceivedCount: 4200,
        totalClickUsers: 3500,
        totalClicks: 8900,
        ctr: 83.3,
        followConversionCount: 650,
        followConversionRate: 15.5,
        buttonPerformance: [
            { buttonName: '최저가 비교', url: 'https://brand.com/compare/10', clicks: 5600, uniqueClicks: 2100, ctr: 62.9 },
            { buttonName: '상세 스펙', url: 'https://brand.com/specs', clicks: 3300, uniqueClicks: 1400, ctr: 37.1 },
        ]
    },
    {
        id: 11,
        contentType: '피드',
        thumbnailUrl: 'https://picsum.photos/seed/content11/100/100',
        contentUrl: 'https://instagram.com/p/11',
        postedDate: '2026-01-14',
        influencerName: ' 육아맘',
        influencerUsername: 'mom_life',
        followerCount: 98000,
        likes: 4200,
        comments: 280,
        views: 45000,
        shares: 150,
        cpv: 0.48,
        cpe: 2.8,
        er: 4.7,
        dmReceivedCount: 890,
        totalClickUsers: 560,
        totalClicks: 1500,
        ctr: 62.9,
        followConversionCount: 85,
        followConversionRate: 9.6,
        buttonPerformance: [
            { buttonName: '공동구매 참여', url: 'https://brand.com/groupbuy/11', clicks: 1200, uniqueClicks: 450, ctr: 80.0 },
            { buttonName: '문의하기', url: 'https://brand.com/qna', clicks: 300, uniqueClicks: 110, ctr: 20.0 },
        ]
    },
    {
        id: 12,
        contentType: '릴스',
        thumbnailUrl: 'https://picsum.photos/seed/content12/100/100',
        contentUrl: 'https://instagram.com/reel/12',
        postedDate: '2026-01-13',
        influencerName: '댄스챌린지',
        influencerUsername: 'dance_challenge',
        followerCount: 560000,
        likes: 45000,
        comments: 890,
        views: 890000,
        shares: 2100,
        cpv: 0.15,
        cpe: 1.2,
        er: 8.5,
        dmReceivedCount: 5600,
        totalClickUsers: 2400,
        totalClicks: 6500,
        ctr: 42.9,
        followConversionCount: 450,
        followConversionRate: 8.0,
        buttonPerformance: [
            { buttonName: '음원 사용', url: 'https://brand.com/music/12', clicks: 4500, uniqueClicks: 1800, ctr: 69.2 },
            { buttonName: '챌린지 참여', url: 'https://brand.com/challenge', clicks: 2000, uniqueClicks: 600, ctr: 30.8 },
        ]
    },
    {
        id: 13,
        contentType: '스토리',
        thumbnailUrl: 'https://picsum.photos/seed/content13/100/100',
        contentUrl: 'https://instagram.com/story/13',
        postedDate: '2026-01-13',
        influencerName: '멍멍이',
        influencerUsername: 'dog_lover',
        followerCount: 120000,
        likes: 0,
        comments: 0,
        views: 35000,
        shares: 45,
        cpv: 0.58,
        cpe: 4.8,
        er: 0.0,
        dmReceivedCount: 780,
        totalClickUsers: 420,
        totalClicks: 980,
        ctr: 53.8,
        followConversionCount: 65,
        followConversionRate: 8.3,
        buttonPerformance: [
            { buttonName: '간식 정보', url: 'https://brand.com/snack/13', clicks: 980, uniqueClicks: 420, ctr: 100 },
        ]
    },
    {
        id: 14,
        contentType: '피드',
        thumbnailUrl: 'https://picsum.photos/seed/content14/100/100',
        contentUrl: 'https://instagram.com/p/14',
        postedDate: '2026-01-12',
        influencerName: '캠핑족',
        influencerUsername: 'camping_life',
        followerCount: 85000,
        likes: 2800,
        comments: 150,
        views: 32000,
        shares: 210,
        cpv: 0.52,
        cpe: 3.1,
        er: 3.7,
        dmReceivedCount: 650,
        totalClickUsers: 380,
        totalClicks: 1100,
        ctr: 58.5,
        followConversionCount: 56,
        followConversionRate: 8.6,
        buttonPerformance: [
            { buttonName: '장비 정보', url: 'https://brand.com/gear/14', clicks: 800, uniqueClicks: 280, ctr: 72.7 },
            { buttonName: '캠핑장 예약', url: 'https://brand.com/reserve', clicks: 300, uniqueClicks: 100, ctr: 27.3 },
        ]
    },
    {
        id: 15,
        contentType: '릴스',
        thumbnailUrl: 'https://picsum.photos/seed/content15/100/100',
        contentUrl: 'https://instagram.com/reel/15',
        postedDate: '2026-01-12',
        influencerName: '뷰티꿀팁',
        influencerUsername: 'beauty_tips',
        followerCount: 280000,
        likes: 15000,
        comments: 560,
        views: 210000,
        shares: 1200,
        cpv: 0.32,
        cpe: 2.5,
        er: 6.0,
        dmReceivedCount: 3200,
        totalClickUsers: 1500,
        totalClicks: 4500,
        ctr: 46.9,
        followConversionCount: 320,
        followConversionRate: 10.0,
        buttonPerformance: [
            { buttonName: '제품 정보', url: 'https://brand.com/product/15', clicks: 3000, uniqueClicks: 1000, ctr: 66.7 },
            { buttonName: '할인 쿠폰', url: 'https://brand.com/coupon', clicks: 1500, uniqueClicks: 500, ctr: 33.3 },
        ]
    }
];

export function PerformanceDashboard({ influencerCount }: PerformanceDashboardProps) {
    const [dateRange, setDateRange] = useState("7d");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // KPI Calculations
    const totalReach = mockDailyData.reduce((sum, d) => sum + d.reach, 0);
    const totalClicks = mockDailyData.reduce((sum, d) => sum + d.clicks, 0);
    const totalConversions = mockDailyData.reduce((sum, d) => sum + d.conversions, 0);
    const clickRate = totalReach > 0 ? (totalClicks / totalReach) * 100 : 0;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

    // Filter
    const filteredData = mockContentData.filter(c =>
        c.influencerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contentType.includes(searchTerm)
    );

    // Detail Cell Renderer (unused but required for types)
    const DetailCellRenderer = useCallback(() => null, []);

    // Column Definitions for AG Grid
    const columnDefs = useMemo<ColDef<ContentPerformance>[]>(() => [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 50,
            pinned: 'left',
            suppressMovable: true,
        },
        {
            headerName: "No.",
            width: 60,
            valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
            pinned: 'left',
        },
        {
            headerName: "콘텐츠 링크",
            field: "contentUrl",
            width: 180,
            pinned: 'left',
            cellRenderer: (params: ICellRendererParams<ContentPerformance>) => (
                <div className="flex items-center gap-2 h-full">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {params.data?.thumbnailUrl ? (
                            <img src={params.data.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Play className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    <a href={params.value} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-[var(--ft-color-primary-600)] hover:underline truncate max-w-[100px]"
                        onClick={(e) => e.stopPropagation()}>
                        <ExternalLink className="w-3.5 h-3.5 inline mr-1" />링크
                    </a>
                </div>
            ),
        },
        {
            headerName: "업로드 일자",
            field: "postedDate",
            width: 110,
        },
        {
            headerName: "콘텐츠 유형",
            field: "contentType",
            width: 100,
            cellRenderer: (params: ICellRendererParams<ContentPerformance>) => {
                const colors: Record<string, string> = {
                    '릴스': 'bg-pink-100 text-pink-700',
                    '피드': 'bg-blue-100 text-blue-700',
                    '스토리': 'bg-purple-100 text-purple-700',
                    '쇼츠': 'bg-red-100 text-red-700',
                    '릴스/피드': 'bg-indigo-100 text-indigo-700',
                };
                return (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[params.value || ''] || 'bg-gray-100 text-gray-700'}`}>
                        {params.value}
                    </span>
                );
            },
        },
        {
            headerName: "인플루언서",
            field: "influencerName",
            width: 140,
            cellRenderer: (params: ICellRendererParams<ContentPerformance>) => (
                <div className="flex items-center gap-2 h-full">
                    <CoreAvatar name={params.value || ''} size="xs" />
                    <span className="text-sm truncate">{params.value}</span>
                </div>
            ),
        },
        { headerName: "팔로워 수", field: "followerCount", width: 100, valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "좋아요 수", field: "likes", width: 90, valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "댓글 수", field: "comments", width: 80, valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "조회수", field: "views", width: 90, valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "공유 수", field: "shares", width: 80, valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "CPV", field: "cpv", width: 70, valueFormatter: (p) => p.value ? `₩${p.value.toFixed(2)}` : '-' },
        { headerName: "CPE", field: "cpe", width: 70, valueFormatter: (p) => p.value ? `₩${p.value.toFixed(2)}` : '-' },
        { headerName: "ER", field: "er", width: 70, valueFormatter: (p) => p.value !== undefined ? `${p.value.toFixed(1)}%` : '-' },
        // DM 관련 컬럼
        { headerName: "DM 수신 인원", field: "dmReceivedCount", width: 110, headerClass: 'bg-purple-50', valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "총 클릭 인원", field: "totalClickUsers", width: 100, headerClass: 'bg-purple-50', valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "총 클릭 수", field: "totalClicks", width: 90, headerClass: 'bg-purple-50', valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "CTR", field: "ctr", width: 70, headerClass: 'bg-purple-50', valueFormatter: (p) => `${p.value?.toFixed(1)}%`, cellStyle: { color: 'var(--ft-color-primary-600)', fontWeight: 500 } },
        { headerName: "팔로우 전환", field: "followConversionCount", width: 100, headerClass: 'bg-purple-50', valueFormatter: (p) => formatNumber(p.value) },
        { headerName: "팔로우 전환율", field: "followConversionRate", width: 100, headerClass: 'bg-purple-50', valueFormatter: (p) => `${p.value?.toFixed(1)}%` },
        { headerName: "비고", field: "notes", width: 120, editable: true },
    ], [formatNumber]);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
        suppressMovable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
    }), []);

    const selectionOptions = useMemo<RowSelectionOptions>(() => ({
        mode: 'multiRow',
        headerCheckbox: false,
        checkboxes: false,
        enableClickSelection: false,
    }), []);



    const getContentTypeIcon = (type: string) => {
        switch (type) {
            case '릴스':
            case '쇼츠':
                return <Play className="w-3.5 h-3.5" />;
            default:
                return <Image className="w-3.5 h-3.5" />;
        }
    };

    const getContentTypeBadge = (type: string) => {
        const colors: Record<string, string> = {
            '릴스': 'bg-pink-100 text-pink-700',
            '피드': 'bg-blue-100 text-blue-700',
            '스토리': 'bg-purple-100 text-purple-700',
            '쇼츠': 'bg-red-100 text-red-700',
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="h-full flex flex-col bg-[var(--ft-bg-base)] overflow-hidden">


            {/* KPI Cards - Campaign Management Style */}
            <div className="px-6 py-6 font-[Pretendard] shrink-0">
                <div className="flex bg-white rounded-lg border border-[var(--ft-border-primary)] divide-x divide-[var(--ft-border-secondary)] shadow-sm">
                    {/* Reach */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-[var(--ft-text-secondary)] font-medium">도달 인원</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {formatNumber(totalReach)} <span className="text-base font-normal text-[var(--ft-text-disabled)]">명</span>
                        </p>
                    </div>

                    {/* Clicks */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-[var(--ft-text-secondary)] font-medium">클릭 인원</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {formatNumber(totalClicks)} <span className="text-base font-normal text-[var(--ft-text-disabled)]">명</span>
                        </p>
                    </div>

                    {/* Click Rate */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-[var(--ft-text-secondary)] font-medium">클릭율</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {clickRate.toFixed(1)}% <span className="text-base font-normal text-[var(--ft-text-disabled)] text-sm">업계 평균 대비 +2.1%</span>
                        </p>
                    </div>

                    {/* Conversion Rate */}
                    <div className="flex-1 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-[var(--ft-text-secondary)] font-medium">전환율</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--ft-text-primary)]">
                            {conversionRate.toFixed(1)}% <span className="text-base font-normal text-[var(--ft-text-disabled)] text-sm">목표 달성률 92%</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Performance AG Grid */}
            <div className="flex-1 px-6 pb-6 min-h-0 flex flex-col">
                <div className="flex-1 bg-white rounded-lg border border-[var(--ft-border-primary)] flex flex-col overflow-hidden">
                    <div className="px-6 py-3 border-b border-[var(--ft-border-primary)] flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <h4 className="text-sm font-medium text-[var(--ft-text-primary)]">콘텐츠별 성과</h4>
                            <span className="text-xs text-[var(--ft-text-disabled)]">{filteredData.length}개</span>
                        </div>
                        <div className="relative w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                            <input
                                type="text"
                                placeholder="콘텐츠 또는 인플루언서 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-9 pl-9 pr-4 text-sm bg-white border border-[var(--ft-border-primary)] rounded-md focus:border-[var(--ft-color-primary-500)] focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* AG Grid Container */}
                    <div className="flex-1 overflow-hidden">
                        <AgGridReact
                            theme={customAgGridTheme}
                            rowData={filteredData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            rowSelection={selectionOptions}
                            pagination={true}
                            paginationPageSize={20}
                            rowHeight={70}
                            headerHeight={44}
                            animateRows={true}
                            onRowClicked={(params) => {
                                if (params.data) {
                                    setExpandedId(expandedId === params.data.id ? null : params.data.id);
                                }
                            }}
                            masterDetail={true}
                            detailCellRenderer={DetailCellRenderer}
                            detailRowHeight={150}
                            isRowMaster={(data) => data.buttonPerformance && data.buttonPerformance.length > 0}
                            getRowId={(params) => String(params.data.id)}
                        />
                    </div>

                    {/* Expanded Button Performance Panel */}
                    {expandedId && (
                        <div className="border-t border-[var(--ft-border-primary)] bg-[var(--ft-bg-secondary)] p-4 shrink-0 overflow-y-auto max-h-[300px]">
                            {(() => {
                                const content = filteredData.find(c => c.id === expandedId);
                                if (!content) return null;
                                return (
                                    <div className="bg-white rounded-xl border border-[var(--ft-border-primary)] overflow-hidden">
                                        <div className="px-4 py-2 bg-[var(--ft-bg-secondary)] border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                                            <span className="text-xs font-medium text-[var(--ft-text-secondary)]">
                                                버튼별 성과 - {content.influencerName}
                                            </span>
                                            <button
                                                onClick={() => setExpandedId(null)}
                                                className="text-xs text-[var(--ft-text-disabled)] hover:text-[var(--ft-text-primary)]"
                                            >
                                                닫기
                                            </button>
                                        </div>
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-[var(--ft-border-secondary)]">
                                                    <th className="text-center px-4 py-2 text-xs font-medium text-[var(--ft-text-disabled)] w-12">No</th>
                                                    <th className="text-left px-4 py-2 text-xs font-medium text-[var(--ft-text-disabled)]">버튼명</th>
                                                    <th className="text-left px-4 py-2 text-xs font-medium text-[var(--ft-text-disabled)]">URL</th>
                                                    <th className="text-right px-4 py-2 text-xs font-medium text-[var(--ft-text-disabled)]">총 클릭</th>
                                                    <th className="text-right px-4 py-2 text-xs font-medium text-[var(--ft-text-disabled)]">클릭 인원</th>
                                                    <th className="text-right px-4 py-2 text-xs font-medium text-[var(--ft-text-disabled)]">CTR</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {content.buttonPerformance.map((btn, idx) => (
                                                    <tr key={idx} className="border-b border-[var(--ft-border-primary)] last:border-0">
                                                        <td className="px-4 py-2.5 text-center">
                                                            <span className="inline-flex items-center justify-center w-5 h-5 bg-[var(--ft-color-primary-100)] text-[var(--ft-color-primary-700)] text-xs font-bold rounded-full">{idx + 1}</span>
                                                        </td>
                                                        <td className="px-4 py-2.5 text-sm font-medium text-[var(--ft-text-primary)]">
                                                            {btn.buttonName}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-sm text-[var(--ft-text-secondary)] max-w-[300px] truncate">
                                                            <a href={btn.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ft-color-primary-600)] hover:underline">
                                                                {btn.url}
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right text-sm text-[var(--ft-text-secondary)]">
                                                            {formatNumber(btn.clicks)}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right text-sm text-[var(--ft-text-secondary)]">
                                                            {formatNumber(btn.uniqueClicks)}
                                                        </td>
                                                        <td className="px-4 py-2.5 text-right text-sm font-medium text-[var(--ft-color-primary-600)]">
                                                            {btn.ctr.toFixed(1)}%
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
