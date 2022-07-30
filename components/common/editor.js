import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "prismjs/components/prism-clojure.js";
import { Editor } from "@toast-ui/react-editor";
import { uploadImage } from "../../libs/s3Common";
export default function tuiEditor(props) {
  return (
    <Editor
      height="800px"
      initialEditType="markdown"
      initialValue={props.value ? props.value : "내용"}
      theme="dark"
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      ref={props.editorRef}
      hooks={{
        addImageBlobHook: async (blob, callback) => {
          const title = props.getTitle();
          const uploadedImageURL = await uploadImage(blob, title);
          callback(uploadedImageURL, "img");
          return false;
        },
      }}
    />
  );
}
