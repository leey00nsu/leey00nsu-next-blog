'use client';

import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

import fetchPostViewCount from '@/src/actions/post-detail/fetchPostViewCount';

interface PostViewCountProps {
  slug: string;
}

const PostViewCount = ({ slug }: PostViewCountProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const getPostViewCount = async () => {
      const view = await fetchPostViewCount(slug);
      setViewCount(view);
      setIsLoading(false);
    };

    getPostViewCount();
  }, []);

  return (
    <div className="flex w-full items-center justify-center gap-1 text-default-600">
      {isLoading && <Spinner size="sm" color="default" />}
      {!isLoading && (
        <>
          <p className="text-sm">{viewCount}</p>
          <FaEye />
        </>
      )}
    </div>
  );
};

export default PostViewCount;
