import Toc from '@/app/components/Toc';
import parseDate from '@/app/lib/parseDate';
import parseImagePath from '@/app/lib/parseImagePath';
import { Link } from '@nextui-org/react';
import { allPosts } from 'contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaLink } from 'react-icons/fa';

export const generateStaticParams = () => {
  return allPosts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  return { title: currentPost.title };
};

const mdxComponents = (url: string): MDXComponents => {
  return {
    a: ({ href, children }) => (
      <Link isExternal showAnchorIcon anchorIcon={<FaLink />} href={href}>
        {children}
      </Link>
    ),
    Image: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <Image
        alt={props.alt ?? ''}
        width={Number(props.width ?? 500)}
        height={Number(props.height ?? 500)}
        className={props.width ? 'h-auto' : 'h-auto w-full'}
        src={parseImagePath(url, props.src ?? '')}
        priority
      />
    ),
  };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const currentPost = allPosts.find((post) => post.slug === params.slug);

  if (!currentPost) notFound();

  const { body, url, title, date } = currentPost;

  const MDXContent = useMDXComponent(body.code);
  const MDXComponents = mdxComponents(url);

  return (
    <article className="mx-auto max-w-2xl p-8 py-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <time dateTime={date} className="block text-xs text-gray-600">
          {parseDate(date)}
        </time>
      </div>
      <div className="toc-content prose prose-slate dark:prose-invert">
        <MDXContent components={MDXComponents} />
      </div>

      <Toc />
    </article>
  );
};

export default PostLayout;
