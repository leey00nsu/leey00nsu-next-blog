//@ts-nocheck
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import getThumbnailImage from './src/libs/getThumbnailImage';
import imageMetadata from './src/plugins/imageMetadata';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `blog/**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    slug: { type: 'string', required: true },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: true,
    },
    description: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `${post._raw.sourceFileDir}`,
    },
    thumbnail: {
      type: 'json',
      resolve: (post) => getThumbnailImage(post),
    },
  },
}));

export const AboutMe = defineDocumentType(() => ({
  name: 'AboutMe',
  contentType: 'mdx',
  filePathPattern: `about-me/*.mdx`,
  computedFields: {
    url: {
      type: 'string',
      resolve: (aboutMe) => `${aboutMe._raw.sourceFileDir}`,
    },
    imagePath: {
      type: 'string',
      resolve: () => `/posts/about-me/`,
    },
  },
}));

export const Portfolio = defineDocumentType(() => ({
  name: 'Portfolio',
  contentType: 'mdx',
  filePathPattern: `portfolio/*.mdx`,
  computedFields: {
    url: {
      type: 'string',
      resolve: (portfolio) => `${portfolio._raw.sourceFileDir}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'public/posts',
  documentTypes: [Post, AboutMe, Portfolio],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'catppuccin-frappe',
        },
      ],
      rehypeSlug,
      imageMetadata,
    ],
  },
});
