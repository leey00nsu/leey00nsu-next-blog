import { getServerSession } from 'next-auth';
import React from 'react';
import Navigation from './Navigation';

interface AuthRouteProps {
  condition: boolean; // children을 렌더링 하는 조건
  redirectPath: string;
  children: React.ReactNode;
}

const AuthRoute = async ({
  condition,
  redirectPath,
  children,
}: AuthRouteProps) => {
  const session = await getServerSession();

  // 유저 인증을 확인하고 조건과 일치하지 않으면 리다이렉트
  if (!!session !== condition) {
    return <Navigation to={redirectPath}/>
  }

  return <>{children}</>;
};

export default AuthRoute;
