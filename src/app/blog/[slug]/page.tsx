import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";

const posts = ["osint-webanalyse"];

type Frontmatter = {
  title: string;
  date: string;
  category: string;
};

function parseFrontmatter(source: string): { frontmatter: Frontmatter; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid blog frontmatter");
  }

  const values = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const separator = line.indexOf(":");
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
      return [key, value];
    }),
  );

  return {
    frontmatter: {
      title: values.title,
      date: values.date,
      category: values.category,
    },
    body: match[2].trim(),
  };
}

function renderMarkdown(body: string) {
  return body.split(/\n\n+/).map((block, index) => {
    const text = block.trim();
    if (!text) return null;

    if (text.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-10 text-2xl font-semibold tracking-tight">
          {text.slice(3)}
        </h2>
      );
    }

    return (
      <p key={index} className="mt-5 leading-8 text-[var(--muted)]">
        {text}
      </p>
    );
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!posts.includes(slug)) notFound();

  const source = await fs.readFile(
    path.join(process.cwd(), "src/content/blog", `${slug}.mdx`),
    "utf8",
  );
  const { frontmatter, body } = parseFrontmatter(source);

  return (
    <main className="container py-20 sm:py-28">
      <article className="mx-auto max-w-3xl">
        <div className="font-mono text-xs text-[var(--muted)]">
          <span>{frontmatter.date}</span> ·{" "}
          <span className="text-[var(--accent)]">{frontmatter.category}</span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {frontmatter.title}
        </h1>
        <div className="mt-10">{renderMarkdown(body)}</div>
      </article>
    </main>
  );
}
