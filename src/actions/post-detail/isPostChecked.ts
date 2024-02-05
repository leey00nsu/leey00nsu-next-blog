'use server';

import { cookies } from 'next/headers';

/**
 * 해당 slug의 포스트가 이미 조회되었는지 확인합니다.
 * @param slug
 * @returns
 */
const isPostChecked = (slug: string) => {
  const cookieStore = cookies();
  const postViewed = cookieStore.get('postViewed');
  const postViewedArray = postViewed?.value.split(',') ?? [];

  return postViewedArray.includes(slug);
};

export default isPostChecked;
