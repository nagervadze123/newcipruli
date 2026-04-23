"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/lib/types";

const typeOptions = [
  { value: "", label: "ყველა ტიპი" },
  { value: "prompt", label: "პრომპტი" },
  { value: "file", label: "ფაილი" },
];

const priceOptions = [
  { value: "", label: "ყველა" },
  { value: "free", label: "უფასო" },
  { value: "paid", label: "ფასიანი" },
];

export function FilterBar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router],
  );

  const activeCategory = params.get("category") ?? "";
  const activeType = params.get("type") ?? "";
  const activePrice = params.get("price") ?? "";
  const query = params.get("q") ?? "";

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          setParam("q", (data.get("q") as string) ?? "");
        }}
      >
        <input
          name="q"
          defaultValue={query}
          placeholder="ძებნა: მაგ. Notion, React, ელ. წიგნი…"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm outline-none focus:border-white/30 placeholder:text-[var(--fg-dim)]"
        />
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setParam("category", "")}
          className={`rounded-full border px-3 py-1.5 text-xs transition ${
            activeCategory === ""
              ? "bg-white text-black border-white"
              : "border-white/10 hover:bg-white/[0.06]"
          }`}
        >
          ყველა კატეგორია
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParam("category", c.slug)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              activeCategory === c.slug
                ? "bg-white text-black border-white"
                : "border-white/10 hover:bg-white/[0.06]"
            }`}
          >
            {c.name_ka}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[var(--fg-muted)]">ტიპი:</span>
          {typeOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setParam("type", o.value)}
              className={`rounded-full px-2.5 py-1 transition ${
                activeType === o.value
                  ? "bg-[var(--violet)]/25 text-white"
                  : "text-[var(--fg-muted)] hover:text-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--fg-muted)]">ფასი:</span>
          {priceOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setParam("price", o.value)}
              className={`rounded-full px-2.5 py-1 transition ${
                activePrice === o.value
                  ? "bg-[var(--cyan)]/25 text-white"
                  : "text-[var(--fg-muted)] hover:text-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
