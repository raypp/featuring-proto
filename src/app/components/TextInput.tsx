interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function TextInput({ value, onChange, placeholder = '', maxLength = 50 }: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange(newValue);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative w-full" data-name="textInput">
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="inputContainer (TI)">
        <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="h-[32px] relative shrink-0 w-full" data-name="field">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[10px] py-0 relative size-full">
              <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="textFrame (TI)">
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full font-['Pretendard:Regular',sans-serif] text-[#242424] text-[14px] leading-[22px] bg-transparent border-none focus:outline-none placeholder:text-[#bbb]"
                />
              </div>
              {maxLength && (
                <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] text-nowrap text-right">
                  <p className="leading-[18px]">{value.length}/{maxLength}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
