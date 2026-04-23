import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40">
      <div className="absolute inset-0 bg-[var(--bg-0)]/60 backdrop-blur-xl border-b border-white/[0.06] pointer-events-none" />
      <nav className="relative flex items-center justify-between gap-4 mx-auto max-w-7xl px-5 md:px-8 h-16">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="relative inline-flex size-7 rounded-lg bg-gradient-to-br from-[var(--violet)] via-[var(--rose)] to-[var(--cyan)] shadow-[0_0_24px_rgba(155,111,255,0.55)]">
            <span className="absolute inset-[2px] rounded-[7px] bg-[var(--bg-0)]" />
            <span className="absolute inset-0 m-auto size-2 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)]" />
          </span>
          <span className="text-[1.05rem]">
            Cipruli<span className="text-[var(--fg-muted)]">.store</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-sm text-[var(--fg-muted)]">
          <li><Link href="/catalog" className="hover:text-white transition">კატალოგი</Link></li>
          <li><Link href="/catalog?type=prompt" className="hover:text-white transition">პრომპტები</Link></li>
          <li><Link href="/catalog?type=file" className="hover:text-white transition">ფაილები</Link></li>
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/catalog" className="btn btn-primary">
            კატალოგის ნახვა
          </Link>
        </div>
      </nav>
    </header>
  );
}
