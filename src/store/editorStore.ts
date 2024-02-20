import { allPosts } from '@/.contentlayer/generated';
import { z } from 'zod';
import { create } from 'zustand';

import dateToString from '../libs/dateToString';

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const Frontmatter = z.object({
  title: z.string().trim().min(1, '제목을 입력해주세요'),
  slugObject: z
    .object({
      slug: z
        .string()
        .trim()
        .min(1, 'slug를 입력해주세요')
        .regex(SLUG_REGEX, 'slug는 소문자, 숫자, 하이픈만 사용할 수 있습니다'),
      originalSlug: z.string(),
      isEdit: z.boolean().optional(),
    })
    .refine((data) => {
      const allSlugs = allPosts.map((post) => post.slug);

      // 수정 중인 경우 원래 slug을 제외한 모든 slug과 비교
      if (data.isEdit) {
        const allSlugsWithoutOriginal = allSlugs.filter(
          (slug) => slug !== data.originalSlug,
        );

        return !allSlugsWithoutOriginal.includes(data.slug);
      }

      return !allSlugs.includes(data.slug);
    }, '이미 존재하는 slug입니다'),
  tags: z.array(z.string()).min(1, '태그를 입력해주세요'),
  description: z.string().trim().min(1, '설명을 입력해주세요'),
  date: z.string().trim().min(1, '날짜를 입력해주세요'),
});

interface EditorStore {
  source: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
  setSource: (source: string) => void;
  setSlug: (slug: string) => void;
  setTitle: (title: string) => void;
  setTags: (tags: string[]) => void;
  setDescription: (description: string) => void;
  setDate: (date: string) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
  source: '',
  slug: '',
  title: '',
  tags: [],
  description: '',
  date: dateToString(new Date()),
  setSource: (source) => set(() => ({ source })),
  setSlug: (slug) => set(() => ({ slug })),
  setTitle: (title) => set(() => ({ title })),
  setTags: (tags) => set(() => ({ tags })),
  setDescription: (description) => set(() => ({ description })),
  setDate: (date) => set(() => ({ date })),
}));

export default useEditorStore;
