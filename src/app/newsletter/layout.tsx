import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Linux, Cybersecurity & OSINT",
  description: "Linux Aaron Briefing mit technischen Beiträgen zu Linux, Cybersecurity, OSINT und IT Security.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
