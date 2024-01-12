'use client';

import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ThemeIcon from './ThemeIcon';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!theme) return null;

  return (
    <Switch
      isSelected={theme === 'dark'}
      size="lg"
      color="default"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      thumbIcon={<ThemeIcon theme={theme} />}
    />
  );
}
