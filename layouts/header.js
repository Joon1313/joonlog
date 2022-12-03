import { Container } from "@mui/material";
import Link from "next/link";
import { GitHub } from "@mui/icons-material";

export default function Header() {
  return (
    <header id="header">
      <Container maxWidth="lg" id="header_box" component="nav">
        <Link href="/">JoonLog</Link>
        <div id="nav">
          <a
            target="_blank"
            href="https://github.com/Joon1313"
            rel="noopener noreferrer"
          >
            <GitHub style={{ fontSize: "28px" }} alt="github" />
          </a>
        </div>
      </Container>
    </header>
  );
}
