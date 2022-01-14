import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findUserbyId(id) {
  const user = await prisma.admin.findUnique({
    where: {
      user_id: id,
    },
  });
  if (!user) throw new Error("not found user");
  return user;
}
