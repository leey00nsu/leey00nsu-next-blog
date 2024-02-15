import { Post } from '@/.contentlayer/generated';
import fs from 'fs';
import lqip from 'lqip-modern';
import path from 'path';

import blogConfig from '../../blog.config';
import findSuffix from './findSuffix';

/**
 * Post에서 썸네일을 추출합니다.
 * @param post
 * @returns
 */
const getThumbnailImage = async (post: Post) => {
  // 이미지 경로 정규식
  const imagePathRegex = new RegExp(
    `\\!\\[([A-Za-z0-9\\-_]+)\\]\\((/${blogConfig.postPath}/)(.*?)\\/(.*?)\\)`,
  );

  const imagePaths = post.body.raw.match(new RegExp(imagePathRegex, 'g'));

  if (!imagePaths) {
    return {
      src: '',
      alt: post.title,
      width: '',
      height: '',
      base64: '',
    };
  }

  const [, alt, postPath, slug, fileName] = imagePaths[0].match(
    new RegExp(imagePathRegex),
  )!;
  const filePath = `${postPath}${slug}/${fileName}`;

  const buffer = fs.readFileSync(path.join(process.cwd(), filePath));

  const { metadata } = await lqip(buffer);

  return {
    src: findSuffix(filePath, '/public'),
    alt,
    width: metadata.originalWidth,
    height: metadata.originalHeight,
    base64: metadata.dataURIBase64,
  };
};

export default getThumbnailImage;
