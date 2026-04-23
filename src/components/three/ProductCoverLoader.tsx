"use client";

import dynamic from "next/dynamic";

const ProductCover3D = dynamic(
  () => import("./ProductCover3D").then((m) => m.ProductCover3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center">
        <div className="size-20 rounded-xl bg-gradient-to-br from-[var(--violet)]/60 to-[var(--cyan)]/60 blur-xl animate-pulse" />
      </div>
    ),
  },
);

export function ProductCoverLoader({ seed }: { seed?: number }) {
  return <ProductCover3D seed={seed} />;
}
