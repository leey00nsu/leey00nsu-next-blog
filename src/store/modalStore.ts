import { create } from 'zustand';

export interface Modal {
  type: string;
  title: string;
  content: JSX.Element;
  callback?: (...args: any[]) => any;
}

interface ModalStore {
  modals: Modal[];
  isOpen: boolean;
  addModal: (modal: Modal) => void;
  removeModal: () => void;
  openModal: () => void;
  clearModals: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  isOpen: false,
  addModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  removeModal: () => set((state) => ({ modals: state.modals.slice(1) })),
  openModal: () => set(() => ({ isOpen: true })),
  clearModals: () => set(() => ({ modals: [] })),
}));

export default useModalStore;
