'use client';

import { allPosts } from '@/.contentlayer/generated';
import { useRegisterActions } from 'kbar';
import { useRouter } from 'next/navigation';

const KBarInitializer = () => {
  const router = useRouter();

  const postsKbarMetadata = allPosts.map((post) => ({
    id: `${post.title}Action`,
    name: post.title,
    keywords: post.tags.join(''),
    shortcut: [],
    section: '블로그',
    perform: () => router.push(`/blog/${post.slug}`),
  }));

  useRegisterActions(postsKbarMetadata);

  return null;
};

export default KBarInitializer;
