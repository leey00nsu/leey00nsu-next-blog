'use client';

import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import PostItem from './PostItem';
import Pagination from './PostPagination';

const PAGE_SIZE = 5;

const PostList = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE,
  );

  const totalPageLength = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-8">
      <h2>{posts.length}개의 글이 있습니다.</h2>
      {paginatedPosts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
      <Pagination totalPageLength={totalPageLength} currentPage={currentPage} />
    </div>
  );
};

export default PostList;
