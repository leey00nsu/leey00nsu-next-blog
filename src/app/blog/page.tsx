import { PostList } from '@/src/components/blog/post-list';

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <PostList searchParams={searchParams} />;
}
