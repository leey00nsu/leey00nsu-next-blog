import { Post } from '@/.contentlayer/generated';
import { Divider } from '@nextui-org/react';

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
    <article className="mx-auto min-h-[calc(100svh-128px)] max-w-2xl p-8 py-20">
      <PostTitle title={title} date={date} />
      <PostContent body={body} />
      <Divider className="my-20" />
      <PostComments />
      <PostToc />
    </article>
  );
};

export default PostDetail;
