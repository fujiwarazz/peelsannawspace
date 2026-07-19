"use client";

import { useState } from "react";
import { SiBilibili } from "react-icons/si";
import { FaGithub, FaXTwitter, FaWeixin } from "react-icons/fa6";

const links = [
  {
    label: "Bilibili",
    href: "https://space.bilibili.com/381950437?spm_id_from=333.1007.0.0",
    Icon: SiBilibili,
  },
  { label: "GitHub", href: "https://github.com/fujiwarazz", Icon: FaGithub },
  { label: "X", href: "https://x.com/S9ykM3tutAz6NLY", Icon: FaXTwitter },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText("peelsannaw");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="border-t border-stroke/10 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6">
        <div className="flex items-center gap-6">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-fg/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-fg"
            >
              <Icon size={22} />
            </a>
          ))}

          {/* WeChat — copy id on click */}
          <button
            type="button"
            onClick={copyWechat}
            aria-label="微信: peelsannaw"
            className="group relative text-fg/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-fg"
          >
            <FaWeixin size={22} />
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-stroke/20 bg-base/95 px-2.5 py-1 font-mono text-[11px] text-fg opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
              {copied ? "已复制 ✓" : "微信: peelsannaw"}
            </span>
          </button>
        </div>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} peelsannaw&apos;s space
        </p>
      </div>
    </footer>
  );
}
