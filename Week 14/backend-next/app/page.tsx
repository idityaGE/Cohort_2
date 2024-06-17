import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUserDetails() {
  const response = await prisma.user.findUnique({
    where: {
      id: 1
    }
  });
  return response;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userData?.username}
          </div>
          Password: {userData?.password}
        </div>
      </div>
    </div>
  );
}
