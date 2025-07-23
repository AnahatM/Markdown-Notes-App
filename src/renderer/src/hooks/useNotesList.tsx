import { notesAtom, selectedNoteIndexAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";

/**
 * Custom hook to manage the list of notes and the selected note index.
 * It provides functionality to select a note and retrieve the current notes list.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Function} [params.onSelect] - Optional callback function to call when a note is selected.
 * @returns {Object} An object containing the notes, selected note index, and a function to handle note selection.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom);

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom);

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index);

    if (onSelect) {
      onSelect();
    }
  };

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  };
};
