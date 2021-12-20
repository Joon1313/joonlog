import { Container } from "@mui/material";
import Footer from "./footer";
import Nav from "./nav";

export default function MainContainer({ children }) {
  return (
    <Container maxWidth="lg">
      <Nav />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
