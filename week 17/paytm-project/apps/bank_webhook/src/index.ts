import express from 'express'
import prisma from '@repo/db/client'

const app = express()
const port = process.env.PORT || 3002

app.post("/webhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount
  };
  // transaction
  try {
    await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId)
        },
        data: {
          amount: {
            // You can also get this from your prisma
            increment: Number(paymentInformation.amount)
          }
        }
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success",
        }
      })
    ]);
    res.json({
      message: "Captured"
    })
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook"
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})