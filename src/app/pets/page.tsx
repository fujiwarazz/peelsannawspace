import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";

export const metadata: Metadata = {
  title: "我的宠物 · peelsannaw's space",
  description: "Meet my pets — a Siamese cat and a West Highland White Terrier.",
};

export default function PetsPage() {
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
        <h1>我的宠物 / My Pets</h1>
        <p>陪伴我每天散步的两位小家伙 🐾</p>
        <h2>🐕 西高地白㹴 · West Highland White Terrier</h2>
        <p>
          活泼、粘人、走路带风的小白狗。最爱散步和翻肚皮求摸摸。A cheerful little
          white terrier who loves walks.
        </p>
        <h2>🐈 暹罗猫 · Siamese Cat</h2>
        <p>
          高冷又爱撒娇的暹罗，喜欢趴在门槛上晒太阳打盹。An elegant Siamese who
          naps in the sun all day.
        </p>
        <p>（这里之后可以放它们的照片～）</p>
      </article>
    </main>
  );
}
