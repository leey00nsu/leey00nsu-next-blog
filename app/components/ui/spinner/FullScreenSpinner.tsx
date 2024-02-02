import { Spinner } from '@nextui-org/react';


const FullScreenSpinner = () => {
  return (
    <div className="flex min-h-[calc(100svh-128px)] w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default FullScreenSpinner;
