"use client";

import { useState, useTransition } from "react";
import { sendAdminLoginLink } from "@/app/admin/actions";

export function LoginForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <form
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          const res = await sendAdminLoginLink(fd);
          if (res?.error) setError(res.error);
          else setSent(true);
        });
      }}
      className="space-y-4"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="admin@example.com"
        className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm outline-none focus:border-white/30 placeholder:text-[var(--fg-dim)]"
      />

      {error && (
        <div className="rounded-xl border border-[var(--rose)]/30 bg-[var(--rose)]/10 p-3 text-xs text-[var(--rose)] text-left">
          {error}
        </div>
      )}

      {sent && !error && (
        <div className="rounded-xl border border-[var(--cyan)]/30 bg-[var(--cyan)]/10 p-3 text-xs text-[var(--cyan)] text-left">
          ბმული გაიგზავნა. შეამოწმე ელფოსტა.
        </div>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full h-12 disabled:opacity-60">
        {pending ? "იგზავნება…" : "შესვლის ბმულის გაგზავნა"}
      </button>
    </form>
  );
}
