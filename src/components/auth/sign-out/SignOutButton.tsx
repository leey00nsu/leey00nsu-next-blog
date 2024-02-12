'use client';

import { ButtonProps } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

import { ActiveButton } from '../../ui/buttons';

const SignOutButton = ({ ...props }: ButtonProps) => {
  const signOutHandler = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <ActiveButton onPress={signOutHandler} {...props}>
      로그아웃
    </ActiveButton>
  );
};

export default SignOutButton;
