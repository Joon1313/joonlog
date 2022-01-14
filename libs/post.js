import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPost({ ...arg }) {
  const { createAt, updateAt } = new Date();
  const post = await prisma.post.create({
    data: { ...arg, createAt, updateAt },
  });
  return post;
}

export async function updatePost({ ...arg }) {
  const { id, content, title, preview, tag, slug } = arg;
  const updateAt = new Date();
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: { content, title, preview, tag, slug, updateAt },
  });
  return post;
}
