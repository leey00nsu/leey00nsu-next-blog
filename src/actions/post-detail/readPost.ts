'use server';

import { cookies } from 'next/headers';

import updatePostViewCount from '../supabase/updatePostViewCount';
import getOrCreatePost from './getOrCreatePost';
import isPostChecked from './isPostChecked';

const readPost = async (slug: string) => {
  const cookieStore = cookies();
  const postViewed = cookieStore.get('postViewed');
  const postViewedArray = postViewed?.value.split(',') ?? [];

  try {
    const post = await getOrCreatePost(slug);
    const isChecked = isPostChecked(slug);

    if (!isChecked && process.env.NODE_ENV === 'production') {
      await updatePostViewCount(slug, post.view + 1);

      const expires = new Date();
      expires.setDate(new Date().getDate() + 1);
      expires.setHours(0, 0, 0, 0);

      postViewedArray.push(slug);

      cookieStore.set('postViewed', postViewedArray.join(','), {
        httpOnly: true,
        secure: true,
        expires,
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

export default readPost;
