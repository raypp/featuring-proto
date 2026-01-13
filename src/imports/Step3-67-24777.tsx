import svgPaths from "./svg-znpo8pkyeg";

function Num() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="num">
      <div aria-hidden="true" className="absolute border border-[#7273ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#7273ff] text-[12px] text-nowrap">STEP 3</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">어떤 메시지를 보낼까요?</p>
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function TextContainer() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">발송 전, 팔로우를 유도할까요?</p>
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
      <div className="absolute inset-[-12.5%_-6.25%]" style={{ "--fill-0": "rgba(187, 187, 187, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 30">
          <g id="toggle">
            <path d={svgPaths.p13e5d780} fill="var(--fill-0, #BBBBBB)" />
            <g id="Focus"></g>
            <path clipRule="evenodd" d={svgPaths.p2dcdb300} fill="var(--fill-0, white)" fillRule="evenodd" id="handle" />
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

function Title1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="title">
      <Options />
      <ToggleItem />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="1">
      <Title1 />
    </div>
  );
}

function Off() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="off">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[12px] relative w-full">
          <Component />
        </div>
      </div>
    </div>
  );
}

function Follow() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="follow">
      <Off />
    </div>
  );
}

function Variants() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <Follow />
        </div>
      </div>
    </div>
  );
}

function TextContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">발송 메시지</p>
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

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options1 />
    </div>
  );
}

function TextFrameTa() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TA)">
      <div className="basis-0 flex flex-col font-['Pretendard:Regular',sans-serif] grow justify-center leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#242424] text-[14px]">
        <p className="mb-0">감사합니다.</p>
        <p className="mb-0">요청하신 자료 보내드립니다.</p>
        <p>아래 버튼을 클릭하면 바로 확인 가능합니다!</p>
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

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextArea />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame3 />
    </div>
  );
}

function TextContainer2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼 설정 (최대 3개)</p>
      </div>
    </div>
  );
}

function HelpIcon1() {
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

function IconContainer1() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0" data-name="iconContainer">
      <HelpIcon1 />
    </div>
  );
}

function Options2() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="options">
      <div className="flex flex-row items-center self-stretch">
        <TextContainer2 />
      </div>
      <IconContainer1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options2 />
    </div>
  );
}

function TextFrameTi() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼을 클릭하세요!</p>
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
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi />
    </div>
  );
}

function TextFrameTi1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">https://example.com</p>
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
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <TextInput />
      <TextInput1 />
    </div>
  );
}

function TextFrameTi2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">지금 바로 다운 받기</p>
      </div>
    </div>
  );
}

function Field2() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi2 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field2 />
    </div>
  );
}

function OptionsTi2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi2 />
    </div>
  );
}

function VariantsTi2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi2 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi2 />
    </div>
  );
}

function TextFrameTi3() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">https://example.com</p>
      </div>
    </div>
  );
}

function Field3() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi3 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field3 />
    </div>
  );
}

function OptionsTi3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi3 />
    </div>
  );
}

function VariantsTi3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi3 />
    </div>
  );
}

function TextInput3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <TextInput2 />
      <TextInput3 />
    </div>
  );
}

function TextFrameTi4() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">자료 확인하기</p>
      </div>
    </div>
  );
}

function Field4() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi4 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field4 />
    </div>
  );
}

function OptionsTi4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi4 />
    </div>
  );
}

function VariantsTi4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi4 />
    </div>
  );
}

function TextInput4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi4 />
    </div>
  );
}

function TextFrameTi5() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">https://example.com</p>
      </div>
    </div>
  );
}

function Field5() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi5 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi5() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field5 />
    </div>
  );
}

function OptionsTi5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi5 />
    </div>
  );
}

function VariantsTi5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi5 />
    </div>
  );
}

function TextInput5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <TextInput4 />
      <TextInput5 />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="input">
      <Frame2 />
      <Input />
    </div>
  );
}

function DropdownItemFrame() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame7 />
          <Input1 />
        </div>
      </div>
    </div>
  );
}

function Variants1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[16px] py-[8px] relative w-full">
          <DropdownItemFrame />
        </div>
      </div>
    </div>
  );
}

export default function Step() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="step 3">
      <Title />
      <Variants />
      <Variants1 />
    </div>
  );
}