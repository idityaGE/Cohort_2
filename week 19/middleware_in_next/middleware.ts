import { NextRequest, NextResponse } from "next/server";


let reqCount = 0;

// export function middleware(req: NextRequest) {

//   reqCount++;
//   console.log(`Request count: ${reqCount}`);

//   const response = NextResponse.next();
//   response.headers.set("user-request-count", reqCount.toString());

//   return response;
// }

// By default, the middleware is applied to all routes.
// You can customize this behavior by 2 ways:
// 1- Custom matcher config
// 2- Conditional statements


// 1- Custom matcher config
// export const config = {
//   matcher: ["/api/:path*"], // Only apply the middleware to routes that match this pattern
//   //@ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// };
// but the problem with this approach is that you can't use the same middleware for multiple routes, what if you want to apply different middleware for different routes?
// to solve this problem, you can use the second approach

// 2- Conditional statements
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // if the route starts with /api, apply the middleware
  if (pathname.startsWith("/api")) {
    reqCount++;
    console.log(`Request count: ${reqCount}`);

    const response = NextResponse.next();
    response.headers.set("user-request-count", reqCount.toString());

    return response;
  }

  // if the route starts with /dashboard, apply the middleware
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  return NextResponse.next();
}
