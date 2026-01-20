import { useState } from "react";
import {
    Users, MousePointer, TrendingUp, Target, ChevronDown, ChevronRight,
    Download, ArrowUpRight, ArrowDownRight, ExternalLink, Play,
    Heart, MessageCircle, Bookmark, Image
} from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { DailyPerformance } from "../types";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface PerformanceDashboardProps {
    influencerCount: number;
}

// Content-centric mock data
interface ContentPerformance {
    id: number;
    contentType: '릴스' | '피드' | '스토리' | '쇼츠';
    thumbnailUrl?: string;
    contentUrl: string;
    postedDate: string;
    influencerName: string;
    influencerProfileImage?: string;
    reach: number;
    clicks: number;
    ctr: number;
    likes: number;
    comments: number;
    saves: number;
    // Button-level performance
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
        contentType: '릴스',
        thumbnailUrl: undefined,
        contentUrl: 'https://instagram.com/reel/1',
        postedDate: '2026-01-20',
        influencerName: '김뷰티',
        reach: 45200,
        clicks: 2340,
        ctr: 5.2,
        likes: 3200,
        comments: 145,
        saves: 890,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/1', clicks: 1520, uniqueClicks: 1280, ctr: 3.4 },
            { buttonName: '이벤트 참여', url: 'https://brand.com/event', clicks: 820, uniqueClicks: 650, ctr: 1.8 },
        ]
    },
    {
        id: 2,
        contentType: '피드',
        thumbnailUrl: undefined,
        contentUrl: 'https://instagram.com/p/2',
        postedDate: '2026-01-19',
        influencerName: '이패션',
        reach: 32100,
        clicks: 1890,
        ctr: 5.9,
        likes: 2100,
        comments: 89,
        saves: 456,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/2', clicks: 1230, uniqueClicks: 980, ctr: 3.8 },
            { buttonName: '브랜드 팔로우', url: 'https://instagram.com/brand', clicks: 660, uniqueClicks: 420, ctr: 2.1 },
        ]
    },
    {
        id: 3,
        contentType: '릴스',
        thumbnailUrl: undefined,
        contentUrl: 'https://instagram.com/reel/3',
        postedDate: '2026-01-18',
        influencerName: '박라이프',
        reach: 78500,
        clicks: 4120,
        ctr: 5.2,
        likes: 5600,
        comments: 312,
        saves: 1240,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/3', clicks: 2890, uniqueClicks: 2340, ctr: 3.7 },
            { buttonName: '이벤트 참여', url: 'https://brand.com/event', clicks: 1230, uniqueClicks: 890, ctr: 1.6 },
        ]
    },
    {
        id: 4,
        contentType: '스토리',
        thumbnailUrl: undefined,
        contentUrl: 'https://instagram.com/story/4',
        postedDate: '2026-01-18',
        influencerName: '최푸드',
        reach: 18200,
        clicks: 720,
        ctr: 4.0,
        likes: 0,
        comments: 0,
        saves: 0,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/4', clicks: 720, uniqueClicks: 520, ctr: 4.0 },
        ]
    },
    {
        id: 5,
        contentType: '피드',
        thumbnailUrl: undefined,
        contentUrl: 'https://instagram.com/p/5',
        postedDate: '2026-01-17',
        influencerName: '정트래블',
        reach: 52300,
        clicks: 2890,
        ctr: 5.5,
        likes: 3400,
        comments: 178,
        saves: 720,
        buttonPerformance: [
            { buttonName: '상품 보기', url: 'https://brand.com/product/5', clicks: 1890, uniqueClicks: 1450, ctr: 3.6 },
            { buttonName: '할인 받기', url: 'https://brand.com/discount', clicks: 1000, uniqueClicks: 780, ctr: 1.9 },
        ]
    },
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

    // Filter
    const filteredData = mockContentData.filter(c =>
        c.influencerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contentType.includes(searchTerm)
    );

    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

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
        <div className="h-full flex flex-col overflow-auto">
            {/* Header */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <h3 className="text-base font-semibold text-[var(--ft-text-primary)]">
                    성과 분석
                </h3>
                <div className="flex items-center gap-3">
                    {/* Date Range Selector */}
                    <div className="flex items-center gap-1 bg-[var(--ft-bg-secondary)] rounded-lg p-1">
                        {["7d", "14d", "30d", "all"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${dateRange === range
                                    ? 'bg-white text-[var(--ft-text-primary)] shadow-sm'
                                    : 'text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]'
                                    }`}
                            >
                                {range === "7d" ? "7일" : range === "14d" ? "14일" : range === "30d" ? "30일" : "전체"}
                            </button>
                        ))}
                    </div>
                    <CoreButton variant="tertiary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                        내보내기
                    </CoreButton>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="px-6 py-5 border-b border-[var(--ft-border-primary)] bg-white">
                <div className="grid grid-cols-4 gap-4">
                    {/* Reach */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm text-blue-700">도달 인원</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-900">{formatNumber(totalReach)}</p>
                        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> 지난 주 대비 +12.5%
                        </p>
                    </div>

                    {/* Clicks */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-5 border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                                <MousePointer className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm text-purple-700">클릭 인원</span>
                        </div>
                        <p className="text-3xl font-bold text-purple-900">{formatNumber(totalClicks)}</p>
                        <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> 지난 주 대비 +8.2%
                        </p>
                    </div>

                    {/* Click Rate */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-5 border border-green-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm text-green-700">클릭율</span>
                        </div>
                        <p className="text-3xl font-bold text-green-900">{clickRate.toFixed(1)}%</p>
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> 업계 평균 대비 +2.1%
                        </p>
                    </div>

                    {/* Conversion Rate */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-5 border border-orange-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm text-orange-700">전환율</span>
                        </div>
                        <p className="text-3xl font-bold text-orange-900">{conversionRate.toFixed(1)}%</p>
                        <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> 목표 달성률 92%
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="px-6 py-5 border-b border-[var(--ft-border-primary)] bg-white">
                <h4 className="text-sm font-medium text-[var(--ft-text-primary)] mb-4">일별 추세</h4>
                <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockDailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9e9e9e" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#9e9e9e" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="reach" name="도달" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                            <Line type="monotone" dataKey="clicks" name="클릭" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
                            <Line type="monotone" dataKey="conversions" name="전환" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Content-centric Table */}
            <div className="flex-1 bg-white">
                <div className="px-6 py-3 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h4 className="text-sm font-medium text-[var(--ft-text-primary)]">콘텐츠별 성과</h4>
                        <span className="text-xs text-[var(--ft-text-disabled)]">{filteredData.length}개</span>
                    </div>
                    <input
                        type="text"
                        placeholder="콘텐츠 또는 인플루언서 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-sm border border-[var(--ft-border-primary)] rounded-lg px-3 py-1.5 w-56 focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)]"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--ft-bg-secondary)]">
                            <tr className="border-b border-[var(--ft-border-secondary)]">
                                <th className="w-10 px-4 py-3"></th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">콘텐츠</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">인플루언서</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">도달</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">클릭</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">CTR</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">
                                    <Heart className="w-3.5 h-3.5 inline" />
                                </th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">
                                    <MessageCircle className="w-3.5 h-3.5 inline" />
                                </th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-[var(--ft-text-secondary)]">
                                    <Bookmark className="w-3.5 h-3.5 inline" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((content) => {
                                const isExpanded = expandedId === content.id;
                                return (
                                    <>
                                        {/* Main Row */}
                                        <tr
                                            key={content.id}
                                            className={`border-b border-[var(--ft-border-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)] transition-colors cursor-pointer ${isExpanded ? 'bg-[var(--ft-color-primary-50)]' : ''}`}
                                            onClick={() => setExpandedId(isExpanded ? null : content.id)}
                                        >
                                            <td className="w-10 px-4 py-3 text-center">
                                                {isExpanded ? (
                                                    <ChevronDown className="w-4 h-4 text-[var(--ft-color-primary-600)]" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                        {getContentTypeIcon(content.contentType)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getContentTypeBadge(content.contentType)}`}>
                                                                {content.contentType}
                                                            </span>
                                                            <a href={content.contentUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--ft-text-disabled)] hover:text-[var(--ft-color-primary-600)]">
                                                                <ExternalLink className="w-3.5 h-3.5" />
                                                            </a>
                                                        </div>
                                                        <p className="text-xs text-[var(--ft-text-disabled)] mt-1">{content.postedDate}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <CoreAvatar name={content.influencerName} size="xs" />
                                                    <span className="text-sm text-[var(--ft-text-primary)]">{content.influencerName}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-[var(--ft-text-secondary)]">
                                                {formatNumber(content.reach)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-[var(--ft-text-secondary)]">
                                                {formatNumber(content.clicks)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-medium text-[var(--ft-color-primary-600)]">
                                                {content.ctr.toFixed(1)}%
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-[var(--ft-text-secondary)]">
                                                {formatNumber(content.likes)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-[var(--ft-text-secondary)]">
                                                {formatNumber(content.comments)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-[var(--ft-text-secondary)]">
                                                {formatNumber(content.saves)}
                                            </td>
                                        </tr>

                                        {/* Expanded Button Performance Row */}
                                        {isExpanded && (
                                            <tr key={`${content.id}-expanded`} className="bg-[var(--ft-bg-secondary)]">
                                                <td colSpan={9} className="px-6 py-4">
                                                    <div className="ml-6 bg-white rounded-xl border border-[var(--ft-border-primary)] overflow-hidden">
                                                        <div className="px-4 py-2 bg-[var(--ft-bg-secondary)] border-b border-[var(--ft-border-primary)]">
                                                            <span className="text-xs font-medium text-[var(--ft-text-secondary)]">버튼별 성과</span>
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
                                                                        <td className="px-4 py-2.5 text-sm text-[var(--ft-text-secondary)] max-w-[180px] truncate">
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
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
