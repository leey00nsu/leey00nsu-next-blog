'use server';

import createPost from '../supabase/createPost';
import getPost from '../supabase/getPost';

/**
 * DB에서 해당 slug를 가진 포스트를 가져오거나 없으면 생성합니다.
 * @param slug
 * @returns
 */
const getOrCreatePost = async (slug: string) => {
  try {
    // 먼저 해당 slug의 포스트를 가져오기를 시도
    const existingPost = await getPost(slug);

    // 만약 포스트가 존재하면 반환
    return existingPost;
  } catch (getPostError) {
    // 만약 getPost에서 오류가 발생하면 새로운 포스트를 생성
    try {
      const newPostData = await createPost(slug);
      return newPostData;
    } catch (createPostError: any) {
      // createPost에서도 오류가 발생하면 최종적으로 에러 처리
      throw new Error('Failed to get or create post.');
    }
  }
};

export default getOrCreatePost;
