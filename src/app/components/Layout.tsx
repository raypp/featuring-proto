import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  hasPendingProposal?: boolean;
}

export function Layout({ children, currentView, onChangeView, onLogout, hasPendingProposal = false }: LayoutProps) {
  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar
        currentView={currentView}
        onChangeView={onChangeView}
        onLogout={onLogout}
        hasPendingProposal={hasPendingProposal}
      />
      <main className={`flex-1 overflow-y-auto ${currentView === 'account-settings' ? 'bg-[#fafafa]' : ''}`}>
        {currentView === 'account-settings' ? (
          <div className="h-full">
            {/* Header */}
            <div className="h-[50px] bg-white border-b border-[#f0f0f0] px-8 flex items-center">
              <h1 className="font-['Pretendard:Medium',sans-serif] text-[16px] text-[#31363a]">내 정보</h1>
            </div>
            {/* Tab Navigation */}
            <div className="bg-white border-b border-[#f0f0f0] px-8 pt-2">
              <div className="flex gap-4">
                <div className="px-1 py-2 border-b-2 border-[#5e51ff]">
                  <p className="font-['Pretendard:Medium',sans-serif] text-[14px] text-[#242424]">계정 설정</p>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="px-8 py-6">
              {children}
            </div>
          </div>
        ) : (
          <div className="h-full">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}