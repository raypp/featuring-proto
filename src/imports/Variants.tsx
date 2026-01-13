import svgPaths from "./svg-fpgzs3bdq1";

function RadioButton() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="radioButton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="radioButton">
          <path d={svgPaths.p202f0800} id="path-base" stroke="var(--stroke-0, #5E51FF)" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">특정 댓글</p>
    </div>
  );
}

function RadioButtonItem() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="radioButtonItem">
      <RadioButton />
      <Label />
    </div>
  );
}

function Options() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="options">
      <RadioButtonItem />
    </div>
  );
}

function TextContainer() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap">
        <p className="leading-[18px]">키워드 설정</p>
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

function Label1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="label">
      <TextContainer />
      <IconContainer />
    </div>
  );
}

function LabelContainer() {
  return (
    <div className="content-stretch flex items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="labelContainer">
      <Label1 />
    </div>
  );
}

function LeadingElement() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="leadingElement">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="leadingElement">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <path d={svgPaths.p22803580} fill="var(--fill-0, #91CFC9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LabelContainer1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#264d4a] text-[12px] text-nowrap">공동구매</p>
    </div>
  );
}

function IconSystemNavigationClose() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon-System-Navigation-Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Navigation-Close">
          <path d={svgPaths.p13d64c00} fill="var(--fill-0, #424242)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0" data-name="button">
      <IconSystemNavigationClose />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#eff8f7] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer1 />
      <Button />
    </div>
  );
}

function Tag1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="tag">
      <Tag />
    </div>
  );
}

function Field() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-0 relative size-full">
          <LeadingElement />
          <Tag1 />
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
      <LabelContainer />
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

function Component1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[56px] items-start relative shrink-0 w-full" data-name="5">
      <TextInput />
    </div>
  );
}

function IconSystemDataRobotOutline() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Data-Robot-Outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Data-Robot-Outline">
          <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
          <g id="Vector">
            <path d={svgPaths.p2d795c50} fill="#5E51FF" />
            <path d={svgPaths.p3a4531c0} fill="#5E51FF" />
            <path d={svgPaths.p7c68600} fill="#5E51FF" />
            <path d={svgPaths.p1bfbc400} fill="#5E51FF" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <IconSystemDataRobotOutline />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e51ff] text-[11px] text-nowrap">
        <p className="leading-[16px]">이런 키워드는 어떠세요?</p>
      </div>
    </div>
  );
}

function LabelContainer2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">가격</p>
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer2 />
    </div>
  );
}

function Tag3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag2 />
    </div>
  );
}

function LabelContainer3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">공구</p>
    </div>
  );
}

function Tag4() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer3 />
    </div>
  );
}

function Tag5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag4 />
    </div>
  );
}

function LabelContainer4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">정보</p>
    </div>
  );
}

function Tag6() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer4 />
    </div>
  );
}

function Tag7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag6 />
    </div>
  );
}

function LabelContainer5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">링크</p>
    </div>
  );
}

function Tag8() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer5 />
    </div>
  );
}

function Tag9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag8 />
    </div>
  );
}

function LabelContainer6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">💜</p>
    </div>
  );
}

function Tag10() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer6 />
    </div>
  );
}

function Tag11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag10 />
    </div>
  );
}

function Set() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="set">
      <Tag3 />
      <Tag5 />
      <Tag7 />
      <Tag9 />
      <Tag11 />
    </div>
  );
}

function Keyword() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="keyword">
      <Frame />
      <Set />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="포함키워드">
      <Component1 />
      <Keyword />
    </div>
  );
}

function DropdownItemFrame() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Options />
          <Component />
        </div>
      </div>
    </div>
  );
}

function RadioButton1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="radioButton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="radioButton">
          <path d={svgPaths.p3f4c7100} id="path-base" stroke="var(--stroke-0, #1F1551)" />
        </g>
      </svg>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">모든 댓글</p>
    </div>
  );
}

function RadioButtonItem1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="radioButtonItem">
      <RadioButton1 />
      <Label2 />
    </div>
  );
}

function Options1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="options">
      <RadioButtonItem1 />
    </div>
  );
}

function DropdownItemFrame1() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[12px] relative w-full">
          <Options1 />
        </div>
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

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">
        <p className="leading-[18px]">필수 3개를 설정해야 랜덤으로 발송돼요!</p>
      </div>
      <IconContainer1 />
    </div>
  );
}

function TextContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">공개 답글 설정</p>
      </div>
      <Frame2 />
    </div>
  );
}

function Options2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="options">
      <TextContainer1 />
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

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options2 />
      <ToggleItem />
    </div>
  );
}

function TextFrameTi() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="basis-0 flex flex-col font-['Pretendard:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#242424] text-[14px]">
        <p className="leading-[22px]">안녕하세요! DM을 확인해주세요. 😊 메시지가 오지 않는다면 요청함을 확인해 주세요.</p>
      </div>
    </div>
  );
}

function Field1() {
  return (
    <div className="relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-[8px] relative w-full">
          <TextFrameTi />
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

function TextFrameTi1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">참여해주셔서 감사합니다!</p>
      </div>
    </div>
  );
}

function Field2() {
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
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
      <VariantsTi2 />
    </div>
  );
}

function TextFrameTi2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">만나서 반가워요. 지금 바로 DM 보내드릴게요!</p>
      </div>
    </div>
  );
}

function Field3() {
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
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
      <VariantsTi3 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextInput1 />
      <TextInput2 />
      <TextInput3 />
    </div>
  );
}

function DropdownItemFrame2() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame1 />
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
          <DropdownItemFrame2 />
        </div>
      </div>
    </div>
  );
}