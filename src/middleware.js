import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = cookies(request).get("__Secure-next-auth.session-token");
  const path = request.nextUrl.pathname;
  if (path.includes("api")) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${path}`, request.url)
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/my-bookings/:path*", "/services/:path*"],
};
