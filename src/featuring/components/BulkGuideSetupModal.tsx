import { useState, useMemo, useEffect } from "react";
import {
    X,
    ChevronLeft,
    ChevronRight,
    Send,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Clock,
    Image as ImageIcon,
    Type,
    FileText,
    AtSign,
    User,
    Link as LinkIcon,
    Plus,
    Trash2,
    Copy,
    ExternalLink,
    Check
} from "lucide-react";
import { CoreButton, CoreAvatar } from "../../design-system";
import { DMRecipient, DMTemplate, CTALink } from "../types";

interface BulkGuideSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipients: DMRecipient[];
    templates: DMTemplate[];
    onSend: (data: {
        recipientIds: number[];
        messageContent: string;
        imageUrl?: string;
        ctaLinks: CTALink[];
        isAdContent: boolean;
        sendType: 'immediate' | 'scheduled';
        scheduledAt?: string;
        individualLinks?: Array<{
            influencerId: number;
            ctaLinks: CTALink[];
        }>;
    }) => void;
    onSaveDraft?: (data: any) => void;
}

type Step = 1 | 2 | 3 | 4 | 5;
type ComposerTab = 'direct' | 'template';

const PERSONALIZATION_VARIABLES = [
    { key: '{{닉네임}}', label: '닉네임' },
    { key: '{{채널명}}', label: '채널명' },
    { key: '{{사용자명}}', label: '사용자명' },
];

export function BulkGuideSetupModal({
    isOpen,
    onClose,
    recipients: initialRecipients,
    templates,
    onSend,
    onSaveDraft
}: BulkGuideSetupModalProps) {
    const [currentStep, setCurrentStep] = useState<Step>(1);

    // Step 1: Recipients
    const [recipients, setRecipients] = useState<DMRecipient[]>(initialRecipients);

    // Step 2: Guide Settings
    const [composerTab, setComposerTab] = useState<ComposerTab>('direct');
    const [messageContent, setMessageContent] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [ctaLinks, setCtaLinks] = useState<CTALink[]>([{ buttonName: "", url: "" }]);
    const [useDifferentLinks, setUseDifferentLinks] = useState(false);

    // Step 3: Individual Links
    const [individualLinks, setIndividualLinks] = useState<Record<number, CTALink[]>>({});

    // Step 4: Send Settings
    const [sendType, setSendType] = useState<'immediate' | 'scheduled' | 'generate_link'>('immediate');
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [isAdContent, setIsAdContent] = useState(false);

    // Step 5: Generated Links
    const [generatedLinks, setGeneratedLinks] = useState<Array<{ influencerId: number; name: string; link: string }>>([]);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    // Sync recipients
    useEffect(() => {
        if (isOpen) {
            setRecipients(initialRecipients);
            setCurrentStep(1);
            // Reset other states if needed
        }
    }, [isOpen, initialRecipients]);

    // Computed
    const validRecipients = useMemo(() => recipients.filter(r => r.isValid), [recipients]);
    const invalidRecipients = useMemo(() => recipients.filter(r => !r.isValid), [recipients]);

    // Initialize individual links when entering Step 3
    useEffect(() => {
        if (currentStep === 3 && useDifferentLinks) {
            const initialLinks: Record<number, CTALink[]> = {};
            validRecipients.forEach(r => {
                // Determine base links to copy: try to keep structure
                const baseLinks = ctaLinks.map(link => ({ ...link }));
                initialLinks[r.influencerId] = individualLinks[r.influencerId] || baseLinks;
            });
            setIndividualLinks(initialLinks);
        }
    }, [currentStep, useDifferentLinks, validRecipients]);

    // Handlers
    const handleAddLink = () => {
        if (ctaLinks.length < 3) {
            setCtaLinks([...ctaLinks, { buttonName: "", url: "" }]);
        }
    };

    const handleRemoveLink = (index: number) => {
        setCtaLinks(ctaLinks.filter((_, i) => i !== index));
    };

    const handleLinkChange = (index: number, field: keyof CTALink, value: string) => {
        const newLinks = [...ctaLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setCtaLinks(newLinks);
    };

    const handleSelectTemplate = (template: DMTemplate) => {
        setSelectedTemplateId(template.id ?? null);
        setMessageContent(template.dmGuide);
        setImageUrl(template.imageUrl);
        setCtaLinks(template.ctaLinks && template.ctaLinks.length > 0 ? template.ctaLinks : [{ buttonName: "", url: "" }]);
    };

    const handleNext = () => {
        if (currentStep === 2 && !useDifferentLinks) {
            setCurrentStep(4); // Skip Step 3
        } else if (currentStep < 4) {
            setCurrentStep((currentStep + 1) as Step);
        }
    };

    const handlePrev = () => {
        if (currentStep === 4 && !useDifferentLinks) {
            setCurrentStep(2); // Skip Step 3 back
        } else if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step);
        }
    };

    const handleGenerateLinks = () => {
        // Mock generation
        const links = validRecipients.map(r => ({
            influencerId: r.influencerId,
            name: r.displayName,
            link: `https://featuring.co/guide/${Math.random().toString(36).substring(7)}`
        }));
        setGeneratedLinks(links);
        setCurrentStep(5);
    };

    const handleCopyLink = (link: string, id: number) => {
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleCopyAllLinks = () => {
        const text = generatedLinks.map(l => `${l.name}\t${l.link}`).join('\n');
        navigator.clipboard.writeText(text);
        alert('전체 링크가 복사되었습니다. (엑셀 등에 붙여넣기 하세요)');
    };

    const handleSend = () => {
        if (sendType === 'generate_link') {
            handleGenerateLinks();
            return;
        }

        let scheduledAt: string | undefined;
        if (sendType === 'scheduled' && scheduledDate && scheduledTime) {
            scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
        }

        const formattedIndividualLinks = useDifferentLinks ?
            Object.entries(individualLinks).map(([id, links]) => ({
                influencerId: Number(id),
                ctaLinks: links
            })) : undefined;

        onSend({
            recipientIds: validRecipients.map(r => r.influencerId),
            messageContent,
            imageUrl,
            ctaLinks,
            isAdContent,
            sendType: sendType === 'scheduled' ? 'scheduled' : 'immediate',
            scheduledAt,
            individualLinks: formattedIndividualLinks
        });
        onClose();
    };

    // Validation
    const canProceedStep1 = validRecipients.length > 0;
    const canProceedStep2 = messageContent.trim().length > 0; // Links are optional
    const canProceedStep3 = true; // Always proceed, input validation can be strict or loose
    const canProceedStep4 = sendType === 'immediate' || sendType === 'generate_link' || (!!scheduledDate && !!scheduledTime);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-[900px] h-[800px] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-gray-900">
                            {currentStep === 5 ? '가이드 링크 생성 완료' : '일괄 가이드 설정'}
                        </h2>
                        {/* Stepper (Hide in Step 5) */}
                        {currentStep < 5 && (
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className={`flex items-center ${step === 3 && !useDifferentLinks ? 'hidden' : ''}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep === step ? 'bg-[var(--ft-color-primary-500)] text-white' :
                                            currentStep > step ? 'bg-[var(--ft-color-primary-100)] text-[var(--ft-color-primary-600)]' :
                                                'bg-gray-100 text-gray-400'
                                            }`}>
                                            {currentStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                                        </div>
                                        {step < 4 && (step !== 2 || useDifferentLinks) && (
                                            <div className="w-8 h-0.5 mx-1 bg-gray-200" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto">
                    {/* Step 1: Recipients */}
                    {currentStep === 1 && (
                        <div className="p-6">
                            <div className="mb-6 p-4 bg-[var(--ft-color-primary-50)] rounded-xl">
                                <div className="flex items-center gap-2 text-[var(--ft-color-primary-700)]">
                                    <Send className="w-5 h-5" />
                                    <span className="font-medium">
                                        총 {validRecipients.length}명의 인플루언서에게 전달합니다.
                                    </span>
                                </div>
                                {invalidRecipients.length > 0 && (
                                    <p className="mt-2 text-sm text-orange-600">
                                        * {invalidRecipients.length}명은 계정 미연결 등의 사유로 제외됩니다.
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                {recipients.map(r => (
                                    <div key={r.influencerId} className={`flex items-center justify-between p-3 border rounded-lg ${r.isValid ? 'bg-white' : 'bg-gray-50'}`}>
                                        <div className="flex items-center gap-3">
                                            {r.profileImage ? <img src={r.profileImage} className="w-10 h-10 rounded-md object-cover" /> : <CoreAvatar name={r.displayName} />}
                                            <div>
                                                <div className="font-medium">{r.displayName}</div>
                                                <div className="text-xs text-gray-500">@{r.username}</div>
                                            </div>
                                            {!r.isValid && <span className="text-xs text-orange-500 font-medium">{r.invalidReason}</span>}
                                        </div>
                                        <button onClick={() => setRecipients(prev => prev.filter(p => p.influencerId !== r.influencerId))} className="p-2 hover:bg-gray-100 rounded">
                                            <X className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Guide Settings */}
                    {currentStep === 2 && (
                        <div className="flex h-full">
                            <div className="flex-1 p-6 border-r overflow-y-auto">
                                <div className="flex gap-2 mb-6">
                                    <button onClick={() => setComposerTab('direct')} className={`px-4 py-2 rounded-lg text-sm font-medium ${composerTab === 'direct' ? 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-600)]' : 'text-gray-500 hover:bg-gray-100'}`}>직접 작성</button>
                                    <button onClick={() => setComposerTab('template')} className={`px-4 py-2 rounded-lg text-sm font-medium ${composerTab === 'template' ? 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-600)]' : 'text-gray-500 hover:bg-gray-100'}`}>템플릿 불러오기</button>
                                </div>

                                {composerTab === 'template' && (
                                    <div className="mb-6 grid grid-cols-2 gap-3">
                                        {templates.map(t => (
                                            <div key={t.id} onClick={() => handleSelectTemplate(t)} className={`p-3 border rounded-lg cursor-pointer hover:border-[var(--ft-color-primary-300)] ${selectedTemplateId === t.id ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)]' : ''}`}>
                                                <div className="font-medium text-sm">{t.name}</div>
                                                <div className="text-xs text-gray-500 truncate">{t.dmGuide}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">가이드 메시지</label>
                                        <div className="relative">
                                            <textarea
                                                className="w-full h-40 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:border-[var(--ft-color-primary-500)]"
                                                placeholder="가이드 내용을 입력하세요"
                                                value={messageContent}
                                                onChange={(e) => setMessageContent(e.target.value)}
                                            />
                                            <div className="absolute bottom-3 left-3 flex gap-2">
                                                {PERSONALIZATION_VARIABLES.map(v => (
                                                    <button key={v.key} onClick={() => setMessageContent(prev => prev + v.key)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">{v.label}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">이미지 (선택)</label>
                                        <div className="flex items-center gap-3">
                                            {imageUrl ? (
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                                                    <img src={imageUrl} className="w-full h-full object-cover" />
                                                    <button onClick={() => setImageUrl(undefined)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"><X className="w-3 h-3" /></button>
                                                </div>
                                            ) : (
                                                <button className="flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg text-gray-400 hover:border-gray-400 hover:text-gray-600">
                                                    <ImageIcon className="w-6 h-6" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">버튼 설정 (최대 3개)</label>
                                            <button onClick={handleAddLink} disabled={ctaLinks.length >= 3} className="text-xs text-[var(--ft-color-primary-600)] flex items-center gap-1 disabled:opacity-50"><Plus className="w-3 h-3" /> 추가</button>
                                        </div>
                                        <div className="space-y-3">
                                            {ctaLinks.map((link, idx) => (
                                                <div key={idx} className="flex gap-2 items-start">
                                                    <div className="flex-1 space-y-2">
                                                        <input
                                                            placeholder="버튼명"
                                                            className="w-full p-2 text-sm border rounded"
                                                            value={link.buttonName}
                                                            onChange={(e) => handleLinkChange(idx, 'buttonName', e.target.value)}
                                                        />
                                                        <input
                                                            placeholder="https://"
                                                            className="w-full p-2 text-sm border rounded"
                                                            value={link.url}
                                                            onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
                                                        />
                                                    </div>
                                                    <button onClick={() => handleRemoveLink(idx)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={useDifferentLinks} onChange={(e) => setUseDifferentLinks(e.target.checked)} className="w-4 h-4 text-[var(--ft-color-primary-600)] rounded" />
                                            <span className="text-sm font-medium text-gray-900">각 인플루언서별 버튼 링크 다르게 설정하기</span>
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1 pl-6">체크 시 다음 단계에서 인플루언서마다 다른 링크를 입력할 수 있습니다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="w-[320px] bg-gray-50 p-6 flex items-center justify-center">
                                <div className="w-full bg-white rounded-2xl border shadow-sm overflow-hidden">
                                    <div className="px-4 py-3 border-b bg-white flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500" />
                                        <div className="text-sm font-medium">Preview</div>
                                    </div>
                                    <div className="p-4 bg-white min-h-[300px]">
                                        {imageUrl && <img src={imageUrl} className="w-full rounded-lg mb-2" />}
                                        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-sm text-sm whitespace-pre-wrap">
                                            {messageContent || "메시지를 입력하세요"}
                                        </div>
                                        <div className="mt-2 space-y-1">
                                            {ctaLinks.map((link, i) => link.buttonName && (
                                                <div key={i} className="bg-gray-50 border text-center py-2 rounded text-sm text-blue-500 font-medium">
                                                    {link.buttonName}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Individual Links */}
                    {currentStep === 3 && useDifferentLinks && (
                        <div className="p-6 h-full flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold">인플루언서별 링크 설정</h3>
                                <p className="text-sm text-gray-500">각 인플루언서에게 전달될 버튼 링크를 개별적으로 수정할 수 있습니다.</p>
                            </div>
                            <div className="flex-1 overflow-auto border rounded-lg">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">인플루언서</th>
                                            {ctaLinks.map((link, i) => (
                                                <th key={i} className="px-4 py-3 font-medium">{link.buttonName || `버튼 ${i + 1}`} URL</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {validRecipients.map(r => (
                                            <tr key={r.influencerId} className="bg-white hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <CoreAvatar name={r.displayName} size="xs" />
                                                        <div>
                                                            <div className="font-medium">{r.displayName}</div>
                                                            <div className="text-xs text-gray-500">@{r.username}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {individualLinks[r.influencerId]?.map((link, i) => (
                                                    <td key={i} className="px-4 py-3">
                                                        <input
                                                            className="w-full p-2 border rounded text-xs"
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const newLinks = { ...individualLinks };
                                                                newLinks[r.influencerId][i] = { ...link, url: e.target.value };
                                                                setIndividualLinks(newLinks);
                                                            }}
                                                            placeholder="https://"
                                                        />
                                                    </td>
                                                )) || ctaLinks.map((_, i) => <td key={i} className="px-4 py-3 text-gray-400">설정 불가</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Final Check & Send */}
                    {currentStep === 4 && (
                        <div className="p-6 max-w-2xl mx-auto h-full flex flex-col justify-center">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">발송 준비가 완료되었습니다!</h2>
                                <p className="text-gray-500">설정하신 내용을 마지막으로 확인해주세요.</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 space-y-4 mb-8">
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-gray-600">수신 인원</span>
                                    <span className="font-bold text-lg text-[var(--ft-color-primary-600)]">{validRecipients.length}명</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-gray-600">메시지 타입</span>
                                    <span className="font-medium">{selectedTemplateId ? '템플릿 사용' : '직접 작성'}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-gray-600">개별 링크 설정</span>
                                    <span className="font-medium">{useDifferentLinks ? '적용됨' : '미적용'}</span>
                                </div>

                                <div className="pt-2">
                                    <h3 className="text-sm font-medium mb-3">전달 방식 설정</h3>
                                    <div className="space-y-3">
                                        <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-[var(--ft-color-primary-400)] ${sendType === 'immediate' ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)]' : 'bg-white'}`}>
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="sendType" checked={sendType === 'immediate'} onChange={() => setSendType('immediate')} className="text-[var(--ft-color-primary-600)]" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">즉시 발송 (DM)</span>
                                                    <span className="text-xs text-gray-500">인플루언서의 DM으로 가이드 링크를 즉시 전송합니다.</span>
                                                </div>
                                            </div>
                                            <Send className="w-4 h-4 text-gray-400" />
                                        </label>

                                        <label className={`p-3 border rounded-lg cursor-pointer hover:border-[var(--ft-color-primary-400)] ${sendType === 'scheduled' ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)]' : 'bg-white'}`}>
                                            <div className="flex items-center gap-3 mb-2">
                                                <input type="radio" name="sendType" checked={sendType === 'scheduled'} onChange={() => setSendType('scheduled')} className="text-[var(--ft-color-primary-600)]" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">예약 발송 (DM)</span>
                                                    <span className="text-xs text-gray-500">지정한 시간에 DM을 전송합니다.</span>
                                                </div>
                                            </div>
                                            {sendType === 'scheduled' && (
                                                <div className="pl-6 flex gap-2">
                                                    <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} className="border p-2 rounded text-sm bg-white" />
                                                    <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="border p-2 rounded text-sm bg-white" />
                                                </div>
                                            )}
                                        </label>

                                        <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-[var(--ft-color-primary-400)] ${sendType === 'generate_link' ? 'border-[var(--ft-color-primary-500)] bg-[var(--ft-color-primary-50)]' : 'bg-white'}`}>
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="sendType" checked={sendType === 'generate_link'} onChange={() => setSendType('generate_link')} className="text-[var(--ft-color-primary-600)]" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">직접 전달 (링크 생성)</span>
                                                    <span className="text-xs text-gray-500">DM을 발송하지 않고, 직접 전달할 수 있는 고유 링크만 생성합니다.</span>
                                                </div>
                                            </div>
                                            <LinkIcon className="w-4 h-4 text-gray-400" />
                                        </label>

                                        {sendType !== 'generate_link' && (
                                            <label className="flex items-center gap-2 pt-2 px-1">
                                                <input type="checkbox" checked={isAdContent} onChange={(e) => setIsAdContent(e.target.checked)} className="rounded text-[var(--ft-color-primary-600)]" />
                                                <span className="text-sm">광고성 정보가 포함되어 있습니다 ("(광고)" 문구 자동 삽입)</span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Generated Links Results */}
                    {currentStep === 5 && (
                        <div className="p-6 h-full flex flex-col">
                            <div className="text-center mb-6">
                                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">가이드 링크 생성이 완료되었습니다</h3>
                                <p className="text-gray-500 text-sm mt-1">아래 링크를 복사하여 인플루언서에게 직접 전달해주세요.</p>
                            </div>

                            <div className="flex justify-end mb-2">
                                <CoreButton size="sm" variant="secondary" onClick={handleCopyAllLinks} leftIcon={<Copy className="w-3 h-3" />}>전체 리스트 복사</CoreButton>
                            </div>

                            <div className="flex-1 overflow-auto border rounded-xl bg-gray-50">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700 sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">인플루언서</th>
                                            <th className="px-6 py-3 font-medium">가이드 링크</th>
                                            <th className="px-6 py-3 font-medium text-right">관리</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {generatedLinks.map((item, idx) => (
                                            <tr key={idx} className="bg-white hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-500 font-mono truncate max-w-[300px]">{item.link}</span>
                                                        <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs flex items-center gap-0.5"><ExternalLink className="w-3 h-3" /> 열기</a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleCopyLink(item.link, item.influencerId)}
                                                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${copiedId === item.influencerId ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                    >
                                                        {copiedId === item.influencerId ? '복사됨!' : '링크 복사'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-between shrink-0">
                    {currentStep === 5 ? (
                        <div className="flex w-full justify-end">
                            <CoreButton variant="primary" onClick={onClose}>닫기</CoreButton>
                        </div>
                    ) : (
                        <>
                            <CoreButton variant="secondary" onClick={handlePrev} disabled={currentStep === 1} leftIcon={<ChevronLeft className="w-4 h-4" />}>이전</CoreButton>
                            <div className="flex gap-2">
                                {currentStep === 4 && (
                                    <CoreButton variant="tertiary" onClick={() => onSaveDraft && onSaveDraft({ messageContent, ctaLinks, useDifferentLinks, individualLinks })}>임시저장</CoreButton>
                                )}
                                {currentStep < 4 ? (
                                    <CoreButton variant="primary" onClick={handleNext} disabled={
                                        (currentStep === 1 && !canProceedStep1) ||
                                        (currentStep === 2 && !canProceedStep2)
                                    } rightIcon={<ChevronRight className="w-4 h-4" />}>다음</CoreButton>
                                ) : (
                                    <CoreButton variant="primary" onClick={handleSend} disabled={!canProceedStep4} leftIcon={sendType === 'generate_link' ? <LinkIcon className="w-4 h-4" /> : <Send className="w-4 h-4" />}>
                                        {sendType === 'generate_link' ? '링크 생성하기' : '일괄 전달하기'}
                                    </CoreButton>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
