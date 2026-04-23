"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/guard";
import { slugify } from "@/lib/utils";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function sendAdminLoginLink(
  formData: FormData,
): Promise<{ error?: string; ok?: true }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "შეიყვანე ელფოსტა." };
  if (email !== ADMIN_EMAIL) return { error: "ეს ელფოსტა არ არის ადმინი." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${SITE_URL}/admin/callback`,
      shouldCreateUser: false,
    },
  });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function adminLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function ensureUniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const supabase = await createClient();
  const base = slugify(title) || "product";
  let slug = base;
  for (let i = 0; i < 8; i++) {
    const { data } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!data || data.id === ignoreId) break;
    slug = `${base}-${Math.floor(Math.random() * 10000)}`;
  }
  return slug;
}

export async function createProduct(
  formData: FormData,
): Promise<{ slug?: string; error?: string }> {
  const { user, supabase } = await requireAdmin();

  const title_ka = String(formData.get("title_ka") ?? "").trim();
  const description_ka = String(formData.get("description_ka") ?? "").trim() || null;
  const category_id_raw = String(formData.get("category_id") ?? "");
  const type = String(formData.get("type") ?? "prompt");
  const is_free = formData.get("is_free") === "on";
  const price_raw = String(formData.get("price_gel") ?? "");
  const content_text = String(formData.get("content_text") ?? "").trim() || null;
  const author_name = String(formData.get("author_name") ?? "").trim() || null;

  if (!title_ka) return { error: "სათაური აუცილებელია." };
  if (type !== "prompt" && type !== "file") return { error: "ტიპი უცნობია." };
  if (type === "prompt" && !content_text)
    return { error: "პრომპტის ტექსტი აუცილებელია." };

  const price_gel = is_free ? null : price_raw ? Number(price_raw) : null;
  const category_id = category_id_raw ? Number(category_id_raw) : null;
  const slug = await ensureUniqueSlug(title_ka);

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
      author_name,
      slug,
    })
    .select("slug")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath("/");
  return { slug: data.slug };
}

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<{ slug?: string; error?: string }> {
  const { supabase } = await requireAdmin();

  const title_ka = String(formData.get("title_ka") ?? "").trim();
  const description_ka = String(formData.get("description_ka") ?? "").trim() || null;
  const category_id_raw = String(formData.get("category_id") ?? "");
  const type = String(formData.get("type") ?? "prompt");
  const is_free = formData.get("is_free") === "on";
  const price_raw = String(formData.get("price_gel") ?? "");
  const content_text = String(formData.get("content_text") ?? "").trim() || null;
  const author_name = String(formData.get("author_name") ?? "").trim() || null;

  if (!title_ka) return { error: "სათაური აუცილებელია." };
  if (type !== "prompt" && type !== "file") return { error: "ტიპი უცნობია." };

  const price_gel = is_free ? null : price_raw ? Number(price_raw) : null;
  const category_id = category_id_raw ? Number(category_id_raw) : null;
  const slug = await ensureUniqueSlug(title_ka, id);

  const { data, error } = await supabase
    .from("products")
    .update({
      title_ka,
      description_ka,
      category_id,
      type,
      is_free,
      price_gel,
      content_text,
      author_name,
      slug,
    })
    .eq("id", id)
    .select("slug")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath(`/products/${data.slug}`);
  revalidatePath("/");
  return { slug: data.slug };
}

export async function deleteProduct(id: string): Promise<{ error?: string; ok?: true }> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath("/");
  return { ok: true };
}
