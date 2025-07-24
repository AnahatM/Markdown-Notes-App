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
  // Track last saved note title to prevent saving to the wrong note
  const lastSavedNoteTitleRef = useRef<string | null>(null);
  const handleAutoSaving = throttle(
    async (content: NoteContent): Promise<void> => {
      if (!selectedNote) return;
      // Only save if the note hasn't changed since last save
      if (lastSavedNoteTitleRef.current !== selectedNote.title) return;
      console.info("Auto-saving note: ", selectedNote.title);
      await saveNote(content);
    },
    autoSaveIntervalMs,
    { leading: false, trailing: true }
  );

  // Update lastSavedNoteTitleRef when selectedNote changes
  if (selectedNote && lastSavedNoteTitleRef.current !== selectedNote.title) {
    handleAutoSaving.cancel(); // Cancel any pending auto-save for previous note
    lastSavedNoteTitleRef.current = selectedNote.title;
  }

  /**
   * Handles the blur event of the editor.
   * Saves the note content when the editor loses focus or the selected note changes.
   *
   * @return A promise that resolves when the note is saved.
   */
  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) return;
    handleAutoSaving.cancel();
    // Only save if the note hasn't changed since last save
    if (lastSavedNoteTitleRef.current !== selectedNote.title) return;
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
