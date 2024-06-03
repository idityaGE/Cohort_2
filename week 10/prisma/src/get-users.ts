import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(id: number) {
  const users = await prisma.user.findMany({}) // here post is not included and will return an array of users
  console.log(users)

  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      posts: true  // include all posts of the user
    }
  })
  console.log(user)
}

main(1)
  .then(async() => {
    console.log("Task finished.")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })