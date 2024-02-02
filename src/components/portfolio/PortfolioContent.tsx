import { allPortfolios } from '@/.contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { CustomImage, CustomLink, Highlight } from '../ui/mdx-components';

// 커스텀 mdx 컴포넌트
const mdxComponents = {
  Highlight,
  img: CustomImage,
  a: CustomLink,
};

const PortfolioContent = () => {
  const portfolio = allPortfolios[0];

  const MDXContent = useMDXComponent(portfolio.body.code);

  return (
    <main className="flex flex-col items-center ">
      <section className="flex max-w-4xl flex-col justify-center gap-8 p-8 ">
        <div className="prose-custom prose prose-slate max-w-4xl dark:prose-invert">
          <MDXContent components={mdxComponents as MDXComponents} />
        </div>
      </section>
    </main>
  );
};

export default PortfolioContent;
