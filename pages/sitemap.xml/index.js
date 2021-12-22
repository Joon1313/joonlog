import { getServerSideSitemap } from "next-sitemap";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps = async (ctx) => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  const krDate = () => {
    const date = +new Date() + 32400 * 1000;
    return new Date(date).toISOString();
  };
  const fields = posts.map((post) => ({
    loc: `https://camlog-joon1313.vercel.app/posts/${post.id}`,
    lastmod: krDate(),
  }));
  fields.unshift({
    loc: `https://camlog-joon1313.vercel.app/`,
    lastmod: krDate(),
  });
  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
