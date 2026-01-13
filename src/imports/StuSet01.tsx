import svgPaths from "./svg-liz0okx64q";
import img from "figma:asset/e36fd5850420d5d755eed7b04a4391b8a58a0b36.png";
import img1 from "figma:asset/6555fb25422d6991becc1a0e0ae8e0c520ad540b.png";

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

function Project() {
  return (
    <div className="bg-white content-stretch flex gap-[4px] h-[50px] items-center px-[20px] py-0 relative shrink-0 w-[240px]" data-name="project">
      <FeaturingStudioLogo />
      <div className="content-stretch flex items-center justify-center rounded-[4px] shrink-0 size-[24px]" data-name="contrastButton" />
    </div>
  );
}

function GlobalNavigationBar() {
  return (
    <div className="bg-white h-full relative shrink-0" data-name="Global Navigation Bar">
      <div className="content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <Project />
        <div className="bg-white content-stretch flex flex-col h-[850px] items-start relative shrink-0 w-[240px]" data-name="Side nav">
          <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="menu">
            <div className="bg-white content-stretch flex items-center px-[8px] py-0 relative shrink-0 w-[240px]" data-name="project">
              <div className="bg-white content-stretch flex items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0 w-[224px]" data-name="Project Button">
                <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
                  <div className="relative shrink-0 size-[32px]" data-name="Avatar">
                    <div className="absolute inset-0 rounded-[999px]" data-name="img">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[999px] size-full" src={img} />
                    </div>
                    <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-[999px]" data-name="border" />
                    <div className="absolute content-stretch flex items-center justify-center left-[19px] size-[16px] top-[-3px]" data-name="UpperBadge" />
                    <div className="absolute bg-white bottom-0 overflow-clip right-[-6px] rounded-[999px] size-[16px]" data-name="badge/sns">
                      <div className="absolute inset-[12.5%]" data-name="Social-Instagram">
                        <div className="absolute inset-[6.25%]" data-name="Vector">
                          <img alt="" className="block max-w-none size-full" height="10.5" src={img1} width="10.5" />
                        </div>
                      </div>
                      <div className="absolute inset-0" style={{ "--stroke-0": "rgba(240, 240, 240, 1)" } as React.CSSProperties}>
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" id="Ellipse 2364" r="7.5" stroke="var(--stroke-0, #F0F0F0)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                    <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap w-full">sojumanjan</p>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="contrastButton">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-CaretDown-Filled">
                    <div className="absolute bottom-[31.25%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
                      <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
                          <path d="M8 0L4 5L0 0H8Z" fill="var(--fill-0, #242424)" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full" data-name="02">
              <div className="size-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-0 relative w-full">
                  <div className="h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon-System-Formatting-Dashboard">
                          <div className="absolute inset-[12.5%]" data-name="Vector">
                            <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                                <g id="Vector">
                                  <path d={svgPaths.p214c4400} fill="#242424" />
                                  <path d={svgPaths.p7f9aa00} fill="#242424" />
                                  <path d={svgPaths.pf9cc200} fill="#242424" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">대시보드</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-Add-Outline">
                          <div className="absolute inset-1/4" data-name="Vector">
                            <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                                <path d={svgPaths.p22ea8600} fill="var(--fill-0, #242424)" id="Vector" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">새로운 자동 DM 만들기</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-name="_fix">
            <div className="size-full">
              <div className="content-stretch flex flex-col gap-[6px] items-start px-[8px] py-[16px] relative w-full">
                <div className="h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Formatting-Document-Outline">
                        <div className="absolute inset-[6.25%_18.75%]" data-name="Vector">
                          <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 14">
                              <g id="Vector">
                                <path d={svgPaths.pe6f1e00} fill="#242424" />
                                <path d="M8 10H2V11H8V10Z" fill="#242424" />
                                <path d="M8 7H2V8H8V7Z" fill="#242424" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
                        <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">사용자 가이드</p>
                        <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Social-Launch-Outline">
                          <div className="absolute inset-[6.25%_6.25%_12.5%_12.5%]" data-name="Vector">
                            <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                                <g id="Vector">
                                  <path d={svgPaths.p2b795f00} fill="#242424" />
                                  <path d={svgPaths.p20231700} fill="#242424" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[32px] relative shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="avatarUser">
                        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="color">
                          <div className="basis-0 bg-[#cce9e6] content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[999px] shrink-0 w-full" data-name="textContainer">
                            <p className="font-['Pretendard:Medium',sans-serif] leading-[10px] not-italic relative shrink-0 text-[#53a79f] text-[8px] text-center text-nowrap">U</p>
                          </div>
                        </div>
                      </div>
                      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">email@website.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[32px] py-0 relative size-full">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#31363a] text-[14px] text-nowrap">계정 설정</p>
        </div>
      </div>
    </div>
  );
}

function TextAlign() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="textAlign">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">프로필 이미지</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[161px]" data-name="container">
      <TextAlign />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start px-0 py-[20px] relative self-stretch shrink-0 w-[160px]">
      <Container />
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex gap-[32px] grow items-center min-h-px min-w-px px-0 py-[20px] relative shrink-0">
      <div className="relative shrink-0 size-[84px]" data-name="Avatar">
        <div className="absolute bg-[#d8e6fe] content-stretch flex flex-col inset-0 items-center justify-center rounded-[999px]" data-name="Text/Circle">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[40px] not-italic relative shrink-0 text-[#246ee1] text-[32px] text-center text-nowrap">M</p>
        </div>
        <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-[999px]" data-name="border" />
        <div className="absolute content-stretch flex items-center justify-center left-[61px] size-[22px] top-px" data-name="UpperBadge" />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame6 />
      <Frame2 />
    </div>
  );
}

function TextAlign1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="textAlign">
      <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">계정 정보</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="container">
      <TextAlign1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[160px]">
      <Container1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[420px]">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="textInput">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="variants (TI)">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="options (TI)">
            <div className="content-stretch flex items-start pb-[6px] pt-0 px-0 relative shrink-0 w-full" data-name="labelContainer">
              <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="label">
                <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="textContainer">
                  <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#959595] text-[12px] text-nowrap">
                    <p className="leading-[18px]">이메일</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-[#ebebeb] content-stretch cursor-pointer flex flex-col items-start p-0 relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
              <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="h-[32px] relative shrink-0 w-full" data-name="field">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
                      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#959595] text-[14px] text-left text-nowrap">
                        <p className="leading-[22px]">email@website.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[10px] items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[16px] py-0 relative rounded-[4px] shrink-0" data-name="tertiaryButton">
        <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">로그아웃</p>
      </div>
      <div className="bg-white content-stretch flex h-[40px] items-center justify-center px-[16px] py-0 relative rounded-[4px] shrink-0" data-name="tertiaryButton">
        <div aria-hidden="true" className="absolute border border-[#e34f2f] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#e34f2f] text-[14px] text-center text-nowrap">회원탈퇴</p>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="relative shrink-0 w-full" data-name="contents">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start px-[32px] py-0 relative w-full">
          <Frame11 />
          <Frame9 />
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pt-0 px-0 relative shrink-0 w-[1136px]">
      <Contents />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame1 />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-[24px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="bg-white content-stretch flex gap-[16px] items-start pb-0 pt-[8px] px-[32px] relative shrink-0 w-[1200px]" data-name="tabGroup">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start px-[4px] py-[8px] relative shrink-0" data-name="tabItem">
          <div aria-hidden="true" className="absolute border-[#5e51ff] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="container">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="label">
              <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">계정 설정</p>
            </div>
          </div>
        </div>
      </div>
      <Frame5 />
    </div>
  );
}

function Contents1() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col h-full items-start relative shrink-0" data-name="contents">
      <div className="bg-white h-[50px] relative shrink-0 w-full" data-name="headerTitle">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[32px] py-0 relative size-full">
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Left">
              <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
                <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] max-w-[150px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#31363a] text-[16px] text-nowrap">내 정보</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] items-center justify-end shrink-0" data-name="Right" />
          </div>
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function Dashboard() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-start min-h-px min-w-[320px] relative shrink-0 w-full" data-name="dashboard">
      <GlobalNavigationBar />
      <Contents1 />
    </div>
  );
}

export default function StuSet() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="STU-SET-01">
      <Dashboard />
    </div>
  );
}