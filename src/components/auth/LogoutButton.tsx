'use client';

import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const signOutHandler = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  return (
    <Button color="primary" variant="flat" onClick={signOutHandler}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
