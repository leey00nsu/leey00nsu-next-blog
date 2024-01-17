import type { Config } from 'tailwindcss';

const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',

  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: '#11181C',
            'personal-blue': '#086ab6',
          },
        },
        dark: {
          colors: {
            background: '#1f1f1f',
            foreground: '#ECEDEE',
            'personal-blue': '#0084e1',
          },
        },
      },
    }),
  ],
};
export default config;
