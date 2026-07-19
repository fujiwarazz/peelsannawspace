import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { format } from "date-fns";
import { FiArrowLeft } from "react-icons/fi";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { MdxContent } from "@/components/blog/MdxContent";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} · peelsannaw's space`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-5 pb-32 pt-28 sm:px-8">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted transition-opacity hover:opacity-60"
      >
        <FiArrowLeft size={14} />
        返回首页 · Home
      </Link>

      <article>
        <header className="mb-10 border-b border-stroke/15 pb-8">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.date}>
              {format(new Date(post.date), "yyyy.MM.dd")}
            </time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {post.title}
          </h1>
          {post.titleEn && (
            <p className="mt-2 font-mono text-base text-muted">{post.titleEn}</p>
          )}
        </header>

        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-accent prose-blockquote:border-accent">
          <MdxContent code={post.body.code} />
        </div>
      </article>
    </main>
  );
}
