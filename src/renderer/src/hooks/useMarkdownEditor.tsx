import { MDXEditorMethods } from "@mdxeditor/editor";
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store";
import { autoSaveIntervalMs } from "@shared/constants";
import { NoteContent } from "@shared/models";
import { useAtomValue, useSetAtom } from "jotai";
import { throttle } from "lodash";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const editorRef = useRef<MDXEditorMethods>(null);

  /**
   * Handles auto-saving the note content.
   * Uses lodash's throttle to limit the frequency of saves to every 3 seconds.
   *
   * @param content - The content of the note to be saved.
   * @returns A promise that resolves when the note is saved.
   */
  const handleAutoSaving = throttle(
    async (content: NoteContent): Promise<void> => {
      if (!selectedNote) return;

      console.info("Auto-saving note: ", selectedNote.title);

      // Save the updated note
      await saveNote(content);
    },
    autoSaveIntervalMs,
    { leading: false, trailing: true }
  );

  /**
   * Handles the blur event of the editor.
   * Saves the note content when the editor loses focus or the selected note changes.
   *
   * @return A promise that resolves when the note is saved.
   */
  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) return;

    handleAutoSaving.cancel();

    const content = editorRef.current?.getMarkdown();

    if (content != null) await saveNote(content);
  };

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  };
};
