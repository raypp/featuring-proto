import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, HelpCircle, ClipboardList, Gift, Zap, MoreHorizontal, Send, MousePointerClick, Power, PowerOff } from "lucide-react";
import { Automation } from "./AutomationDetail";
import { CampaignProposal } from "../types/CampaignProposal";
import { ProposalCard } from "../components/ProposalCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface DashboardProps {
  onNavigate: (view: string) => void;
  onAutomationClick?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
  onMenuAction?: (id: number, action: 'edit' | 'delete' | 'template') => void;
  recentAutomations: Automation[];
  proposals?: CampaignProposal[];
  onProposalClick?: (id: number) => void;
}

// Combined automation type for unified display
type CombinedAutomation = {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'paused';
  sentCount: number;
  clickCount: number;
  ctr: string;
  source: 'my' | 'brand';
  brandName?: string;
  originalId: number;
  isProposal?: boolean;
};

export function Dashboard({
  onNavigate,
  onAutomationClick,
  onToggleStatus,
  onMenuAction,
  recentAutomations,
  proposals = [],
  onProposalClick
}: DashboardProps) {
  // Filter only pending proposals for the "도착한 제안" section
  const pendingProposals = proposals.filter(p => p.status === 'pending');

  // Combine user's automations and brand partnership automations (accepted/active)
  const combinedAutomations: CombinedAutomation[] = [
    // User's own automations
    ...recentAutomations.map(a => ({
      id: a.id || 0,
      name: a.title,
      status: a.status === 'running' ? 'active' as const : 'inactive' as const,
      sentCount: a.executions || 0,
      clickCount: Math.floor((a.executions || 0) * (parseFloat(a.ctr || '0') / 100)),
      ctr: a.ctr || '-',
      source: 'my' as const,
      originalId: a.id || 0,
      isProposal: false
    })),
    // Brand partnership automations (accepted or active)
    ...proposals
      .filter(p => p.status === 'accepted' || p.status === 'active')
      .map(p => ({
        id: 1000 + p.id, // Offset to avoid ID collision
        name: p.campaignName,
        status: p.status === 'active' ? 'active' as const : 'inactive' as const,
        sentCount: p.performance?.sentCount || 0,
        clickCount: p.performance?.clickCount || 0,
        ctr: p.performance?.ctr || '-',
        source: 'brand' as const,
        brandName: p.brandName,
        originalId: p.id,
        isProposal: true
      }))
  ];

  return (
    <div className="space-y-8 p-8">
      {/* 도착한 제안 (Pending Proposals Only) */}
      {pendingProposals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#5e51ff]" />
            <h2 className="text-xl font-medium">도착한 제안</h2>
            <span className="px-2 py-0.5 bg-[#5e51ff] text-white text-xs font-medium rounded-full animate-pulse">
              {pendingProposals.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onClick={onProposalClick || (() => { })}
              />
            ))}
          </div>
        </div>
      )}

      {/* 자동 DM 현황 */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">자동 DM 현황</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-lg border border-[#f0f0f0]">
            <CardContent className="p-4">
              <div className="flex gap-1 items-center pb-2">
                <p className="text-xs text-[#707070]">활성화된 자동 DM 수</p>
              </div>
              <div className="flex gap-1 items-center pt-6">
                <p className="text-base font-medium text-[#242424]">
                  {combinedAutomations.filter(a => a.status === 'active').length} 개
                </p>
                <p className="text-xs text-[#707070]">/ {combinedAutomations.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-[#f0f0f0]">
            <CardContent className="p-4">
              <div className="flex gap-1 items-center pb-2">
                <p className="text-xs text-[#707070]">총 도달 인원</p>
                <HelpCircle className="h-3 w-3 text-[#bbbbbb]" />
              </div>
              <div className="flex gap-1 items-center pt-6">
                <p className="text-base font-medium text-[#242424]">
                  {combinedAutomations.reduce((sum, a) => sum + a.sentCount, 0).toLocaleString()} 명
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-[#f0f0f0]">
            <CardContent className="p-4">
              <div className="flex gap-1 items-center pb-2">
                <p className="text-xs text-[#707070]">총 클릭 인원</p>
                <HelpCircle className="h-3 w-3 text-[#bbbbbb]" />
              </div>
              <div className="flex gap-1 items-center pt-6">
                <p className="text-base font-medium text-[#242424]">
                  {combinedAutomations.reduce((sum, a) => sum + a.clickCount, 0).toLocaleString()} 명
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 자동 DM 내역 - Combined List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">자동 DM 내역</h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onNavigate('logs')}
              variant="outline"
              className="gap-1.5 border-[#e0e0e0]"
            >
              <ClipboardList className="h-4 w-4" />
              발송 로그
            </Button>
            <Button
              onClick={() => onNavigate('create-automation')}
              className="bg-[#5e51ff] hover:bg-[#5e51ff]/90 gap-1"
            >
              <Plus className="h-4 w-4" />
              새로운 자동 DM 만들기
            </Button>
          </div>
        </div>

        <Card className="rounded-lg border border-[#f0f0f0]">
          {combinedAutomations.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-[#9ca3af]" />
              </div>
              <p className="text-sm text-[#707070]">아직 자동화가 없습니다</p>
              <p className="text-xs text-[#9ca3af] mt-1">새로운 자동 DM을 만들어보세요</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_100px_100px_100px_80px_100px_40px] gap-4 px-4 py-3 bg-[#f9fafb] border-b border-[#e5e7eb] text-xs font-medium text-[#6b7280]">
                <div>자동화</div>
                <div>구분</div>
                <div className="text-right">발송</div>
                <div className="text-right">클릭</div>
                <div className="text-right">CTR</div>
                <div>상태</div>
                <div></div>
              </div>

              {/* Table Rows */}
              {combinedAutomations.slice(0, 20).map((automation) => (
                <div
                  key={`${automation.source}-${automation.originalId}`}
                  className="grid grid-cols-[1fr_100px_100px_100px_80px_100px_40px] gap-4 px-4 py-3 border-b border-[#f3f4f6] hover:bg-[#fafafa] cursor-pointer transition-colors items-center"
                  onClick={() => {
                    if (automation.isProposal) {
                      onProposalClick?.(automation.originalId);
                    } else {
                      onAutomationClick?.(automation.originalId);
                    }
                  }}
                >
                  {/* Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${automation.source === 'brand' ? 'bg-gradient-to-br from-[#5e51ff]/20 to-[#8b5cf6]/20' : 'bg-[#f3f4f6]'
                      }`}>
                      {automation.source === 'brand' ? (
                        <Gift className="w-4 h-4 text-[#5e51ff]" />
                      ) : (
                        <Zap className="w-4 h-4 text-[#707070]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#242424] truncate">{automation.name}</p>
                      {automation.brandName && (
                        <p className="text-xs text-[#707070] truncate">{automation.brandName}</p>
                      )}
                    </div>
                  </div>

                  {/* Source */}
                  <div>
                    {automation.source === 'brand' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#5e51ff]/10 text-[#5e51ff] text-xs font-medium rounded-full">
                        <Gift className="w-3 h-3" />
                        파트너십
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 bg-[#f3f4f6] text-[#707070] text-xs font-medium rounded-full">
                        내 자동화
                      </span>
                    )}
                  </div>

                  {/* Sent */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Send className="w-3 h-3 text-[#9ca3af]" />
                      <span className="text-sm text-[#242424]">{automation.sentCount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <MousePointerClick className="w-3 h-3 text-[#9ca3af]" />
                      <span className="text-sm text-[#242424]">{automation.clickCount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTR */}
                  <div className="text-right">
                    <span className={`text-sm font-medium ${automation.ctr !== '-' ? 'text-[#10b981]' : 'text-[#9ca3af]'}`}>
                      {automation.ctr}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    {automation.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded-full">
                        <Power className="w-3 h-3" />
                        실행 중
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f3f4f6] text-[#707070] text-xs font-medium rounded-full">
                        <PowerOff className="w-3 h-3" />
                        비활성
                      </span>
                    )}
                  </div>

                  {/* Menu */}
                  <div className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="p-1 hover:bg-[#f3f4f6] rounded transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4 text-[#9ca3af]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!automation.isProposal && onMenuAction) {
                              onMenuAction(automation.originalId, 'edit');
                            }
                          }}
                        >
                          편집
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!automation.isProposal && onMenuAction) {
                              onMenuAction(automation.originalId, 'delete');
                            }
                          }}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Pagination */}
        {combinedAutomations.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">1</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">4</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">5</Button>
            <span className="text-sm text-muted-foreground">...</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">10</Button>
          </div>
        )}
      </div>
    </div>
  );
}