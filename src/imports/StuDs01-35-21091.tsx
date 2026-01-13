import svgPaths from "./svg-orx2ww8cg7";
import imgVector from "figma:asset/6555fb25422d6991becc1a0e0ae8e0c520ad540b.png";
import imgImg from "figma:asset/e36fd5850420d5d755eed7b04a4391b8a58a0b36.png";

function Studio() {
  return (
    <div className="[grid-area:1_/_1] h-[16.957px] ml-[99.86px] mt-[2.22px] relative w-[61.334px]" data-name="Studio">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 17">
        <g id="Studio">
          <path d={svgPaths.p31e2ca00} fill="var(--fill-0, #2B2F33)" id="Vector" />
          <path d={svgPaths.p3f0b6000} fill="var(--fill-0, #2B2F33)" id="Vector_2" />
          <path d={svgPaths.p3574ba80} fill="var(--fill-0, #2B2F33)" id="Vector_3" />
          <path d={svgPaths.pd486d00} fill="var(--fill-0, #2B2F33)" id="Vector_4" />
          <path d={svgPaths.p3fa32000} fill="var(--fill-0, #2B2F33)" id="Vector_5" />
          <path d={svgPaths.p3c7f7f0} fill="var(--fill-0, #2B2F33)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function Featuring() {
  return (
    <div className="[grid-area:1_/_1] h-[24px] ml-0 mt-0 relative w-[94.183px]" data-name="featuring">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 24">
        <g id="featuring">
          <path d={svgPaths.p287adb80} fill="var(--fill-0, #2B2F33)" id="Vector" />
          <path d={svgPaths.p1bc5b220} fill="var(--fill-0, #2B2F33)" id="Vector_2" />
          <path d={svgPaths.p137ed200} fill="var(--fill-0, #2B2F33)" id="Vector_3" />
          <path d={svgPaths.p2ff6d000} fill="var(--fill-0, #2B2F33)" id="Vector_4" />
          <path d={svgPaths.p391b3c00} fill="var(--fill-0, #2B2F33)" id="Vector_5" />
          <path d={svgPaths.p3bd15d00} fill="var(--fill-0, #2B2F33)" id="Vector_6" />
          <path d={svgPaths.p14d6f000} fill="var(--fill-0, #2B2F33)" id="Vector_7" />
          <path d={svgPaths.p81ce100} fill="var(--fill-0, #2B2F33)" id="Vector_8" />
          <path d={svgPaths.p17d80600} fill="var(--fill-0, #2B2F33)" id="Vector_9" />
          <path d={svgPaths.pb54bb30} fill="var(--fill-0, #2B2F33)" id="Vector_10" />
        </g>
      </svg>
    </div>
  );
}

function FeaturingStudioLogo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="featuring_Studio_logo">
      <Studio />
      <Featuring />
    </div>
  );
}

function ContrastButton() {
  return <div className="content-stretch flex items-center justify-center rounded-[4px] shrink-0 size-[24px]" data-name="contrastButton" />;
}

function Project() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] h-[50px] items-center px-[20px] py-0 relative shrink-0 w-[240px]" data-name="project">
      <FeaturingStudioLogo />
      <ContrastButton />
    </div>
  );
}

function UpperBadge() {
  return <div className="absolute content-stretch flex items-center justify-center left-[19px] size-[16px] top-[-3px]" data-name="UpperBadge" />;
}

function SocialInstagram() {
  return (
    <div className="absolute inset-[12.5%]" data-name="Social-Instagram">
      <div className="absolute inset-[6.25%]" data-name="Vector">
        <img alt="" className="block max-w-none size-full" height="10.5" src={imgVector} width="10.5" />
      </div>
    </div>
  );
}

function BadgeSns() {
  return (
    <div className="absolute bg-white bottom-0 overflow-clip right-[-6px] rounded-[999px] size-[16px]" data-name="badge/sns">
      <SocialInstagram />
      <div className="absolute inset-0" style={{ "--stroke-0": "rgba(240, 240, 240, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" id="Ellipse 2364" r="7.5" stroke="var(--stroke-0, #F0F0F0)" />
        </svg>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-0 rounded-[999px]" data-name="img">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[999px] size-full" src={imgImg} />
      </div>
      <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-[999px]" data-name="border" />
      <UpperBadge />
      <BadgeSns />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap w-full">sojumanjan</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <Avatar />
      <Text />
    </div>
  );
}

function IconSystemNavigationCaretDownFilled() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-CaretDown-Filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Navigation-CaretDown-Filled">
          <path d="M12 6L8 11L4 6H12Z" fill="var(--fill-0, #242424)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ContrastButton1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="contrastButton">
      <IconSystemNavigationCaretDownFilled />
    </div>
  );
}

function ProjectButton() {
  return (
    <div className="bg-white content-stretch flex items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 w-[224px]" data-name="Project Button">
      <Text1 />
      <ContrastButton1 />
    </div>
  );
}

function Project1() {
  return (
    <div className="bg-white content-stretch flex items-center px-[8px] py-0 relative shrink-0 w-[240px]" data-name="project">
      <ProjectButton />
    </div>
  );
}

function IconSystemFormattingDashboard() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Formatting-Dashboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Formatting-Dashboard">
          <g id="Vector">
            <path d={svgPaths.p77b7740} fill="#242424" />
            <path d={svgPaths.p2971ab00} fill="#242424" />
            <path d={svgPaths.p257faa00} fill="#242424" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ContrastButton2() {
  return (
    <div className="h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
          <IconSystemFormattingDashboard />
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">대시보드</p>
        </div>
      </div>
    </div>
  );
}

function IconSystemNavigationAddOutline() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-Add-Outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Navigation-Add-Outline">
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #5032F9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ContrastButton3() {
  return (
    <div className="bg-[#ecefff] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
          <IconSystemNavigationAddOutline />
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#5032f9] text-[14px] text-center text-nowrap">새로운 자동 DM 만들기</p>
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 w-full" data-name="02">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-0 relative w-full">
          <ContrastButton2 />
          <ContrastButton3 />
        </div>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="menu">
      <Project1 />
      <Component2 />
    </div>
  );
}

function FormattingDocumentOutline() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Formatting-Document-Outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Formatting-Document-Outline">
          <g id="Vector">
            <path d={svgPaths.p3f732780} fill="#242424" />
            <path d="M11 11H5V12H11V11Z" fill="#242424" />
            <path d="M11 8H5V9H11V8Z" fill="#242424" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SocialLaunchOutline() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Social-Launch-Outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Social-Launch-Outline">
          <g id="Vector">
            <path d={svgPaths.p2cfd3e80} fill="#242424" />
            <path d={svgPaths.p170a0c00} fill="#242424" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">사용자 가이드</p>
      <SocialLaunchOutline />
    </div>
  );
}

function ContrastButton4() {
  return (
    <div className="h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
          <FormattingDocumentOutline />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function TextContainer() {
  return (
    <div className="basis-0 bg-[#cce9e6] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[999px] shrink-0 w-full" data-name="textContainer">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[10px] not-italic relative shrink-0 text-[#53a79f] text-[8px] text-center text-nowrap">U</p>
    </div>
  );
}

function Color() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="color">
      <TextContainer />
    </div>
  );
}

function AvatarUser() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="avatarUser">
      <Color />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[32px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
          <AvatarUser />
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">email@website.com</p>
        </div>
      </div>
    </div>
  );
}

function Fix() {
  return (
    <div className="relative shrink-0 w-full" data-name="_fix">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-start px-[8px] py-[16px] relative w-full">
          <ContrastButton4 />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function SideNav() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-[240px]" data-name="Side nav">
      <Menu />
      <Fix />
    </div>
  );
}

function GlobalNavigationBar() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Global Navigation Bar">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Project />
        <SideNav />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function GroupName() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow h-full items-center min-h-px min-w-px relative shrink-0" data-name="group name">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[16px] text-nowrap w-[512px]">자동 DM 설정</p>
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

function HeaderTitle() {
  return (
    <div className="bg-white h-[50px] relative shrink-0 w-full" data-name="headerTitle">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[32px] py-0 relative size-full">
          <Left />
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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">누군가 댓글을 남기면 어떤 게시물에서 실행할까요?</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">트리거 설정</p>
      <Frame1 />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[12px] relative w-full">
          <Frame8 />
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
          <path d={svgPaths.p3f4c7100} id="path-base" stroke="var(--stroke-0, #1F1551)" />
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

function Thumbnail() {
  return <div className="bg-[#ebebeb] h-[126px] rounded-[4px] shrink-0 w-[100px]" data-name="thumbnail" />;
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="contents">
      {[...Array(4).keys()].map((_, i) => (
        <Thumbnail key={i} />
      ))}
    </div>
  );
}

function DropdownItemFrame() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Options />
          <Contents />
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

function TextContainer1() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="textContainer">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap">
        <p className="leading-[18px]">포함 키워드 설정 (최대 3개)</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="label">
      <TextContainer1 />
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
        <g id="Icon-System-Navigation-Close">
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
          <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap text-right">
            <p className="leading-[18px]">1/3</p>
          </div>
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

function LabelContainer2() {
  return <div className="content-stretch flex items-start pb-[6px] pt-0 px-0 shrink-0 w-full" data-name="labelContainer" />;
}

function IconText() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex h-[24px] items-center justify-center px-[10px] py-0 relative rounded-[2px] shrink-0" data-name="icon+text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">OR</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0" data-name="text">
      <IconText />
    </div>
  );
}

function IconText1() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center px-[10px] py-0 relative rounded-[2px] shrink-0" data-name="icon+text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">AND</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0" data-name="text">
      <IconText1 />
    </div>
  );
}

function SegmentedControl() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] items-start p-[4px] relative rounded-[4px] shrink-0" data-name="segmentedControl">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Options2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options">
      <LabelContainer2 />
      <SegmentedControl />
    </div>
  );
}

function Variants() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="variants">
      <Options2 />
    </div>
  );
}

function Select() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="select">
      <Variants />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[56px] items-start relative shrink-0 w-full" data-name="5">
      <TextInput />
      <Select />
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

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <IconSystemDataRobotOutline />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e51ff] text-[11px] text-nowrap">
        <p className="leading-[16px]">이런 키워드는 어떠세요?</p>
      </div>
    </div>
  );
}

function LabelContainer3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">꾸안꾸</p>
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer3 />
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

function LabelContainer4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">립스틱추천</p>
    </div>
  );
}

function Tag4() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer4 />
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

function LabelContainer5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">홈데코</p>
    </div>
  );
}

function Tag6() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer5 />
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

function LabelContainer6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">육아일기</p>
    </div>
  );
}

function Tag8() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer6 />
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

function LabelContainer7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">일상</p>
    </div>
  );
}

function Tag10() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer7 />
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

function LabelContainer8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">식단</p>
    </div>
  );
}

function Tag12() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer8 />
    </div>
  );
}

function Tag13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag12 />
    </div>
  );
}

function LabelContainer9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">여행</p>
    </div>
  );
}

function Tag14() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer9 />
    </div>
  );
}

function Tag15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag14 />
    </div>
  );
}

function LabelContainer10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">먹방</p>
    </div>
  );
}

function Tag16() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer10 />
    </div>
  );
}

function Tag17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag16 />
    </div>
  );
}

function LabelContainer11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">연애</p>
    </div>
  );
}

function Tag18() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer11 />
    </div>
  );
}

function Tag19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag18 />
    </div>
  );
}

function LabelContainer12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1f1551] text-[11px] text-nowrap">피트니스</p>
    </div>
  );
}

function Tag20() {
  return (
    <div className="bg-[#ecefff] content-stretch flex gap-[2px] items-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
      <LabelContainer12 />
    </div>
  );
}

function Tag21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
      <Tag20 />
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
      <Tag13 />
      <Tag15 />
      <Tag17 />
      <Tag19 />
      <Tag21 />
    </div>
  );
}

function Keyword() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="keyword">
      <Frame7 />
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

function Variants1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="variants">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <DropdownItemFrame />
          <DropdownItemFrame1 />
        </div>
      </div>
    </div>
  );
}

function Step() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="step 1">
      <Title />
      <Variants1 />
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

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">누군가 댓글을 남기면 어떤 게시물에서 실행할까요?</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Num1 />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-nowrap">트리거 설정</p>
      <Frame2 />
    </div>
  );
}

function Title1() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[12px] relative w-full">
          <Frame9 />
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
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">특정 게시물 또는 릴스</p>
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

function Options3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="options">
      <RadioButtonItem2 />
    </div>
  );
}

function Thumbnail1() {
  return <div className="bg-[#ebebeb] h-[126px] rounded-[4px] shrink-0 w-[100px]" data-name="thumbnail" />;
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="contents">
      {[...Array(4).keys()].map((_, i) => (
        <Thumbnail1 key={i} />
      ))}
    </div>
  );
}

function DropdownItemFrame2() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative w-full">
          <Options3 />
          <Contents1 />
        </div>
      </div>
    </div>
  );
}

function RadioButton3() {
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

function Label4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Label">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">특정 댓글</p>
    </div>
  );
}

function RadioButtonItem3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="radioButtonItem">
      <RadioButton3 />
      <Label4 />
    </div>
  );
}

function Options4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="options">
      <RadioButtonItem3 />
    </div>
  );
}

function DropdownItemFrame3() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[4px] shrink-0 w-full" data-name="dropdownItemFrame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[12px] relative w-full">
          <Options4 />
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
      <Variants2 />
    </div>
  );
}

function Li() {
  return (
    <div className="h-full relative shrink-0 w-[500px]" data-name="li">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Step />
        <Step1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TertiaryButton() {
  return (
    <div className="bg-white content-stretch flex h-[32px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0" data-name="tertiaryButton">
      <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">시작하기</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-nowrap">미리보기</p>
      <TertiaryButton />
    </div>
  );
}

function UpperBadge1() {
  return <div className="absolute content-stretch flex items-center justify-center left-[19px] size-[16px] top-[-3px]" data-name="UpperBadge" />;
}

function Avatar1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-0 rounded-[999px]" data-name="img">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[999px] size-full" src={imgImg} />
      </div>
      <UpperBadge1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center px-0 py-[4px] relative shrink-0">
      <Avatar1 />
    </div>
  );
}

function Num2() {
  return (
    <div className="absolute bg-[#ecefff] content-stretch flex flex-col items-center justify-center left-[84px] top-[31px]" data-name="num">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#7273ff] text-[14px] text-nowrap">{`{{ID/이메일}}`}</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 bg-[#fafafa] grow min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[10px] relative w-full">
          <div className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] w-[278px]">
            <p className="mb-0">[피처링 캠페인 섭외 요청]</p>
            <p className="mb-0">{`안녕하세요!                        님 !`}</p>
            <p className="mb-0">{`피처링에서 협찬 캠페인 요청드리고자 연락드렸습니다. `}</p>
            <p className="mb-0">[피처링 오프라인 방문] 캠페인을 진행하는데 함께 진행하고 싶습니다.</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">진행을 원하시면 답장 부탁드립니다.</p>
            <p>감사합니다 :)</p>
          </div>
          <Num2 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame3 />
    </div>
  );
}

function InsertYourScreenHere() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[735px] items-center left-1/2 overflow-clip pb-0 pt-[40px] px-[12px] rounded-[28px] top-[10px] translate-x-[-50%] w-[370px]" data-name="insert your screen here">
      <Frame4 />
    </div>
  );
}

function TopSpeaker() {
  return (
    <div className="absolute h-[20px] left-[220px] top-[10px] w-[120px]" data-name="top-speaker">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 20">
        <g id="top-speaker">
          <path d={svgPaths.p11205000} fill="var(--fill-0, #F6F6F6)" id="Rectangle 9" />
          <rect fill="var(--fill-0, #E0E0E0)" height="4" id="Rectangle 10" rx="2" width="54" x="31" y="6" />
          <circle cx="91" cy="8" fill="var(--fill-0, #E0E0E0)" id="Ellipse 1" r="2" />
        </g>
      </svg>
    </div>
  );
}

function MobileWhite() {
  return (
    <div className="h-[702px] overflow-clip relative shrink-0 w-[560px]" data-name="Mobile-white">
      <InsertYourScreenHere />
      <TopSpeaker />
      <div className="absolute border-[#f6f6f6] border-[10px] border-solid inset-[0_85px_-43px_85px] rounded-[57px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_8px_16px_0px_rgba(0,0,0,0.14)]" data-name="device" />
      <div className="absolute bg-gradient-to-b from-[rgba(250,250,250,0)] h-[80px] left-0 to-[#fafafa] top-[622px] w-[560px]" />
    </div>
  );
}

function List() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[40px] h-full items-center overflow-clip px-[32px] py-[20px] relative shrink-0 w-[714px]" data-name="list">
      <Frame6 />
      <MobileWhite />
    </div>
  );
}

function Frame10() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0px_0px_1px] border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <Li />
      <List />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col h-full items-start relative shrink-0 w-[1200px]" data-name="container">
      <HeaderTitle />
      <Frame10 />
    </div>
  );
}

function Dashboard() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow h-full items-start justify-center min-h-px min-w-[320px] relative shrink-0" data-name="dashboard">
      <GlobalNavigationBar />
      <Container />
    </div>
  );
}

export default function StuDs() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="STU-DS-01">
      <Dashboard />
    </div>
  );
}