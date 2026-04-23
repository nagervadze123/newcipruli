import Link from "next/link";
import { ProductCoverLoader } from "@/components/three/ProductCoverLoader";
import type { ProductWithRelations } from "@/lib/types";
import { formatGEL } from "@/lib/utils";

export function ProductCard({
  product,
  seed = 0,
}: {
  product: ProductWithRelations;
  seed?: number;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex flex-col transition hover:border-white/20"
    >
      <div className="relative h-44 border-b border-white/10 bg-black/30">
        <ProductCoverLoader seed={seed} />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.05] border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">
            {product.category?.name_ka ?? (product.type === "prompt" ? "პრომპტი" : "ფაილი")}
          </span>
        </div>
        <div className="mt-3 font-display font-semibold leading-tight">{product.title_ka}</div>
        {product.description_ka && (
          <div className="mt-1.5 text-sm text-[var(--fg-muted)] line-clamp-2">
            {product.description_ka}
          </div>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="text-sm">
            {product.is_free ? (
              <span className="text-[var(--cyan)]">უფასო</span>
            ) : product.price_gel ? (
              formatGEL(product.price_gel)
            ) : (
              <span className="text-[var(--fg-muted)]">დაუკავშირდი</span>
            )}
          </div>
          <div className="text-xs text-[var(--fg-muted)] group-hover:text-white transition">
            ნახვა →
          </div>
        </div>
      </div>
    </Link>
  );
}
