import svgPaths from "./svg-jeb3ed0e9f";

function GroupName() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow h-full items-center min-h-px min-w-px relative shrink-0" data-name="group name">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[16px] text-nowrap">자동화 명 2025-12-31</p>
    </div>
  );
}

function Left() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Left">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <GroupName />
      </div>
    </div>
  );
}

function PrimaryButton() {
  return (
    <div className="bg-[#ebebeb] content-stretch flex h-[40px] items-center justify-center px-[16px] py-0 relative rounded-[4px] shrink-0" data-name="primaryButton">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#959595] text-[14px] text-center text-nowrap">실행하기</p>
    </div>
  );
}

function ButtonContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="button container">
      <PrimaryButton />
    </div>
  );
}

function HeaderTitle() {
  return (
    <div className="bg-white h-[60px] relative shrink-0 w-full" data-name="headerTitle">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[32px] py-0 relative size-full">
          <Left />
          <ButtonContainer />
        </div>
      </div>
    </div>
  );
}

function Num() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="num">
      <div aria-hidden="true" className="absolute border border-[#7273ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#7273ff] text-[12px] text-nowrap">STEP 1</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">어떤 게시물에서 실행할까요?</p>
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

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
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">특정 게시물 또는 릴스</p>
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

function TertiaryButton() {
  return (
    <div className="bg-white content-stretch flex h-[32px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0" data-name="tertiaryButton">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">게시물 불러오기</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <TertiaryButton />
    </div>
  );
}

function DropdownItemFrame() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Options />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Variants() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <DropdownItemFrame />
        </div>
      </div>
    </div>
  );
}

function Step() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="step 1">
      <Title />
      <Variants />
    </div>
  );
}

function Num1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="num">
      <div aria-hidden="true" className="absolute border border-[#7273ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#7273ff] text-[12px] text-nowrap">STEP 2</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num1 />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">어떤 댓글에서 응답할까요?</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame17 />
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
          <path d={svgPaths.p202f0800} id="path-base" stroke="var(--stroke-0, #5E51FF)" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">특정 댓글</p>
    </div>
  );
}

function RadioButtonItem1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="radioButtonItem">
      <RadioButton1 />
      <Label1 />
    </div>
  );
}

function Options1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="options">
      <RadioButtonItem1 />
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

function Label2() {
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
      <Label2 />
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

function Frame15() {
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
      <Frame15 />
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

function DropdownItemFrame1() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Options1 />
          <Component />
        </div>
      </div>
    </div>
  );
}

function RadioButton2() {
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

function Label3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">모든 댓글</p>
    </div>
  );
}

function RadioButtonItem2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="radioButtonItem">
      <RadioButton2 />
      <Label3 />
    </div>
  );
}

function Options2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="options">
      <RadioButtonItem2 />
    </div>
  );
}

function DropdownItemFrame2() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[12px] relative w-full">
          <Options2 />
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

function Frame24() {
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
      <Frame24 />
    </div>
  );
}

function Options3() {
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

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options3 />
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

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextInput1 />
      <TextInput2 />
      <TextInput3 />
    </div>
  );
}

function DropdownItemFrame3() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame23 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Variants1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <DropdownItemFrame1 />
          <DropdownItemFrame2 />
          <DropdownItemFrame3 />
        </div>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="step 2">
      <Title1 />
      <Variants1 />
    </div>
  );
}

function Num2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="num">
      <div aria-hidden="true" className="absolute border border-[#7273ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#7273ff] text-[12px] text-nowrap">STEP 3</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num2 />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">어떤 메시지를 보낼까요?</p>
    </div>
  );
}

function Title2() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function TextContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">본문 메시지</p>
      </div>
    </div>
  );
}

function Options4() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="options">
      <TextContainer2 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options4 />
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
    <div className="content-stretch flex flex-col h-[184px] items-start relative shrink-0 w-full" data-name="options (TA)">
      <InputContainer />
    </div>
  );
}

function VariantsTa() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="variants (TA)">
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

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextArea />
    </div>
  );
}

function DropdownItemFrame4() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame29 />
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function TextContainer3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼 설정 (최대 3개)</p>
      </div>
    </div>
  );
}

function HelpIcon2() {
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

function IconContainer2() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0" data-name="iconContainer">
      <HelpIcon2 />
    </div>
  );
}

function Options5() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="options">
      <div className="flex flex-row items-center self-stretch">
        <TextContainer3 />
      </div>
      <IconContainer2 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options5 />
    </div>
  );
}

function TextFrameTi3() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼을 클릭하세요!</p>
      </div>
    </div>
  );
}

function Field4() {
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

function TextFrameTi4() {
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
          <TextFrameTi4 />
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

function Frame26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <TextInput4 />
      <TextInput5 />
    </div>
  );
}

function TextFrameTi5() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">지금 바로 다운 받기</p>
      </div>
    </div>
  );
}

function Field6() {
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

function InputContainerTi6() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field6 />
    </div>
  );
}

function OptionsTi6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi6 />
    </div>
  );
}

function VariantsTi6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi6 />
    </div>
  );
}

function TextInput6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi6 />
    </div>
  );
}

function TextFrameTi6() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">https://example.com</p>
      </div>
    </div>
  );
}

function Field7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi6 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi7() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field7 />
    </div>
  );
}

function OptionsTi7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi7 />
    </div>
  );
}

function VariantsTi7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi7 />
    </div>
  );
}

function TextInput7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi7 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <TextInput6 />
      <TextInput7 />
    </div>
  );
}

function TextFrameTi7() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">자료 확인하기</p>
      </div>
    </div>
  );
}

function Field8() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi7 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi8() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field8 />
    </div>
  );
}

function OptionsTi8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi8 />
    </div>
  );
}

function VariantsTi8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi8 />
    </div>
  );
}

function TextInput8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi8 />
    </div>
  );
}

function TextFrameTi8() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">https://example.com</p>
      </div>
    </div>
  );
}

function Field9() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi8 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi9() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field9 />
    </div>
  );
}

function OptionsTi9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi9 />
    </div>
  );
}

function VariantsTi9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi9 />
    </div>
  );
}

function TextInput9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="textInput">
      <VariantsTi9 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <TextInput8 />
      <TextInput9 />
    </div>
  );
}

function DropdownItemFrame5() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame32 />
          <Frame26 />
          <Frame27 />
          <Frame28 />
        </div>
      </div>
    </div>
  );
}

function Variants2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <DropdownItemFrame4 />
          <DropdownItemFrame5 />
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="step 3">
      <Title2 />
      <Variants2 />
    </div>
  );
}

function Num3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="num">
      <div aria-hidden="true" className="absolute border border-[#7273ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#7273ff] text-[12px] text-nowrap">STEP 4</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num3 />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">팔로워인지 확인할까요?</p>
    </div>
  );
}

function Title3() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function TextContainer4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">팔로우 확인 메시지</p>
      </div>
    </div>
  );
}

function HelpIcon3() {
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

function IconContainer3() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0" data-name="iconContainer">
      <HelpIcon3 />
    </div>
  );
}

function Options6() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="options">
      <div className="flex flex-row items-center self-stretch">
        <TextContainer4 />
      </div>
      <IconContainer3 />
    </div>
  );
}

function Toggle1() {
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

function ToggleItem1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="toggleItem">
      <Toggle1 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options6 />
      <ToggleItem1 />
    </div>
  );
}

function TextFrameTa1() {
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

function TextFrameTi9() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼명을 입력해 주세요.</p>
      </div>
    </div>
  );
}

function Field10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi9 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi10() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field10 />
    </div>
  );
}

function OptionsTi10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi10 />
    </div>
  );
}

function VariantsTi10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi10 />
    </div>
  );
}

function TextInput10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
      <VariantsTi10 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextArea1 />
      <TextInput10 />
    </div>
  );
}

function DropdownItemFrame6() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame33 />
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function TextContainer5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">팔로우 미확인 시</p>
      </div>
    </div>
  );
}

function Options7() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="options">
      <TextContainer5 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Options7 />
    </div>
  );
}

function TextFrameTa2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TA)">
      <div className="basis-0 flex flex-col font-['Pretendard:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#bbb] text-[14px]">
        <p className="leading-[22px]">인스타그램 팔로우가 되어있지 않다면, 링크 전송이 원활하지 않을 수 있습니다. 팔로우 후 다시 시도해 주세요.</p>
      </div>
    </div>
  );
}

function InputContainer2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="inputContainer">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
          <TextFrameTa2 />
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

function OptionsTa2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TA)">
      <InputContainer2 />
    </div>
  );
}

function VariantsTa2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TA)">
      <OptionsTa2 />
    </div>
  );
}

function TextArea2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textArea">
      <VariantsTa2 />
    </div>
  );
}

function TextFrameTi10() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bbb] text-[14px] text-nowrap">
        <p className="leading-[22px]">버튼명을 입력해 주세요.</p>
      </div>
    </div>
  );
}

function Field11() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <TextFrameTi10 />
        </div>
      </div>
    </div>
  );
}

function InputContainerTi11() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Field11 />
    </div>
  );
}

function OptionsTi11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
      <InputContainerTi11 />
    </div>
  );
}

function VariantsTi11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
      <OptionsTi11 />
    </div>
  );
}

function TextInput11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
      <VariantsTi11 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <TextArea2 />
      <TextInput11 />
    </div>
  );
}

function DropdownItemFrame7() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Frame35 />
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Variants3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <DropdownItemFrame6 />
          <DropdownItemFrame7 />
        </div>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="step 4">
      <Title3 />
      <Variants3 />
    </div>
  );
}

function Li() {
  return (
    <div className="h-full relative shrink-0 w-[500px]" data-name="li">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Step />
        <Step1 />
        <Step2 />
        <Step3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">미리보기</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="container">
      <Label4 />
    </div>
  );
}

function TabItem() {
  return (
    <div className="content-stretch flex flex-col items-start px-[4px] py-[8px] relative shrink-0" data-name="tabItem">
      <div aria-hidden="true" className="absolute border-[#5e51ff] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="container">
      <TabItem />
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-white content-stretch flex items-center pb-0 pt-[10px] px-[32px] relative shrink-0 w-[700px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function IconText() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex h-[24px] items-center justify-center px-[10px] py-0 relative rounded-[2px] shrink-0" data-name="icon+text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">게시물</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0" data-name="text">
      <IconText />
    </div>
  );
}

function IconText1() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center px-[10px] py-0 relative rounded-[2px] shrink-0" data-name="icon+text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">댓글</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0" data-name="text">
      <IconText1 />
    </div>
  );
}

function IconText2() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center px-[10px] py-0 relative rounded-[2px] shrink-0" data-name="icon+text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">DM</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0" data-name="text">
      <IconText2 />
    </div>
  );
}

function SegmentedControl() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-start p-[4px] relative rounded-[4px] shrink-0" data-name="segmentedControl">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex items-center pb-0 pt-[20px] px-[32px] relative shrink-0 w-[700px]" data-name="Tab">
      <SegmentedControl />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Tab />
      <Tab1 />
    </div>
  );
}

function StatusBarTime() {
  return (
    <div className="absolute h-[21px] left-[calc(16.67%-11.17px)] rounded-[24px] top-[12px] translate-x-[-50%] w-[54px]" data-name="_StatusBar-time">
      <p className="absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[22px] left-[27px] not-italic text-[17px] text-black text-center top-px tracking-[-0.408px] translate-x-[-50%] w-[54px]">9:41</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute contents left-[calc(16.67%-11.17px)] top-[12px] translate-x-[-50%]" data-name="Frame">
      <StatusBarTime />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[13px] left-[calc(83.33%-0.13px)] top-[17px] translate-x-[-50%] w-[77.401px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4012 13">
        <g id="Frame">
          <g id="Battery">
            <path d={svgPaths.p2646e000} id="Outline" opacity="0.35" stroke="var(--stroke-0, black)" strokeWidth="1.05509" />
            <path d={svgPaths.p4c0c710} fill="var(--fill-0, black)" id="Battery End" opacity="0.4" />
            <path d={svgPaths.p22239c00} fill="var(--fill-0, black)" id="Fill" />
          </g>
          <path d={svgPaths.pce4f780} fill="var(--fill-0, black)" id="Wifi" />
          <g id="Icon / Mobile Signal">
            <path d={svgPaths.p16816b00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p18ef7a00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2262f080} fill="var(--fill-0, black)" />
            <path d={svgPaths.pc5da680} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[44px] overflow-clip shrink-0 sticky top-0 w-full" data-name="Frame">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Chevron">
          <path d="M16 4L8 12L16 20" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 content-stretch flex flex-col font-semibold grow items-center leading-[1.315] min-h-px min-w-px not-italic relative shrink-0 text-center">
      <p className="font-['Inter:Semi_Bold',sans-serif] relative shrink-0 text-[#666] text-[12px] tracking-[0.24px] uppercase w-full">sojumanjan</p>
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] relative shrink-0 text-[16px] text-black tracking-[0.16px] w-full">게시물</p>
    </div>
  );
}

function More() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="More">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="More" opacity="0">
          <path d={svgPaths.p11e47970} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p28385680} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p25e8ad00} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pb-0 pt-[12px] px-[12px] relative w-full">
          <Chevron />
          <Frame7 />
          <More />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return <div className="absolute bg-[#121714] inset-0" data-name="Frame" />;
}

function Avatar() {
  return (
    <div className="overflow-clip relative rounded-[132.68px] shrink-0 size-[32px]" data-name="avatar">
      <Frame3 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[130px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[14px] text-black tracking-[0.28px] w-full">sojumanjan</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Avatar />
      <Frame9 />
    </div>
  );
}

function More1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="More">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="More">
          <path d={svgPaths.p11e47970} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p28385680} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p25e8ad00} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Frame10 />
          <More1 />
        </div>
      </div>
    </div>
  );
}

function TextContainer6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full" data-name="text container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[16px] text-center text-nowrap">
        <p className="leading-[24px]">자동화 설정할 게시물을 선택해 주세요!</p>
      </div>
    </div>
  );
}

function TertiaryButton1() {
  return (
    <div className="bg-white content-stretch flex h-[32px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0" data-name="tertiaryButton">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">게시물 불러오기</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <TertiaryButton1 />
    </div>
  );
}

function Post() {
  return (
    <div className="bg-[#ebebeb] content-stretch flex flex-col gap-[12px] items-center justify-center overflow-clip relative shrink-0 size-[393px]" data-name="Post">
      <TextContainer6 />
      <Frame22 />
    </div>
  );
}

function PostsCarouselChangeThis() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[393px]" data-name="Posts Carousel – CHANGE THIS">
      <Post />
    </div>
  );
}

function Like() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="Like">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Like">
          <path d={svgPaths.p84bf580} fill="var(--fill-0, #0C1014)" id="Like_2" />
        </g>
      </svg>
    </div>
  );
}

function Like1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Like">
      <Like />
    </div>
  );
}

function Like2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Like">
      <Like1 />
    </div>
  );
}

function Component24Comment() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="24 / Comment">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="24 / Comment">
          <path clipRule="evenodd" d={svgPaths.p376b30f0} fill="var(--fill-0, #0C1014)" fillRule="evenodd" id="Comment" />
        </g>
      </svg>
    </div>
  );
}

function Comment() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Comment">
      <Component24Comment />
    </div>
  );
}

function Component24Share() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="24 / Share">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="24 / Share">
          <path clipRule="evenodd" d={svgPaths.p3036ca00} fill="var(--fill-0, #0C1014)" fillRule="evenodd" id="Share" />
        </g>
      </svg>
    </div>
  );
}

function Share() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Share">
      <Component24Share />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Actions">
      <Like2 />
      <Comment />
      <Share />
    </div>
  );
}

function Save() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23px]" data-name="Save">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 24">
        <g id="Save">
          <path d={svgPaths.p12bde800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pt-[12px] px-[16px] relative w-full">
          <Actions />
          <Save />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 text-black text-nowrap w-full" data-name="Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">sojumanjan</p>
      <p className="basis-0 font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0">게시물을 선택해 주세요.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 text-[14px] tracking-[-0.28px] w-full" data-name="Frame">
      <Frame4 />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal relative shrink-0 text-[#666] w-full">댓글 모두 보기</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start leading-[1.3] min-h-px min-w-px not-italic relative shrink-0" data-name="Frame">
      <Frame5 />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal relative shrink-0 text-[#737373] text-[12px] w-full">12월 31일</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <Frame8 />
      <Frame11 />
      <PostsCarouselChangeThis />
      <Frame14 />
      <Frame13 />
    </div>
  );
}

function InstagramPost() {
  return (
    <div className="content-stretch flex flex-col h-[755px] items-start overflow-clip p-[10px] relative shrink-0 w-[393px]" data-name="Instagram Post">
      <Frame2 />
      <Frame12 />
    </div>
  );
}

function PreviewLight() {
  return (
    <div className="h-[755px] relative rounded-[56px] shrink-0 w-[393px]" data-name="Preview-light">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <InstagramPost />
      </div>
      <div aria-hidden="true" className="absolute border-[#f6f6f6] border-[10px] border-solid inset-0 pointer-events-none rounded-[56px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_8px_16px_0px_rgba(0,0,0,0.14)]" />
    </div>
  );
}

function List() {
  return (
    <div className="basis-0 bg-[#fafafa] content-stretch flex flex-col gap-[40px] grow h-full items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="list">
      <Frame30 />
      <PreviewLight />
    </div>
  );
}

function Frame20() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <Li />
      <List />
    </div>
  );
}

export default function Container2() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col items-start relative size-full" data-name="container">
      <HeaderTitle />
      <Frame20 />
    </div>
  );
}