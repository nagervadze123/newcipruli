"use client";

import { useTransition } from "react";
import { adminLogout } from "@/app/admin/actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <button
      onClick={() => startTransition(() => adminLogout())}
      disabled={pending}
      className="btn btn-ghost"
    >
      {pending ? "გასვლა…" : "გასვლა"}
    </button>
  );
}
