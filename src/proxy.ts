import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "@/utils/Session";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/create-blog")) {
    const isAuthenticated = await checkSession();
    if (!isAuthenticated) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.search = `?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`;
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/create-blog"],
};
