import { useState, useRef, useEffect } from "react";
import { HelpCircle, ChevronLeft, ChevronDown, ChevronRight, Pencil, Users, Send, MousePointer, BarChart2, Link } from "lucide-react";
import { DMTemplate, CTALink, TemplateStatus, AutomationGroup, AutomationInfluencer } from "../types";
import { DeployConfirmModal } from "../components/DeployConfirmModal";
import { CoreButton, CoreAvatar, CoreStatusBadge } from "../../design-system";

interface ValidationErrors {
    post?: string;
    keywords?: string;
    dmMessage?: string;
    followCheck?: string;
    influencerGuide?: string;
}

interface TemplateManagementProps {
    initialData?: DMTemplate;
    automationGroup: AutomationGroup;
    onBack: () => void;
    onSave: (template: DMTemplate) => void;
    onDeploy: (template: DMTemplate) => void;
    // NEW: Context and influencer support
    context?: 'default' | 'campaign';
    influencers?: AutomationInfluencer[];
    showInfluencerTable?: boolean;
    onDeliverTemplate?: (influencerIds: number[]) => void;
}

export function TemplateManagement({
    initialData,
    automationGroup,
    onBack,
    onSave,
    onDeploy,
    context = 'default',
    influencers = [],
    showInfluencerTable = false,
    onDeliverTemplate
}: TemplateManagementProps) {
    // Form state - same as AutomationDetail
    const [templateName, setTemplateName] = useState<string>(`${automationGroup.name} 템플릿`);

    // STEP 1: Post selection
    const [selectedPostData, setSelectedPostData] = useState<{
        id: string;
        image: string;
        caption: string;
        date: string;
    } | null>(null);

    // STEP 2: Comment trigger
    const [selectedComment, setSelectedComment] = useState<string>('keyword');
    const [keywords, setKeywords] = useState<string[]>(['가격', '정보']);
    const [keywordInput, setKeywordInput] = useState<string>('');
    const [publicReplyEnabled, setPublicReplyEnabled] = useState(false);
    const [publicReplies, setPublicReplies] = useState<string[]>([
        '안녕하세요! DM을 확인해주세요. 😊 메시지가 오지 않는다면 요청함을 확인해 주세요.',
        '참여해주셔서 감사합니다!',
        '만나서 반가워요. 지금 바로 DM 보내드릴게요!'
    ]);

    // STEP 3: DM Message
    const [dmMessage, setDmMessage] = useState(initialData?.dmGuide || '감사합니다.\n요청하신 자료 보내드립니다.\n아래 버튼을 클릭하면 바로 확인 가능합니다!');
    const [dmButtons, setDmButtons] = useState<Array<{ text: string, url: string }>>(
        initialData?.ctaLinks?.length ? initialData.ctaLinks.map(l => ({ text: l.buttonName, url: l.url })) : [
            { text: '여기를 클릭하세요!', url: 'https://example.com' },
            { text: '자료 내놔', url: 'https://example.com' },
            { text: '좀 보자', url: 'https://example.com' }
        ]
    );
    const [followCheckEnabled, setFollowCheckEnabled] = useState(false);
    const [followCheckMessage, setFollowCheckMessage] = useState('안녕하세요! 댓글 확인했습니다.\n팔로우 완료 후 아래 버튼을 눌러 주세요.\n확인 후 요청하신 정보를 보내드립니다!');
    const [followCheckButton, setFollowCheckButton] = useState('팔로우 확인하기 ✅');
    const [nonFollowerMessage, setNonFollowerMessage] = useState('아직 팔로우가 확인되지 않았어요. 😥 팔로우 상태여야 메시지를 보내드릴 수 있답니다. 팔로우 후 다시 버튼을 눌러주세요!');
    const [nonFollowerButton, setNonFollowerButton] = useState('팔로우 확인하기 ✅');
    const [nonFollowerAccordionOpen, setNonFollowerAccordionOpen] = useState(false);

    // NEW: 인플루언서에게 전달할 문구
    const [influencerGuide, setInfluencerGuide] = useState('');
    const [influencerGuideExpanded, setInfluencerGuideExpanded] = useState(true);

    // UI state
    const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
    const [currentTab, setCurrentTab] = useState<'post' | 'comment' | 'dm'>('post');
    const [rightPanelTab, setRightPanelTab] = useState<'preview' | 'insights'>('preview');

    // Status management
    const status = initialData?.status || 'draft';
    const [isEditMode, setIsEditMode] = useState(status === 'draft');

    // Dirty state tracking
    const [isDirty, setIsDirty] = useState(false);
    const [savedFormData, setSavedFormData] = useState<string>('');

    // Validation errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Modal states
    const [showExitModal, setShowExitModal] = useState(false);
    const [exitModalSource, setExitModalSource] = useState<'page' | 'edit'>('page');
    const [showDeployModal, setShowDeployModal] = useState(false);

    // Refs
    const step1Ref = useRef<HTMLDivElement>(null);
    const step2Ref = useRef<HTMLDivElement>(null);
    const step3Ref = useRef<HTMLDivElement>(null);
    const step4Ref = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);

    const suggestedKeywords = ['가격', '공구', '정보', '링크', '💜'];

    // Influencer table state
    const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    // Influencer table handlers
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedInfluencers(influencers.map(i => i.id));
        } else {
            setSelectedInfluencers([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedInfluencers(prev => [...prev, id]);
        } else {
            setSelectedInfluencers(prev => prev.filter(p => p !== id));
        }
    };

    const handleDeliver = () => {
        const connectedSelected = influencers.filter(
            i => selectedInfluencers.includes(i.id) && i.isConnected
        );

        if (connectedSelected.length === 0) {
            alert("선택한 인플루언서 중 연동된 계정이 없습니다.");
            return;
        }

        if (connectedSelected.length < selectedInfluencers.length) {
            const confirmed = window.confirm(
                `선택한 ${selectedInfluencers.length}명 중 연동된 ${connectedSelected.length}명에게만 템플릿을 전달합니다. 진행하시겠습니까?`
            );
            if (!confirmed) return;
        }

        onDeliverTemplate?.(connectedSelected.map(i => i.id));
        setSelectedInfluencers([]);
    };

    const formatNumber = (value: number) => {
        if (value >= 10000) {
            return (value / 10000).toFixed(1) + '만';
        }
        return value.toLocaleString('ko-KR');
    };

    // Calculate totals
    const totalSent = influencers.reduce((sum, i) => sum + i.sentCount, 0);
    const totalClicks = influencers.reduce((sum, i) => sum + i.clickCount, 0);
    const avgCpv = influencers.length > 0
        ? influencers.reduce((sum, i) => sum + (i.cpv || 0), 0) / influencers.length
        : 0;

    // Track form changes
    useEffect(() => {
        const currentFormData = JSON.stringify({
            selectedComment, keywords, publicReplyEnabled, publicReplies,
            dmMessage, dmButtons, followCheckEnabled, followCheckMessage,
            nonFollowerMessage, influencerGuide, selectedPostData
        });

        if (savedFormData === '') {
            setSavedFormData(currentFormData);
        } else {
            setIsDirty(currentFormData !== savedFormData);
        }
    }, [selectedComment, keywords, publicReplyEnabled, publicReplies,
        dmMessage, dmButtons, followCheckEnabled, followCheckMessage,
        nonFollowerMessage, influencerGuide, selectedPostData, savedFormData]);

    const handleStepClick = (step: 1 | 2 | 3 | 4) => {
        setActiveStep(step);

        if (step === 1) setCurrentTab('post');
        else if (step === 2) setCurrentTab('comment');
        else if (step === 3 || step === 4) setCurrentTab('dm');

        const refs = [step1Ref, step2Ref, step3Ref, step4Ref];
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

    // Validation
    const validateForm = (): ValidationErrors => {
        const newErrors: ValidationErrors = {};

        if (selectedComment === 'keyword' && keywords.length === 0) {
            newErrors.keywords = '최소 1개 이상의 키워드를 입력해주세요.';
        }

        if (!dmMessage.trim()) {
            newErrors.dmMessage = 'DM 메시지를 입력해주세요.';
        }

        if (followCheckEnabled) {
            if (!followCheckMessage.trim() || !nonFollowerMessage.trim()) {
                newErrors.followCheck = '팔로워/미팔로워 메시지를 모두 입력해주세요.';
            }
        }

        return newErrors;
    };

    // Build template
    const buildTemplate = (targetStatus: TemplateStatus): DMTemplate => {
        return {
            id: initialData?.id,
            automationGroupId: automationGroup.id,
            dmGuide: dmMessage,
            imageUrl: undefined,
            ctaLinks: dmButtons.map(b => ({ buttonName: b.text, url: b.url })),
            status: targetStatus,
            lastModified: new Date().toISOString().split('T')[0]
        };
    };

    // Handlers
    const handleDeployClick = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setShowDeployModal(true);
    };

    const handleDeployConfirm = () => {
        const template = buildTemplate('deployed');
        onDeploy(template);
        const currentFormData = JSON.stringify({
            selectedComment, keywords, publicReplyEnabled, publicReplies,
            dmMessage, dmButtons, followCheckEnabled, followCheckMessage,
            nonFollowerMessage, influencerGuide, selectedPostData
        });
        setSavedFormData(currentFormData);
        setIsDirty(false);
        setShowDeployModal(false);
    };

    const handleSave = () => {
        const template = buildTemplate('saved');
        onSave(template);
        const currentFormData = JSON.stringify({
            selectedComment, keywords, publicReplyEnabled, publicReplies,
            dmMessage, dmButtons, followCheckEnabled, followCheckMessage,
            nonFollowerMessage, influencerGuide, selectedPostData
        });
        setSavedFormData(currentFormData);
        setIsDirty(false);
    };

    const handleUpdate = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const template = buildTemplate(status as TemplateStatus);
        onSave(template);
        const currentFormData = JSON.stringify({
            selectedComment, keywords, publicReplyEnabled, publicReplies,
            dmMessage, dmButtons, followCheckEnabled, followCheckMessage,
            nonFollowerMessage, influencerGuide, selectedPostData
        });
        setSavedFormData(currentFormData);
        setIsDirty(false);
    };

    const handleCancel = () => {
        if (isDirty) {
            setExitModalSource('page');
            setShowExitModal(true);
        } else {
            onBack();
        }
    };

    const confirmExit = () => {
        setShowExitModal(false);
        if (exitModalSource === 'edit') {
            setIsEditMode(false);
            setIsDirty(false);
        } else {
            onBack();
        }
    };

    return (
        <div className="bg-[#fafafa] flex flex-col h-screen w-full">
            {/* Header Title */}
            <div className="bg-white h-[60px] border-b border-[#f0f0f0] shrink-0">
                <div className="flex items-center h-full px-8 justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={handleCancel} className="p-1 hover:bg-[#f5f5f5] rounded transition-colors mr-2">
                            <ChevronLeft className="w-5 h-5 text-[#707070]" />
                        </button>
                        <p className="font-['Pretendard:Regular',sans-serif] text-base text-[#242424]">{templateName}</p>
                        <button className="p-1 hover:bg-[#f5f5f5] rounded transition-colors">
                            <Pencil className="w-4 h-4 text-[#707070]" />
                        </button>
                        {status === 'draft' && (
                            <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-[#f0f0f0] text-[#707070]">초안</span>
                        )}
                        {status === 'saved' && (
                            <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-[#f0f0f0] text-[#707070]">저장됨</span>
                        )}
                        {status === 'deployed' && (
                            <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-[#e8f5e9] text-[#2e7d32]">전달 완료</span>
                        )}
                    </div>
                    <div className="flex gap-2 items-center">
                        {status === 'draft' && (
                            <>
                                <button onClick={handleCancel} className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                                </button>
                                <button onClick={handleSave} className="h-10 px-4 rounded bg-[#242424] hover:bg-[#1a1a1a] transition-colors">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">저장하기</p>
                                </button>
                                <button onClick={handleDeployClick} className="h-10 px-4 rounded bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">전달하기</p>
                                </button>
                            </>
                        )}
                        {(status === 'saved' || status === 'deployed') && !isEditMode && (
                            <>
                                <button onClick={() => setIsEditMode(true)} className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">편집하기</p>
                                </button>
                                {status === 'saved' && (
                                    <button onClick={handleDeployClick} className="h-10 px-4 rounded bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors">
                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">전달하기</p>
                                    </button>
                                )}
                            </>
                        )}
                        {(status === 'saved' || status === 'deployed') && isEditMode && (
                            <>
                                <button onClick={() => { if (isDirty) { setExitModalSource('edit'); setShowExitModal(true); } else { setIsEditMode(false); } }} className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                                </button>
                                <button onClick={() => { handleUpdate(); setIsEditMode(false); }} className="h-10 px-4 rounded bg-[#242424] hover:bg-[#1a1a1a] transition-colors">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">업데이트</p>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel - Steps */}
                <div ref={leftPanelRef} className="w-[500px] flex flex-col overflow-y-auto border-r border-[#e0e0e0] bg-white shrink-0 relative">
                    {!isEditMode && (
                        <div className="sticky top-0 left-0 right-0 z-10 bg-gradient-to-b from-white via-white to-transparent pb-8 pt-4 px-4">
                            <div className="bg-[#f8f8f8] border border-[#e0e0e0] rounded-lg px-4 py-3 text-center">
                                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242] mb-1">현재 읽기 전용 모드입니다</p>
                                <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#707070]">설정을 수정하려면 상단의 '편집하기' 버튼을 클릭하세요</p>
                            </div>
                        </div>
                    )}

                    {/* STEP 1: 게시물 선택 */}
                    <div className={`flex flex-col transition-opacity cursor-pointer ${activeStep === 1 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`} ref={step1Ref} onClick={() => handleStepClick(1)}>
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
                                    <div className="w-4 h-4 rounded-full border-[5px] border-[#5e51ff]" />
                                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424]">특정 게시물 또는 릴스</p>
                                </div>
                                <button className="bg-white border border-[#e0e0e0] h-8 px-3 rounded hover:bg-gray-50 transition-colors self-start">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">게시물 불러오기</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2: 댓글 트리거 */}
                    <div className={`flex flex-col mt-6 transition-opacity cursor-pointer ${activeStep === 2 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`} ref={step2Ref} onClick={() => handleStepClick(2)}>
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
                                <button onClick={() => setSelectedComment('keyword')} className="flex gap-1.5 items-center">
                                    <div className={`w-4 h-4 rounded-full border-[${selectedComment === 'keyword' ? '5' : '1'}px] border-[${selectedComment === 'keyword' ? '#5e51ff' : '#1F1551'}]`} />
                                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424]">특정 키워드를 남기면 전송</p>
                                </button>

                                {selectedComment === 'keyword' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-1 pb-1.5">
                                            <p className="font-['Pretendard:Medium',sans-serif] text-xs text-[#424242] leading-[18px]">키워드 설정</p>
                                            <HelpCircle className="w-3 h-3 text-[#bbbbbb]" />
                                        </div>
                                        <div className={`bg-white border min-h-[32px] rounded flex items-center px-2.5 gap-2 py-1 ${errors.keywords ? 'border-[#d32f2f]' : 'border-[#e0e0e0]'}`}>
                                            <div className="flex gap-1.5 items-center flex-wrap flex-1">
                                                {keywords.map((keyword) => (
                                                    <div key={keyword} className="bg-[#eff8f7] flex gap-1 items-center px-1.5 py-0.5 rounded">
                                                        <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#264d4a] leading-[18px]">{keyword}</p>
                                                        <button onClick={(e) => { e.stopPropagation(); handleKeywordRemove(keyword); }}>
                                                            <span className="text-[#424242] text-xs">×</span>
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
                                        <div className="flex gap-2.5 items-center flex-wrap">
                                            <div className="flex gap-1 items-center shrink-0">
                                                <p className="font-['Pretendard:Regular',sans-serif] text-[11px] text-[#5e51ff] leading-4 whitespace-nowrap">이런 키워드는 어떠세요?</p>
                                            </div>
                                            <div className="flex gap-1.5 items-center flex-wrap">
                                                {suggestedKeywords.map((keyword) => (
                                                    <button key={keyword} onClick={() => handleKeywordAdd(keyword)} className="bg-[#ecefff] px-1 py-0.5 rounded hover:bg-[#dce0ff] transition-colors">
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
                                <button onClick={() => setSelectedComment('all')} className="flex gap-1.5 items-center">
                                    <div className={`w-4 h-4 rounded-full border-[${selectedComment === 'all' ? '5' : '1'}px] border-[${selectedComment === 'all' ? '#5e51ff' : '#1F1551'}]`} />
                                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424]">댓글을 달기만 하면 모두 전송</p>
                                </button>
                            </div>

                            {/* Public Reply Section */}
                            <div className="bg-[#f6f6f6] rounded px-4 py-3 flex flex-col gap-3">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">대댓글 남기기</p>
                                        <div className="flex gap-1 items-center">
                                            <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#707070] leading-[18px]">필수 3개를 설정해야 랜덤으로 발송돼요!</p>
                                            <HelpCircle className="w-3 h-3 text-[#bbbbbb]" />
                                        </div>
                                    </div>
                                    <button onClick={() => setPublicReplyEnabled(!publicReplyEnabled)} className="h-6 w-12 shrink-0 relative">
                                        <div className={`absolute inset-0 rounded-full transition-colors ${publicReplyEnabled ? 'bg-[#5e51ff]' : 'bg-[#e0e0e0]'}`} />
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${publicReplyEnabled ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
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

                    {/* STEP 3: DM 메시지 */}
                    <div className={`flex flex-col mt-6 transition-opacity cursor-pointer ${activeStep === 3 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`} ref={step3Ref} onClick={() => handleStepClick(3)}>
                        <div className="bg-white px-4 py-3 border-b border-[#f0f0f0]">
                            <div className="flex gap-2 items-center">
                                <div className="bg-white border border-[#7273ff] px-2 py-0.5 rounded">
                                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#7273ff] leading-[18px]">STEP 3</p>
                                </div>
                                <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">어떤 메시지를 보낼까요?</p>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-2">
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
                                        />
                                    </div>
                                    {errors.dmMessage && (
                                        <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#d32f2f]">{errors.dmMessage}</p>
                                    )}
                                </div>

                                {/* Button Settings */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-1 items-center">
                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">버튼 설정 (최대 3개)</p>
                                        <HelpCircle className="w-3 h-3 text-[#bbbbbb]" />
                                    </div>
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
                                            <HelpCircle className="w-3 h-3 text-[#bbbbbb]" />
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); setFollowCheckEnabled(!followCheckEnabled); }} className="h-6 w-12 shrink-0 relative">
                                            <div className={`absolute inset-0 rounded-full transition-colors ${followCheckEnabled ? 'bg-[#5e51ff]' : 'bg-[#e0e0e0]'}`} />
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${followCheckEnabled ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>

                                    {followCheckEnabled && (
                                        <>
                                            <div className="flex flex-col gap-3">
                                                <div className="bg-white border border-[#e0e0e0] rounded p-2 relative">
                                                    <textarea
                                                        className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none resize-none min-h-[80px]"
                                                        value={followCheckMessage}
                                                        onChange={(e) => setFollowCheckMessage(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                                <div className="bg-white border border-[#e0e0e0] rounded h-10 px-2.5 flex items-center">
                                                    <input
                                                        type="text"
                                                        className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none placeholder:text-[#bbb]"
                                                        value={followCheckButton}
                                                        onChange={(e) => setFollowCheckButton(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            </div>

                                            <div className="h-px bg-[#e0e0e0] w-full" />

                                            <button onClick={(e) => { e.stopPropagation(); setNonFollowerAccordionOpen(!nonFollowerAccordionOpen); }} className="flex items-center justify-between w-full">
                                                <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">미팔로워에게 보낼 메시지</p>
                                                <ChevronDown className={`w-4 h-4 text-[#242424] transition-transform ${nonFollowerAccordionOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {nonFollowerAccordionOpen && (
                                                <div className="flex flex-col gap-2 w-full">
                                                    <div className="bg-white border border-[#e0e0e0] rounded p-2 relative">
                                                        <textarea
                                                            className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none resize-none min-h-[60px]"
                                                            value={nonFollowerMessage}
                                                            onChange={(e) => setNonFollowerMessage(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    <div className="bg-white border border-[#e0e0e0] rounded h-10 px-2.5 flex items-center">
                                                        <input
                                                            type="text"
                                                            className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] leading-[22px] focus:outline-none placeholder:text-[#bbb]"
                                                            value={nonFollowerButton}
                                                            onChange={(e) => setNonFollowerButton(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 4: 인플루언서에게 전달할 문구 (NEW) */}
                    <div className={`flex flex-col mt-6 transition-opacity cursor-pointer ${activeStep === 4 ? 'opacity-100' : 'opacity-50'} ${!isEditMode ? 'pointer-events-none opacity-70' : ''}`} ref={step4Ref} onClick={() => handleStepClick(4)}>
                        <div className="bg-white px-4 py-3 border-b border-[#f0f0f0]">
                            <div className="flex gap-2 items-center">
                                <div className="bg-white border border-[#f57c00] px-2 py-0.5 rounded">
                                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#f57c00] leading-[18px]">STEP 4</p>
                                </div>
                                <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">인플루언서에게 전달할 문구</p>
                                <span className="px-1.5 py-0.5 bg-[#fff3e0] rounded text-[10px] text-[#f57c00] font-medium">B2B</span>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-2 pb-96">
                            <div className="bg-[#fff8f0] border border-[#ffe0b2] rounded px-4 py-3 flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px]">인플루언서 가이드 메시지</p>
                                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#707070] leading-[18px]">
                                        인플루언서가 팔로워에게 보내는 DM 작성 시 참고할 가이드라인입니다.
                                    </p>
                                </div>
                                <div className="bg-white border border-[#e0e0e0] rounded p-2 relative">
                                    <textarea
                                        className="w-full font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px] focus:outline-none resize-none min-h-[120px]"
                                        placeholder="예시:&#10;• 브랜드 톤앤매너를 유지해 주세요&#10;• 할인 코드 'SUMMER20'을 반드시 언급해 주세요&#10;• 제품의 주요 특징 3가지를 포함해 주세요"
                                        value={influencerGuide}
                                        onChange={(e) => setInfluencerGuide(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <div className="bg-[#fff3e0] rounded p-2.5 flex items-start gap-2">
                                    <span className="text-[#f57c00]">💡</span>
                                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#795548]">
                                        이 가이드는 인플루언서에게만 전달되며, 팔로워에게 보내는 DM에는 포함되지 않습니다.
                                        인플루언서는 이 가이드를 참고하여 본인만의 스타일로 메시지를 작성합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Preview */}
                <div className="flex-1 bg-[#fafafa] flex flex-col items-center overflow-y-auto min-w-0">
                    <div className="bg-white w-full border-b border-[#f0f0f0] flex items-center pt-2.5 px-8 shrink-0 gap-6">
                        <button onClick={() => setRightPanelTab('preview')} className={`px-1 py-2 ${rightPanelTab === 'preview' ? 'border-b-2 border-[#5e51ff]' : ''}`}>
                            <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">미리보기</p>
                        </button>
                        <button onClick={() => setRightPanelTab('insights')} className={`px-1 py-2 ${rightPanelTab === 'insights' ? 'border-b-2 border-[#5e51ff]' : ''}`}>
                            <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">인사이트</p>
                        </button>
                    </div>

                    {rightPanelTab === 'preview' && (
                        <>
                            <div className="flex items-center pt-5 px-8 w-full shrink-0">
                                <div className="bg-white border border-[#e0e0e0] flex gap-1 p-1 rounded">
                                    <button className={`h-6 px-2.5 rounded transition-colors ${currentTab === 'post' ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'}`} onClick={() => setCurrentTab('post')}>
                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">게시물</p>
                                    </button>
                                    <button className={`h-6 px-2.5 rounded transition-colors ${currentTab === 'comment' ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'}`} onClick={() => setCurrentTab('comment')}>
                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">댓글</p>
                                    </button>
                                    <button className={`h-6 px-2.5 rounded transition-colors ${currentTab === 'dm' ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'}`} onClick={() => setCurrentTab('dm')}>
                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">DM</p>
                                    </button>
                                </div>
                            </div>

                            {/* iPhone Preview */}
                            <div className="w-[393px] h-[755px] rounded-[56px] border-[10px] border-[#f6f6f6] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.12),0px_8px_16px_0px_rgba(0,0,0,0.14)] overflow-hidden mt-10 mb-10">
                                <div className="bg-white flex flex-col h-full p-2.5">
                                    <div className="bg-white h-11 flex items-center justify-between px-4 shrink-0">
                                        <p className="font-semibold text-[17px] text-black">9:41</p>
                                        <div className="flex gap-1.5 items-center">
                                            <div className="flex gap-[2px]">
                                                <div className="w-[3px] h-2 bg-black rounded-sm" />
                                                <div className="w-[3px] h-2.5 bg-black rounded-sm" />
                                                <div className="w-[3px] h-3 bg-black rounded-sm" />
                                                <div className="w-[3px] h-3.5 bg-black rounded-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-white flex flex-col overflow-hidden relative">
                                        {currentTab === 'post' && (
                                            <div className="bg-[#ebebeb] w-full aspect-square flex flex-col gap-3 items-center justify-center px-4">
                                                <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#424242] text-center leading-[24px]">자동화 설정할 게시물을 선택해 주세요!</p>
                                                <button className="bg-white border border-[#e0e0e0] h-8 px-3 rounded hover:bg-gray-50 transition-colors">
                                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#242424]">게시물 불러오기</p>
                                                </button>
                                            </div>
                                        )}

                                        {currentTab === 'comment' && (
                                            <div className="flex-1 p-4">
                                                <div className="bg-[#f0f0f0] rounded-lg p-3 mb-2">
                                                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#424242]">댓글 미리보기</p>
                                                </div>
                                                {publicReplyEnabled && publicReplies[0] && (
                                                    <div className="ml-8 bg-[#e8f5e9] rounded-lg p-3">
                                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#2e7d32]">{publicReplies[0]}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {currentTab === 'dm' && (
                                            <div className="flex-1 bg-[#fafafa] p-4">
                                                <div className="bg-white rounded-lg p-3 shadow-sm mb-3 max-w-[280px]">
                                                    <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] whitespace-pre-wrap leading-[22px]">
                                                        {dmMessage || 'DM 메시지가 여기에 표시됩니다'}
                                                    </p>
                                                </div>
                                                {dmButtons.filter(b => b.text.trim()).map((button, index) => (
                                                    <div key={index} className="bg-[#5e51ff] rounded-lg px-4 py-2.5 text-center shadow-sm mb-2 max-w-[280px]">
                                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">{button.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {rightPanelTab === 'insights' && (
                        <div className="flex-1 p-8 w-full">
                            <div className="bg-white rounded-lg border border-[#e0e0e0] p-6">
                                <p className="font-['Pretendard:Medium',sans-serif] text-lg text-[#242424] mb-4">성과 인사이트</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-[#fafafa] rounded-lg p-4">
                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070]">총 발송</p>
                                        <p className="font-['Pretendard:Bold',sans-serif] text-2xl text-[#242424]">1,250</p>
                                    </div>
                                    <div className="bg-[#fafafa] rounded-lg p-4">
                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070]">클릭</p>
                                        <p className="font-['Pretendard:Bold',sans-serif] text-2xl text-[#242424]">892</p>
                                    </div>
                                    <div className="bg-[#fafafa] rounded-lg p-4">
                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070]">CTR</p>
                                        <p className="font-['Pretendard:Bold',sans-serif] text-2xl text-[#5e51ff]">71.5%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Influencer Performance Table - shown when showInfluencerTable is true */}
            {showInfluencerTable && (
                <div className="border-t border-[#e0e0e0] bg-white">
                    <div className="max-w-7xl mx-auto">
                        {/* Table Header */}
                        <div className="px-6 py-4 border-b border-[#f0f0f0] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-[#5e51ff]" />
                                <h2 className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">
                                    참여 인플루언서 및 성과
                                </h2>
                                <span className="text-sm text-[#707070]">
                                    {influencers.length}명
                                </span>
                            </div>

                            {selectedInfluencers.length > 0 ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-[#5e51ff]">
                                        {selectedInfluencers.length}명 선택됨
                                    </span>
                                    <CoreButton
                                        variant="primary"
                                        size="sm"
                                        leftIcon={<Send className="w-4 h-4" />}
                                        onClick={handleDeliver}
                                    >
                                        템플릿 전달
                                    </CoreButton>
                                </div>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Send className="w-4 h-4 text-[#707070]" />
                                        <span className="text-sm text-[#707070]">발송: {formatNumber(totalSent)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MousePointer className="w-4 h-4 text-[#707070]" />
                                        <span className="text-sm text-[#707070]">클릭: {formatNumber(totalClicks)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-[#707070]" />
                                        <span className="text-sm text-[#707070]">평균 CPV: {avgCpv.toFixed(0)}원</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Table Content */}
                        {influencers.length === 0 ? (
                            <div className="py-16 text-center">
                                <Users className="w-12 h-12 text-[#bbbbbb] mx-auto mb-4" />
                                <p className="text-[#707070]">참여 인플루언서가 없습니다</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[#f0f0f0] bg-[#fafafa]">
                                                <th className="w-12 px-6 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedInfluencers.length === influencers.length && influencers.length > 0}
                                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                                        className="w-4 h-4 rounded border-[#e0e0e0] text-[#5e51ff] focus:ring-[#5e51ff]"
                                                    />
                                                </th>
                                                <th className="text-left px-4 py-3 text-xs font-medium text-[#707070]">연동</th>
                                                <th className="text-left px-4 py-3 text-xs font-medium text-[#707070]">인플루언서</th>
                                                <th className="text-left px-4 py-3 text-xs font-medium text-[#707070]">상태</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[#707070]">발송 수</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[#707070]">클릭 수</th>
                                                <th className="text-right px-4 py-3 text-xs font-medium text-[#707070]">CPV</th>
                                                <th className="text-right px-6 py-3 text-xs font-medium text-[#707070]">CPE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {influencers.map((influencer) => (
                                                <tr key={influencer.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa]">
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedInfluencers.includes(influencer.id)}
                                                            onChange={(e) => handleSelectOne(influencer.id, e.target.checked)}
                                                            className="w-4 h-4 rounded border-[#e0e0e0] text-[#5e51ff] focus:ring-[#5e51ff]"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {influencer.isConnected ? (
                                                            <div className="w-6 h-6 rounded-full bg-[#e8f5e9] flex items-center justify-center" title="연동됨">
                                                                <Link className="w-3.5 h-3.5 text-[#2e7d32]" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-6 h-6 rounded-full bg-[#f5f5f5] flex items-center justify-center" title="미연동">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#bbbbbb]" />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <CoreAvatar src={influencer.profileImage} name={influencer.displayName} size="sm" />
                                                            <div>
                                                                <p className="text-sm font-medium text-[#242424]">{influencer.displayName}</p>
                                                                <p className="text-xs text-[#707070]">@{influencer.username}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <CoreStatusBadge
                                                            colorType={
                                                                influencer.status === 'clicked' ? 'success' :
                                                                    influencer.status === 'read' ? 'informative' :
                                                                        influencer.status === 'delivered' ? 'informative' :
                                                                            influencer.status === 'sent' ? 'warning' : 'default'
                                                            }
                                                            type="tint"
                                                            size="sm"
                                                        >
                                                            {influencer.status === 'clicked' ? '클릭됨' :
                                                                influencer.status === 'read' ? '읽음' :
                                                                    influencer.status === 'delivered' ? '전달됨' :
                                                                        influencer.status === 'sent' ? '발송됨' : '대기'}
                                                        </CoreStatusBadge>
                                                    </td>
                                                    <td className="px-4 py-4 text-right text-sm text-[#707070]">
                                                        {formatNumber(influencer.sentCount)}
                                                    </td>
                                                    <td className="px-4 py-4 text-right text-sm text-[#707070]">
                                                        {formatNumber(influencer.clickCount)}
                                                    </td>
                                                    <td className="px-4 py-4 text-right text-sm text-[#707070]">
                                                        {influencer.cpv ? `${influencer.cpv}원` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm text-[#707070]">
                                                        {influencer.cpe ? `${influencer.cpe}원` : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-between px-6 py-4 border-t border-[#f0f0f0]">
                                    <select
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                        className="h-8 px-2 border border-[#e0e0e0] rounded text-[13px] text-[#707070] bg-white"
                                    >
                                        <option value={25}>25 / page</option>
                                        <option value={50}>50 / page</option>
                                        <option value={100}>100 / page</option>
                                    </select>

                                    <div className="flex items-center gap-1">
                                        <CoreButton variant="tertiary" size="xs">
                                            <ChevronLeft className="w-4 h-4" />
                                        </CoreButton>
                                        <span className="px-3 text-[13px] font-medium text-[#242424]">{currentPage}</span>
                                        <CoreButton variant="tertiary" size="xs">
                                            <ChevronRight className="w-4 h-4" />
                                        </CoreButton>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            {showExitModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h3 className="font-['Pretendard:Medium',sans-serif] text-lg text-[#242424] mb-2">정말 나가시겠습니까?</h3>
                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070] mb-6">저장되지 않은 변경사항이 있습니다.</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowExitModal(false)} className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors">
                                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                            </button>
                            <button onClick={confirmExit} className="h-10 px-4 rounded bg-[#d32f2f] hover:bg-[#c62828] transition-colors">
                                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">나가기</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DeployConfirmModal isOpen={showDeployModal} onClose={() => setShowDeployModal(false)} onConfirm={handleDeployConfirm} />
        </div>
    );
}
