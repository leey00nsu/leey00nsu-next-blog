import { PostDetail } from '@/app/components/blog/post-detail';
import { allPosts } from 'contentlayer/generated';

import { notFound } from 'next/navigation';

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
