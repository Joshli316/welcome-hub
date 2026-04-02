import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'welcome-hub-authed';
// PIN is read from environment variable; falls back to default for local dev.
// Set DASHBOARD_PIN in wrangler.jsonc vars or Cloudflare dashboard for production.
const DASHBOARD_PIN = process.env.DASHBOARD_PIN ?? '1234';

export async function POST(request: NextRequest) {
  let pin: string;
  try {
    const body = await request.json();
    pin = body.pin;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (!pin || pin !== DASHBOARD_PIN) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE, '1', {
    httpOnly: true,
    secure: request.url.startsWith('https'),
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
