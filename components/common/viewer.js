import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

export default function tuiViewer(props) {
  return <Viewer initialValue={props.content} theme="dark" />;
}
