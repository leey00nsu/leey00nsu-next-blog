import NextAuth from 'next-auth';

import { authOptions } from '@/src/libs/nextAuth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
