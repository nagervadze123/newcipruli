"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

export function UserMenu({ username, displayName, avatarUrl }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-1 pr-3 py-1 hover:bg-white/10 transition"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={26}
            height={26}
            className="rounded-full"
            unoptimized
          />
        ) : (
          <span className="size-[26px] rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] grid place-items-center text-[11px] font-semibold text-black">
            {displayName.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="text-sm text-white/90 max-w-[7rem] truncate">{displayName}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl glass p-1.5 shadow-2xl overflow-hidden">
          <Link
            href={`/profile/${username}`}
            className="block rounded-xl px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            ჩემი პროფილი
          </Link>
          <Link
            href="/sell"
            className="block rounded-xl px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            ჩემი ნამუშევრები
          </Link>
          <Link
            href="/sell/new"
            className="block rounded-xl px-3 py-2 text-sm hover:bg-white/[0.06]"
          >
            ახლის დამატება
          </Link>
          <div className="my-1 h-px bg-white/10" />
          <button
            onClick={signOut}
            className="w-full text-left rounded-xl px-3 py-2 text-sm text-[var(--fg-muted)] hover:bg-white/[0.06] hover:text-white"
          >
            გასვლა
          </button>
        </div>
      )}
    </div>
  );
}
