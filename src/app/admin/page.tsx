import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/guard";
import type { ProductWithRelations } from "@/lib/types";
import { formatDateKa, formatGEL } from "@/lib/utils";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = { title: "დაფა" };

export default async function AdminDashboard() {
  const { user, supabase } = await requireAdmin();

  const { data, count } = await supabase
    .from("products")
    .select("*, category:categories(slug,name_ka)", { count: "exact" })
    .order("created_at", { ascending: false });
  const products = (data as ProductWithRelations[]) ?? [];

  return (
    <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-12 md:pt-16 pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/3 size-[28rem] rounded-full bg-[var(--violet)]/15 blur-3xl" />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] font-display">
            ადმინი
          </div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient">დაფა</span>
          </h1>
          <p className="mt-2 text-[var(--fg-muted)]">
            {count ?? 0} ნამუშევარი · შესული: {user.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LogoutButton />
          <Link href="/admin/products/new" className="btn btn-primary">
            <Plus className="size-4" /> ახალი ნამუშევარი
          </Link>
        </div>
      </div>

      <div className="relative mt-10">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-16 text-center">
            <div className="font-display text-2xl mb-2">ჯერ ცარიელია</div>
            <p className="text-[var(--fg-muted)] mb-6">
              დაამატე პირველი ნამუშევარი — 2 წუთში მზადდება.
            </p>
            <Link href="/admin/products/new" className="btn btn-primary inline-flex">
              <Plus className="size-4" /> პირველის დამატება
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[var(--fg-muted)]">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">სათაური</th>
                  <th className="px-4 py-3 font-medium">კატეგორია</th>
                  <th className="px-4 py-3 font-medium">ტიპი</th>
                  <th className="px-4 py-3 font-medium">ფასი</th>
                  <th className="px-4 py-3 font-medium">დამატებული</th>
                  <th className="px-4 py-3 font-medium text-right">მოქმედება</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-white/[0.05] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <Link href={`/products/${p.slug}`} className="hover:text-white">
                        {p.title_ka}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--fg-muted)]">
                      {p.category?.name_ka ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--fg-muted)]">
                      {p.type === "prompt" ? "პრომპტი" : "ფაილი"}
                    </td>
                    <td className="px-4 py-3">
                      {p.is_free ? (
                        <span className="text-[var(--cyan)]">უფასო</span>
                      ) : p.price_gel ? (
                        formatGEL(p.price_gel)
                      ) : (
                        <span className="text-[var(--fg-muted)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--fg-muted)]">
                      {formatDateKa(p.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="rounded-lg p-2 hover:bg-white/[0.06]"
                          aria-label="რედაქტირება"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <DeleteButton id={p.id} title={p.title_ka} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
