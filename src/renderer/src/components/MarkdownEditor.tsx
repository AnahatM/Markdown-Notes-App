import { useMarkdownEditor } from "@/hooks/useMarkdownEditor";
import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin
} from "@mdxeditor/editor";
import { JSX } from "react";

export const MarkdownEditor = (): JSX.Element => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor();

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote?.title || null}
      markdown={
        selectedNote
          ? selectedNote.content
          : "Welcome to **Markdown Notes**, an app developed by Anahat Mudgal."
      }
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-zinc-400 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  );
};
