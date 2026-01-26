import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Plus, X, Image as ImageIcon, Link as LinkIcon, Heart, MessageCircle, Send, Bookmark, ChevronLeft } from "lucide-react";
import { DMTemplate, CTALink } from '../types';
import { cn } from "@/app/components/ui/utils";

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: DMTemplate) => void;
  initialData?: DMTemplate;
}

type TriggerMode = 'specific' | 'all';
type PreviewTab = 'post' | 'comment' | 'dm';

// Mock post data for demonstration
const mockPostData = {
  id: '1',
  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
  caption: 'featuring.studio 게시물 본문은 한 줄만...',
  date: '12월 31일',
  username: 'featuring.studio',
};

// Suggested keywords
const suggestedKeywords = ['가격', '공동구매', '정보', '링크'];

export function CreateTemplateModal({ isOpen, onClose, onSave, initialData }: CreateTemplateModalProps) {
  // Header
  const [templateName, setTemplateName] = useState(initialData?.name || '');

  // Step 1: Post Selection
  const [selectedPost, setSelectedPost] = useState(initialData?.postData || mockPostData);

  // Step 2: Comment Trigger
  const [triggerMode, setTriggerMode] = useState<TriggerMode>('specific');
  const [keywords, setKeywords] = useState<string[]>(initialData?.triggerKeywords || []);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(initialData?.publicReplyActive || false);

  // Step 3: DM Message
  const [guide, setGuide] = useState(initialData?.dmGuide || '');
  const [links, setLinks] = useState<CTALink[]>(initialData?.ctaLinks || []);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  // Preview
  const [previewTab, setPreviewTab] = useState<PreviewTab>('post');

  if (!isOpen) return null;

  // Keyword handlers
  const handleAddKeyword = (keyword: string) => {
    if (keyword.trim() && !keywords.includes(keyword.trim()) && keywords.length < 10) {
      setKeywords([...keywords, keyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentKeyword.trim()) {
      e.preventDefault();
      handleAddKeyword(currentKeyword);
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  // Link handlers
  const addLink = () => {
    if (links.length < 3) {
      setLinks([...links, { buttonName: '', url: '', isVariable: false }]);
    }
  };

  const updateLink = (index: number, field: keyof CTALink, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  // Save handlers
  const handleSave = (deploy: boolean = false) => {
    const newTemplate: DMTemplate = {
      ...initialData,
      id: initialData?.id,
      automationGroupId: initialData?.automationGroupId || 0,
      name: templateName,
      dmGuide: guide,
      triggerKeywords: keywords,
      ctaLinks: links,
      imageUrl,
      postData: selectedPost,
      publicReplyActive: autoReplyEnabled,
      status: deploy ? 'deployed' : 'saved',
      lastModified: new Date().toISOString()
    };
    onSave(newTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#f5f5f5] rounded-2xl shadow-2xl w-[1100px] max-w-[95vw] h-[85vh] max-h-[900px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#f5f5f5] px-8 py-5 flex items-center justify-between shrink-0 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">새 자동화 템플릿 만들기</h2>
          <div className="flex items-center gap-3">
            <Input
              placeholder="템플릿 제목"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-[300px] h-10 bg-white border-gray-200 rounded-lg"
            />
            <Button
              onClick={() => handleSave(false)}
              className="h-10 px-5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white whitespace-nowrap"
            >
              저장하기
            </Button>
            <button
              onClick={onClose}
              className="ml-2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden p-6 gap-6">
          {/* Left Panel: Steps */}
          <div className="flex-1 bg-white rounded-2xl overflow-y-auto p-6 space-y-6">

            {/* STEP 1: Post Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 1</span>
                <span className="text-sm font-medium text-gray-900">어떤 게시물에서 실행할까요?</span>
                <span className="text-red-500">*</span>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  id="specific-post"
                  checked={true}
                  readOnly
                  className="mt-1 w-4 h-4 text-[#7C3AED] border-gray-300 focus:ring-[#7C3AED]"
                />
                <div className="flex-1">
                  <label htmlFor="specific-post" className="text-sm font-medium text-gray-900">특정 게시물 또는 릴스</label>

                  {/* Selected Post Card */}
                  {selectedPost && (
                    <div className="mt-3 relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 aspect-video max-w-[280px]">
                      <img
                        src={selectedPost.image}
                        alt="Selected post"
                        className="w-full h-full object-cover mix-blend-overlay opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xl font-bold tracking-wider">featuring Studio</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* STEP 2: Comment Trigger */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 2</span>
                <span className="text-sm font-medium text-gray-900">어떤 댓글에서 응답할까요?</span>
                <span className="text-red-500">*</span>
              </div>

              {/* Specific Comments */}
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  id="specific-comment"
                  checked={triggerMode === 'specific'}
                  onChange={() => setTriggerMode('specific')}
                  className="mt-1 w-4 h-4 text-[#7C3AED] border-gray-300 focus:ring-[#7C3AED]"
                />
                <div className="flex-1 space-y-3">
                  <label htmlFor="specific-comment" className="text-sm font-medium text-gray-900">특정 댓글</label>

                  {triggerMode === 'specific' && (
                    <div className="space-y-3 pl-0">
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">키워드 설정 (최대 10개) *</Label>
                        <div className="relative">
                          <Input
                            placeholder="응답할 키워드를 입력해 주세요."
                            value={currentKeyword}
                            onChange={(e) => setCurrentKeyword(e.target.value)}
                            onKeyDown={handleKeywordKeyDown}
                            className="pr-16 h-10 bg-gray-50 border-gray-200 rounded-lg"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                            {keywords.length}/10
                          </span>
                        </div>
                      </div>

                      {/* Keywords Tags */}
                      {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {keywords.map(k => (
                            <span
                              key={k}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-sm rounded-full"
                            >
                              {k}
                              <button onClick={() => removeKeyword(k)} className="hover:text-[#6D28D9]">
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Suggested Keywords */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <span className="text-blue-500">💡</span> 이런 키워드는 어때요?
                        </span>
                        {suggestedKeywords.map(kw => (
                          <button
                            key={kw}
                            onClick={() => handleAddKeyword(kw)}
                            className={cn(
                              "px-2.5 py-1 text-xs rounded-full border transition-colors",
                              keywords.includes(kw)
                                ? "bg-[#7C3AED]/10 border-[#7C3AED]/30 text-[#7C3AED]"
                                : "bg-white border-gray-200 text-gray-600 hover:border-[#7C3AED]/30 hover:text-[#7C3AED]"
                            )}
                          >
                            {kw}
                          </button>
                        ))}
                        <span className="text-pink-400">💜</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* All Comments */}
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  id="all-comments"
                  checked={triggerMode === 'all'}
                  onChange={() => setTriggerMode('all')}
                  className="mt-1 w-4 h-4 text-[#7C3AED] border-gray-300 focus:ring-[#7C3AED]"
                />
                <label htmlFor="all-comments" className="text-sm font-medium text-gray-900">모든 댓글</label>
              </div>

              {/* Auto Reply Toggle */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">자동 대댓글 설정</span>
                    <span className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">ⓘ</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">랜덤으로 발송될 3개의 답글을 필수로 입력해 주세요!</p>
                </div>
                <Switch
                  checked={autoReplyEnabled}
                  onCheckedChange={setAutoReplyEnabled}
                />
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* STEP 3: DM Message */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold rounded">STEP 3</span>
                <span className="text-sm font-medium text-gray-900">어떤 메시지를 보낼까요?</span>
                <span className="text-red-500">*</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">DM 메시지</Label>
                  <Textarea
                    placeholder="인플루언서에게 전달될 가이드 메시지를 입력하세요."
                    className="h-32 resize-none bg-gray-50 border-gray-200 rounded-lg"
                    value={guide}
                    onChange={(e) => setGuide(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 text-right">{guide.length} / 1000자</p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">이미지 (선택)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors relative group">
                    {imageUrl ? (
                      <div className="relative">
                        <img src={imageUrl} alt="Preview" className="max-h-32 mx-auto rounded" />
                        <button
                          onClick={() => setImageUrl('')}
                          className="absolute top-0 right-0 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">이미지를 드래그하거나 클릭하여 업로드</p>
                      </div>
                    )}
                    <Input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setImageUrl(url);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm text-gray-700">버튼 설정 (최대 3개)</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addLink}
                      disabled={links.length >= 3}
                      className="h-8 text-xs"
                    >
                      <Plus size={14} className="mr-1" /> 추가
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {links.map((link, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-xl space-y-2 relative group">
                        <button
                          onClick={() => removeLink(idx)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                        <Input
                          placeholder="버튼명 (예: 상품 보기)"
                          value={link.buttonName}
                          onChange={(e) => updateLink(idx, 'buttonName', e.target.value)}
                          className="bg-white h-9"
                        />
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <LinkIcon size={14} className="absolute left-3 top-2.5 text-gray-400" />
                            <Input
                              placeholder="https://"
                              value={link.url}
                              onChange={(e) => updateLink(idx, 'url', e.target.value)}
                              className="pl-9 bg-white h-9"
                              disabled={link.isVariable}
                            />
                          </div>
                          <div className="flex items-center gap-2 min-w-[100px]">
                            <input
                              type="checkbox"
                              id={`var-${idx}`}
                              checked={link.isVariable}
                              onChange={(e) => updateLink(idx, 'isVariable', e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <label htmlFor={`var-${idx}`} className="text-xs text-gray-600 cursor-pointer">
                              변수 사용
                            </label>
                          </div>
                        </div>
                        {link.isVariable && (
                          <Input
                            placeholder="변수명 (예: product_url)"
                            value={link.variableName || ''}
                            onChange={(e) => updateLink(idx, 'variableName', e.target.value)}
                            className="bg-blue-50 border-blue-200 text-blue-700 text-sm h-8"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Preview */}
          <div className="w-[380px] shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4">
              <span className="text-sm font-medium text-gray-700">미리보기</span>

              {/* Preview Tabs */}
              <div className="flex gap-1 mt-3 p-1 bg-gray-100 rounded-lg">
                {(['post', 'comment', 'dm'] as PreviewTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPreviewTab(tab)}
                    className={cn(
                      "flex-1 py-1.5 text-sm font-medium rounded-md transition-colors",
                      previewTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {tab === 'post' ? '게시물' : tab === 'comment' ? '댓글' : 'DM'}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Preview */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-[280px] bg-white rounded-[32px] shadow-2xl border border-gray-200 overflow-hidden">
                {/* Phone Header */}
                <div className="h-10 bg-white flex items-center justify-center px-4 border-b relative">
                  <ChevronLeft size={20} className="absolute left-4 text-gray-600" />
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500">{selectedPost?.username || 'featuring.studio'}</p>
                    <p className="text-xs font-semibold">게시물</p>
                  </div>
                </div>

                {/* Phone Content */}
                <div className="bg-white">
                  {previewTab === 'post' && (
                    <div>
                      {/* Post Image */}
                      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 aspect-square">
                        {selectedPost?.image && (
                          <img
                            src={selectedPost.image}
                            alt="Post"
                            className="w-full h-full object-cover mix-blend-overlay opacity-80"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-lg font-bold tracking-wider">featuring Studio</span>
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Heart size={20} className="text-gray-800" />
                            <MessageCircle size={20} className="text-gray-800" />
                            <Send size={20} className="text-gray-800" />
                          </div>
                          <Bookmark size={20} className="text-gray-800" />
                        </div>
                        <p className="text-xs text-gray-900">
                          <span className="font-semibold">{selectedPost?.username}</span>{' '}
                          {selectedPost?.caption || '게시물 본문은 한 줄만...'}
                        </p>
                        <p className="text-[10px] text-gray-500">해도 좋구요 최대 두 줄까지 노출하면 좋을...</p>
                        <p className="text-[10px] text-gray-400">댓글 모두 보기</p>
                        <p className="text-[10px] text-gray-400">{selectedPost?.date || '12월 31일'}</p>
                      </div>
                    </div>
                  )}

                  {previewTab === 'comment' && (
                    <div className="p-4 min-h-[300px]">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0" />
                          <div>
                            <p className="text-xs"><span className="font-semibold">user123</span> {keywords[0] || '가격'} 알려주세요!</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">1시간</p>
                          </div>
                        </div>
                        {autoReplyEnabled && (
                          <div className="flex gap-2 ml-10">
                            <div className="w-6 h-6 rounded-full bg-purple-400 shrink-0" />
                            <div className="bg-gray-100 rounded-xl px-3 py-2">
                              <p className="text-xs text-gray-700">DM으로 정보 보내드렸어요! 💜</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {previewTab === 'dm' && (
                    <div className="p-3 min-h-[300px] bg-gray-50">
                      <div className="flex gap-2 items-end mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-400 shrink-0" />
                        <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm text-xs max-w-[80%] whitespace-pre-wrap border border-gray-100">
                          {guide || "메시지를 입력하면 미리보기가 표시됩니다."}
                        </div>
                      </div>

                      {imageUrl && (
                        <div className="flex gap-2 mb-3 pl-10">
                          <img src={imageUrl} alt="DM Image" className="rounded-xl max-w-[80%] shadow-sm border" />
                        </div>
                      )}

                      {links.length > 0 && (
                        <div className="pl-10 space-y-2">
                          {links.map((link, i) => (
                            <div key={i} className="bg-white border text-blue-500 font-medium text-center py-2 rounded-xl shadow-sm text-xs">
                              {link.buttonName || "버튼명"}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Phone Bottom Bar */}
                <div className="h-6 bg-white flex items-center justify-center">
                  <div className="w-24 h-1 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
