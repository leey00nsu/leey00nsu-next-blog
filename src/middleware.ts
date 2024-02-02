import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const postViewed = request.cookies.get('postViewed');

  const slug = url.pathname.split('/').pop();
  const postViewedArray = postViewed?.value.split(',') ?? [];
  const response = NextResponse.next();

  if (slug && slug !== 'blog' && !postViewedArray.includes(slug)) {
    const expires = new Date();
    expires.setDate(new Date().getDate() + 1);
    expires.setHours(0, 0, 0, 0);

    postViewedArray.push(slug);

    response.cookies.set('postViewed', postViewedArray.join(','), {
      httpOnly: true,
      secure: true,
      expires,
    });
  }

  return response;
}

export const config = {
  matcher: '/blog/:slug*',
};
