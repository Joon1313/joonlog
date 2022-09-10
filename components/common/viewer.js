import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";

export default function tuiViewer(props) {
  return (
    <Viewer
      initialValue={props.content}
      theme="dark"
      viewer={true}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
