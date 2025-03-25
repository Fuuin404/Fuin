"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ClientSettings({ email }: { email: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteAccount = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      console.log("Confirmation requested");
      return;
    }

    console.log("Attempting to delete account");
    startTransition(async () => {
      try {
        const response = await fetch("/api/delete-account", {
          method: "DELETE",
          credentials: "include",
        });

        console.log("Response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete account: ${errorText}`);
        }

        console.log("Account deleted, redirecting to logout");
        router.push("/api/auth/logout");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete account"
        );
        console.error("Delete error:", err);
        setIsConfirming(false);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-medium mb-4">Settings</h1>
      <p>Email: {email}</p>
      <div className="mt-6">
        <Button
          variant="outline"
          onClick={handleDeleteAccount}
          disabled={isPending}
        >
          {isPending
            ? "Deleting..."
            : isConfirming
            ? "Confirm Delete"
            : "Delete Account"}
        </Button>
        {isConfirming && !error && (
          <p className="text-sm text-gray-500 mt-2">
            Are you sure? This action is permanent.
          </p>
        )}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
