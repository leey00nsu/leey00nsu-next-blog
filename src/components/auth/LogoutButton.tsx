'use client';

import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

const LogoutButton = ({ size = 'md' }: LogoutButtonProps) => {
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

export default LogoutButton;
