import { Post } from '@/.contentlayer/generated';

export interface PostTag {
  tag: string;
  count: number;
}

/**
 * 포스트 배열에서 태그를 추출하여 태그와 태그의 개수를 갖는 배열을 반환합니다.
 * @param allPosts
 * @returns
 */
const parseTag = (allPosts: Post[]) => {
  const tags = allPosts.map((post) => post.tags).flat();
  const result: PostTag[] = [];
  const counts: Record<string, number> = {};

  tags.forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
  });

  for (const tag in counts) {
    if (Object.hasOwn(counts, tag)) {
      result.push({ tag, count: counts[tag] });
    }
  }

  return result;
};

export default parseTag;
