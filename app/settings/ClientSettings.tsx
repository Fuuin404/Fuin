"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ClientSettings({ email }: { email: string }) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Handle Delete Account
  const handleDeleteAccount = () => {
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/delete-account", {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete account: ${errorText}`);
        }

        router.push("/api/auth/logout");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete account"
        );
        setIsConfirmingDelete(false);
      }
    });
  };

  // Handle Log Out Everywhere (Placeholder)
  const handleLogoutEverywhere = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/logout-everywhere", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to log out everywhere: ${errorText}`);
        }

        setError(null);
        alert("Logged out from all other devices.");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to log out everywhere"
        );
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 font-mono">
      <h1 className="text-3xl font-medium mb-4">Settings</h1>
      <p>Email: {email}</p>

      {/* Log Out Everywhere */}
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-2">Sessions</h2>
        <Button
          variant="outline"
          onClick={handleLogoutEverywhere}
          disabled={isPending}
        >
          {isPending ? "Logging out..." : "Log Out Everywhere"}
        </Button>
      </div>

      {/* Delete Account */}
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-2">Delete Account</h2>
        <Button
          variant="outline"
          onClick={handleDeleteAccount}
          disabled={isPending}
        >
          {isPending
            ? "Deleting..."
            : isConfirmingDelete
            ? "Confirm Delete"
            : "Delete Account"}
        </Button>
        {isConfirmingDelete && !error && (
          <p className="text-sm text-gray-500 mt-2">
            Are you sure? This action is permanent.
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
