import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = req.cookies.auth;
  try {
    const auth = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.admin.findUnique({
      where: {
        user_id: auth._id,
      },
    });
    if (user.user_id) res.status(200).json({ user: user.user_id });
  } catch {
    res.status(401).json({ message: "not auth" });
  }
}
