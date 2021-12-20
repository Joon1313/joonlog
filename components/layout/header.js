import { Container } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <header id="header">
      <Container maxWidth="lg">
        <Link href="/">Camlog</Link>
      </Container>
    </header>
  );
}
