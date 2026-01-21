import { useState } from "react";
import { Plus, Users, AtSign, ChevronLeft, Instagram, Flag, Search } from "lucide-react";
import { CoreModal, CoreButton, CoreAvatar, CoreTag } from "../../design-system";
import { AutomationInfluencer } from "../types";

interface AddInfluencerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (influencers: Partial<AutomationInfluencer>[]) => void;
}

type Step = 'method' | 'import' | 'manual';
type ImportTab = 'group' | 'campaign';

// Mock data for groups
const MOCK_GROUPS = [
    {
        id: 1,
        name: '시트_25.06_더위 기획전',
        platform: 'instagram' as const,
        influencers: [
            { id: 101, username: 'shogun_home', displayName: '쇼군홈 | DIY | 플라워 | 우...', profileImage: '', categories: ['홈/리빙', '일상'] },
            { id: 102, username: 'woos_diningroom', displayName: '우스네 ·°~🧸🍳~°·', profileImage: '', categories: ['F&B', '홈/리빙'] },
            { id: 103, username: 'hagojibi_j', displayName: '지비 | 담백한 홈스타일링 ...', profileImage: '', categories: ['홈/리빙', '일상'] },
            { id: 104, username: 'dodohomemeal', displayName: '도도네 | 집밥·간편식·한...', profileImage: '', categories: ['F&B', '일상'] },
            { id: 105, username: 'kkongnyam_', displayName: '꽁냠꽁냠🍴', profileImage: '', categories: ['F&B', '일상'] },
            { id: 106, username: 'p0p__py', displayName: 'Poppy', profileImage: '', categories: ['F&B', '여행/관광'] },
            { id: 107, username: 'lims_cook', displayName: '햇림 | 임은진', profileImage: '', categories: ['F&B', '홈/리빙'] },
            { id: 108, username: 'nata_nara', displayName: '나타나라🧚‍♀️', profileImage: '', categories: ['뷰티', '일상'] },
        ]
    },
    {
        id: 2,
        name: '뷰티 인플루언서 풀',
        platform: 'instagram' as const,
        influencers: [
            { id: 201, username: 'beauty_queen', displayName: '뷰티퀸 | 메이크업 전문', profileImage: '', categories: ['뷰티', '패션'] },
            { id: 202, username: 'skincare_daily', displayName: '스킨케어 데일리', profileImage: '', categories: ['뷰티', '일상'] },
        ]
    },
];

const MOCK_CAMPAIGNS = [
    {
        id: 101,
        name: '여름 시즌 캠페인',
        influencers: [
            { id: 301, username: 'summer_vibes', displayName: '썸머 바이브', profileImage: '', categories: ['라이프스타일', '여행'] },
            { id: 302, username: 'beach_lover', displayName: '비치러버 🏖️', profileImage: '', categories: ['여행/관광', '일상'] },
        ]
    },
    {
        id: 102,
        name: '신제품 런칭 캠페인',
        influencers: [
            { id: 401, username: 'tech_reviewer', displayName: '테크 리뷰어', profileImage: '', categories: ['테크', '리뷰'] },
        ]
    },
];

export function AddInfluencerModal({
    isOpen,
    onClose,
    onAdd
}: AddInfluencerModalProps) {
    const [step, setStep] = useState<Step>('method');
    const [importTab, setImportTab] = useState<ImportTab>('group');
    const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);
    const [selectedInfluencerIds, setSelectedInfluencerIds] = useState<number[]>([]);
    const [manualInput, setManualInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleClose = () => {
        setStep('method');
        setImportTab('group');
        setSelectedSourceId(null);
        setSelectedInfluencerIds([]);
        setManualInput('');
        setSearchQuery('');
        onClose();
    };

    // Get current source data
    const sources = importTab === 'group' ? MOCK_GROUPS : MOCK_CAMPAIGNS;
    const selectedSource = sources.find(s => s.id === selectedSourceId);
    const sourceInfluencers = selectedSource?.influencers || [];

    // Filter by search
    const filteredInfluencers = sourceInfluencers.filter(inf =>
        inf.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inf.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleInfluencer = (id: number) => {
        setSelectedInfluencerIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        if (selectedInfluencerIds.length === filteredInfluencers.length) {
            setSelectedInfluencerIds([]);
        } else {
            setSelectedInfluencerIds(filteredInfluencers.map(i => i.id));
        }
    };

    const handleAddFromImport = () => {
        const selected = sourceInfluencers.filter(inf => selectedInfluencerIds.includes(inf.id));
        const influencersToAdd: Partial<AutomationInfluencer>[] = selected.map((inf, idx) => ({
            id: Date.now() + idx,
            influencerId: inf.id,
            username: inf.username,
            displayName: inf.displayName,
            profileImage: inf.profileImage,
            status: 'pending' as const,
            sentCount: 0,
            clickCount: 0,
            isConnected: false,
            isTemplateShared: false,
        }));
        onAdd(influencersToAdd);
        handleClose();
    };

    const handleAddFromManual = () => {
        const usernames = manualInput
            .split(/[,\n]/)
            .map(u => u.trim().replace('@', ''))
            .filter(u => u.length > 0);

        const influencersToAdd: Partial<AutomationInfluencer>[] = usernames.map((username, idx) => ({
            id: Date.now() + idx,
            influencerId: Date.now() + idx,
            username: username,
            displayName: username,
            profileImage: '',
            status: 'pending' as const,
            sentCount: 0,
            clickCount: 0,
            isConnected: false,
            isTemplateShared: false,
        }));
        onAdd(influencersToAdd);
        handleClose();
    };

    // Method Selection Step
    if (step === 'method') {
        return (
            <CoreModal
                open={isOpen}
                onClose={handleClose}
                title="인플루언서 추가"
                size="md"
            >
                <div className="space-y-3">
                    <button
                        onClick={() => setStep('import')}
                        className="w-full p-4 border border-[var(--ft-border-primary)] rounded-lg text-left hover:border-[var(--ft-color-primary-500)] hover:bg-[var(--ft-bg-secondary)] transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--ft-color-primary-100)] flex items-center justify-center">
                                <Users className="w-5 h-5 text-[var(--ft-color-primary-600)]" />
                            </div>
                            <div>
                                <p className="font-medium text-[var(--ft-text-primary)] group-hover:text-[var(--ft-color-primary-600)]">
                                    그룹/캠페인에서 불러오기
                                </p>
                                <p className="text-sm text-[var(--ft-text-secondary)]">
                                    관리 중인 그룹/캠페인의 인플루언서를 쉽게 추가해 보세요.
                                </p>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => setStep('manual')}
                        className="w-full p-4 border border-[var(--ft-border-primary)] rounded-lg text-left hover:border-[var(--ft-color-primary-500)] hover:bg-[var(--ft-bg-secondary)] transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <AtSign className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-medium text-[var(--ft-text-primary)] group-hover:text-[var(--ft-color-primary-600)]">
                                    직접 입력하기
                                </p>
                                <p className="text-sm text-[var(--ft-text-secondary)]">
                                    인스타그램 계정명을 직접 입력하여 인플루언서를 추가합니다.
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </CoreModal>
        );
    }

    // Manual Input Step
    if (step === 'manual') {
        const parsedUsernames = manualInput
            .split(/[,\n]/)
            .map(u => u.trim().replace('@', ''))
            .filter(u => u.length > 0);

        return (
            <CoreModal
                open={isOpen}
                onClose={handleClose}
                title={
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setStep('method')}
                            className="p-1 hover:bg-[var(--ft-bg-secondary)] rounded-md transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                        </button>
                        <span>직접 입력하기</span>
                    </div>
                }
                size="md"
                showCloseButton={false}
                actions={[
                    <CoreButton key="cancel" variant="secondary" onClick={handleClose}>
                        취소
                    </CoreButton>,
                    <CoreButton
                        key="add"
                        variant="primary"
                        onClick={handleAddFromManual}
                        disabled={parsedUsernames.length === 0}
                    >
                        추가하기 ({parsedUsernames.length})
                    </CoreButton>
                ]}
            >
                <div className="space-y-4">
                    <p className="text-sm text-[var(--ft-text-secondary)]">
                        인스타그램 계정명을 입력하세요. 쉼표 또는 줄바꿈으로 여러 계정을 입력할 수 있습니다.
                    </p>
                    <textarea
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        placeholder="예: @username1, @username2"
                        className="w-full h-32 p-3 border border-[var(--ft-border-primary)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)] focus:border-transparent"
                    />
                    {parsedUsernames.length > 0 && (
                        <div className="p-3 bg-[var(--ft-bg-secondary)] rounded-lg">
                            <p className="text-xs font-medium text-[var(--ft-text-secondary)] mb-2">
                                미리보기 ({parsedUsernames.length}명)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {parsedUsernames.slice(0, 10).map((username, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-white border border-[var(--ft-border-primary)] rounded-full text-xs text-[var(--ft-text-primary)]"
                                    >
                                        @{username}
                                    </span>
                                ))}
                                {parsedUsernames.length > 10 && (
                                    <span className="px-2 py-1 text-xs text-[var(--ft-text-secondary)]">
                                        +{parsedUsernames.length - 10}명 더
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CoreModal>
        );
    }

    // Import from Group/Campaign Step
    return (
        <CoreModal
            open={isOpen}
            onClose={handleClose}
            title={
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            if (selectedSourceId) {
                                setSelectedSourceId(null);
                                setSelectedInfluencerIds([]);
                            } else {
                                setStep('method');
                            }
                        }}
                        className="p-1 hover:bg-[var(--ft-bg-secondary)] rounded-md transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-[var(--ft-text-secondary)]" />
                    </button>
                    <span>그룹/캠페인 인플루언서 불러오기</span>
                </div>
            }
            size="lg"
            showCloseButton={false}
            actions={[
                <CoreButton key="cancel" variant="secondary" onClick={handleClose}>
                    취소
                </CoreButton>,
                <CoreButton
                    key="add"
                    variant="primary"
                    onClick={handleAddFromImport}
                    disabled={selectedInfluencerIds.length === 0}
                >
                    추가하기
                </CoreButton>
            ]}
        >
            <p className="text-sm text-[var(--ft-text-secondary)] mb-4">
                관리 중인 그룹/캠페인의 인플루언서를 쉽게 추가해 보세요.
            </p>

            <div className="flex border border-[var(--ft-border-primary)] rounded-lg overflow-hidden min-h-[400px]">
                {/* Left Panel - Source List */}
                <div className="w-[180px] shrink-0 border-r border-[var(--ft-border-primary)] bg-[var(--ft-bg-secondary)]">
                    {/* Tabs */}
                    <div className="flex border-b border-[var(--ft-border-primary)]">
                        <button
                            onClick={() => {
                                setImportTab('group');
                                setSelectedSourceId(null);
                                setSelectedInfluencerIds([]);
                            }}
                            className={`flex-1 px-3 py-2.5 text-sm font-medium transition-colors ${importTab === 'group'
                                    ? 'text-[var(--ft-color-primary-600)] bg-white border-b-2 border-[var(--ft-color-primary-500)]'
                                    : 'text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                그룹
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                setImportTab('campaign');
                                setSelectedSourceId(null);
                                setSelectedInfluencerIds([]);
                            }}
                            className={`flex-1 px-3 py-2.5 text-sm font-medium transition-colors ${importTab === 'campaign'
                                    ? 'text-[var(--ft-color-primary-600)] bg-white border-b-2 border-[var(--ft-color-primary-500)]'
                                    : 'text-[var(--ft-text-secondary)] hover:text-[var(--ft-text-primary)]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-1.5">
                                <Flag className="w-3.5 h-3.5" />
                                캠페인
                            </div>
                        </button>
                    </div>

                    {/* Source List */}
                    <div className="p-2 space-y-1 max-h-[340px] overflow-y-auto">
                        {sources.map(source => (
                            <button
                                key={source.id}
                                onClick={() => {
                                    setSelectedSourceId(source.id);
                                    setSelectedInfluencerIds([]);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm rounded-md transition-colors ${selectedSourceId === source.id
                                        ? 'bg-[var(--ft-color-primary-100)] text-[var(--ft-color-primary-700)]'
                                        : 'hover:bg-white text-[var(--ft-text-primary)]'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {importTab === 'group' && <Instagram className="w-3.5 h-3.5 text-[var(--ft-text-secondary)]" />}
                                    <span className="truncate">{source.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Influencer List */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedSourceId ? (
                        <>
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-[var(--ft-border-primary)] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Instagram className="w-4 h-4 text-[var(--ft-text-secondary)]" />
                                    <span className="text-sm font-medium text-[var(--ft-text-primary)]">
                                        {selectedSource?.name}
                                    </span>
                                </div>
                                <span className="text-sm text-[var(--ft-text-secondary)]">
                                    ({selectedInfluencerIds.length}/{sourceInfluencers.length} 선택)
                                </span>
                            </div>

                            {/* Search */}
                            <div className="px-4 py-2 border-b border-[var(--ft-border-primary)]">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ft-text-disabled)]" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="계정 검색..."
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-[var(--ft-border-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ft-color-primary-500)] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="px-4 py-2 border-b border-[var(--ft-border-secondary)] bg-[var(--ft-bg-secondary)] flex items-center">
                                <div className="w-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedInfluencerIds.length === filteredInfluencers.length && filteredInfluencers.length > 0}
                                        onChange={handleToggleAll}
                                        className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                    />
                                </div>
                                <div className="flex-1 text-xs font-medium text-[var(--ft-text-secondary)]">계정</div>
                                <div className="w-32 text-xs font-medium text-[var(--ft-text-secondary)]">카테고리</div>
                            </div>

                            {/* Influencer List */}
                            <div className="flex-1 overflow-y-auto">
                                {filteredInfluencers.map(inf => (
                                    <div
                                        key={inf.id}
                                        onClick={() => handleToggleInfluencer(inf.id)}
                                        className="px-4 py-3 border-b border-[var(--ft-border-primary)] flex items-center hover:bg-[var(--ft-bg-secondary)] cursor-pointer transition-colors"
                                    >
                                        <div className="w-10">
                                            <input
                                                type="checkbox"
                                                checked={selectedInfluencerIds.includes(inf.id)}
                                                onChange={() => handleToggleInfluencer(inf.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-4 h-4 rounded border-[var(--ft-border-primary)] text-[var(--ft-color-primary-600)] focus:ring-[var(--ft-color-primary-500)] cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center gap-3">
                                            <CoreAvatar src={inf.profileImage} name={inf.displayName} size="sm" />
                                            <div>
                                                <p className="text-sm font-medium text-[var(--ft-text-primary)]">{inf.username}</p>
                                                <p className="text-xs text-[var(--ft-text-secondary)] truncate max-w-[200px]">{inf.displayName}</p>
                                            </div>
                                        </div>
                                        <div className="w-32 flex flex-wrap gap-1">
                                            {inf.categories.map((cat, idx) => (
                                                <CoreTag key={idx} color={idx === 0 ? 'purple' : 'gray'} size="sm">
                                                    {cat}
                                                </CoreTag>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-sm text-[var(--ft-text-secondary)]">
                            {importTab === 'group' ? '그룹' : '캠페인'}을 선택해주세요
                        </div>
                    )}
                </div>
            </div>
        </CoreModal>
    );
}
