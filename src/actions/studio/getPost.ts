import blogConfig from '@/blog.config';
import { Octokit } from '@octokit/rest';

const getPost = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,
  });

  const { data: posts } = await octokit.repos.getContent({
    owner: blogConfig.owner,
    repo: blogConfig.repo,
    path: blogConfig.postPath,
  });

  return posts;
};

export default getPost;
