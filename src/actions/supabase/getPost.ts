'use server';

import supabase from '@/src/libs/supabase';

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
