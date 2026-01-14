# Featuring Studio (B2B Service)

인플루언서 마케팅 자동화 및 캠페인 관리를 위한 B2B SaaS 대시보드 애플리케이션입니다.

## 🚀 주요 기능

### 1. 📊 대시보드 (Dashboard)
- 캠페인 및 반응 자동화 그룹의 현황을 한눈에 파악
- 주요 성과 지표(KPI) 요약 표시

### 2. 🎯 캠페인 관리 (Campaign Management)
- **캠페인 현황**: 진행 중인 캠페인 리스트 및 상태 관리
- **상세 정보**: 캠페인 기본 정보, 참여 인플루언서, 콘텐츠, 성과 리포트 탭 구성
- **반응 자동화 연동**: 캠페인 내에서 직접 반응 자동화 기능 추가 및 관리

### 3. ⚡️ 반응 자동화 (Reaction Automation)
- **템플릿 관리**: 댓글/DM 트리거 및 응답 메시지 시나리오 설정
- **가이드 전달**: 선택한 인플루언서에게 DM 발송 가이드 일괄 전달
- **성과 분석**: 발송 수, 클릭 수, CPV 등 실시간 성과 추적
- **시각적 편집**: iPhone 스타일의 실시간 미리보기 제공

### 4. 🎨 UI/UX 디자인
- **GNB 커스터마이징**: 업무 집중도를 위한 메뉴 최적화 (대시보드/캠페인/자동화 중심)
- **Design System**: 일관된 컴포넌트(Button, Avatar, Badge 등) 사용
- **Responsive**: 다양한 해상도에 대응하는 유연한 레이아웃

## 🛠 기술 스택

- **Framework**: React, Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📂 프로젝트 구조

```
src/
├── featuring/
│   ├── components/    # 공통 컴포넌트 (Layout, Design System)
│   ├── pages/         # 주요 페이지 (Dashboard, Campaign, Automation)
│   ├── types/         # TypeScript 타입 정의
│   └── App.tsx        # 메인 애플리케이션 진입점
```

## 📝 최근 업데이트

### 2026-01-14: B2C Dyson 캠페인 자동화 (Track A)
- **브랜드 협업 초대 화면**: 인플루언서가 브랜드 제안을 수락/거절할 수 있는 UI
- **캠페인 페이지 개편**: 제안 섹션 + 자동화 목록 테이블 구조
- **GNB 알림**: 새 제안 도착 시 캠페인 메뉴에 빨간 dot 표시
- **잠긴 CTA 링크**: 브랜드가 잠근 링크는 🔒 아이콘 + 수정 시 흔들림 애니메이션
- **브랜드 메시지 아코디언**: 템플릿 편집기 상단에 브랜드 가이드 표시
- **상태 동기화**: pending → accepted → active → 성과 데이터 표시

### 이전 업데이트
- 반응 자동화 UI를 캠페인 관리 탭과 통합
- 인플루언서 가이드 전달 기능 구현
- GNB 메뉴 단순화 및 비활성화 처리
