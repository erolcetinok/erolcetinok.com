import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Minimal middleware so Next.js generates middleware-manifest.json in dev.
 * Pass-through: every request continues to the route handler.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- required signature; request unused for pass-through
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and api routes
     * so middleware runs and manifest is generated.
     */
    "/((?!_next/static|_next/image|favicon.ico|icons/|api/).*)",
  ],
};
