import { allAboutMes } from '@/.contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { Highlight } from '../ui/mdx-components';
import GithubChart from './GithubChart';

// 커스텀 mdx 컴포넌트
const mdxComponents = {
  Highlight,
};

const AboutMe = () => {
  const aboutMe = allAboutMes[0];

  const MDXContent = useMDXComponent(aboutMe.body.code);

  return (
    <main className="flex min-h-[calc(100svh-128px)] flex-col items-center ">
      <section className="flex max-w-4xl flex-col justify-center gap-8 p-8 ">
        <div className="prose-custom prose prose-slate max-w-4xl dark:prose-invert">
          <MDXContent components={mdxComponents as MDXComponents} />
        </div>

        <GithubChart />
      </section>
    </main>
  );
};

export default AboutMe;
