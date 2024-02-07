'use server';

import blogConfig from '@/blog.config';
import fs from 'fs';
import path from 'path';

const getImageFileNames = async (slug: string) => {
  const postPath = `${blogConfig.postPath}/${slug}`;
  const dir = path.join(process.cwd(), postPath);

  const imageFileNames = fs
    .readdirSync(dir)
    .filter((file) => file !== `${slug}.mdx`);

  return imageFileNames;
};

export default getImageFileNames;
