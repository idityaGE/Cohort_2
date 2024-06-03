import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main =  async (id: number ,value:string ) => {
  await prisma.post.update({
    where: {
      id: id
    },
    data: {
      published: true,
      content: value
    }
  })
}

main(1 , "updated content")
  .then(async() => {
    console.log("Task finished.")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })