import { Post } from '@/.contentlayer/generated';
import { Divider, Spinner } from '@nextui-org/react';
import { Suspense } from 'react';

import parseTag from '@/app/libs/parseTag';

import Date from '../../ui/text/Date';
import PostTags from '../post-list/PostTags';
import PostComments from './PostComments';
import PostContent from './PostContent';
import PostTitle from './PostTitle';
import PostToc from './PostToc';
import PostViewCount from './PostViewCount';

interface PostDetailProps {
  post: Post;
}

const PostDetail = ({ post }: PostDetailProps) => {
  const { body, title, date, slug } = post;

  return (
    <main className="mx-auto flex min-h-[calc(100svh-128px)] max-w-2xl flex-col gap-4 p-8 py-20">
      <div className="flex w-full flex-col items-center">
        <PostTitle title={title} />
        <Date date={date} />
        <Suspense fallback={<Spinner size="sm" color="default" />}>
          <PostViewCount slug={slug} />
        </Suspense>
      </div>
      <PostTags postTags={parseTag([post])} />
      <PostContent body={body} />
      <Divider className="my-20" />
      <PostComments />
      <PostToc />
    </main>
  );
};

export default PostDetail;
