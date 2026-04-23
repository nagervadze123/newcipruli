import Link from "next/link";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 md:px-8 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--violet)]/10 via-transparent to-[var(--cyan)]/10 p-10 md:p-16 text-center">
        <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-[var(--violet)]/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 right-0 size-[30rem] rounded-full bg-[var(--cyan)]/20 blur-3xl" />

        <div className="relative">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--cyan)] font-display">
            დაიწყე
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
            იპოვე <span className="text-gradient">შენი ნამუშევარი</span> დღესვე.
          </h2>
          <p className="mt-5 text-[var(--fg-muted)] max-w-2xl mx-auto">
            პრომპტი, შაბლონი, წიგნი, კოდი — ერთ ადგილზე, ქართულად.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/catalog" className="btn btn-gold">
              კატალოგში გადასვლა
            </Link>
            <Link href="/catalog?price=free" className="btn btn-ghost">
              უფასო ნამუშევრები
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
