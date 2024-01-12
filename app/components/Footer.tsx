import { Button } from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mx-auto flex h-[50px] w-screen max-w-2xl items-center justify-center gap-2 border-t-1">
      <p className="font-extralight text-default-400">© 2024 leey00nsu blog</p>
      <Button
        isIconOnly
        disableRipple
        as="a"
        color="default"
        href="https://github.com/leey00nsu"
        variant="light"
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </footer>
  );
};

export default Footer;
