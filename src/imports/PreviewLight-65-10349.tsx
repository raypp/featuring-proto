import svgPaths from "./svg-8h2cqnjn84";
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

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[130px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[14px] text-black tracking-[0.28px] w-full">sojumanjan</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Chevron />
      <Avatar />
      <Frame5 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Frame6 />
        </div>
      </div>
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

function SecondaryButton() {
  return (
    <div className="bg-[#ebebeb] content-stretch flex h-[32px] items-center justify-center px-[12px] py-0 relative rounded-[8px] shrink-0 w-[128px]" data-name="secondaryButton">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">사용자 설정 버튼명</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SecondaryButton />
    </div>
  );
}

function MessageBubble() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] shrink-0" data-name="Message Bubble">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1f2024] text-[14px] text-nowrap">팔로우 확인 메시지</p>
      <Frame9 />
    </div>
  );
}

function Comment() {
  return (
    <div className="content-stretch flex gap-[8px] items-start p-[14px] relative shrink-0 w-[373px]" data-name="Comment">
      <AvatarsWithStory />
      <MessageBubble />
    </div>
  );
}

function MessageBubble1() {
  return (
    <div className="bg-[#dce2ff] content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[12px] relative rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] shrink-0" data-name="Message Bubble">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1f2024] text-[14px] text-nowrap">{`{사용자 설정 버튼명}`}</p>
    </div>
  );
}

function Comment1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end p-[14px] relative shrink-0 w-[373px]" data-name="Comment">
      <MessageBubble1 />
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

function SecondaryButton1() {
  return (
    <div className="bg-[#ebebeb] content-stretch flex h-[32px] items-center justify-center px-[12px] py-0 relative rounded-[8px] shrink-0 w-[128px]" data-name="secondaryButton">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">사용자 설정 버튼명</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SecondaryButton1 />
    </div>
  );
}

function MessageBubble2() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] shrink-0" data-name="Message Bubble">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1f2024] text-[14px] text-nowrap">팔로우 미확인 메시지</p>
      <Frame10 />
    </div>
  );
}

function Comment2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start p-[14px] relative shrink-0 w-[373px]" data-name="Comment">
      <AvatarsWithStory1 />
      <MessageBubble2 />
    </div>
  );
}

function Avatar3() {
  return (
    <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
    </div>
  );
}

function AvatarsWithStory2() {
  return (
    <div className="relative rounded-[106.25px] shrink-0 size-[34px]" data-name="Avatars with story">
      <Avatar3 />
    </div>
  );
}

function SecondaryButton2() {
  return (
    <div className="bg-[#ebebeb] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="secondaryButton">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-0 relative size-full">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[14px] text-center text-nowrap">사용자 설정 버튼명</p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      {[...Array(3).keys()].map((_, i) => (
        <SecondaryButton2 key={i} />
      ))}
    </div>
  );
}

function MessageBubble3() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] shrink-0" data-name="Message Bubble">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1f2024] text-[14px] text-nowrap">메시지를 입력해 주세요.</p>
      <Frame8 />
    </div>
  );
}

function Comment3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start p-[14px] relative shrink-0 w-[373px]" data-name="Comment">
      <AvatarsWithStory2 />
      <MessageBubble3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow items-center min-h-px min-w-px overflow-clip relative shrink-0 w-full">
      <Comment />
      <Comment1 />
      <Comment2 />
      <Comment1 />
      <Comment3 />
    </div>
  );
}

function InstagramPost() {
  return (
    <div className="content-stretch flex flex-col h-[755px] items-start overflow-clip p-[10px] relative shrink-0 w-[393px]" data-name="Instagram Post">
      <Frame2 />
      <Frame4 />
      <Frame7 />
    </div>
  );
}

export default function PreviewLight() {
  return (
    <div className="relative rounded-[56px] size-full" data-name="Preview-light">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <InstagramPost />
      </div>
      <div aria-hidden="true" className="absolute border-[#f6f6f6] border-[10px] border-solid inset-0 pointer-events-none rounded-[56px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_8px_16px_0px_rgba(0,0,0,0.14)]" />
    </div>
  );
}