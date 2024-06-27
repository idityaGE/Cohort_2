import { NextResponse } from "next/server"
import prisma from "../../../../../packages/db/src";

export const GET = async () => {
    await prisma.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number: "123456789",
            password: "password123"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}