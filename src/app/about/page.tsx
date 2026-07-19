import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";

export const metadata: Metadata = {
  title: "关于我 · peelsannaw's space",
  description: "About Peelsannaw — Study in UCAS, Music, FPS Gamer, and AI developer.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-32 pt-28 sm:px-8">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted transition-opacity hover:opacity-60"
      >
        <FiArrowLeft size={14} />
        返回首页 · Home
      </Link>

      <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-accent">
        <h1>关于我 / About Me</h1>
        <p>
          Hi，我是 <strong>@Peelsannaw</strong>。目前在中国科学院大学杭州高等研究所读研二，方向是人工智能 & Ai4science，个人爱好听歌，jpop、都市爵士、陶喆、王力宏、方大同、五月天、周董...
        </p>
        <p>
          I&apos;m a student at UCAS who loves music, FPS games, and building
          things with AI. 这个小站记录我的一些想法、项目与生活片段。
        </p>
        <h2>我在做什么</h2>
        <ul>
          <li>科研与学习 · Research &amp; study</li>
          <li>写代码与折腾项目 · Coding &amp; side projects</li>
          <li>撸猫、遛狗、听歌 · Cat, dog, and music</li>
        </ul>
        <p>想找我聊聊？页面底部有我的社交方式。</p>
      </article>
    </main>
  );
}
