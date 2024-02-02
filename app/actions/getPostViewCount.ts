'use server';

import { cookies } from 'next/headers';

import supabase from '../libs/supabase';

const getPostViewCount = async (slug: string) => {
  const cookieStore = cookies();
  let currentViewCount: number;

  const { data: postData } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (postData) {
    currentViewCount = postData.view;
  } else {
    const { data: newPostData } = await supabase
      .from('posts')
      .insert({ slug })
      .select()
      .single();

    currentViewCount = newPostData!.view;
  }

  const postViewed = cookieStore.get('postViewed');
  const postViewedArray = postViewed?.value.split(',') ?? [];

  if (!postViewedArray.includes(slug)) {
    const { data: updatedData } = await supabase
      .from('posts')
      .update({ view: currentViewCount + 1 })
      .eq('slug', slug)
      .select()
      .single();

    currentViewCount = updatedData!.view;
  }

  return currentViewCount;
};

export default getPostViewCount;
