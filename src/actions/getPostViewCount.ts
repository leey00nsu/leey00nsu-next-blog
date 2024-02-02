'use server';

import { cookies } from 'next/headers';

import supabase from '../libs/supabase';

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

const updatePostViewCount = async (slug: string, view: number) => {
  const { data: updatedData, error } = await supabase
    .from('posts')
    .update({ view })
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedData;
};

const getPostViewCount = async (slug: string) => {
  try {
    const cookieStore = cookies();
    let currentViewCount: number;

    const postData = await getPost(slug);

    if (postData) {
      currentViewCount = postData.view;
    } else {
      const newPostData = await createPost(slug);

      currentViewCount = newPostData.view;
    }

    const postViewed = cookieStore.get('postViewed');
    const postViewedArray = postViewed?.value.split(',') ?? [];

    if (!postViewedArray.includes(slug)) {
      const updatedPost = await updatePostViewCount(slug, currentViewCount + 1);

      currentViewCount = updatedPost.view;
    }

    return currentViewCount;
  } catch (error: any) {
    return 0;
  }
};

export default getPostViewCount;
