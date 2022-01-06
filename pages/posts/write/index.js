import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { Send } from "@mui/icons-material";
import { Input, Button } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";

const ariaLabel = { "aria-label": "description" };
const Editor = dynamic(() => import("../../../components/common/editor"), {
  ssr: false,
});
const postFetch = async (url, { ...arg }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  return response;
};

export async function getServerSideProps(ctx) {
  const token = ctx.req.cookies.auth;
  // const res = await fetch("https://camlog.vercel.app/api/auth");
  const res = await fetch("https://camlog.vercel.app/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  const status = await res.status;
  if (status === 401) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Write() {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const slugRef = useRef(null);
  const router = useRouter();

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
      <Head>
        <title>Camlog - write</title>
      </Head>
      <Input
        placeholder="제목"
        inputProps={ariaLabel}
        inputRef={titleRef}
        fullWidth
        style={{ marginBottom: "10px", height: "70px", fontSize: "26px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          inputProps={ariaLabel}
          inputRef={tagRef}
          placeholder="태그"
          style={{ marginBottom: "10px", width: "45%" }}
        />
        <Input
          placeholder="슬러그"
          inputProps={ariaLabel}
          inputRef={slugRef}
          style={{ marginBottom: "10px", width: "45%" }}
        />
      </div>
      <Editor editorRef={editorRef} titleRef={titleRef} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button onClick={submit} variant="contained" endIcon={<Send />}>
          제출하기
        </Button>
      </div>
    </>
  );
}
