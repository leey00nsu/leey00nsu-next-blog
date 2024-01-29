import { create } from 'zustand';

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
