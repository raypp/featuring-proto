function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">email@website.com</p>
    </div>
  );
}

function PostDetails() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Post Details">
      <Frame />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 size-[40px]" data-name="avatarUser">
            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="color">
              <div className="basis-0 bg-[#c2e4d4] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[999px] shrink-0 w-full" data-name="textContainer">
                <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#3ba974] text-[16px] text-center text-nowrap">U</p>
              </div>
            </div>
          </div>
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <PostDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="-">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 224 1">
          <g id="-">
            <line id="Line 30" stroke="var(--stroke-0, #F0F0F0)" x1="16" x2="208" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 w-full" data-name="1">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-0 relative w-full">
          <div className="h-[40px] relative shrink-0 w-full" data-name="dropdownItemFrame">
            <div className="flex flex-col justify-center size-full">
              <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-0 relative size-full">
                <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="options">
                  <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
                    <p className="leading-[22px]">계정 설정</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="2">
      <div className="h-[40px] relative shrink-0 w-full" data-name="dropdownItemFrame">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-0 relative size-full">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="options">
              <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
                <p className="leading-[22px]">로그아웃</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Variants() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-start px-0 py-[8px] relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <Header />
      <Component />
      <Component1 />
      <Component />
      <Component2 />
    </div>
  );
}

export default function DropdownSetting() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_4px_8px_0px_rgba(0,0,0,0.14)] size-full" data-name="dropdown_setting">
      <Variants />
    </div>
  );
}