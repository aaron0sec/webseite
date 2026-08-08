import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";

const posts = ["osint-webanalyse"];

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!posts.includes(slug)) notFound();
  const source = await fs.readFile(path.join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8");
  const { content, frontmatter } = await compileMDX<{ title: string; date: string; category: string }>({ source, options: { parseFrontmatter: true } });
  return <main className="container py-20 sm:py-28"><article className="mx-auto max-w-3xl"><div className="font-mono text-xs text-[var(--muted)]"><span>{frontmatter.date}</span> · <span className="text-[var(--accent)]">{frontmatter.category}</span></div><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{frontmatter.title}</h1><div className="prose mt-10">{content}</div></article></main>;
}
