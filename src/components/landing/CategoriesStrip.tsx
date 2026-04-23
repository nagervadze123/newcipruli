import Link from "next/link";
import type { Category } from "@/lib/types";
import {
  Sparkles,
  Layout,
  BookOpen,
  Image as ImageIcon,
  Code2,
  Music,
  Video,
  FileText,
  Box,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  layout: Layout,
  book: BookOpen,
  image: ImageIcon,
  code: Code2,
  music: Music,
  video: Video,
  file: FileText,
};

export function CategoriesStrip({ categories }: { categories: Category[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 md:px-8 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] font-display">
            კატეგორიები
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            იპოვე შენი <span className="text-gradient">სივრცე</span>
          </h2>
        </div>
        <Link href="/catalog" className="text-sm text-[var(--fg-muted)] hover:text-white transition">
          ყველას ნახვა →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((c) => {
          const Icon = iconMap[c.icon ?? "file"] ?? Box;
          return (
            <Link
              key={c.id}
              href={`/catalog?category=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition p-5"
            >
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-[var(--violet)]/30 to-[var(--cyan)]/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-start justify-between">
                <Icon className="size-6 text-[var(--cyan)]" />
                <span className="text-[var(--fg-dim)] text-xs group-hover:text-white/70 transition">
                  →
                </span>
              </div>
              <div className="relative mt-8 font-medium text-white">{c.name_ka}</div>
              <div className="relative text-xs text-[var(--fg-muted)]">{c.name_en}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
