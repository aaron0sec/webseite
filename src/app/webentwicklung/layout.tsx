import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/webentwicklung" } };

export default function WebentwicklungLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
