import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Profile, ProductWithRelations } from "@/lib/types";

type Params = Promise<{ username: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: { params: Params }) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!profileData) notFound();
  const profile = profileData as Profile;

  const { data: productsData } = await supabase
    .from("products")
    .select(
      "*, category:categories(slug,name_ka), seller:profiles(username,display_name,avatar_url)",
    )
    .eq("seller_id", profile.id)
    .order("created_at", { ascending: false });

  const products = (productsData as ProductWithRelations[]) ?? [];

  return (
    <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-12 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-[var(--violet)]/15 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.display_name ?? profile.username}
            width={96}
            height={96}
            className="rounded-full border border-white/10"
            unoptimized
          />
        ) : (
          <div className="size-24 rounded-full bg-gradient-to-br from-[var(--violet)] via-[var(--rose)] to-[var(--cyan)]" />
        )}
        <h1 className="mt-5 font-display text-3xl md:text-4xl font-bold">
          {profile.display_name ?? profile.username}
        </h1>
        <div className="text-[var(--fg-muted)] text-sm mt-1">@{profile.username}</div>
        {profile.bio && (
          <p className="mt-4 max-w-xl text-[var(--fg-muted)]">{profile.bio}</p>
        )}
      </div>

      <div className="relative mt-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-semibold">ნამუშევრები</h2>
          <div className="text-sm text-[var(--fg-muted)]">{products.length} ნამუშევარი</div>
        </div>
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-[var(--fg-muted)]">
            ჯერ არაფერი გამოუქვეყნებია.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} seed={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
