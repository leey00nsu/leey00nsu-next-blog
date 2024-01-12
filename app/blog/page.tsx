'use client';

import { Pagination } from '@nextui-org/react';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '../components/PostCard';

const PAGE_SIZE = 5;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE,
  );

  const changePageHandler = (page: number) => {
    router.push(`/blog?page=${page}`);
  };

  const totalPageLength = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-8 ">
      <h2>{posts.length}개의 글이 있습니다.</h2>
      {paginatedPosts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
      <Pagination
        classNames={{
          base: 'flex justify-center',
        }}
        isCompact
        showControls
        total={totalPageLength}
        page={currentPage}
        onChange={changePageHandler}
        initialPage={1}
      />
    </div>
  );
}
