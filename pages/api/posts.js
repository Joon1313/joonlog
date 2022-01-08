import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { title, content, tag, preview, slug, id } = req.body;
  const token = req.cookies.auth;
  if (!token) return res.status(401).json({ message: "unauthorized" });
  if (!title || !content || !tag || !preview || !slug)
    return res.status(400).json({ message: "fail" });
  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    res.status(409).json({ message: `${err}` });
  }
  switch (req.method) {
    case "POST":
      const create = await prisma.post.create({
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
      res.status(200).json({ message: "success", response: create });
      break;
    case "PUT":
      const update = await prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          tag,
          preview,
          slug,
          updateAt: new Date(),
        },
      });
      res.status(200).json({ message: "success", response: update });
      break;
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} Not Allowed` });
      break;
  }
}
