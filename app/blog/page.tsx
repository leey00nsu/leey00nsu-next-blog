import { PostList } from '../components/blog/post-list';

export default function Blog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <PostList searchParams={searchParams} />;
}
