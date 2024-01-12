import { Post } from '@/.contentlayer/generated';

export interface PostTag {
  tag: string;
  count: number;
}

const parseTag = (allPosts: Post[]) => {
  const tags = allPosts.map((post) => post.tags).flat();
  const result: PostTag[] = [];
  const counts: { [key: string]: number } = {};

  // 배열 순회
  tags.forEach((tag) => {
    // counts 객체에 태그 등장 횟수 기록
    counts[tag] = (counts[tag] || 0) + 1;
  });

  // counts 객체를 배열로 변환하여 결과 배열 생성
  for (const tag in counts) {
    result.push({ tag: tag, count: counts[tag] });
  }

  return result;
};

export default parseTag;
