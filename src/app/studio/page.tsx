import { Suspense } from 'react';

import { AuthRoute } from '@/src/components/routes';
import { Studio } from '@/src/components/studio';
import { FullScreenSpinner } from '@/src/components/ui/spinner';

const Page = () => {
  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <AuthRoute condition redirectPath="/auth/signin">
        <Studio />
      </AuthRoute>
    </Suspense>
  );
};

export default Page;
