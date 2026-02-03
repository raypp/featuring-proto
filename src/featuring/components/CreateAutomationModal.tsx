import { useState, useMemo } from "react";
import { X, Zap, ChevronDown } from "lucide-react";
import { CoreButton, CoreModal } from "../../design-system";
import { Campaign } from "../types";

interface CreateAutomationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaigns: Campaign[];
    existingNames: string[];
    onCreateAutomation: (data: {
        name: string;
        description?: string;
        linkedCampaignId?: number;
        productBrand?: string;
    }) => void;
}

export function CreateAutomationModal({
    isOpen,
    onClose,
    campaigns,
    existingNames,
    onCreateAutomation
}: CreateAutomationModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [linkedCampaignId, setLinkedCampaignId] = useState<number | null>(null);
    const [productBrand, setProductBrand] = useState("");
    const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);

    // Validation
    const nameError = useMemo(() => {
        if (!name.trim()) return null; // Don't show error for empty input
        if (existingNames.some(n => n.toLowerCase() === name.trim().toLowerCase())) {
            return "이미 존재하는 자동화 이름입니다";
        }
        return null;
    }, [name, existingNames]);

    const isValid = name.trim().length > 0 && !nameError;

    // Get selected campaign name
    const selectedCampaign = linkedCampaignId
        ? campaigns.find(c => c.id === linkedCampaignId)
        : null;

    // Handle close
    const handleClose = () => {
        setName("");
        setDescription("");
        setLinkedCampaignId(null);
        setProductBrand("");
        setShowCampaignDropdown(false);
        onClose();
    };

    // Handle create
    const handleCreate = () => {
        if (!isValid) return;

        onCreateAutomation({
            name: name.trim(),
            description: description.trim() || undefined,
            linkedCampaignId: linkedCampaignId || undefined,
            productBrand: productBrand.trim() || undefined
        });

        handleClose();
    };

    // Handle campaign select
    const handleCampaignSelect = (campaignId: number | null) => {
        setLinkedCampaignId(campaignId);
        setShowCampaignDropdown(false);

        // Auto-fill brand name if campaign is selected
        if (campaignId) {
            const campaign = campaigns.find(c => c.id === campaignId);
            if (campaign?.brandName && !productBrand) {
                setProductBrand(campaign.brandName);
            }
        }
    };

    return (
        <CoreModal
            open={isOpen}
            onClose={handleClose}
            title="새 자동화 만들기"
            size="md"
        >
            <div className="space-y-5">
                {/* Automation Name */}
                <div>
                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-1.5">
                        자동화 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 신규 팔로워 환영 메시지"
                        className={`w-full h-10 px-3 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${nameError
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-[var(--ft-border-primary)] focus:border-[var(--ft-color-primary-500)]'
                            }`}
                    />
                    <p className="mt-1 text-xs text-[var(--ft-text-secondary)]">
                        이 이름은 자동화를 공유받는 인플루언서에게도 노출됩니다.
                    </p>
                    {nameError && (
                        <p className="mt-1 text-xs text-red-500">{nameError}</p>
                    )}
                </div>

                {/* Campaign Link */}
                <div>
                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-1.5">
                        캠페인 연결 <span className="text-[var(--ft-text-disabled)]">(선택)</span>
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
                            className="w-full h-10 px-3 text-sm bg-white border border-[var(--ft-border-primary)] rounded-lg flex items-center justify-between hover:border-[var(--ft-color-primary-400)] focus:outline-none focus:border-[var(--ft-color-primary-500)] transition-colors"
                        >
                            <span className={selectedCampaign ? 'text-[var(--ft-text-primary)]' : 'text-[var(--ft-text-disabled)]'}>
                                {selectedCampaign ? selectedCampaign.name : '단독 자동화 (캠페인 연결 없음)'}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-[var(--ft-text-secondary)] transition-transform ${showCampaignDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showCampaignDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--ft-border-primary)] rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                                {/* No Campaign Option */}
                                <button
                                    type="button"
                                    onClick={() => handleCampaignSelect(null)}
                                    className={`w-full px-3 py-2.5 text-left text-sm hover:bg-[var(--ft-bg-secondary)] flex items-center gap-2 ${!linkedCampaignId ? 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-600)]' : 'text-[var(--ft-text-primary)]'
                                        }`}
                                >
                                    <Zap className="w-4 h-4" />
                                    단독 자동화
                                </button>

                                {/* Campaign Options */}
                                {campaigns.map((campaign) => (
                                    <button
                                        key={campaign.id}
                                        type="button"
                                        onClick={() => handleCampaignSelect(campaign.id)}
                                        className={`w-full px-3 py-2.5 text-left text-sm hover:bg-[var(--ft-bg-secondary)] ${linkedCampaignId === campaign.id
                                            ? 'bg-[var(--ft-color-primary-50)] text-[var(--ft-color-primary-600)]'
                                            : 'text-[var(--ft-text-primary)]'
                                            }`}
                                    >
                                        <div className="font-medium truncate">{campaign.name}</div>
                                        <div className="text-xs text-[var(--ft-text-secondary)]">{campaign.brandName}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-[var(--ft-text-secondary)]">
                        캠페인을 연결하면 해당 캠페인의 인플루언서에게 자동 DM을 발송할 수 있습니다.
                    </p>
                </div>

                {/* Product/Brand Name */}
                <div>
                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-1.5">
                        상품/브랜드명 <span className="text-[var(--ft-text-disabled)]">(선택)</span>
                    </label>
                    <input
                        type="text"
                        value={productBrand}
                        onChange={(e) => setProductBrand(e.target.value)}
                        placeholder="예: 다이슨 에어랩"
                        className="w-full h-10 px-3 text-sm bg-white border border-[var(--ft-border-primary)] rounded-lg focus:border-[var(--ft-color-primary-500)] focus:outline-none transition-colors"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-[var(--ft-text-primary)] mb-1.5">
                        설명 <span className="text-[var(--ft-text-disabled)]">(선택)</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="자동화에 대한 간단한 설명을 입력하세요"
                        rows={2}
                        className="w-full px-3 py-2 text-sm bg-white border border-[var(--ft-border-primary)] rounded-lg focus:border-[var(--ft-color-primary-500)] focus:outline-none transition-colors resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                    <CoreButton
                        variant="tertiary"
                        size="md"
                        onClick={handleClose}
                    >
                        취소
                    </CoreButton>
                    <CoreButton
                        variant="primary"
                        size="md"
                        onClick={handleCreate}
                        disabled={!isValid}
                    >
                        자동화 생성
                    </CoreButton>
                </div>
            </div>
        </CoreModal>
    );
}
