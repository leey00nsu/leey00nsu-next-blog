import { Suspense } from 'react';

import { Error } from '@/src/components/auth/error';
import { AuthRoute } from '@/src/components/routes';
import { FullScreenSpinner } from '@/src/components/ui/spinner';

const Page = () => {
  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <AuthRoute condition={false} redirectPath="/">
        <Error />
      </AuthRoute>
    </Suspense>
  );
};

export default Page;
