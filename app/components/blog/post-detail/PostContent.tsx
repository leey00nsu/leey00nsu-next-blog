import { MDX } from 'contentlayer/core';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { CustomImage, CustomLink, CustomSnipet } from './custom-mdx-components';

interface PostContentProps {
  body: MDX;
}

// 커스텀 mdx 컴포넌트
const mdxComponents = {
  a: CustomLink,
  img: CustomImage,
  figcaption: CustomSnipet,
};

const PostContent = ({ body }: PostContentProps) => {
  const MDXContent = useMDXComponent(body.code);

  return (
    <div className="toc-content prose prose-slate dark:prose-invert">
      <MDXContent components={mdxComponents as MDXComponents} />
    </div>
  );
};

export default PostContent;
