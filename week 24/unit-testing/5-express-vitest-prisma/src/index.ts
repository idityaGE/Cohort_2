import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";
import { RequestType } from "@prisma/client";

export const app = express();
app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number(),
    type: z.enum([RequestType.ADD, RequestType.MULTIPLY])
})

app.post("/sum", async (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body)
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const { a, b, type } = parsedResponse.data;

    const answer = type === RequestType.ADD ? a + b : a * b;
    await prismaClient.sum.create({
        data: {
            a,
            b,
            type,
            result: answer
        }
    })
    res.json({
        answer
    })
});

app.get("/sum", (req, res) => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.json({
        answer
    })
});