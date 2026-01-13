import svgPaths from "./svg-d6u21d4lhs";
import img from "figma:asset/e36fd5850420d5d755eed7b04a4391b8a58a0b36.png";
import img1 from "figma:asset/fa16e8324984017afff19095853f648f79334a72.png";

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
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Global Navigation Bar">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Project />
        <div className="basis-0 bg-white content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-[240px]" data-name="Side nav">
          <div className="relative shrink-0 w-full" data-name="_fix">
            <div className="size-full">
              <div className="content-stretch flex flex-col gap-[6px] items-start px-[8px] py-[16px] relative w-full">
                <div className="relative shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex items-center justify-between px-[12px] py-[6px] relative w-full">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <div className="relative shrink-0 size-[32px]" data-name="Avatar">
                          <div className="absolute inset-0 rounded-[999px]" data-name="img">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[999px] size-full" src={img} />
                          </div>
                          <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-[999px]" data-name="border" />
                          <div className="absolute content-stretch flex items-center justify-center left-[19px] size-[16px] top-[-3px]" data-name="UpperBadge" />
                        </div>
                        <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">@instagram ID</p>
                      </div>
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-ChevronUp-Outline">
                        <div className="absolute inset-[31.25%_18.75%_33.13%_18.75%]" data-name="Vector">
                          <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
                              <path d={svgPaths.p144fc680} fill="var(--fill-0, #242424)" id="Vector" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="menu">
            <div className="relative shrink-0 w-full" data-name="_Scroll Section">
              <div className="size-full">
                <div className="content-stretch flex flex-col items-start px-[8px] py-0 relative w-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="01">
                    <div className="bg-[#ecefff] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="contrastButton">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
                          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Formatting-Dashboard">
                            <div className="absolute inset-[12.5%]" data-name="Vector">
                              <div className="absolute inset-0" style={{ "--fill-0": "rgba(80, 50, 249, 1)" } as React.CSSProperties}>
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                                  <g id="Vector">
                                    <path d={svgPaths.p214c4400} fill="#5032F9" />
                                    <path d={svgPaths.p7f9aa00} fill="#5032F9" />
                                    <path d={svgPaths.pf9cc200} fill="#5032F9" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#5032f9] text-[14px] text-center text-nowrap">대시보드</p>
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
                          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="text">
                            <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">새로운 자동 DM 만들기</p>
                          </div>
                        </div>
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

function GroupName() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow h-full items-center min-h-px min-w-px relative shrink-0" data-name="group name">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[16px] text-nowrap w-[512px]">대시보드</p>
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

function Frame4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[20px] text-nowrap">
        <p className="leading-[28px]">자동 DM 현황</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">활성화된 자동 DM 수</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex font-['Pretendard:Medium',sans-serif] gap-[4px] items-center not-italic relative shrink-0 text-center text-nowrap w-full" data-name="text">
      <p className="leading-[24px] relative shrink-0 text-[#242424] text-[16px]">999,998 개</p>
      <p className="leading-[18px] relative shrink-0 text-[#707070] text-[12px]">/ 999,999</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="text">
      <Text />
    </div>
  );
}

function Box() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative w-full">
          <Label />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">총 도달 인원</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="helpIcon">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(187, 187, 187, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path d={svgPaths.p104c8a00} fill="var(--fill-0, #BBBBBB)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex font-['Pretendard:Medium',sans-serif] gap-[4px] items-center not-italic pb-0 pt-[24px] px-0 relative shrink-0 text-center text-nowrap w-full" data-name="text">
      <p className="leading-[24px] relative shrink-0 text-[#242424] text-[16px]">999,999 명</p>
      <p className="leading-[18px] relative shrink-0 text-[#3ba974] text-[12px]">어제보다 +999,999</p>
    </div>
  );
}

function Box1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative w-full">
          <Label1 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">총 클릭 인원</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="helpIcon">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(187, 187, 187, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path d={svgPaths.p104c8a00} fill="var(--fill-0, #BBBBBB)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex font-['Pretendard:Medium',sans-serif] gap-[4px] items-center not-italic pb-0 pt-[24px] px-0 relative shrink-0 text-center text-nowrap w-full" data-name="text">
      <p className="leading-[24px] relative shrink-0 text-[#242424] text-[16px]">999,999 명</p>
      <p className="leading-[18px] relative shrink-0 text-[#3ba974] text-[12px]">어제보다 +999,999</p>
    </div>
  );
}

function Box2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative w-full">
          <Label2 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Box />
      <Box1 />
      <Box2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[20px] text-nowrap">
        <p className="leading-[28px]">자동 DM 내역</p>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#5e51ff] content-stretch flex gap-[4px] h-full items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0" data-name="primaryButton">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon-System-Navigation-Add-Outline">
            <div className="absolute inset-1/4" data-name="Vector">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                  <path d={svgPaths.p22ea8600} fill="var(--fill-0, white)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">새로운 자동 DM 만들기</p>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-[1136px]" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="bg-white relative shrink-0 w-full" data-name="tableHeader">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="h-[38px] shrink-0 sticky top-0 w-[360px]" data-name="fix">
              <div className="content-stretch flex items-center overflow-clip pl-[4px] pr-0 py-0 relative rounded-[inherit] size-full">
                <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center justify-between px-[8px] py-0 relative size-full">
                      <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
                        <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">콘텐츠</p>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#bbb] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>
            <div className="basis-0 content-stretch flex grow h-[38px] items-center min-h-px min-w-px shrink-0 sticky top-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="HeaderCell">
                <div className="content-stretch flex items-center justify-between overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
                    <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">상태</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
                      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">도달 인원</p>
                      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="icon">
                        <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Navigation-ArrowUp-Outline">
                          <div className="absolute inset-[12.5%_18.75%]" data-name="Vector">
                            <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
                                <path d={svgPaths.p369aec0} fill="var(--fill-0, #242424)" id="Vector" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
                      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">클릭 인원</p>
                      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="icon">
                        <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Navigation-ArrowUp-Outline">
                          <div className="absolute inset-[12.5%_18.75%]" data-name="Vector">
                            <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
                                <path d={svgPaths.p369aec0} fill="var(--fill-0, #242424)" id="Vector" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
                      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">마지막 수정일시</p>
                      <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="icon">
                        <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Navigation-ArrowUp-Outline">
                          <div className="absolute inset-[12.5%_18.75%]" data-name="Vector">
                            <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
                                <path d={svgPaths.p369aec0} fill="var(--fill-0, #242424)" id="Vector" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-30</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">45,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">1,250 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-31 14:30</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute bg-[#ebebeb] left-1/2 overflow-clip size-[36px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="none">
                            <div className="absolute left-1/2 overflow-clip size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon-System-Formatting-Image-Outline">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(187, 187, 187, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                                    <g id="Vector">
                                      <path d={svgPaths.p3e8b7d00} fill="#BBBBBB" />
                                      <path d={svgPaths.p32ac2800} fill="#BBBBBB" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-21</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">78,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">9,500 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-22 09:45</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-20</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">22,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">15,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-20 17:15</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-01</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">33,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">20,500 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-11 23:59</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute bg-[#ebebeb] left-1/2 overflow-clip size-[36px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="none">
                            <div className="absolute left-1/2 overflow-clip size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon-System-Formatting-Image-Outline">
                              <div className="absolute inset-[12.5%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(187, 187, 187, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                                    <g id="Vector">
                                      <path d={svgPaths.p3e8b7d00} fill="#BBBBBB" />
                                      <path d={svgPaths.p32ac2800} fill="#BBBBBB" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-01</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">57,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">11,200 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-11 00:01</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-10</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">22,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">13,800 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-11 11:11</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-07</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">90,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">16,700 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-08 18:22</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-05</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">18,900 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-06 15:05</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-05</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">66,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">14,400 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26-01-05 12:12</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-18</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">29,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">17,600 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 18 08:08</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-14</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">53,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">19,300 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 14 19:19</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-11</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">84,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">21,800 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 11 16:16</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-25</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">39,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">22,500 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 25 10:10</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-31</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">71,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">23,700 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 31 23:59</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-11</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25,900 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 11 11:11</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-14</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">53,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">19,300 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 14 19:19</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-11</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">84,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">21,800 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 11 16:16</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-25</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#e0e0e0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#242424] text-[12px] text-nowrap">중단됨</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">39,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">22,500 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 25 10:10</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-31</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">71,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">23,700 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 31 23:59</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="tableCell">
          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[58px] items-center pl-[4px] pr-0 py-0 relative shrink-0 w-[360px]" data-name="fix">
              <div aria-hidden="true" className="absolute border-[#d2d2d2] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Checkbox/Tab/AvatarLabel">
                      <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="id">
                        <div className="overflow-clip relative rounded-[4px] shrink-0 size-[36px]" data-name="thumbnail">
                          <div className="absolute h-[48px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36px]" data-name="image 309">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="text">
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="id">
                            <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#242424] text-[14px] text-nowrap">2025-01-11</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="icon">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="btn">
                          <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="tertiaryButton">
                            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" />
                            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
                              <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
                                <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                                    <g id="Vector">
                                      <path d={svgPaths.p39bde000} fill="#242424" />
                                      <path d={svgPaths.p25258f70} fill="#242424" />
                                      <path d={svgPaths.p23e70e80} fill="#242424" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative self-stretch shrink-0" data-name="list">
              <div className="h-full relative shrink-0 w-[150px]" data-name="Data Table Cell">
                <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start relative shrink-0" data-name="tag">
                    <div className="bg-[#f5faf0] content-stretch flex gap-[4px] items-center px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="tag">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Label Container">
                        <p className="font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#40562b] text-[12px] text-nowrap">진행 중</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">26,000 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25,900 명</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">25. 01. 11 11:11</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Table />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full">
      <Frame2 />
      <Frame5 />
      <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="pagination">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="navigator">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-CaretLeft-Filled">
            <div className="absolute bottom-1/4 left-[31.25%] right-[37.5%] top-1/4" data-name="Vector">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(187, 187, 187, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
                  <path d="M5 8L0 4L5 0V8Z" fill="var(--fill-0, #BBBBBB)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[40px] items-center justify-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="numberItem">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">1</p>
          <div className="absolute bg-[#5959ff] bottom-[4px] h-[2px] left-[calc(50%+0.5px)] translate-x-[-50%] w-[16px]" data-name="active line" />
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="numberItem">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-center text-nowrap">2</p>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="numberItem">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-center text-nowrap">3</p>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="numberItem">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-center text-nowrap">4</p>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="numberItem">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-center text-nowrap">5</p>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="ellipsis">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-MoreHorizontal-Filled">
            <div className="absolute inset-[43.75%_18.75%]" data-name="Vector">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(112, 112, 112, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
                  <g id="Vector">
                    <path d={svgPaths.p39bde000} fill="#707070" />
                    <path d={svgPaths.p25258f70} fill="#707070" />
                    <path d={svgPaths.p23e70e80} fill="#707070" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[16px] py-0 relative shrink-0" data-name="numberItem">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-center text-nowrap">10</p>
        </div>
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="navigator">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Navigation-CaretRight-Filled">
            <div className="absolute bottom-1/4 left-[37.5%] right-[31.25%] top-1/4" data-name="Vector">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(36, 36, 36, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 8">
                  <path d="M0 0L5 4L0 8V0Z" fill="var(--fill-0, #242424)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start p-[32px] relative w-full">
          <Frame6 />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col items-start relative shrink-0 w-[1200px]" data-name="container">
      <HeaderTitle />
      <Frame />
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