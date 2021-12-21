import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { title, content, tag } = req.body;
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
  if (!title || !content || !tag)
    return res.status(400).json({ message: "fail" });
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        tag,
        createdAt: new Date(),
        updateAt: new Date(),
      },
    });
    res.status(200).json({ message: "success", response: result });
  } catch (err) {
    res.status(409).json({ message: `${err}` });
  }
}
