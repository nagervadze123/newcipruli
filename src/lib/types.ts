export type ProductType = "prompt" | "file";

export interface Category {
  id: number;
  slug: string;
  name_ka: string;
  name_en: string;
  icon: string | null;
}

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: number | null;
  slug: string;
  title_ka: string;
  description_ka: string | null;
  type: ProductType;
  price_gel: number | null;
  is_free: boolean;
  content_text: string | null;
  file_path: string | null;
  cover_url: string | null;
  created_at: string;
}

export interface ProductWithRelations extends Product {
  category: Pick<Category, "slug" | "name_ka"> | null;
  seller: Pick<Profile, "username" | "display_name" | "avatar_url"> | null;
}
