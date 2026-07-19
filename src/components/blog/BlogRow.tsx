"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { withBasePath } from "@/lib/basePath";

export interface BlogRowData {
  slug: string;
  title: string;
  titleEn?: string;
  summary: string;
  date: string;
  cover?: string;
  tags?: string[];
  readingTime: number;
}

export function BlogRow({
  post,
  index,
}: {
  post: BlogRowData;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <motion.article
      id={`post-${post.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative scroll-mt-24"
    >
      {/* connection node — sits on the central dashed line */}
      <span className="absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-stroke bg-base md:block" />
      <Link
        href={`/posts/${post.slug}`}
        className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14"
      >
        {/* image */}
        <div
          className={`relative ${
            reversed ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-stroke/15 bg-surface text-fg transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex aspect-[4/3] items-center justify-center p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(post.cover ?? "/covers/post-1.svg")}
                alt=""
                className="h-full w-full object-contain opacity-90"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* text */}
        <div
          className={`flex flex-col ${
            reversed ? "md:order-1 md:pr-6 md:text-right md:items-end" : "md:order-2 md:pl-6"
          }`}
        >
          <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={post.date}>
              {format(new Date(post.date), "yyyy.MM.dd")}
            </time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {post.title}
          </h3>
          {post.titleEn && (
            <p className="mt-1 font-mono text-sm text-muted">{post.titleEn}</p>
          )}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {post.summary}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div
              className={`mt-5 flex flex-wrap gap-2 ${
                reversed ? "md:justify-end" : ""
              }`}
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stroke/20 px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fg transition-opacity group-hover:opacity-60">
            Read
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
