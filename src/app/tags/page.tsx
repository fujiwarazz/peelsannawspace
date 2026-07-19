import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "标签分类 · peelsannaw's space",
  description: "Browse posts by tag.",
};

export default function TagsPage() {
  const posts = getAllPosts();

  const byTag = new Map<string, typeof posts>();
  posts.forEach((post) => {
    (post.tags ?? []).forEach((tag) => {
      if (!byTag.has(tag)) byTag.set(tag, []);
      byTag.get(tag)!.push(post);
    });
  });
  const tags = [...byTag.keys()].sort((a, b) =>
    byTag.get(b)!.length - byTag.get(a)!.length
  );

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
        标签分类 <span className="text-muted">/ Tags</span>
      </h1>

      <div className="flex flex-col gap-10">
        {tags.map((tag) => (
          <section key={tag}>
            <h2 className="mb-4 flex items-center gap-2 font-mono text-sm text-fg">
              <span className="rounded-full border border-stroke/25 px-3 py-1">
                #{tag}
              </span>
              <span className="text-muted">{byTag.get(tag)!.length}</span>
            </h2>
            <ul className="flex flex-col gap-2 pl-1">
              {byTag.get(tag)!.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-fg transition-opacity hover:opacity-60"
                  >
                    {post.title}
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
