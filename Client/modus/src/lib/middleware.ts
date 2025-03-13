import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiter } from '@/lib/rate-limiter'

export async function middleware(req: NextRequest) {
  // Get IP from headers or fallback to '127.0.0.1'
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] || // Get first IP from list
    req.headers.get('x-real-ip') || // Some proxies set this
    '127.0.0.1' // Default fallback for local testing

  try {
    const { success } = await rateLimiter.limit(ip)

    if (!success) {
      return new NextResponse('You are writing messages too fast.', { status: 429 })
    }

    return NextResponse.next()
  } catch (error) {
    return new NextResponse(
      'Sorry, something went wrong processing your message. Please try again later.',
      { status: 500 }
    )
  }
}

export const config = {
  matcher: '/api/message/:path*',
}
