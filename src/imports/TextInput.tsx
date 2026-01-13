function TextFrameTi() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] text-nowrap">
        <p className="leading-[22px]">2024-11-20</p>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="field">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[10px] py-0 relative size-full">
          <TextFrameTi />
          <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap text-right">
            <p className="leading-[18px]">10/50</p>
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

export default function TextInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="textInput">
      <VariantsTi />
    </div>
  );
}