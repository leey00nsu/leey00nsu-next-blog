'use client';

import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface PostPaginationProps {
  totalPageLength: number;
  currentPage: number;
}

const PostPagination = ({
  totalPageLength,
  currentPage,
}: PostPaginationProps) => {
  const router = useRouter();

  const changePageHandler = (page: number) => {
    router.push(`/blog?page=${page}`);
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
