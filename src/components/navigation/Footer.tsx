import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-[80%] rounded-full bg-gradient-to-r from-[var(--violet)]/25 via-[var(--cyan)]/20 to-[var(--gold)]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="relative inline-flex size-7 rounded-lg bg-gradient-to-br from-[var(--violet)] via-[var(--rose)] to-[var(--cyan)]">
              <span className="absolute inset-[2px] rounded-[7px] bg-[var(--bg-0)]" />
            </span>
            Cipruli<span className="text-[var(--fg-muted)]">.store</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-[var(--fg-muted)] leading-relaxed">
            ქართული ციფრული ბაზარი. აქ ქმნი და ყიდი პრომპტებს, შაბლონებს, წიგნებს, კოდსა და ციფრულ ნამუშევრებს — ერთ სივრცეში, ქართულად.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">პროდუქტი</div>
          <ul className="space-y-2 text-sm text-[var(--fg-muted)]">
            <li><Link href="/catalog" className="hover:text-white transition">კატალოგი</Link></li>
            <li><Link href="/catalog?type=prompt" className="hover:text-white transition">პრომპტები</Link></li>
            <li><Link href="/catalog?type=file" className="hover:text-white transition">ფაილები</Link></li>
            <li><Link href="/sell" className="hover:text-white transition">გაყიდე</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Cipruli</div>
          <ul className="space-y-2 text-sm text-[var(--fg-muted)]">
            <li><Link href="/auth/login" className="hover:text-white transition">შესვლა</Link></li>
            <li><span className="opacity-60">კონტაქტი — მალე</span></li>
            <li><span className="opacity-60">წესები — მალე</span></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--fg-dim)]">
          <div>© {new Date().getFullYear()} Cipruli.store — ყველა უფლება დაცულია.</div>
          <div>დამზადებულია ❤️-ით საქართველოში</div>
        </div>
      </div>
    </footer>
  );
}
