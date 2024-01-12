"use client";

import { tw } from "@/app/lib/tw";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { ThemeSwitch } from "./ThemeSwitch";

const Header = () => {
  const pathname = usePathname();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link className="text-foreground font-bold" href="/">
          LEEY00NSU
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex" justify="center">
        <NavbarItem>
          <Link
            className={tw(
              pathname.startsWith("/blog") ? "text-primary" : "text-foreground"
            )}
            href="/blog"
          >
            블로그
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
