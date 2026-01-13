import svgPaths from "./svg-0pmyx9ha2b";

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">인사이트</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="container">
      <Label />
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

function Label1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#707070] text-[14px] text-nowrap">미리보기</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="container">
      <Label1 />
    </div>
  );
}

function TabItem1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[4px] py-[8px] relative shrink-0" data-name="tabItem">
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="container">
      <TabItem />
      <TabItem1 />
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-white content-stretch flex items-center pb-0 pt-[10px] px-[32px] relative shrink-0 w-[700px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Tab />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[20px] text-nowrap">
        <p className="leading-[28px]">핵심 성과</p>
      </div>
    </div>
  );
}

function HelpIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_68_11970)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_11970">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">도달 인원</p>
      <HelpIcon />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex font-['Pretendard:Medium',sans-serif] gap-[4px] items-center not-italic relative shrink-0 text-center text-nowrap w-full" data-name="text">
      <p className="leading-[24px] relative shrink-0 text-[#242424] text-[16px]">999,998 명</p>
      <p className="leading-[18px] relative shrink-0 text-[#707070] text-[12px]">/ 999,999</p>
    </div>
  );
}

function Box() {
  return (
    <div className="basis-0 bg-white grow h-[110px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <Label2 />
          <Text />
        </div>
      </div>
    </div>
  );
}

function HelpIcon1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_68_11970)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_11970">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">클릭 인원</p>
      <HelpIcon1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-center text-nowrap">999,998 명</p>
    </div>
  );
}

function Box1() {
  return (
    <div className="basis-0 bg-white grow h-[110px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <Label3 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function HelpIcon2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_68_11970)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_11970">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">클릭률(CTR)</p>
      <HelpIcon2 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-center text-nowrap">99%</p>
    </div>
  );
}

function Box2() {
  return (
    <div className="basis-0 bg-white grow h-[110px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <Label4 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="1">
      <Box />
      <Box1 />
      <Box2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap">DM 성과</p>
      <Component />
    </div>
  );
}

function HelpIcon3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_68_11970)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_11970">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">팔로우 전환 인원</p>
      <HelpIcon3 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-center text-nowrap">999,998 명</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="text">
      <Text3 />
    </div>
  );
}

function Box3() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative size-full">
          <Label5 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function HelpIcon4() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_68_11970)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_11970">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">팔로우 전환율</p>
      <HelpIcon4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-center text-nowrap">99%</p>
    </div>
  );
}

function Box4() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative size-full">
          <Label6 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function HelpIcon5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="helpIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_68_11970)" id="helpIcon">
          <path d={svgPaths.p3feba300} fill="var(--fill-0, #BBBBBB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_11970">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#707070] text-[12px] text-nowrap">팔로우 전환율</p>
      <HelpIcon5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="text">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#242424] text-[16px] text-center text-nowrap">99%</p>
    </div>
  );
}

function Box5() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px opacity-0 relative rounded-[4px] shrink-0" data-name="box">
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative w-full">
          <Label7 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[110px] items-center relative shrink-0 w-full">
      <Box3 />
      <Box4 />
      <Box5 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap">팔로우 성과</p>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[20px] text-nowrap">
        <p className="leading-[28px]">버튼별 성과</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">No</p>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="HeaderCell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <Text7 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">버튼명</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="h-full relative shrink-0 w-[120px]" data-name="HeaderCell">
      <div className="content-stretch flex items-center justify-between overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <Text8 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">URL</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="h-full relative shrink-0 w-[130px]" data-name="HeaderCell">
      <div className="content-stretch flex items-center justify-between overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <Text9 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">클릭 인원</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
          <Text10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">총 클릭 횟수</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
          <Text11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="text">
      <p className="basis-0 font-['Pretendard:Medium',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#424242] text-[14px] text-nowrap">클릭률(CTR)</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="HeaderCell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] py-0 relative size-full">
          <Text12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ListStudioHeader() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="List_Studio_Header">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <HeaderCell />
        <HeaderCell1 />
        <HeaderCell2 />
        <HeaderCell3 />
        <HeaderCell4 />
        <HeaderCell5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[60px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">1</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell1() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[120px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">이벤트 참여하기</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell2() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[130px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[#424242] text-[12px]">https://brand.com/event</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell3() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">999</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell4() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">100.0%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ListStudioRows() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="List_Studio_Rows">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <DataTableCell />
        <DataTableCell1 />
        <DataTableCell2 />
        {[...Array(2).keys()].map((_, i) => (
          <DataTableCell3 key={i} />
        ))}
        <DataTableCell4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell5() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[60px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">2</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell6() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[120px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">이벤트 참여하기</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell7() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[130px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[#424242] text-[12px]">https://brand.com/event</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell8() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">999</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell9() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">100.0%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ListStudioRows1() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="List_Studio_Rows">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <DataTableCell5 />
        <DataTableCell6 />
        <DataTableCell7 />
        {[...Array(2).keys()].map((_, i) => (
          <DataTableCell8 key={i} />
        ))}
        <DataTableCell9 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell10() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[60px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">3</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell11() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[120px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">이벤트 참여하기</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell12() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[130px]" data-name="Data Table Cell">
      <div className="content-stretch flex items-center overflow-clip px-[10px] py-0 relative rounded-[inherit] size-full">
        <p className="basis-0 font-['Pretendard:Regular',sans-serif] grow leading-[18px] min-h-px min-w-px not-italic relative shrink-0 text-[#424242] text-[12px]">https://brand.com/event</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell13() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">999</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DataTableCell14() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0" data-name="Data Table Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] py-0 relative size-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#424242] text-[14px] text-nowrap">100.0%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ListStudioRows2() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="List_Studio_Rows">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <DataTableCell10 />
        <DataTableCell11 />
        <DataTableCell12 />
        {[...Array(2).keys()].map((_, i) => (
          <DataTableCell13 key={i} />
        ))}
        <DataTableCell14 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Table() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <ListStudioHeader />
        <ListStudioRows />
        <ListStudioRows1 />
        <ListStudioRows2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Table />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-start px-[32px] py-0 relative size-full">
          <Frame3 />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

export default function List() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[40px] items-center relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="list">
      <Frame6 />
      <Frame />
    </div>
  );
}