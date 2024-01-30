'use server';

import { Octokit } from '@octokit/rest';
import fs from 'fs';
// @ts-ignore
import OctokitMultipleFiles from 'octokit-commit-multiple-files';
import path from 'path';

const savePostRemote = async (formData: FormData) => {
  // octokit 자체적으로 한 커밋에 여러 파일을 올릴 수 없기 때문에
  // octokit-commit-multiple-files 라이브러리를 사용하여 해결
  const OctokitPlugin = Octokit.plugin(OctokitMultipleFiles);
  const octokit = new OctokitPlugin({
    auth: process.env.GITHUB_API_KEY,
  });

  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const files = formData.getAll('files') as File[];

  const owner = 'leey00nsu'; // GitHub 사용자 이름
  const repo = 'leey00nsu-next-blog'; // GitHub 레포지토리 이름
  const branch = 'main'; // 브랜치 이름
  const postPath = `public/posts/blog/${slug}`; // 블로그 포스트 저장 경로

  try {
    const uploadContent = {
      path: `${postPath}/${slug}.mdx`,
      content,
    };

    const uploadFiles = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      uploadFiles.push({
        path: `${postPath}/${file.name}`,
        content: buffer.toString('base64'),
      });
    }

    const uploadData = [uploadContent, ...uploadFiles];

    const formattedObject: Record<string, string> = {};

    for (const data of uploadData) {
      formattedObject[data.path] = data.content;
    }

    await octokit.createOrUpdateFiles({
      owner,
      repo,
      branch,
      changes: [
        {
          message: 'docs. 새 글 추가',
          files: formattedObject,
        },
      ],
    });

    return {
      success: true,
      message: '정상적으로 커밋되었습니다.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `커밋 중 오류가 발생하였습니다. : ${error.message}`,
    };
  }
};

const savePostLocal = async (formData: FormData) => {
  try {
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const files = formData.getAll('files') as File[];

    const postPath = `public/posts/blog/${slug}`; // 블로그 포스트 저장 경로
    const dir = path.join(process.cwd(), postPath);

    fs.mkdirSync(dir, { recursive: true });

    const contentPath = path.join(dir, `${slug}.mdx`);

    fs.writeFile(contentPath, content, 'utf-8', (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });

    for (const file of files) {
      const filePath = path.join(dir, file.name);
      const fileContent = Buffer.from(await file.arrayBuffer());

      fs.writeFile(filePath, fileContent, 'base64', (error) => {
        if (error) {
          throw new Error(error.message);
        }
      });
    }

    return {
      success: true,
      message: '정상적으로 저장되었습니다.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `저장 중 오류가 발생하였습니다. : ${error.message}`,
    };
  }
};

export { savePostLocal, savePostRemote };
