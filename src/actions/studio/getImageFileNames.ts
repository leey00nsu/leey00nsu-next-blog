'use server';

import blogConfig from '@/blog.config';
import { Octokit } from '@octokit/rest';

const getImageFileNames = async (slug: string) => {
  const postPath = `${blogConfig.postPath}/${slug}`;

  const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,
  });

  const content = await octokit.rest.repos.getContent({
    owner: blogConfig.owner,
    repo: blogConfig.repo,
    path: postPath,
  });

  const imageFileNames = content.data
    // @ts-ignore
    .map((file) => file.name)
    .filter((file: string) => file !== `${slug}.mdx`);

  // const imageFileNames = fs
  //   .readdirSync(dir)
  //   .filter((file) => file !== `${slug}.mdx`);

  return imageFileNames;
};

export default getImageFileNames;
