'use client';

import setViewCountCookie from '@/app/actions/setViewCountCookie';
import { useEffect } from 'react';

interface PostViewCountCookieProps {
  slug: string;
}

const PostViewCountCookie = ({ slug }: PostViewCountCookieProps) => {
  useEffect(() => {
    setViewCountCookie(slug);
  }, []);

  return null;
};

export default PostViewCountCookie;
