import "../styles/globals.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "../layouts/layout";
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
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
