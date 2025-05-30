"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { toggleLike } from "@/app/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import "highlight.js/styles/github.css";

interface IappProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
    likes?: { id: string; userId: string }[];
  };
}

export function BlogPostCard({ data }: IappProps) {
  const { user } = useKindeBrowserClient();
  const [isPending, startTransition] = useTransition();

  const likes = data.likes || [];
  const hasLiked = user ? likes.some((like) => like.userId === user.id) : false;
  const likeCount = likes.length;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      try {
        await toggleLike(data.id);
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-sm border border-gray-200 bg-zinc-100 shadow-md transition-all hover:shadow-lg">
      {/* Image as a clickable link */}
      <Link href={`/post/${data.id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="Image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-115"
          />
        </div>
      </Link>

      <div className="p-4">
        {/* Title as a clickable link */}
        <Link href={`/post/${data.id}`}>
          <h3 className="mb-2 text-lg font-mono font-bold text-gray-900 hover:text-red-500">
            {data.title}
          </h3>
        </Link>

        {/* Markdown content outside of Link */}
        <div className="mb-4 text-sm text-gray-600 clamp-container">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkBreaks]}
          >
            {data.content}
          </ReactMarkdown>
        </div>

        {/* Author, date, and like button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative size-8 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {data.authorName}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <time className="text-xs text-gray-500">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(data.createdAt)}
            </time>
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
          </div>
        </div>
      </div>
    </div>
  );
}
