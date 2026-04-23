import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { ProductWithRelations } from "@/lib/types";
import { Plus } from "lucide-react";

export const metadata: Metadata = { title: "ჩემი ნამუშევრები" };

export default async function SellDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/sell");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_url, bio")
    .eq("id", user.id)
    .maybeSingle();

  const { data: productsData } = await supabase
    .from("products")
    .select(
      "*, category:categories(slug,name_ka), seller:profiles(username,display_name,avatar_url)",
    )
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false });

  const products = (productsData as ProductWithRelations[]) ?? [];

  return (
    <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/3 size-[28rem] rounded-full bg-[var(--violet)]/15 blur-3xl" />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] font-display">
            ჩემი სივრცე
          </div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            გამარჯობა, <span className="text-gradient">{profile?.display_name ?? profile?.username ?? "ავტორო"}</span>
          </h1>
          <p className="mt-2 text-[var(--fg-muted)]">
            შენი ნამუშევრები — ერთ სივრცეში. დაამატე ახალი ან გადახედე არსებულს.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {profile?.username && (
            <Link href={`/profile/${profile.username}`} className="btn btn-ghost">
              ჩემი პროფილი
            </Link>
          )}
          <Link href="/sell/new" className="btn btn-primary">
            <Plus className="size-4" /> ახალი ნამუშევარი
          </Link>
        </div>
      </div>

      <div className="relative mt-10">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-16 text-center">
            <div className="font-display text-2xl mb-2">ჯერ არაფერი გაქვს დამატებული</div>
            <p className="text-[var(--fg-muted)] mb-6">
              დაიწყე პირველი პრომპტით ან შაბლონით — 2 წუთში მზადდება.
            </p>
            <Link href="/sell/new" className="btn btn-primary inline-flex">
              <Plus className="size-4" /> დაამატე პირველი
            </Link>
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
  );
}
