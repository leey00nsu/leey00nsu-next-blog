import { Button } from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex h-[64px] w-full items-center justify-center bg-background/70">
      <div className="flex max-w-2xl items-center justify-center gap-2">
        <p className="font-extralight text-default-400">
          © 2024 leey00nsu blog
        </p>
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
      </div>
    </footer>
  );
};

export default Footer;
