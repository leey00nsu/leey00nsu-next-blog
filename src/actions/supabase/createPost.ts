'use server';

import supabase from '@/src/libs/supabase';

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
