import svgPaths from "./svg-xwcq5ttjt7";
import img01 from "figma:asset/be5a7d3144eb9b58e53ad29e4aac3e7185ef8b52.png";
import img2 from "figma:asset/16d57e9738634d3bff4c18e5c734e6a8be9f155e.png";
import imgAvatar from "figma:asset/7cb7b7285bfece7ae53941ce9ab2fa3832458226.png";

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

function Post() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[393px]" data-name="Post">
      <div className="absolute inset-[0_0_-0.5%_0]" data-name="01">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img01} />
      </div>
    </div>
  );
}

function Post1() {
  return <div className="absolute bg-[#ff5210] inset-0" data-name="Post" />;
}

function Component() {
  return <div className="h-0 w-full" data-name="-" />;
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative w-full" data-name="-">
      <div className="flex h-[162.787px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.47deg] w-full">
          <Component />
        </div>
      </div>
    </div>
  );
}

function Post2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[393px]" data-name="Post">
      <Post1 />
      <div className="flex h-[393.001px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[315deg] w-full">
          <Component1 />
        </div>
      </div>
      <div className="absolute inset-[0_0_-0.5%_0]" data-name="01">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
      </div>
    </div>
  );
}

function PostsCarouselChangeThis() {
  return (
    <div className="content-stretch flex gap-px items-center overflow-clip relative shrink-0 w-[393px]" data-name="Posts Carousel – CHANGE THIS">
      <Post />
      {[...Array(11).keys()].map((_, i) => (
        <Post2 key={i} />
      ))}
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
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="Like">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Like">
          <path d={svgPaths.p2720dd00} fill="var(--fill-0, #FF0034)" id="Like_2" />
        </g>
      </svg>
    </div>
  );
}

function Like2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Like">
      <Like />
      <Like1 />
    </div>
  );
}

function Like3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Like">
      <Like2 />
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0c1014] text-[12px] text-nowrap tracking-[0.24px]">1,139</p>
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
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0c1014] text-[12px] text-nowrap tracking-[0.24px]">58</p>
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
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0c1014] text-[12px] text-nowrap tracking-[0.24px]">7</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Actions">
      <Like3 />
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

function Frame13() {
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
      <p className="basis-0 font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0">현재 게시물에서 시작합니다.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 text-[14px] tracking-[-0.28px] w-full" data-name="Frame">
      <Frame4 />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal overflow-ellipsis overflow-hidden relative shrink-0 text-black text-nowrap w-full">게시물 본문 두 줄까지 넘어가면 ... 처리 부탁드립니다...</p>
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

function Frame14() {
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
      <Frame13 />
      <Frame14 />
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

function Overlay() {
  return <div className="absolute bg-[rgba(0,0,0,0.4)] h-[755px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[393px]" data-name="overlay" />;
}

function Component24Share1() {
  return (
    <div className="absolute right-[20px] size-[30px] top-[25px]" data-name="24 / Share">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="24 / Share">
          <path clipRule="evenodd" d={svgPaths.p35f14740} fill="var(--fill-0, #0C1014)" fillRule="evenodd" id="Share" />
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[70px] relative shrink-0 w-[374px]" data-name="header">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Component24Share1 />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[1.3] left-1/2 not-italic text-[16px] text-black text-center text-nowrap top-[35px] tracking-[0.32px] translate-x-[-50%]">댓글</p>
      <div className="absolute bg-black h-[5px] left-1/2 opacity-10 rounded-[100px] top-[17px] translate-x-[-50%] w-[34px]" data-name="Home Indicator" />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
    </div>
  );
}

function AvatarsWithStory() {
  return (
    <div className="relative rounded-[106.25px] shrink-0 size-[34px]" data-name="Avatars with story">
      <Avatar1 />
    </div>
  );
}

function UserNameAndTime() {
  return (
    <div className="content-stretch flex gap-[8px] items-center not-italic relative shrink-0 text-[12px] text-nowrap" data-name="User name and time">
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-none relative shrink-0 text-[#030303] tracking-[-0.2011px]">Username</p>
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.25] relative shrink-0 text-[#727272]">20초 전</p>
    </div>
  );
}

function ViewReplies() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="View replies">
      <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#727272] text-[12px] text-nowrap tracking-[-0.2011px]">답글</p>
    </div>
  );
}

function UserAndComment() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[5px] grow items-start min-h-px min-w-px relative shrink-0" data-name="User and comment">
      <UserNameAndTime />
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#030303] text-[13px] w-[min-content]">공동구매 🙌</p>
      <ViewReplies />
    </div>
  );
}

function UserAndContent() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-start min-h-px min-w-px relative shrink-0" data-name="User and content">
      <AvatarsWithStory />
      <UserAndComment />
    </div>
  );
}

function Liked() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Liked">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Liked">
          <path d={svgPaths.p34977600} id="vector" stroke="var(--stroke-0, #747474)" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Like4() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center px-[6px] py-[9px] relative shrink-0" data-name="Like">
      <Liked />
    </div>
  );
}

function Comment1() {
  return (
    <div className="content-stretch flex gap-[9px] items-center p-[14px] relative shrink-0 w-[374px]" data-name="Comment">
      <UserAndContent />
      <Like4 />
    </div>
  );
}

function Avatar2() {
  return (
    <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
    </div>
  );
}

function AvatarsWithStory1() {
  return (
    <div className="relative rounded-[106.25px] shrink-0 size-[34px]" data-name="Avatars with story">
      <Avatar2 />
    </div>
  );
}

function UserNameAndTime1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center not-italic relative shrink-0 text-[12px] text-nowrap" data-name="User name and time">
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-none relative shrink-0 text-[#030303] tracking-[-0.2011px]">sojumanjan</p>
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.25] relative shrink-0 text-[#727272]">20초 전</p>
    </div>
  );
}

function ViewReplies1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="View replies">
      <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#727272] text-[12px] text-nowrap tracking-[-0.2011px]">답글</p>
    </div>
  );
}

function UserAndComment1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[5px] grow items-start min-h-px min-w-px relative shrink-0" data-name="User and comment">
      <UserNameAndTime1 />
      <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[#030303] text-[13px] w-[min-content]">안녕하세요! DM을 확인해주세요. 😊 메시지가 오지 않는다면 요청함을 확인해 주세요.</p>
      <ViewReplies1 />
    </div>
  );
}

function UserAndContent1() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-start min-h-px min-w-px relative shrink-0" data-name="User and content">
      <AvatarsWithStory1 />
      <UserAndComment1 />
    </div>
  );
}

function Liked1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Liked">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Liked">
          <path d={svgPaths.p34977600} id="vector" stroke="var(--stroke-0, #747474)" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Like5() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-center px-[6px] py-[9px] relative shrink-0" data-name="Like">
      <Liked1 />
    </div>
  );
}

function Comment2() {
  return (
    <div className="content-stretch flex gap-[9px] items-center pl-[52px] pr-[14px] py-[12px] relative shrink-0 w-[374px]" data-name="Comment">
      <UserAndContent1 />
      <Like5 />
    </div>
  );
}

function Comment3() {
  return (
    <div className="absolute bg-white bottom-[10px] content-stretch flex flex-col h-[519px] items-start left-[10px] overflow-clip right-[10px] rounded-[34px]" data-name="comment">
      <Header />
      <Comment1 />
      <Comment2 />
    </div>
  );
}

export default function PreviewLight() {
  return (
    <div className="relative rounded-[56px] size-full" data-name="Preview-light">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <InstagramPost />
        <Overlay />
        <Comment3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f6f6f6] border-[10px] border-solid inset-0 pointer-events-none rounded-[56px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_8px_16px_0px_rgba(0,0,0,0.14)]" />
    </div>
  );
}