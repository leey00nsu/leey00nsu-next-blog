import { allPortfolios } from '@/.contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import {
  CustomImage,
  CustomLink,
  Highlight,
  MDXWrapper,
} from '../ui/mdx-components';

// 커스텀 mdx 컴포넌트
const mdxComponents = {
  Highlight,
  img: CustomImage,
  a: CustomLink,
};

const Portfolio = () => {
  const portfolio = allPortfolios[0];

  const MDXContent = useMDXComponent(portfolio.body.code);

  return (
    <main className="flex flex-col items-center ">
      <section className="flex max-w-4xl flex-col justify-center gap-8 p-8 ">
        <MDXWrapper className="prose-custom max-w-4xl">
          <MDXContent components={mdxComponents as MDXComponents} />
        </MDXWrapper>
      </section>
    </main>
  );
};

export default Portfolio;
