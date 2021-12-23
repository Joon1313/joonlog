import { PrismaClient } from "@prisma/client";

export default function Sitemap({ posts }) {
  // const { posts } = props;

  return "null";
}

export const getStaticProps = async () => {
  // const sitemap = createSitemap();
  // res.setHeader("Content-Type", "text/xml");
  // res.write("gg");
  // res.end();
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  return {
    props: {
      posts: posts,
    },
    revalidate: 60,
  };
};
