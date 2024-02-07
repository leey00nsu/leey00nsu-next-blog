interface GetFrontmatterProps {
  slug: string;
  title: string;
  tags: string;
  description: string;
  date: string;
}

const getFrontmatter = ({
  slug,
  title,
  tags,
  description,
  date,
}: GetFrontmatterProps) => {
  const parsedTags = tags
    .split(',')
    .map((tag) => `\n  - ${tag}`)
    .join('');

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
