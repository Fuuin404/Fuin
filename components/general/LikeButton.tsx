"use client";

import { useTransition } from "react";
import { toggleLike } from "@/app/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  postId: string;
  initialLikes: { id: string; userId: string }[];
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const { user } = useKindeBrowserClient();
  const [isPending, startTransition] = useTransition();

  const likes = initialLikes || [];
  const hasLiked = user ? likes.some((like) => like.userId === user.id) : false;
  const likeCount = likes.length;

  const handleLike = () => {
    startTransition(async () => {
      try {
        await toggleLike(postId);
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isPending || !user}
      className="flex items-center"
    >
      <svg
        className={`w-5 h-5 ${
          hasLiked ? "text-red-500 fill-red-500" : "text-gray-500"
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className="ml-1 text-sm">{likeCount}</span>
    </Button>
  );
}
