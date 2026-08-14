import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/rechtlicher-hinweis" } };

export default function LegalNoticeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
