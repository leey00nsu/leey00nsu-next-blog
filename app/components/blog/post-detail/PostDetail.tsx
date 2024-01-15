import { Post } from '@/.contentlayer/generated';
import PostContent from './PostContent';
import PostTitle from './PostTitle';
import PostToc from './PostToc';

interface PostDetailProps {
  post: Post;
}

const PostDetail = ({ post }: PostDetailProps) => {
  const { body, title, date } = post;

  return (
    <article className="mx-auto max-w-2xl p-8 py-20">
      <PostTitle title={title} date={date} />
      <PostContent body={body} />
      <PostToc />
    </article>
  );
};

export default PostDetail;
