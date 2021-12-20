import { PrismaClient } from "@prisma/client";

export default function Post({ post }) {
  return <p style={{ color: "#fff" }}>{post.title}</p>;
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
  const id = +params.id;
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
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // const post = await res.json();

  // Pass post data to the page via props
  return { props: { post: newPost } };
};
