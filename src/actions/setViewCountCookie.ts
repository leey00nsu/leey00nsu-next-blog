'use server';

import { cookies } from 'next/headers';

const setViewCountCookie = (slug: string) => {
  const cookieStore = cookies();

  const postViewed = cookieStore.get('postViewed');
  const postViewedArray = postViewed?.value.split(',') ?? [];

  if (postViewedArray.includes(slug)) return;

  postViewedArray.push(slug);

  const expires = new Date();
  expires.setDate(new Date().getDate() + 1);
  expires.setHours(0, 0, 0, 0);

  cookieStore.set('postViewed', postViewedArray.join(','), {
    expires,
  });
};

export default setViewCountCookie;
