import { allAboutMes } from '@/.contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { Highlight, MDXWrapper } from '../ui/mdx-components';
import GithubChart from './GithubChart';

// 커스텀 mdx 컴포넌트
const mdxComponents = {
  Highlight,
};

const Home = () => {
  const aboutMe = allAboutMes[0];

  const MDXContent = useMDXComponent(aboutMe.body.code);

  return (
    <main className="flex min-h-[calc(100svh-128px)] flex-col items-center ">
      <section className="flex max-w-4xl flex-col justify-center gap-8 p-8 ">
        <MDXWrapper className="prose-custom max-w-4xl">
          <MDXContent components={mdxComponents as MDXComponents} />
        </MDXWrapper>
        <GithubChart />
      </section>
    </main>
  );
};

export default Home;
