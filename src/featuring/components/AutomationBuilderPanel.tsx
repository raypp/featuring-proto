import { useState, useEffect, useRef } from "react";
import { HelpCircle, Lock, ChevronDown } from "lucide-react";
import { DMTemplate } from "../types";

interface ValidationErrors {
    post?: string;
    keywords?: string;
    dmMessage?: string;
    followCheck?: string;
    influencerGuide?: string;
}

interface AutomationBuilderPanelProps {
    mode: 'default' | 'selection';
    selectedCount: number;
    initialData?: DMTemplate;
    onChange: (field: string, value: any) => void;
    onLoadTemplate?: () => void;
    onSaveTemplate?: () => void;
    onApply?: () => void; // New prop for applying changes
}

export function AutomationBuilderPanel({
    mode,
    selectedCount,
    initialData,
    onChange,
    onLoadTemplate,
    onSaveTemplate,
    onApply
}: AutomationBuilderPanelProps) {
    // Local state for UI interactions (accordions, inputs)
    // We lift the actual data state up to the parent or sync via onChange, 
    // but for complex forms it's often easier to keep local state and sync effect-wise,
    // or receive "data" prop and use that.
    // Given the requirement "Master Builder", let's assume this component controls the "Master Template".

    // We'll use local state initialized from initialData for the form fields
    const [templateData, setTemplateData] = useState<DMTemplate>(initialData || {
        id: 0,
        automationGroupId: 0,
        dmGuide: '',
        ctaLinks: [{ buttonName: '', url: '' }, { buttonName: '', url: '' }, { buttonName: '', url: '' }],
        status: 'draft',
        lastModified: '',
        triggerKeywords: [],
        publicReplyTexts: [],
        publicReplyActive: false
    });

    const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
    const [keywordInput, setKeywordInput] = useState('');
    const [selectedComment, setSelectedComment] = useState<'keyword' | 'all'>('keyword');
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Derived states
    const keywords = templateData.triggerKeywords || [];
    const dmButtons = templateData.ctaLinks || [];
    const publicReplies = templateData.publicReplyTexts || [];
    const publicReplyEnabled = templateData.publicReplyActive || false;
    const dmMessage = templateData.dmGuide || '';

    // Effects to sync changes to parent
    useEffect(() => {
        // In a real app, we might debounce this
        // onChange('template', templateData); 
        // For now, we'll just expose specific handlers
    }, [templateData, onChange]);

    const updateField = (field: keyof DMTemplate, value: any) => {
        const newData = { ...templateData, [field]: value };
        setTemplateData(newData);
        onChange(field as string, value);
    };

    const handleStepClick = (step: 1 | 2 | 3 | 4) => {
        setActiveStep(step);
    };

    const handleKeywordAdd = (keyword: string) => {
        if (keyword && !keywords.includes(keyword)) {
            updateField('triggerKeywords', [...keywords, keyword]);
        }
    };

    const handleKeywordRemove = (keyword: string) => {
        updateField('triggerKeywords', keywords.filter(k => k !== keyword));
    };

    const handleButtonChange = (index: number, field: 'buttonName' | 'url', value: string) => {
        const newButtons = [...dmButtons];
        // Ensure array has up to 3 elements
        while (newButtons.length <= index) {
            newButtons.push({ buttonName: '', url: '' });
        }

        if (!newButtons[index]) newButtons[index] = { buttonName: '', url: '' };
        newButtons[index] = { ...newButtons[index], [field]: value };
        updateField('ctaLinks', newButtons);
    };

    return (
        <div className={`flex flex-col h-full bg-white border-r border-[#e0e0e0] overflow-hidden transition-colors ${mode === 'selection' ? 'border-r-2 border-r-[#5e51ff]' : ''}`}>
            {/* Header */}
            <div className={`px-5 py-4 border-b border-[#f0f0f0] shrink-0 ${mode === 'selection' ? 'bg-[#f0eaff]' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-['Pretendard:Bold',sans-serif] text-lg ${mode === 'selection' ? 'text-[#5e51ff]' : 'text-[#242424]'}`}>
                        {mode === 'selection' ? `${selectedCount}명 일괄 편집` : '공통 규칙 (Master)'}
                    </h3>
                    {mode === 'default' && (
                        <div className="flex gap-2">
                            <button onClick={onLoadTemplate} className="text-xs text-[#5e51ff] hover:underline font-['Pretendard:Medium',sans-serif]">
                                📂 불러오기
                            </button>
                            <button onClick={onSaveTemplate} className="text-xs text-[#5e51ff] hover:underline font-['Pretendard:Medium',sans-serif]">
                                💾 저장
                            </button>
                        </div>
                    )}
                </div>
                {mode === 'selection' && (
                    <button
                        onClick={onApply}
                        className="w-full mt-1 mb-2 py-2 bg-[#5e51ff] text-white text-sm font-bold rounded hover:bg-[#4b41cc] shadow-sm transition-colors"
                    >
                        선택한 {selectedCount}명에게 템플릿 적용하기
                    </button>
                )}
                <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#757575]">
                    {mode === 'selection'
                        ? '설정 후 위 버튼을 눌러야 적용됩니다.'
                        : '여기서 설정하면 우측 `기본` 항목에 일괄 적용됩니다.'}
                </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                    {/* STEP 1: 게시물 선택 (Simplified) */}
                    <div className={`border-b border-[#f0f0f0] ${mode === 'selection' ? 'bg-[#f8f8ff]' : ''}`}>
                        <div
                            className={`px-5 py-3 cursor-pointer flex justify-between items-center ${activeStep === 1 ? 'bg-[#f9f9f9]' : ''}`}
                            onClick={() => handleStepClick(1)}
                        >
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold text-[#7273ff]">STEP 1</span>
                                <span className="text-sm font-medium text-[#242424]">게시물 선택</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#bdbdbd] transition-transform ${activeStep === 1 ? 'rotate-180' : ''}`} />
                        </div>
                        {activeStep === 1 && (
                            <div className="px-5 py-3 bg-[#f9f9f9]">
                                <div className="bg-white border border-[#e0e0e0] rounded p-3 text-center">
                                    <p className="text-xs text-[#757575] mb-2">연동된 인플루언서 게시물을 불러옵니다</p>
                                    <button className="px-3 py-1.5 bg-white border border-[#d0d0d0] rounded text-xs text-[#242424] hover:bg-gray-50">
                                        게시물 불러오기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* STEP 2: 댓글 트리거 */}
                    <div className={`border-b border-[#f0f0f0] ${mode === 'selection' ? 'bg-[#f8f8ff]' : ''}`}>
                        <div
                            className={`px-5 py-3 cursor-pointer flex justify-between items-center ${activeStep === 2 ? 'bg-[#f9f9f9]' : ''}`}
                            onClick={() => handleStepClick(2)}
                        >
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold text-[#7273ff]">STEP 2</span>
                                <span className="text-sm font-medium text-[#242424]">댓글 트리거</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#bdbdbd] transition-transform ${activeStep === 2 ? 'rotate-180' : ''}`} />
                        </div>
                        {activeStep === 2 && (
                            <div className="px-5 py-3 bg-[#f9f9f9] flex flex-col gap-3">
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" checked={selectedComment === 'keyword'} onChange={() => setSelectedComment('keyword')} className="text-[#5e51ff]" />
                                        <span className="text-sm text-[#242424]">특정 키워드</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" checked={selectedComment === 'all'} onChange={() => setSelectedComment('all')} className="text-[#5e51ff]" />
                                        <span className="text-sm text-[#242424]">모든 댓글</span>
                                    </label>
                                </div>
                                {selectedComment === 'keyword' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-white border border-[#e0e0e0] rounded px-2 py-1.5 flex flex-wrap gap-1 min-h-[36px]">
                                            {keywords.map(k => (
                                                <span key={k} className="bg-[#eff8f7] text-[#264d4a] text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    {k}
                                                    <button onClick={() => handleKeywordRemove(k)} className="hover:text-red-500">×</button>
                                                </span>
                                            ))}
                                            <input
                                                className="flex-1 min-w-[60px] text-xs outline-none"
                                                placeholder="키워드 입력"
                                                value={keywordInput}
                                                onChange={(e) => setKeywordInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && keywordInput.trim()) {
                                                        handleKeywordAdd(keywordInput.trim());
                                                        setKeywordInput('');
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* STEP 3: DM 메시지 */}
                    <div className={`border-b border-[#f0f0f0] ${mode === 'selection' ? 'bg-[#f8f8ff]' : ''}`}>
                        <div
                            className={`px-5 py-3 cursor-pointer flex justify-between items-center ${activeStep === 3 ? 'bg-[#f9f9f9]' : ''}`}
                            onClick={() => handleStepClick(3)}
                        >
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold text-[#7273ff]">STEP 3</span>
                                <span className="text-sm font-medium text-[#242424]">DM 메시지 & 버튼</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#bdbdbd] transition-transform ${activeStep === 3 ? 'rotate-180' : ''}`} />
                        </div>
                        {activeStep === 3 && (
                            <div className="px-5 py-3 bg-[#f9f9f9] flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-[#424242]">DM 메시지</label>
                                    <textarea
                                        className="w-full h-24 p-2 text-sm border border-[#e0e0e0] rounded resize-none focus:border-[#5e51ff] focus:outline-none"
                                        value={dmMessage}
                                        onChange={(e) => updateField('dmGuide', e.target.value)}
                                        placeholder="보낼 메시지를 입력하세요 ({{닉네임}} 사용 가능)"
                                    />
                                    <p className="text-[10px] text-[#9e9e9e] text-right">변수: {'{{닉네임}}'} 사용 가능</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-[#424242]">버튼 버튼 (최대 3개)</label>
                                    </div>
                                    {[0, 1, 2].map((index) => (
                                        <div key={index} className="flex flex-col gap-1">
                                            <div className="flex gap-1">
                                                <input
                                                    className="flex-1 p-2 text-xs border border-[#e0e0e0] rounded focus:border-[#5e51ff] outline-none"
                                                    placeholder={`버튼 ${index + 1} 이름`}
                                                    value={dmButtons[index]?.buttonName || ''}
                                                    onChange={(e) => handleButtonChange(index, 'buttonName', e.target.value)}
                                                />
                                                <input
                                                    className="flex-[2] p-2 text-xs border border-[#e0e0e0] rounded focus:border-[#5e51ff] outline-none"
                                                    placeholder="URL (https://...)"
                                                    value={dmButtons[index]?.url || ''}
                                                    onChange={(e) => handleButtonChange(index, 'url', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
