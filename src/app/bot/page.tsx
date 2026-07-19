import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";

export const metadata: Metadata = {
  title: "我的 AI Bot · peelsannaw's space",
  description: "A personal AI bot — coming soon.",
};

export default function BotPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-5 pb-32 pt-28 sm:px-8">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted transition-opacity hover:opacity-60"
      >
        <FiArrowLeft size={14} />
        返回首页 · Home
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-stroke/25 font-mono text-2xl text-fg">
          AI
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          我的 AI Bot
        </h1>
        <p className="mt-4 max-w-md text-muted">
          一个可以和我聊天、了解我的小助手正在训练中 🤖
          <br />
          A personal AI bot is coming soon.
        </p>
      </div>
    </main>
  );
}
