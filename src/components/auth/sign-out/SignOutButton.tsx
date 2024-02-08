'use client';

import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

interface SignOutButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

const SignOutButton = ({ size = 'md' }: SignOutButtonProps) => {
  const signOutHandler = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Button
      color="primary"
      disableRipple
      size={size}
      variant="flat"
      onClick={signOutHandler}
    >
      로그아웃
    </Button>
  );
};

export default SignOutButton;
