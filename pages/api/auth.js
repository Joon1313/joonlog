import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = req.cookies.auth;
  try {
    const auth = jwt.verify(token, process.env.SECRET_KEY);
    const user = prisma.admin.findUnique({
      where: {
        user_id: auth._id,
      },
    });
    if (user) res.status(307).json({ message: "auth success" });
  } catch {
    res.status(200).json({ message: "not auth" });
  }
}
