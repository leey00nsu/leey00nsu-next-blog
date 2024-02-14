'use client';

import { Pagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set('page', page.toString());

    router.push(`${pathname}?${urlParams.toString()}`);
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
