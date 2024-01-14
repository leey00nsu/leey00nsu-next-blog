import { Link, LinkProps } from '@nextui-org/react';
import { FaLink } from 'react-icons/fa';

const CustomLink = ({ href, children }: LinkProps) => {
  return (
    <Link isExternal showAnchorIcon anchorIcon={<FaLink />} href={href}>
      {children}
    </Link>
  );
};

export default CustomLink;
