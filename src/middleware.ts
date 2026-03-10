import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Gate dashboard routes: redirect to home if no auth cookie.
  // The cookie is set by useDashboardAuth on login. This prevents
  // dashboard HTML from being sent to unauthenticated users.
  const { pathname } = request.nextUrl;
  if (pathname.match(/^\/(zh|en)\/dashboard/)) {
    const authed = request.cookies.get('welcome-hub-authed')?.value === '1';
    if (!authed) {
      // Redirect to the dashboard root (which shows the login form)
      // Only block sub-routes, not the dashboard root itself
      const isDashboardRoot = pathname.match(/^\/(zh|en)\/dashboard\/?$/);
      if (!isDashboardRoot) {
        const locale = pathname.startsWith('/en') ? 'en' : 'zh';
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(zh|en)/:path*'],
};
