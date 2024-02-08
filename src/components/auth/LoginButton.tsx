'use client';

import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

interface LoginButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoginButton = ({ size = 'md' }: LoginButtonProps) => {
  const signInHandler = () => {
    signIn('github', {
      callbackUrl: '/',
    });
  };

  return (
    <Button
      color="primary"
      variant="flat"
      size={size}
      disableRipple
      onClick={signInHandler}
      startContent={<FaGithub />}
    >
      Github 로그인
    </Button>
  );
};

export default LoginButton;
