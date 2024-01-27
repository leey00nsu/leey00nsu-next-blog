import { create } from 'zustand';

interface FileStore {
  files: File[];
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
}

const useFileStore = create<FileStore>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (file) =>
    set((state) => ({ files: state.files.filter((f) => f !== file) })),
}));

export default useFileStore;
