import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  await prisma.user.create({
    data: {
      name: "john",
      email: "mail1@mail.com",
    }
  })
}


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