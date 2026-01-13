import svgPaths from "./svg-22zjnd6cnn";
import imgVector from "figma:asset/6555fb25422d6991becc1a0e0ae8e0c520ad540b.png";
import imgImg from "figma:asset/e36fd5850420d5d755eed7b04a4391b8a58a0b36.png";

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

function IconSystemNavigationCaretUpFilled() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-CaretUp-Filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon-System-Navigation-CaretUp-Filled">
          <path d="M4 10L8 5L12 10H4Z" fill="var(--fill-0, #242424)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ContrastButton() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="contrastButton">
      <IconSystemNavigationCaretUpFilled />
    </div>
  );
}

function ProjectButton() {
  return (
    <div className="bg-[#ecefff] content-stretch flex items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 w-[224px]" data-name="Project Button">
      <Text1 />
      <ContrastButton />
    </div>
  );
}

function Project() {
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
            <path d={svgPaths.p77b7740} fill="#5032F9" />
            <path d={svgPaths.p2971ab00} fill="#5032F9" />
            <path d={svgPaths.p257faa00} fill="#5032F9" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ContrastButton1() {
  return (
    <div className="bg-[#ecefff] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
          <IconSystemFormattingDashboard />
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#5032f9] text-[14px] text-center text-nowrap">대시보드</p>
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
          <path d={svgPaths.p349d7700} fill="var(--fill-0, #242424)" id="Vector" />
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
          <IconSystemNavigationAddOutline />
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">새로운 자동 DM 만들기</p>
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 w-full" data-name="02">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-0 relative w-full">
          <ContrastButton1 />
          <ContrastButton2 />
        </div>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="menu">
      <Project />
      <Component />
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

function ContrastButton3() {
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
          <ContrastButton3 />
          <Frame />
        </div>
      </div>
    </div>
  );
}

export default function SideNav() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Side nav">
      <Menu />
      <Fix />
    </div>
  );
}