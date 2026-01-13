import { Button } from "../components/ui/button";
import svgPaths from "../../imports/svg-siaxisoft0";

interface ConnectAccountProps {
  onConnect: () => void;
}

function FeaturingStudioLogo() {
  return (
    <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] leading-[0] place-items-start relative shrink-0">
      {/* Studio text */}
      <div className="[grid-area:1_/_1] h-[16.957px] ml-[99.86px] mt-[2.22px] relative w-[61.334px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 17">
          <g>
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
          <g>
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

function InstagramIllustration() {
  return (
    <div className="h-[244px] w-[400px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 244">
        <g>
          <path d={svgPaths.p29ba6480} fill="#ECEFFF" />
          <g>
            <ellipse cx="163.896" cy="55.7864" fill="#31238C" rx="7.91317" ry="13.1886" transform="rotate(-14.9874 163.896 55.7864)" />
            <ellipse cx="122.921" cy="95.4862" fill="#DCE2FF" rx="7.91317" ry="13.1886" transform="rotate(-45 122.921 95.4862)" />
            <ellipse cx="261.737" cy="57.5751" fill="#DCE2FF" rx="6.43157" ry="11.8108" transform="rotate(45 261.737 57.5751)" />
            <ellipse cx="138.431" cy="177.25" fill="#C0C8FF" rx="6.43157" ry="11.8108" transform="rotate(52.517 138.431 177.25)" />
            <ellipse cx="241.699" cy="187.5" fill="#31238C" rx="4.39385" ry="14.5627" transform="rotate(150 241.699 187.5)" />
            <ellipse cx="267.83" cy="156.516" fill="#5E51FF" rx="9.10205" ry="14.8281" transform="rotate(-60 267.83 156.516)" />
          </g>
          <g filter="url(#filter0_f_29_886)">
            <path d={svgPaths.p3145cf80} fill="#5E51FF" fillOpacity="0.3" />
            <path clipRule="evenodd" d={svgPaths.p11df4880} fill="#5E51FF" fillOpacity="0.3" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3b5cf200} fill="#5E51FF" fillOpacity="0.3" fillRule="evenodd" />
          </g>
          <g>
            <g>
              <path d={svgPaths.pd6ec600} fill="#5E51FF" />
              <path clipRule="evenodd" d={svgPaths.p2cc3ae00} fill="#5E51FF" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p27ca5000} fill="#5E51FF" fillRule="evenodd" />
            </g>
            <g>
              <path d={svgPaths.p6bce700} fill="white" />
              <path clipRule="evenodd" d={svgPaths.p2686aec0} fill="white" fillRule="evenodd" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="99.846" id="filter0_f_29_886" width="98.8979" x="152.307" y="87.9883">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_29_886" stdDeviation="7.5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export function ConnectAccount({ onConnect }: ConnectAccountProps) {
  return (
    <div className="bg-white flex flex-col items-start size-full">
      {/* Header */}
      <div className="h-[60px] flex items-center px-5 w-full">
        <FeaturingStudioLogo />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="flex flex-col gap-5 items-start w-[400px]">
          {/* Title and Illustration */}
          <div className="flex flex-col gap-1.5 items-center w-full">
            <p className="text-[32px] font-medium text-[#242424] leading-[40px]">간단하게 계정 연동하기</p>
            <InstagramIllustration />
            <div className="text-base text-[#424242] leading-6 text-center w-full">
              <p className="mb-0">피처링 스튜디오에 인스타그램 계정을 연결해 주세요.</p>
              <p>권한을 설정하면 피처링 스튜디오 서비스에 연동됩니다.</p>
            </div>
          </div>

          {/* Connect Button */}
          <button
            onClick={onConnect}
            className="bg-[#5e51ff] hover:bg-[#5e51ff]/90 h-12 rounded w-full flex items-center justify-center transition-colors"
          >
            <p className="text-base font-medium text-white leading-6">인스타그램 계정 연동</p>
          </button>

          {/* Divider */}
          <div className="h-0 w-full relative">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 1">
                <line stroke="#E0E0E0" x2="400" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2 items-start pb-12 w-full">
            <p className="text-sm text-[#707070] leading-[22px] w-full">
              연동 중 궁금한 점이 있다면, 아래 가이드나 문의를 통해 해결해 보세요.
            </p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => window.open('https://help.featuring.in', '_blank')}
                className="bg-white border border-[#e0e0e0] h-8 px-3 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-[#242424] leading-[22px]">사용자 가이드</p>
              </button>
              <button
                onClick={() => window.open('https://featuring.in/contact', '_blank')}
                className="bg-white border border-[#e0e0e0] h-8 px-3 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-[#242424] leading-[22px]">문의하기</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
