'use server';

import createPost from "./createPost";
import getPost from "./getPost";

const getPostViewCount = async (slug: string) => {
  try {
    let currentViewCount: number;

    // 해당 글이 DB에 존재하는지 확인
    const postData = await getPost(slug);

    // 존재한다면 조회수를 가져옴
    if (postData) {
      currentViewCount = postData.view;
    } else {
      // 존재하지 않는다면 DB에 추가
      const newPostData = await createPost(slug);

      currentViewCount = newPostData.view;
    }

    return currentViewCount;
  } catch (error: any) {
    return 0;
  }
};

export default getPostViewCount;
