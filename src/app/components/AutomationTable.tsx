import svgPaths from "../../imports/svg-886y5mcp52";
import { useState } from "react";
import { Automation } from "../pages/AutomationDetail";

interface AutomationTableProps {
  automations: Automation[];
  onRowClick?: (id: number) => void;
  onAutomationClick?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
  onMenuAction?: (id: number, action: 'edit' | 'delete' | 'template') => void;
}

// Helper function to check if automation can be activated
function canActivate(automation: Automation): boolean {
  // 게시물 선택 완료 (필수값 - 항상 postIds가 필요)
  const hasValidPost = automation.trigger.postIds.length > 0;

  // 댓글 트리거 설정 완료 (keywords 모드면 keywords 필요, any면 통과)
  const hasValidTrigger = automation.trigger.matchType === 'any' ||
    (automation.trigger.matchType === 'keywords' && automation.trigger.keywords.length > 0);

  // 공개 답글이 ON이면 texts 필요
  const hasValidPublicReply = !automation.publicReply.isActive ||
    (automation.publicReply.isActive && automation.publicReply.texts.length > 0 &&
      automation.publicReply.texts.some(text => text.trim() !== ''));

  // DM 본문 설정 완료
  const hasDmText = automation.privateDm.text.trim() !== '';

  // 팔로우 유도가 ON이면 양쪽 메시지 모두 필요
  const hasValidFollowCheck = !automation.privateDm.followCheck.isActive ||
    (automation.privateDm.followCheck.isActive &&
      automation.privateDm.followCheck.nonFollowerMessage.trim() !== '' &&
      automation.privateDm.followCheck.followerMessage.trim() !== '');

  return hasValidPost && hasValidTrigger && hasValidPublicReply && hasDmText && hasValidFollowCheck;
}

function NavigationArrowUpOutline() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
          <path d={svgPaths.p3b632c00} fill="#242424" />
        </g>
      </svg>
    </div>
  );
}

function NavigationMoreHorizontalFilled() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <g>
            <path d={svgPaths.p29bde780} fill="#242424" />
            <path d={svgPaths.p3af0dbf2} fill="#242424" />
            <path d={svgPaths.p13593580} fill="#242424" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface ToggleProps {
  isActive: boolean;
  isDisabled?: boolean;
  showLabel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

function Toggle({ isActive, isDisabled = false, showLabel = false, onClick }: ToggleProps) {
  const handleBgColor = isDisabled ? "bg-[#e0e0e0]" : (isActive ? "bg-[#5e51ff]" : "bg-[#bbb]");
  const handlePosition = isActive ? "left-[19px]" : "left-[3px]";
  const cursorStyle = isDisabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" onClick={isDisabled ? undefined : onClick}>
      <div className={`${handleBgColor} h-[16px] relative rounded-[999px] shrink-0 w-[32px] ${cursorStyle} transition-colors`}>
        <div className={`absolute ${handlePosition} size-[10px] top-1/2 translate-y-[-50%] transition-all`}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <g>
              <rect fill="white" height="10" rx="5" width="10" />
            </g>
          </svg>
        </div>
      </div>
      {showLabel && (
        <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#959595] text-[14px] text-nowrap">
          <p className="leading-[22px]">작성 중</p>
        </div>
      )}
    </div>
  );
}

// Status badge component
function StatusBadge({ status }: { status: 'draft' | 'running' | 'stopped' }) {
  const config = {
    draft: { text: '초안', bg: 'bg-[#f5f5f5]', color: 'text-[#959595]' },
    running: { text: '실행 중', bg: 'bg-[#e8f5e9]', color: 'text-[#2e7d32]' },
    stopped: { text: '중단됨', bg: 'bg-[#fff3e0]', color: 'text-[#ef6c00]' }
  };

  const { text, bg, color } = config[status];

  return (
    <div className={`${bg} ${color} px-2 py-1 rounded text-xs font-medium`}>
      {text}
    </div>
  );
}

export function AutomationTable({ automations, onRowClick, onAutomationClick, onToggleStatus, onMenuAction }: AutomationTableProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleToggle = (e: React.MouseEvent, automation: Automation) => {
    e.stopPropagation();

    // 활성화 조건 검증
    const isActivatable = canActivate(automation);

    // draft나 stopped 상태에서 활성화하려고 할 때 조건 미충족이면 차단
    if ((automation.status === 'draft' || automation.status === 'stopped') && !isActivatable) {
      // TODO: 토스트나 모달로 "필수 입력값을 모두 채워주세요" 안내
      console.log('활성화 조건 미충족: 필수 입력값을 모두 채워주세요');
      return;
    }

    onToggleStatus?.(automation.id!);
  };

  const handleMoreClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-white relative shrink-0 w-full">
        <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full border border-[#f0f0f0]">
          {/* Fixed column */}
          <div className="h-[38px] shrink-0 sticky top-0 w-[360px]">
            <div className="content-stretch flex items-center overflow-clip pl-[4px] pr-0 py-0 relative rounded-[inherit] size-full">
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-between px-[8px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">자동화 제목</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>

          {/* Other columns */}
          <div className="basis-0 content-stretch flex grow h-[38px] items-center min-h-px min-w-px shrink-0 sticky top-0">
            {/* 상태 */}
            <div className="h-full relative shrink-0 w-[120px]">
              <div className="content-stretch flex items-center justify-between overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                  <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">상태</p>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>

            {/* 도달 인원 */}
            <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
                  <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                    <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">도달 인원</p>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>

            {/* 클릭 인원 */}
            <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
                  <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                    <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[#14px] text-nowrap">클릭 인원</p>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>

            {/* 마지막 수정일시 */}
            <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
                  <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                    <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">마지막 수정일시</p>
                    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
                      <NavigationArrowUpOutline />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Rows */}
      {automations.map((automation) => {
        const isActivatable = canActivate(automation);
        const canToggle = automation.status === 'running' || isActivatable;

        return (
          <div
            key={automation.id}
            className="bg-white relative shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => (onRowClick || onAutomationClick)?.(automation.id!)}
          >
            <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
              {/* Fixed column */}
              <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]">
                <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                      <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
                        <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
                          {/* Thumbnail */}
                          <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]">
                            {automation.thumbnail ? (
                              <img
                                alt={automation.title}
                                className="absolute inset-0 object-cover pointer-events-none size-full"
                                src={automation.thumbnail}
                              />
                            ) : (
                              <div className="bg-[#ebebeb] size-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#bbbbbb]" fill="none" viewBox="0 0 16 16">
                                  <path d={svgPaths.p14e6ea70} fill="currentColor" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {/* Title */}
                          <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0">
                            <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full">
                              <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
                                <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
                                  <p className="leading-[22px]">{automation.title}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* More button */}
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                            <div
                              className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-gray-100"
                              onClick={(e) => handleMoreClick(e, automation.id!)}
                            >
                              <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                              <NavigationMoreHorizontalFilled />
                            </div>
                            {/* Dropdown menu */}
                            {openMenuId === automation.id && (
                              <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-[#e0e0e0] py-1 z-50 min-w-[160px]">
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-[#424242] hover:bg-gray-50 font-['Pretendard:Regular',sans-serif]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMenuAction?.(automation.id!, 'edit');
                                    setOpenMenuId(null);
                                  }}
                                >
                                  수정하기
                                </button>
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-[#424242] hover:bg-gray-50 font-['Pretendard:Regular',sans-serif]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMenuAction?.(automation.id!, 'template');
                                    setOpenMenuId(null);
                                  }}
                                >
                                  템플릿 관리
                                </button>
                                <div className="h-px bg-[#f0f0f0] my-1" />
                                <button
                                  className="w-full px-4 py-2 text-left text-sm text-[#d32f2f] hover:bg-[#ffebee] font-['Pretendard:Regular',sans-serif]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMenuAction?.(automation.id!, 'delete');
                                    setOpenMenuId(null);
                                  }}
                                >
                                  삭제하기
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other columns */}
              <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0">
                {/* 상태 */}
                <div className="h-full relative shrink-0 w-[120px]">
                  <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <Toggle
                        isActive={automation.status === 'running'}
                        isDisabled={!canToggle}
                        onClick={(e) => handleToggle(e, automation)}
                      />
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>

                {/* 도달 인원 */}
                <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                      {automation.status === 'draft' ? (
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#959595] text-[14px] text-nowrap">
                          -
                        </p>
                      ) : (
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">
                          {automation.executions?.toLocaleString()} 명
                        </p>
                      )}
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>

                {/* 클릭 인원 */}
                <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                      {automation.status === 'draft' ? (
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#959595] text-[14px] text-nowrap">
                          -
                        </p>
                      ) : (
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">
                          {automation.ctr}
                        </p>
                      )}
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>

                {/* 마지막 수정일시 */}
                <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">
                        {automation.lastModified}
                      </p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}
