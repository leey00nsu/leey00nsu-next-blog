import { Post } from '@/.contentlayer/generated';
import { Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';

import parseDate from '@/app/libs/parseDate';
import parseTag from '@/app/libs/parseTag';

import PostTags from './PostTags';

const PostItem = (post: Post) => {
  return (
    <Card
      as={Link}
      href={post.url}
      className="flex w-full flex-row p-4 transition hover:scale-105 active:scale-100"
    >
      <CardBody className="flex flex-col justify-between gap-2">
        <time dateTime={post.date} className="block text-xs text-gray-600">
          {parseDate(post.date)}
        </time>
        <div>
          <h2 className="text-base sm:text-xl">{post.title}</h2>
          <h3 className="truncate text-xs text-gray-600 sm:text-sm">
            {post.description}
          </h3>
        </div>
        <PostTags truncate postTags={parseTag([post])} />
      </CardBody>
    </Card>
  );
};

export default PostItem;
