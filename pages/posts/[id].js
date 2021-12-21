import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
// import { Viewer } from "@toast-ui/react-editor";

const Viewer = dynamic(() => import("../../components/common/viewer"), {
  ssr: false,
});

export default function Post({ post }) {
  return (
    <article className="articleWrap">
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className="postTitle"
      >
        {post.title}
      </Typography>
      <Viewer content={post.content} />
    </article>
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
    fallback: false,
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
  return { props: { post: newPost } };
};
