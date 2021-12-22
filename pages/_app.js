import "../styles/globals.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "../layouts/layout";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
