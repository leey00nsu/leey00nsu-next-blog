'use server';

import supabase from '@/src/libs/supabase';

/**
 * 해당 slug를 가진 포스트를 생성합니다.
 * @param slug 
 * @returns 
 */
const createPost = async (slug: string) => {
  const { data: newPostData, error } = await supabase
    .from('posts')
    .insert({ slug })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newPostData;
};

export default createPost;
