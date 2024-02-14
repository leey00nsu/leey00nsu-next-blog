'use client';

import { allPosts } from '@/.contentlayer/generated';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { FaHashtag } from 'react-icons/fa';

import parseTag from '@/src/libs/parseTag';

import PostTags from '../common/PostTags';

const PostTagsAccordion = () => {
  return (
    <Accordion className="px-0">
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
