'use client';

import { ButtonProps } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

import { ActiveButton } from '../../ui/buttons';

const SignInButton = ({ ...props }: ButtonProps) => {
  const signInHandler = () => {
    signIn('github', {
      callbackUrl: '/',
    });
  };

  return (
    <ActiveButton
      onPress={signInHandler}
      startContent={<FaGithub />}
      {...props}
    >
      Github 로그인
    </ActiveButton>
  );
};

export default SignInButton;
