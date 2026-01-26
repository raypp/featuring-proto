import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { InfluencerTemplateAssignment } from "../types";
import { format } from "date-fns";
import { CheckCircle2, AlertCircle, Clock, ExternalLink } from "lucide-react";

interface TemplateDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    assignment: InfluencerTemplateAssignment | null;
}

export function TemplateDetailModal({ isOpen, onClose, assignment }: TemplateDetailModalProps) {
    if (!assignment) return null;

    const { snapshotContent, deliveryStatus, failReason, variables } = assignment;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'delivered':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">전달됨</Badge>;
            case 'failed':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">실패</Badge>;
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">대기중</Badge>;
            default:
                return <Badge variant="outline" className="text-gray-500">미전달</Badge>;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 bg-white">
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <DialogTitle className="text-xl">{assignment.templateName}</DialogTitle>
                            <Badge variant="secondary" className="font-normal text-xs">
                                v{assignment.snapshotVersion}
                            </Badge>
                            {getStatusBadge(deliveryStatus)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        마지막 수정: {format(new Date(assignment.lastModifiedAt), 'yyyy-MM-dd HH:mm')}
                    </p>
                </DialogHeader>

                <ScrollArea className="flex-1 px-6 py-6">
                    <div className="space-y-8">
                        {/* Guide Message */}
                        <section>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">DM 가이드 메시지 (스냅샷)</h3>
                            <div className="bg-gray-50 border rounded-lg p-4 text-sm whitespace-pre-wrap leading-relaxed text-gray-700">
                                {snapshotContent?.dmGuide || "(내용 없음)"}
                            </div>
                        </section>

                        {/* Image */}
                        {snapshotContent?.imageUrl && (
                            <section>
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">첨부 이미지</h3>
                                <img
                                    src={snapshotContent.imageUrl}
                                    alt="Template Attachment"
                                    className="rounded-lg border max-h-60 object-cover"
                                />
                            </section>
                        )}

                        {/* Buttons & Variables */}
                        <section>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">버튼 및 변수 구성</h3>
                            <div className="space-y-3">
                                {snapshotContent?.ctaLinks.map((link, idx) => {
                                    const variableValue = link.variableName ? variables[link.variableName] : null;

                                    return (
                                        <div key={idx} className="flex flex-col gap-2 p-3 border rounded-lg bg-white">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm flex items-center gap-2">
                                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">버튼 {idx + 1}</span>
                                                    {link.buttonName}
                                                </span>
                                                {link.isVariable && (
                                                    <span className="text-xs text-gray-400 font-mono">variable: {link.variableName}</span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                <ExternalLink size={14} className="text-gray-400" />
                                                <span className="flex-1 truncate font-mono text-xs">
                                                    {link.isVariable ? (variableValue || "(값 없음)") : link.url}
                                                </span>
                                            </div>

                                            {link.isVariable && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    * 이 변수는 인라인 편집이 가능합니다.
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                                {(!snapshotContent?.ctaLinks || snapshotContent.ctaLinks.length === 0) && (
                                    <p className="text-sm text-gray-500">설정된 버튼이 없습니다.</p>
                                )}
                            </div>
                        </section>

                        <Separator />

                        {/* Delivery History */}
                        <section>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">전달 이력</h3>
                            <div className="space-y-4">
                                {deliveryStatus === 'delivered' && (
                                    <div className="flex gap-3 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">전달 완료</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {assignment.deliveredAt ? format(new Date(assignment.deliveredAt), 'yyyy-MM-dd HH:mm:ss') : '-'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {deliveryStatus === 'failed' && (
                                    <div className="flex gap-3 items-start">
                                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">전달 실패</p>
                                            <p className="text-xs text-red-500 mt-1 break-all">
                                                사유: {failReason || '알 수 없는 오류'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {deliveryStatus === 'not_delivered' && (
                                    <div className="flex gap-3 items-start">
                                        <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">미전달 상태</p>
                                            <p className="text-xs text-gray-500 mt-1">아직 인플루언서에게 전달되지 않았습니다.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                <div className="p-4 border-t flex justify-end bg-gray-50">
                    <Button variant="outline" onClick={onClose}>닫기</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
