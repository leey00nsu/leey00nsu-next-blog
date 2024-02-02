'use server';

import { cookies } from 'next/headers';

const isPostChecked = (slug: string) => {
  const cookieStore = cookies();
  const postViewed = cookieStore.get('postViewed');
  const postViewedArray = postViewed?.value.split(',') ?? [];

  return postViewedArray.includes(slug);
};

export default isPostChecked;
