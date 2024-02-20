import { MDX } from 'contentlayer/core';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import {
  CustomImage,
  CustomLink,
  CustomSnipet,
  MDXWrapper,
} from '../../ui/mdx-components';

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
    <MDXWrapper className="toc-content">
      <MDXContent components={mdxComponents as MDXComponents} />
    </MDXWrapper>
  );
};

export default PostContent;
