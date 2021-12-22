import { GitHub } from "@mui/icons-material";
import Image from "next/image";
import Notion from "../components/icon/notion";

export default function Footer() {
  return (
    <footer id="footer">
      <a href="https://github.com/Joon1313" target="_blank" rel="noreferrer">
        <GitHub style={{ fontSize: "26px" }} alt="github" />
      </a>
      <a
        href="https://volcano-quill-93c.notion.site/ab9725aa81cb4f409c9066672d0baec2"
        target="_blank"
        rel="noreferrer"
      >
        <Notion />
      </a>
    </footer>
  );
}
