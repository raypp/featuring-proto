import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { InstagramPost } from "../types/CampaignProposal";

interface PostGridProps {
    posts: InstagramPost[];
    selectedPostId?: string;
    onSelect: (postId: string) => void;
}

export function PostGrid({ posts, selectedPostId, onSelect }: PostGridProps) {
    if (posts.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-[#707070] mb-2">게시물이 없습니다</p>
                <p className="text-sm text-[#bbbbbb]">
                    인스타그램에 먼저 게시물을 업로드해주세요
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className={`relative aspect-square cursor-pointer group ${selectedPostId === post.id
                            ? 'ring-2 ring-[#5e51ff] ring-inset'
                            : ''
                        }`}
                    onClick={() => onSelect(post.id)}
                >
                    <img
                        src={post.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${selectedPostId === post.id
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}>
                        {selectedPostId === post.id && (
                            <div className="w-8 h-8 rounded-full bg-[#5e51ff] flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Media Type Indicator */}
                    {post.mediaType === 'VIDEO' && (
                        <div className="absolute top-2 right-2">
                            <svg className="w-4 h-4 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    )}
                    {post.mediaType === 'CAROUSEL_ALBUM' && (
                        <div className="absolute top-2 right-2">
                            <svg className="w-4 h-4 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                                <rect x="7" y="7" width="18" height="18" rx="2" strokeWidth="2" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
