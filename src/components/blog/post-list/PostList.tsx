import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import { redirect } from 'next/navigation';

import queryStringToArray from '@/src/libs/queryStringToArray';

import PostItem from './PostItem';
import PostPagination from './PostPagination';
import PostTagsAccordion from './PostTagsAccordion';

const PAGE_SIZE = 6;

const PostList = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const tags = queryStringToArray(searchParams?.tags);

  const filteredPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .filter((post) => !tags || tags.every((tag) => post.tags.includes(tag)));

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const totalPageLength = Math.ceil(filteredPosts.length / PAGE_SIZE);

  if (totalPageLength > 0 && currentPage > totalPageLength) {
    redirect(`/blog?page=${totalPageLength}`);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100svh-128px)] max-w-5xl flex-col justify-center gap-8 p-8">
      <PostTagsAccordion />
      {filteredPosts.length > 0 && (
        <p className="text-base font-semibold sm:text-2xl">
          {filteredPosts.length}개의 글이 있습니다.
        </p>
      )}
      {filteredPosts.length === 0 && (
        <div className="flex w-full grow items-center justify-center">
          <h2 className="text-lg font-bold sm:text-4xl">
            해당 조건의 글이 없습니다.
          </h2>
        </div>
      )}
      {filteredPosts.length > 0 && (
        <>
          <section className="grid grow grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-2">
            {paginatedPosts.map((post) => (
              <PostItem key={post.slug} {...post} />
            ))}
          </section>
          <PostPagination
            totalPageLength={totalPageLength}
            currentPage={currentPage}
          />
        </>
      )}
    </main>
  );
};

export default PostList;
