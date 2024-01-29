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
  const branch = 'feat/studio'; // 브랜치 이름
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

    console.log('Commit created successfully!');
  } catch (error: any) {
    console.error('Error creating commit:', error.message);
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

    fs.writeFile(contentPath, content, 'utf-8', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('The file has been saved!');
      }
    });

    for (const file of files) {
      const filePath = path.join(dir, file.name);
      const fileContent = Buffer.from(await file.arrayBuffer());

      fs.writeFile(filePath, fileContent, 'base64', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('The file has been saved!');
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export { savePostLocal, savePostRemote };
