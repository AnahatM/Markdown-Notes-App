import { MDXEditorMethods } from "@mdxeditor/editor";
import { selectedNoteAtom } from "@renderer/store";
import { useAtomValue } from "jotai";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const editorRef = useRef<MDXEditorMethods>(null);

  return {
    editorRef,
    selectedNote
  };
};
