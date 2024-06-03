import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['info' ,'query', "error", "warn"] });

async function main() {
  await prisma.post.create({
    data: {
      title: "Hello John",
      content: "This is a post no 1",
      author: {
        connect: {
          id: 2
        }
      }
    }
  })
}

// there are two ways to connect to user table 
// 1--> author: { connect: { id: 1 } }
// 2--> authorId: 1

// we can also store this in a variable
// const author = await prisma.user.<task>({})



main()
  .then(async () => {
    console.log("Seeding finished.")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })