'use client';

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { useKBar } from 'kbar';
import { usePathname } from 'next/navigation';
import { FaGithub, FaSearch } from 'react-icons/fa';

import tw from '@/app/libs/tw';

import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  const pathname = usePathname();
  const { query } = useKBar();

  return (
    <Navbar className="bg-background/70">
      <NavbarBrand>
        <Link className="font-bold text-foreground" href="/">
          leey00nsu
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex" justify="center">
        <NavbarItem>
          <Link
            className={tw(
              'text-lg font-normal text-foreground',
              pathname.startsWith('/blog') && 'font-bold',
            )}
            href="/blog"
          >
            블로그
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            isIconOnly
            disableRipple
            color="default"
            href="https://github.com/leey00nsu"
            variant="light"
            onClick={() => query.toggle()}
          >
            <FaSearch className="h-6 w-6" />
          </Button>
        </NavbarItem>
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
            <FaGithub className="h-6 w-6" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
