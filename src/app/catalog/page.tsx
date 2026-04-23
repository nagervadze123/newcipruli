import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { FilterBar } from "@/components/catalog/FilterBar";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Category, ProductWithRelations } from "@/lib/types";

export const metadata: Metadata = {
  title: "კატალოგი",
  description: "აღმოაჩინე ქართული ციფრული ნამუშევრები — პრომპტები, შაბლონები, წიგნები, კოდი.",
};

type SearchParams = Promise<{
  category?: string;
  type?: string;
  price?: string;
  q?: string;
}>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const supabase = await createClient();

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("*")
    .order("id");
  const categories = (categoriesData as Category[]) ?? [];

  let query = supabase
    .from("products")
    .select("*, category:categories(slug,name_ka)")
    .order("created_at", { ascending: false })
    .limit(48);

  if (sp.type === "prompt" || sp.type === "file") {
    query = query.eq("type", sp.type);
  }
  if (sp.price === "free") {
    query = query.eq("is_free", true);
  } else if (sp.price === "paid") {
    query = query.eq("is_free", false);
  }
  if (sp.category) {
    const cat = categories.find((c) => c.slug === sp.category);
    if (cat) query = query.eq("category_id", cat.id);
  }
  if (sp.q) {
    query = query.ilike("title_ka", `%${sp.q}%`);
  }

  const { data: productsData } = await query;
  const products = (productsData as ProductWithRelations[]) ?? [];

  return (
    <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[24rem] w-[50rem] rounded-full bg-[var(--violet)]/15 blur-3xl" />

      <div className="relative">
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] font-display">
          კატალოგი
        </div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">
          ყველა <span className="text-gradient">ციფრული ნამუშევარი</span>
        </h1>
        <p className="mt-3 text-[var(--fg-muted)] max-w-xl">
          იპოვე რაც შენ გჭირდება — პრომპტი, შაბლონი, წიგნი ან კოდი — ქართულად.
        </p>

        <div className="mt-10">
          <FilterBar categories={categories} />
        </div>

        <div className="mt-10">
          {products.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-16 text-center">
              <div className="font-display text-2xl mb-2">მალე ვეძებთ ახალ ნამუშევრებს</div>
              <p className="text-[var(--fg-muted)]">
                კატალოგი მალე შეივსება — დაგვიბრუნდი.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} seed={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
