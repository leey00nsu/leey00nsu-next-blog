import { allDocuments } from '@/.contentlayer/generated';
import blogConfig from '@/blog.config';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemaps = allDocuments.map((doc) => {
    return {
      url: `${blogConfig.domain}/${doc.url}`,
      lastModified: doc.type === 'Post' ? new Date(doc.date) : new Date(),
    };
  });

  return [
    {
      url: blogConfig.domain,
      lastModified: new Date(),
    },
    ...sitemaps,
  ];
}
