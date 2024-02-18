'use client';

import { allPosts } from '@/.contentlayer/generated';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaHashtag } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

import parseTag from '@/src/libs/parseTag';

import useTagsStore from '@/src/store/tagsStore';

import PostTags from '../common/PostTags';

const PostTagsAccordion = () => {
  const { selectedKeys, setSelectedKeys } = useTagsStore(
    useShallow((state) => ({
      selectedKeys: state.selectedKeys,
      setSelectedKeys: state.setSelectedKeys,
    })),
  );

  const tags = useSearchParams().getAll('tags');

  // 태그가 선택되었을 때, 태그 아코디언을 펼침
  useEffect(() => {
    if (tags.length > 0 && selectedKeys.size === 0) {
      setSelectedKeys(new Set(['태그']));
    }
  }, []);

  return (
    <Accordion
      className="px-0"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys as any} // TODO: Fix type (NextUI Bugs)
    >
      <AccordionItem
        classNames={{
          title: 'text-lg sm:text-4xl font-bold text-personal-blue',
        }}
        key="태그"
        title="태그"
        subtitle="클릭하여 펼치기"
        aria-label="Tags Accordion"
        indicator={<FaHashtag />}
      >
        <PostTags clickable showCount postTags={parseTag(allPosts)} />
      </AccordionItem>
    </Accordion>
  );
};

export default PostTagsAccordion;
