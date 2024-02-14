import { create } from 'zustand';

interface TagsStore {
  selectedKeys: Set<string>;
  setSelectedKeys: (selectedKeys: Set<string>) => void;
}

const useTagsStore = create<TagsStore>((set) => ({
  selectedKeys: new Set([]),
  setSelectedKeys: (selectedKeys) => set(() => ({ selectedKeys })),
}));

export default useTagsStore;
