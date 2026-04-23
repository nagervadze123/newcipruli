import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GitHubSignInButton } from "./GitHubSignInButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "შესვლა",
  description: "შედი Cipruli.store-ში GitHub-ით.",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/sell");

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
            შემოდი <span className="text-gradient">Cipruli.store</span>-ში
          </h1>
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            გამოიყენე GitHub ანგარიში — სწრაფი, უფასო და უსაფრთხო.
          </p>

          <div className="mt-8">
            <GitHubSignInButton />
          </div>

          <div className="mt-8 text-xs text-[var(--fg-dim)]">
            შესვლით, თქვენ ეთანხმებით ჩვენ{" "}
            <Link href="/" className="underline">წესებსა და პირობებს</Link>.
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-[var(--fg-dim)]">
          ჯერ კატალოგის ნახვა გინდა?{" "}
          <Link href="/catalog" className="underline hover:text-white">
            გადახვიდე კატალოგში
          </Link>
        </div>
      </div>
    </div>
  );
}
