import Link from "next/link";
import { ProductCoverLoader } from "@/components/three/ProductCoverLoader";
import type { ProductWithRelations } from "@/lib/types";
import { formatGEL } from "@/lib/utils";

type DemoItem = {
  title_ka: string;
  tag: string;
  type: "prompt" | "file";
  slug: string;
  blurb_ka: string;
  seed: number;
  span?: "col-span-1" | "md:col-span-2" | "md:row-span-2";
};

const demoItems: DemoItem[] = [
  {
    title_ka: "მწერლისთვის · AI პრომპტების ნაკრები",
    tag: "პრომპტი",
    type: "prompt",
    slug: "writer-prompts-pack",
    blurb_ka: "40 ქართული პრომპტი — მოთხრობა, ესსე, სცენარი.",
    seed: 0,
    span: "md:col-span-2",
  },
  {
    title_ka: "Notion შაბლონი — ქართული CRM",
    tag: "შაბლონი",
    type: "file",
    slug: "notion-ka-crm",
    blurb_ka: "მზა სისტემა ქართული მცირე ბიზნესისთვის.",
    seed: 1,
  },
  {
    title_ka: "Brand Kit — ფერი · ფონტი · ლოგო",
    tag: "გრაფიკა",
    type: "file",
    slug: "brand-kit-ka",
    blurb_ka: "ქართული ბრენდინგის კომპლექტი დიზაინერებისთვის.",
    seed: 2,
    span: "md:row-span-2",
  },
  {
    title_ka: "ElevenLabs + ქართული · პრომპტები",
    tag: "აუდიო",
    type: "prompt",
    slug: "elevenlabs-ka",
    blurb_ka: "ქართული ხმის გენერაციის საუკეთესო პრომპტები.",
    seed: 3,
  },
  {
    title_ka: "ელ. წიგნი — ციფრული მარკეტინგი ქართულად",
    tag: "ელ. წიგნი",
    type: "file",
    slug: "digital-marketing-ebook",
    blurb_ka: "80 გვერდი, პრაქტიკული ნაბიჯები.",
    seed: 4,
  },
  {
    title_ka: "React სტარტერი + Supabase",
    tag: "კოდი",
    type: "file",
    slug: "react-supabase-starter",
    blurb_ka: "საწყისი პროექტი ქართული ინსტრუქციებით.",
    seed: 5,
    span: "md:col-span-2",
  },
];

function typeBadge(t: "prompt" | "file") {
  return t === "prompt" ? "პრომპტი" : "ფაილი";
}

function Tile({
  title,
  tag,
  blurb,
  href,
  seed,
  span,
  price,
  isFree,
}: {
  title: string;
  tag: string;
  blurb: string;
  href: string;
  seed: number;
  span?: string;
  price?: number | null;
  isFree?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] ${
        span ?? "col-span-1"
      } min-h-[260px] md:min-h-[300px] flex flex-col`}
    >
      {/* 3D cover */}
      <div className="relative h-44 md:h-48 border-b border-white/10 bg-black/30">
        <ProductCoverLoader seed={seed} />
      </div>

      <div className="relative flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">
            {tag}
          </span>
        </div>
        <div className="mt-3 font-display text-lg md:text-xl font-semibold leading-tight">{title}</div>
        <div className="mt-2 text-sm text-[var(--fg-muted)] line-clamp-2">{blurb}</div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {isFree ? "უფასო" : price ? formatGEL(price) : "დაუკავშირდი ავტორს"}
          </span>
          <span className="text-xs text-[var(--fg-muted)] group-hover:text-white transition">
            ნახვა →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedBento({ products }: { products: ProductWithRelations[] }) {
  // Merge real products (first) with demo items up to 6 total
  const itemCount = 6;
  const realCount = Math.min(products.length, itemCount);
  const demoFallback = demoItems.slice(0, itemCount - realCount);

  return (
    <section className="relative mx-auto max-w-7xl px-5 md:px-8 py-20 aurora">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)] font-display">
            რჩეული
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            ახლა <span className="text-gradient">პოპულარული</span>
          </h2>
        </div>
        <Link href="/catalog" className="text-sm text-[var(--fg-muted)] hover:text-white transition">
          ყველა ნამუშევარი →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[300px] gap-4">
        {products.slice(0, realCount).map((p, i) => (
          <Tile
            key={p.id}
            title={p.title_ka}
            tag={p.category?.name_ka ?? typeBadge(p.type)}
            blurb={p.description_ka ?? ""}
            href={`/products/${p.slug}`}
            seed={i}
            price={p.price_gel}
            isFree={p.is_free}
            span={i === 0 ? "md:col-span-2" : i === 2 ? "md:row-span-2" : undefined}
          />
        ))}
        {demoFallback.map((d) => (
          <Tile
            key={d.slug}
            title={d.title_ka}
            tag={d.tag}
            blurb={d.blurb_ka}
            href={`/catalog`}
            seed={d.seed}
            isFree
            span={d.span}
          />
        ))}
      </div>

      <div className="mt-4 text-center text-xs text-[var(--fg-dim)]">
        რჩეული ნიმუშები — მალე ავტორების ნამუშევრებით ჩანაცვლდება.
      </div>
    </section>
  );
}
