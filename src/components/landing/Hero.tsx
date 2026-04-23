import Link from "next/link";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";

export function Hero() {
  return (
    <section className="relative min-h-[min(92vh,900px)] overflow-hidden">
      {/* Aurora + grid backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 -left-20 h-[40rem] w-[40rem] rounded-full bg-[var(--violet)]/30 blur-3xl" />
        <div className="absolute top-10 -right-20 h-[32rem] w-[32rem] rounded-full bg-[var(--cyan)]/25 blur-3xl" />
        <div className="absolute bottom-[-10%] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--rose)]/20 blur-3xl" />
      </div>

      {/* 3D canvas, behind content */}
      <div className="absolute inset-0 z-0 noise">
        <HeroSceneLoader />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-24 md:pt-32 pb-24 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--cyan)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--cyan)]" />
          </span>
          <span className="text-white/80">ახალი ერა — ქართული ციფრული მარკეტი</span>
        </div>

        <h1 className="kin-in mt-8 text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.02]">
          <span className="block text-white">შექმენი. გაყიდე.</span>
          <span className="block text-gradient">გააციფრულე.</span>
        </h1>

        <p className="kin-in kin-delay-2 mx-auto mt-8 max-w-2xl text-base md:text-lg text-[var(--fg-muted)] leading-relaxed">
          Cipruli.store — ერთი ადგილი, სადაც ქართული შემოქმედებითი გონება ხვდება ციფრულ ბაზარს.
          AI პრომპტები, შაბლონები, ელ. წიგნები, კოდი და სხვა — ყველაფერი ერთად, ქართულად.
        </p>

        <div className="kin-in kin-delay-3 mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/catalog" className="btn btn-primary">
            კატალოგის დათვალიერება
          </Link>
          <Link href="/auth/login" className="btn btn-ghost">
            გაყიდვის დაწყება
          </Link>
        </div>

        {/* tiny stats */}
        <div className="kin-in kin-delay-4 mt-14 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[
            { k: "100%", v: "ქართულად" },
            { k: "0₾", v: "პლატფორმის გადასახადი" },
            { k: "∞", v: "შემოქმედებითი სივრცე" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl px-4 py-5">
              <div className="font-display text-2xl md:text-3xl text-gradient">{s.k}</div>
              <div className="text-xs md:text-sm text-[var(--fg-muted)] mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
