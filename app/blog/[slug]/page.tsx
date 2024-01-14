import CustomImage from '@/app/components/CustomImage';
import CustomLink from '@/app/components/CustomLink';
import CustomSnipet from '@/app/components/CustomSnipet';
import Toc from '@/app/components/Toc';
import parseDate from '@/app/lib/parseDate';
import { allPosts } from 'contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  return { title: currentPost.title };
};

// 커스텀 mdx 컴포넌트
const mdxComponents = {
  a: CustomLink,
  img: CustomImage,
  figcaption: CustomSnipet,
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  const { body, title, date } = currentPost;

  const MDXContent = useMDXComponent(body.code);

  return (
    <article className="mx-auto max-w-2xl p-8 py-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <time dateTime={date} className="block text-xs text-gray-600">
          {parseDate(date)}
        </time>
      </div>
      <div className="toc-content prose prose-slate dark:prose-invert">
        <MDXContent components={mdxComponents as MDXComponents} />
      </div>

      <Toc />
    </article>
  );
};

export default PostLayout;
