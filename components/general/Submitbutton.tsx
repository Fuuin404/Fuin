"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function Submitbutton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-fit hover:text-red-500"
      variant="outline"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
}
