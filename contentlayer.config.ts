import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    titleEn: { type: "string", required: false },
    summary: { type: "string", required: true },
    date: { type: "date", required: true },
    cover: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`,
    },
    readingTime: {
      type: "number",
      resolve: (doc) => Math.max(1, Math.round(readingTime(doc.body.raw).minutes)),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
