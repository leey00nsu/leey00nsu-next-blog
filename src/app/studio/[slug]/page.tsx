import { allPosts } from '@/.contentlayer/generated';
import { notFound } from 'next/navigation';

import { Studio } from '@/src/components/studio';

export const generateStaticParams = () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

const Page = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  return <Studio post={currentPost} />;
};

export default Page;
