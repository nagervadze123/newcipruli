import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { ProductCoverLoader } from "@/components/three/ProductCoverLoader";
import type { ProductWithRelations } from "@/lib/types";
import { formatGEL, formatDateKa } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("title_ka, description_ka")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return { title: "ნამუშევარი ვერ მოიძებნა" };
  return {
    title: data.title_ka,
    description: data.description_ka ?? undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select(
      "*, category:categories(slug,name_ka), seller:profiles(username,display_name,avatar_url)",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!data) notFound();
  const product = data as ProductWithRelations;

  return (
    <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-20 size-[40rem] rounded-full bg-[var(--violet)]/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-20 -right-20 size-[30rem] rounded-full bg-[var(--cyan)]/15 blur-3xl" />

      <Link href="/catalog" className="relative text-sm text-[var(--fg-muted)] hover:text-white">
        ← კატალოგი
      </Link>

      <div className="relative mt-6 grid md:grid-cols-5 gap-8">
        {/* 3D cover */}
        <div className="md:col-span-2 relative rounded-3xl border border-white/10 bg-black/30 overflow-hidden h-[380px] md:h-[560px]">
          <ProductCoverLoader seed={Math.floor(Math.random() * 4)} />
        </div>

        {/* Info */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-2">
            {product.category && (
              <span className="inline-flex items-center rounded-full bg-white/[0.05] border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">
                {product.category.name_ka}
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-[var(--violet)]/20 border border-[var(--violet)]/30 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[var(--violet)]">
              {product.type === "prompt" ? "პრომპტი" : "ფაილი"}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight">
            {product.title_ka}
          </h1>

          {product.description_ka && (
            <p className="mt-5 text-[var(--fg-muted)] text-base md:text-lg leading-relaxed">
              {product.description_ka}
            </p>
          )}

          {/* Price / CTA */}
          <div className="mt-8 rounded-2xl glass p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-[var(--fg-muted)]">ფასი</div>
              <div className="mt-1 font-display text-3xl">
                {product.is_free ? (
                  <span className="text-[var(--cyan)]">უფასო</span>
                ) : product.price_gel ? (
                  formatGEL(product.price_gel)
                ) : (
                  <span className="text-[var(--fg-muted)]">შეთანხმებით</span>
                )}
              </div>
            </div>
            {product.is_free && product.type === "prompt" && product.content_text ? (
              <details className="w-full">
                <summary className="btn btn-primary cursor-pointer list-none">
                  პრომპტის ნახვა
                </summary>
                <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-white/90">
                  {product.content_text}
                </pre>
              </details>
            ) : (
              <Link href={`/profile/${product.seller?.username ?? ""}`} className="btn btn-primary">
                ავტორთან დაკავშირება
              </Link>
            )}
          </div>

          {/* Seller */}
          {product.seller && (
            <Link
              href={`/profile/${product.seller.username}`}
              className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
            >
              {product.seller.avatar_url ? (
                <Image
                  src={product.seller.avatar_url}
                  alt={product.seller.display_name ?? product.seller.username}
                  width={44}
                  height={44}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <div className="size-11 rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)]" />
              )}
              <div>
                <div className="text-xs text-[var(--fg-muted)]">ავტორი</div>
                <div className="font-medium">
                  {product.seller.display_name ?? product.seller.username}
                </div>
                <div className="text-xs text-[var(--fg-muted)]">@{product.seller.username}</div>
              </div>
            </Link>
          )}

          <div className="mt-6 text-xs text-[var(--fg-dim)]">
            გამოქვეყნდა: {formatDateKa(product.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}
