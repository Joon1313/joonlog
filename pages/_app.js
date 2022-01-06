import "../styles/globals.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "../layouts/layout";
import Head from "next/head";
// import { useRouter } from "next/router";
// import { pageview } from "../libs/gTag";
// import { useEffect } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     pageview(url);
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
