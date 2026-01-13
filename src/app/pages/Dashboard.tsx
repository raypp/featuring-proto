import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, HelpCircle, ClipboardList, Gift } from "lucide-react";
import { Automation } from "./AutomationDetail";
import { AutomationTable } from "../components/AutomationTable";
import { CampaignProposal } from "../types/CampaignProposal";
import { ProposalCard } from "../components/ProposalCard";

interface DashboardProps {
  onNavigate: (view: string) => void;
  onAutomationClick?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
  onMenuAction?: (id: number, action: 'edit' | 'delete' | 'template') => void;
  recentAutomations: Automation[];
  proposals?: CampaignProposal[];
  onProposalClick?: (id: number) => void;
}

export function Dashboard({
  onNavigate,
  onAutomationClick,
  onToggleStatus,
  onMenuAction,
  recentAutomations,
  proposals = [],
  onProposalClick
}: DashboardProps) {
  return (
    <div className="space-y-8 p-8">
      {/* 도착한 제안 (Campaign Proposals) */}
      {proposals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#5e51ff]" />
            <h2 className="text-xl font-medium">도착한 제안</h2>
            <span className="px-2 py-0.5 bg-[#5e51ff] text-white text-xs font-medium rounded-full">
              {proposals.length}
            </span>
          </div>
          <div className="space-y-3">
            {proposals.map((proposal) => (
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
                <p className="text-base font-medium text-[#242424]">999,998 개</p>
                <p className="text-xs text-[#707070]">/ 999,999</p>
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
                <p className="text-base font-medium text-[#242424]">999,999 명</p>
                <p className="text-xs text-[#3ba974]">어제보다 +999,999</p>
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
                <p className="text-base font-medium text-[#242424]">999,999 명</p>
                <p className="text-xs text-[#3ba974]">어제보다 +999,999</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 자동 DM 내역 */}
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
          <AutomationTable
            automations={recentAutomations.slice(0, 20)}
            onAutomationClick={onAutomationClick}
            onToggleStatus={onToggleStatus}
            onMenuAction={onMenuAction}
          />
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">1</Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">4</Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">5</Button>
          <span className="text-sm text-muted-foreground">...</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">10</Button>
        </div>
      </div>
    </div>
  );
}