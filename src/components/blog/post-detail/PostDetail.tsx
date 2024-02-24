import { Post } from '@/.contentlayer/generated';
import { Divider } from '@nextui-org/react';

import parseTag from '@/src/libs/parseTag';

import { DateText } from '../../ui/text';
import PostTags from '../common/PostTags';
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
    <main className="mx-auto flex min-h-[calc(100svh-var(--navbar-height)-var(--footer-height))] max-w-2xl flex-col gap-4 p-8 py-20">
      <div className="flex w-full flex-col items-center">
        <PostTitle title={title} />
        <DateText date={date} />
        <PostViewCount slug={slug} />
      </div>
      <PostTags clickable postTags={parseTag([post])} />
      <PostContent body={body} />
      <Divider className="my-20" />
      <PostComments />
      <PostToc />
    </main>
  );
};

export default PostDetail;
