import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { title, content, tag, preview, slug } = req.body;
  const token = req.cookies.auth;
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
  if (!token) return res.status(401).json({ message: "unauthorized" });
  if (!title || !content || !tag || !preview)
    return res.status(400).json({ message: "fail" });
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    const result = await prisma.post.create({
      data: {
        title,
        content,
        tag,
        preview,
        slug,
        createdAt: new Date(),
        updateAt: new Date(),
      },
    });
    res.status(200).json({ message: "success", response: result });
  } catch (err) {
    res.status(409).json({ message: `${err}` });
  }
}
