import { create } from 'zustand';

interface FileStore {
  files: File[];
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
  setFiles: (files: File[]) => void;
}

const useFileStore = create<FileStore>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileName) =>
    set((state) => ({ files: state.files.filter((f) => f.name !== fileName) })),
  setFiles: (files: File[]) => set(() => ({ files })),
}));

export default useFileStore;
