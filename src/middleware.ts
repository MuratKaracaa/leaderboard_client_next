import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import cookieKeys from "@/common/cookieKeys";

import PATHS from "@/common/paths";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(cookieKeys.AUTH_TOKEN);

  if (!token && request.nextUrl.pathname !== PATHS.LOGIN) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
  }

  if (!!token && request.nextUrl.pathname === PATHS.LOGIN) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [PATHS.HOME, PATHS.LOGIN],
};
