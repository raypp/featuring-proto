import { CoreTag } from "@/design-system";

interface ServiceSelectorProps {
  onSelectService: (service: "studio" | "response") => void;
}

export function ServiceSelector({ onSelectService }: ServiceSelectorProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[var(--ft-bg-secondary)]">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-[32px] font-bold text-[var(--ft-text-primary)] mb-2">
            피처링 서비스 선택
          </h1>
          <p className="text-base text-[var(--ft-text-secondary)]">
            테스트할 서비스를 선택해주세요
          </p>
        </div>

        <div className="flex gap-6">
          {/* 피처링 스튜디오 (B2C) */}
          <button
            onClick={() => onSelectService("studio")}
            className="group relative bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-2xl)] p-8 w-[320px] h-[400px] border-2 border-[var(--ft-border-primary)] hover:border-[var(--ft-color-primary-500)] hover:shadow-[var(--ft-shadow-lg)] transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center h-full">
              <div className="w-20 h-20 bg-[var(--ft-color-primary-50)] rounded-[var(--ft-radius-2xl)] flex items-center justify-center mb-6 group-hover:bg-[var(--ft-color-primary-100)] transition-colors">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--ft-color-primary-500)"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--ft-text-primary)] mb-2">
                피처링 스튜디오
              </h2>
              <CoreTag colorType="lightGreen" size="sm" className="mb-4">
                B2C 서비스
              </CoreTag>
              <p className="text-sm text-[var(--ft-text-secondary)] text-center leading-relaxed flex-1">
                인플루언서를 위한 자동 DM 발송 서비스
                <br />
                <br />
                • 게시물/릴스 선택
                <br />
                • 댓글 트리거 설정
                <br />
                • 자동화 템플릿 관리
                <br />
                • 인사이트 대시보드
              </p>
            </div>
          </button>

          {/* 피처링 서비스 (B2B) */}
          <button
            onClick={() => onSelectService("response")}
            className="group relative bg-[var(--ft-bg-primary)] rounded-[var(--ft-radius-2xl)] p-8 w-[320px] h-[400px] border-2 border-[var(--ft-border-primary)] hover:border-[var(--ft-color-orange-500)] hover:shadow-[var(--ft-shadow-lg)] transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center h-full">
              <div className="w-20 h-20 bg-[var(--ft-color-orange-50)] rounded-[var(--ft-radius-2xl)] flex items-center justify-center mb-6 group-hover:bg-[var(--ft-color-orange-100)] transition-colors">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--ft-color-orange-500)"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--ft-text-primary)] mb-2">
                피처링 서비스
              </h2>
              <CoreTag colorType="orange" size="sm" className="mb-4">
                B2B 서비스
              </CoreTag>
              <p className="text-sm text-[var(--ft-text-secondary)] text-center leading-relaxed flex-1">
                브랜드를 위한 반응 자동화 관리
                <br />
                <br />
                • 그룹 관리
                <br />
                • 템플릿 생성/편집
                <br />
                • 인플루언서 선택
                <br />
                • 템플릿 전달 (API/링크)
              </p>
            </div>
          </button>
        </div>

        <p className="text-xs text-[var(--ft-text-disabled)] text-center">
          서비스를 선택하면 해당 서비스로 이동합니다
        </p>
      </div>
    </div>
  );
}
