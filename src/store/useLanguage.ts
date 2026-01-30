import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStore {
  locale: 'en' | 'sl';
  toggleLanguage: () => void;
  setLanguage: (locale: 'en' | 'sl') => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      locale: 'sl',
      toggleLanguage: () =>
        set((state) => ({ locale: state.locale === 'en' ? 'sl' : 'en' })),
      setLanguage: (locale: 'en' | 'sl') => set({ locale }),
    }),
    {
      name: 'krog-language',
    }
  )
);
