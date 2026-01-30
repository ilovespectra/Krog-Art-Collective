import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (isDark: boolean) => set({ isDark }),
    }),
    {
      name: 'krog-theme',
    }
  )
);
