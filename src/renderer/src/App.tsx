import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from "@/components";
import { useRef } from "react";

/**
 * Main application component.
 * It serves as the entry point for the application layout.
 *
 * @returns JSX.Element representing the main application component.
 */
const App = (): React.JSX.Element => {
  const contentContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Resets the scroll position of the content container to the top.
   * This is useful when a new note is selected to ensure the view starts at the beginning.
   */
  const resetContentScroll = (): void => {
    contentContainerRef.current?.scrollTo(0, 0);
  };

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetContentScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  );
};

export default App;
