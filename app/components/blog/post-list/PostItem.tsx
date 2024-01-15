import { Post } from '@/.contentlayer/generated';
import parseDate from '@/app/lib/parseDate';
import { Button, Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import parseTag, { PostTag } from '../../../lib/parseTag';

interface PostTagsProps {
  postTags: PostTag[];
  showCount?: boolean;
}

const PostTags = ({ postTags, showCount }: PostTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {postTags.map((postTag) => (
        <Button size="sm" disableRipple variant="flat" key={postTag.tag}>
          <span>{postTag.tag}</span>
          {showCount && <span>({postTag.count})</span>}
        </Button>
      ))}
    </div>
  );
};

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
