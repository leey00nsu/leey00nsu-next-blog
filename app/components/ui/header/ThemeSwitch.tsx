'use client';

import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaQuestion, FaSun } from 'react-icons/fa';

interface ThemeIconProps {
  theme: string;
}

const ThemeIcon = ({ theme }: ThemeIconProps) => {
  return theme === 'light' ? (
    <FaSun className="text-zinc-900" />
  ) : (
    <FaMoon className="text-zinc-900" />
  );
};

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme)
    return (
      <Switch
        isSelected={false}
        size="lg"
        color="default"
        thumbIcon={<FaQuestion />}
        className="invisible"
      />
    );

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
