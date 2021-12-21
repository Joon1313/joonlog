import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Viewer } from "@toast-ui/react-editor";

export default function tuiViewer(props) {
  return <Viewer initialValue={props.content} theme="dark" />;
}
