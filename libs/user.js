import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findUser(id) {
  const user = await prisma.admin.findUnique({
    where: {
      user_id: id,
    },
  });
  // if (user.user_id) {
  //   throw new Error("not found user");
  // }
  return user.user_id;
}
