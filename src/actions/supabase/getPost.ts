'use server';

import supabase from '@/src/libs/supabase';

/**
 * 해당 slug를 가진 포스트를 조회합니다.
 * @param slug 
 * @returns 
 */
const getPost = async (slug: string) => {
  const { data: postData, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return postData;
};

export default getPost;
