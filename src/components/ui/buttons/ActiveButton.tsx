import { Button, ButtonProps } from '@nextui-org/react';

const ActiveButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      color="primary"
      variant="ghost"
      radius="full"
      disableRipple
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActiveButton;
