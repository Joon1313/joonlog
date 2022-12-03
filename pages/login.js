import { useRef } from "react";
import Head from "next/head";
import { TextField, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

      export async function getServerSideProps(ctx) {
  const token = ctx.req.cookies.auth;
  const res = await fetch("https://joonlog.vercel.app/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  // console.log(res);
  const status = await res.status;
  if (status === 200) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Login() {
  const idRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const 로그인 = async () => {
    const user_id = idRef.current.value;
    const password = passwordRef.current.value;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, password }),
    });
    if (res.status === 307) {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>JoonLog - 로그인</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          margin: "auto",
        }}
      >
        <TextField
          id="outlined-basic"
          type="text"
          label="아이디"
          variant="outlined"
          margin="normal"
          inputRef={idRef}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="비밀번호"
          variant="outlined"
          margin="normal"
          inputRef={passwordRef}
        />
        <Button variant="outlined" onClick={로그인}>
          로그인
        </Button>
      </Box>
    </>
  );
}
