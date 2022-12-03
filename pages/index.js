import Head from "next/head";
import Card from "../components/card/card";
import { PrismaClient } from "@prisma/client";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>JoonLog</title>
        <meta property="og:title" content="Joonlog" />
        <meta name="description" content="dev blog" />
        <meta property="og:description" content="dev blog" />
        <link rel="canonical" href="https://joonlog.vercel.app" />
      </Head>
      <Card posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    take: 12,
  });
  const newPosts = posts.map((v) => ({
    ...v,
    createdAt: JSON.stringify(v.createdAt),
    updateAt: JSON.stringify(v.updateAt),
  }));
  return {
    props: {
      posts: newPosts,
    },
  };
};
