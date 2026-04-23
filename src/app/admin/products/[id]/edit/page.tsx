import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/guard";
import { ProductForm } from "@/app/admin/products/ProductForm";
import type { Category, Product } from "@/lib/types";

export const metadata: Metadata = { title: "რედაქტირება" };

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("*").order("id"),
  ]);

  if (!product) notFound();

  return (
    <div className="relative mx-auto max-w-3xl px-5 md:px-8 pt-12 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-[var(--violet)]/15 blur-3xl" />

      <Link href="/admin" className="relative text-sm text-[var(--fg-muted)] hover:text-white">
        ← დაფა
      </Link>

      <div className="relative mt-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          <span className="text-gradient">რედაქტირება</span>
        </h1>
        <p className="mt-2 text-[var(--fg-muted)] truncate">
          {(product as Product).title_ka}
        </p>
      </div>

      <div className="relative mt-10">
        <ProductForm
          categories={(categories as Category[]) ?? []}
          mode="edit"
          product={product as Product}
        />
      </div>
    </div>
  );
}
