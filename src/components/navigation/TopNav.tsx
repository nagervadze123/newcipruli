import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "./UserMenu";

export async function TopNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { username: string; avatar_url: string | null; display_name: string | null } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username, avatar_url, display_name")
      .eq("id", user.id)
      .maybeSingle();
    profile = data ?? null;
  }

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
          <li><Link href="/sell" className="hover:text-white transition">გაყიდე</Link></li>
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu
              username={profile?.username ?? "me"}
              displayName={profile?.display_name ?? profile?.username ?? "User"}
              avatarUrl={profile?.avatar_url ?? null}
            />
          ) : (
            <>
              <Link href="/auth/login" className="btn btn-ghost hidden sm:inline-flex">
                შესვლა
              </Link>
              <Link href="/auth/login" className="btn btn-primary">
                დაიწყე
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
