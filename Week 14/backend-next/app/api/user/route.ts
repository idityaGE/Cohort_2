import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  });
  return Response.json({
    msg: "succesfully Login",
    user
  });
}