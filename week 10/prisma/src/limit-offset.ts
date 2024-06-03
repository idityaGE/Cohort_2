import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['info', 'query']
})

// SELECT * FROM Post LIMIT 3 OFFSET 10;
// Skip the first 10 posts and take the next 3

async function main() {
  let res = await prisma.post.findMany({
    take: 2,
    skip: 2,
  })
  console.log(res);

}

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })