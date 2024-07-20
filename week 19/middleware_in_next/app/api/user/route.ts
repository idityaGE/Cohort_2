import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello Next" });
}