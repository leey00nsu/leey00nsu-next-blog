'use client';

import { useEffect } from 'react';

import setViewCountCookie from '@/src/actions/setViewCountCookie';

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
