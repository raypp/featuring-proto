import { Plus, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import svgPaths from "../../imports/svg-d6u21d4lhs";
import imgVector from "figma:asset/6555fb25422d6991becc1a0e0ae8e0c520ad540b.png";
import imgImg from "figma:asset/e36fd5850420d5d755eed7b04a4391b8a58a0b36.png";

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  hasPendingProposal?: boolean;
}

function FeaturingStudioLogo() {
  return (
    <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] leading-[0] place-items-start relative shrink-0">
      {/* Studio text */}
      <div className="[grid-area:1_/_1] h-[16.957px] ml-[99.86px] mt-[2.22px] relative w-[61.334px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 17">
          <g id="Studio">
            <path d={svgPaths.p31e2ca00} fill="#2B2F33" />
            <path d={svgPaths.p3f0b6000} fill="#2B2F33" />
            <path d={svgPaths.p3574ba80} fill="#2B2F33" />
            <path d={svgPaths.pd486d00} fill="#2B2F33" />
            <path d={svgPaths.p3fa32000} fill="#2B2F33" />
            <path d={svgPaths.p3c7f7f0} fill="#2B2F33" />
          </g>
        </svg>
      </div>
      {/* featuring text */}
      <div className="[grid-area:1_/_1] h-[24px] ml-0 mt-0 relative w-[94.183px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 24">
          <g id="featuring">
            <path d={svgPaths.p287adb80} fill="#2B2F33" />
            <path d={svgPaths.p1bc5b220} fill="#2B2F33" />
            <path d={svgPaths.p137ed200} fill="#2B2F33" />
            <path d={svgPaths.p2ff6d000} fill="#2B2F33" />
            <path d={svgPaths.p391b3c00} fill="#2B2F33" />
            <path d={svgPaths.p3bd15d00} fill="#2B2F33" />
            <path d={svgPaths.p14d6f000} fill="#2B2F33" />
            <path d={svgPaths.p81ce100} fill="#2B2F33" />
            <path d={svgPaths.p17d80600} fill="#2B2F33" />
            <path d={svgPaths.pb54bb30} fill="#2B2F33" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function Sidebar({ currentView, onChangeView, onLogout, hasPendingProposal = false }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Instagram Badge Avatar Component
  const InstagramAvatar = ({ username }: { username: string }) => (
    <div className="relative shrink-0 size-[32px]">
      <div className="absolute inset-0 rounded-[999px]">
        <img
          alt={username}
          className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-[999px] size-full"
          src={imgImg}
        />
      </div>
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-[999px]" />
      {/* Instagram Badge */}
      <div className="absolute bg-white bottom-0 overflow-clip right-[-6px] rounded-[999px] size-[16px]">
        <div className="absolute inset-[12.5%]">
          <div className="absolute inset-[6.25%]">
            <img alt="" className="block max-w-none size-full" height="10.5" src={imgVector} width="10.5" />
          </div>
        </div>
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7.5" stroke="#F0F0F0" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-[240px] border-r border-[#f0f0f0] bg-white flex flex-col h-full">
      {/* Logo Section */}
      <div className="h-[50px] flex items-center px-5 shrink-0">
        <FeaturingStudioLogo />
      </div>

      {/* Instagram Account Selector */}
      <div className="px-2 py-4">
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="w-full flex items-center justify-between px-3 py-1.5 rounded bg-[#ecefff] hover:bg-[#e0e5ff] transition-colors outline-none">
            <div className="flex items-center gap-2">
              <InstagramAvatar username="sojumanjan" />
              <p className="text-sm font-medium text-[#242424] truncate">sojumanjan</p>
            </div>
            {isDropdownOpen ? (
              <ChevronUp className="h-4 w-4 text-[#242424]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#242424]" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[224px] bg-white border border-[#f0f0f0] rounded shadow-sm p-1">
            <DropdownMenuItem className="cursor-pointer px-3 py-2 rounded hover:bg-gray-50 focus:bg-gray-50">
              <div className="flex items-center gap-2">
                <InstagramAvatar username="another_account" />
                <p className="text-sm font-medium text-[#242424]">another_account</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 space-y-1">
        {/* Home (Dashboard) */}
        <button
          onClick={() => onChangeView('home')}
          className={`w-full h-9 px-3 rounded-lg flex items-center gap-2.5 transition-colors ${currentView === 'home' || currentView === 'dashboard'
            ? 'bg-[#ecefff]'
            : 'hover:bg-gray-50'
            }`}
        >
          <div className="overflow-clip shrink-0 size-[18px]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <path
                d="M9 1L1 7v10h5v-6h6v6h5V7L9 1z"
                fill={(currentView === 'home' || currentView === 'dashboard') ? '#5032F9' : '#707070'}
              />
            </svg>
          </div>
          <p className={`text-sm font-medium ${(currentView === 'home' || currentView === 'dashboard') ? 'text-[#5032f9]' : 'text-[#242424]'
            }`}>
            홈
          </p>
        </button>

        {/* My Automations */}
        <button
          onClick={() => onChangeView('my-automations')}
          className={`w-full h-9 px-3 rounded-lg flex items-center gap-2.5 transition-colors ${currentView === 'my-automations' || currentView === 'create-automation'
            ? 'bg-[#ecefff]'
            : 'hover:bg-gray-50'
            }`}
        >
          <div className="overflow-clip shrink-0 size-[18px]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <rect x="2" y="2" width="14" height="14" rx="3" stroke={(currentView === 'my-automations' || currentView === 'create-automation') ? '#5032F9' : '#707070'} strokeWidth="1.5" fill="none" />
              <path d="M6 9h6M9 6v6" stroke={(currentView === 'my-automations' || currentView === 'create-automation') ? '#5032F9' : '#707070'} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className={`text-sm font-medium ${(currentView === 'my-automations' || currentView === 'create-automation') ? 'text-[#5032f9]' : 'text-[#242424]'
            }`}>
            내 자동화
          </p>
        </button>

        {/* Campaigns [NEW] */}
        <button
          onClick={() => onChangeView('campaigns')}
          className={`w-full h-9 px-3 rounded-lg flex items-center gap-2.5 transition-colors ${currentView === 'campaigns' || currentView === 'campaign-detail' || currentView === 'proposal-detail'
            ? 'bg-[#ecefff]'
            : 'hover:bg-gray-50'
            }`}
        >
          <div className="overflow-clip shrink-0 size-[18px]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <rect x="2" y="3" width="14" height="12" rx="2" stroke={(currentView === 'campaigns' || currentView === 'campaign-detail' || currentView === 'proposal-detail') ? '#5032F9' : '#707070'} strokeWidth="1.5" fill="none" />
              <path d="M2 7h14" stroke={(currentView === 'campaigns' || currentView === 'campaign-detail' || currentView === 'proposal-detail') ? '#5032F9' : '#707070'} strokeWidth="1.5" />
              <circle cx="5" cy="5" r="1" fill={(currentView === 'campaigns' || currentView === 'campaign-detail' || currentView === 'proposal-detail') ? '#5032F9' : '#707070'} />
            </svg>
          </div>
          <p className={`text-sm font-medium ${(currentView === 'campaigns' || currentView === 'campaign-detail' || currentView === 'proposal-detail') ? 'text-[#5032f9]' : 'text-[#242424]'
            }`}>
            브랜드 파트너십
          </p>
          {hasPendingProposal && (
            <span className="w-2 h-2 bg-[#ef4444] rounded-full animate-pulse" />
          )}
        </button>
      </nav>

      {/* Bottom Section */}
      <div className="px-2 py-4 space-y-1.5 shrink-0">
        {/* User Guide */}
        <button
          onClick={() => window.open('https://help.featuring.in', '_blank')}
          className="w-full h-8 px-3 rounded flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <FileText className="h-4 w-4 text-[#242424]" />
          <div className="flex items-center gap-1.5 flex-1">
            <p className="text-sm font-medium text-[#242424]">사용자 가이드</p>
            <ExternalLink className="h-3.5 w-3.5 text-[#242424]" />
          </div>
        </button>

        {/* User Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full h-8 px-3 rounded flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <div className="h-4 w-4 bg-[#cce9e6] rounded-full flex items-center justify-center">
                <p className="text-[8px] font-medium text-[#53a79f]">U</p>
              </div>
              <p className="text-sm font-medium text-[#424242] truncate">email@website.com</p>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            className="w-[224px] p-0 rounded shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_4px_8px_0px_rgba(0,0,0,0.14)]"
          >
            <div className="py-2 space-y-3">
              {/* Header with Avatar and Email */}
              <div className="px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-[#c2e4d4] rounded-full flex items-center justify-center">
                    <p className="text-base font-medium text-[#3ba974]">U</p>
                  </div>
                  <p className="text-sm font-medium text-[#242424]">email@website.com</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#f0f0f0] mx-4" />

              {/* Account Settings */}
              <div className="px-2">
                <DropdownMenuItem
                  className="h-10 px-2 cursor-pointer focus:bg-gray-50"
                  onClick={() => onChangeView('account-settings')}
                >
                  <p className="text-sm text-[#242424]">계정 설정</p>
                </DropdownMenuItem>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#f0f0f0] mx-4" />

              {/* Logout */}
              <div>
                <DropdownMenuItem
                  className="h-10 px-4 cursor-pointer focus:bg-gray-50"
                  onClick={onLogout}
                >
                  <p className="text-sm text-[#242424]">로그아웃</p>
                </DropdownMenuItem>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}