import { useRef, useEffect } from "react";
import Head from "next/head";
import { TextField, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

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

  // useEffect(() => {
  //   (async () => {
  //     await fetch("/api/auth").then((res) => {
  //       if (res.status === 307) router.push("/");
  //     });
  //   })();
  // }, []);
  return (
    <>
      <Head>
        <title>Camlog - Login</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicon.ico" />
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
