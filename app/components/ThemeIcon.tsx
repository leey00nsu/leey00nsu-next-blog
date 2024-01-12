import { FaMoon, FaSun } from 'react-icons/fa';

interface ThemeIconProps {
  theme: string;
}

const ThemeIcon = ({ theme }: ThemeIconProps) => {
  return theme === 'light' ? <FaSun /> : <FaMoon />;
};

export default ThemeIcon;
