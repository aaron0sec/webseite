import fs from "node:fs/promises";
import path from "node:path";

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Invalid blog frontmatter");
  const values = Object.fromEntries(match[1].split("\n").map((line) => {
    const separator = line.indexOf(":");
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
    return [key, value];
  }));
  return { title: values.title, date: values.date, category: values.category, body: match[2].trim() };
}

function renderMarkdown(body: string) {
  return body.split(/\n\n+/).map((block, index) => {
    const text = block.trim();
    if (!text) return null;
    if (text.startsWith("## ")) return <h2 key={index} className="mt-10 text-2xl font-semibold tracking-tight">{text.slice(3)}</h2>;
    return <p key={index} className="mt-5 leading-8 text-[var(--muted)]">{text}</p>;
  });
}

export default async function HardwareBlogPost() {
  const source = await fs.readFile(path.join(process.cwd(), "src/content/blog", "hardware geldmacherei it einsteiger.mdx"), "utf8");
  const post = parseFrontmatter(source);
  return <main className="container py-20 sm:py-28"><article className="mx-auto max-w-3xl"><div className="font-mono text-xs text-[var(--muted)]"><span>{post.date}</span> · <span className="text-[var(--accent)]">{post.category}</span></div><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1><div className="mt-10">{renderMarkdown(post.body)}</div></article></main>;
}
