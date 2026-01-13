import { useState } from "react";
import svgPaths from "../../imports/svg-p2bq6o1ygk";
import imgFrame1321317296 from "figma:asset/9c1dc32f1bed80eb365315ad0977a42f915aac3a.png";
import imgFrame1321317297 from "figma:asset/5ef9d279b5e2badbafd2849fe40879ee965a0bbf.png";
import imgFrame1321317298 from "figma:asset/be5a7d3144eb9b58e53ad29e4aac3e7185ef8b52.png";
import imgFrame1321317299 from "figma:asset/f669df8435e17079a5224694fba9ea68749c5e68.png";
import imgFrame1321317300 from "figma:asset/22a689cc5d3709ad7c47acafd42f0b3be98f5ebc.png";

interface Post {
  id: string;
  image: string;
  caption: string;
  date: string;
}

interface PostSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (post: Post) => void;
  /** 다른 자동화에서 이미 사용 중인 게시물 ID 목록 (중복 설정 방지) */
  usedPostIds?: string[];
}

const mockPosts: Post[] = [
  {
    id: "1",
    image: imgFrame1321317296,
    caption: "게시물 본문 한 줄까지 넘어가면 ... 처리 부탁드립니다...",
    date: "12월 31일",
  },
  {
    id: "2",
    image: imgFrame1321317297,
    caption: "게시물 본문 한 줄까지 넘어가면 ... 처리 부탁드립니다...",
    date: "12월 31일",
  },
  {
    id: "3",
    image: imgFrame1321317298,
    caption: "게시물 본문 한 줄까지 넘어가면 ... 처리 부탁드립니다...",
    date: "12월 31일",
  },
  {
    id: "4",
    image: imgFrame1321317296,
    caption: "게시물 본문 한 줄까지 넘어가면 ... 처리 부탁드립니다...",
    date: "12월 31일",
  },
  {
    id: "5",
    image: imgFrame1321317299,
    caption: "게시물 본문 한 줄까지 넘어가면 ... 처리 부탁드립니다...",
    date: "12월 31일",
  },
  {
    id: "6",
    image: imgFrame1321317300,
    caption: "게시물 본문 한 줄까지 넘어가면 ... 처리 부탁드립니다...",
    date: "12월 31일",
  },
];

export function PostSelectionModal({ isOpen, onClose, onSelect, usedPostIds = [] }: PostSelectionModalProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [usedPostWarning, setUsedPostWarning] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePostClick = (post: Post) => {
    // 이미 다른 자동화에서 사용 중인 게시물인지 확인
    if (usedPostIds.includes(post.id)) {
      setUsedPostWarning(post.id);
      // 3초 후 경고 메시지 자동 숨김
      setTimeout(() => setUsedPostWarning(null), 3000);
      return;
    }

    setSelectedPostId(post.id);
    onSelect(post);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white flex flex-col gap-3 overflow-clip px-0 py-6 rounded shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_4px_8px_0px_rgba(0,0,0,0.14)] w-[680px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full px-6">
          <div className="flex gap-4 items-start">
            <div className="flex-1 flex flex-col gap-1">
              <p className="font-['Pretendard:Medium',sans-serif] text-xl text-[#242424] leading-7">게시물 또는 릴스를 선택해 주세요.</p>
            </div>
            <button onClick={onClose} className="shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p2c391500} fill="#242424" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#f6f6f6] flex flex-col gap-5 p-6 overflow-y-auto">
          {/* First Row */}
          <div className="flex gap-4">
            {mockPosts.slice(0, 3).map((post) => {
              const isUsed = usedPostIds.includes(post.id);
              const showWarning = usedPostWarning === post.id;

              return (
                <div key={post.id} className="relative flex-1">
                  <button
                    onClick={() => handlePostClick(post)}
                    className={`w-full rounded border overflow-hidden transition-colors ${isUsed
                        ? 'bg-[#f5f5f5] border-[#e0e0e0] cursor-not-allowed opacity-60'
                        : 'bg-white border-[#f0f0f0] hover:border-[#7273ff]'
                      }`}
                  >
                    <div className="flex flex-col relative">
                      <div className="h-[228px] w-full overflow-hidden relative">
                        <img alt="" className={`w-full h-full object-cover ${isUsed ? 'grayscale' : ''}`} src={post.image} />
                        {isUsed && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-white/90 px-3 py-1.5 rounded-full">
                              <p className="font-['Pretendard:Medium',sans-serif] text-xs text-[#707070]">사용 중</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 p-2.5">
                        <p className={`font-['Pretendard:Regular',sans-serif] text-sm leading-[22px] truncate text-left ${isUsed ? 'text-[#959595]' : 'text-black'}`}>{post.caption}</p>
                        <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#737373] leading-[18px] text-left">{post.date}</p>
                      </div>
                    </div>
                  </button>
                  {/* Warning Tooltip */}
                  {showWarning && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#424242] text-white px-3 py-2 rounded shadow-lg z-10 whitespace-nowrap">
                      <p className="font-['Pretendard:Regular',sans-serif] text-xs">이미 다른 자동화에서 사용 중인 게시물입니다.</p>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#424242] rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Second Row */}
          <div className="flex gap-4">
            {mockPosts.slice(3, 6).map((post) => {
              const isUsed = usedPostIds.includes(post.id);
              const showWarning = usedPostWarning === post.id;

              return (
                <div key={post.id} className="relative flex-1">
                  <button
                    onClick={() => handlePostClick(post)}
                    className={`w-full rounded border overflow-hidden transition-colors ${isUsed
                        ? 'bg-[#f5f5f5] border-[#e0e0e0] cursor-not-allowed opacity-60'
                        : 'bg-white border-[#f0f0f0] hover:border-[#7273ff]'
                      }`}
                  >
                    <div className="flex flex-col relative">
                      <div className="h-[228px] w-full overflow-hidden relative">
                        <img alt="" className={`w-full h-full object-cover ${isUsed ? 'grayscale' : ''}`} src={post.image} />
                        {isUsed && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-white/90 px-3 py-1.5 rounded-full">
                              <p className="font-['Pretendard:Medium',sans-serif] text-xs text-[#707070]">사용 중</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 p-2.5">
                        <p className={`font-['Pretendard:Regular',sans-serif] text-sm leading-[22px] truncate text-left ${isUsed ? 'text-[#959595]' : 'text-black'}`}>{post.caption}</p>
                        <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#737373] leading-[18px] text-left">{post.date}</p>
                      </div>
                    </div>
                  </button>
                  {/* Warning Tooltip */}
                  {showWarning && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#424242] text-white px-3 py-2 rounded shadow-lg z-10 whitespace-nowrap">
                      <p className="font-['Pretendard:Regular',sans-serif] text-xs">이미 다른 자동화에서 사용 중인 게시물입니다.</p>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#424242] rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 px-6">
          <button
            onClick={onClose}
            className="bg-white border border-[#e0e0e0] h-8 px-3 rounded hover:bg-gray-50 transition-colors"
          >
            <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424] leading-[22px]">닫기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
