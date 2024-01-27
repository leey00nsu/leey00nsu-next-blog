'use client';

import { useDebounce } from '@uidotdev/usehooks';
import {
  Fragment,
  createElement,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import useProcessor from '@/app/hooks/studio/useProcessor';

interface PreviewProps {
  source: string;
}

const Preview = ({ source }: PreviewProps) => {
  const debouncedSearchTerm = useDebounce(source, 500);
  const deferredValue = useDeferredValue(debouncedSearchTerm);
  const [content, setContent] = useState(createElement(Fragment));

  const { process } = useProcessor();

  const parseMarkdown = async () => {
    const response = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypePrettyCode, {
        theme: 'catppuccin-frappe',
      })
      .use(rehypeStringify)
      .process(deferredValue);

    const nodes = await process(response.value);
    setContent(nodes);
  };

  useEffect(() => {
    parseMarkdown();
  }, [deferredValue]);

  return <div className="prose prose-slate">{content}</div>;
};

export default Preview;
