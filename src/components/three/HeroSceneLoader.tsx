"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="size-24 rounded-full bg-gradient-to-br from-[var(--violet)]/60 via-[var(--rose)]/40 to-[var(--cyan)]/60 blur-2xl animate-pulse" />
    </div>
  ),
});

export function HeroSceneLoader() {
  return <HeroScene />;
}
