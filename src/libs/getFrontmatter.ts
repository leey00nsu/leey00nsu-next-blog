interface GetFrontmatterProps {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
}

/**
 * Frontmatter 문자열을 생성합니다.
 * @function
 * @param {GetFrontmatterProps} {slug, title, tags, description, date} - Frontmatter를 생성하는데 필요한 데이터
 * @returns {string} 생성된 Frontmatter 문자열
 */
const getFrontmatter = ({
  slug,
  title,
  tags,
  description,
  date,
}: GetFrontmatterProps) => {
  const parsedTags = tags.map((tag) => `\n  - ${tag}`).join('');

  const frontmatter = `---
slug: ${slug}
title: ${title}
tags: ${parsedTags}
description: ${description}
date: ${date}
---`;

  return frontmatter;
};

export default getFrontmatter;
