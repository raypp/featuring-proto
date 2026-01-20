import { useState } from "react";
import {
    ClipboardList, Activity, BarChart3
} from "lucide-react";
import { SendQueueSection } from "./SendQueueSection";
import { SendMonitorSection } from "./SendMonitorSection";
import { PerformanceDashboard } from "./PerformanceDashboard";
import { AutomationInfluencer } from "../types";

type ReportTab = 'queue' | 'monitor' | 'dashboard';

interface InfluencerReportTabsProps {
    influencers: AutomationInfluencer[];
}

export function InfluencerReportTabs({ influencers }: InfluencerReportTabsProps) {
    const [activeTab, setActiveTab] = useState<ReportTab>('dashboard');

    const tabs: { key: ReportTab; label: string; icon: React.ReactNode }[] = [
        { key: 'queue', label: '발송 전 대기열', icon: <ClipboardList className="w-4 h-4" /> },
        { key: 'monitor', label: '발송 모니터링', icon: <Activity className="w-4 h-4" /> },
        { key: 'dashboard', label: '성과 대시보드', icon: <BarChart3 className="w-4 h-4" /> },
    ];

    return (
        <div className="h-full flex flex-col">
            {/* Sub-Tab Navigation */}
            <div className="bg-white border-b border-[var(--ft-border-primary)] px-6">
                <div className="flex gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                    ? 'border-[var(--ft-color-primary-500)] text-[var(--ft-color-primary-600)]'
                                    : 'border-transparent text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)] hover:bg-[var(--ft-interactive-tertiary-hover)]'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden bg-[var(--ft-bg-secondary)]">
                {activeTab === 'queue' && (
                    <div className="h-full bg-white">
                        <SendQueueSection influencerCount={influencers.length} />
                    </div>
                )}
                {activeTab === 'monitor' && (
                    <div className="h-full bg-white">
                        <SendMonitorSection totalCount={influencers.length} />
                    </div>
                )}
                {activeTab === 'dashboard' && (
                    <div className="h-full bg-white">
                        <PerformanceDashboard influencerCount={influencers.length} />
                    </div>
                )}
            </div>
        </div>
    );
}
