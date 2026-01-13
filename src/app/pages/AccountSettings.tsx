interface AccountSettingsProps {
  onLogout?: () => void;
}

export function AccountSettings({ onLogout }: AccountSettingsProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // Handle account deletion
      alert('회원탈퇴가 처리되었습니다.');
    }
  };

  return (
    <div className="max-w-[1136px]">
      {/* Main Card */}
      <div className="bg-white rounded border border-[#f0f0f0]">
        <div className="h-[56px] border-b border-[#f0f0f0] px-8 flex items-center">
          <h2 className="font-['Pretendard:Medium',sans-serif] text-[14px] text-[#31363a]">계정 설정</h2>
        </div>

        <div className="px-8 pb-5 space-y-5">
          {/* Profile Image Section */}
          <div className="flex gap-10 items-center border-b border-[#f0f0f0] py-5">
            <div className="w-[160px] shrink-0">
              <p className="font-['Pretendard:Regular',sans-serif] text-[14px] text-[#242424]">프로필 이미지</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="relative shrink-0 size-[84px]">
                <div className="absolute bg-[#d8e6fe] content-stretch flex flex-col inset-0 items-center justify-center rounded-full">
                  <p className="font-['Pretendard:Medium',sans-serif] text-[32px] leading-[40px] text-[#246ee1]">M</p>
                </div>
                <div className="absolute border border-[#f0f0f0] border-solid inset-0 rounded-full" />
              </div>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="flex gap-10 items-start border-b border-[#f0f0f0] pb-5">
            <div className="w-[160px] shrink-0">
              <p className="font-['Pretendard:Regular',sans-serif] text-[14px] text-[#242424]">계정 정보</p>
            </div>
            <div className="flex-1 max-w-[420px]">
              <div className="space-y-1.5">
                <label className="font-['Pretendard:Medium',sans-serif] text-[12px] text-[#959595] block">
                  이메일
                </label>
                <input
                  type="text"
                  value="email@website.com"
                  disabled
                  className="w-full h-[32px] px-2.5 bg-[#ebebeb] border border-[#d2d2d2] rounded text-[14px] text-[#959595] font-['Pretendard:Regular',sans-serif]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="h-[40px] px-4 bg-white border border-[#e0e0e0] rounded text-[14px] font-['Pretendard:Medium',sans-serif] text-[#242424] hover:bg-gray-50 transition-colors"
            >
              로그아웃
            </button>
            <button
              onClick={handleDeleteAccount}
              className="h-[40px] px-4 bg-white border border-[#e34f2f] rounded text-[14px] font-['Pretendard:Medium',sans-serif] text-[#e34f2f] hover:bg-red-50 transition-colors"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}