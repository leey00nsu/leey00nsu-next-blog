'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { Key } from '@react-types/shared';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaEllipsisH } from 'react-icons/fa';

const items = [
  {
    key: 'edit',
    label: '수정',
  },
  {
    key: 'delete',
    label: '삭제',
  },
];

const PostDropdown = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'unauthenticated' || !session) {
    return null;
  }

  const clickTriggerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const actionHandler = (key: Key) => {
    if (key === 'edit') {
      router.push(`/studio/${slug}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger onClick={clickTriggerHandler}>
        <Button size="sm" isIconOnly variant="light">
          <FaEllipsisH />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => actionHandler(key)}
        aria-label="post dropdown"
        items={items}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === 'delete' ? 'danger' : 'default'}
            className={item.key === 'delete' ? 'text-danger' : ''}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostDropdown;
