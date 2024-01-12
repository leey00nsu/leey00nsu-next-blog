import { Button } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-screen max-w-2xl h-[50px] flex justify-center items-center border-t-1 mx-auto gap-2">
      <p className="font-extralight text-default-400">© 2024 leey00nsu blog</p>
      <Button
        isIconOnly
        disableRipple
        as="a"
        color="default"
        href="https://github.com/leey00nsu"
        variant="light"
      >
        <FaGithub className="w-6 h-6" />
      </Button>
    </footer>
  );
};

export default Footer;
