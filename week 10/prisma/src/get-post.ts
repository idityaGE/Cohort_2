import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main =  async () => {
  const posts = await prisma.post.findMany({})
  console.log(posts)
}

main()
  .then(async () => {
    console.log("Task finished.")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })