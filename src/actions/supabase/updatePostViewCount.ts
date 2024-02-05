'use server';

import supabase from '@/src/libs/supabase';

/**
 * 해당 slug를 가진 포스트의 조회수를 업데이트합니다.
 * @param slug 
 * @param newViewCount - 업데이트할 조회수
 * @returns 
 */
const updatePostViewCount = async (slug: string, newViewCount: number) => {
  const { data: updatedData, error } = await supabase
    .from('posts')
    .update({ view: newViewCount })
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedData;
};

export default updatePostViewCount;

