'use client';

import setViewCountCookie from '@/app/actions/setViewCountCookie';
import { useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

interface PostViewCountProps {
  slug: string;
  viewCount: number;
}

const PostViewCount = ({ slug, viewCount }: PostViewCountProps) => {
  useEffect(() => {
    setViewCountCookie(slug);
  }, []);

  return (
    <div className="flex w-full items-center justify-center gap-1 text-default-600">
      <p className="text-sm">{viewCount}</p>
      <FaEye />
    </div>
  );
};

export default PostViewCount;
