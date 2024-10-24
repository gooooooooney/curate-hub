import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your middleware
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/v1(.*)",
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/webhooks/(.*)',
  // '/api/v1/(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next();
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};