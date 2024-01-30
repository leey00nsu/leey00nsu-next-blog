import { Spinner } from '@nextui-org/react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const FullScreenSpinner = () => {
  return (
    <div className="flex min-h-[calc(100svh-128px)] w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

const LoadingSpinner = ({ fullScreen }: LoadingSpinnerProps) => {
  if (fullScreen) {
    return <FullScreenSpinner />;
  }
  return <Spinner />;
};

export default LoadingSpinner;
