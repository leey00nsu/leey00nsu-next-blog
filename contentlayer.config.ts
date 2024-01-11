// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    slug: { type: "string", required: true },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: true,
    },
    description: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `${post._raw.sourceFileDir}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "public/posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: "slack-dark",
        },
      ],
      // @ts-ignore
      highlight,
    ],
  },
});
