import { Container } from "@mui/material";
import Footer from "./footer";
import Header from "./header";

export default function MainContainer({ children }) {
  return (
    <>
      <Header />
      <Container id="container" maxWidth="lg">
        <main id="main">{children}</main>
      </Container>
      <Footer />
    </>
  );
}
