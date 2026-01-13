import { ReactNode } from "react";
import {
    Home,
    Bell,
    Search,
    Users,
    Trophy,
    Sparkles,
    Library,
    BarChart3,
    FolderKanban,
    Mail,
    Zap,
    BookOpen,
    FileText,
    ChevronDown,
    ExternalLink
} from "lucide-react";
import { CoreAvatar, CoreTag, CoreStatusBadge } from "../../design-system";

interface SidebarProps {
    currentView: string;
    onChangeView: (view: string) => void;
    onBackToServiceSelector?: () => void;
}

export function Sidebar({ currentView, onChangeView, onBackToServiceSelector }: SidebarProps) {
    const isActive = (id: string) => currentView === id || currentView.startsWith(id);

    return (
        <div className="w-[220px] h-screen bg-[var(--ft-bg-primary)] border-r border-[var(--ft-border-primary)] flex flex-col shrink-0">
            {/* Workspace Selector */}
            <div className="h-12 flex items-center px-4 border-b border-[var(--ft-border-primary)]">
                <button className="flex items-center gap-2 hover:bg-[var(--ft-interactive-tertiary-hover)] rounded px-2 py-1 transition-colors">
                    <div className="w-6 h-6 bg-[var(--ft-color-primary-600)] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">F</span>
                    </div>
                    <span className="text-[13px] font-medium text-[var(--ft-text-primary)]">피처링 워크스페이스...</span>
                    <ChevronDown className="w-4 h-4 text-[var(--ft-text-tertiary)]" />
                </button>
            </div>

            {/* Search */}
            <div className="px-3 py-2">
                <div className="flex items-center gap-2 px-2 py-1.5 bg-[var(--ft-bg-secondary)] rounded-[var(--ft-radius-lg)]">
                    <Search className="w-4 h-4 text-[var(--ft-text-disabled)]" />
                    <span className="text-xs text-[var(--ft-text-disabled)]">계정 및 채널 검색</span>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-1">
                {/* Dashboard & Notifications */}
                <div className="px-2 pb-2">
                    <NavItem
                        icon={Home}
                        label="대시보드"
                        isActive={isActive('dashboard')}
                        onClick={() => onChangeView('dashboard')}
                    />
                    <NavItem
                        icon={Bell}
                        label="알림"
                        isActive={isActive('notifications')}
                        onClick={() => onChangeView('notifications')}
                        badge={1}
                        disabled
                    />
                </div>

                {/* 인플루언서 Section */}
                <SectionLabel>인플루언서</SectionLabel>
                <div className="px-2 pb-2">
                    <NavItem icon={Search} label="인플루언서 찾기" isActive={isActive('find-influencer')} onClick={() => onChangeView('find-influencer')} disabled />
                    <NavItem icon={Users} label="인플루언서 풀 관리" isActive={isActive('influencer-pool')} onClick={() => onChangeView('influencer-pool')} disabled />
                    <NavItem icon={Trophy} label="인플루언서 랭킹" isActive={isActive('influencer-ranking')} onClick={() => onChangeView('influencer-ranking')} disabled />
                    <NavItem icon={Sparkles} label="AI 리스트업" isActive={isActive('ai-listup')} onClick={() => onChangeView('ai-listup')} disabled />
                </div>

                {/* 캠페인 Section */}
                <SectionLabel>캠페인</SectionLabel>
                <div className="px-2 pb-2">
                    <NavItem
                        icon={Library}
                        label="콘텐츠 라이브러리"
                        isActive={isActive('content-library')}
                        onClick={() => onChangeView('content-library')}
                        tag="New"
                        tagColor="purple"
                        disabled
                    />
                    <NavItem
                        icon={BarChart3}
                        label="콘텐츠 트래킹"
                        isActive={isActive('content-tracking')}
                        onClick={() => onChangeView('content-tracking')}
                        tag="BETA"
                        tagColor="gray"
                        disabled
                    />
                    <NavItem icon={FolderKanban} label="캠페인 관리" isActive={isActive('campaign')} onClick={() => onChangeView('campaign')} />
                    <NavItem icon={Mail} label="DM/이메일 발송" isActive={isActive('dm-email')} onClick={() => onChangeView('dm-email')} disabled />
                    <NavItem
                        icon={Zap}
                        label="반응 자동화 관리"
                        isActive={isActive('automation-groups')}
                        onClick={() => onChangeView('automation-groups')}
                    />
                </div>
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-[var(--ft-border-primary)] py-2 px-2">
                <NavItem icon={BookOpen} label="서비스 가이드" onClick={() => { }} external disabled />
                <NavItem icon={FileText} label="인사이트/블로그" onClick={() => { }} external disabled />

                {/* User */}
                <div className="flex items-center gap-2 px-3 py-2 mt-1">
                    <CoreAvatar size="xs" name="User" colorType="gray" />
                    <span className="text-[13px] text-[var(--ft-text-secondary)]">User name</span>
                </div>
            </div>
        </div>
    );
}

// Section Label Component
function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <div className="px-4 py-2">
            <span className="text-[11px] text-[var(--ft-text-disabled)]">{children}</span>
        </div>
    );
}

// Nav Item Component
interface NavItemProps {
    icon: React.FC<{ className?: string }>;
    label: string;
    isActive?: boolean;
    onClick: () => void;
    badge?: number;
    tag?: string;
    tagColor?: 'purple' | 'gray';
    external?: boolean;
    disabled?: boolean;
}

function NavItem({ icon: Icon, label, isActive, onClick, badge, tag, tagColor, external, disabled }: NavItemProps) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-[var(--ft-radius-lg)] transition-colors ${disabled
                ? 'opacity-50 cursor-not-allowed text-[var(--ft-text-disabled)]'
                : isActive
                    ? 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-600)]'
                    : 'text-[var(--ft-text-secondary)] hover:bg-[var(--ft-interactive-tertiary-hover)]'
                }`}
        >
            <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--ft-color-primary-600)]' : 'text-[var(--ft-text-tertiary)]'}`} />
            <span className={`text-[13px] flex-1 text-left ${isActive ? 'font-medium' : ''}`}>
                {label}
            </span>
            {badge && (
                <CoreStatusBadge colorType="primary" type="filled" size="sm">
                    {badge}
                </CoreStatusBadge>
            )}
            {tag && (
                <CoreTag
                    colorType={tagColor === 'purple' ? 'primary' : 'gray'}
                    size="xs"
                >
                    {tag}
                </CoreTag>
            )}
            {external && <ExternalLink className="w-3 h-3 text-[var(--ft-text-disabled)]" />}
        </button>
    );
}

interface LayoutProps {
    children: ReactNode;
    currentView: string;
    onChangeView: (view: string) => void;
    onBackToServiceSelector?: () => void;
}

export function Layout({ children, currentView, onChangeView, onBackToServiceSelector }: LayoutProps) {
    return (
        <div className="flex h-screen w-screen bg-[var(--ft-bg-secondary)]">
            <Sidebar
                currentView={currentView}
                onChangeView={onChangeView}
                onBackToServiceSelector={onBackToServiceSelector}
            />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
