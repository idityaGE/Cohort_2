"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function createOnrampTransaction({ amount, provider }: { amount: number, provider: string }) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const userId = session.user.id;
  if (!userId) {
    throw new Error("User not found");
  }
  const onRampStatus = await prisma.onRampTransaction.create({
    data: {
      amount,
      provider,
      userId: Number(userId),
      status: "Processing",
      startTime: new Date(),
      token
    }
  });
}
