import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { Send } from "@mui/icons-material";
import { Input, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useUser } from "../../../libs/hooks";

const ariaLabel = { "aria-label": "description" };
const Editor = dynamic(() => import("../../../components/common/editor"), {
  ssr: false,
});
const postFetch = async (url, { ...arg }) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  return response;
};

export default function Edit({ post }) {
  const { user, isLoggedIn } = useUser("/login");
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const slugRef = useRef(null);
  const router = useRouter();

  const id = post.id;
  const getContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdown = editorInstance.getMarkdown();
    return markdown;
  };
  const getPreview = () => {
    const editorInstance = editorRef.current.getInstance();
    const preview = editorInstance.getSelectedText();
    return preview;
  };
  const getRefValue = (ref) => {
    const value = ref.current.value;
    return value;
  };
  const getTitle = () => {
    const value = titleRef.current.value;
    return value;
  };
  const goHome = () => {
    router.push("/");
  };
  const submit = async () => {
    const content = getContent();
    const preview = getPreview();
    const title = getRefValue(titleRef);
    const tag = getRefValue(tagRef).split(",");
    const slug = getRefValue(slugRef);
    const fetchObj = {
      id,
      content,
      preview,
      title,
      tag,
      slug,
    };
    // return;
    try {
      const response = await postFetch("/api/posts", fetchObj);
      console.log(response);
      if (!response.ok) throw response;
      goHome();
    } catch (err) {
      alert(err.status);
    }
  };
  return (
    <>
      {user && isLoggedIn && (
        <>
          <Head>
            <title>Camlog - 글 수정</title>
            <meta name="robots" content="noindex" />
          </Head>
          <Input
            placeholder="제목"
            defaultValue={post.title}
            inputProps={ariaLabel}
            inputRef={titleRef}
            fullWidth
            style={{ marginBottom: "10px", height: "70px", fontSize: "26px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              defaultValue={post.tag}
              inputProps={ariaLabel}
              inputRef={tagRef}
              placeholder="태그"
              style={{ marginBottom: "10px", width: "45%" }}
            />
            <Input
              defaultValue={post.slug}
              placeholder="슬러그"
              inputProps={ariaLabel}
              inputRef={slugRef}
              style={{ marginBottom: "10px", width: "45%" }}
            />
          </div>
          <Editor
            editorRef={editorRef}
            getTitle={getTitle}
            value={post.content}
          />
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button onClick={submit} variant="contained" endIcon={<Send />}>
              수정
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });
  const newPost = {
    ...post,
    createdAt: JSON.stringify(post.createdAt),
    updateAt: JSON.stringify(post.updateAt),
  };
  return { props: { post: newPost } };
};

// export async function getServerSideProps(ctx) {
//   const token = ctx.req.cookies.auth;
//   // const res = await fetch("https://camlog.vercel.app/api/auth");
//   const res = await fetch("https://camlog.vercel.app/api/auth", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       token,
//     }),
//   });
//   const status = await res.status;
//   if (status === 401) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
