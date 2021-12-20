import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

export default function postEditor(props) {
  return (
    <Editor
      height="800px"
      initialEditType="markdown"
      initialValue="내용"
      previewStyle="vertical"
      theme="dark"
      ref={props.editorRef}
    />
  );
}
