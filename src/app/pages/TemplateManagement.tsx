import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Upload, X, Plus, AlertCircle, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { DMTemplate, CTALink, TemplateStatus } from "../types/DMTemplate";
import { DeployConfirmModal } from "../components/DeployConfirmModal";

interface TemplateManagementProps {
    initialData?: DMTemplate;
    automationGroupId: number;
    automationGroupName: string;
    onBack: () => void;
    onSave: (template: DMTemplate) => void;
    onDeploy: (template: DMTemplate) => void;
}

export function TemplateManagement({
    initialData,
    automationGroupId,
    automationGroupName,
    onBack,
    onSave,
    onDeploy
}: TemplateManagementProps) {
    // Form state
    const [dmGuide, setDmGuide] = useState(initialData?.dmGuide || '');
    const [imageUrl, setImageUrl] = useState<string | undefined>(initialData?.imageUrl);
    const [ctaLinks, setCtaLinks] = useState<CTALink[]>(initialData?.ctaLinks || []);
    const [status, setStatus] = useState<TemplateStatus>(initialData?.status || 'draft');

    // UI state
    const [isDirty, setIsDirty] = useState(false);
    const [savedFormData, setSavedFormData] = useState<string>('');
    const [showExitModal, setShowExitModal] = useState(false);
    const [showDeployModal, setShowDeployModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Track form changes for dirty state
    useEffect(() => {
        const currentFormData = JSON.stringify({ dmGuide, imageUrl, ctaLinks });

        if (savedFormData === '') {
            setSavedFormData(currentFormData);
        } else {
            setIsDirty(currentFormData !== savedFormData);
        }
    }, [dmGuide, imageUrl, ctaLinks, savedFormData]);

    // Show toast helper
    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Validation: can deploy if dmGuide has content OR at least 1 CTA link exists
    const canDeploy = dmGuide.trim().length > 0 || ctaLinks.some(link => link.buttonName.trim() && link.url.trim());

    // Empty state check
    const isEmpty = !dmGuide.trim() && !imageUrl && ctaLinks.length === 0;

    // Handle back navigation
    const handleBack = () => {
        if (isDirty) {
            setShowExitModal(true);
        } else {
            onBack();
        }
    };

    // Handle save
    const handleSave = () => {
        const template: DMTemplate = {
            id: initialData?.id,
            automationGroupId,
            dmGuide,
            imageUrl,
            ctaLinks: ctaLinks.filter(link => link.buttonName.trim() || link.url.trim()),
            status: 'saved',
            lastModified: new Date().toISOString()
        };

        onSave(template);
        setStatus('saved');
        setSavedFormData(JSON.stringify({ dmGuide, imageUrl, ctaLinks }));
        setIsDirty(false);
        showToastMessage('저장되었습니다');
    };

    // Handle deploy initiation
    const handleDeployClick = () => {
        if (!canDeploy) return;
        setShowDeployModal(true);
    };

    // Handle deploy confirmation
    const handleDeployConfirm = () => {
        const template: DMTemplate = {
            id: initialData?.id,
            automationGroupId,
            dmGuide,
            imageUrl,
            ctaLinks: ctaLinks.filter(link => link.buttonName.trim() || link.url.trim()),
            status: 'deployed',
            lastModified: new Date().toISOString(),
            deployedAt: new Date().toISOString()
        };

        onDeploy(template);
        setStatus('deployed');
        setSavedFormData(JSON.stringify({ dmGuide, imageUrl, ctaLinks }));
        setIsDirty(false);
        setShowDeployModal(false);
        showToastMessage('인플루언서에게 전달되었습니다');
    };

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                showToastMessage('이미지 파일만 업로드할 수 있습니다');
                return;
            }

            // Create object URL for preview (in real app, would upload to server)
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    // Handle image delete
    const handleImageDelete = () => {
        setImageUrl(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle CTA link add
    const handleAddCtaLink = () => {
        if (ctaLinks.length >= 3) return;
        setCtaLinks([...ctaLinks, { buttonName: '', url: '' }]);
    };

    // Handle CTA link update
    const handleUpdateCtaLink = (index: number, field: keyof CTALink, value: string) => {
        const newLinks = [...ctaLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setCtaLinks(newLinks);
    };

    // Handle CTA link delete
    const handleDeleteCtaLink = (index: number) => {
        setCtaLinks(ctaLinks.filter((_, i) => i !== index));
    };

    // Get status badge
    const getStatusBadge = () => {
        if (isDirty) {
            return (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#fff3e0] text-[#f57c00]">
                    저장되지 않은 변경사항 있음
                </span>
            );
        }

        switch (status) {
            case 'deployed':
                return (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#e8f5e9] text-[#2e7d32]">
                        전달 완료
                    </span>
                );
            case 'saved':
                return (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#f0f0f0] text-[#707070]">
                        저장됨
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#fafafa] flex flex-col h-screen w-full">
            {/* Header */}
            <div className="bg-white h-[60px] border-b border-[#f0f0f0] shrink-0">
                <div className="flex items-center h-full px-8 justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={handleBack} className="p-1 hover:bg-[#f5f5f5] rounded transition-colors">
                            <ChevronLeft className="w-5 h-5 text-[#707070]" />
                        </button>
                        <div className="flex items-center gap-2">
                            <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">
                                템플릿 관리
                            </p>
                            <span className="text-[#e0e0e0]">|</span>
                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070]">
                                {automationGroupName}
                            </p>
                        </div>
                        {getStatusBadge()}
                    </div>
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handleSave}
                            className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                        >
                            <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">저장</p>
                        </button>
                        <button
                            onClick={handleDeployClick}
                            disabled={!canDeploy}
                            className={`h-10 px-4 rounded transition-colors ${canDeploy
                                    ? 'bg-[#5e51ff] hover:bg-[#4a3de0]'
                                    : 'bg-[#e0e0e0] cursor-not-allowed'
                                }`}
                        >
                            <p className={`font-['Pretendard:Medium',sans-serif] text-sm ${canDeploy ? 'text-white' : 'text-[#9e9e9e]'}`}>
                                전달하기
                            </p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel - Editor */}
                <div className="flex-1 overflow-y-auto p-8">
                    {isEmpty && !isDirty ? (
                        /* Empty State */
                        <div className="bg-white rounded-lg border border-[#e0e0e0] p-12 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-[#bbb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <p className="font-['Pretendard:Medium',sans-serif] text-base text-[#424242] mb-2">
                                인플루언서에게 전달할 DM 가이드를 작성해 주세요
                            </p>
                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070] mb-6 text-center">
                                브랜드의 톤앤매너와 핵심 메시지를 담아<br />
                                인플루언서가 참고할 수 있는 가이드를 작성하세요
                            </p>
                            <button
                                onClick={() => document.getElementById('dm-guide-textarea')?.focus()}
                                className="h-10 px-6 rounded bg-[#5e51ff] hover:bg-[#4a3de0] transition-colors"
                            >
                                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">DM 가이드 작성하기</p>
                            </button>
                        </div>
                    ) : (
                        /* Form Content */
                        <div className="space-y-6">
                            {/* DM Guide Section */}
                            <div className="bg-white rounded-lg border border-[#e0e0e0] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-[#5e51ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <h3 className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">DM 가이드</h3>
                                </div>
                                <textarea
                                    id="dm-guide-textarea"
                                    className="w-full min-h-[200px] p-4 border border-[#e0e0e0] rounded-lg font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] leading-[22px] focus:outline-none focus:border-[#5e51ff] resize-none"
                                    placeholder="인플루언서가 팔로워에게 보낼 DM의 가이드를 작성해 주세요.&#10;&#10;예시:&#10;안녕하세요! [브랜드명]입니다.&#10;이번에 새롭게 출시된 [제품명]을 소개해 드리려고 해요.&#10;아래 링크에서 특별 할인가로 만나보세요!"
                                    value={dmGuide}
                                    onChange={(e) => setDmGuide(e.target.value)}
                                />
                                <p className="mt-2 font-['Pretendard:Regular',sans-serif] text-xs text-[#9e9e9e]">
                                    * 여러 줄 입력이 가능합니다. 특수 포맷(HTML, 변수 치환 등)은 지원하지 않습니다.
                                </p>
                            </div>

                            {/* Image Section */}
                            <div className="bg-white rounded-lg border border-[#e0e0e0] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ImageIcon className="w-5 h-5 text-[#5e51ff]" />
                                    <h3 className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">참고 이미지 (선택)</h3>
                                </div>

                                {imageUrl ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={imageUrl}
                                            alt="Uploaded"
                                            className="max-w-[300px] max-h-[200px] rounded-lg object-cover border border-[#e0e0e0]"
                                        />
                                        <button
                                            onClick={handleImageDelete}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-[#d32f2f] rounded-full flex items-center justify-center hover:bg-[#c62828] transition-colors"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-[#e0e0e0] rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#5e51ff] hover:bg-[#fafafa] transition-colors"
                                    >
                                        <Upload className="w-8 h-8 text-[#bbb] mb-2" />
                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#707070] mb-1">
                                            이미지를 업로드하세요
                                        </p>
                                        <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#9e9e9e]">
                                            JPG, PNG 형식 지원 (1장만 업로드 가능)
                                        </p>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            {/* CTA Links Section */}
                            <div className="bg-white rounded-lg border border-[#e0e0e0] p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="w-5 h-5 text-[#5e51ff]" />
                                        <h3 className="font-['Pretendard:Medium',sans-serif] text-base text-[#242424]">
                                            CTA 링크 설정 (최대 3개)
                                        </h3>
                                    </div>
                                    {ctaLinks.length < 3 && (
                                        <button
                                            onClick={handleAddCtaLink}
                                            className="flex items-center gap-1 h-8 px-3 rounded border border-[#5e51ff] text-[#5e51ff] hover:bg-[#f5f3ff] transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span className="font-['Pretendard:Medium',sans-serif] text-sm">링크 추가</span>
                                        </button>
                                    )}
                                </div>

                                {/* CTA Fixed Policy Notice */}
                                <div className="bg-[#fff8e1] rounded-lg p-3 mb-4 flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-[#f57c00] shrink-0 mt-0.5" />
                                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#795548]">
                                        CTA 링크는 성과 측정을 위해 수정할 수 없습니다. 인플루언서가 전달받은 후에도 버튼명과 URL은 고정됩니다.
                                    </p>
                                </div>

                                {ctaLinks.length === 0 ? (
                                    <div className="border border-dashed border-[#e0e0e0] rounded-lg p-6 text-center">
                                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#9e9e9e]">
                                            CTA 링크를 추가하면 인플루언서가 팔로워에게 보내는 DM에 버튼으로 표시됩니다
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {ctaLinks.map((link, index) => (
                                            <div key={index} className="flex gap-2 items-start">
                                                <div className="flex-1 flex gap-2">
                                                    <input
                                                        type="text"
                                                        className="flex-1 h-10 px-3 border border-[#e0e0e0] rounded-lg font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] focus:outline-none focus:border-[#5e51ff] placeholder:text-[#bbb]"
                                                        placeholder="버튼명 입력"
                                                        value={link.buttonName}
                                                        onChange={(e) => handleUpdateCtaLink(index, 'buttonName', e.target.value)}
                                                    />
                                                    <input
                                                        type="url"
                                                        className="flex-[2] h-10 px-3 border border-[#e0e0e0] rounded-lg font-['Pretendard:Regular',sans-serif] text-sm text-[#242424] focus:outline-none focus:border-[#5e51ff] placeholder:text-[#bbb]"
                                                        placeholder="https://example.com"
                                                        value={link.url}
                                                        onChange={(e) => handleUpdateCtaLink(index, 'url', e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteCtaLink(index)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e0e0e0] hover:bg-[#ffebee] hover:border-[#d32f2f] transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-[#707070]" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {ctaLinks.length >= 3 && (
                                    <p className="mt-3 font-['Pretendard:Regular',sans-serif] text-xs text-[#9e9e9e]">
                                        CTA 링크는 최대 3개까지 설정할 수 있습니다
                                    </p>
                                )}
                            </div>

                            {/* Validation Notice */}
                            {!canDeploy && (
                                <div className="bg-[#ffebee] rounded-lg p-4 flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-[#d32f2f] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#d32f2f] mb-1">
                                            전달을 위해서는 메시지 또는 링크가 필요합니다
                                        </p>
                                        <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#795548]">
                                            DM 가이드를 작성하거나 CTA 링크를 하나 이상 추가해 주세요
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Panel - Preview */}
                <div className="w-[400px] border-l border-[#e0e0e0] bg-white overflow-y-auto shrink-0">
                    <div className="p-6">
                        <h3 className="font-['Pretendard:Medium',sans-serif] text-sm text-[#707070] mb-4">
                            인플루언서 화면 미리보기
                        </h3>

                        {/* Phone Preview */}
                        <div className="bg-[#f6f6f6] rounded-[24px] p-3">
                            <div className="bg-white rounded-[20px] overflow-hidden">
                                {/* Preview Header */}
                                <div className="bg-[#5e51ff] px-4 py-3">
                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">
                                        브랜드 DM 가이드
                                    </p>
                                </div>

                                {/* Preview Content */}
                                <div className="p-4 min-h-[400px]">
                                    {dmGuide ? (
                                        <div className="bg-[#fafafa] rounded-lg p-3 mb-3">
                                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#424242] whitespace-pre-wrap leading-[22px]">
                                                {dmGuide}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-[#fafafa] rounded-lg p-3 mb-3">
                                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#bbb] italic">
                                                DM 가이드가 여기에 표시됩니다
                                            </p>
                                        </div>
                                    )}

                                    {imageUrl && (
                                        <div className="mb-3">
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="w-full rounded-lg object-cover"
                                            />
                                        </div>
                                    )}

                                    {ctaLinks.filter(l => l.buttonName.trim() || l.url.trim()).length > 0 && (
                                        <div className="space-y-2">
                                            {ctaLinks.filter(l => l.buttonName.trim()).map((link, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-[#5e51ff] rounded-lg px-4 py-2.5 text-center"
                                                >
                                                    <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">
                                                        {link.buttonName}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {!dmGuide && !imageUrl && ctaLinks.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#bbb] text-center">
                                                왼쪽에서 템플릿을 작성하면<br />
                                                미리보기가 표시됩니다
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Preview Footer */}
                                <div className="border-t border-[#f0f0f0] px-4 py-3 bg-[#fafafa]">
                                    <p className="font-['Pretendard:Regular',sans-serif] text-xs text-[#9e9e9e] text-center">
                                        인플루언서는 이 가이드를 참고하여<br />
                                        본인의 말투로 자유롭게 수정할 수 있습니다
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exit Confirmation Modal */}
            {showExitModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h3 className="font-['Pretendard:Medium',sans-serif] text-lg text-[#242424] mb-2">
                            정말 나가시겠습니까?
                        </h3>
                        <p className="font-['Pretendard:Regular',sans-serif] text-sm text-[#707070] mb-6">
                            저장되지 않은 변경사항이 있습니다. 저장하지 않고 나가시면 변경사항이 삭제됩니다.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowExitModal(false)}
                                className="h-10 px-4 rounded border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] transition-colors"
                            >
                                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-[#424242]">취소</p>
                            </button>
                            <button
                                onClick={() => {
                                    setShowExitModal(false);
                                    onBack();
                                }}
                                className="h-10 px-4 rounded bg-[#d32f2f] hover:bg-[#c62828] transition-colors"
                            >
                                <p className="font-['Pretendard:Medium',sans-serif] text-sm text-white">나가기</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deploy Confirmation Modal */}
            <DeployConfirmModal
                isOpen={showDeployModal}
                onClose={() => setShowDeployModal(false)}
                onConfirm={handleDeployConfirm}
            />

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-[#242424] text-white rounded-lg px-6 py-3 shadow-xl">
                        <p className="font-['Pretendard:Medium',sans-serif] text-sm">{toastMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
