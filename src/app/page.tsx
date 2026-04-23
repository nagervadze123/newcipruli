import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/landing/Hero";
import { CategoriesStrip } from "@/components/landing/CategoriesStrip";
import { FeaturedBento } from "@/components/landing/FeaturedBento";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import type { Category, ProductWithRelations } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("id"),
    supabase
      .from("products")
      .select(
        "*, category:categories(slug,name_ka), seller:profiles(username,display_name,avatar_url)",
      )
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <>
      <Hero />
      <CategoriesStrip categories={(categories as Category[]) ?? []} />
      <FeaturedBento products={(products as ProductWithRelations[]) ?? []} />
      <HowItWorks />
      <CTA />
    </>
  );
}
