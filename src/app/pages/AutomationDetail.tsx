import { useState, useRef, useEffect } from "react";
import { HelpCircle, ChevronLeft, ChevronDown, Pencil, House } from "lucide-react";
import svgPaths from "../../imports/svg-o2n0c155mj";
import svgPaths2 from "../../imports/svg-jeb3ed0e9f";
import svgPaths3 from "../../imports/svg-05k7z0zl5r";
import svgPaths4 from "../../imports/svg-afliq0rj04";
import svgPathsComment from "../../imports/svg-xwcq5ttjt7";
import svgPathsHelp from "../../imports/svg-0pmyx9ha2b";
import { PostSelectionModal } from "../components/PostSelectionModal";
import { TextInput } from "../components/TextInput";
import imgAvatar from "figma:asset/7cb7b7285bfece7ae53941ce9ab2fa3832458226.png";

export interface Automation {
  id?: number;
  title: string;
  status: 'draft' | 'running' | 'stopped';
  trigger: {
    type: 'specific' | 'any';
    postIds: string[];
    matchType: 'keywords' | 'any';
    keywords: string[];
  };
  publicReply: {
    isActive: boolean;
    texts: string[];
  };
  privateDm: {
    text: string;
    buttons: Array<{
      text: string;
      url: string;
    }>;
    hasImage: boolean;
    imageUrl?: string;
    followCheck: {
      isActive: boolean;
      nonFollowerMessage: string;
      followerMessage: string;
    };
  };
  thumbnail?: string;
  executions?: number;
  ctr?: string;
  lastModified?: string;
  // Campaign Hub fields
  type?: 'personal' | 'campaign';
  campaignId?: number;
  isLocked?: boolean;
}

interface ValidationErrors {
  post?: string;
  keywords?: string;
  dmMessage?: string;
  followCheck?: string;
}

interface AutomationDetailProps {
  initialData?: Automation;
  onBack: () => void;
  onSave: (automation: Automation) => void;
  onDelete?: (id: number) => void;
  /** 다른 자동화에서 이미 사용 중인 게시물 ID 목록 (중복 설정 방지) */
  usedPostIds?: string[];
}

export function AutomationDetail({ initialData, onBack, onSave, onDelete, usedPostIds = [] }: AutomationDetailProps) {
  // Form state
  const [automationName, setAutomationName] = useState<string>(initialData?.title || '자동화 명 2025-12-31');
  // selectedPost는 항상 'specific'으로 고정 (특정 게시물 또는 릴스만 지원)
  const selectedPost = 'specific';
  const [selectedComment, setSelectedComment] = useState<string>(
    initialData?.trigger.matchType === 'any' ? 'all' : 'keyword'
  );
  const [keywords, setKeywords] = useState<string[]>(initialData?.trigger.keywords || []);
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'post' | 'comment' | 'dm'>('post');
  // 한 번이라도 실행한 자동화(status !== 'draft')인 경우 인사이트 탭을 기본으로 표시
  const [rightPanelTab, setRightPanelTab] = useState<'preview' | 'insights'>(
    initialData?.status !== 'draft' ? 'insights' : 'preview'
  );
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState<{
    id: string;
    image: string;
    caption: string;
    date: string;
  } | null>(() => {
    // initialData에서 thumbnail과 postIds를 기반으로 selectedPostData 초기화
    if (initialData?.thumbnail && initialData?.trigger.postIds.length > 0) {
      return {
        id: initialData.trigger.postIds[0],
        image: initialData.thumbnail,
        caption: "게시물을 선택해 주세요.",
        date: "12월 31일"
      };
    }
    return null;
  });
  const [publicReplyEnabled, setPublicReplyEnabled] = useState(initialData?.publicReply.isActive || false);
  const [publicReplies, setPublicReplies] = useState<string[]>(
    initialData?.publicReply.texts.length ? initialData.publicReply.texts : [
      '안녕하세요! DM을 확인해주세요. 😊 메시지가 오지 않는다면 요청함을 확인해 주세요.',
      '참여해주셔서 감사합니다!',
      '만나서 반가워요. 지금 바로 DM 보내드릴게요!'
    ]
  );
  const [dmMessage, setDmMessage] = useState(initialData?.privateDm.text || '감사합니다.\n요청하신 자료 보내드립니다.\n아래 버튼을 클릭하면 바로 확인 가능합니다!');
  const [dmButtons, setDmButtons] = useState<Array<{ text: string, url: string }>>(
    initialData?.privateDm.buttons.length ? initialData.privateDm.buttons : [
      { text: '여기를 클릭하세요!', url: 'https://example.com' },
      { text: '자료 내놔', url: 'https://example.com' },
      { text: '좀 보자', url: 'https://example.com' }
    ]
  );
  const [followCheckEnabled, setFollowCheckEnabled] = useState(initialData?.privateDm.followCheck.isActive || false);
  const [followCheckMessage, setFollowCheckMessage] = useState(
    initialData?.privateDm.followCheck.followerMessage || '안녕하세요! 댓글 확인했습니다.\n팔로우 완료 후 아래 버튼을 눌러 주세요.\n확인 후 요청하신 정보를 보내드립니다!'
  );
  const [followCheckButton, setFollowCheckButton] = useState('팔로우 확인하기 ✅');
  const [nonFollowerMessage, setNonFollowerMessage] = useState(
    initialData?.privateDm.followCheck.nonFollowerMessage || '아직 팔로우가 확인되지 않았어요. 😥 팔로우 상태여야 메시지를 보내드릴 수 있답니다. 팔로우 후 다시 버튼을 눌러주세요!'
  );
  const [nonFollowerButton, setNonFollowerButton] = useState('팔로우 확인하기 ✅');
  const [nonFollowerAccordionOpen, setNonFollowerAccordionOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Status management
  const status = initialData?.status || 'draft';

  // Edit mode management
  // 초안(draft)은 항상 편집 모드, 실행 중/중단됨은 기본적으로 대시보드 모드(읽기 전용)
  const [isEditMode, setIsEditMode] = useState(status === 'draft');

  // Dirty state tracking for unsaved changes
  const [isDirty, setIsDirty] = useState(false);
  const [savedFormData, setSavedFormData] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Modal states
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitModalSource, setExitModalSource] = useState<'page' | 'edit'>('page'); // 이탈 모달 출처 구분
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateNotice, setShowUpdateNotice] = useState(false);

  // Refs
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  // Track form changes for dirty state
  useEffect(() => {
    const currentFormData = JSON.stringify({
      automationName, selectedComment, keywords,
      publicReplyEnabled, publicReplies, dmMessage, dmButtons,
      followCheckEnabled, followCheckMessage, nonFollowerMessage,
      followCheckButton, nonFollowerButton, selectedPostData
    });

    if (savedFormData === '') {
      setSavedFormData(currentFormData);
    } else {
      setIsDirty(currentFormData !== savedFormData);
    }
  }, [automationName, selectedComment, keywords, publicReplyEnabled,
    publicReplies, dmMessage, dmButtons, followCheckEnabled, followCheckMessage,
    nonFollowerMessage, followCheckButton, nonFollowerButton, selectedPostData, savedFormData]);

  const handleStepClick = (step: 1 | 2 | 3) => {
    setActiveStep(step);

    // Update preview tab based on step
    if (step === 1) {
      setCurrentTab('post');
    } else if (step === 2) {
      setCurrentTab('comment');
    } else if (step === 3) {
      setCurrentTab('dm');
    }

    // Scroll to step
    const refs = [step1Ref, step2Ref, step3Ref];
    const targetRef = refs[step - 1];

    if (targetRef.current && leftPanelRef.current) {
      leftPanelRef.current.scrollTo({
        top: targetRef.current.offsetTop - 10,
        behavior: 'smooth'
      });
    }
  };

  const handleKeywordAdd = (keyword: string) => {
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handlePostSelect = (post: { id: string; image: string; caption: string; date: string }) => {
    setSelectedPostData(post);
    setIsPostModalOpen(false);

    // Automatically activate STEP 2
    setActiveStep(2);
    setCurrentTab('comment');

    // Scroll to STEP 2
    setTimeout(() => {
      if (step2Ref.current && leftPanelRef.current) {
        leftPanelRef.current.scrollTo({
          top: step2Ref.current.offsetTop - 10,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const suggestedKeywords = ['가격', '공구', '정보', '링크', '💜'];

  // 인사이트 탭 노출 여부 (초안이 아닌 경우에만 노출)
  const showInsights = initialData?.status !== 'draft';

  // 더미 인사이트 데이터
  const insightsData = {
    reach: 1247,
    totalSent: 1250,
    clicks: 892,
    ctr: 71.5,
    followConversions: 234,
    followConversionRate: 18.8,
    buttonStats: dmButtons.map((btn, index) => ({
      no: index + 1,
      buttonName: btn.text,
      url: btn.url,
      uniqueClicks: Math.floor(Math.random() * 300) + 200,
      totalClicks: Math.floor(Math.random() * 500) + 300,
      ctr: (Math.random() * 30 + 40).toFixed(1)
    }))
  };

  // 필수값 검증 함수
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // 게시물 선택 검증 (필수값 - 항상 게시물을 선택해야 함)
    if (!selectedPostData) {
      newErrors.post = '게시물을 선택해주세요.';
    }

    // 키워드 검증
    if (selectedComment === 'keyword' && keywords.length === 0) {
      newErrors.keywords = '최소 1개 이상의 키워드를 입력해주세요.';
    }

    // DM 본문 검증
    if (!dmMessage.trim()) {
      newErrors.dmMessage = 'DM 메시지를 입력해주세요.';
    }

    // 팔로우 유도 검증
    if (followCheckEnabled) {
      if (!followCheckMessage.trim() || !nonFollowerMessage.trim()) {
        newErrors.followCheck = '팔로워/미팔로워 메시지를 모두 입력해주세요.';
      }
    }

    return newErrors;
  };

  // Automation 객체 빌드 헬퍼
  const buildAutomation = (targetStatus: 'draft' | 'running' | 'stopped'): Automation => {
    return {
      id: initialData?.id,
      title: automationName,
      status: targetStatus,
      trigger: {
        type: 'specific' as const,
        postIds: selectedPostData ? [selectedPostData.id] : [],
        matchType: selectedComment === 'all' ? 'any' : 'keywords',
        keywords: keywords
      },
      publicReply: {
        isActive: publicReplyEnabled,
        texts: publicReplies
      },
      privateDm: {
        text: dmMessage,
        buttons: dmButtons,
        hasImage: false,
        followCheck: {
          isActive: followCheckEnabled,
          nonFollowerMessage: nonFollowerMessage,
          followerMessage: followCheckMessage
        }
      },
      thumbnail: selectedPostData?.image,
      executions: initialData?.executions || 0,
      ctr: initialData?.ctr || '0%',
      lastModified: new Date().toISOString()
    };
  };

  // 실행하기 (초안 → 실행 중, 또는 중단됨 → 실행 중)
  const handleRun = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const automation = buildAutomation('running');
    onSave(automation);

    // dirty 상태 초기화
    const currentFormData = JSON.stringify({
      automationName, selectedComment, keywords,
      publicReplyEnabled, publicReplies, dmMessage, dmButtons,
      followCheckEnabled, followCheckMessage, nonFollowerMessage,
      followCheckButton, nonFollowerButton, selectedPostData
    });
    setSavedFormData(currentFormData);
    setIsDirty(false);
  };

  // 저장하기 (초안 상태에서만 사용 - 밸리데이션 없음)
  const handleSave = () => {
    // 밸리데이션 없이 현재 상태 그대로 저장
    const automation = buildAutomation('draft');
    onSave(automation);

    // dirty 상태 초기화
    const currentFormData = JSON.stringify({
      automationName, selectedComment, keywords,
      publicReplyEnabled, publicReplies, dmMessage, dmButtons,
      followCheckEnabled, followCheckMessage, nonFollowerMessage,
      followCheckButton, nonFollowerButton, selectedPostData
    });
    setSavedFormData(currentFormData);
    setIsDirty(false);
  };

  // 업데이트 (실행 중/중단됨 상태에서 설정값 반영 - 상태 유지)
  const handleUpdate = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // 실행 중 상태면 안내 문구 표시
    if (status === 'running') {
      setShowUpdateNotice(true);
    }

    const automation = buildAutomation(status as 'running' | 'stopped');
    onSave(automation);

    // dirty 상태 초기화
    const currentFormData = JSON.stringify({
      automationName, selectedComment, keywords,
      publicReplyEnabled, publicReplies, dmMessage, dmButtons,
      followCheckEnabled, followCheckMessage, nonFollowerMessage,
      followCheckButton, nonFollowerButton, selectedPostData
    });
    setSavedFormData(currentFormData);
    setIsDirty(false);
  };

  // 중단하기 (실행 중 → 중단됨)
  const handleStop = () => {
    const automation = buildAutomation('stopped');
    onSave(automation);
  };

  // 취소 (페이지 이탈)
  const handleCancel = () => {
    if (isDirty) {
      setExitModalSource('page');
      setShowExitModal(true);
    } else {
      onBack();
    }
  };

  // 이탈 확정
  const confirmExit = () => {
    setShowExitModal(false);
    if (exitModalSource === 'edit') {
      // 편집 모드 취소 → 대시보드 모드로 복귀
      setIsEditMode(false);
      setIsDirty(false);
      // 원본 데이터로 복원 (저장되지 않은 변경 취소)
      if (initialData) {
        setAutomationName(initialData.title);
        // selectedPost는 항상 'specific'으로 고정이므로 복원 불필요
        setSelectedComment(initialData.trigger.matchType === 'any' ? 'all' : 'keyword');
        setKeywords(initialData.trigger.keywords);
        setPublicReplyEnabled(initialData.publicReply.isActive);
        setPublicReplies(initialData.publicReply.texts.length ? initialData.publicReply.texts : [
          '안녕하세요! DM을 확인해주세요. 😊 메시지가 오지 않는다면 요청함을 확인해 주세요.',
          '참여해주셔서 감사합니다!',
          '만나서 반가워요. 지금 바로 DM 보내드릴게요!'
        ]);
        setDmMessage(initialData.privateDm.text);
        setDmButtons(initialData.privateDm.buttons.length ? initialData.privateDm.buttons : [
          { text: '여기를 클릭하세요!', url: 'https://example.com' }
        ]);
        setFollowCheckEnabled(initialData.privateDm.followCheck.isActive);
        setFollowCheckMessage(initialData.privateDm.followCheck.followerMessage);
        setNonFollowerMessage(initialData.privateDm.followCheck.nonFollowerMessage);
        // selectedPostData 복원
        if (initialData.thumbnail && initialData.trigger.postIds.length > 0) {
          setSelectedPostData({
            id: initialData.trigger.postIds[0],
            image: initialData.thumbnail,
            caption: "게시물을 선택해 주세요.",
            date: "12월 31일"
          });
        } else {
          setSelectedPostData(null);
        }
      }
    } else {
      // 페이지 이탈
      onBack();
    }
  };

  // 삭제
  const handleDelete = () => {
    if (initialData?.id && onDelete) {
      onDelete(initialData.id);
    }
    setShowDeleteModal(false);
    onBack();
  };

  const isActivatable = Object.keys(validateForm()).length === 0;


  return (
    <div className="bg-[#fafafa] flex flex-col h-screen w-full">
      {/* Header Title */}
      <div className="bg-white h-[60px] border-b border-[#f0f0f0] shrink-0">
        <div className="flex items-center h-full px-8 justify-between">
          <div className="flex items-center gap-2">
            <button onClick={handleCancel} className="p-1 hover:bg-[#f5f5f5] rounded transition-colors mr-2">
              <ChevronLeft className="w-5 h-5 text-[#707070]" />
            </button>
            <p className="font-['Pretendard:Regular',sans-serif] text-base text-[#242424]">{automationName}</p>
            <button className="p-1 hover:bg-[#f5f5f5] rounded transition-colors">
              <Pencil className="w-4 h-4 text-[#707070]" />
            </button>
            {/* Status Badge */}
            {status === 'draft' && (
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-[#f0f0f0] text-[#707070]">초안</span>
            )}
            {status === 'running' && (
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-[#e8f5e9] text-[#2e7d32]">실행 중</span>
            )}
            {status === 'stopped' && (
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-[#fff3e0] text-[#f57c00]">중단됨</span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {/* Draft State CTAs: 취소 / 저장하기 / 실행하기 */}
            {status === 'draft' && (
              <>
                <button
                  onClick={handleCancel}
                  className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                </button>
                <button
                  onClick={handleSave}
                  className="h-10 px-4 rounded bg-[#242424] hover:bg-[#1a1a1a] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">저장하기</p>
                </button>
                <button
                  onClick={handleRun}
                  className="h-10 px-4 rounded bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">실행하기</p>
                </button>
              </>
            )}

            {/* Running State - Dashboard Mode: 편집하기 / 중단 */}
            {status === 'running' && !isEditMode && (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">편집하기</p>
                </button>
                <button
                  onClick={handleStop}
                  className="h-10 px-4 rounded border border-[#d32f2f] bg-white hover:bg-[#ffebee] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#d32f2f]">중단</p>
                </button>
              </>
            )}

            {/* Running State - Edit Mode: 취소 / 업데이트 */}
            {status === 'running' && isEditMode && (
              <>
                <button
                  onClick={() => {
                    if (isDirty) {
                      setExitModalSource('edit');
                      setShowExitModal(true);
                    } else {
                      setIsEditMode(false);
                    }
                  }}
                  className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                </button>
                <button
                  onClick={() => {
                    handleUpdate();
                    setIsEditMode(false);
                  }}
                  className="h-10 px-4 rounded bg-[#242424] hover:bg-[#1a1a1a] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">업데이트</p>
                </button>
              </>
            )}

            {/* Stopped State - Dashboard Mode: 편집하기 / 실행 */}
            {status === 'stopped' && !isEditMode && (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">편집하기</p>
                </button>
                <button
                  onClick={handleRun}
                  className="h-10 px-4 rounded bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">실행</p>
                </button>
              </>
            )}

            {/* Stopped State - Edit Mode: 취소 / 업데이트 */}
            {status === 'stopped' && isEditMode && (
              <>
                <button
                  onClick={() => {
                    if (isDirty) {
                      setExitModalSource('edit');
                      setShowExitModal(true);
                    } else {
                      setIsEditMode(false);
                    }
                  }}
                  className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                </button>
                <button
                  onClick={() => {
                    handleUpdate();
                    setIsEditMode(false);
                  }}
                  className="h-10 px-4 rounded bg-[#242424] hover:bg-[#1a1a1a] transition-colors"
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">업데이트</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>


      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Steps (Fixed 500px) */}
        <div
          ref={leftPanelRef}
          className="w-[500px] flex flex-col overflow-y-auto border-r border-[#e0e0e0] bg-white shrink-0 relative"
        >
          {/* Dashboard Mode Overlay - 읽기 전용 안내 (스크롤은 허용, 클릭만 차단) */}
          {!isEditMode && (
            <div className="sticky top-0 left-0 right-0 z-10 bg-gradient-to-b from-white via-white to-transparent pb-8 pt-4 px-4">
              <div className="bg-[#f8f8f8] border border-[#e0e0e0] rounded-lg px-4 py-3 text-center">
                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242] mb-1">현재 읽기 전용 모드입니다</p>
                <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#707070]">설정을 수정하려면 상단의 '편집하기' 버튼을 클릭하세요</p>
              </div>
            </div>
          )}
          {/* STEP 1 */}
          <div
            className={`flex flex-col transition-opacity cursor-pointer ${activeStep === 1 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`}
            ref={step1Ref}
            onClick={() => handleStepClick(1)}
          >
            <div className="px-4 py-3">
              <div className="flex gap-2 items-center">
                <div className="bg-white border border-[#7273ff] px-2 py-0.5 rounded">
                  <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#7273ff] leading-[18px]">STEP 1</p>
                </div>
                <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">어떤 게시물에서 실행할까요?</p>
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="bg-[#f6f6f6] rounded px-4 py-3 flex flex-col gap-2">
                <div className="flex gap-1.5 items-center">
                  <div className="w-4 h-4 relative shrink-0">
                    <svg className="block w-full h-full" fill="none" viewBox="0 0 16 16">
                      <path
                        d={svgPaths2.p202f0800}
                        stroke="#5E51FF"
                        strokeWidth="5"
                      />
                    </svg>
                  </div>
                  <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424]">특정 게시물 또는 릴스</p>
                </div>
                <button
                  className={`bg-white border h-8 px-3 rounded hover:bg-gray-50 transition-colors ${errors.post ? 'border-[#d32f2f]' : 'border-[#e0e0e0]'}`}
                  onClick={() => setIsPostModalOpen(true)}
                >
                  <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">게시물 불러오기</p>
                </button>
                {errors.post && (
                  <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#d32f2f]">{errors.post}</p>
                )}
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div
            className={`flex flex-col mt-6 transition-opacity cursor-pointer ${activeStep === 2 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`}
            ref={step2Ref}
            onClick={() => handleStepClick(2)}
          >
            <div className="px-4 py-3">
              <div className="flex gap-2 items-center">
                <div className="bg-white border border-[#7273ff] px-2 py-0.5 rounded">
                  <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#7273ff] leading-[18px]">STEP 2</p>
                </div>
                <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">어떤 댓글에서 응답할까요?</p>
              </div>
            </div>
            <div className="px-4 py-2">
              {/* Keyword Option */}
              <div className="bg-[#f6f6f6] rounded px-4 py-3 flex flex-col gap-2 mb-2">
                <button
                  onClick={() => setSelectedComment('keyword')}
                  className="flex gap-1.5 items-center"
                >
                  <div className="w-4 h-4 relative shrink-0">
                    <svg className="block w-full h-full" fill="none" viewBox="0 0 16 16">
                      <path
                        d={selectedComment === 'keyword' ? svgPaths2.p202f0800 : svgPaths2.p3f4c7100}
                        stroke={selectedComment === 'keyword' ? "#5E51FF" : "#1F1551"}
                        strokeWidth={selectedComment === 'keyword' ? "5" : "1"}
                      />
                    </svg>
                  </div>
                  <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424]">특정 키워드를 남기면 전송</p>
                </button>

                {/* Keyword Input - Only show when keyword is selected */}
                {selectedComment === 'keyword' && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 pb-1.5">
                      <p className="font-['Pretendard:Medium',sans-serif] text-xs text-[#424242] leading-[18px]">키워드 설정</p>
                      <HelpCircle className="w-3 h-3 text-[#bbbbbb]" />
                    </div>
                    <div className={`bg-white border min-h-[32px] rounded flex items-center px-2.5 gap-2 py-1 ${errors.keywords ? 'border-[#d32f2f]' : 'border-[#e0e0e0]'}`}>
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths2.p22803580} fill="#91CFC9" />
                      </svg>
                      <div className="flex gap-1.5 items-center flex-wrap flex-1">
                        {keywords.map((keyword) => (
                          <div key={keyword} className="bg-[#eff8f7] flex gap-1 items-center px-1.5 py-0.5 rounded">
                            <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#264d4a] leading-[18px]">{keyword}</p>
                            <button onClick={(e) => {
                              e.stopPropagation();
                              handleKeywordRemove(keyword);
                            }}>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                                <path d={svgPaths2.p13d64c00} fill="#424242" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          className="flex-1 min-w-[100px] font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px] focus:outline-none"
                          placeholder={keywords.length === 0 ? "키워드를 입력하고 Enter를 누르세요" : ""}
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && keywordInput.trim()) {
                              e.preventDefault();
                              handleKeywordAdd(keywordInput.trim());
                              setKeywordInput('');
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>

                    {/* Suggested Keywords */}
                    <div className="flex gap-2.5 items-center flex-wrap">
                      <div className="flex gap-1 items-center shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                          <path d={svgPaths2.p2d795c50} fill="#5E51FF" />
                          <path d={svgPaths2.p3a4531c0} fill="#5E51FF" />
                          <path d={svgPaths2.p7c68600} fill="#5E51FF" />
                          <path d={svgPaths2.p1bfbc400} fill="#5E51FF" />
                        </svg>
                        <p className="font-['Pretendard:Regular',sans-serif] text-[11px] text-[#5e51ff] leading-4 whitespace-nowrap">이런 키워드는 어떠세요?</p>
                      </div>
                      <div className="flex gap-1.5 items-center flex-wrap">
                        {suggestedKeywords.map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => handleKeywordAdd(keyword)}
                            className="bg-[#ecefff] px-1 py-0.5 rounded hover:bg-[#dce0ff] transition-colors"
                          >
                            <p className="font-['Pretendard:Regular',sans-serif] text-[11px] text-[#1f1551] leading-4">{keyword}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    {errors.keywords && (
                      <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#d32f2f] mt-1">{errors.keywords}</p>
                    )}
                  </div>
                )}
              </div>

              {/* All Comments Option */}
              <div className="bg-[#f6f6f6] rounded px-4 py-3 mb-2">
                <button
                  onClick={() => setSelectedComment('all')}
                  className="flex gap-1.5 items-center"
                >
                  <div className="w-4 h-4 relative shrink-0">
                    <svg className="block w-full h-full" fill="none" viewBox="0 0 16 16">
                      <path
                        d={selectedComment === 'all' ? svgPaths2.p202f0800 : svgPaths2.p3f4c7100}
                        stroke={selectedComment === 'all' ? "#5E51FF" : "#1F1551"}
                        strokeWidth={selectedComment === 'all' ? "5" : "1"}
                      />
                    </svg>
                  </div>
                  <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424]">댓글을 달기만 하면 모두 전송</p>
                </button>
              </div>

              {/* Public Reply Section */}
              <div className="bg-[#f6f6f6] rounded px-4 py-3 flex flex-col gap-3">
                {/* Toggle Header */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">대댓글 남기기</p>
                    <div className="flex gap-1 items-center">
                      <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#707070] leading-[18px]">필수 3개를 설정해야 랜덤으로 발송돼요!</p>
                      <HelpCircle className="w-3 h-3 text-[#bbbbbb]" />
                    </div>
                  </div>
                  <button
                    onClick={() => setPublicReplyEnabled(!publicReplyEnabled)}
                    className="h-6 w-12 shrink-0 relative"
                  >
                    <div className={`absolute inset-0 rounded-full transition-colors ${publicReplyEnabled ? 'bg-[#5e51ff]' : 'bg-[#e0e0e0]'}`} />
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${publicReplyEnabled ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {/* Reply Inputs */}
                {publicReplyEnabled && (
                  <div className="flex flex-col gap-2">
                    {publicReplies.map((reply, index) => (
                      <div key={index} className="bg-white border border-[#e0e0e0] rounded px-2.5 py-2">
                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">{reply}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div
            className={`flex flex-col mt-6 transition-opacity cursor-pointer ${activeStep === 3 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`}
            ref={step3Ref}
            onClick={() => handleStepClick(3)}
          >
            {/* Title */}
            <div className="bg-white px-4 py-3 border-b border-[#f0f0f0]">
              <div className="flex gap-2 items-center">
                <div className="bg-white border border-[#7273ff] px-2 py-0.5 rounded">
                  <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#7273ff] leading-[18px]">STEP 3</p>
                </div>
                <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">어떤 메시지를 보낼까요?</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white px-4 py-2 pb-96">
              {/* DM Message Section */}
              <div className="bg-[#f6f6f6] rounded px-4 py-3 flex flex-col gap-6">
                {/* Message Input */}
                <div className="flex flex-col gap-3">
                  <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">발송 메시지</p>
                  <div className={`bg-white border rounded p-2 relative ${errors.dmMessage ? 'border-[#d32f2f]' : 'border-[#e0e0e0]'}`}>
                    <textarea
                      className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px] focus:outline-none resize-none min-h-[80px]"
                      value={dmMessage}
                      onChange={(e) => setDmMessage(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => {
                        if (!dmMessage.trim()) {
                          setErrors((prev: ValidationErrors) => ({ ...prev, dmMessage: 'DM 메시지를 입력해주세요.' }));
                        } else {
                          setErrors((prev: ValidationErrors) => {
                            const { dmMessage: _, ...rest } = prev;
                            return rest;
                          });
                        }
                      }}
                    />
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5">
                      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.70711 5.70711">
                        <path d={svgPaths3.p185a3316} stroke="#959595" />
                      </svg>
                    </div>
                  </div>
                  {errors.dmMessage && (
                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#d32f2f]">{errors.dmMessage}</p>
                  )}
                </div>

                {/* Button Settings */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-1 items-center">
                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">버튼 설정 (최대 3개)</p>
                    <div className="w-3 h-3">
                      <svg className="block w-full h-full" fill="none" viewBox="0 0 12 12">
                        <g clipPath="url(#clip0_63_10147)">
                          <path d={svgPaths3.p3feba300} fill="#BBBBBB" />
                        </g>
                        <defs>
                          <clipPath id="clip0_63_10147">
                            <rect fill="white" height="12" width="12" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Button Inputs */}
                  <div className="flex flex-col gap-2">
                    {dmButtons.map((button, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1 bg-white border border-[#e0e0e0] rounded h-10 px-2.5 flex items-center">
                          <input
                            type="text"
                            className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px] focus:outline-none placeholder:text-[#bbb]"
                            placeholder="버튼명 입력"
                            value={button.text}
                            onChange={(e) => {
                              const newButtons = [...dmButtons];
                              newButtons[index].text = e.target.value;
                              setDmButtons(newButtons);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="flex-1 bg-white border border-[#e0e0e0] rounded h-10 px-2.5 flex items-center">
                          <input
                            type="text"
                            className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px] focus:outline-none placeholder:text-[#bbb]"
                            placeholder="https://example.com"
                            value={button.url}
                            onChange={(e) => {
                              const newButtons = [...dmButtons];
                              newButtons[index].url = e.target.value;
                              setDmButtons(newButtons);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Follow Check Section */}
              <div className="bg-white mt-2">
                <div className="bg-[#f6f6f6] rounded px-4 py-3 flex flex-col gap-6">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-1 items-center">
                      <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">팔로워에게만 메시지를 보낼까요?</p>
                      <div className="w-3 h-3">
                        <svg className="block w-full h-full" fill="none" viewBox="0 0 12 12">
                          <g clipPath="url(#clip0_follow_check)">
                            <path d={svgPaths4.p3feba300} fill="#BBBBBB" />
                          </g>
                          <defs>
                            <clipPath id="clip0_follow_check">
                              <rect fill="white" height="12" width="12" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFollowCheckEnabled(!followCheckEnabled);
                      }}
                      className="h-6 w-12 shrink-0 relative"
                    >
                      <div className={`absolute inset-0 rounded-full transition-colors ${followCheckEnabled ? 'bg-[#5e51ff]' : 'bg-[#e0e0e0]'}`} />
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${followCheckEnabled ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  {/* Follow Check Inputs - Show when enabled */}
                  {followCheckEnabled && (
                    <>
                      {/* Section 1: Follower Message */}
                      <div className="flex flex-col gap-3">
                        {/* Message Textarea */}
                        <div className="bg-white border border-[#e0e0e0] rounded p-2 relative">
                          <textarea
                            className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none resize-none min-h-[80px]"
                            placeholder="안녕하세요! 요청하신 정보는 팔로워 분들에게만 제공되고 있어요. 팔로우 꾹 누르고 아래 버튼을 클릭해주세요! 👇"
                            value={followCheckMessage}
                            onChange={(e) => setFollowCheckMessage(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="absolute bottom-1 right-1 w-1.5 h-1.5">
                            <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.70711 5.70711">
                              <path d={svgPaths4.p185a3316} stroke="#959595" />
                            </svg>
                          </div>
                        </div>

                        {/* Button Input */}
                        <div className="bg-white border border-[#e0e0e0] rounded h-10 px-2.5 flex items-center">
                          <input
                            type="text"
                            className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none placeholder:text-[#bbb]"
                            placeholder="버튼명 입력"
                            value={followCheckButton}
                            onChange={(e) => setFollowCheckButton(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[#e0e0e0] w-full" />

                      {/* Section 2: Non-Follower Message Accordion */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNonFollowerAccordionOpen(!nonFollowerAccordionOpen);
                        }}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic text-[#242424] text-sm">
                          <p className="leading-[22px]">미팔로워에게 보낼 메시지</p>
                        </div>
                        <div className="flex items-center justify-center rounded shrink-0 size-5">
                          <ChevronDown className={`size-3.5 text-[#242424] transition-transform ${nonFollowerAccordionOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {/* Non-Follower Accordion Content */}
                      {nonFollowerAccordionOpen && (
                        <div className="flex flex-col gap-2 w-full">
                          {/* Non-Follower Message Textarea */}
                          <div className="bg-white border border-[#e0e0e0] rounded p-2 relative">
                            <textarea
                              className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none resize-none min-h-[60px]"
                              placeholder="아직 팔로우가 확인되지 않았어요. 😥 팔로우 상태여야 메시지를 보내드릴 수 있답니다. 팔로우 후 다시 버튼을 눌러주세요!"
                              value={nonFollowerMessage}
                              onChange={(e) => setNonFollowerMessage(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute bottom-1 right-1 w-1.5 h-1.5">
                              <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.70711 5.70711">
                                <path d={svgPaths4.p185a3316} stroke="#959595" />
                              </svg>
                            </div>
                          </div>

                          {/* Non-Follower Button Input */}
                          <div className="bg-white border border-[#e0e0e0] rounded h-10 px-2.5 flex items-center">
                            <input
                              type="text"
                              className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none placeholder:text-[#bbb]"
                              placeholder="버튼명 입력"
                              value={nonFollowerButton}
                              onChange={(e) => setNonFollowerButton(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {errors.followCheck && followCheckEnabled && (
                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#d32f2f]">{errors.followCheck}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview (Flexible) */}
        <div className="flex-1 bg-[#fafafa] flex flex-col items-center overflow-y-auto min-w-0">
          {/* Tab Header */}
          <div className="bg-white w-full border-b border-[#f0f0f0] flex items-center pt-2.5 px-8 shrink-0 gap-6">
            <button
              onClick={() => setRightPanelTab('preview')}
              className={`px-1 py-2 ${rightPanelTab === 'preview' ? 'border-b-2 border-[#5e51ff]' : ''}`}
            >
              <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">미리보기</p>
            </button>
            {showInsights && (
              <button
                onClick={() => setRightPanelTab('insights')}
                className={`px-1 py-2 ${rightPanelTab === 'insights' ? 'border-b-2 border-[#5e51ff]' : ''}`}
              >
                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">인사이트</p>
              </button>
            )}
          </div>

          {rightPanelTab === 'preview' && (
            <>
              {/* Tab Switcher */}
              <div className="flex items-center pt-5 px-8 w-full shrink-0">
                <div className="bg-white border border-[#e0e0e0] flex gap-1 p-1 rounded">
                  <button
                    className={`h-6 px-2.5 rounded transition-colors ${currentTab === 'post' ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'}`}
                    onClick={() => setCurrentTab('post')}
                  >
                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">게시물</p>
                  </button>
                  <button
                    className={`h-6 px-2.5 rounded transition-colors ${currentTab === 'comment' ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'}`}
                    onClick={() => setCurrentTab('comment')}
                  >
                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">댓글</p>
                  </button>
                  <button
                    className={`h-6 px-2.5 rounded transition-colors ${currentTab === 'dm' ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'}`}
                    onClick={() => setCurrentTab('dm')}
                  >
                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">DM</p>
                  </button>
                </div>
              </div>

              {/* Instagram Preview */}
              <div className="w-[393px] h-[755px] rounded-[56px] border-[10px] border-[#f6f6f6] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_8px_16px_0px_rgba(0,0,0,0.14)] overflow-hidden mt-10 mb-10">
                <div className="bg-white flex flex-col h-full p-2.5">
                  {/* Status Bar */}
                  <div className="bg-white h-11 flex items-center justify-between px-4 shrink-0">
                    <p className="font-['SF_Pro_Text:Semibold',sans-serif] text-[17px] text-black tracking-[-0.408px] font-semibold leading-[22px]">9:41</p>
                    <div className="flex gap-1.5 items-center">
                      <svg className="h-3.5" fill="none" viewBox="0 0 77.4012 13">
                        <path d={svgPaths.p2646e000} opacity="0.35" stroke="black" strokeWidth="1.05509" />
                        <path d={svgPaths.p4c0c710} fill="black" opacity="0.4" />
                        <path d={svgPaths.p22239c00} fill="black" />
                        <path d={svgPaths.pce4f780} fill="black" />
                        <path d={svgPaths.p16816b00} fill="black" />
                        <path d={svgPaths.p18ef7a00} fill="black" />
                        <path d={svgPaths.p2262f080} fill="black" />
                        <path d={svgPaths.pc5da680} fill="black" />
                      </svg>
                    </div>
                  </div>

                  {/* Instagram Content */}
                  <div className="flex-1 bg-white flex flex-col overflow-hidden relative">
                    {currentTab === 'post' && (
                      <>
                        {/* Header */}
                        <div className="flex gap-4 items-center pt-3 px-3">
                          <ChevronLeft className="w-6 h-6" />
                          <div className="flex-1 flex flex-col items-center">
                            <p className="font-['Inter:Semi_Bold',sans-serif] text-xs text-[#666] tracking-[0.24px] uppercase font-semibold leading-[1.315]">sojumanjan</p>
                            <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] text-base text-black tracking-[0.16px] font-semibold leading-[1.315]">게시물</p>
                          </div>
                          <div className="w-6 h-6 opacity-0" />
                        </div>

                        {/* Post Info */}
                        <div className="flex items-center justify-between p-3">
                          <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full bg-[#121714]" />
                            <p className="font-['Inter:Medium',sans-serif] text-sm text-black font-medium tracking-[0.28px] leading-[1.3]">sojumanjan</p>
                          </div>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <svg className="w-1 h-3.5" viewBox="0 0 3 15" fill="black">
                              <circle cx="1.5" cy="1.5" r="1.5" />
                              <circle cx="1.5" cy="7.5" r="1.5" />
                              <circle cx="1.5" cy="13.5" r="1.5" />
                            </svg>
                          </div>
                        </div>

                        {/* Post Image Placeholder */}
                        {selectedPostData ? (
                          <div className="w-full aspect-square overflow-hidden">
                            <img alt="" className="w-full h-full object-cover" src={selectedPostData.image} />
                          </div>
                        ) : (
                          <div className="bg-[#ebebeb] w-full aspect-square flex flex-col gap-3 items-center justify-center px-4">
                            <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#424242] text-center leading-[24px]">자동화 설정할 게시물을 선택해 주세요!</p>
                            <button
                              className="bg-white border border-[#e0e0e0] h-8 px-3 rounded hover:bg-gray-50 transition-colors"
                              onClick={() => setIsPostModalOpen(true)}
                            >
                              <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">게시물 불러오기</p>
                            </button>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-3 px-4">
                          <div className="flex gap-3 items-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 19.9839 18.0126">
                              <path d={svgPaths.p15b1c600} fill="#0C1014" />
                            </svg>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 18 18">
                              <path d={svgPaths.p1769d580} fill="#0C1014" />
                            </svg>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 19.9958 18.001">
                              <path d={svgPaths.p1a7c00c0} fill="#0C1014" />
                            </svg>
                          </div>
                          <svg className="w-6 h-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" viewBox="0 0 18 20">
                            <path d="M17 19L9 11.44L1 19V1H17V19Z" />
                          </svg>
                        </div>

                        {/* Caption */}
                        <div className="flex flex-col gap-1.5 px-4 py-3">
                          <div className="flex gap-1.5 items-start text-sm tracking-[-0.28px] leading-[1.3]">
                            <p className="font-['Inter:Medium',sans-serif] font-medium text-black">sojumanjan</p>
                            <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-black flex-1">
                              {selectedPostData ? selectedPostData.caption : "게시물을 선택해 주세요."}
                            </p>
                          </div>
                          <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-sm text-[#666] leading-[1.3]">댓글 모두 보기</p>
                          <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-xs text-[#737373]">
                            {selectedPostData ? selectedPostData.date : "12월 31일"}
                          </p>
                        </div>
                      </>
                    )}

                    {currentTab === 'comment' && (
                      <div className="relative flex-1">
                        {/* Background Post */}
                        <div className="absolute inset-0 overflow-y-auto">
                          {/* Header */}
                          <div className="flex gap-4 items-center pt-3 px-3">
                            <ChevronLeft className="w-6 h-6" />
                            <div className="flex-1 flex flex-col items-center">
                              <p className="font-['Inter:Semi_Bold',sans-serif] text-xs text-[#666] tracking-[0.24px] uppercase font-semibold leading-[1.315]">sojumanjan</p>
                              <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] text-base text-black tracking-[0.16px] font-semibold leading-[1.315]">게시물</p>
                            </div>
                            <div className="w-6 h-6 opacity-0" />
                          </div>

                          {/* Post Info */}
                          <div className="flex items-center justify-between p-3">
                            <div className="flex gap-2 items-center">
                              <div className="w-8 h-8 rounded-full bg-[#121714]" />
                              <p className="font-['Inter:Medium',sans-serif] text-sm text-black font-medium tracking-[0.28px] leading-[1.3]">sojumanjan</p>
                            </div>
                            <div className="w-6 h-6 flex items-center justify-center">
                              <svg className="w-1 h-3.5" viewBox="0 0 3 15" fill="black">
                                <circle cx="1.5" cy="1.5" r="1.5" />
                                <circle cx="1.5" cy="7.5" r="1.5" />
                                <circle cx="1.5" cy="13.5" r="1.5" />
                              </svg>
                            </div>
                          </div>

                          {/* Post Image */}
                          {selectedPostData ? (
                            <div className="w-full aspect-square overflow-hidden">
                              <img alt="" className="w-full h-full object-cover" src={selectedPostData.image} />
                            </div>
                          ) : (
                            <div className="bg-[#ebebeb] w-full aspect-square flex items-center justify-center">
                              <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242] text-center px-4">게시물을 선택해 주세요</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 px-4">
                            <div className="flex gap-3 items-center">
                              <div className="flex gap-1 items-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                                  <path d={svgPathsComment.p84bf580} fill="#0C1014" />
                                </svg>
                                <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-normal not-italic text-[#0c1014] text-[12px] text-nowrap tracking-[0.24px]">1,139</p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                                  <path clipRule="evenodd" d={svgPathsComment.p376b30f0} fill="#0C1014" fillRule="evenodd" />
                                </svg>
                                <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-normal not-italic text-[#0c1014] text-[12px] text-nowrap tracking-[0.24px]">58</p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                                  <path clipRule="evenodd" d={svgPathsComment.p3036ca00} fill="#0C1014" fillRule="evenodd" />
                                </svg>
                                <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-normal not-italic text-[#0c1014] text-[12px] text-nowrap tracking-[0.24px]">7</p>
                              </div>
                            </div>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 23 24">
                              <path d={svgPathsComment.p12bde800} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                          </div>

                          {/* Caption */}
                          <div className="flex flex-col gap-1.5 px-4 py-3">
                            <div className="flex gap-1.5 items-start text-[14px] tracking-[-0.28px] leading-[1.3]">
                              <p className="font-['Inter:Medium',sans-serif] font-medium text-black">sojumanjan</p>
                              <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-black flex-1 line-clamp-2">
                                {selectedPostData ? selectedPostData.caption : "게시물을 선택해 주세요."}
                              </p>
                            </div>
                            <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-[14px] text-[#666] tracking-[-0.28px] leading-[1.3]">댓글 모두 보기</p>
                            <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-[12px] text-[#737373] leading-[1.3]">
                              {selectedPostData ? selectedPostData.date : "12월 31일"}
                            </p>
                          </div>
                        </div>

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] pointer-events-none" />

                        {/* Comment Modal */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[34px] overflow-hidden flex flex-col" style={{ height: '519px' }}>
                          {/* Header */}
                          <div className="bg-white h-[70px] relative shrink-0 w-full border-b border-[#f0f0f0]">
                            <div className="absolute right-5 top-[25px]">
                              <svg className="w-[30px] h-[30px]" fill="none" viewBox="0 0 30 30">
                                <path clipRule="evenodd" d={svgPathsComment.p35f14740} fill="#0C1014" fillRule="evenodd" />
                              </svg>
                            </div>
                            <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[1.3] left-1/2 not-italic text-[16px] text-black text-center text-nowrap top-[35px] tracking-[0.32px] translate-x-[-50%]">댓글</p>
                            <div className="absolute bg-black h-[5px] left-1/2 opacity-10 rounded-[100px] top-[17px] translate-x-[-50%] w-[34px]" />
                          </div>

                          {/* User Comment */}
                          <div className="flex gap-[9px] items-start p-[14px] w-full">
                            <div className="relative rounded-[106.25px] shrink-0 size-[34px]">
                              <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
                                <div className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
                              </div>
                            </div>
                            <div className="basis-0 flex flex-col gap-[5px] grow min-h-px min-w-px">
                              <div className="flex gap-[8px] items-center not-italic text-[12px] text-nowrap">
                                <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-none text-[#030303] tracking-[-0.2011px]">Username</p>
                                <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.25] text-[#727272]">20초 전</p>
                              </div>
                              <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.3] min-w-full not-italic text-[#030303] text-[13px] w-[min-content]">
                                {selectedComment === 'keyword' && keywords.length > 0
                                  ? `${keywords[0]}🙌`
                                  : '공동구매 🙌'}
                              </p>
                              <div className="flex items-center">
                                <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-none not-italic text-[#727272] text-[12px] text-nowrap tracking-[-0.2011px]">답글</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[3px] items-center px-[6px] py-[9px] shrink-0">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                                <path d={svgPathsComment.p34977600} stroke="#747474" strokeWidth="1.25" />
                              </svg>
                            </div>
                          </div>

                          {/* Bot Reply */}
                          {publicReplyEnabled && publicReplies.length > 0 && (
                            <div className="flex gap-[9px] items-start pl-[52px] pr-[14px] py-[12px] w-full">
                              <div className="relative rounded-[106.25px] shrink-0 size-[34px]">
                                <div className="absolute bg-[#121714] left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]" />
                              </div>
                              <div className="basis-0 flex flex-col gap-[5px] grow min-h-px min-w-px">
                                <div className="flex gap-[8px] items-center not-italic text-[12px] text-nowrap">
                                  <p className="font-['SF_Pro_Display:Semibold',sans-serif] leading-none text-[#030303] tracking-[-0.2011px]">sojumanjan</p>
                                  <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.25] text-[#727272]">20초 전</p>
                                </div>
                                <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[1.3] min-w-full not-italic text-[#030303] text-[13px] w-[min-content]">
                                  {publicReplies[Math.floor(Math.random() * publicReplies.length)]}
                                </p>
                                <div className="flex items-center">
                                  <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-none not-italic text-[#727272] text-[12px] text-nowrap tracking-[-0.2011px]">답글</p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-[3px] items-center px-[6px] py-[9px] shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                                  <path d={svgPathsComment.p34977600} stroke="#747474" strokeWidth="1.25" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentTab === 'dm' && (
                      <>
                        {/* DM Header */}
                        <div className="flex gap-4 items-center pt-3 px-3 border-b border-[#ebebeb] pb-3">
                          <ChevronLeft className="w-6 h-6" />
                          <div className="flex-1 flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full bg-[#121714]" />
                            <p className="font-['Inter:Medium',sans-serif] text-sm text-black font-medium tracking-[0.28px] leading-[1.3]">sojumanjan</p>
                          </div>
                        </div>

                        {/* DM Content */}
                        <div className="flex flex-col p-[14px] gap-0 bg-white flex-1 overflow-y-auto">
                          {followCheckEnabled ? (
                            <>
                              {/* Show Non-Follower flow when accordion is open */}
                              {nonFollowerAccordionOpen ? (
                                <>
                                  {/* Non-Follower Message */}
                                  <div className="flex gap-[8px] items-start mb-[14px]">
                                    <div className="relative rounded-[106.25px] shrink-0 size-[34px]">
                                      <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
                                        <div className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
                                      </div>
                                    </div>
                                    <div className="bg-[#fafafa] flex flex-col gap-[8px] px-[16px] py-[12px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]">
                                      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] text-[#1f2024] text-[14px]">
                                        {nonFollowerMessage || '팔로우 미확인 메시지'}
                                      </p>
                                      {nonFollowerButton && (
                                        <div className="bg-[#ebebeb] h-[32px] px-[12px] rounded-[8px] flex items-center justify-center">
                                          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] text-[#242424] text-[14px] text-center whitespace-nowrap">
                                            {nonFollowerButton}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* User Response */}
                                  {nonFollowerButton && (
                                    <div className="flex gap-[8px] items-start justify-end mb-[14px]">
                                      <div className="bg-[#dce2ff] px-[16px] py-[12px] rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px]">
                                        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] text-[#1f2024] text-[14px] whitespace-nowrap">
                                          {nonFollowerButton}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  {/* Follow Check Message */}
                                  <div className="flex gap-[8px] items-start mb-[14px]">
                                    <div className="relative rounded-[106.25px] shrink-0 size-[34px]">
                                      <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
                                        <div className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
                                      </div>
                                    </div>
                                    <div className="bg-[#fafafa] flex flex-col gap-[8px] px-[16px] py-[12px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]">
                                      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] text-[#1f2024] text-[14px]">
                                        {followCheckMessage || '팔로우 확인 메시지'}
                                      </p>
                                      {followCheckButton && (
                                        <div className="bg-[#ebebeb] h-[32px] px-[12px] rounded-[8px] flex items-center justify-center">
                                          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] text-[#242424] text-[14px] text-center whitespace-nowrap">
                                            {followCheckButton}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* User Response */}
                                  {followCheckButton && (
                                    <div className="flex gap-[8px] items-start justify-end mb-[14px]">
                                      <div className="bg-[#dce2ff] px-[16px] py-[12px] rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px]">
                                        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] text-[#1f2024] text-[14px] whitespace-nowrap">
                                          {followCheckButton}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Final DM Message */}
                                  <div className="flex gap-[8px] items-start">
                                    <div className="relative rounded-[106.25px] shrink-0 size-[34px]">
                                      <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
                                        <div className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
                                      </div>
                                    </div>
                                    <div className="bg-[#fafafa] flex flex-col gap-[8px] px-[16px] py-[12px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]">
                                      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] text-[#1f2024] text-[14px] whitespace-pre-wrap">
                                        {dmMessage}
                                      </p>
                                      {dmButtons.length > 0 && dmButtons.some(btn => btn.text.trim()) && (
                                        <div className="flex flex-col gap-[6px] w-full">
                                          {dmButtons.filter(btn => btn.text.trim()).map((button, index) => (
                                            <div key={index} className="bg-[#ebebeb] h-[32px] px-[12px] rounded-[8px] flex items-center justify-center w-full">
                                              <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] text-[#242424] text-[14px] text-center whitespace-nowrap">
                                                {button.text}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {/* Standard DM without Follow Check */}
                              <div className="flex gap-[8px] items-start">
                                <div className="relative rounded-[106.25px] shrink-0 size-[34px]">
                                  <div className="absolute left-1/2 pointer-events-none rounded-[106.25px] size-[27.625px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[106.25px] size-full" src={imgAvatar} />
                                    <div className="absolute border-[0.345px] border-[rgba(116,116,116,0.5)] border-solid inset-0 rounded-[106.25px]" />
                                  </div>
                                </div>
                                <div className="bg-[#fafafa] flex flex-col gap-[8px] px-[16px] py-[12px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]">
                                  <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] text-[#1f2024] text-[14px] whitespace-pre-wrap">
                                    {dmMessage}
                                  </p>
                                  {dmButtons.length > 0 && dmButtons.some(btn => btn.text.trim()) && (
                                    <div className="flex flex-col gap-[6px] w-full">
                                      {dmButtons.filter(btn => btn.text.trim()).map((button, index) => (
                                        <div key={index} className="bg-[#ebebeb] h-[32px] px-[12px] rounded-[8px] flex items-center justify-center w-full">
                                          <p className="font-['Pretendard:Medium',sans-serif] leading-[22px] text-[#242424] text-[14px] text-center whitespace-nowrap">
                                            {button.text}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {rightPanelTab === 'insights' && showInsights && (
            <div className="w-full px-8 py-8">
              {/* 핵심 성과 */}
              <div className="flex gap-1 items-center mb-5">
                <h2 className="font-['Pretendard:Medium',sans-serif] text-[20px] leading-[28px] text-[#242424]">핵심 성과</h2>
              </div>

              {/* DM 성과 */}
              <div className="mb-5">
                <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#424242] mb-2">DM 성과</p>
                <div className="flex gap-3">
                  {/* 도달 인원 */}
                  <div className="flex-1 bg-white rounded border border-[#f0f0f0] p-4 h-[110px] flex flex-col justify-between">
                    <div className="flex gap-1 items-center pb-2">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#707070]">도달 인원</p>
                      <div className="w-3 h-3">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <g clipPath="url(#clip0_68_11970)">
                            <path d={svgPathsHelp.p3feba300} fill="#BBBBBB" />
                          </g>
                          <defs>
                            <clipPath id="clip0_68_11970">
                              <rect fill="white" height="12" width="12" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[16px] leading-[24px] text-[#242424]">{insightsData.reach.toLocaleString()} 명</p>
                      <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#707070]">/ {insightsData.totalSent.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* 클릭 인원 */}
                  <div className="flex-1 bg-white rounded border border-[#f0f0f0] p-4 h-[110px] flex flex-col justify-between">
                    <div className="flex gap-1 items-center pb-2">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#707070]">클릭 인원</p>
                      <div className="w-3 h-3">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <g clipPath="url(#clip1_68_11970)">
                            <path d={svgPathsHelp.p3feba300} fill="#BBBBBB" />
                          </g>
                          <defs>
                            <clipPath id="clip1_68_11970">
                              <rect fill="white" height="12" width="12" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <p className="font-['Pretendard:Medium',sans-serif] text-[16px] leading-[24px] text-[#242424]">{insightsData.clicks.toLocaleString()} 명</p>
                  </div>

                  {/* 클릭률 */}
                  <div className="flex-1 bg-white rounded border border-[#f0f0f0] p-4 h-[110px] flex flex-col justify-between">
                    <div className="flex gap-1 items-center pb-2">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#707070]">클릭률(CTR)</p>
                      <div className="w-3 h-3">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <g clipPath="url(#clip2_68_11970)">
                            <path d={svgPathsHelp.p3feba300} fill="#BBBBBB" />
                          </g>
                          <defs>
                            <clipPath id="clip2_68_11970">
                              <rect fill="white" height="12" width="12" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <p className="font-['Pretendard:Medium',sans-serif] text-[16px] leading-[24px] text-[#242424]">{insightsData.ctr}%</p>
                  </div>
                </div>
              </div>

              {/* 팔로우 성과 */}
              <div className="mb-5">
                <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#424242] mb-2">팔로우 성과</p>
                <div className="flex gap-3 h-[110px]">
                  {/* 팔로우 전환 인원 */}
                  <div className="flex-1 bg-white rounded border border-[#f0f0f0] p-4 flex flex-col gap-2.5">
                    <div className="flex gap-1 items-center pb-2">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#707070]">팔로우 전환 인원</p>
                      <div className="w-3 h-3">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <g clipPath="url(#clip3_68_11970)">
                            <path d={svgPathsHelp.p3feba300} fill="#BBBBBB" />
                          </g>
                          <defs>
                            <clipPath id="clip3_68_11970">
                              <rect fill="white" height="12" width="12" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="pt-6">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[16px] leading-[24px] text-[#242424]">{insightsData.followConversions.toLocaleString()} 명</p>
                    </div>
                  </div>

                  {/* 팔로우 전환율 */}
                  <div className="flex-1 bg-white rounded border border-[#f0f0f0] p-4 flex flex-col gap-2.5">
                    <div className="flex gap-1 items-center pb-2">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[12px] leading-[18px] text-[#707070]">팔로우 전환율</p>
                      <div className="w-3 h-3">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <g clipPath="url(#clip4_68_11970)">
                            <path d={svgPathsHelp.p3feba300} fill="#BBBBBB" />
                          </g>
                          <defs>
                            <clipPath id="clip4_68_11970">
                              <rect fill="white" height="12" width="12" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="pt-6">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[16px] leading-[24px] text-[#242424]">{insightsData.followConversionRate}%</p>
                    </div>
                  </div>

                  {/* 빈 공간 */}
                  <div className="flex-1 opacity-0"></div>
                </div>
              </div>

              {/* 버튼별 성과 */}
              <div className="flex gap-1 items-center mb-4">
                <h2 className="font-['Pretendard:Medium',sans-serif] text-[20px] leading-[28px] text-[#242424]">버튼별 성과</h2>
              </div>
              <div className="bg-white rounded border border-[#f0f0f0] overflow-hidden">
                {/* 테이블 헤더 */}
                <div className="h-[38px] border-b border-[#f0f0f0] flex items-start">
                  <div className="w-[60px] h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                    <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#424242]">No</p>
                  </div>
                  <div className="w-[120px] h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                    <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#424242]">버튼명</p>
                  </div>
                  <div className="w-[130px] h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                    <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#424242]">URL</p>
                  </div>
                  <div className="flex-1 h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                    <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#424242]">클릭 인원</p>
                  </div>
                  <div className="flex-1 h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                    <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#424242]">총 클릭 횟수</p>
                  </div>
                  <div className="flex-1 h-full flex items-center px-2.5">
                    <p className="font-['Pretendard:Medium',sans-serif] text-[14px] leading-[22px] text-[#424242]">클릭률(CTR)</p>
                  </div>
                </div>

                {/* 테이블 바디 */}
                {insightsData.buttonStats.map((stat, index) => (
                  <div key={index} className="h-[56px] border-b border-[#f0f0f0] last:border-0 flex items-start bg-white">
                    <div className="w-[60px] h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[22px] text-[#424242]">{stat.no}</p>
                    </div>
                    <div className="w-[120px] h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[22px] text-[#424242]">{stat.buttonName}</p>
                    </div>
                    <div className="w-[130px] h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[12px] leading-[18px] text-[#424242] truncate">{stat.url}</p>
                    </div>
                    <div className="flex-1 h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[22px] text-[#424242]">{stat.uniqueClicks}</p>
                    </div>
                    <div className="flex-1 h-full border-r border-[#f0f0f0] flex items-center px-2.5">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[22px] text-[#424242]">{stat.totalClicks}</p>
                    </div>
                    <div className="flex-1 h-full flex items-center px-2.5">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[22px] text-[#424242]">{stat.ctr}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Selection Modal */}
      <PostSelectionModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSelect={handlePostSelect}
        usedPostIds={usedPostIds}
      />

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="font-['Pretendard:Medium',sans-serif] text-lg text-[#242424] mb-2">
              정말 나가시겠습니까?
            </h3>
            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070] mb-6">
              저장되지 않은 데이터는 삭제됩니다.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExitModal(false)}
                className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
              </button>
              <button
                onClick={confirmExit}
                className="h-10 px-4 rounded bg-[#d32f2f] hover:bg-[#c62828] transition-colors"
              >
                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">나가기</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="font-['Pretendard:Medium',sans-serif] text-lg text-[#242424] mb-2">
              자동화를 삭제하시겠습니까?
            </h3>
            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070] mb-6">
              대기 중이던 발송도 함께 중단됩니다.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
              >
                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
              </button>
              <button
                onClick={handleDelete}
                className="h-10 px-4 rounded bg-[#d32f2f] hover:bg-[#c62828] transition-colors"
              >
                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">삭제</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Notice for Running State */}
      {showUpdateNotice && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-[#1e3a5f] text-white rounded-lg px-6 py-4 shadow-xl max-w-lg flex items-start gap-3">
            <div className="flex-1">
              <p className="font-['Pretendard:Medium',sans-serif] text-sm mb-1">
                설정이 업데이트되었습니다
              </p>
              <p className="font-['Pretendard:Regular',sans-serif] text-xs text-white/80">
                수정된 설정은 업데이트 이후 새로 유입되는 댓글부터 적용됩니다.
                이미 처리되었거나 발송 대기 상태의 댓글에는 소급 적용되지 않습니다.
              </p>
            </div>
            <button
              onClick={() => setShowUpdateNotice(false)}
              className="text-white/60 hover:text-white transition-colors shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}