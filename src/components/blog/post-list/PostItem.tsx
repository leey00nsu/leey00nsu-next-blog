import { Post } from '@/.contentlayer/generated';
import { Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';

import parseTag from '@/src/libs/parseTag';

import { DateText } from '../../ui/text';
import PostTags from '../common/PostTags';
import PostDropdown from './PostDropdown';
import PostThumbnail from './PostThumbnail';

const PostItem = (post: Post) => {
  return (
    <Card
      as={Link}
      href={post.url}
      shadow="sm"
      className="flex w-full flex-row p-4 transition hover:scale-105 active:scale-100"
    >
      <CardBody className="flex flex-col justify-between gap-2">
        <PostThumbnail thumbnail={post.thumbnail} />
        <div className="flex h-8 items-center justify-between">
          <DateText date={post.date} />
          <PostDropdown slug={post.slug} />
        </div>
        <div>
          <h2 className="text-base sm:text-xl">{post.title}</h2>
          <h3 className="text-xs text-gray-600 sm:text-sm">
            {post.description}
          </h3>
        </div>
        <PostTags truncate postTags={parseTag([post])} />
      </CardBody>
    </Card>
  );
};

export default PostItem;
