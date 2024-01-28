'use server';

import fs from 'fs';
import path from 'path';

const savePostLocal = async (formData: FormData) => {
  const dir = path.join(process.cwd(), 'test/test-title');

  fs.mkdirSync(dir, { recursive: true });

  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const files = formData.getAll('files') as File[];

    const contentPath = path.join(dir, `${title}.mdx`);

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

export { savePostLocal };
