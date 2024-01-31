'use client';

import { useDebounce } from '@uidotdev/usehooks';
import {
  Fragment,
  createElement,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm-latest';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import useEditorStore from '@/app/store/editorStore';

import useProcessor from '@/app/hooks/studio/useProcessor';

const Preview = () => {
  const [maxHeight, setMaxHeight] = useState(0);
  const source = useEditorStore((state) => state.source);
  const debouncedSearchTerm = useDebounce(source, 500);
  const deferredValue = useDeferredValue(debouncedSearchTerm);
  const [content, setContent] = useState(createElement(Fragment));

  const previewRef = useRef<HTMLDivElement>(null);

  // 에디터 height를 넘지않게 설정
  useEffect(() => {
    const editorElement = document.querySelector('#editor');

    if (!previewRef.current || !editorElement) return;

    const editorHeight = editorElement.scrollHeight;
    setMaxHeight(editorHeight);
  }, [source]);

  const { process } = useProcessor();

  const parseMarkdown = async () => {
    const response = await unified()
      .use(remarkParse)
      // @ts-ignore
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

  return (
    <div
      className="w-1/2 overflow-y-auto rounded border-[1px] border-[#d0d7de] bg-background p-4 dark:border-background"
      style={{
        minHeight: `${maxHeight}px`,
        maxHeight: `${maxHeight}px`,
      }}
    >
      <div
        ref={previewRef}
        className="prose prose-slate break-all dark:prose-invert "
      >
        {content}
      </div>
    </div>
  );
};

export default Preview;
