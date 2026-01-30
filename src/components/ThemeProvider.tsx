'use client';

import { useLayoutEffect, useState } from 'react';
import { useTheme } from '@/store/useTheme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Apply theme and mark as mounted in a single effect
  useLayoutEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    // Mark as mounted after DOM update
    queueMicrotask(() => setMounted(true));
  }, [isDark]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
