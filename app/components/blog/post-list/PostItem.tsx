import { Post } from '@/.contentlayer/generated';
import { Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';

import parseDate from '@/app/libs/parseDate';

import parseTag from '../../../libs/parseTag';
import PostTags from './PostTags';

const PostItem = (post: Post) => {
  return (
    <Link href={post.url} className="w-full transition hover:scale-105">
      <Card className="flex w-full flex-row py-4">
        <CardBody className="flex flex-col gap-2">
          <time dateTime={post.date} className="block text-xs text-gray-600">
            {parseDate(post.date)}
          </time>
          <h2 className="text-xl">{post.title}</h2>
          <h3 className="text-sm text-gray-600">{post.description}</h3>
          <PostTags postTags={parseTag([post])} />
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostItem;
