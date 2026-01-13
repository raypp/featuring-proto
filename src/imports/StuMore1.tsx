import svgPaths from "./svg-eulcfiwg1p";

function IconSystemFormattingEdit() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Formatting-Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Formatting-Edit">
          <path d={svgPaths.p3193ba72} fill="var(--fill-0, #242424)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LeadingElementItem() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="leadingElementItem">
      <IconSystemFormattingEdit />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">이름 수정</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="options">
      <LeadingElementItem />
    </div>
  );
}

function DropdownItemFrame() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-0 relative size-full">
          <Options />
        </div>
      </div>
    </div>
  );
}

function IconSystemControlsSettings() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Controls-Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Controls-Settings">
          <g id="Vector">
            <path d={svgPaths.p39fcb480} fill="#242424" />
            <path d={svgPaths.p3990ef00} fill="#242424" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LeadingElementItem1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="leadingElementItem">
      <IconSystemControlsSettings />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">자동 DM 설정</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="options">
      <LeadingElementItem1 />
    </div>
  );
}

function DropdownItemFrame1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-0 relative size-full">
          <Options1 />
        </div>
      </div>
    </div>
  );
}

function IconSystemFormattingTrash() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Formatting-Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Formatting-Trash">
          <g id="Vector">
            <path d="M7 6H6V12H7V6Z" fill="#E34F2F" />
            <path d="M10 6H9V12H10V6Z" fill="#E34F2F" />
            <path d={svgPaths.p1b095900} fill="#E34F2F" />
            <path d="M10 1H6V2H10V1Z" fill="#E34F2F" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LeadingElementItem2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="leadingElementItem">
      <IconSystemFormattingTrash />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e34f2f] text-[14px] text-nowrap">
        <p className="leading-[22px]">삭제</p>
      </div>
    </div>
  );
}

function Options2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="options">
      <LeadingElementItem2 />
    </div>
  );
}

function DropdownItemFrame2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-0 relative size-full">
          <Options2 />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="01">
      <DropdownItemFrame />
      <DropdownItemFrame1 />
      <DropdownItemFrame2 />
    </div>
  );
}

export default function StuMore() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] items-center justify-center px-0 py-[10px] relative rounded-[4px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_4px_8px_0px_rgba(0,0,0,0.14)] size-full" data-name="STU_more1">
      <Component />
    </div>
  );
}