import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

app.post("/sum", async (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body)

    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const { a, b } = parsedResponse.data;

    const answer = a + b;

    const response = await prismaClient.sum.create({
        data: { // if we flip a and b here, the test will still pass, because the test is not checking the data that is being sent to the database
            // to deal with this we need to spy on this method and check if it was called with the correct data
            a: a,
            b: b,
            result: answer
        }
    })

    res.json({
        answer,
        id: response.id  // here we are returning the id the of reasponse which is mocked in the test, to deal we need to mock the return value of the create method
    })
});

app.get("/sum", async (req, res) => {
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

    const response = await prismaClient.sum.create({
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result: answer
        }
    })
    res.json({
        answer,
        id: response.id
    })
});
