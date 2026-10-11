import { create } from "zustand";

interface UIStore {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
}));
