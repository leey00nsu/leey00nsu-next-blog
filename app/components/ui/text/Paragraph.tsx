import { tv } from '@nextui-org/react';
import React from 'react';

import tw from '@/app/libs/tw';

interface ParagraphProps {
  children: React.ReactNode;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  className?: string;
}

const Paragraph = ({
  children,
  size,
  weight,
  color = 'text-foreground',
  className,
}: ParagraphProps) => {
  const classes = tv({
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        md: 'text-xs sm:text-md',
        lg: 'text-sm sm:text-lg',
        xl: 'text-base sm:text-xl',
        '2xl': 'text-md sm:text-2xl',
        '3xl': 'text-lg sm:text-3xl',
        '4xl': 'text-xl sm:text-4xl',
        '5xl': 'text-2xl sm:text-5xl',
        '6xl': 'text-3xl sm:text-6xl',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'lg',
      weight: 'light',
    },
  });

  return (
    <p className={classes({ size, weight, class: tw(color, className) })}>
      {children}
    </p>
  );
};

export default Paragraph;
