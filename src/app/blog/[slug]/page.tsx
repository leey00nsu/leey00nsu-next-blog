import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { PostDetail } from '@/src/components/blog/post-detail';

export const generateStaticParams = () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  return { title: currentPost.title };
};

const Post = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  return <PostDetail post={currentPost} />;
};

export default Post;
