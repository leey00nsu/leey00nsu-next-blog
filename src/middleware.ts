import { NextRequest, NextResponse } from 'next/server';

import isPostChecked from './actions/post-detail/isPostChecked';
import getPostViewCount from './actions/supabase/getPostViewCount';
import updatePostViewCount from './actions/supabase/updatePostViewCount';
import findSuffix from './libs/findSuffix';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const postViewed = request.cookies.get('postViewed');

  const slug = findSuffix(url.pathname, '/blog');
  const postViewedArray = postViewed?.value.split(',') ?? [];
  const response = NextResponse.next();

  if (!slug) return response;

  const isChecked = isPostChecked(slug);

  if (!isChecked && process.env.NODE_ENV === 'production') {
    const viewCount = await getPostViewCount(slug);
    await updatePostViewCount(slug, viewCount + 1);

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
