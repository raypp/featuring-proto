import svgPaths from "./svg-afliq0rj04";

function TextContainer() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">팔로우 확인 메시지</p>
      </div>
    </div>
  );
}

function HelpIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_63_10147)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_63_10147">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0" data-name="iconContainer">
      <HelpIcon />
    </div>
  );
}

function Options() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="options">
      <div className="flex flex-row items-center self-stretch">
        <TextContainer />
      </div>
      <IconContainer />
    </div>
  );
}

function Toggle() {
  return (
    <div className="h-[24px] relative shrink-0 w-[48px]" data-name="toggle">
      <div className="absolute inset-[-12.5%_-6.25%]" style={{ "--fill-0": "rgba(94, 81, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 30">
          <g id="toggle">
            <path d={svgPaths.p13e5d780} fill="var(--fill-0, #5E51FF)" />
            <g id="Focus"></g>
            <path clipRule="evenodd" d={svgPaths.p910a580} fill="var(--fill-0, white)" fillRule="evenodd" id="handle" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ToggleItem() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="toggleItem">
      <Toggle />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options />
      <ToggleItem />
    </div>
  );
}

function TextFrameTa() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TA)">
      <div className="basis-0 flex flex-col font-['Pretendard:Regular',sans-serif] grow justify-center leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#bbb] text-[14px]">
        <p className="mb-0">안녕하세요! 댓글 확인했습니다.</p>
        <p className="mb-0">팔로우 완료 후 아래 버튼을 눌러 주세요.</p>
        <p>확인 후 요청하신 정보를 보내드립니다!</p>
      </div>
    </div>
  );
}

function InputContainer() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="inputContainer">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
          <TextFrameTa />
          <div className="absolute bottom-[4px] right-[4px] size-[5px]" data-name="grip">
            <div className="absolute inset-[-7.07%]" style={{ "--stroke-0": "rgba(149, 149, 149, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.70711 5.70711">
                <path d={svgPaths.p185a3316} id="grip" stroke="var(--stroke-0, #959595)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function OptionsTa() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TA)">
      <InputContainer />
    </div>
  );
}

function VariantsTa() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TA)">
      <OptionsTa />
    </div>
  );
}

function TextArea() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textArea">
      <VariantsTa />
    </div>
  );
}

function TextFrameTi() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼명을 입력해 주세요.</p>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field />
    </div>
  );
}

function OptionsTi() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi />
    </div>
  );
}

function VariantsTi() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi />
    </div>
  );
}

function TextInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
      <VariantsTi />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextArea />
      <TextInput />
    </div>
  );
}

function DropdownItemFrame() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame2 />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function TextContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">팔로우 미확인 시</p>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="options">
      <TextContainer1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options1 />
    </div>
  );
}

function TextFrameTa1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TA)">
      <div className="basis-0 flex flex-col font-['Pretendard:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#bbb] text-[14px]">
        <p className="leading-[22px]">인스타그램 팔로우가 되어있지 않다면, 링크 전송이 원활하지 않을 수 있습니다. 팔로우 후 다시 시도해 주세요.</p>
      </div>
    </div>
  );
}

function InputContainer1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="inputContainer">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
          <TextFrameTa1 />
          <div className="absolute bottom-[4px] right-[4px] size-[5px]" data-name="grip">
            <div className="absolute inset-[-7.07%]" style={{ "--stroke-0": "rgba(149, 149, 149, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.70711 5.70711">
                <path d={svgPaths.p185a3316} id="grip" stroke="var(--stroke-0, #959595)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function OptionsTa1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TA)">
      <InputContainer1 />
    </div>
  );
}

function VariantsTa1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TA)">
      <OptionsTa1 />
    </div>
  );
}

function TextArea1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textArea">
      <VariantsTa1 />
    </div>
  );
}

function TextFrameTi1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼명을 입력해 주세요.</p>
      </div>
    </div>
  );
}

function Field1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi1 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field1 />
    </div>
  );
}

function OptionsTi1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi1 />
    </div>
  );
}

function VariantsTi1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi1 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
      <VariantsTi1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextArea1 />
      <TextInput1 />
    </div>
  );
}

function DropdownItemFrame1() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

export default function Variants() {
  return (
    <div className="bg-white relative rounded-[4px] size-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <DropdownItemFrame />
          <DropdownItemFrame1 />
        </div>
      </div>
    </div>
  );
}