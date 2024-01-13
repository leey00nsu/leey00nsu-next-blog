import { FaMoon, FaSun } from 'react-icons/fa';

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

export default ThemeIcon;
