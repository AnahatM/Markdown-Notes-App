import { Content, DraggableTopBar, RootLayout, Sidebar } from "@/components";

/**
 * Main application component.
 * It serves as the entry point for the application layout.
 *
 * @returns JSX.Element representing the main application component.
 */
const App = (): React.JSX.Element => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">Sidebar</Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">content</Content>
      </RootLayout>
    </>
  );
};

export default App;
