"use client";

import { BlogRow, type BlogRowData } from "./BlogRow";
import { BlogLocator } from "./BlogLocator";

export function BlogList({ posts }: { posts: BlogRowData[] }) {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-32 pt-16 sm:px-8">
      <BlogLocator
        posts={posts.map((p) => ({ slug: p.slug, title: p.title }))}
      />
      <div className="mb-16 text-center">
        <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-muted">
          Writing
        </h2>
        <p className="mt-3 text-lg text-fg">最近的一些文字 · Recent notes</p>
      </div>

      <div className="relative">
        {/* central dashed connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-dashed border-stroke/30 md:block"
        />

        <div className="flex flex-col gap-24 md:gap-32">
          {posts.map((post, i) => (
            <BlogRow key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
