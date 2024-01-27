import * as prod from 'react/jsx-runtime';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

import LocalImage from '@/app/components/studio/LocalImage';

import { CustomLink, CustomSnipet } from '../../components/ui/mdx-components';

const production = {
  // @ts-expect-error : https://github.com/rehypejs/rehype-react
  Fragment: prod.Fragment,
  // @ts-expect-error
  jsx: prod.jsx,
  // @ts-expect-error
  jsxs: prod.jsxs,
  components: {
    a: CustomLink,
    figcaption: CustomSnipet,
    img: LocalImage,
  },
};

const useProcessor = () => {
  const process = async (text: any) => {
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      // @ts-expect-error
      .use(rehypeReact, production)
      .process(text);

    return file.result;
  };

  return { process };
};

export default useProcessor;
