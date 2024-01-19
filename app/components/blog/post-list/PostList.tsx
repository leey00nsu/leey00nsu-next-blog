'use client';

import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import PostItem from './PostItem';
import Pagination from './PostPagination';

const PAGE_SIZE = 6;

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
    <article className="mx-auto flex min-h-[calc(100svh-128px)] max-w-5xl flex-col justify-center gap-8 p-8">
      <h2>{posts.length}개의 글이 있습니다.</h2>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {paginatedPosts.map((post) => (
          <PostItem key={post.slug} {...post} />
        ))}
      </section>
      <Pagination totalPageLength={totalPageLength} currentPage={currentPage} />
    </article>
  );
};

export default PostList;
