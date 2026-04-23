import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/guard";
import { ProductForm } from "@/app/admin/products/ProductForm";
import type { Category } from "@/lib/types";

export const metadata: Metadata = { title: "ახალი ნამუშევარი" };

export default async function NewProductPage() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase.from("categories").select("*").order("id");

  return (
    <div className="relative mx-auto max-w-3xl px-5 md:px-8 pt-12 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-[var(--violet)]/15 blur-3xl" />

      <Link href="/admin" className="relative text-sm text-[var(--fg-muted)] hover:text-white">
        ← დაფა
      </Link>

      <div className="relative mt-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          ახალი <span className="text-gradient">ნამუშევარი</span>
        </h1>
        <p className="mt-2 text-[var(--fg-muted)]">
          მიუთითე სათაური, ტიპი, კონტენტი. პუბლიკაცია მყისიერია.
        </p>
      </div>

      <div className="relative mt-10">
        <ProductForm categories={(categories as Category[]) ?? []} mode="create" />
      </div>
    </div>
  );
}
