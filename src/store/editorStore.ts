import { z } from 'zod';
import { create } from 'zustand';

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const Frontmatter = z.object({
  title: z.string().trim().min(1, '제목을 입력해주세요'),
  slug: z
    .string()
    .trim()
    .min(1, 'slug를 입력해주세요')
    .regex(SLUG_REGEX, 'slug는 소문자, 숫자, 하이픈만 사용할 수 있습니다'),
  tags: z.string().trim().min(1, '태그를 입력해주세요'),
  description: z.string().trim().min(1, '설명을 입력해주세요'),
  date: z.string().trim().min(1, '날짜를 입력해주세요'),
});

interface EditorStore {
  source: string;
  slug: string;
  title: string;
  tags: string;
  description: string;
  date: string;
  setSource: (source: string) => void;
  setSlug: (slug: string) => void;
  setTitle: (title: string) => void;
  setTags: (tags: string) => void;
  setDescription: (description: string) => void;
  setDate: (date: string) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
  source: '',
  slug: 'title-slug-example',
  title: '글 제목',
  tags: '태그1,태그2',
  description: '...에 대해 설명합니다.',
  date: new Date().toISOString().slice(0, 10),
  setSource: (source) => set(() => ({ source })),
  setSlug: (slug) => set(() => ({ slug })),
  setTitle: (title) => set(() => ({ title })),
  setTags: (tags) => set(() => ({ tags })),
  setDescription: (description) => set(() => ({ description })),
  setDate: (date) => set(() => ({ date })),
}));

export default useEditorStore;
