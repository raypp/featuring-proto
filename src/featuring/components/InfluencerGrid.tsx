import { ChevronDown, Search, Filter, MoreHorizontal, Link, AlertCircle, Settings } from "lucide-react";
import { AutomationInfluencer } from "../types";
import { CoreAvatar, CoreStatusBadge } from "../../design-system";

interface InfluencerGridProps {
    data: AutomationInfluencer[];
    selectedIds: number[];
    onSelect: (ids: number[]) => void;
    onUpdate: (id: number, field: string, value: any) => void;
    onOpenDrawer: (id: number) => void;
    isLinkLocked: boolean;
}

const getStatusBadge = (status?: string) => {
    switch (status) {
        case 'active': return <CoreStatusBadge colorType="success" type="tint">작동중</CoreStatusBadge>;
        case 'pending': return <CoreStatusBadge colorType="warning" type="tint">대기</CoreStatusBadge>;
        case 'rejected': return <CoreStatusBadge colorType="error" type="tint">거절</CoreStatusBadge>;
        case 'updating': return <CoreStatusBadge colorType="informative" type="tint">수정중</CoreStatusBadge>;
        default: return <CoreStatusBadge colorType="default" type="tint">작성중</CoreStatusBadge>;
    }
};

export function InfluencerGrid({
    data,
    selectedIds,
    onSelect,
    onUpdate,
    onOpenDrawer,
    isLinkLocked
}: InfluencerGridProps) {
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            onSelect(data.map(i => i.id));
        } else {
            onSelect([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            onSelect([...selectedIds, id]);
        } else {
            onSelect(selectedIds.filter(sid => sid !== id));
        }
    };

    // Magic Paste Handler
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData('text');
        const rows = clipboardData.split('\n').filter(row => row.trim());

        // This is a simple implementation assuming pasting into URL column starts from top selected or just batch updates?
        // Let's assume user wants to bulk update URLs.
        // For simplicity in this demo, we'll just log or show an alert, 
        // or finding the first selected row and populating down.
        if (selectedIds.length > 0) {
            const updates = {};
            // Simplified logic: apply to selected rows in order
            rows.forEach((url, index) => {
                if (index < selectedIds.length) {
                    const id = selectedIds[index];
                    onUpdate(id, 'customUrl', url.trim());
                }
            });
        }
    };

    const StatusIcon = ({ status }: { status?: string }) => {
        switch (status) {
            case 'active': return <span className="flex w-2 h-2 rounded-full bg-green-500" title="작동 중" />;
            case 'pending': return <span className="flex w-2 h-2 rounded-full bg-yellow-500" title="수락 대기" />;
            case 'rejected': return <span className="flex w-2 h-2 rounded-full bg-red-500" title="거절됨" />;
            case 'updating': return <span className="flex w-2 h-2 rounded-full bg-orange-500" title="변경 요청 중" />;
            default: return <span className="flex w-2 h-2 rounded-full bg-gray-300" title="작성 중" />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-white" onPaste={handlePaste}>
            <div className="overflow-auto border rounded-lg border-[#e0e0e0]">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 w-4">
                                <input
                                    type="checkbox"
                                    checked={data.length > 0 && selectedIds.length === data.length}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-[#5e51ff] focus:ring-[#5e51ff]"
                                />
                            </th>
                            <th className="px-3 py-3 text-left w-[180px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider">
                                인플루언서
                            </th>
                            <th className="px-3 py-3 text-center w-[100px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider">
                                상태
                            </th>
                            <th className="px-3 py-3 text-left w-[200px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider">
                                Button 1 URL
                            </th>
                            <th className="px-3 py-3 text-left w-[200px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider">
                                Button 2 URL
                            </th>
                            <th className="px-3 py-3 text-left w-[200px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider">
                                Button 3 URL
                            </th>
                            <th className="px-3 py-3 text-left w-[120px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider">
                                설정 요약
                            </th>
                            <th className="px-3 py-3 text-center w-[80px] text-xs font-medium text-[var(--ft-text-secondary)] uppercase tracking-wider sticky right-0 bg-white z-10 shadow-[-1px_0_4px_rgba(0,0,0,0.05)]">
                                관리
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[var(--ft-border-secondary)]">
                        {data.map((influencer) => {
                            const isSelected = selectedIds.includes(influencer.id);
                            return (
                                <tr key={influencer.id} className={`hover:bg-[var(--ft-bg-secondary)] transition-colors ${isSelected ? 'bg-[#fcfcff]' : ''}`}>
                                    <td className="w-4 p-4">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => handleSelectOne(influencer.id, e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-[#5e51ff] focus:ring-[#5e51ff]"
                                        />
                                    </td>
                                    <td className="px-3 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <CoreAvatar src={influencer.profileImage} name={influencer.displayName} size="sm" />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-[var(--ft-text-primary)] leading-tight">{influencer.displayName}</span>
                                                <span className="text-[10px] text-[var(--ft-text-disabled)] leading-tight">@{influencer.username}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-center whitespace-nowrap">
                                        {getStatusBadge(influencer.automationStatus)}
                                    </td>
                                    {/* Button 1 */}
                                    <td className="px-3 py-3 whitespace-nowrap">
                                        <div className={`flex items-center gap-2 px-2 py-1.5 rounded border border-transparent transition-colors group-hover:border-[var(--ft-border-secondary)] focus-within:!border-[var(--ft-color-primary-500)] focus-within:!bg-white ${influencer.hasCustomSettings ? 'bg-[#f0eaff]' : 'bg-[var(--ft-bg-secondary)]'}`}>
                                            <Link className="w-3 h-3 text-[var(--ft-text-disabled)] shrink-0" />
                                            <input
                                                className="w-full bg-transparent text-xs text-[var(--ft-text-primary)] placeholder-[var(--ft-text-disabled)] focus:outline-none"
                                                value={influencer.customUrl || ''}
                                                onChange={(e) => onUpdate(influencer.id, 'customUrl', e.target.value)}
                                                placeholder="http://..."
                                                disabled={isLinkLocked}
                                            />
                                        </div>
                                    </td>
                                    {/* Button 2 */}
                                    <td className="px-3 py-3 whitespace-nowrap">
                                        <div className={`flex items-center gap-2 px-2 py-1.5 rounded border border-transparent transition-colors group-hover:border-[var(--ft-border-secondary)] focus-within:!border-[var(--ft-color-primary-500)] focus-within:!bg-white ${influencer.hasCustomSettings ? 'bg-[#f0eaff]' : 'bg-[var(--ft-bg-secondary)]'}`}>
                                            <Link className="w-3 h-3 text-[var(--ft-text-disabled)] shrink-0" />
                                            <input
                                                className="w-full bg-transparent text-xs text-[var(--ft-text-primary)] placeholder-[var(--ft-text-disabled)] focus:outline-none"
                                                value={influencer.button2Url || ''}
                                                onChange={(e) => onUpdate(influencer.id, 'button2Url', e.target.value)}
                                                placeholder="http://..."
                                                disabled={isLinkLocked}
                                            />
                                        </div>
                                    </td>
                                    {/* Button 3 */}
                                    <td className="px-3 py-3 whitespace-nowrap">
                                        <div className={`flex items-center gap-2 px-2 py-1.5 rounded border border-transparent transition-colors group-hover:border-[var(--ft-border-secondary)] focus-within:!border-[var(--ft-color-primary-500)] focus-within:!bg-white ${influencer.hasCustomSettings ? 'bg-[#f0eaff]' : 'bg-[var(--ft-bg-secondary)]'}`}>
                                            <Link className="w-3 h-3 text-[var(--ft-text-disabled)] shrink-0" />
                                            <input
                                                className="w-full bg-transparent text-xs text-[var(--ft-text-primary)] placeholder-[var(--ft-text-disabled)] focus:outline-none"
                                                value={influencer.button3Url || ''}
                                                onChange={(e) => onUpdate(influencer.id, 'button3Url', e.target.value)}
                                                placeholder="http://..."
                                                disabled={isLinkLocked}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-left whitespace-nowrap">
                                        {influencer.hasCustomSettings ? (
                                            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-700 font-medium">개별 수정</span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500">기본</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button
                                            onClick={() => onOpenDrawer(influencer.id)}
                                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <p>표시할 인플루언서가 없습니다</p>
                </div>
            )}
        </div>
    );
}
