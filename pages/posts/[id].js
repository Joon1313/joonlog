import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import Comment from "../../components/common/comment";
import styles from "../../styles/Post.module.scss";
import Tag from "../../components/common/tag";
import Date from "../../components/common/date";
import Head from "next/head";

const Viewer = dynamic(() => import("../../components/common/viewer"), {
  ssr: false,
});

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <meta name="keywords" content={post.tag} />
      </Head>
      <article className={styles.articleWrap}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className={styles.postTitle}
        >
          {post.title}
        </Typography>
        <div className={styles.description}>
          <Date createdAt={post.createdAt} />
          <Tag tags={post.tag} />
        </div>
        <Viewer content={post.content} />
        <Comment repo="Joon1313/camlog-comments" />
      </article>
    </>
  );
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  const newPost = {
    ...post,
    createdAt: JSON.stringify(post.createdAt),
    updateAt: JSON.stringify(post.updateAt),
  };
  return { props: { post: newPost }, revalidate: 60 };
};
