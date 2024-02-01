import { Post } from '@/.contentlayer/generated';
import { Divider } from '@nextui-org/react';

import parseTag from '@/app/libs/parseTag';

import PostTags from '../post-list/PostTags';
import PostComments from './PostComments';
import PostContent from './PostContent';
import PostTitle from './PostTitle';
import PostToc from './PostToc';

interface PostDetailProps {
  post: Post;
}

const PostDetail = ({ post }: PostDetailProps) => {
  const { body, title, date } = post;

  return (
    <main className="mx-auto flex min-h-[calc(100svh-128px)] max-w-2xl flex-col gap-4 p-8 py-20">
      <PostTitle title={title} date={date} />
      <PostTags postTags={parseTag([post])} />
      <PostContent body={body} />
      <Divider className="my-20" />
      <PostComments />
      <PostToc />
    </main>
  );
};

export default PostDetail;
