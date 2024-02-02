'use server';

import supabase from '@/src/libs/supabase';

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

