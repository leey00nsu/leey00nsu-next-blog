'use client';

import { Pagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import arrayToQueryString from '@/src/libs/arrayToQueryString';

interface PostPaginationProps {
  totalPageLength: number;
  currentPage: number;
}

const PostPagination = ({
  totalPageLength,
  currentPage,
}: PostPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePageHandler = (page: number) => {
    const tags = searchParams.getAll('tags');

    if (tags.length === 0) {
      router.push(`${pathname}?page=${page}`);
    }
    if (tags.length > 0) {
      const newQueryString = arrayToQueryString('tags', tags);
      router.push(`${pathname}?page=${page}&${newQueryString}`);
    }
  };

  return (
    <Pagination
      classNames={{
        base: 'flex justify-center',
        item: 'bg-default-300/70 ',
        next: 'bg-default-300/70 !text-foreground',
        prev: 'bg-default-300/70 !text-foreground',
      }}
      size="lg"
      isCompact
      showControls
      total={totalPageLength}
      page={currentPage}
      onChange={changePageHandler}
      color="primary"
      initialPage={1}
    />
  );
};

export default PostPagination;
