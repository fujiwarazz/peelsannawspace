import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { FiArrowLeft } from "react-icons/fi";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "归档博客 · peelsannaw's space",
  description: "All posts archived by year.",
};

export default function ArchivePage() {
  const posts = getAllPosts();

  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    (acc[year] ??= []).push(post);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="mx-auto max-w-2xl px-5 pb-32 pt-28 sm:px-8">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted transition-opacity hover:opacity-60"
      >
        <FiArrowLeft size={14} />
        返回首页 · Home
      </Link>

      <h1 className="mb-10 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        归档博客 <span className="text-muted">/ Archive</span>
      </h1>

      <div className="flex flex-col gap-10">
        {years.map((year) => (
          <section key={year}>
            <h2 className="mb-4 font-mono text-sm text-muted">{year}</h2>
            <ul className="flex flex-col gap-3">
              {byYear[year].map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group flex items-baseline gap-4"
                  >
                    <time className="shrink-0 font-mono text-xs text-muted">
                      {format(new Date(post.date), "MM.dd")}
                    </time>
                    <span className="text-fg transition-opacity group-hover:opacity-60">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
