import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ადმინი · Cipruli",
    template: "%s · ადმინი · Cipruli",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}
