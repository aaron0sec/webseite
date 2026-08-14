import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/buchung" } };

export default function BuchungLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
