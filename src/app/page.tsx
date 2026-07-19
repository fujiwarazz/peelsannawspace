import { Banner } from "@/components/banner/Banner";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    titleEn: p.titleEn,
    summary: p.summary,
    date: p.date,
    cover: p.cover,
    tags: p.tags,
    readingTime: p.readingTime,
  }));

  return (
    <main>
      <Banner />
      <BlogList posts={posts} />
    </main>
  );
}
