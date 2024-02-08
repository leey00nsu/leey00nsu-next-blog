import { Suspense } from 'react';

import { SignIn } from '@/src/components/auth/sign-in';
import { AuthRoute } from '@/src/components/routes';
import { FullScreenSpinner } from '@/src/components/ui/spinner';

const Page = () => {
  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <AuthRoute condition={false} redirectPath="/">
        <SignIn />
      </AuthRoute>
    </Suspense>
  );
};

export default Page;
