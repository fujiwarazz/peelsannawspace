"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/mdx-components";

export function MdxContent({ code }: { code: string }) {
  const MDX = useMDXComponent(code);
  return <MDX components={mdxComponents} />;
}
