import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "შესვლა" };

type SearchParams = Promise<{ error?: string; sent?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user && user.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-[80vh] grid place-items-center px-5 md:px-8">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[50rem] rounded-full bg-[var(--violet)]/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 size-[30rem] rounded-full bg-[var(--cyan)]/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 glass p-8 md:p-10 text-center">
          <div className="mx-auto size-14 rounded-2xl bg-gradient-to-br from-[var(--violet)] via-[var(--rose)] to-[var(--cyan)] shadow-[0_0_40px_rgba(155,111,255,0.55)] grid place-items-center mb-6">
            <div className="size-10 rounded-xl bg-[var(--bg-0)]" />
          </div>
          <h1 className="font-display text-3xl font-bold">
            ადმინი <span className="text-gradient">Cipruli.store</span>
          </h1>
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            მიიღე შესვლის ბმული ელფოსტით.
          </p>

          {sp.error === "forbidden" && (
            <div className="mt-4 rounded-xl border border-[var(--rose)]/30 bg-[var(--rose)]/10 p-3 text-xs text-[var(--rose)]">
              ეს ანგარიში არ არის ადმინი.
            </div>
          )}

          {sp.sent === "1" && (
            <div className="mt-4 rounded-xl border border-[var(--cyan)]/30 bg-[var(--cyan)]/10 p-3 text-xs text-[var(--cyan)]">
              შევამოწმე ელფოსტა — გამოვაგზავნე შესვლის ბმული.
            </div>
          )}

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-[var(--fg-dim)]">
          <Link href="/" className="hover:text-white">← საიტზე დაბრუნება</Link>
        </div>
      </div>
    </div>
  );
}
