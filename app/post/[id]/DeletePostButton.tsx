"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/app/actions";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    startTransition(async () => {
      try {
        await deletePost(postId);
        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        className="hover:text-red-500"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending
          ? "Deleting..."
          : isConfirming
          ? "Confirm Delete"
          : "Delete Post"}
      </Button>
      {isConfirming && !isPending && (
        <p className="text-sm text-gray-500 mt-2">
          Are you sure? This action will permanently delete the post.
        </p>
      )}
    </div>
  );
}
