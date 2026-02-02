import { useState, useMemo } from 'react';
import { X, Send, MessageSquare, Link2, Copy, Check, Phone, Bell, ExternalLink } from 'lucide-react';
import { CoreButton, CoreAvatar } from '../../design-system';
import { CollaborationInfluencer } from '../types';

interface SmartSendModalProps {
    influencer: CollaborationInfluencer;
    templateName: string;
    campaignId?: number;
    onClose: () => void;
    onSendDirect: () => void;
    onSendAlimTalk: (phoneNumber: string, sendNotification: boolean) => void;
    onCopyLink: (link: string) => void;
}

type SendCase = 'direct' | 'alimtalk' | 'link';

export function SmartSendModal({
    influencer,
    templateName,
    campaignId = 1,
    onClose,
    onSendDirect,
    onSendAlimTalk,
    onCopyLink,
}: SmartSendModalProps) {
    // Determine case based on influencer data
    const sendCase = useMemo<SendCase>(() => {
        if (influencer.isConnected) return 'direct';
        if (influencer.phoneNumber) return 'alimtalk';
        return 'link';
    }, [influencer]);

    // State for each case
    const [alsoSendAlimTalk, setAlsoSendAlimTalk] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(influencer.phoneNumber || '');
    const [isCopied, setIsCopied] = useState(false);

    // Generate invite link
    const inviteLink = useMemo(() => {
        const uuid = Math.random().toString(36).substring(2, 10);
        return `https://feat.studio/invite/${campaignId}/${influencer.influencerId}/${uuid}`;
    }, [campaignId, influencer.influencerId]);

    // Handle actions
    const handlePrimaryAction = () => {
        switch (sendCase) {
            case 'direct':
                onSendDirect();
                if (alsoSendAlimTalk && influencer.phoneNumber) {
                    onSendAlimTalk(influencer.phoneNumber, true);
                }
                break;
            case 'alimtalk':
                onSendAlimTalk(phoneNumber, false);
                break;
            case 'link':
                navigator.clipboard.writeText(inviteLink);
                setIsCopied(true);
                onCopyLink(inviteLink);
                setTimeout(() => setIsCopied(false), 2000);
                break;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">가이드 전달하기</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Influencer Info */}
                    <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
                        <CoreAvatar
                            src={influencer.profileImage}
                            name={influencer.displayName}
                            size="md"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">{influencer.displayName}</p>
                            <p className="text-sm text-gray-500">@{influencer.username}</p>
                        </div>
                        {/* Status Badge */}
                        {sendCase === 'direct' && (
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                연결됨
                            </span>
                        )}
                    </div>

                    {/* Case A: Studio Connected */}
                    {sendCase === 'direct' && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <Send className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800">
                                        <span className="font-semibold">{influencer.displayName}</span>님은 현재 스튜디오에 연결되어 있습니다.
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        가이드를 바로 적용하시겠습니까?
                                    </p>
                                </div>
                            </div>

                            {/* Template Info */}
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">전달할 템플릿</p>
                                <p className="text-sm font-medium text-gray-900">{templateName}</p>
                            </div>

                            {/* Optional: Also send AlimTalk */}
                            {influencer.phoneNumber && (
                                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={alsoSendAlimTalk}
                                        onChange={(e) => setAlsoSendAlimTalk(e.target.checked)}
                                        className="w-4 h-4 text-[#7C3AED] rounded border-gray-300 focus:ring-[#7C3AED]"
                                    />
                                    <Bell className="w-4 h-4 text-amber-500" />
                                    <span className="text-sm text-gray-700">알림톡으로 알림도 함께 보내기</span>
                                </label>
                            )}
                        </div>
                    )}

                    {/* Case B: AlimTalk */}
                    {sendCase === 'alimtalk' && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                    <MessageSquare className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800">
                                        <span className="font-semibold">{influencer.displayName}</span>님의 연락처로 가이드 링크(알림톡)를 발송합니다.
                                    </p>
                                </div>
                            </div>

                            {/* AlimTalk Preview */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="px-3 py-2 bg-[#FEE500] flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-[#3C1E1E] flex items-center justify-center">
                                        <span className="text-[10px] text-white font-bold">K</span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-800">카카오톡 알림톡</span>
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="bg-[#FEF8E8] rounded-xl p-4 max-w-[280px]">
                                        <p className="text-xs text-gray-500 mb-2">[피처링]</p>
                                        <p className="text-sm text-gray-800 leading-relaxed">
                                            안녕하세요! 새로운 협업 가이드가 도착했습니다.
                                        </p>
                                        <p className="text-sm text-gray-800 mt-2">
                                            📋 <span className="font-medium">{templateName}</span>
                                        </p>
                                        <button className="w-full mt-3 py-2 bg-[#FEE500] text-gray-900 text-sm font-medium rounded-lg flex items-center justify-center gap-1.5">
                                            확인하기 <ExternalLink className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number Input */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1.5 block">수신자 전화번호</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="010-0000-0000"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Case C: Link Generation */}
                    {sendCase === 'link' && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-gray-100 border border-gray-200 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                    <Link2 className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800">
                                        등록된 연락처가 없습니다.
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        초대 링크를 복사하여 DM 등으로 직접 전달해주세요.
                                    </p>
                                </div>
                            </div>

                            {/* Template Info */}
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">전달할 템플릿</p>
                                <p className="text-sm font-medium text-gray-900">{templateName}</p>
                            </div>

                            {/* Generated Link */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1.5 block">초대 링크</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inviteLink}
                                        readOnly
                                        className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
                                    />
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(inviteLink);
                                            setIsCopied(true);
                                            setTimeout(() => setIsCopied(false), 2000);
                                        }}
                                        className="px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        {isCopied ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                    <CoreButton
                        variant="secondary"
                        size="md"
                        className="flex-1"
                        onClick={onClose}
                    >
                        취소
                    </CoreButton>
                    <CoreButton
                        variant="primary"
                        size="md"
                        className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9]"
                        onClick={handlePrimaryAction}
                        leftIcon={
                            sendCase === 'direct' ? <Send className="w-4 h-4" /> :
                                sendCase === 'alimtalk' ? <MessageSquare className="w-4 h-4" /> :
                                    isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />
                        }
                    >
                        {sendCase === 'direct' && '스튜디오로 즉시 전달'}
                        {sendCase === 'alimtalk' && '알림톡 발송하기'}
                        {sendCase === 'link' && (isCopied ? '복사됨!' : '링크 복사하기')}
                    </CoreButton>
                </div>
            </div>
        </div>
    );
}
