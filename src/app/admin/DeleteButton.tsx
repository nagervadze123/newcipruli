"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!confirm(`წავშალო "${title}"?`)) return;
    startTransition(async () => {
      const res = await deleteProduct(id);
      if (res?.error) alert(res.error);
    });
  }

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="rounded-lg p-2 hover:bg-[var(--rose)]/10 hover:text-[var(--rose)] transition disabled:opacity-50"
      aria-label="წაშლა"
    >
      <Trash2 className="size-4" />
    </button>
  );
}
