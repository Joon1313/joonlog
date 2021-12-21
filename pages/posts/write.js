import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { Send } from "@mui/icons-material";
import { Input, Button } from "@mui/material";
import { useRouter } from "next/router";
const ariaLabel = { "aria-label": "description" };
const Editor = dynamic(() => import("../../components/common/editor"), {
  ssr: false,
});
const postFetch = async (url, title, content, tag) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      tag,
    }),
  });
  return response;
};

export default function Write() {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const router = useRouter();
  const getContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const html = editorInstance.getMarkdown();
    return html;
  };
  const getTitle = () => {
    const title = titleRef.current.value;
    return title;
  };
  const getTag = () => {
    const tag = tagRef.current.value;
    return tag;
  };
  const goHome = () => {
    router.push("/");
  };
  const submit = async () => {
    const title = getTitle();
    const content = getContent();
    const tag = "tag";
    try {
      const response = await postFetch("/api/posts", title, content, tag);
      console.log(response);
      if (!response.ok) throw response;
      goHome();
    } catch (err) {
      alert(err.status);
    }
  };
  return (
    <>
      <Input
        defaultValue="제목"
        inputProps={ariaLabel}
        inputRef={titleRef}
        fullWidth
        style={{ marginBottom: "10px", height: "70px", fontSize: "26px" }}
      />
      <Input
        defaultValue="태그"
        inputProps={ariaLabel}
        inputRef={tagRef}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <Editor editorRef={editorRef} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button onClick={submit} variant="contained" endIcon={<Send />}>
          제출하기
        </Button>
      </div>
    </>
  );
}
