import blogConfig from '@/blog.config';
import { Link, User } from '@nextui-org/react';

const UserProfile = () => {
  return (
    <User
      name={blogConfig.owner}
      description={
        <Link
          href={`https://github.com/${blogConfig.owner}`}
          size="sm"
          isExternal
        >
          @github
        </Link>
      }
      avatarProps={{
        size: 'lg',
        src: `https://github.com/${blogConfig.owner}.png`,
      }}
    />
  );
};

export default UserProfile;
