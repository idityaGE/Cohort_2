export type Environment = {
  Bindings: {
    JWT_SECRET: string
    DATABASE_URL: string
  },
  Variables: {
    userId: string
    prisma: PrismaClient
  }
}