import { allPosts, type Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export function getAllPosts(): Post[] {
  return [...allPosts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((post) => post.slug);
}
