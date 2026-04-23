"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function createProduct(
  formData: FormData,
): Promise<{ slug?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "შედი სისტემაში სანამ გამოაქვეყნებ." };

  const title_ka = String(formData.get("title_ka") ?? "").trim();
  const description_ka = String(formData.get("description_ka") ?? "").trim() || null;
  const category_id_raw = String(formData.get("category_id") ?? "");
  const type = String(formData.get("type") ?? "prompt");
  const is_free = formData.get("is_free") === "on";
  const price_raw = String(formData.get("price_gel") ?? "");
  const content_text = String(formData.get("content_text") ?? "").trim() || null;

  if (!title_ka) return { error: "სათაური აუცილებელია." };
  if (type !== "prompt" && type !== "file")
    return { error: "ტიპი უცნობია." };
  if (type === "prompt" && !content_text)
    return { error: "პრომპტის ტექსტი აუცილებელია." };

  const price_gel = is_free ? null : price_raw ? Number(price_raw) : null;
  const category_id = category_id_raw ? Number(category_id_raw) : null;

  const baseSlug = slugify(title_ka) || "product";
  let slug = baseSlug;
  for (let i = 0; i < 8; i++) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      seller_id: user.id,
      title_ka,
      description_ka,
      category_id,
      type,
      is_free,
      price_gel,
      content_text,
      slug,
    })
    .select("slug")
    .single();

  if (error) return { error: error.message };
  return { slug: data.slug };
}
