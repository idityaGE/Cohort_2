import { NextRequest, NextResponse } from "next/server";


let reqCount = 0;

export function middleware(req: NextRequest) {
  
  reqCount++;
  console.log(`Request count: ${reqCount}`);

  const response = NextResponse.next();
  response.headers.set("user-request-count", reqCount.toString());

  return response;
}